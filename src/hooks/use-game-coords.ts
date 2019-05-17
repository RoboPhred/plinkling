import * as React from "react";

import { Vector2 } from "@/math";
import GameFieldContext from "@/contexts/game-field";

// https://stackoverflow.com/questions/29261304/how-to-get-the-click-coordinates-relative-to-svg-element-holding-the-onclick-lis
export default function useGameCoords() {
  const gameSvg = React.useContext(GameFieldContext);
  const [pt, setPt] = React.useState<SVGPoint | null>(null);
  React.useEffect(() => {
    if (!gameSvg) {
      setPt(null);
    } else {
      setPt(gameSvg.createSVGPoint());
    }
  }, [gameSvg]);

  return React.useCallback(
    (p: Vector2) => {
      if (!pt || !gameSvg) {
        return p;
      }
      const ctm = gameSvg.getScreenCTM();
      if (!ctm) {
        return p;
      }
      pt.x = p.x;
      pt.y = p.y;
      const translated = pt.matrixTransform(ctm.inverse());
      return { x: translated.x, y: translated.y };
    },
    [pt, gameSvg]
  );
}
