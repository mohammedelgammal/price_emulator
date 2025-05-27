import type { StockTickDataType, Nullable } from "./types/stock.js";

const EventEmitter = require("eventemitter3");
const toFixedDecimal = require("./utils/numbersUtils");

class StockPriceEmulator extends EventEmitter {
  public readonly name: string = "";
  private startingPrice: number = 0;
  private price: number = 0;
  private changePercentage: number = 0;
  private timer: Nullable<NodeJS.Timeout> = null;
  private readonly minInterval: number = 1000;
  private readonly maxInterval: number = 4000;

  constructor(
    name: string,
    startingPrice: number,
    minInterval: number,
    maxInterval: number
  ) {
    super();

    this.name = name;
    this.startingPrice = startingPrice;
    this.price = startingPrice;
    this.changePercentage = 0;
    this.minInterval = minInterval;
    this.maxInterval = maxInterval;

    this.scheduleUpdate();
  }

  private generateRandomPrice(): number {
    const priceChange: number = (Math.random() - 0.5) * 5; // ranging (-2.5, 2.5)
    return priceChange;
  }

  private scheduleUpdate(): void {
    const randomInterval =
      Math.floor(Math.random() * (this.maxInterval - this.minInterval + 1)) +
      this.MIN_INTERVAL;
    this.timer = setTimeout(() => this.updatePrice(), randomInterval);
  }

  private updatePrice() {
    const priceChange = this.generateRandomPrice();
    this.price += priceChange;
    this.changePercentage =
      this.startingPrice !== 0
        ? ((this.price - this.startingPrice) / this.startingPrice) * 100
        : 0;

    const stockTickData: StockTickDataType = {
      name: this.name,
      price: toFixedDecimal(this.price, 2),
      percentage: toFixedDecimal(this.changePercentage, 2),
      timestamp: new Date(),
    };

    this.emit("tick", stockTickData);
    this.scheduleUpdate();
  }

  public stop() {
    if (this.timer) clearTimeout(this.timer);
  }
}

module.exports = StockPriceEmulator;
export type { StockPriceEmulator };
