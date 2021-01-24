var canvas;
var drawingContainer;
var quadTree;
var points;

function setup()
{
    InitCanvas();

    quadTree = new QuadTree(10);
    points = new Array();
}

function draw()
{
    background(0, 0, 0);

    canvas.mousePressed(InsertPoint);
    RenderPoints();
    quadTree.Render();
}

function InitCanvas()
{
    drawingContainer = select("#drawing-container");

    canvas = createCanvas(500, 500);
    canvas.parent(drawingContainer);
}
function InsertPoint()
{
    let point = new Point(mouseX, mouseY);

    points.push(point);
    quadTree.Insert(point);
}
function RenderPoints()
{
    for(let point of points)
    {
        point.Draw();
    }
}


