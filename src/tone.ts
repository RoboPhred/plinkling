import Tone from "tone";

// We are triggering tones in response to visual events, so we need
//  the tone to occur without any delay.
// Remove the lookAhead scheduling to play the tone asap.
Tone.context.lookAhead = 0;

export default Tone;

export function init() {
  Tone.start();
  (window as any).testSynth = new Tone.AMSynth().toMaster();
}
