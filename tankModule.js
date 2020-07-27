/**
 * Created with JetBrains WebStorm.
 * User: lkf5583
 * Date: 17-8-10
 * Time: 上午11:26
 * To change this template use File | Settings | File Templates. 构造函数模式
 */
var heroBullet = null;
var aHeroBullet = new Array;
var aEnemyBullet = new Array;
var c = document.getElementById('myCanvas');
var cxt = c.getContext('2d');

function tank(x,y,direct){
    this.x = x;
    this.y = y;
    this.direct = direct;
    this.speed = 3;
    this.moveUp = function(){
        if(this.y>0)
        {
            this.y = this.y-this.speed;
        }
        this.direct = 0;
    }
    this.moveRight = function(){
        if(this.x<600)
        {
            this.x = this.x+this.speed;
        }
        this.direct = 1;
    }
    this.moveDown = function(){
        if(this.y<400)
        {
            this.y = this.y+this.speed;
        }
        this.direct = 2;
    }
    this.moveLeft = function(){
        if(this.x>0)
        {
            this.x = this.x-this.speed;
        }
        this.direct = 3;
    }
}
function Hero(x,y,direct,color){
    this.hero = tank;
    this.hero(x,y,direct);
    this.direct = direct;
    this.color = color;
    this.isLive = true;
    this.shotEnemy = function(){
        switch(this.direct)
        {
            case 0:
                heroBullet = new bullet(this.x+19,this.y-21,this.direct);
                break;
            case 1:
                heroBullet = new bullet(this.x+61,this.y+19,this.direct);
                break;
            case 2:
                heroBullet = new bullet(this.x+19,this.y+61,this.direct);
                break;
            case 3:
                heroBullet = new bullet(this.x-21,this.y+19,this.direct);
                break;
        }
        aHeroBullet.push(heroBullet);
        aHeroBullet[aHeroBullet.length-1].timer = window.setInterval("aHeroBullet["+(aHeroBullet.length-1)+"].run()",50);
    }
}

