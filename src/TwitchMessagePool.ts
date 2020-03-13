import {TwitchChatMessage} from "./TwitchMessages/TwitchChatMessage";
import {Client} from "tmi.js";
import {LoggerInterface, TwitchMessagePoolInterface} from "./Interfaces";
import {TwitchWhisperMessages} from "./TwitchMessages/TwitchWhisperMessages";

export class TwitchMessagePool implements TwitchMessagePoolInterface {
    private twitchClient: Client;
    private logger: LoggerInterface;
    private pool: Array<TwitchChatMessage | TwitchWhisperMessages> = new Array<TwitchChatMessage>();

    constructor(twitchClient: Client, logger: LoggerInterface) {
        this.twitchClient = twitchClient;
        this.logger = logger
    }

    public add(message: TwitchChatMessage | TwitchWhisperMessages) {
        this.pool.push(message)
    }

    async ProcessMessages() {
        function delay(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }

        while (true) {
            await delay(5000); //pool is checked after the delay
            if (this.pool.length !== 0) {

                let tempMessage = this.getNextMessage();

                if (tempMessage instanceof TwitchChatMessage) {
                    this.logger.debug("Chat Message");
                    await this.twitchClient.say(tempMessage.channel, tempMessage.sendMessage)
                }

                if (tempMessage instanceof TwitchWhisperMessages) {
                    this.logger.debug("whisper Message");
                    if (tempMessage.recipient !== "") {
                        await this.twitchClient.whisper(tempMessage.recipient, tempMessage.sendMessage)
                    }
                }

            } else {
                //Nothing to do, Pool is empty
                //this.logger.debug("Pool is Empty")
            }

        }
    }

    private getNextMessage() {
        if (this.pool.length !== 0) {
            return this.pool.shift() as TwitchChatMessage | TwitchWhisperMessages;
        }
    }
}