import { AuthService } from './../services/auth.service';
import { User } from './../entities/user.entity';
import { Container } from 'typedi';
import { SocketController, OnMessage, MessageBody, EmitOnSuccess, SkipEmitOnEmptyResult, EmitOnFail } from "socket-controllers";
import { default as axios } from "axios";
import { JadeConfig } from "../../config/jade.config";
import { DiscordService } from '../services/discord.service';
@SocketController()
export class DiscordController {
    protected _discord = Container.get(DiscordService);
    protected _auth = Container.get(AuthService);
    /**
     * Someone is trying to use a discord oauth2 code.
     * @param code 
     */
    @OnMessage("code")
    @EmitOnSuccess("actions")
    @EmitOnFail("actions")
    @SkipEmitOnEmptyResult()
    public async code(@MessageBody() { code }: { code: string }) {
        try {
            const token = await this._discord.getToken(code);
            if (token) {
                const userData = await this._discord.getCurrentUser(token.access_token);
                if (userData) {
                    let user = await User.findOne({ where: { email: userData.email } });

                    if (!user || !user.id) {
                        user = await User.create();
                    }

                    user.email = userData.email;
                    user.discordData = userData;
                    user.discordToken = token;

                    await user.save();

                    const jwt = this._auth.createJWT(user.id);
                    return { type: "[Auth] Got JWT", jwt };
                }
            }
        } catch (e) {
            return {
                type: "[API] Api Error",
                error: e.message ? e.message : e
            }
        }
    }
}

export interface DiscordToken {
    access_token: string
    scope: string,
    token_type: 'Bearer',
    expires_in: number,
    refresh_token: string,
}
