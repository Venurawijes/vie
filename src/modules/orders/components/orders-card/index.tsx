import { memo, useState } from 'react';

import { ORDER_TYPES, ORDER_TITLE_BG_COLOR } from '@/shared/constants/orders';
import { IOrder } from '@/shared/interfaces/orders.interface';
import { getRemainingSeconds, formatDate } from '@/shared/utils/helpers';
import OrderTimer from '../timer';
import { UpdateOrderStatusProps } from '../../types/fetch-order-details-props.type';
import { updateNewOrderStatus, updateOrderStatusAsync } from '../../store/orders.slice';
import { useAppDispatch, useAppSelector } from '@/core/context/hooks';
import ConfirmModal from '../confirm-modal';
import { LOCALSTORAGE_KEY_ORDER_COMPLETE_CONFIRM_BOX } from '@/shared/constants/common';
import OrderItems from '../order-items';

interface Props {
  order: IOrder;
  index: number;
  branchId: number;
}

const OrdersCard = ({ order, index, branchId }: Props) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.orders);
  const [open, setOpen] = useState(false);
  const [orderRemainingTimeMin, setOrderRemainingTimeMin] = useState(
    getRemainingSeconds(order.created_at)
  );

  /**
   * send order complete call
   */
  const onCompleteHandle = async () => {
    const obj: UpdateOrderStatusProps = {
      order_id: order.order_id,
      branchId,
    };
    try {
      await dispatch(updateOrderStatusAsync(obj));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  /**
   * handle appearing confirmation box when click on complete order button
   */
  const onCompleteButtonClick = () => {
    if (localStorage.getItem(LOCALSTORAGE_KEY_ORDER_COMPLETE_CONFIRM_BOX) === '1') {
      setOpen(true);
    } else {
      onCompleteHandle();
    }
  };

  const removeNewOrderFlag = () => {
    dispatch(updateNewOrderStatus({ branchId, index }));
  };

  return (
    <div className={order.is_new_order ? 'bg-[#e5e5e5]' : ''}>
      <div
        className={`flex justify-center rounded-t-[13px] items-center ${ORDER_TITLE_BG_COLOR[order.order_type_id]} h-18`}
      >
        <p
          className={`text-white font-bold text-[26px] leading-[100%] tracking-[-0.5px] align-middle`}
        >
          {ORDER_TYPES[order.order_type_id]}
        </p>
      </div>
      {orderRemainingTimeMin === 0 && (
        <div className="flex text-white font-bold text-[18px] justify-center items-center bg-[#ff4646] h-10 blink">
          LATE
        </div>
      )}
      <div className="flex justify-stretch items-center p-2">
        <OrderTimer
          orderRemainingTimeMin={orderRemainingTimeMin}
          setOrderRemainingTimeMin={(time: number) => setOrderRemainingTimeMin(time)}
          removeNewOrderFlag={removeNewOrderFlag}
        />
        <div className="flex flex-col text-[18px]">
          <p className="mr-[5px]">Order:</p>
          <p className="font-bold"> {order.order_id}</p>
          <span className="text-sm">{formatDate(order.created_at)}</span>
        </div>
      </div>

      <div className="mt-[20px]">
        <span className="flex ml-[15px]">
          <p className="mr-[5px]">Invoice:</p>
          <p className="font-bold"> {order.invoice_number}</p>
        </span>
        {order.table_number !== '0' && (
          <p className="text-center text-[27px] font-extrabold">{order.table_number}</p>
        )}
      </div>
      <OrderItems order={order} branchId={branchId} />

      <div className="flex justify-center py-2">
        {(!order.order_food_preparation_completed_at || !order.is_order_items_completed) && (
          <button
            className="complete-btn font-bold py-2 px-4 rounded-lg shadow"
            disabled={loading}
            onClick={onCompleteButtonClick}
          >
            Mark as Complete
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 inline-block ml-[5px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        )}
      </div>

      <ConfirmModal isOpen={open} onConfirm={onCompleteHandle} onCancel={() => setOpen(false)} />
    </div>
  );
};

export default memo(OrdersCard);
