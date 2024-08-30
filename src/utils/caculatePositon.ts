type TCalculatePosition = {
  top: number;
  left: number;
  wElement: number;
  hElement: number;
  xCurElement: number;
  yCurElement: number;
};
type TPosition = {
  xR: number;
  yR: number;
};
export const calculatePosition = ({
  top,
  left,
  wElement,
  hElement,
  xCurElement,
  yCurElement
}: TCalculatePosition): TPosition => {
  const wScreen = window.outerWidth;
  const hScreen = window.outerHeight;

  const yMin = top;
  const yCurMin = yCurElement;
  const yCurMax = yCurElement + hElement;
  const yMax = hScreen - 100;
  const yR =
    yMin < yCurMin && yCurMax < yMax
      ? yCurElement - top
      : yCurMax > yMax
      ? yCurElement - top - (yCurMax - yMax)
      : 0;

  const xMid = left + (wScreen - left) / 2;
  const xR = xCurElement < xMid ? xCurElement - left : xCurElement - left - wElement - 100;
  return {
    xR: xR,
    yR: yR
  };
};
