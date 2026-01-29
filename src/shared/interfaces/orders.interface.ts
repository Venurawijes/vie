export interface IOrder {
  order_id: number;
  invoice_number: string;
  order_token: string;
  table_number: string;
  order_type: string;
  order_type_id: number;
  order_status: {
    value: string;
    label: string;
  };
  accepted: number;
  payment_status: {
    value: string;
    label: string;
  };
  takeaway_type: string;
  items: IItems[] | Record<number, IItems[]>;
  new_round: number | null;
  new_round_added_at: string | null;
  is_order_items_completed: boolean;
  created_at: string;
  order_food_preparation_completed_at: string;
  completed_rounds: {
    round: number;
    round_completed_at: string;
  }[];
  food_preparation_status: number;
  updated_at: string;
  is_new_order?: boolean;
}

export interface IItems {
  item_id: number;
  menu_item_id: number;
  item_name: string;
  qty: string;
  created_at: string;
  init_qty: string;
  round: number;
  food_preparation_status: number;
  note: string;
  images: string[];
  extensions: {
    portion?: {
      item_name: string;
    };
    extras?: {
      item_name: string;
    }[];
  };
}

export interface ISocketOrdersData {
  order_id: number;
  order_type: string;
}

export interface OrderSocketMessage {
  type: string;
  data: ISocketOrdersData;
}
