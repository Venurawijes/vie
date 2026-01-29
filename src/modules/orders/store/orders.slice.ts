import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { OrdersApi } from '../api/orders.api';
import { IOrdersState } from '../interface/orders-state.interface';
import {
  FetchOrderDetailsProps,
  FetchPendingOrdersProps,
  UpdateOrderItemStatusProps,
  UpdateOrderStatusProps,
} from '../types/fetch-order-details-props.type';
import { FoodPreparationStatusType, OrderStatusValues } from '@/shared/enums/order.enum';
import { IItems, IOrder } from '@/shared/interfaces/orders.interface';
import { getRemainingSeconds } from '@/shared/utils/helpers';

const ordersApi = new OrdersApi();

const initialState: IOrdersState = {
  orders: {},
  error: null,
  loading: false,
  order_ids: {},
};

/**
 * fetch order details by order id
 */
export const fetchOrderDetailsAsync = createAsyncThunk(
  'Orders/details',
  async (props: FetchOrderDetailsProps, { rejectWithValue }) => {
    try {
      const response = await ordersApi.fetchOrderDetails(props);
      return {
        data: response.data,
        branchId: props.branchId,
        isNewOrder: props.isNewOrder,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

/**
 * update order status by order id
 */
export const updateOrderStatusAsync = createAsyncThunk(
  'Orders/status/update',
  async (props: UpdateOrderStatusProps, { rejectWithValue }) => {
    try {
      const response = await ordersApi.updateOrderStatus(props);
      if (response.data.success) {
        return {
          orderId: props.order_id,
          branchId: props.branchId,
        };
      }
      return rejectWithValue(response?.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

/**
 * update order item status
 */
export const updateOrderItemStatusAsync = createAsyncThunk(
  'Orders/item/status/update',
  async (props: UpdateOrderItemStatusProps, { rejectWithValue }) => {
    try {
      const response = await ordersApi.updateOrderItemStatus(props);
      return {
        data: response.data,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

/**
 * fetch all pending orders
 */
export const fetchPendingOrdersAsync = createAsyncThunk(
  'Orders/list',
  async (props: FetchPendingOrdersProps, { rejectWithValue }) => {
    try {
      const response = await ordersApi.fetchPendingOrdersByBranchId(props);

      if (response.data.success && response.data?.last_sync_time) {
        const newProps: FetchPendingOrdersProps = {
          branchId: props.branchId,
          date: response.data?.last_sync_time,
          details: 1,
          only_ids: 0,
        };
        const res = await ordersApi.fetchPendingOrdersByBranchId(newProps);

        return {
          data: res.data,
          branchId: props.branchId,
        };
      }

      return {
        data: { orders: [] },
        branchId: props.branchId,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

/**
 * group items by round
 * @param order
 * @returns
 */
const prepareOrderItems = (order: IOrder) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemsArray: any = order.items;
  let atleast_one_item_not_completed = false;
  const groupedItems = itemsArray.reduce((acc: Record<number, IItems[]>, item: IItems) => {
    const round = Number(item.round);

    if (
      (item.food_preparation_status &&
        item.food_preparation_status < FoodPreparationStatusType.COMPLETED) ||
      (!item.food_preparation_status && item.qty !== '0')
    ) {
      atleast_one_item_not_completed = true;
    }
    const normalizedItem = {
      ...item,
      item_removed: item.qty === '0',
    };
    if (!acc[round]) acc[round] = [];
    acc[round].push(normalizedItem);

    return acc;
  }, {});

  return { atleast_one_item_not_completed, groupedItems };
};

/**
 * get updated order object with modified( sort according to rounds ) items array
 * @param order
 * @param items
 * @returns
 */
const getUpdatedItems = (
  order: IOrder,
  isNewOrder: boolean = true,
  previousOrder: IOrder | null = null,
  groupedItems: Record<number, IItems[]>,
  atleast_one_item_not_completed: boolean
) => {
  let previous_lastRound = null;
  let newRoundValRemoveTime = null;

  if (!isNewOrder && previousOrder?.order_id) {
    previous_lastRound = Number(Object.keys(previousOrder.items).pop());

    if (previousOrder.new_round_added_at) {
      newRoundValRemoveTime = getRemainingSeconds(previousOrder.new_round_added_at, 2);
    }
  }
  const lastRound = Number(Object.keys(groupedItems).pop());

  const new_round =
    lastRound !== 1 &&
    ((previous_lastRound && previous_lastRound < lastRound) ||
      (newRoundValRemoveTime && newRoundValRemoveTime > 0))
      ? lastRound
      : null;

  return {
    ...order,
    items: groupedItems,
    is_order_items_completed: !atleast_one_item_not_completed,
    new_round,
    new_round_added_at: new_round && !newRoundValRemoveTime ? order.updated_at : null,
  };
};

/**
 * sort orders by order id (decs)
 * @param arr
 * @param newOrder
 * @returns
 */
const insertSortedDesc = (arr: IOrder[], newOrder: IOrder): IOrder[] => {
  const insertIndex = arr.findIndex((o) => o.order_id < newOrder.order_id);
  if (insertIndex === -1) {
    arr.push(newOrder); // newOrder is smallest, add to end
  } else {
    arr.splice(insertIndex, 0, newOrder); // insert before first smaller order
  }
  return arr;
};

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateNewOrderStatus: (
      state,
      { payload }: { payload: { branchId: number; index: number } }
    ) => {
      state.orders[payload.branchId][payload.index].is_new_order = false;
    },
    removeCompletedOrders: (
      state,
      { payload }: { payload: { branchId: number; ids: number[] } }
    ) => {
      state.orders[payload.branchId] = (state.orders[payload.branchId] || []).filter(
        (order) => !payload.ids.includes(order.order_id)
      );
      state.order_ids[payload.branchId] = (state.order_ids[payload.branchId] || []).filter(
        (orderId) => !payload.ids.includes(orderId)
      );
    },
  },
  extraReducers: (builder) => {
    // if order exist replace if not add new
    builder.addCase(fetchOrderDetailsAsync.fulfilled, (state, { payload }) => {
      const {
        data: { order },
        branchId,
        isNewOrder,
      } = payload;

      let existingOrders = state.orders[branchId] ?? [];

      const { atleast_one_item_not_completed, groupedItems } = prepareOrderItems(order);

      // remove completed orders
      if (
        !atleast_one_item_not_completed ||
        order.order_status?.value === OrderStatusValues.COMPLETED
      ) {
        existingOrders = existingOrders.filter((o) => o.order_id !== order.order_id);
        state.order_ids[branchId] = (state.order_ids[branchId] || []).filter(
          (id) => id !== order.order_id
        );
      } else {
        const index = existingOrders.findIndex((o) => o.order_id === order.order_id) ?? -1;
        const updatedOrder = getUpdatedItems(
          order,
          index < 0,
          existingOrders[index],
          groupedItems,
          atleast_one_item_not_completed
        );

        if (updatedOrder.new_round) {
          if (index >= 0) {
            existingOrders.splice(index, 1);
          }
          existingOrders.unshift(updatedOrder);
          state.order_ids[branchId] = [
            ...new Set([...(state.order_ids[branchId] || []), order.order_id]),
          ];
        } else {
          if (index >= 0) {
            existingOrders[index] = updatedOrder;
          } else {
            if (isNewOrder) {
              const remainingTime = getRemainingSeconds(updatedOrder.created_at, 2);

              updatedOrder.is_new_order = remainingTime > 0;
              existingOrders.unshift(updatedOrder);
            } else {
              existingOrders = insertSortedDesc(existingOrders, updatedOrder);
            }
            state.order_ids[branchId] = [
              ...new Set([...(state.order_ids[branchId] || []), order.order_id]),
            ];
          }
        }
      }
      state.orders[branchId] = existingOrders;
      state.loading = false;
    });

    builder.addCase(fetchPendingOrdersAsync.fulfilled, (state, { payload }) => {
      const {
        data: { orders },
        branchId,
      } = payload;

      let existingOrders: IOrder[] = [];
      state.order_ids[branchId] = [];
      orders.forEach((order: IOrder) => {
        const { atleast_one_item_not_completed, groupedItems } = prepareOrderItems(order);
        if (
          !atleast_one_item_not_completed ||
          order.order_status?.value === OrderStatusValues.COMPLETED
        ) {
          return;
        }

        const updatedOrder = getUpdatedItems(
          order,
          false,
          null,
          groupedItems,
          atleast_one_item_not_completed
        );

        if (updatedOrder.new_round) {
          existingOrders.unshift(updatedOrder);
        } else {
          existingOrders = insertSortedDesc(existingOrders, updatedOrder);
        }
        state.order_ids[branchId] = [
          ...new Set([...(state.order_ids[branchId] || []), updatedOrder.order_id]),
        ];
      });

      state.orders[branchId] = existingOrders;
      state.loading = false;
    });

    builder.addCase(updateOrderStatusAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateOrderStatusAsync.fulfilled, (state, { payload }) => {
      const { orderId, branchId } = payload;

      state.order_ids[branchId] = (state.order_ids[branchId] || []).filter((id) => id !== orderId);
      state.loading = false;
    });

    builder.addCase(updateOrderStatusAsync.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { clearError, updateNewOrderStatus, removeCompletedOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
