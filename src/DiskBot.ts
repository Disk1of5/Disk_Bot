import {DiskBotInterface, LoggerInterface} from "./Interfaces";
import {Config} from "./Config";
import {Database} from "./Database";
import {Client} from "tmi.js";

import {TwitchEventHandler} from "./TwitchEventHandler";
import {TwitchCommands} from "./TwitchCommands";
import {TwitchMessagePool} from "./TwitchMessagePool";

export class DiskBot implements DiskBotInterface {
    private config: Config;
    readonly logger: LoggerInterface;
    readonly db: Database;
    private twitchClient: Client | any;
    readonly twitchOwner: Array<string>;

    constructor(config: Config, logger: LoggerInterface, db: Database) {
        this.config = config;
        this.logger = logger;
        this.db = db;
        this.twitchOwner=config.twitchOwners
    }

    public get getTwitchOwner(): Array<String>{
        return this.twitchOwner as Array<string>
    }

    public start() {
        this.startTwitch()
    }

    private startTwitch() {
        //connect
        const Twitch = require('tmi.js');
        const options = {
            options: {debug: true},
            connection: {reconnect: true},
            channels: this.config.twitchChannels,
            identity: {
                username: this.config.twitchUsername,
                password: this.config.twitchPassword
            }
        };
        this.twitchClient = Twitch.client(options);
        const twitchMessagePool=new TwitchMessagePool(this.twitchClient, this.logger);
        twitchMessagePool.ProcessMessages();
        const twitchCommands= new TwitchCommands(this, this.twitchClient,twitchMessagePool, this.logger, this.db);
        const twitchEventHandler = new TwitchEventHandler(this.twitchClient, this.logger, twitchMessagePool, twitchCommands);
        this.twitchClient.on('message', async (channel: string, userState: Array<string>, message: string, self: boolean) => {
            await twitchEventHandler.onMessage(channel, userState, message, self)
        });
        this.twitchClient.connect();
        this.logger.debug('Connected to Twitch Servers')
    }
}
