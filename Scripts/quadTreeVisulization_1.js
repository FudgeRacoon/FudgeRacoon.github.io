//Global variables 
var canvas;
var drawingContainer;
var slider;
var button;
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

    //Proccess Input
    ButtonPressed();

    //Render
    RenderPoints();
    quadTree.Render();
}

function mousePressed()
{
    if(mouseButton == LEFT)
    {
        InsertPoint();
    }
    else if(mouseButton == RIGHT)
    {
        RemovePoint();
    }   
}

function InitCanvas()
{
    //Get the drawing container
    drawingContainer = select(".drawing-container");

    //Init the canvas
    canvas = createCanvas(500, 500);
    canvas.parent(drawingContainer);
    canvas.style("display", "block");
    canvas.style("margin", "auto");

    //Create container for input elements
    let inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "input-container");
    drawingContainer.child(inputContainer);

    //Create a slider
    slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "1");
    slider.setAttribute("max", "10");
    slider.setAttribute("value", "1");

    //Make the slider a child of input container
    inputContainer.append(slider);

    //Create a button
    button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "reset");

    //Make the button a child of the input container
    inputContainer.append(button);
}
function InsertPoint()
{
    let point = new Point(mouseX, mouseY, 10);

    points.push(point);
    quadTree.Insert(point);
}
function RemovePoint()
{
    for(let point of points)
    {
        let mousePos = {x: mouseX, y: mouseY};
        let pointPos = {x: point.posX, y: point.posY};

        let xDiff = mousePos.x - pointPos.x;
        let yDiff = mousePos.y - pointPos.y;
        let distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));

        if(distance <= point.radius)
        {
            let index = points.indexOf(point);
            points.splice(index, 1);
            quadTree.Remove(point);
        }
    }
}
function RenderPoints()
{
    for(let point of points)
    {
        point.Draw();
    }
}
function ButtonPressed()
{
    button.addEventListener("click", function()
        {
            quadTree.Reset(quadTree.root);
            quadTree.currentDepth = 0;
            points.splice(0, points.length);
        }
    )
}
