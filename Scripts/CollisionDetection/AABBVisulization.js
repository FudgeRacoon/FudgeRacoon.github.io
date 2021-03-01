let sketch1 = function(p)
{
    var rects;

    class Rect
    {
        x;
        y;
        width;
        height;
        highlight;

        constructor(x, y, width, height)
        {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.highlight = false;
        }

        Draw()
        {
            p.strokeWeight(4);
            p.noFill();

            if(this.highlight == false)
                p.stroke(255, 255, 255);
            else
                p.stroke(0, 0, 0);

            p.rect(this.x, this.y, this.width, this.height);
        }
    }

    p.setup = function()
    {
        //Init canvas
        p.InitCanvas();

        //Init rectangles
        p.rects = new Array();
        p.GenerateRects();
    }

    p.draw = function()
    {
        p.background("#6f0f41");

        //Process Input
        p.CheckKeyboardInput();

        //Update
        p.Reset();
        p.AABBCollision();

        //Render
        p.DrawRects();
    }

    p.InitCanvas = function()
    {
        let drawingContainer = p.selectAll(".drawing-container")[0];

        //Init canvas
        let canvas = p.createCanvas(500, 500);
        canvas.parent(drawingContainer);
        canvas.style("display", "block");
        canvas.style("margin", "auto");
    }
    p.GenerateRects = function()
    {
        for(let i = 0; i < 2; i++)
        {
            let xPos = p.random(100, 400);
            let yPos = p.random(100, 400);
            let width = p.random(50, 100);
            let height = p.random(50, 100);

            p.rects.push(new Rect(xPos, yPos, width, height));
        }    
    }
    p.CheckKeyboardInput = function()
    {
        if(p.keyIsDown(p.LEFT_ARROW))
            p.rects[0].x += -2;
        else if(p.keyIsDown(p.RIGHT_ARROW))
            p.rects[0].x += 2;
        else if(p.keyIsDown(p.UP_ARROW))
            p.rects[0].y += -2;
        else if(p.keyIsDown(p.DOWN_ARROW))
            p.rects[0].y += 2;
    } 
    p.AABBCollision = function()
    {
        for(let i = 0; i < p.rects.length; i++)
        {
            for(let j = 0; j < p.rects.length; j++)
            {
                if(p.rects[i] == p.rects[j])
                    continue;

                if(AABBCheck(p.rects[i], p.rects[j]) == true)
                {
                    p.rects[i].highlight = true;
                    p.rects[j].highlight = true;
                }
            }
        }
    }
    p.Reset = function()
    {
        for(let rect of p.rects)
            rect.highlight = false;
    }
    p.DrawRects = function()
    {
        for(let rect of p.rects)
            rect.Draw();
    }
}
let myp5_1 = new p5(sketch1);


let sketch2 = function(p)
{
    
}


