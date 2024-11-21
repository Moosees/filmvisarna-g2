import { Request, Response, NextFunction } from "express";

const getUserFromSession = (req: Request) => {
  return req.session.user;
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const user = getUserFromSession(req);
  if (user) {
    next(); //user is logged in, proceed
  } else {
    res.status(401).json({ message: 'Du måste vara inloggad för att komma åt denna resurs.' });
  }
};

//middleware, check if user has 'admin'
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = getUserFromSession(req);
  if (user && user.role === 'admin') {
    next(); //if user is admin, proceed
  } else if (!user) {
    res.status(401).json({
      message: 'Obehörig: Logga in för att få tillgång.',
    });
  } else {
    res.status(403).json({
      message:
        'Du har inte behörighet att komma åt denna resurs. Admin-åtkomst krävs.',
    });
  }
};

export { isAuthenticated, isAdmin };