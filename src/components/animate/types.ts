import { BoxProps } from "@mui/material";
import { MotionProps } from "framer-motion";

type EaseType =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circIn'
  | 'circOut'
  | 'circInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'anticipate'
  | number[];

export type VariantsType = {
  distance?: number;
  durationIn?: number;
  durationOut?: number;
  easeIn?: EaseType;
  easeOut?: EaseType;
};

export type TranHoverType = {
  duration?: number;
  ease?: EaseType;
};

export type TranEnterType = {
  durationIn?: number;
  easeIn?: EaseType;
};

export type TranExitType = {
  durationOut?: number;
  easeOut?: EaseType;
};

export type BackgroundType = {
  colors?: string[];
  duration?: number;
  ease?: EaseType;
};

type IProps = BoxProps & MotionProps;

export interface MotionViewportProps extends IProps {
  children: React.ReactNode;
  disableAnimatedMobile?: boolean;
}
