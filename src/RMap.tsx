import type { RMapProps } from './types';

import { forwardRef, useCallback, useContext, useRef } from 'react';

import { AMapContext } from './vars';

export const RMap = forwardRef<AMap.Map, RMapProps>((props, ref): JSX.Element => {
  const {
    init,
    plugins,

    ...restProps
  } = props;

  const AMap = useContext(AMapContext);

  const instanceRef = useRef<AMap.Map | null>(null);
  const containerCallbackRef = useCallback<React.RefCallback<HTMLDivElement>>(
    (el) => {
      const setRef = (instance: AMap.Map | null) => {
        if (typeof ref === 'function') {
          ref(instance);
        } else if (ref) {
          ref.current = instance;
        }
      };
      if (AMap) {
        if (el) {
          const cb = () => {
            instanceRef.current = new AMap.Map(el, init?.());
            setRef(instanceRef.current);
          };
          if (plugins) {
            AMap.plugin(plugins, cb);
          } else {
            cb();
          }
        } else {
          instanceRef.current?.destroy();
          instanceRef.current = null;
          setRef(null);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [init, ref],
  );

  return <div {...restProps} ref={AMap ? containerCallbackRef : undefined} />;
});
