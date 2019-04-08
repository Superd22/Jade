import { JadeConfig } from './../../config/jade.config';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Service, Container, ObjectType } from "typedi";
import { createConnection, Connection, useContainer, FindOneOptions } from "typeorm";
import { ReplaySubject } from "rxjs";
import { first } from "rxjs/operators";

/**
 * Main db service
 */
@Service()
export class DbService {

    /** our connection watcher  */
    private _connectionSub: ReplaySubject<Connection> = new ReplaySubject(1);
    /** Subject for the current active connection */
    public get connectionSubject(): ReplaySubject<Connection> { return this._connectionSub; }
    /** async active connection object */
    public get connection(): Promise<Connection> { return this.connectionSubject.pipe(first()).toPromise(); }
    private _co: Connection;

    public constructor() {
        createConnection({
            type: "mysql",
            host: JadeConfig.database.host,
            port: 3306,
            username: JadeConfig.database.user,
            password: JadeConfig.database.pwd,
            database: JadeConfig.database.db,
            entities: [
                __dirname + "/../entities/**/**.entity.ts",
                __dirname + "/../entities/**/**.entity.js",
            ],
            synchronize: true,
        });

    }


}