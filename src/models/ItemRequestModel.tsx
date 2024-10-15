export type ItemRequest = {
  filepath: string;
  id: number;
  name: string;
  scale: number;
  status: string;
  remarks: string;
  type: string;
  xOffset: number;
  yOffset: number;
};

export enum ItemType {
  HAT = "hat",
  SHIRT = "shirt",
  BOTTOM = "bottom",
  BASE = "base",
}

export interface Item {
  id: number;
  name: string;
  type: ItemType;
  filepath: string;
  status: string;
  remarks: string;
  business_register_business?: {
    registration_id: number;
  };
  outlet?: {
    outlet_id: number;
  };
  scale?: number;
  xOffset?: number;
  yOffset?: number;
}
