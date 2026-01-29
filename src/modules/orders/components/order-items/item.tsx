import { memo } from 'react';
import clsx from 'clsx';

import { ITEM_CARD_BG_COLOR, ITEM_STATUS_NAME } from '@/shared/constants/orders';
import { IItems, IOrder } from '@/shared/interfaces/orders.interface';
import { UpdateOrderItemStatusProps } from '../../types/fetch-order-details-props.type';
import { updateOrderItemStatusAsync } from '../../store/orders.slice';
import { useAppDispatch } from '@/core/context/hooks';
import { FoodPreparationStatusType } from '@/shared/enums/order.enum';

interface Props {
  item: IItems;
  order: IOrder;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  round: any;
  itemStatusChanged: (itemId: number, status: number) => void;
}

const Item = ({ item, round, order, itemStatusChanged }: Props) => {
  const dispatch = useAppDispatch();

  /**
   * update order item status
   * @param item
   * @param currentStatus
   * @returns
   */
  const updateOrderItemStatus = async (item: IItems, currentStatus = 0) => {
    if (currentStatus === FoodPreparationStatusType.COMPLETED) {
      return;
    }

    const orderObjArray: UpdateOrderItemStatusProps = {
      order: [
        {
          order_id: order.order_id,
          item_id: item.item_id,
          food_preparation_status: ITEM_STATUS_NAME[currentStatus + 1],
        },
      ],
    };

    try {
      await dispatch(updateOrderItemStatusAsync(orderObjArray));
      itemStatusChanged(item.item_id, currentStatus + 1);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div
      key={item.item_id}
      onClick={() => updateOrderItemStatus(item, item.food_preparation_status)}
      className={clsx(
        'flex flex-col gap-2 p-4 m-2 rounded-lg border shadow-sm',
        order?.new_round === Number(round) && !item.food_preparation_status
          ? ITEM_CARD_BG_COLOR[100]
          : item.qty === '0'
            ? ITEM_CARD_BG_COLOR[101]
            : (ITEM_CARD_BG_COLOR[item.food_preparation_status] ??
              'dark:bg-gray-900 dark:border-gray-700')
      )}
    >
      <div className="flex items-start gap-3">
        {item.images.length > 0 && (
          <div className="min-w-[48px] h-[48px] rounded overflow-hidden">
            <img src={item.images[0]} alt={item.item_name} className="w-full h-full object-cover" />
          </div>
        )}
        {/* Item Info */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            {item.qty === '0' ? (
              <p>
                <span className="text-[#FFFFFF] font-semibold line-through mr-[10px] text-[20px]">
                  {parseFloat(Number(item.init_qty).toFixed(0))}x
                </span>{' '}
                <span className="text-[#FFFFFF] font-semibold line-through text-[20px]">
                  {item.item_name}
                </span>
              </p>
            ) : (
              <p className="font-semibold text-lg">
                <span className="clock-time mr-[10px] text-[21px]">{item.qty}x</span>{' '}
                <span className="font-bold text-[20px]">{item.item_name}</span>
              </p>
            )}
          </div>

          {/* Portion */}
          {item.extensions?.portion?.item_name && (
            <p className="text-sm font-bold item-sub-text text-[18px]">
              {item.extensions.portion.item_name}
            </p>
          )}
          {/* Extras */}
          {item.extensions?.extras &&
            item.extensions.extras.length > 0 &&
            item.extensions.extras.map((itm, index) => (
              <p
                key={`${index}_${itm.item_name}`}
                className="text-sm font-bold item-sub-text text-[18px]"
              >
                {itm.item_name}
                {item.extensions?.extras && index !== item.extensions.extras.length - 1 ? ',' : ''}
              </p>
            ))}
        </div>
      </div>

      {/* Note */}
      {item.note && (
        <div className="px-2 py-1 note-bg text-sm rounded  text-[18px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 inline-block mr-[5px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <span>{item.note}</span>
        </div>
      )}
    </div>
  );
};

export default memo(Item);
