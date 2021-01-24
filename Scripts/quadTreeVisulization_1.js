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
    background("#6f0f41");

    canvas.mousePressed(InsertPoint);
    RenderPoints();
    quadTree.Render();
}

function InitCanvas()
{
    //Get the drawing container
    drawingContainer = select("#drawing-container");

    //Init the canvas
    canvas = createCanvas(500, 500);
    canvas.parent(drawingContainer);
    canvas.style("display", "block");
    canvas.style("margin", "auto");

    //Create a slider
    let slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "1");
    slider.setAttribute("max", "10");
    slider.setAttribute("value", "5");
    slider.setAttribute("class", "slider");

    //Make the slider a child of drawing container
    drawingContainer.child(slider);
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


