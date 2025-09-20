# video-proctoring-system
# 🎥 Proctoring Dashboard for Interview Integrity

This project is a full-stack, browser-based proctoring system designed to help interviewers monitor candidates in real time. It combines behavioral detection, object recognition, event logging, and report generation — all with a clean, professional UI.

---

## 🔍 Purpose

To ensure fairness and integrity during remote interviews by detecting suspicious behavior and flagging potential violations automatically. This system empowers interviewers with real-time insights and post-interview reports.

---

## 🚀 Features

- ✅ Live webcam feed with recording and download
- 👁️ Real-time gaze and face presence detection using MediaPipe
- 📱 Object detection (mobile phone, books, laptops) via TensorFlow.js
- ⚠️ Alerts for:
  - No face detected (>10s)
  - Focus lost (>5s)
  - Multiple faces
  - Suspicious objects
- 📝 Interviewer notes section
- 📊 Downloadable JSON report with integrity score
- 📄 Resume download
- 🌗 Dark mode toggle
- 🧑 Candidate details in a professional blue navbar

---

## 🧠 Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Libraries**:
  - [MediaPipe FaceMesh](https://google.github.io/mediapipe/)
  - [TensorFlow.js](https://www.tensorflow.org/js)
  - [COCO-SSD model](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)
- **Recording**: MediaRecorder API
- **Report Generation**: JavaScript (JSON format)

---

## 📁 Folder Structure

