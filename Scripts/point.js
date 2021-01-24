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
        fill(255, 0, 0);
        circle(this.posX, this.posY, 5);
    }
}