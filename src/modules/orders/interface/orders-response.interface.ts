import { IOrder } from '@/shared/interfaces/orders.interface';

export interface IOrdersResponse {
  success: boolean;
  order: IOrder;
}

export interface IPendingOrdersResponse {
  success: boolean;
  orders: IOrder[];
  pending_order_ids?: number[];
  last_sync_time?: string;
}

export interface IUpdateOrderStatusResponse {
  success: boolean;
}
