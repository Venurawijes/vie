import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@/shared/components/theme-provider';
import Routes from '@/routes';
import NoInternetBanner from '@/shared/components/no-internet-banner';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <NoInternetBanner />
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
