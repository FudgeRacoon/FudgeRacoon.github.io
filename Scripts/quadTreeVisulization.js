let sketch1 = function(p)
{
    //Member fields
    var canvas;
    var button;
    var quadTree;
    var points;

    //Geometry classes
    class Point
    {
        posX;
        posY;
        radius;

        constructor(posX, posY, radius)
        {
            this.posX = posX;
            this.posY = posY;
            this.radius = radius
        }

        Draw()
        {
            p.noStroke();
            p.fill(255, 255, 255);
            p.circle(this.posX, this.posY, this.radius);
        }
    }
    class Bounds
    {
        posX;
        posY;
        width;
        height;

        constructor(posX, posY, width, height)
        {
            this.posX = posX;
            this.posY = posY;
            this.width = width;
            this.height = height;
        }

        Draw()
        {
            p.stroke(0, 0, 0);
            p.strokeWeight(2);
            p.noFill();
            p.rect(this.posX, this.posY, this.width, this.height);
        }
    }

    //Methods
    p.setup = function ()
    {
        //Init canvas
        p.InitCanvas();

        //Init quad tree
        p.quadTree = new QuadTree(10, p.canvas.size());
        
        //Init points array
        p.points = new Array();
    }

    p.draw = function()
    {
        //Clear background
        p.background("#6f0f41");

        //Update
        p.quadTree.ChangeMax(document.getElementsByTagName("input")[0].value);

        //Proccess Input
        p.ButtonPressed();

        //Render
        p.RenderPoints();
        p.quadTree.Render();
    }
    
    p.mousePressed = function()
    {
        if(p.mouseButton == p.LEFT)
        {
            p.InsertPoint();
        }
        else if(p.mouseButton == p.RIGHT)
        {
            p.RemovePoint();
        }   
    }
    
    //Methods
    p.InitCanvas = function()
    {
        //Get the drawing container
        let drawingContainer = p.selectAll(".drawing-container")[0];

        //Init the canvas
        p.canvas = p.createCanvas(500, 500);
        p.canvas.parent(drawingContainer);
        p.canvas.style("display", "block");
        p.canvas.style("margin", "auto");

        //Create container for input elements
        let inputContainer = document.createElement("div");
        inputContainer.setAttribute("class", "input-container");
        drawingContainer.child(inputContainer);

        //Create a slider
        let slider = document.createElement("input");
        slider.setAttribute("type", "range");
        slider.setAttribute("min", "1");
        slider.setAttribute("max", "10");
        slider.setAttribute("value", "1");

        //Make the slider a child of input container
        inputContainer.append(slider);

        //Create a button
        p.button = document.createElement("input");
        p.button.setAttribute("type", "button");
        p.button.setAttribute("value", "reset");

        //Make the button a child of the input container
        inputContainer.append(p.button);
    }
    p.InsertPoint = function()
    {
        let point = new Point(p.mouseX, p.mouseY, 10);

        p.points.push(point);
        p.quadTree.Insert(point);
    }
    p.RemovePoint = function()
    {
        for(let point of p.points)
        {
            let mousePos = {x: p.mouseX, y: p.mouseY};
            let pointPos = {x: point.posX, y: point.posY};

            let xDiff = mousePos.x - pointPos.x;
            let yDiff = mousePos.y - pointPos.y;
            let distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));

            if(distance <= point.radius)
            {
                let index = p.points.indexOf(point);
                p.points.splice(index, 1);
                p.quadTree.Remove(point);
            }
        }
    }
    p.RenderPoints = function()
    {
        for(let point of p.points)
        {
            point.Draw();
        }
    }
    p.ButtonPressed = function()
    {
        p.button.addEventListener("click", function()
            {
                p.quadTree.Reset(p.quadTree.root);
                p.quadTree.currentDepth = 0;
                p.points.splice(0, p.points.length);
            }
        )
    }
}

let myp5_1 = new p5(sketch1);

let sketch2 = function(p)
{   
    //Member fields
    var canvas;
    var points;
    var fpsCounter;
    var button;
    var enabled;

    //Geometry class
    class Point
    {
        posX;
        posY;
        diameter;
        highlight;

        constructor(posX, posY, diameter)
        {
            this.posX = posX;
            this.posY = posY;
            this.diameter = diameter;
            this.highlight = false;
        }

        Draw()
        {
            p.noStroke();
            if(this.highlight == false)
            {
                p.fill(255, 255, 255);
            }
            else if(this.highlight == true)
            {
                p.fill(0, 0, 0);
            }
            p.circle(this.posX, this.posY, this.diameter);
        }
    }

    //Methods
    p.setup = function()
    {
        //Init canvas
        p.InitCanvas();

        //Init points array
        p.points = new Array();

        //Generate points
        p.GeneratePoints();
    }

    p.draw = function()
    {   
        //Clear background
        p.background("#6f0f41");
        
        //Update
        p.MovePoints();
        p.ResetPointsHighlight();
        p.CheckPointsCollision();
        p.UpdateFPS();
        

        //Render
        p.RenderPoints();
    }

    //Methods
    p.InitCanvas = function()
    {
        //Get the drawing container
        let drawingContainer = p.selectAll(".drawing-container")[1];
        
        //Init the canvas
        p.canvas = p.createCanvas(500, 500);
        p.canvas.parent(drawingContainer);
        p.canvas.style("display", "block");
        p.canvas.style("margin", "auto");

        //Create container for input elements
        let inputContainer = document.createElement("div");
        inputContainer.setAttribute("class", "input-container");
        drawingContainer.child(inputContainer);

        //Create a fps counter
        p.fpsCounter = document.createElement("p");
        
        //Make counter child of input container
        inputContainer.append(p.fpsCounter);
    }
    p.UpdateFPS = function()
    {
        p.fpsCounter.innerHTML = "FPS: " + p.frameRate().toFixed(2);
    }
    p.GeneratePoints = function()
    {
        for(let x = 0; x < 1000; x++)
        {
            let point = new Point(p.random(x + 200), p.random(x + 200), 10);
            p.points.push(point);
        }
    }
    p.MovePoints = function()
    {
        for(let point of p.points)
        {
            point.posX += p.random(-1, 1);
            point.posY += p.random(-1, 1);
        }
    }
    p.CheckPointsCollision = function()
    {
        for(let x = 0; x < p.points.length; x++)
        {
            for(let y = 0; y < p.points.length; y++)
            {
                if(p.points[x] != p.points[y])
                {
                    p.CheckCollision(p.points[x], p.points[y]);
                }
            }
        }
    }
    p.CheckCollision = function(point, otherPoint)
    {
        let diffX = point.posX - otherPoint.posX;
        let diffY = point.posY - otherPoint.posY;

        let dist = Math.sqrt((diffX * diffX) + (diffY * diffY));

        if(dist < ((point.diameter / 2) + (otherPoint.diameter / 2)))
        {
            point.highlight = true;
        }
    }
    p.ResetPointsHighlight = function()
    {
        for(let point of p.points)
        {
            point.highlight = false;
        }
    }
    p.RenderPoints = function()
    {
        for(let point of p.points)
        {
            point.Draw();
        }
    }
}

let myp5_2 = new p5(sketch2);