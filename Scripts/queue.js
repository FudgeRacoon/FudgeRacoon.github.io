class QueueNode
{
    /***Member Fields***/
    data;
    next;

    /***Constructor***/
    constructor()
    {
        this.next = null;
    }
}

class Queue
{
    /***Member Fields***/
    front;

    /***Constructor***/
    constructor()
    {
       this.front = null;
    }

    /***Methods***/
    Push(_data)
    {
        if(this.front == null)
        {
            this.front = new QueueNode();
            this.front.data = _data;
        }
        else
        {
            let temp = new QueueNode();
            temp.data = _data;
            temp.next = null;
            
            let pointer = this.front;
            while(pointer.next != null)
            pointer = pointer.next;

            pointer.next = temp;
        }
    }
    Pop()
    {
        let pointer = this.front;
        this.front = this.front.next;
        let data = pointer.data;

        return data;
    }
    IsEmpty()
    {
        if(this.front == null)
            return true;
        else
            return false;
    }
}