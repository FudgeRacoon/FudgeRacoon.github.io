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
        noFill();
        rect(this.posX, this.posY, this.width, this.height);
    }
}