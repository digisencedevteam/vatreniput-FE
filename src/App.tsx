// scrollbar
import 'simplebar-react/dist/simplebar.min.css';
// image
import 'react-lazy-load-image-component/src/effects/blur.css';
// routes
import Router from 'src/routes/sections';
// theme
import ThemeProvider from 'src/theme';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// auth
import { AuthProvider, AuthConsumer } from 'src/auth/context/jwt';
import { Helmet } from 'react-helmet-async';

export default function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <Helmet>
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black'
        />
        <meta
          name='apple-mobile-web-app-title'
          content='Vatreni Put'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='public/logo/180.png'
        />
      </Helmet>
      <SettingsProvider
        defaultSettings={{
          themeMode: 'dark', // 'light' | 'dark'
          themeDirection: 'ltr', //  'rtl' | 'ltr'
          themeContrast: 'default', // 'default' | 'bold'
          themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
          themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
          themeStretch: false,
        }}
      >
        <ThemeProvider>
          <MotionLazy>
            <SettingsDrawer />
            <ProgressBar />
            <AuthConsumer>
              <Router />
            </AuthConsumer>
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
