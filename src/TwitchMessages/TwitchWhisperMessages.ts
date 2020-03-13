import {TwitchWhisperMessageInterface} from "../Interfaces";

export class TwitchWhisperMessages implements TwitchWhisperMessageInterface{
    channel: string;
    receivedMessage: string;
    userState: Array<string>;
    sendMessage: string;
    recipient: string;
    constructor(recipient: string, channel: string, userState: Array<string>, receivedMessage: string, sendMessage:string) {
        this.channel=channel;
        this.userState=userState;
        this.receivedMessage=receivedMessage;
        this.sendMessage=sendMessage;
        this.recipient=recipient
    }
}