export interface Estate {
  id: number;
  address: string;
  city: string;
  currency: string;
  price: number;
  type: 'house' | 'apartment' | 'commercial';
}

export interface EstateQuery {
  search: string;
  type?: string;
}

export type Column = {
  key: keyof Estate;
  label: string;
};

export type Header = Column[];
