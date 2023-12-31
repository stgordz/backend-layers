import jwt from 'jsonwebtoken';
import config from '../config/enviroment.config.js';

const jwtSecret = config.JWT_SECRET;

export const generateToken = (user) => {
	const token = jwt.sign(
		{ id: user.id, email: user.email, role: user.role },
		jwtSecret,
		{ expiresIn: '1d' }
	);
	return token;
};

export const authToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).send('No authorization');
	}

	const token = authHeader.split(' ')[1];
	jwt.verify(token, jwtSecret, (err, credential) => {
		if (err) {
			return res.status(401).send('No authorization');
		}
		req.user = credential.user;
		next();
	});
};
