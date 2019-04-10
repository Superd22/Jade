import { WebSocketService } from './services/websocket.service';
import { DbService } from './services/db.service';
import { Container } from 'typedi';
import "reflect-metadata";
// www.js, index.js, main.js, etc
const TSModuleAlias = require("@momothepug/tsmodule-alias");
// Makes it work with playAuto method
// this method Will scan backward until tsconfig is found
const aliasRegister = TSModuleAlias.playAuto(__dirname);

Container.get(DbService);
Container.get(WebSocketService);