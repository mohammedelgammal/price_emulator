import { StockTickDataType } from "./types/stock";
import type { StockPriceEmulator as StockPriceEmulatorType } from "./StockPriceEmulator";

const StockPriceEmulator = require("./StockPriceEmulator");
const TopStocksQueue = require("./TopStocksQueue");
const PriceLogger = require("./StockLogger");

const M = 20; // stock leaderboard capacity
const X = 1000; // 1s in ms

const stockEmulators: StockPriceEmulatorType[] = [];
const stockNames = Array.from({ length: 100 }, (_, i) => `Stock${i + 1}`);
const topStocksQueue = new TopStocksQueue(M);
const priceLogger = new PriceLogger(); // logs go to '../logs' default

stockNames.forEach((name) => {
  const startingPrice = Math.random() * 100 + 50; // price range: (50, 150)
  const emulator = new StockPriceEmulator(name, startingPrice, X, 4 * X);

  emulator.on("tick", (data: StockTickDataType) => {
    topStocksQueue.update(data);
    priceLogger.log(data);

    console.clear();
    console.log("Top Stocks by % change:");
    topStocksQueue.topStocks.forEach((s: StockTickDataType) =>
      console.log(`${s.name}: ${s.percentage}%`)
    );
  });

  stockEmulators.push(emulator);
});

// Graceful shutdown handler
const stop = () => {
  console.log("Stopping...");

  stockEmulators.forEach((emulator) => emulator.stop());
  priceLogger.stop();

  process.exit(0);
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);

console.log("StockPriceEmulator running. Press Ctrl+C to stop.");
