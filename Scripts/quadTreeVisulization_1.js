//Global variables
 //Containers    
    var canvas;
    var drawingContainer;
    var slider;
    var button;
 //Data structures
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
    canvas.mousePressed(InsertPoint);
    ButtonPressed();

    //Render
    RenderPoints();
    quadTree.Render();
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
    slider.setAttribute("value", "5");

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
function ButtonPressed()
{
    button.addEventListener("click", function()
        {
            quadTree.Reset();
            points.splice(0, points.length);
        }
    )
}
