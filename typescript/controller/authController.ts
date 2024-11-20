import { Request, Response } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import db from '../config/connectDB.js';
import { PasswordEncryptor } from '../helpers/passwordEncrypter.js';

interface RegisterRequest extends Request {
  body: {
    user_email: string;
    user_password: string;
    first_name: string;
    last_name: string;
  };
}

const register = async (req: RegisterRequest, res: Response): Promise<void> => {
  const { user_email, user_password, first_name, last_name } = req.body;

  if (!user_email || !user_password || !first_name || !last_name) {
    res.status(400).json({ message: 'Alla fält måste vara ifyllda' });
    return;
  }

  try {
    const [existingUser] = (await db.execute(
      'SELECT * FROM user WHERE user_email = ?',
      [user_email]
    )) as unknown as [any[]];

    if (existingUser.length > 0) {
      if (existingUser[0].role === 'visitor') {
        const hashedPassword = await PasswordEncryptor.encrypt(user_password);

        await db.execute(
          'UPDATE user SET user_password = ?, role = "member", first_name = ?, last_name = ? WHERE user_email = ?',
          [hashedPassword, first_name, last_name, user_email]
        );

        res.status(200).json({
          message: 'Användaren har uppgraderats till medlem',
          memberId: existingUser[0].id,
        });
        return;
      } else {
        res
          .status(409)
          .json({ message: 'E-postadressen är redan registrerad som medlem' });
        return;
      }
    }

    const hashedPassword = await PasswordEncryptor.encrypt(user_password);

    const query = `
      INSERT INTO user (user_email, user_password, first_name, last_name, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = (await db.execute(query, [
      user_email,
      hashedPassword,
      first_name,
      last_name,
      'member',
    ])) as unknown as [ResultSetHeader];

    res.status(201).json({
      message: 'Användare registrerad med rollen "member"',
      memberId: result.insertId,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Fel vid registrering:', error.message);
      res.status(500).json({
        message: 'Serverfel vid registrering',
        error: error.message,
      });
    } else {
      console.error('Ett okänt fel inträffade vid registrering');
      res.status(500).json({ message: 'Ett okänt fel inträffade' });
    }
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Både e-post och lösenord krävs' });
    return;
  }

  const query = `
        SELECT * FROM user WHERE user_email = ?
        `;

  try {
    const [rows] = (await db.execute(query, [email])) as RowDataPacket[];

    const user = rows[0];

    if (!user) {
      res.status(401).json({ message: 'Användaren hittades inte' });
      return;
    }

    const passwordMatch = await PasswordEncryptor.check(
      password,
      user.user_password
    );
    if (!passwordMatch) {
      res
        .status(401)
        .json({ message: 'Något gick fel med e-post eller lösenord' });
      return;
    }

    req.session.user = {
      id: user.id,
      email: user.user_email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };

    res.status(200).json({ message: 'Inloggning lyckades' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Fel vid inloggning:', error.message);
      res.status(500).json({ message: 'Serverfel vid inloggning' });
    } else {
      console.error('Ett okänt fel inträffade vid inloggning');
      res.status(500).json({ message: 'Ett okänt fel inträffade' });
    }
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Utloggning misslyckades' });
      } else {
        res.status(200).json({ message: 'Utloggning lyckades' });
      }
    });
  } else {
    res.status(400).json({ message: 'Ingen användare är inloggad' });
  }
};

export default {
  register,
  login,
  logout,
};
