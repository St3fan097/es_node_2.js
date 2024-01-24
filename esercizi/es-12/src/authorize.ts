import { Request, Response, NextFunction } from "express";
import passport from "passport";

const authorize = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err: any, user: Express.User | undefined) => {
        if (err || user) {
            res.status(401).json({ msg: "Non autorizzato." });
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};

export { authorize };