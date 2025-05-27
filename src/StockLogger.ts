import type { WriteStream } from "fs";
import type { StockTickDataType } from "./types/stock";

const path = require("path");
const { createWriteStream, mkdirSync } = require("fs");
const { format, startOfHour } = require("date-fns");

const LOG_PATH = path.resolve(__dirname, "../logs");
const DATE_FORMAT = "dd-MM-yyyy__HH-mm"; // replaced / and : => invalid file names in windows

export class PriceLogger {
  private currentStream?: WriteStream;
  private currentHour: Date;
  private readonly logPath: string = LOG_PATH;

  constructor(logPath: string) {
    this.logPath = logPath;
    mkdirSync(this.logPath);
    this.currentHour = startOfHour(new Date());
    this.createStream();
  }

  private genLogFileName(date: Date): string {
    return format(date, DATE_FORMAT) + ".log";
  }

  private createStream() {
    const filename = this.genLogFileName(this.currentHour);
    this.currentStream?.end();
    this.currentStream = createWriteStream(`${this.logPath}/${filename}`, {
      flags: "a", // append to log file
      encoding: "utf8",
    });
  }

  log(tickData: StockTickDataType) {
    const currentHour = startOfHour(new Date());

    if (currentHour.getTime() !== this.currentHour.getTime()) {
      this.currentHour = currentHour;
      this.createStream();
    }

    const timestamp = format(tickData.timestamp, DATE_FORMAT);
    const logLine = `<${timestamp}> <${tickData.name}> - <${tickData.price}>\n`;
    if (this.currentStream?.writable) this.currentStream.write(logLine);
  }

  stop() {
    this.currentStream?.end();
  }
}
