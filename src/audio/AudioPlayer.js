import * as THREE from "three";

export class AudioPlayer {
  constructor() {
    this.paths = [
      "../../assets/audio/Flako-Gelis.mp3",
      "../../assets/audio/Flako-ShipiboIcaro.mp3",
      "../../assets/audio/NatureboyFlako-Kuku-1.mp3",
      "../../assets/audio/NatureboyFlako-Kuku-2.mp3",
    ];

    this.currentPathID = 0;
    this.listener = new THREE.AudioListener();
    this.sound = new THREE.Audio(this.listener);

    this.audioCtx = this.listener.context;

    this.audioLoader = new THREE.AudioLoader();
  }

  mute() {
    if (this.sound.getVolume() !== 0) {
      this.sound.setVolume(0);
    } else {
      this.sound.setVolume(0.5);
    }
    return this.sound.getVolume() !== 0;
  }

  changeTrack(index) {
    this.currentPathID = index;
    if (this.sound.isPlaying) {
      this.sound.stop();

      if (this.audioCtx.state !== "suspended") this.play();
    }
  }

  pause() {
    if (this.sound) {
      this.sound.pause();
    }
  }

  play() {
    if (this.sound) {
      const sound = this.sound;

      this.audioLoader.load(this.paths[this.currentPathID], function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(sound.getVolume());
        sound.play();
      });
      this.sound = sound;
    }
  }

  isPlaying() {
    return this.sound.isPlaying;
  }

  // // Setup routing graph
  // setupRoutingGraph() {
  //   this.compressor = this.context.createDynamicsCompressor();

  //   // Send1 effect
  //   this.reverb = this.context.createConvolver();
  //   // Convolver impulse response may be set here or later

  //   // Send2 effect
  //   this.delay = this.context.createDelay();

  //   // Connect final compressor to final destination
  //   this.compressor.connect(context.destination);

  //   // Connect sends 1 & 2 through effects to main mixer
  //   this.s1 = this.context.createGain();
  //   this.reverb.connect(s1);
  //   this.s1.connect(compressor);

  //   this.s2 = this.context.createGain();
  //   this.delay.connect(this.s2);
  //   this.s2.connect(this.compressor);

  //   // Create a couple of sources
  //   this.source1 = this.context.createBufferSource();
  //   this.source2 = this.context.createBufferSource();
  //   this.source1.buffer = manTalkingBuffer;
  //   this.source2.buffer = footstepsBuffer;

  //   // Connect source1
  //   this.g1_1 = this.context.createGain();
  //   this.g2_1 = this.context.createGain();
  //   this.g3_1 = this.context.createGain();
  //   this.source1.connect(g1_1);
  //   this.source1.connect(g2_1);
  //   this.source1.connect(g3_1);
  //   this.g1_1.connect(compressor);
  //   this.g2_1.connect(reverb);
  //   this.g3_1.connect(delay);

  //   // Connect source2
  //   this.g1_2 = context.createGain();
  //   this.g2_2 = context.createGain();
  //   this.g3_2 = context.createGain();
  //   this.source2.connect(g1_2);
  //   this.source2.connect(g2_2);
  //   this.source2.connect(g3_2);
  //   this.g1_2.connect(compressor);
  //   this.g2_2.connect(reverb);
  //   this.g3_2.connect(delay);

  //   // We now have explicit control over all the volumes g1_1, g2_1, ..., s1, s2
  //   this.g2_1.gain.value = 0.2; // For example, set source1 reverb gain

  //   // Because g2_1.gain is an "AudioParam",
  //   // an automation curve could also be attached to it.
  //   // A "mixing board" UI could be created in canvas or WebGL controlling these gains.
  // }
}
