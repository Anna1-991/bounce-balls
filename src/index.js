"use strict";
function generateRandomColor() {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}
function createBounceBall(x, y, radius, initialDy) {
    return {
        x,
        y,
        radius,
        dy: initialDy,
        color: generateRandomColor(),
        initialDy,
    };
}
const canvas = document.getElementById("bounce_balls");
const canvasBalls = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvasBalls.shadowBlur = 10;
canvasBalls.shadowColor = generateRandomColor();
canvasBalls.lineWidth = 2;
const circles = [];
const maxAmount = 12;
const gravity = 0.8;
const damping = 2;
const radius = 50;
let lastTime = 0;
function drawBalls() {
    canvasBalls.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(item => {
        canvasBalls.beginPath();
        canvasBalls.arc(item.x, item.y, item.radius, 0, 2 * Math.PI);
        canvasBalls.fillStyle = item.color;
        canvasBalls.fill();
    });
}
;
canvas.addEventListener('click', (e) => {
    const newCircle = createBounceBall(e.clientX, e.clientY, 30, -Math.random() * 10 - 5);
    circles.push(newCircle);
    if (circles.length >= maxAmount) {
        circles.shift();
    }
    drawBalls();
});
drawBalls();
// function tick(currentTime: number) {
//     const deltaTime = (currentTime - lastTime) / 1000; // Convert milliseconds to seconds
//     // Update game elements using deltaTime
//     canvasBalls.clearRect(0, 0, canvas.width, canvas.height);
//     drawBalls(deltaTime);
//     lastTime = currentTime;
//     requestAnimationFrame(tick);
//   }
// canvas.addEventListener("click", (event: MouseEvent) => {
//     const newCircle = createBounceBall(
//         event.clientX,
//         event.clientY,
//         Math.random() * 30 + 10,
//         Math.random() * 5 - 2.5
//     );
//         circles.push(newCircle);
//     if (circles.length > maxAmount) {    
//         circles.shift()
//     }
// });
// requestAnimationFrame(tick);
