import '../styles/global.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import GlobalStyle from '@/styles/globalStyle';

import { theme } from '@/theme/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const AnyComponent = Component as any;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnyComponent {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  );
  // <Component {...pageProps} />
};

export default MyApp;
