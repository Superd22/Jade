import { JadeConfig } from './../../config/jade.config';
import { Service } from "typedi";
import * as jwt from "jsonwebtoken";
@Service()
export class AuthService {

    public createJWT(userId: number) {
        return jwt.sign({ userId }, JadeConfig.jwtSecret);
    }

    /**
     * Verify that a JWT is signed and returns it
     * @param jwtPayload the payload we got as string
     */
    public verifyJWT(jwtPayload: string): JWToken | null {
        const token = jwt.verify(jwtPayload, JadeConfig.jwtSecret);

        if (token) { return token as JWToken; }
        else return null;
    }


}

/**
 * JWT exchanged with the front
 */
export interface JWToken {
    /** userid of the user currently auth'd */
    userId: number;
}