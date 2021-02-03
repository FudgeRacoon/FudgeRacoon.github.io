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
        diameter;

        constructor(posX, posY, diameter)
        {
            this.posX = posX;
            this.posY = posY;
            this.diameter = diameter;
        }

        Draw()
        {
            p.noStroke();
            p.fill(255, 255, 255);
            p.circle(this.posX, this.posY, this.diameter);
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
    class QuadTreeNode
    {
        /***Member fields**/
        nodeBounds;
        data;
        
        nwChild;
        neChild;
        swChild;
        seChild;

        /***Constructor***/
        constructor(nodeBounds)
        {
            this.nodeBounds = nodeBounds;
            this.data = new Array();

            this.neChild = null;
            this.nwChild = null;
            this.seChild = null;
            this.swChild = null;
        }
    }
    class QuadTree
    {   
        /***Member fields***/
        root;
        currentDepth;
        maxDepth;
        quadrants;
        MAX_NUM_OF_OBJECTS;

        /***Constructor***/
        constructor(maxDepth, canvasSize)
        {
            this.currentDepth = 0;
            this.maxDepth = maxDepth;
            this.quadrants = new Array(4);

            let boundary = new Bounds(0, 0, canvasSize.width, canvasSize.height);
            this.root = new QuadTreeNode(boundary);
        }

        /***Methods***/
        IsLeaf(node) //Checks if node is a leaf
        {
            if(node.nwChild == null && 
               node.neChild == null &&
               node.swChild == null &&
               node.seChild == null)
                return true;
            else
                return false;
        }
        InBoundry(point, node) //Checks if the point is within node's boundary
        {
            if(point.posX >= node.nodeBounds.posX &&
               point.posX <= node.nodeBounds.posX + node.nodeBounds.width &&
               point.posY >= node.nodeBounds.posY &&
               point.posY <= node.nodeBounds.posY + node.nodeBounds.height)
                return true;
            else
                return false;
        }
        GetNumOfObjects(node) //Gets the number of objects at a current depth
        {
            let numOfObjects = 0;

            let process = new Queue();
            process.Push(node);

            while(process.IsEmpty() == false)
            {
                let processing = process.Pop();

                if(this.IsLeaf(processing) == false)
                {
                    process.Push(processing.nwChild);
                    process.Push(processing.neChild);
                    process.Push(processing.swChild);
                    process.Push(processing.seChild);
                }
                else
                {
                    for(let i = 0; i < processing.data.length; i++)
                        numOfObjects++;
                }
            }

            return numOfObjects;
        }
        Split(bounds) //Split the boundry to even quadrants
        {
            let min = {x: bounds.posX, y: bounds.posY};
            let dimensions = {x: bounds.width / 2, y: bounds.height / 2};

            this.quadrants[0] = new Bounds(parseInt(min.x), parseInt(min.y), parseInt(dimensions.x), parseInt(dimensions.y));
            this.quadrants[1] = new Bounds(parseInt(dimensions.x + min.x), parseInt(min.y), parseInt(dimensions.x), parseInt(dimensions.y));
            this.quadrants[2] = new Bounds(parseInt(min.x), parseInt(dimensions.y + min.y), parseInt(dimensions.x), parseInt(dimensions.y));
            this.quadrants[3] = new Bounds(parseInt(dimensions.x + min.x), parseInt(dimensions.y + min.y), parseInt(dimensions.x), parseInt(dimensions.y));
        }
        Shake(node)
        {
            let process = new Queue();
            process.Push(node);

            let parent = node;

            while(process.IsEmpty() == false)
            {
                let processing = process.Pop();
                
                if(this.IsLeaf(processing) == false)
                {
                    if(this.IsLeaf(processing.nwChild) == false)
                    {
                        this.Shake(processing.nwChild);
                        process.Push(processing.nwChild);
                    }
                    else
                        process.Push(processing.nwChild);
                    
                    if(this.IsLeaf(processing.neChild) == false)
                    {
                        this.Shake(processing.neChild);
                        process.Push(processing.neChild);
                    }
                    else
                        process.Push(processing.neChild);
                    
                    if(this.IsLeaf(processing.swChild) == false)
                    {
                        this.Shake(processing.swChild);
                        process.Push(processing.swChild);
                    }
                    else
                        process.Push(processing.swChild);
                    
                    if(this.IsLeaf(processing.seChild) == false)
                    {
                        this.Shake(processing.seChild);
                        process.Push(processing.seChild);
                    }
                    else
                        process.Push(processing.seChild);
                }

                if(this.IsLeaf(processing) == true)
                {
                    if(this.GetNumOfObjects(parent) <= this.MAX_NUM_OF_OBJECTS)
                    {
                        if(processing.data.length > 0)
                        {
                            for(let i = 0; i < processing.data.length; i++)
                            {
                                let point = processing.data[i];
                                parent.data.push(point);
                            }
                        }
                    }
                }
            }

            if(this.GetNumOfObjects(parent) <= this.MAX_NUM_OF_OBJECTS)
            {
                this.currentDepth--;
                this.Reset(parent);
            }
        }
        ChangeMax(maxNumOfObjs)
        {
            this.MAX_NUM_OF_OBJECTS = maxNumOfObjs;
        }

        Insert(object)
        {
            let process = new Queue();
            process.Push(this.root);

            while(process.IsEmpty() == false)
            {
                let processing = process.Pop();

                if(this.IsLeaf(processing) && this.InBoundry(object, processing) && (processing.data.length + 1 > this.MAX_NUM_OF_OBJECTS))
                {
                    if(this.currentDepth >= this.maxDepth)
                        return;
                    else
                    {
                        this.Split(processing.nodeBounds);

                        processing.nwChild = new QuadTreeNode(this.quadrants[0]);
                        processing.neChild = new QuadTreeNode(this.quadrants[1]);
                        processing.swChild = new QuadTreeNode(this.quadrants[2]);
                        processing.seChild = new QuadTreeNode(this.quadrants[3]);

                        this.currentDepth++;

                        processing.data.push(object);

                        for(let i = 0; i < processing.data.length; i++)
                        {
                            this.Insert(processing.data[i]);
                        }
                        
                        processing.data.splice(0, processing.data.length);
                        return;
                    }
                }
                else if(this.IsLeaf(processing) && this.InBoundry(object, processing))
                {
                    processing.data.push(object);
                    return;
                }
                else if(this.IsLeaf(processing) == false)
                {
                    process.Push(processing.neChild);
                    process.Push(processing.nwChild);
                    process.Push(processing.seChild);
                    process.Push(processing.swChild);
                }
            }
        }
        Remove(object)
        {
            let process = new Queue();
            process.Push(this.root);

            while(process.IsEmpty() == false)
            {
                let processing = process.Pop();

                if(this.IsLeaf(processing) == false)
                {
                    process.Push(processing.nwChild);
                    process.Push(processing.neChild);
                    process.Push(processing.swChild);
                    process.Push(processing.seChild);
                }
                else if(this.IsLeaf(processing) && this.InBoundry(object, processing))
                {
                    for(let i = 0; i < processing.data.length; i++)
                    {
                        if(processing.data[i] === object)
                        {
                            processing.data.splice(i, 1);
                            this.Shake(this.root);
                            return;
                        }
                    }
                }
            }
        }
        Update(object)
        {
            this.Remove(object);
            this.Insert(object);
        }
        Query(object)
        {
            let process = new Queue();
            process.Push(object);

            while(process.IsEmpty() == false)
            {
                let processing = process.Pop();

                if(this.IsLeaf(processing) == false)
                {
                    process.Push(processing.nwChild);
                    process.Push(processing.neChild);
                    process.Push(processing.swChild);
                    process.Push(processing.seChild);
                }
                else if(this.IsLeaf(processing) == true && this.InBoundry(object, processing))
                {
                    return processing.data;
                }
            }

            return null;
        }
        Render()
        {
            let process = new Queue();
            process.Push(this.root);

            while(process.IsEmpty() == false)
            {
                let processing = process.Pop();

                if(this.IsLeaf(processing) == false)
                {
                    process.Push(processing.nwChild);
                    process.Push(processing.neChild);
                    process.Push(processing.swChild);
                    process.Push(processing.seChild);
                }

                processing.nodeBounds.Draw();
            }
        }
        Reset(node)
        {
            node.nwChild = null;
            node.neChild = null;
            node.swChild = null;
            node.seChild = null;
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

            if(distance <= point.diameter / 2)
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

