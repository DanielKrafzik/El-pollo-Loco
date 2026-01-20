class World {
    shark = new Shark();
    level = level1;
    canvas;
    sound;
    ctx;
    camera_x = 0;
    keyboard;
    statusBar = new Statusbar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar();
    bubbles = [];
    lastHitTime = 0;
    isPaused = false;

    constructor(canvas, keyboard) {
        this.sound = new SoundManager();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.checkCollisions();
        this.connectWorldToObjects();
        this.checkWinningCondition();
    }

    connectWorldToObjects() {
        this.shark.setWorld(this);
        this.level.enemies.forEach(enemy => {
                enemy.setWorld(this);
        });
        this.level.collectibles.forEach(collectible => {
                collectible.setWorld(this);
        });
    }

    pause() {
        this.isPaused = true;
    }

    togglePause() {
        this.isPaused = !this.isPaused;
    }

    resume() {
        this.isPaused = false;
        this.sound.stop('startMusic');
    }

    checkCollisions() {        
        setInterval(() => {
            if (this.isPaused) return;
            this.level.enemies.forEach(enemy => {
                if(this.shark.isColliding(enemy) && !this.hitTimePassed(this.shark)) {                    
                    this.shark.hit();     
                    this.sound.play('sharkHit');               
                    this.statusBar.setPercentage(this.shark.energy);
                    if(enemy.endboss) {
                        clearInterval(enemy.endbossSwimmingInterval);
                        enemy.endbossHitCounter = 0;
                    }                    
                }
            });
            this.level.collectibles.forEach((collectible, index) => {
                if(this.shark.isColliding(collectible)) {
                    this.shark.collect();
                    this.sound.play('coin');
                    this.level.collectibles.splice(index, 1);
                    this.coinBar.setBarProgress(this.shark.coinCount);
                }
            });
            this.level.poison.forEach((poison, index) => {
                if(this.shark.isColliding(poison)) {
                    this.shark.collectPoison();
                    this.sound.play('flask');
                    this.level.poison.splice(index, 1);
                    this.poisonBar.setBarProgress(this.shark.poisonCount);
                }
            });      
            this.bubbles.forEach((bubble, bIndex) => {  
                this.level.enemies.forEach((enemy, eIndex) => {
                    if(bubble.isColliding(enemy)) {
                        this.sound.play('bubbleHit');
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
                            this.sound.play('bossHit');
                            if(bubble.poisonous){
                                enemy.hit();
                                enemy.healthbar.setHealth(enemy.energy);
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
        if(this.level.enemies[14]){
            if(this.level.enemies[14].triggered) this.addToMap(this.level.enemies[14].healthbar);
        }

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
            if(obj.endboss && !obj.triggered) return;
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

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
        this.camera_x = 0;
    }

    checkWinningCondition() {
        this.endscreenInterval = setInterval(() => {
            if (this.level.enemies[14] && this.level.enemies[14].energy <= 0 || this.shark.energy <= 0) {
                document.getElementById("endscreen").style.display = "flex";
                if(this.shark.energy <= 0) {
                    document.getElementById("endscreen-title").innerText = "Game Over!";
                    document.getElementById("endscreen-msg").innerText = "The Deep Guardian has defeated you. Better luck next time!";
                    clearInterval(this.endscreenInterval);
                }    
                this.playendcondtionSound();     
                world.pause();       
            }
        }, 1000);
    }

    playendcondtionSound() {
        if (this.shark.energy <= 0) {
            this.sound.stop('gameMusic');
            this.sound.play('gameOver');
        } else {
            this.sound.stop('gameMusic');
            this.sound.play('gameWon');
        }
    }
    
}
    