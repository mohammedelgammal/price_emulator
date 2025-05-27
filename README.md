# 📈 Stock Price Emulator

A lightweight stock market simulation tool that emulates live stock price fluctuations, logs data, and displays the top performing stocks in real-time

## 🚀 Features

- 🕒 **Live Price Emulation**: Simulates stock price changes every 1–4 seconds.
- 🧠 **Top Stocks Queue**: Maintains the top M stocks ranked by percentage gain.
- 📝 **Hourly Logging:** Logs every tick to a time-stamped file in ./logs/.
- 🔌 **Graceful Shutdown:** Cleans up timers and file streams on exit (Ctrl+C).
- 🖥️ **Console Output:** Real-time display of top-performing stocks.

## 📁 Project Structure

```
├── src/
│ ├── utils/
│ │ └── numbersUtils.ts
│ ├── StockPriceEmulator.ts # Emits price updates
│ ├── TopStocksQueue.ts # Tracks top M performing stocks
│ ├── StockLogger.ts # Handles file-based logging
│ ├── types/
│ │ └── stock.ts # Shared type definitions
│ └── main.ts # Entry point
└── logs/ # (Generated) Timestamped tick logs
```

## ⚙️ How It Works

Each StockPriceEmulator simulates a unique stock. Prices fluctuate randomly around a base, and percentage changes are calculated from the starting value.

Each time a stock updates:

- It's logged to a file (rotated every hour).
- It's pushed into a TopStocksQueue.
- The top 20 stocks by % gain are printed to the console.

## 🛠️ Getting Started

1. Clone and install

```bash
git clone git@github.com:mohammedelgammal/price_emulator.git
cd stock-emulator
```

2. Install Dependencies

```bash
npm install
```

3. Run Emulator

```bash
npm run dev
```

## 📂 Logs

Each log file is created per hour and named using the format:

    dd-MM-yyyy__HH-mm.log

    // To be compatible for all OS file systems

Example log line:

    <27-05-2025__15-00> <Stock34> - <112.48>

## 🧪 Customization

- **Update Frequency:** Controlled using X in main.ts (defaults to 1000 ms → updates occur every 1–4 seconds).
- **Number of Stocks:** Controlled with stockNames array length.
- **Leaderboard Size:** Change M = 20 in main.ts.

## 🧹 Graceful Exit

The application listens for termination signals:

```bash
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
```

This ensures all emulators are stopped and file streams are closed properly.

## 📦 Dependencies

- eventemitter3 – for managing tick events
- heap-js – for maintaining top N stocks
- date-fns – for date formatting and hourly rotation
- fs, path – for file I/O
