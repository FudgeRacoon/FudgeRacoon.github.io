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
        data = new Array();

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
        this.maxDepth = maxDepth;

        let boundary = new Bounds(0, 0, canvas.size().width, canvas.size().height);
        root = new QuadTreeNode(boundary);
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

        process = new Queue();
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

    Insert(object)
    {
        
    }
}