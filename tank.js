/**
 * Created with JetBrains WebStorm.
 * User: lkf5583
 * Date: 17-8-10
 * Time: 上午8:52
 * To change this template use File | Settings | File Templates.
 */

;(function($){
    var myTank = new Hero(100,100,0);
    var aEnemyTank = new Array;
    var ENEMYCOUNTS = 5;
    for(var k=0;k<ENEMYCOUNTS;k++)
    {
        aEnemyTank.push(new aTank(200+k*60,200+k*60,k%4));
    }
    drawTank(myTank);
    for(var t=0;t<ENEMYCOUNTS;t++)
    {
        drawTank(aEnemyTank[t]);
    }
    function flashMap()
    {
        cxt.clearRect(0,0,800,600);
        drawTank(myTank);
        for(var t=0;t<ENEMYCOUNTS;t++)
        {
            drawTank(aEnemyTank[t]);
        }
        isHitEnemyTank(aHeroBullet,aEnemyTank);
        isHitHero(myTank,aEnemyBullet);
        for(var i=0;i<aHeroBullet.length;i++)
        {
            drawHeroBullet(aHeroBullet[i]);
        }
        for(var u=0;u<aEnemyBullet.length;u++)
        {
            drawHeroBullet(aEnemyBullet[u]);
        }
    }
    document.onkeydown = function(e){
        switch(e.keyCode)
        {
            case 119:case 87:myTank.moveUp();break;
            case 100:case 68:myTank.moveRight();break;
            case 115:case 83:myTank.moveDown();break;
            case 97:case 65:myTank.moveLeft();break;
            case 106:case 74:myTank.shotEnemy();break;

            default:break;
        }
        flashMap();
    }
    function tankRun()
    {
        for(var y=0;y<5;y++)
        {
            aEnemyTank[y].run();
        }
    }
    window.setInterval(tankRun,50);
    window.setInterval(flashMap,50);
}());
