import { useAppDispatch } from '@/core/context/hooks';
import { logout } from '@/modules/auth/store/auth.slice';
import { ModeToggle } from '@/shared/components/mode-toggle';
import ToggleWithTooltip from '@/shared/components/toggle-with-tooltip';
import { LOCALSTORAGE_KEY_ORDER_COMPLETE_CONFIRM_BOX } from '@/shared/constants/common';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const PrivateLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHandleConfirmationToggle = (val: boolean) => {
    localStorage.setItem(LOCALSTORAGE_KEY_ORDER_COMPLETE_CONFIRM_BOX, val ? '1' : '0');
  };

  const onLogout = () => {
    dispatch(logout());
    navigate(`/`);
  };

  return (
    <>
      <header className="fixed px-8 w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Dinemagik <span className="font-thin text-[#b9b9b9] text-xs"> v1.2.0</span>
          </Link>
          <div className="flex items-center gap-4">
            <div>
              <button className="cursor-pointer" onClick={onLogout}>
                Logout
              </button>
            </div>
            <div>
              <ToggleWithTooltip
                tooltip="Remove Complete Order Confirmation Box"
                onToggle={onHandleConfirmationToggle}
              />
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="pt-10">
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;
