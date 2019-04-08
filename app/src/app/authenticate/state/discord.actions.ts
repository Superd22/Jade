export class DiscordAction {
  static readonly type = '[Discord] Add item';
  constructor(public payload: string) { }
}
