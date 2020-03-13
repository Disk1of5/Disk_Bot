import {DiskBot} from "./DiskBot";
import {Client} from "tmi.js";
import {TwitchMessagePool} from "./TwitchMessagePool";
import {LoggerInterface, TwitchCommandInterface, TwitchCommandsInterface} from "./Interfaces";
import {TwitchLogger} from "./TwitchCommands/passive/TwitchLogger";
import {Database} from "./Database";
import {LastMentionedCommand} from "./TwitchCommands/chat/lastmentioned";

export class TwitchCommands implements TwitchCommandsInterface{
    readonly commands: TwitchCommandInterface[] = [];
    readonly diskBot: DiskBot;
    readonly twitchClient: Client;
    readonly twitchMessagePool: TwitchMessagePool;
    readonly logger: LoggerInterface;
    readonly db: Database;

    constructor(diskBot: DiskBot, twitchClient: Client, twitchMessagePool: TwitchMessagePool, logger: LoggerInterface, db: Database) {

        this.diskBot = diskBot;
        this.twitchClient = twitchClient;
        this.twitchMessagePool = twitchMessagePool;
        this.logger = logger;
        this.db=db;

        const commandConstructorPackage={
            diskBot: this.diskBot,
            twitchClient: this.twitchClient,
            twitchMessagePool: this.twitchMessagePool,
            logger: this.logger,
            db: this.db
        };

        this.commands = [
            new TwitchLogger(commandConstructorPackage),
            new LastMentionedCommand(commandConstructorPackage)
        ];

        for (const command of this.commands) {
            command.init()
        }
    }
    get getCommands(): Array<TwitchCommandInterface>{
        return this.commands
    }
}