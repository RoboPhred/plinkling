import * as React from "react";

import Tone from "@/tone";

const synth = new Tone.PluckSynth().toMaster();

export interface BallProps {
  toneTriggerTimestamp: number;
}

const Ball: React.FC<BallProps> = ({ toneTriggerTimestamp }) => {
  const [lastTone, setLastTone] = React.useState(0);
  if (toneTriggerTimestamp > lastTone) {
    setLastTone(toneTriggerTimestamp);
    synth.triggerAttackRelease("C4", "16n");
  }
  // React.useEffect(() => {
  //   const now = Date.now();
  //   if (toneTriggerTimestamp < now) {
  //     return () => {};
  //   }
  //   console.log("sound start");
  //   synth.triggerAttack("C4");
  //   const timer = setTimeout(() => {
  //     synth.triggerRelease();
  //     console.log("sound timeout");
  //   }, now - toneTriggerTimestamp);
  //   return () => {
  //     synth.triggerRelease();
  //     clearTimeout(timer);
  //     console.log("sound abort");
  //   };
  // }, [toneTriggerTimestamp]);
  return <circle r={5} />;
};

export default Ball;
