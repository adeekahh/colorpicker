"use strict";

let img = new Image();
let img2 = new Image();

let ctx = document.getElementById("imageCanvas").getContext("2d");
let ctx2 = document.getElementById("zoomCanvas").getContext("2d");

let canvas = document.getElementById("imageCanvas");
let canvas2 = document.getElementById("zoomCanvas");

let xPos = null;
let yPos = null;

let imageData = null;
let zoomData = null;
let pixelIndex = null;

let r = null;
let g = null;
let b = null;

window.addEventListener("load", init());
function init() {
  img.addEventListener(
    "load",
    function() {
      ctx.drawImage(img, 0, 0);
      getImageData();
      mouseMoved();
      //getColorInfo();
    },
    false
  );
  img.src = "cat.jpg"; // Set source path
}

function mouseMoved() {
  canvas.addEventListener("mousemove", function() {
    xPos = event.offsetX; // Get the horizontal coordinate
    yPos = event.offsetY; // Get the vertical coordinate

    ctx.strokeStyle = "green";

    ctx.putImageData(imageData, 0, 0);
    ctx.strokeRect(xPos - 5, yPos - 5, 10, 10);

    pixelIndex = Math.round(4 * (xPos + yPos * ctx.canvas.width));

    //console.log(pixelIndex);
    r = imageData.data[pixelIndex];
    g = imageData.data[pixelIndex + 1];
    b = imageData.data[pixelIndex + 2];

    //console.log(r, g, b);

    document.getElementById("r").innerHTML = r;
    document.getElementById("g").innerHTML = g;
    document.getElementById("b").innerHTML = b;

    let rgb = {
      r,
      g,
      b
    };

    showColorInfo(rgb);
    updatePixels();
    drawZoomData();
  });
}

function updatePixels() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let data = zoomData.data;

      let imgX = i + xPos;
      let imgY = j + yPos;

      let pixelIndex = 4 * (imgX + imgY * ctx.canvas.width);
      let pi = 4 * (i + j * ctx2.canvas.width);
      data[pi + 0] = imageData.data[pixelIndex];
      data[pi + 1] = imageData.data[pixelIndex + 1];
      data[pi + 2] = imageData.data[pixelIndex + 2];
      data[pi + 3] = imageData.data[pixelIndex + 3];
    }
  }
}

function getImageData() {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  imageData = ctx.getImageData(0, 0, w, h);
  zoomData = ctx2.getImageData(0, 0, 10, 10);
  console.log(imageData);
}

function drawZoomData() {
  ctx2.putImageData(zoomData, 0, 0);
}

// 🎁 Here you go! 🎁
function showColorInfo(rgb) {
  document.querySelector("#r").textContent = rgb.r;
  document.querySelector("#g").textContent = rgb.g;
  document.querySelector("#b").textContent = rgb.b;

  const hex =
    "#" +
    rgb.r.toString(16).padStart(2, "0") +
    rgb.g.toString(16).padStart(2, "0") +
    rgb.b.toString(16).padStart(2, "0");

  document.querySelector("#hex").textContent = hex;

  document.querySelector("#colorbox").style.backgroundColor = hex;
}
