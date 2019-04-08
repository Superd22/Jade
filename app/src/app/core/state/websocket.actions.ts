export class WebsocketAction {
    static readonly type = '[Websocket] Add item';
    constructor(public payload: string) { }
}
