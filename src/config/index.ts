interface IConfig {
  apiBaseUrl: string;
  orderTimerMin: number;
  socketUrl: string;
}
const config: IConfig = {
  apiBaseUrl: import.meta.env.VITE_APP_API_BASE_URL || '',
  orderTimerMin: import.meta.env.VITE_APP_ORDER_TIMER_MIN || '',
  socketUrl: import.meta.env.VITE_APP_SOCKET_URL || '',
};

export default config;
