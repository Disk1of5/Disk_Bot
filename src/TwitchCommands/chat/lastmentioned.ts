import {CommandConstructorPackage, TwitchCommandInterface, TwitchEvent} from "../../Interfaces";
import {TwitchChatMessage} from "../../TwitchMessages/TwitchChatMessage";

export class LastMentionedCommand implements TwitchCommandInterface {
    private config: CommandConstructorPackage;

    constructor(commandConstructorPackage: CommandConstructorPackage) {
        this.config = commandConstructorPackage
    }

    public init(): void {

    }

    triggered(twitchEvent: TwitchEvent): boolean {
        const username: string = twitchEvent.userState['display-name'];
        return this.config.diskBot.getTwitchOwner.includes(username.toLowerCase()) && twitchEvent.message === '!lastmentioned';
    }

    public lastmentioned(mentionee: string, channel: string, user: string, timestamp: string, message: string) {
        return `${mentionee} was last mentioned in ${channel} by @${user} on ${timestamp}. -- Message "${message}".`
    }

    public async process(twitchEvent: TwitchEvent): Promise<void> {
        type returnTemplate = {
            channel: string,
            user: string,
            message: string,
            timestamp: string
        }
        const SqlString = require('sqlstring');
        const username: string = twitchEvent.userState['display-name'];
        let rows_json = await this.config.db.selectSQL<returnTemplate>(
            "SELECT\n" +
            "    channel, user, message, timestamp\n" +
            "FROM chat_log cl\n" +
            "WHERE\n" +
            `(upper(cl.message) like '%${SqlString.format(username.toUpperCase())}%' or upper(cl.message) like '%${SqlString.format(username.toUpperCase())}')\n` +
            "    ORDER BY timestamp DESC\n" +
            "limit 1;"
        );

        if (typeof rows_json !== 'undefined') {
            if (rows_json.length === 1) {
                const userState: any = twitchEvent.userState;
                console.log('message found');
                const sendMsg: string = this.lastmentioned(userState['display-name'], rows_json[0].channel, rows_json[0].user, rows_json[0].timestamp, rows_json[0].message);
                this.config.twitchMessagePool.add(
                    new TwitchChatMessage(twitchEvent.channel, userState, twitchEvent.message, sendMsg)
                )

            } else {
                const sendMsg = 'there is no record of you being mentioned';
                this.config.twitchMessagePool.add(
                    new TwitchChatMessage(twitchEvent.channel, twitchEvent.userState, twitchEvent.message, sendMsg)
                );
                console.log('no message found')
            }
        }
    }
}