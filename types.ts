export type carInfo = {
  id: string;
  make: string;
  model: string;
  year: string;
};

export type carEconomy = {
  city: number | null;
  highway: number | null;
};

export type car = {
  info: carInfo;
  economy: carEconomy;
};
