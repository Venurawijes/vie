import { memo, useEffect } from 'react';
import OrdersList from '../components/orders-list';
import { OrdersProvider } from '../context/orders-provider';
import { useAppDispatch, useAppSelector } from '@/core/context/hooks';
import { fetchPendingOrdersAsync } from '../store/orders.slice';
import { getFormattedDateTime } from '@/shared/utils/helpers';
import mute from '@/assets/mute.png';
import { useParams } from 'react-router-dom';
import { setIsMute } from '@/shared/store/shared.slice';

const OrdersPage = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const { isMute } = useAppSelector((state) => state.shared);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    await dispatch(
      fetchPendingOrdersAsync({
        branchId: Number(branchId),
        date: getFormattedDateTime(),
        details: 1,
        only_ids: 0,
      })
    ).unwrap();
  };

  return (
    <div className="min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* <h3 className="text-xl font-semibold mb-2">Orders</h3> */}
      <div className="relative h-screen w-full" onClick={() => dispatch(setIsMute(false))}>
        {isMute && (
          <>
            <div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      bg-white p-[30px] w-[50vh] h-[50vh]
      bg-no-repeat bg-center bg-[length:80%]
      rounded-[19px] opacity-90 z-50"
              style={{ backgroundImage: `url(${mute})` }}
            />
          </>
        )}
        <OrdersProvider>
          <OrdersList />
        </OrdersProvider>
      </div>
    </div>
  );
};

export default memo(OrdersPage);
