class Point
{
    posX;
    posY;

    constructor(posX, posY)
    {
        this.posX = posX;
        this.PosY = posY;

        noStroke();
        fill(255, 0, 0);
        circle(posX, posY, 10);
    }
}