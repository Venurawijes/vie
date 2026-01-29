import { memo } from 'react';
import clsx from 'clsx';

import { ITEM_CARD_BG_COLOR } from '@/shared/constants/orders';
import { IItems, IOrder } from '@/shared/interfaces/orders.interface';
import { formatTime } from '@/shared/utils/helpers';
import Item from './item';
import { FoodPreparationStatusType } from '@/shared/enums/order.enum';
import { UpdateOrderStatusProps } from '../../types/fetch-order-details-props.type';
import { updateOrderStatusAsync } from '../../store/orders.slice';
import { useAppDispatch } from '@/core/context/hooks';

interface Props {
  order: IOrder;
  branchId: number;
}

const OrderItems = ({ order, branchId }: Props) => {
  const dispatch = useAppDispatch();

  /**
   * check all item compled status and send order complete call
   */
  const itemStatusChanged = async (itemId: number, status: number) => {
    let all_items_complated = true;
    Object.keys(order.items).map((round) => {
      const items = order.items[Number(round)];
      if (Array.isArray(items)) {
        items.forEach((item) => {
          console.log(itemId, item.item_id, item.food_preparation_status, item.qty);

          if (
            (item.item_id !== itemId &&
              item.food_preparation_status &&
              item.food_preparation_status < FoodPreparationStatusType.COMPLETED) ||
            (!item.food_preparation_status && item.qty !== '0')
          ) {
            all_items_complated = false;
            return;
          } else {
            if (item.item_id === itemId) {
              if (status < FoodPreparationStatusType.COMPLETED) {
                all_items_complated = false;
                return;
              }
            }
          }
        });
      }
    });

    if (all_items_complated) {
      const obj: UpdateOrderStatusProps = {
        order_id: order.order_id,
        branchId,
      };
      try {
        await dispatch(updateOrderStatusAsync(obj));
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
  };

  return (
    <>
      {Object.keys(order.items)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .sort((a: any, b: any) => b - a)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((round: any) => (
          <div key={round}>
            <div
              className={clsx(
                'round-bg m-[10px] p-[10px] rounded-[13px]',
                order?.new_round === Number(round) ? ITEM_CARD_BG_COLOR[100] : null
              )}
            >
              <p className="text-left font-semibold  text-[17px]">
                <span className="underline">Round {round}</span> :{' '}
                {formatTime((order.items[round] as IItems[])[0]?.created_at)}
              </p>
              {/* <span className="text-right text-[17px]">
                {formatDate((order.items[round] as IItems[])[0]?.created_at)}
              </span> */}
            </div>
            {(order.items[round] as IItems[]).map((item: IItems) => (
              <Item
                key={item.item_id}
                item={item}
                order={order}
                round={round}
                itemStatusChanged={itemStatusChanged}
              />
            ))}
          </div>
        ))}
    </>
  );
};

export default memo(OrderItems);
