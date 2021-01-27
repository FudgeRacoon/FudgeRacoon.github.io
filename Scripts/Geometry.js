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
        noStroke();
        fill("#FFFFFF");
        circle(this.posX, this.posY, this.radius);
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