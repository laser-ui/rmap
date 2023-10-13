# @laser-ui/rmap

AMap for React.

# Installation

```
npm install @laser-ui/rmap
```

# Getting Started

```tsx
import { RMapLoader, RMap } from '@laser-ui/rmap';
import { useCallback, useEffect, useRef } from 'react';

export default function App() {
  const mapRef = useRef<AMap.Map>(null);
  const mapCallbackRef = useCallback((map: AMap.Map) => {
    const marker = new AMap.Marker({
      position: new AMap.LngLat(116.39, 39.9),
    });
    map.add(marker);
    mapRef.current = map;
  }, []);

  useEffect(() => {
    const tid = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.setLabel({ content: '北京' });
      }
    }, 3000);
    return () => {
      clearTimeout(tid);
    };
  }, []);

  return (
    <RMapLoader options={{ key: '', version: '2.0' }} _AMapSecurityConfig={{ securityJsCode: '' }}>
      <RMap
        ref={mapCallbackRef}
        style={{ height: 400 }}
        options={{
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 13,
        }}
      />
      ;
    </RMapLoader>
  );
}
```

# API

```ts
interface RMapLoaderProps {
  children?: React.ReactNode;
  options: {
    key: string;
    version: string;
    plugins?: string[];
    AMapUI?: {
      version?: string;
      plugins?: string[];
    };
    Loca?: {
      version?: string;
    };
  };
  _AMapSecurityConfig?: {
    securityJsCode: string;
  };
}

interface RMapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  options?: AMap.MapOptions;
  plugins?: string | string[];
}
```
