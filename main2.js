 audioContext = new AudioContext();
    await audioContext.resume();
    const audio = new Audio("./audio/audio1.mp3");
    const source = audioContext.createMediaElementSource(audio);
    source.connect(audio.destination);
    audio.play();
    console.log("🔊 ¿Escuchas algo?");
