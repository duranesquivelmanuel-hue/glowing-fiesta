let audioContext;
let samples;
const startBtn = document.querySelector(".start");
const settupSamplesBtn = document.querySelector(".settup-samples");
const playSamplesBtn = document.querySelector(".play-samples");

const samplePaths = ["./audio/audio1.mp3","./audio/audio2.mp3","./audio/audio3.mp3"];

startBtn.addEventListener("click", async () => {
    audioContext = new AudioContext();
    await audioContext.resume();
    console.log("Audio Contexto Started");

   
});

settupSamplesBtn.addEventListener("click", () => {
    setupSamples(samplePaths).then((response => {
        samples = response;
        console.log(samples);
        playSamplesBtn.addEventListener("click", () => {
            const playing = playSample(samples[1],0) 
            console.log(playing)
        });
    }));

});

async function getFiles(filePath){
    const response = await fetch(filePath);
    const arrayBuffer =  await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    return audioBuffer;
}

async function setupSamples(paths) {
    console.log("Setting up samples")
    const audioBuffer = [];
    
    for (const path of paths){
        const sample = await getFiles(path);
        audioBuffer.push(sample);
    }

    console.log("Setting up done")
    return audioBuffer;
}

function playSample(audioBuffer,time){
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination);
    sampleSource.start(time)
}