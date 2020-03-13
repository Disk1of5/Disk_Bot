
import {ConfigInterface} from "./Interfaces"
export class Config implements ConfigInterface{
    dbHost: string;
    dbPassword: string;
    dbUserName: string;
    dbDatabase: string;
    twitchPassword: string;
    twitchUsername: string;
    twitchChannels: Array<string>;
    twitchOwners: Array<string>;

    constructor(path: string) {
        require('dotenv').config({path:path});
        this.twitchUsername=process.env.TWITCH_NAME as string;
        this.twitchPassword=process.env.TWITCH_PASSWORD as string;
        const twitChannels=process.env.TWITCH_CHANNELS as string;
        this.twitchChannels=twitChannels.split(",") as Array<string>;
        const twitchOwners=process.env.TWITCH_OWNERS as string;
        this.twitchOwners=twitchOwners.split(",") as Array<string>;
        this.dbHost=process.env.DB_HOST as string;
        this.dbUserName=process.env.DB_USERNAME as string;
        this.dbPassword=process.env.MYSQL_ROOT_PASSWORD as string;
        this.dbDatabase=process.env.DB_DATABASE as string;

    }
}