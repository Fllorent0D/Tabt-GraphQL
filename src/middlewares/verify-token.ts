import {verify} from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';

const {promisify} = require('es6-promisify');
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	const {authorization} = req.headers;
	if (!authorization) {
		return next();
	}
	const verifyJWT = promisify(verify);

	try {
		req['jwt'] = await verifyJWT(authorization, 'secret');
		return next();
	} catch(error){
		res.status(500).send(error).end();
	}
};


