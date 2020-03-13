import {LoggerInterface, TwitchEvent, TwitchEventHandlerInterface} from "./Interfaces";
import {Client} from "tmi.js";
import {TwitchMessagePool} from "./TwitchMessagePool";
import {TwitchCommands} from "./TwitchCommands";

export class TwitchEventHandler implements TwitchEventHandlerInterface{
    twitchMessagePool: TwitchMessagePool;
    twitchClient: Client;
    logger: LoggerInterface;
    twitchCommands: TwitchCommands;
    constructor(twitchClient: Client, logger: LoggerInterface, twitchMessagePool: TwitchMessagePool, twitchCommands: TwitchCommands) {
        this.twitchClient=twitchClient;
        this.logger=logger;
        this.twitchMessagePool=twitchMessagePool;
        this.twitchCommands=twitchCommands
    }
    async onMessage(channel: string, userState: any, message: string, self: boolean) {
        const twitchEvent: TwitchEvent ={
            channel: channel,
            userState: userState,
            message: message
        };
        if(!self){
            for(const command of this.twitchCommands.getCommands ){
                try{
                    if(command.triggered(twitchEvent)){
                        await command.process(twitchEvent)
                    }
                }catch (e) {
                    this.logger.debug("There has been a command error");
                    throw(e)

                }
            }

        }
    }
}