export interface Estate {
  id: number;
  address: string;
  city: string;
  currency: string;
  price: number;
  type: 'house' | 'apartment' | 'commercial';
}
