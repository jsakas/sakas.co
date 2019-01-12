export default class Audio {
  constructor(
    fftSize = 256,
    smoothing1 = .1,
    smoothing2 = .95,
  ) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this._context = new AudioContext();

    // set up responsive analsyer
    this._analyser1 = this._context.createAnalyser();
    this._analyser1.smoothingTimeConstant = smoothing1;
    this._analyser1.fftSize = fftSize;
    this._analyser1Data = new Uint8Array(this._analyser1.frequencyBinCount);

    // set up smooth analsyer
    this._analyser2 = this._context.createAnalyser();
    this._analyser2.smoothingTimeConstant = smoothing2;
    this._analyser2.fftSize = fftSize;
    this._analyser2Data = new Uint8Array(this._analyser2.frequencyBinCount);
  }

  decodeAudioDataPromise = (buffer) => {
    return new Promise((resolve, reject) => {
      this._context.decodeAudioData(buffer, resolve, reject);
    });
  }

  getSourceFromUrl = (url) => {
    return fetch(url)
      .then(response => response.arrayBuffer())
      .then(this.decodeAudioDataPromise)
      .then(this.createSource)
      .then(this.connect);
  }

  createSource = (bufferData) => {
    const source = this._context.createBufferSource();
    source.buffer = bufferData;
    return source;
  }

  connect = (source) => {
    
    const gainNode = this._context.createGain();
    gainNode.gain.value = 1;
    
    source.gainNode = gainNode;

    source.connect(gainNode);
    gainNode.connect(this._analyser1);
    this._analyser1.connect(this._analyser2);
    this._analyser2.connect(this._context.destination);
    return source;
  }


  fadeOut = (source, time = 1) => {
    source.gainNode.gain
      .linearRampToValueAtTime(
        0,
        this._context.currentTime + time
      );
    source.stop(this._context.currentTime + time);
  }

  set fftSize(value) {
    this._analyser1.fftSize = value;
    this._analyser1Data = new Uint8Array(this._analyser1.frequencyBinCount);

    this._analyser2.fftSize = value;
    this._analyser2Data = new Uint8Array(this._analyser2.frequencyBinCount);
  }

  get data() {
    this._analyser1.getByteFrequencyData(this._analyser1Data);
    this._analyser2.getByteFrequencyData(this._analyser2Data);
    return [
      this._analyser1Data,
      this._analyser2Data
    ];
  }
}
