export type Nullable<T> = T | null;

export type StockTickDataType = {
  name: string;
  price: number;
  percentage: number;
  timestamp: Date;
};
