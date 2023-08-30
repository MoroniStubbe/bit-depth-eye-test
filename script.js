var c1 = document.getElementById('c1').getContext('2d');
var c2 = document.getElementById('c2').getContext('2d');
var bitDepth = 8;
var same;
var round = 1;
var correct = 0;
var color1;
var color2;

function randomColor() {
    var range = Math.pow(2, bitDepth);
    var r = Math.floor(Math.random() * range) * (256 / range);
    var g = Math.floor(Math.random() * range) * (256 / range);
    var b = Math.floor(Math.random() * range) * (256 / range);
    return [r, g, b];
}

function rgbArrayToString(rgb) { return "rgb(".concat(rgb[0].toString(), ',', rgb[1].toString(), ',', rgb[2].toString(), ")") }

function fillCanvas(context, color) {
    context.beginPath();
    context.rect(0, 0, Math.floor(context.canvas.clientWidth), context.canvas.clientHeight);
    context.fillStyle = color;
    context.fill();
}

function fillRandom(context1, context2) {
    color1 = randomColor();
    color2 = JSON.parse(JSON.stringify(color1));
    var isRandom = Math.random();
    if (isRandom < 0.5) {
        same = false;
        var offset = 256 / Math.pow(2, bitDepth);
        var whichToOffset = Math.floor(Math.random() * 3);
        if (color1[whichToOffset] == 0) {
            color2[whichToOffset] = color1[whichToOffset] + offset;
        }
        else if (color1[whichToOffset] == 255) {
            color2[whichToOffset] = color1[whichToOffset] - offset;
        }
        else {
            var upOrDown = Math.random();
            if (upOrDown < 0.5) { color2[whichToOffset] = color1[whichToOffset] - offset; }
            else { color2[whichToOffset] = color1[whichToOffset] + offset; }
        }
    }
    else { same = true; }
    fillCanvas(context1, rgbArrayToString(color1));
    fillCanvas(context2, rgbArrayToString(color2));
    var a = "same";
    if (!same) { a = "different"; }
    document.getElementById('answer').innerHTML = a;
}

function updateAcc() {
    document.getElementById('acc').innerHTML = correct.toString().concat('/', round.toString(), ' (', Math.round(correct / round * 100).toString(), '%)');
    round++;
    fillRandom(c1, c2);
}

function isSame() {
    if (same) { correct += 1; }
    updateAcc();
}

function isDifferent() {
    if (!same) { correct += 1; }
    updateAcc();
}

function reset() {
    round = 1;
    correct = 0;
    fillRandom(c1, c2);
    document.getElementById('acc').innerHTML = "-";
}

function updateBitDepth() {
    bitDepth = parseInt(document.getElementById('bitDepth').value);
    reset();
}

document.onkeydown = function (event) {
    switch (event.key) {
        case 's':
            isSame();
            break;

        case 'd':
            isDifferent();
            break;
    }
}

fillRandom(c1, c2);