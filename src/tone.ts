import Tone from "tone";

// We are triggering tones in response to visual events, so we need
//  the tone to occur without any delay.
// Remove the lookAhead scheduling to play the tone asap.
Tone.context.lookAhead = 0;

let synth: any = null;
export function init() {
  Tone.start();
  (window as any).testSynth = new Tone.AMSynth().toMaster();
  synth = new Tone.PolySynth(6, Tone.AMSynth).toMaster();
}

export default function playTone(tone: number, time: string) {
  if (!synth) {
    return;
  }
  synth.triggerAttackRelease(tone, time);
}
