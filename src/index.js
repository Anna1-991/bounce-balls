"use strict";
const rNum = () => Math.floor(Math.random() * 255);
function generateRandomColor() {
    return `rgb(${rNum()}, ${rNum()}, ${rNum()})`;
}
;
function createBounceBall(x, y, radius, initialDy) {
    const currentTime = performance.now();
    return {
        x,
        y,
        radius,
        dy: initialDy,
        color: generateRandomColor(),
        initialDy,
        creationTime: currentTime,
    };
}
;
const canvas = document.getElementById("bounce_balls");
const canvasBalls = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let circles = [];
const maxAmount = 12;
const gravity = 5;
const damping = 0.8;
const radius = 40;
let lastTime = 0;
function drawBall() {
    canvasBalls.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle) => {
        const scale = Math.min(1, (performance.now() - circle.creationTime) / 1000);
        canvasBalls.save();
        canvasBalls.scale(scale, scale);
        canvasBalls.beginPath();
        canvasBalls.arc(circle.x / scale, circle.y / scale, circle.radius, 0, 2 * Math.PI);
        canvasBalls.fillStyle = circle.color;
        canvasBalls.fill();
        canvasBalls.restore();
    });
}
;
canvas.addEventListener('click', (e) => {
    const newCircle = createBounceBall(e.clientX, e.clientY, radius, -Math.random() * 40 - 5);
    circles.push(newCircle);
    if (circles.length >= maxAmount) {
        circles.shift();
    }
    canvasBalls.shadowBlur = 25;
    canvasBalls.shadowColor = generateRandomColor();
    drawBall();
});
function updateBalls(deltaTime) {
    circles.forEach((circle) => {
        circle.y -= circle.dy * deltaTime;
        circle.dy -= gravity * deltaTime;
        if (circle.y + circle.radius > canvas.height) {
            circle.y = canvas.height - circle.radius;
            circle.dy = Math.abs(circle.dy) * damping;
            circle.dy *= 5;
        }
    });
}
;
function tick(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    updateBalls(deltaTime);
    drawBall();
    lastTime = currentTime;
    requestAnimationFrame(tick);
}
;
requestAnimationFrame(tick);
