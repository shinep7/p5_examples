

let rangeMax;
let gridCount = 3;
let gridSize;


function setup() 
{ 
    createCanvas(600, 600, WEBGL);

    createEasyCam();
    document.oncontextmenu = function() { return false; }

    rangeMax = width/2;
    gridSize = rangeMax/gridCount;
} 

function draw(){
    background(0);
   
    initialTransformation();
    drawXYplane();
    drawAxes();
    drawSurface();
}


function initialTransformation()
{
    rotateX(PI/2);
    rotateZ(PI/2);
    scale(1, -1, 1);
}


function drawAxes()
{
    strokeWeight(3);

    stroke(255);
    line(-rangeMax, 0, 0, 0, 0, 0);
    stroke(255, 0, 0);
    line(0, 0, 0, rangeMax, 0, 0);

    stroke(255);
    line(0, -rangeMax, 0, 0, 0, 0);
    stroke(0, 255, 0);
    line(0, 0, 0, 0, rangeMax, 0);

    stroke(255);
    line(0, 0, -rangeMax, 0, 0, 0);
    stroke(0, 0, 255);
    line(0, 0, 0, 0, 0, rangeMax);
}

function drawXYplane()
{
    stroke(200, 100);
    for (let i=-gridCount; i<=gridCount; i++)
    {
        if (i==0) continue;
        let x = rangeMax * i / gridCount;
        line(x, -rangeMax, 0, x, rangeMax, 0);        
    }

    for (let i=-gridCount; i<=gridCount; i++)
    {
        if (i==0) continue;
        let y = rangeMax * i / gridCount;
        line(-rangeMax, y, 0, rangeMax, y, 0);        
    }
}


function f(x,y) {return .1*(x*x - y*y);}


function drawSurface()
{
    stroke(0, 0, 255);
    strokeWeight(1);
    noFill();

    let sampleCount = 40;

    for (let x=-sampleCount; x<=sampleCount; x++)
    {
        let xActual = rangeMax*x/sampleCount;

        beginShape();
        for (let y=-sampleCount; y<=sampleCount; y++)
        {
            let yActual = rangeMax*y/sampleCount;
            let z = f(x,y);
            let zActual = rangeMax*z/sampleCount;
            vertex(xActual, yActual, zActual);
        }
        endShape();
    }

    for (let y=-sampleCount; y<=sampleCount; y++)
    {
        let yActual = rangeMax*y/sampleCount;

        beginShape();
        for (let x=-sampleCount; x<=sampleCount; x++)
        {
            let xActual = rangeMax*x/sampleCount;
            let z = f(x,y);
            let zActual = rangeMax*z/sampleCount;
            vertex(xActual, yActual, zActual);
        }
        endShape();
    }


}


