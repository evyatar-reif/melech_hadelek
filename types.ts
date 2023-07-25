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

export type drive = {
  distance: number;
  type: 'city' | 'highway';
};

export type cost = {
  noMaamNoService: number;
  noMaamYesService: number;
  yesMaamNoService: number;
  yesMaamYesService: number;
};
