import type { StockTickDataType } from "./types/stock";
import type { Heap } from "heap-js";

const { Heap: MinHeap } = require("heap-js");

class TopStocksQueue {
  private readonly maxSize: number;
  private stockMap: Map<string, StockTickDataType> = new Map();
  private heap: Heap<StockTickDataType>;

  constructor(maxSize: number = 20) {
    this.maxSize = maxSize;
    this.heap = new MinHeap(comparator); // to be a min-heap
  }

  update(stock: StockTickDataType) {
    if (this.stockMap.has(stock.name)) {
      const old = this.stockMap.get(stock.name); // O(1)
      this.heap.remove(old); // O(n)
    }

    this.stockMap.set(stock.name, stock);
    this.heap.push(stock); // O(log n)

    if (this.heap.size() > this.maxSize) {
      const removed = this.heap.pop();
      this.stockMap.delete(removed!.name);
    }
  }

  get topStocks(): StockTickDataType[] {
    return [...this.heap.toArray()].sort(comparator);
  }
}

const comparator = (a: StockTickDataType, b: StockTickDataType) =>
  b.percentage - a.percentage;

module.exports = TopStocksQueue;
