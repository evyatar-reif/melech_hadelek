import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import React from 'react';

export default function Pencil() {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M5.62694 18.3044L1.69567 14.3731L13.618 2.45081L17.5492 6.38209L5.62694 18.3044ZM19.6374 4.29444C20.121 3.81087 20.121 3.02601 19.6374 2.54245L17.4581 0.363163C16.9745 -0.120403 16.1897 -0.120403 15.7061 0.363163L14.1464 1.92292L18.0776 5.8542L19.6374 4.29444ZM0.828135 19.9772L5.09855 18.8328L1.16728 14.9015L0.0228564 19.1719C-0.10812 19.661 0.339091 20.1082 0.828135 19.9772Z"
        fill="black"
        fill-opacity="0.15"
      />
    </Svg>
  );
}
