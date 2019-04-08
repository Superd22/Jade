import { JadeConfig } from './../../config/jade.config';
import { Service } from "typedi";
import * as jwt from "jsonwebtoken";
@Service()
export class AuthService {

    public createJWT(userId: number) {
        return jwt.sign({ userId }, JadeConfig.jwtSecret);
    }

    public verifyJWT(jwtPayload: string) {
        const token = jwt.verify(jwtPayload, JadeConfig.jwtSecret);

        if (token) { return token; }
        else return false;
    }

}