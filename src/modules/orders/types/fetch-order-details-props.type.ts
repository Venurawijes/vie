export type FetchOrderDetailsProps = {
  orderId: number;
  branchId: number;
  isNewOrder: boolean;
};

export type FetchPendingOrdersProps = {
  branchId: number;
  date: string;
  details: number;
  only_ids: number;
};

export type UpdateOrderStatusProps = {
  order_id: number;
  branchId: number;
};

export type UpdateOrderItemStatusProps = {
  order: {
    order_id: number;
    item_id: number;
    food_preparation_status: string;
  }[];
};
