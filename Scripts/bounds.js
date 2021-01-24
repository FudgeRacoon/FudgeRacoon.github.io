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
        stroke(255, 255, 255);
        strokeWeight(1);
        noFill();
        rect(this.posX, this.posY, this.width, this.height);
    }
}