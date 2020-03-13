import {Config} from "./Config"
import {Database} from "./Database";
import {LoggerInterface} from "./Interfaces";
import {DiskBot} from "./DiskBot";

let config = new Config("./credentials.env");
const logger: LoggerInterface = console;
const db = new Database(logger, config);
const diskbot = new DiskBot(config, logger, db);
diskbot.start();

