// ============================================
// Web Audio API Synthesizer for Ambient Sounds
// ============================================

class AmbientSoundEngine {
  private audioCtx: AudioContext | null = null;
  private currentSound: string | null = null;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;

  private getContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public play(type: 'rain' | 'white' | 'cafe' | 'lofi' | 'forest') {
    this.stop();
    const ctx = this.getContext();
    this.gainNode = ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    this.gainNode.connect(ctx.destination);

    this.currentSound = type;

    if (type === 'white' || type === 'rain') {
      // Create white noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      if (type === 'rain') {
        // Lowpass filter to simulate rain drop patter
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, ctx.currentTime);
        whiteNoise.connect(filter);
        filter.connect(this.gainNode);
      } else {
        whiteNoise.connect(this.gainNode);
      }

      whiteNoise.start();
      this.noiseNode = whiteNoise;
    } else if (type === 'lofi') {
      // Dual oscillator cozy synth chord
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc2.frequency.setValueAtTime(329.63, ctx.currentTime); // E4

      osc1.connect(this.gainNode);
      osc2.connect(this.gainNode);
      osc1.start();
      osc2.start();

      this.noiseNode = osc1;
    }
  }

  public stop() {
    if (this.noiseNode) {
      try {
        (this.noiseNode as any).stop?.();
      } catch {}
      this.noiseNode = null;
    }
    this.currentSound = null;
  }

  public getActiveSound(): string | null {
    return this.currentSound;
  }
}

export const ambientEngine = new AmbientSoundEngine();
