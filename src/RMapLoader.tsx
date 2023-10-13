import type { RMapLoaderProps } from './types';

import AMapLoader from '@amap/amap-jsapi-loader';
import { useEffect, useState } from 'react';

import { AMapContext } from './vars';

export function RMapLoader(props: RMapLoaderProps): JSX.Element {
  const { children, options, _AMapSecurityConfig } = props;

  const [AMap, setAMap] = useState<any>();

  useEffect(() => {
    let destroyed = false;
    (window as any)._AMapSecurityConfig = _AMapSecurityConfig;
    AMapLoader.load(options)
      .then((AMap) => {
        if (!destroyed) {
          (window as any).AMap = AMap;
          setAMap(AMap);
        }
      })
      .catch((e) => {
        console.error(e);
      });

    return () => {
      destroyed = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AMapContext.Provider value={AMap}>{children}</AMapContext.Provider>;
}
