import bcrypt from 'bcryptjs';

const bcryptRounds = 12;

const encrypt = async (password: string): Promise<string> => {
  return bcrypt.hash(password, bcryptRounds);
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
