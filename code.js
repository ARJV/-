var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var dx, dy;
var sphereArray = [];
var click = false;
var clickObj;
var count = 3;

var distArr = [];

for (var i = 0; i < count; i++) {
    var aSphere = new Sphere();
    aSphere.x = Math.random() * canvas.width;
    aSphere.y = Math.random() * canvas.height;
    aSphere.r = 50;
    aSphere.name = "Сфера " + (i + 1);
    sphereArray.push(aSphere);
}

function Sphere() {
    this.x = 0
    this.y = 0
    this.r = 0
    this.name = "";
}

canvas.onmousedown = startMove;
canvas.onmouseup = stopMove;
canvas.onmousemove = callCoords;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < sphereArray.length; i++) {
        drawSphere(sphereArray[i]);
    }
    
    requestAnimationFrame(draw);
}

function drawSphere(sphereObj) {
    var x = sphereObj.x;
    var y = sphereObj.y;
    var r = sphereObj.r;
    var name = sphereObj.name;
    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI * 2, 0);
    ctx.fillText(name, x, y);
    ctx.stroke();
    ctx.closePath();
}

function startMove(e) {
    clickObj = findClickObj(e);
    if (typeof clickObj != "undefined") {
        if (checkClickObj(e, clickObj)) click = true;
        dx = e.offsetX - clickObj.x;
        dy = e.offsetY - clickObj.y;
    }

}

// Дейсвие когда отпускаем кнопку мыши
function stopMove() {
    click = false;
}

// Расчитывает новые координаты объекта
function callCoords(e) {

    if (click) {
        clickObj.x = e.offsetX - dx;
        clickObj.y = e.offsetY - dy;
    }
}

// Находит объект, на который нажали, и возвращает ссылку на него
function findClickObj(coord) {
    for (var i = 0; i < sphereArray.length; i++) {
        if (checkClickObj(coord, sphereArray[i])) {
            return sphereArray[i];
        }
    }
}

// Расчёт расстояния между 2мя точками
function callsDist(x1, y1, x2, y2) {
    var dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return dist;
}

// Проверяет координаты клика на нахождение внутри объекта
function checkClickObj(coordClick, obj) {
    if (callsDist(coordClick.offsetX, coordClick.offsetY, obj.x, obj.y) <= obj.r) return true;
}

draw();
