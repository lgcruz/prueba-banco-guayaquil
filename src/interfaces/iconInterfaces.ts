export interface IconParamInterface {
  height: number;
  width: number;
  viewBox: string;
  className?: string;
  fill?: string;
  fillOpacity?: string;
  stroke?: string;
  style?: Record<string, string>;
  children: JSX.Element | JSX.Element[];
  title?: string;
  id?: string;
  xmlSpace?: string;
  strokeWidth?: string;
}

export interface IconTemplateInterface {
  height: number;
  width: number;
  className?: string;
  fill?: string;
  fillOpacity?: string;
  stroke?: string;
  strokeWidth?: string;
  style?: Record<string, string>;
  title?: string;
}
