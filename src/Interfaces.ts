import {DiskBot} from "./DiskBot";
import {TwitchChatMessage} from "./TwitchMessages/TwitchChatMessage";
import {TwitchWhisperMessages} from "./TwitchMessages/TwitchWhisperMessages";
import {Client} from "tmi.js";
import {TwitchMessagePool} from "./TwitchMessagePool";
import {Database} from "./Database";

export interface DatabaseInterface {
    insertSQL(sql: string, values: Array<any> ):void
    selectSQL<T>(sql: string):void
}

export interface ConfigInterface{
    twitchUsername: string
    twitchPassword: string
    twitchChannels: Array<string>
    twitchOwners: Array<string>
    dbUserName: string
    dbPassword: string
    dbHost: string
    dbDatabase:string
}

export interface DatabaseInterface {
    insertSQL(sql: string, values: Array<any> ):void
    selectSQL<T>(sql: string):void
}

export interface LoggerMethodInterface{
    (msg: string, ...args: any[]): void
    (obj: object, msg?: string, ...args: any[]):void
}

export interface LoggerInterface {
    debug: LoggerMethodInterface
    info: LoggerMethodInterface
    warn: LoggerMethodInterface
    error: LoggerMethodInterface
}

export interface DiskBotInterface {
    start():void
}
export interface TwitchChatMessageInterface{
        channel: string
        userState: Array<string>
        receivedMessage: string
        sendMessage:string
}
export interface TwitchWhisperMessageInterface{
    recipient: string
    channel: string
    userState: Array<string> | any
    receivedMessage: string
    sendMessage:string
}

export interface TwitchCommandInterface {
    init(): void
    triggered(twitchEvent: TwitchEvent): boolean
    process(twitchEvent:TwitchEvent): Promise<void>
}
export interface TwitchEventHandlerInterface {
    onMessage(channel:string, userState: Array<string>,message: string, self: boolean):void

}
export interface CommandConstructorPackage{
    diskBot: DiskBot
    twitchClient: Client
    twitchMessagePool: TwitchMessagePool
    logger: LoggerInterface
    db: Database
}
export interface TwitchMessagePoolInterface{
    add(message: TwitchChatMessage|TwitchWhisperMessages): void
    ProcessMessages():void
}

export interface TwitchCommandsInterface{
    getCommands: Array<TwitchCommandInterface>
}

export interface TwitchEvent{
    channel: string,
    userState: Array<string> | any
    message: string
}