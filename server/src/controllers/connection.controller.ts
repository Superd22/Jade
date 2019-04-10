import { User } from './../entities/user.entity';
import { AuthService } from './../services/auth.service';
import {
    SocketController,
    OnConnect,
    ConnectedSocket,
    OnDisconnect,
    OnMessage,
    MessageBody,
    EmitOnSuccess
} from "socket-controllers";
import Container from 'typedi';
import { Socket } from 'socket.io';

import { GotUserProfile } from "@jade/core/state/authenticate.actions";

@SocketController()
export class ConnectionController {

    protected _auth: AuthService = Container.get(AuthService);

    @OnConnect()
    connection(@ConnectedSocket() socket: any) {
        console.log("client connected");
    }

    @OnDisconnect()
    disconnect(@ConnectedSocket() socket: any) {
        console.log("client disconnected");
    }

    @OnMessage("authentify")
    @EmitOnSuccess("actions")
    async authentify(@ConnectedSocket() socket: JadeSocket, @MessageBody() body: { token: string }) {
        if (!body.token) {
            // todo disconect
        } else {
            const payload = this._auth.verifyJWT(body.token);
            if (!payload) throw new Error(`Unauthorized`);
            socket.user = await User.findOne({ where: { id: payload.userId } });

            if(socket.user) {
                return new GotUserProfile(socket.user.discordData);
            }
        }
    }

}


export interface JadeSocket extends Socket {
    user: User | undefined;
}