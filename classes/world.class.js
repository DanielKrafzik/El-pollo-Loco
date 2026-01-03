class World {
    shark = new Shark();
    level = level1;
    canvas;
    ctx;
    camera_x = 0;
    keyboard;
    statusBar = new Statusbar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar();
    bubbles = [];
    lastHitTime = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.connectWorldToObjects();
    }

    connectWorldToObjects() {
        this.level.enemies.forEach(enemy => {
            if (enemy.setWorld) {
                enemy.setWorld(this);
            }
        });
    }

    setWorld() {
        this.shark.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if(this.shark.isColliding(enemy) && this.lastHitTime >= 2) {                    
                    this.shark.hit();
                    this.statusBar.setPercentage(this.shark.energy);
                }
            });
            this.level.collectibles.forEach((collectible, index) => {
                if(this.shark.isColliding(collectible)) {
                    this.shark.collect();
                    this.level.collectibles.splice(index, 1);
                    this.coinBar.setBarProgress(this.shark.coinCount);
                }
            });
            this.level.poison.forEach((poison, index) => {
                if(this.shark.isColliding(poison)) {
                    this.shark.collectPoison();
                    this.level.poison.splice(index, 1);
                    this.poisonBar.setBarProgress(this.shark.poisonCount);
                }
            });      
            this.bubbles.forEach((bubble, bIndex) => {  
                this.level.enemies.forEach((enemy, eIndex) => {
                    if(bubble.isColliding(enemy)) {
                        if(!enemy.endboss){
                            this.bubbles.splice(bIndex, 1);
                            enemy.energy -= 20;
                            if(enemy.energy <= 0) {
                                if(enemy.img.currentSrc.includes('Puffer')) {
                                    clearInterval(enemy.moveLeftInterval);
                                    enemy.dyingPufferAnimation(enemy);
                                } else {
                                    clearInterval(enemy.moveUpDownInterval);
                                    enemy.animateJellyDying(enemy);                                    
                                }
                                enemy.moveUp();
                                setTimeout(() => {
                                    this.level.enemies.splice(eIndex, 1);
                                }, 3000);
                            }
                        } else if (enemy.endboss ) {
                            this.bubbles.splice(bIndex, 1);
                            if(bubble.poisonous){
                                enemy.hit();
                                if(enemy.energy <= 0) {
                                    clearInterval(this.moveTowardsSharkIntervall);
                                    clearInterval(enemy.endbossSwimmingInterval);
                                    enemy.speed = 0.5;
                                    enemy.endbossDyingAnimation();
                                    enemy.moveUp();
                                    setTimeout(() => {
                                        this.level.enemies.splice(eIndex, 1);
                                    }, 3000);
                                } else if (enemy.energy > 0) {
                                    clearInterval(enemy.endbossSwimmingInterval);
                                    clearInterval(this.moveTowardsSharkIntervall);
                                    this.moveTowardsSharkIntervall = setInterval(() => {
                                        enemy.moveTowardsShark();
                                    }, 1000 / 60);
                                }
                            }
                        }
                    }    
                });
            });
        }, 100);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);        
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.poisonBar);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectibles);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.bubbles);
        
        this.addToMap(this.shark);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    hitTimePassed(character) {        
        this.lastHitTime = new Date().getTime() - character.lastHit;
        this.lastHitTime = this.lastHitTime / 1000;
        return this.lastHitTime < 1;
    }
    
}
    