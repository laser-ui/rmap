import type { RMapProps } from './types';

import { useUnmount } from '@laser-ui/hooks';
import { forwardRef, useCallback, useContext, useRef } from 'react';

import { AMapContext } from './vars';

export const RMap = forwardRef<AMap.Map, RMapProps>((props, ref): JSX.Element => {
  const {
    options,
    plugins,

    ...restProps
  } = props;

  const AMap = useContext(AMapContext);

  const instanceRef = useRef<AMap.Map>();
  const containerCallbackRef = useCallback(
    (el: HTMLDivElement) => {
      if (AMap) {
        instanceRef.current?.destroy();
        const cb = () => {
          instanceRef.current = new AMap.Map(el, options);
          if (typeof ref === 'function') {
            ref(instanceRef.current);
          } else if (ref) {
            ref.current = instanceRef.current;
          }
        };
        if (plugins) {
          AMap.plugin(plugins, cb);
        } else {
          cb();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options, ref],
  );
  useUnmount(() => {
    instanceRef.current?.destroy();
  });

  return <div {...restProps} ref={AMap ? containerCallbackRef : undefined} />;
});
