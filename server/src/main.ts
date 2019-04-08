import { WebSocketService } from './services/websocket.service';
import { DbService } from './services/db.service';
import { Container } from 'typedi';
import "reflect-metadata";

Container.get(DbService);
Container.get(WebSocketService);