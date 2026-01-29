import config from '@/config';
import { useState } from 'react';
import { CountdownCircleTimer, ColorFormat } from 'react-countdown-circle-timer';

interface props {
  orderRemainingTimeMin: number;
  setOrderRemainingTimeMin: (time: number) => void;
  removeNewOrderFlag: () => void;
}

const FULL_CYCLE_SECONDS = config.orderTimerMin * 60;

/**
 *
 *  Order remaining time indicator
 */
const OrderTimer = ({
  orderRemainingTimeMin,
  setOrderRemainingTimeMin,
  removeNewOrderFlag,
}: props) => {
  const [isActive, setIsActive] = useState(orderRemainingTimeMin > 0);
  const [ringColors, setRingColors] = useState({
    color: '#004777',
    trailColor: '#ababab',
  });

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <div className="text-center">
        <div className="font-medium clock-text">Time Left</div>
        <div className="text-xl font-bold clock-time">
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>
      </div>
    );
  };

  const changeRingColors = (remainingTime: number) => {
    if (remainingTime === 1740) {
      removeNewOrderFlag();
    }
    if (remainingTime < 600) {
      setRingColors((pre) => ({ ...pre, color: '#960202' }));
    }
    if (remainingTime === 0) {
      setRingColors((pre) => ({ ...pre, trailColor: '#960202' }));
      setOrderRemainingTimeMin(0);
    }
  };

  return (
    <div className="w-30 h-25">
      <CountdownCircleTimer
        isPlaying={isActive}
        duration={FULL_CYCLE_SECONDS}
        initialRemainingTime={orderRemainingTimeMin}
        size={110}
        colors={ringColors.color as ColorFormat}
        trailColor={ringColors.trailColor as ColorFormat}
        onComplete={() => {
          setIsActive(false);
          return { shouldRepeat: false };
        }}
        onUpdate={changeRingColors}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default OrderTimer;
