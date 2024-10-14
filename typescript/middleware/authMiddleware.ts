import { Request, Response, NextFunction } from "express";

const getUserFromSession = (req: Request) => {
  return req.session.user;
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const user = getUserFromSession(req);
  if (user) {
    next(); //user is logged in, proceed
  } else {
    res.status(401).json({ message: 'Nej.' });
  }
};

//middleware, check if user has 'admin'
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = getUserFromSession(req);
  if (user && user.role === 'admin') {
    next(); //if user is admin, proceed
  } else {
    res.status(403).json({ message: 'Nej, bara katter här' })
  }
};


export  { isAuthenticated , isAdmin}