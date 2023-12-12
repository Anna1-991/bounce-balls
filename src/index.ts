interface Circles {
    x: number;
    y: number;
    radius: number;
    color: string;
    dy: number;
    initialDy: number;
}

function generateRandomColor(): string {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
    })`;
}

function createBounceBall(
    x: number,
    y: number,
    radius: number,
    initialDy: number
): Circles {
    return {
        x,
        y,
        radius,
        dy: initialDy,
        color: generateRandomColor(),
        initialDy,
    };
}

const canvas = document.getElementById("bounce_balls") as HTMLCanvasElement;
const canvasBalls = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvasBalls.shadowBlur = 10;
canvasBalls.shadowColor = generateRandomColor();
canvasBalls.lineWidth = 2;


const circles: Circles[] = [];
const maxAmount = 12;
const gravity = 0.8;
const damping = 2;
const radius = 50;
let lastTime = 0;

function drawBalls(){
    canvasBalls.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(item => {

        canvasBalls.beginPath();
        canvasBalls.arc(item.x, item.y, item.radius, 0, 2 * Math.PI);
        canvasBalls.fillStyle = item.color;
        canvasBalls.fill();
    })
};

canvas.addEventListener('click', (e: MouseEvent) =>{
    console.log('click');
    
    const newCircle = createBounceBall(
        e.clientX,
        e.clientY,
        40,
        -Math.random() * 10 -5
    )
    circles.push(newCircle);
    if(circles.length >= maxAmount){
        circles.shift()
    }
    drawBalls();

})

function updateBalls() {
    circles.forEach(item => {
        item.y += item.dy;
        item.dy += gravity;

        // Bounce effect
        if (item.y + item.radius > canvas.height) {
            item.y = canvas.height - item.radius;
        }
    });
}

function tick(currentTime: number) {
    const deltaTime = currentTime - lastTime;
    updateBalls();
    drawBalls();
    lastTime = currentTime;
    requestAnimationFrame(tick);
}

requestAnimationFrame(tick);