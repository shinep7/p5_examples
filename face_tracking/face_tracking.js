//
// Face Tracking
//

// original example from Kyle Mcdonald:
// https://kylemcdonald.github.io/cv-examples/


let capture;
let tracker
let w = 640; 
let h = 480;


let showPoints = false;
let showVideo = false;
let showShapes = true;


function setup() 
{
    createCanvas(w, h);

    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });

    capture.elt.setAttribute('playsinline', '');
    capture.size(w, h);
    capture.hide();

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
}


function drawAllPoints(positions)
{
    colorMode(HSB);
    noFill();
    stroke(255);
    strokeWeight(1);
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();

    noStroke();
    for (var i = 0; i < positions.length; i++) {
        fill(map(i, 0, positions.length, 0, 360), 50, 100);
        ellipse(positions[i][0], positions[i][1], 4, 4);
        text(i, positions[i][0], positions[i][1]);
    }
    colorMode(RGB);
}


function drawPoly(positions, begin, end)
{
    beginShape();
    for (let i=begin; i<end; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape(CLOSE);
}


function draw() 
{
    background(0);

    if (showVideo)
        image(capture, 0, 0, w, h);

    let positions = tracker.getCurrentPosition();
    if (!positions || positions.length === 0) return;

    if (showPoints)
        drawAllPoints(positions);

    if (showShapes)
        drawShapes(positions);

    fill(0);
    noStroke();
    rect(0, 0, 150, 100);
    fill(255);
    text("v: show video", 25, 25);
    text("p: show points", 25, 50);
    text("s: show shapes", 25, 75);
}


function drawShapes(positions)
{
    // right eyebrow: 19-22

    fill(0, 255, 0);
    stroke(0, 255, 0);
    drawPoly(positions, 19, 23);

    // left eyebrow: 15-18

    fill(0, 255, 0);
    stroke(0, 255, 0);
    drawPoly(positions, 15, 19);

    // right eye: 23-26

    stroke(0, 0, 255);
    strokeWeight(3);
    drawPoly(positions, 23, 27);

    // left eye: 28-31

    stroke(0, 0, 255);
    strokeWeight(3);
    drawPoly(positions, 28, 32);

    // nose: 62

    noStroke();
    fill(255, 0, 0);
    ellipse(positions[62][0], positions[62][1], 50, 50);

    // mouth: 44-55

    fill(0, 255, 0);
    stroke(0, 0, 255);
    strokeWeight(3);
    drawPoly(positions, 44, 56);
}


function keyPressed() 
{
    if (key == 'p')
        showPoints = !showPoints;

    if (key == 'v')
        showVideo = !showVideo;

    if (key == 's')
        showShapes = !showShapes;
}


