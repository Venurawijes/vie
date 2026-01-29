import { useAppSelector } from '@/core/context/hooks';
import OrdersCard from '../orders-card';
import { useParams } from 'react-router-dom';
import { ORDER_TITLE_BORDER_COLOR } from '@/shared/constants/orders';

const OrdersList = () => {
  const { orders } = useAppSelector((state) => state.orders);
  const { branchId } = useParams<{ branchId: string }>();

  return (
    <div
      className="flex overflow-x-auto whitespace-nowrap scroll-smooth touch-pan-x space-x-4 p-4"
      style={{
        WebkitOverflowScrolling: 'touch',
        overscrollBehaviorX: 'contain',
        touchAction: 'pan-x',
      }}
    >
      {orders[Number(branchId)] &&
        orders[Number(branchId)].map((order, index) => (
          <div
            key={order.order_id}
            className={`rounded-[13px] border ${ORDER_TITLE_BORDER_COLOR[order.order_type_id]} bg-card order-card h-fit min-w-60 overflow-hidden pb-[15px] inline-block`}
          >
            <OrdersCard order={order} index={index} branchId={Number(branchId)} />
          </div>
        ))}
    </div>
  );
};

export default OrdersList;
