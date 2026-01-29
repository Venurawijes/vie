import { OrderSocketMessage } from '@/shared/interfaces/orders.interface';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { fetchOrderDetailsAsync, removeCompletedOrders } from '../store/orders.slice';
import { useAppDispatch, useAppSelector } from '@/core/context/hooks';
import config from '@/config';
import notificationSound from '@/assets/ding.mp3';
import { OrdersContext } from './orders-context';
import { OrdersApi } from '../api/orders.api';
import { getFormattedDateTime } from '@/shared/utils/helpers';

const ordersApi = new OrdersApi();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OrdersProvider = (props: any) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const { branchId } = useParams<{ branchId: string }>();
  const { order_ids } = useAppSelector((state) => state.orders);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketRef = useRef<any>(null);
  const connectedRef = useRef<boolean>(false);

  const play = () => {
    const beepSound = new Audio(notificationSound);
    beepSound.play().catch((err) => console.warn('Sound play blocked:', err));
  };

  useEffect(() => {
    if (!socketRef.current) {
      const socket = io(config.socketUrl, {
        transports: ['websocket'],
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        console.log('connected');
        connectedRef.current = true;
      });
    }
    return () => {
      if (connectedRef.current) {
        console.log('Disconnecting...');
        socketRef.current?.disconnect();
        connectedRef.current = false;
      }
    };
  }, []);

  useEffect(() => {
    if (!branchId || !socketRef.current) return;

    const channel = `b${branchId}`;

    const handler = (msg: OrderSocketMessage) => {
      if (
        ['ORDER_STATUS_UPDATED', 'ORDER_UPDATED', 'NEW_ORDER_ADDED'].includes(msg.type) &&
        msg.data?.order_id
      ) {
        const isNewOrder = msg.type === 'NEW_ORDER_ADDED';
        const orderId = msg.data?.order_id;
        dispatch(fetchOrderDetailsAsync({ orderId, branchId: Number(branchId), isNewOrder }));
      }

      if (['NEW_ORDER_ADDED'].includes(msg.type) && msg.data?.order_id) {
        play();
      }
    };

    socketRef.current.on(channel, handler);

    return () => {
      socketRef.current?.off(channel, handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchId]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshOrderList();
    }, 60000); // 1 min = 60000 ms

    return () => {
      clearInterval(interval);
    };
  }, [order_ids]);

  /**
   * refresh orders list
   */
  const refreshOrderList = async () => {
    const { data } = await ordersApi.fetchPendingOrdersByBranchId({
      branchId: Number(branchId),
      date: getFormattedDateTime(),
      details: 0,
      only_ids: 1,
    });
    const pendingOrderIds = data?.pending_order_ids || [];

    if (pendingOrderIds.length > 0 && branchId) {
      const ids = [...new Set(order_ids[Number(branchId)] || [])];
      const missingIds = pendingOrderIds.filter((item) => !ids.includes(item));
      const deletedIds = ids.filter((item) => !pendingOrderIds.includes(item));
      const promiseArray = missingIds.map((orderId) =>
        dispatch(fetchOrderDetailsAsync({ orderId, branchId: Number(branchId), isNewOrder: false }))
      );
      dispatch(removeCompletedOrders({ branchId: Number(branchId), ids: deletedIds }));
      await Promise.allSettled(promiseArray).catch((error) => console.error(error));
    }
  };

  return <OrdersContext.Provider value={{}}>{children}</OrdersContext.Provider>;
};
