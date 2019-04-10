import { Service } from 'typedi';
import { ReplaySubject, BehaviorSubject } from "rxjs";
import * as socketIo from "socket.io";
import * as express from "express";
import { createSocketServer } from "socket-controllers";

/**
 * Main db service
 */
@Service()
export class WebSocketService {
    protected _server: SocketIO.Server;
    public get ws(): SocketIO.Server {
        return this._server;
    }
    public ready = new BehaviorSubject(false);

    public constructor() {
        createSocketServer(3001, {
            useClassTransformer: false,
            controllers: [
                __dirname + `/../controllers/**.controller.ts`,
                __dirname + `/../controllers/**.controller.js`,
            ]
        });
    }

}
