import { Application, Request, Response, NextFunction } from 'express';

interface PasswordCheckerSettings {
  passwordOKRegEx: string;
  passwordFieldNames: string[];
  passwordOkIf: string;
}

const addMiddleware = (
  app: Application,
  prefix: string,
  settings: PasswordCheckerSettings
): void => {
  const regEx = new RegExp(settings.passwordOKRegEx);

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url.startsWith(prefix + 'login')) {
      next();
      return;
    }

    for (const field of settings.passwordFieldNames) {
      if (field in req.body && !regEx.test(req.body[field])) {
        res.status(400).json({
          error: `Lösenordet uppfyller inte kriterierna: ${settings.passwordOkIf}`,
        });
        return;
      }
    }

    next();
  });
};

export const PasswordChecker = {
  addMiddleware,
};
