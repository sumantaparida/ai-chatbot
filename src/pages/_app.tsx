import '../styles/global.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';

import { theme } from '@/theme/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const AnyComponent = Component as any;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnyComponent {...pageProps} />
    </ThemeProvider>
  );
  // <Component {...pageProps} />
};

export default MyApp;
