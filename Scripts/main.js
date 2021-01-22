var canvas;
var drawingContainer;

function setup()
{
    InitCanvas();
}

function draw()
{
    
}

function InitCanvas()
{
    drawingContainer = select("#drawing-container");

    canvas = createCanvas(500, 500);
    canvas.parent(drawingContainer);

    canvas.style("border", "5px solid #6f0f41");
    canvas.style("border-radius", "5px");
}


