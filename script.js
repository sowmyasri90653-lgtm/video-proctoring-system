const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const logDiv = document.getElementById('log');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');

let focusLostCount = 0;
let suspiciousEvents = [];
let startTime = Date.now();
let lastFocusTime = Date.now();
let lastFaceTime = Date.now();
let mediaRecorder;
let recordedChunks = [];

navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
  video.srcObject = stream;
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);
  mediaRecorder.start();
});

function logEvent(text) {
  const timestamp = new Date().toLocaleTimeString();
  const entry = `[${timestamp}] ${text}`;
  suspiciousEvents.push(entry);
  logDiv.innerHTML += `<div>${entry}</div>`;
  showPopup(text);
}

function showPopup(message) {
  popupText.textContent = message;
  popup.classList.remove('hidden');
  setTimeout(() => popup.classList.add('hidden'), 4000);
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

function downloadRecording() {
  mediaRecorder.stop();
  setTimeout(() => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview_recording.webm';
    a.click();
  }, 1000);
}

async function initDetection() {
  const objectModel = await cocoSsd.load();
  const faceMesh = new FaceMesh({ locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}` });
  faceMesh.setOptions({ maxNumFaces: 3 });
  faceMesh.onResults(results => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const faces = results.multiFaceLandmarks;
    const now = Date.now();

    if (faces.length === 0) {
      if (now - lastFaceTime > 10000) {
        logEvent("No face detected >10s");
        lastFaceTime = now;
      }
    } else {
      lastFaceTime = now;
      if (faces.length > 1) {
        logEvent("Multiple faces detected");
      }

      const nose = faces[0][1];
      if (nose.x < 0.3 || nose.x > 0.7) {
        if (now - lastFocusTime > 5000) {
          logEvent("Candidate not looking at screen >5s");
          focusLostCount++;
          lastFocusTime = now;
        }
      } else {
        lastFocusTime = now;
      }
    }
  });

  const camera = new Camera(video, {
    onFrame: async () => {
      await faceMesh.send({ image: video });
      const predictions = await objectModel.detect(video);
      predictions.forEach(pred => {
        if (["cell phone", "book", "laptop"].includes(pred.class)) {
          logEvent(`${pred.class} detected`);
        }
      });
    },
    width: 640,
    height: 480
  });
  camera.start();
}

initDetection();