function bullet(x,y,direct,tank,type){
    this.x = x;
    this.y = y;
    this.direct = direct;
    this.timer = null;
    this.tank = tank;
    this.speed = 3;
    this.isLive = true;
    this.type = type;
    this.run = function(){
        if(this.isLive)
        {
            switch(this.direct)
            {
                case 0:this.y = this.y-this.speed;break;
                case 1:this.x = this.x+this.speed;break;
                case 2:this.y = this.y+this.speed;break;
                case 3:this.x = this.x-this.speed;break;
            }
            if(this.x<0||this.x>800||this.y<0||this.y>600)
            {
                this.isLive = false;
                if(1 == this.type)
                {
                    this.tank.bulletIsLive = false;
                }
                window.clearInterval(this.timer);
            }
        }
    }
}
function aTank(x,y,direct,color){
    this.aTank = tank;
    this.aTank(x,y,direct);
    this.direct = direct;
    this.color = color;
    this.isLive = true;
    this.bulletIsLive = false;
    this.speed = 1;
    this.count = 0;
    this.run = function(){
        if(this.isLive)
        {
            switch(this.direct)
            {
                case 0:
                    if(this.y>0)
                    {
                        this.y = this.y-this.speed;
                    }
                    break;
                case 1:
                    if(this.x<600)
                    {
                        this.x = this.x+this.speed;
                    }
                    break;
                case 2:
                    if(this.y<400)
                    {
                        this.y = this.y+this.speed;
                    }
                    break;
                case 3:
                    if(this.x>0)
                    {
                        this.x = this.x-this.speed;
                    }
                    break;
            }
            if(this.count>30)
            {
                this.count=0;
                this.direct = Math.round(Math.random()*10%3);
            }
            this.count++;
            if(!this.bulletIsLive)
            {
                switch(this.direct)
                {
                    case 0:aEnemyBullet.push(new bullet(this.x+19,this.y-21,this.direct,this,1));break;
                    case 1:aEnemyBullet.push(new bullet(this.x+61,this.y+19,this.direct,this,1));break;
                    case 2:aEnemyBullet.push(new bullet(this.x+19,this.y+61,this.direct,this,1));break;
                    case 3:aEnemyBullet.push(new bullet(this.x-21,this.y+19,this.direct,this,1));break;
                }
                aEnemyBullet[aEnemyBullet.length-1].timer = window.setInterval("aEnemyBullet["+(aEnemyBullet.length-1)+"].run()",50);
                this.bulletIsLive = true;
            }
        }
    }
}
function drawTank(hero)
{
    if(hero.isLive)
    {
        switch(hero.direct)
        {
            case 0:
                cxt.beginPath();
                cxt.moveTo(hero.x,hero.y);
                cxt.lineTo(hero.x,hero.y+40);
                cxt.lineTo(hero.x+40,hero.y+40);
                cxt.lineTo(hero.x+40,hero.y);
                cxt.lineTo(hero.x,hero.y);
                cxt.moveTo(hero.x+20,hero.y);
                cxt.lineTo(hero.x+20,hero.y-20);
                cxt.stroke();
                cxt.closePath();
                break;
            case 1:
                cxt.beginPath();
                cxt.moveTo(hero.x,hero.y);
                cxt.lineTo(hero.x,hero.y+40);
                cxt.lineTo(hero.x+40,hero.y+40);
                cxt.lineTo(hero.x+40,hero.y);
                cxt.lineTo(hero.x,hero.y);
                cxt.moveTo(hero.x+40,hero.y+20);
                cxt.lineTo(hero.x+60,hero.y+20);
                cxt.stroke();
                cxt.closePath();
                break;
            case 2:
                cxt.beginPath();
                cxt.moveTo(hero.x,hero.y);
                cxt.lineTo(hero.x,hero.y+40);
                cxt.lineTo(hero.x+40,hero.y+40);
                cxt.lineTo(hero.x+40,hero.y);
                cxt.lineTo(hero.x,hero.y);
                cxt.moveTo(hero.x+20,hero.y+40);
                cxt.lineTo(hero.x+20,hero.y+60);
                cxt.stroke();
                cxt.closePath();
                break;
            case 3:
                cxt.beginPath();
                cxt.moveTo(hero.x,hero.y);
                cxt.lineTo(hero.x,hero.y+40);
                cxt.lineTo(hero.x+40,hero.y+40);
                cxt.lineTo(hero.x+40,hero.y);
                cxt.lineTo(hero.x,hero.y);
                cxt.moveTo(hero.x,hero.y+20);
                cxt.lineTo(hero.x-20,hero.y+20);
                cxt.stroke();
                cxt.closePath();
                break;
        }
    }
}
function drawHeroBullet(bullets)
{
    if(bullets.isLive)
    {
        cxt.beginPath();
        cxt.fillRect(bullets.x,bullets.y,2,2);
        cxt.closePath();
    }
}

function isHitEnemyTank(sBullet,tank)
{
    for(var j=0;j<tank.length;j++)
    {
        for(var i=0;i<sBullet.length;i++)
        {
            if(sBullet[i].x>tank[j].x&&sBullet[i].x<tank[j].x+40&&sBullet[i].y>tank[j].y&&sBullet[i].y<tank[j].y+40&&tank[j].isLive)
            {
                sBullet[i].isLive = false;
                tank[j].isLive = false;
            }
        }
    }
}
function isHitHero(hero,sBullet)
{
    for(var i=0;i<sBullet.length;i++)
    {
        if(sBullet[i].x>hero.x&&sBullet[i].x<hero.x+40&&sBullet[i].y>hero.y&&sBullet[i].y<hero.y+40&&hero.isLive)
        {
            hero.isLive = false;
            sBullet[i].isLive = false;
            sBullet[i].tank.bulletIsLive = false;
        }
    }
}

