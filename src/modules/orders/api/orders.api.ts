import { AxiosInstance, AxiosResponse } from 'axios';

import { HttpService } from '@/core/services/http/http.service';
import {
  FetchOrderDetailsProps,
  FetchPendingOrdersProps,
  UpdateOrderItemStatusProps,
  UpdateOrderStatusProps,
} from '../types/fetch-order-details-props.type';
import {
  IOrdersResponse,
  IPendingOrdersResponse,
  IUpdateOrderStatusResponse,
} from '../interface/orders-response.interface';

export class OrdersApi {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = new HttpService().getInstance();
  }

  async fetchOrderDetails(props: FetchOrderDetailsProps): Promise<AxiosResponse<IOrdersResponse>> {
    return this.axiosInstance.get(`api/v2/order/${props.orderId}/details`);
  }

  async fetchPendingOrdersByBranchId({
    branchId,
    date,
    details,
    only_ids,
  }: FetchPendingOrdersProps): Promise<AxiosResponse<IPendingOrdersResponse>> {
    return this.axiosInstance.get(
      `api/v2/branch/${branchId}/orders?page=1&page_size=1000&order_status=IN_PROGRESS&details=${details}&last_sync_time=${date}&only_ids=${only_ids}`
    );
  }

  async updateOrderStatus(
    props: UpdateOrderStatusProps
  ): Promise<AxiosResponse<IUpdateOrderStatusResponse>> {
    return this.axiosInstance.patch(`api/v2/order/complete-food-preparation`, props);
  }

  async updateOrderItemStatus(
    props: UpdateOrderItemStatusProps
  ): Promise<AxiosResponse<IUpdateOrderStatusResponse>> {
    return this.axiosInstance.post(`api/v2/order-item/update-food-preparation-status`, props);
  }
}
