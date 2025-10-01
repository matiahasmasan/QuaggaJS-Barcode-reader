const quaggaConf = {
  inputStream: {
    target: document.querySelector("#camera"),
    type: "LiveStream",
    constraints: {
      width: { min: 640 },
      height: { min: 480 },
      facingMode: "environment",
      aspectRatio: { min: 1, max: 2 },
    },
  },
  decoder: {
    readers: ["code_128_reader"],
  },
};

let isCameraOpen = false;
const cameraContainer = document.getElementById("camera");
const toggleBtn = document.getElementById("toggleCameraBtn");

function startCamera() {
  toggleBtn.disabled = true;
  Quagga.init(quaggaConf, function (err) {
    toggleBtn.disabled = false;
    if (err) {
      console.log(err);
      return;
    }
    Quagga.start();
    const videoEl = cameraContainer.querySelector("video");
    if (videoEl) {
      videoEl.setAttribute("playsinline", "true");
      videoEl.muted = true;
    }
    isCameraOpen = true;
    toggleBtn.textContent = "Close Camera";
    toggleBtn.setAttribute("aria-pressed", "true");
  });
}

function stopCamera() {
  try {
    Quagga.stop();
  } catch (e) {
    console.log("Stop error:", e);
  }
  cameraContainer.innerHTML = "";
  isCameraOpen = false;
  toggleBtn.textContent = "Open Camera";
  toggleBtn.setAttribute("aria-pressed", "false");
}

toggleBtn.addEventListener("click", function () {
  if (isCameraOpen) {
    stopCamera();
  } else {
    startCamera();
  }
});

Quagga.onDetected(function (result) {
  alert("Detected barcode: " + result.codeResult.code);
});

function setVhVar() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setVhVar();
window.addEventListener("resize", setVhVar);
window.addEventListener("orientationchange", setVhVar);
