import { State, Action, StateContext } from '@ngxs/store';
import { WebsocketAction } from './websocket.actions';

export class WebsocketStateModel {
  public items: string[];
}

@State<WebsocketStateModel>({
  name: 'websocket',
  defaults: {
    items: []
  }
})
export class WebsocketState {
  @Action(WebsocketAction)
  add(ctx: StateContext<WebsocketStateModel>, action: WebsocketAction) {
    const state = ctx.getState();
    ctx.setState({ items: [ ...state.items, action.payload ] });
  }
}
