class QuadTreeNode
{
    /***Member fields**/
    maxNumOfObjects;
    nodeBounds;
    data;
    
    neChild;
    nwChild;
    seChild;
    swChild;

    /***Constructor***/
    constructor(nodeBounds)
    {
        this.nodeBounds = nodeBounds;

        this.maxNumOfObjects = 1;
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

    /***Constructor***/
    constructor(maxDepth)
    {
        this.currentDepth = 0;
        this.maxDepth = maxDepth;
        this.quadrants = new Array(4);

        let boundary = new Bounds(0, 0, 500, 500);
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

    Insert(object)
    {
        let process = new Queue();
        process.Push(this.root);

        while(process.IsEmpty() == false)
        {
            let processing = process.Pop();

            if(this.IsLeaf(processing) && this.InBoundry(object, processing) && (processing.data.length + 1 > 1))
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
}