import {TwitchChatMessageInterface} from "../Interfaces";

export class TwitchChatMessage implements TwitchChatMessageInterface{
    channel: string;
    receivedMessage: string;
    userState: Array<string>;
    sendMessage: string;
    constructor(channel: string, userState: Array<string>, receivedMessage: string, sendMessage:string) {
        this.channel=channel;
        this.userState=userState;
        this.receivedMessage=receivedMessage;
        this.sendMessage=sendMessage;
    }
}