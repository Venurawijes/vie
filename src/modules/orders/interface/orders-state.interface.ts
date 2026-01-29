import { IOrder } from '@/shared/interfaces/orders.interface';

export interface IOrdersState {
  orders: Record<number, IOrder[]>;
  error: string | null;
  loading: boolean;
  order_ids: Record<number, number[]>;
}
