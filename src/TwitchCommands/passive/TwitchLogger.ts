import {CommandConstructorPackage, TwitchCommandInterface, TwitchEvent} from "../../Interfaces";

export class TwitchLogger implements TwitchCommandInterface{
    config: CommandConstructorPackage;
    constructor(commandConstructorPackage: CommandConstructorPackage){
        this.config=commandConstructorPackage;
    }
    init(){}

    triggered(twitchEvent: TwitchEvent): boolean {
        return true;
    }

    async process(twitchEvent: TwitchEvent): Promise<void> {
        const userState: any = twitchEvent.userState;
        this.config.logger.debug("Writing to DB");
        await this.config.db.insertSQL("INSERT INTO chat_log (channel, user, message) values (?,?,?)", [twitchEvent.channel, userState['display-name'], twitchEvent.message]);
    }

}