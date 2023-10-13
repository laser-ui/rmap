export {};

export interface RMapLoaderProps {
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

export interface RMapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  options?: AMap.MapOptions;
  plugins?: string | string[];
}
