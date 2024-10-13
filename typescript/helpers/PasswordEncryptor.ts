import bcrypt from 'bcryptjs';

const bcryptRounds = 10;

const encrypt = async (
  object: { [key: string]: any },
  fields: string[]
): Promise<void> => {
  for (const key of fields) {
    if (key in object) {
      const value = String(object[key]);
      object[key] = await bcrypt.hash(value, bcryptRounds);
    }
  }
};

const check = async (
  unencrypted: string,
  encrypted: string
): Promise<boolean> => {
  return bcrypt.compare(unencrypted, encrypted);
};

export const PasswordEncryptor = {
  encrypt,
  check,
};
