function AABBCheck(rect1, rect2)
{
    if(rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.y + rect1.height > rect2.y)
        return true;
    else
        return false;
}
function PointVsRectCheck(point, rect)
{
    if(point.x > rect.x &&
       point.x < rect.x + rect.width &&
       point.y > rect.y &&
       point.y < rect.y + rect.height)
        return true;
    else
        return false;
}

