export type City = {
  name: string;
  image: string;
};
export type Category = {
  topic: string;
  image: string;
};

export type Events = {
  image: string;
  date: string;
  eventName: string;
  location: string;
  amount: string;
  eventType: string;
};

export type Select = {
  options: { name: string }[];
  color: 'light' | 'dark';
};

export type Switch = {
  defaultValue: boolean;
};
