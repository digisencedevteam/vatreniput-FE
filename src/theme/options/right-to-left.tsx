import { useEffect } from 'react';
// rtl
import rtlPlugin from 'stylis-plugin-rtl';
// emotion
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

// ----------------------------------------------------------------------

type Props = {
  themeDirection: 'rtl' | 'ltr';
  children: React.ReactNode;
};

export default function RTL({ children, themeDirection }: Props) {
  useEffect(() => {
    document.dir = themeDirection;
  }, [themeDirection]);

  const cacheRtl = createCache({
    key: 'rtl',
    prepend: true,
    // @ts-ignore
    stylisPlugins: [rtlPlugin],
  });

  if (themeDirection === 'rtl') {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }

  return <>{children}</>;
}

// ----------------------------------------------------------------------

export function direction(themeDirection: 'rtl' | 'ltr') {
  const theme = {
    direction: themeDirection,
  };

  return theme;
}
