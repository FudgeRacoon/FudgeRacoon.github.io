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
        myp5_1.stroke(0, 0, 0);
        myp5_1.strokeWeight(2);
        myp5_1.noFill();
        myp5_1.rect(this.posX, this.posY, this.width, this.height);
    }
}