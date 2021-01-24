class Point
{
    posX;
    posY;

    constructor(posX, posY)
    {
        this.posX = posX;
        this.posY = posY;
    }

    Draw()
    {
        noStroke();
        fill("#FFFFFF");
        circle(this.posX, this.posY, 5);
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
        stroke(0, 0, 0);
        strokeWeight(2);
        noFill();
        rect(this.posX, this.posY, this.width, this.height);
    }
}