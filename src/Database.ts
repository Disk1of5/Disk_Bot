import {Pool} from "mariadb";
import {DatabaseInterface, LoggerInterface} from "./Interfaces";
import {Config} from "./Config";
export class Database implements DatabaseInterface{
    readonly pool: Pool;
    readonly logger: LoggerInterface;
    constructor(logger: LoggerInterface, config: Config) {
        const mariadb = require('mariadb');
        this.logger= logger;
        this.pool = mariadb.createPool({host: config.dbHost, port: '3306', user: config.dbUserName, password: config.dbPassword, database: 'disk_bot', connectionLimit: 5});

        //this.testConnection().then(r => logger.debug('Connection Test Complete'))
        this.testConnection()
    }

    async testConnection(){
        let conn;
        try{
            conn=await this.pool.getConnection();
            console.log('Connection Test Successful')
        }catch (e) {
            console.log('Unable to Connect to Database');
            throw e;
        }finally {
            if(conn) conn.release()
        }
    }

    public async insertSQL(sql: string, values: Array<any> ){
        let pool= this.pool;
        let logger=this.logger;
        logger.debug('Attempting Connection');
        logger.debug('attempting async function');
        let conn;
        try {
                conn = await pool.getConnection();
                //logger.debug("Database Connection successful")
                const res = await conn.query(sql, values);
                logger.debug(res); //[ {val: 1}, meta: ... ]
            } catch (err) {
                //logger.debug("Database Connection Error!")
                throw err;
            } finally {
                if (conn) conn.release(); //release to pool
                //logger.debug("Database Connection released to pool")
            }
    }

    public async selectSQL<T>(sql: string):Promise<Array<T>> {
        let pool = this.pool;
        let logger = this.logger;
        logger.debug('Attempting Connection');
            let conn;
            let rows;
            try {
                conn = await pool.getConnection();
                logger.debug("Database Connection successful");
                rows = await conn.query(sql);
            } catch (err) {
                logger.debug("Database Connection Error!");
                throw err;
            } finally {
                if (conn) conn.release(); //release to pool
                logger.debug("Database Connection released to pool");
            }

            return await rows;
    }

}