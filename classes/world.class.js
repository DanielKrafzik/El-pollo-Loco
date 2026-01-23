import { Shark } from "./shark.class.js";
import { Level } from "./level.class.js";
import { createLevel1 } from "../levels/level1.js";
import { Statusbar } from "./status-bar.class.js";
import { CoinBar } from "./coin-counter.class.js";
import { PoisonBar } from "./poison-counter.class.js";
import { SoundManager } from "./sound-manager.class.js";


export class World {
    shark = new Shark();
    level = createLevel1();
    canvas;
    sound;
    ctx;
    camera_x = 0;
    gamekeyboard;
    statusBar = new Statusbar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar();
    bubbles = [];
    lastHitTime = 0;
    isPaused = false;
    endboss;

    constructor(canvas, gamekeyboard) {
        this.sound = new SoundManager();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.gamekeyboard = gamekeyboard;
        this.endboss = this.level.enemies.find(enemy => enemy.endboss);
        this.draw();
        this.checkCollisions();
        this.connectWorldToObjects();
        this.checkWinningCondition();
    }

    /**
     * Connects the game world to all game objects so they can interact with it.
     *
     * - Sets the world reference for the Shark, allowing it to access world properties and methods.
     * - Iterates over all enemies in the current level and sets their world reference.
     * - Iterates over all collectibles in the current level and sets their world reference.
     *
     * This ensures that every game object can interact with the world, e.g., for collision detection,
     * sound effects, or accessing game state.
     */
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

    /**
     * Starts a recurring check for all game collisions and interactions.
     *
     * - Runs every 100 milliseconds using `setInterval`.
     * - Skips execution if the game is currently paused (`isPaused` is true).
     * - Checks for collisions between the player (`shark`) and enemies.
     * - Handles collectible pickups such as coins and poison items.
     * - Processes bubble interactions in the game world.
     *
     * This function sets up the main collision detection loop for gameplay mechanics.
     */
    checkCollisions() {                
        this.collisionInterval = setInterval(() => {
            if (this.isPaused) return;
            this.sharkColliding();
            this.coinCollecting();
            this.poisonCollecting();      
            this.bubbleHandling();
        }, 100);
    }

    /**
     * Handles interactions between bubbles and enemies in the game world.
     *
     * - Iterates through all active bubbles and checks for collisions with each enemy.
     * - Plays the 'bubbleHit' sound when a collision occurs.
     * - For regular enemies, triggers `bubbleSplicing` to handle the collision effects.
     * - For the endboss, triggers `poisonBubbleSplicing` instead.
     *
     * This method is responsible for detecting and processing all bubble-enemy interactions.
     */
    bubbleHandling() {
        this.bubbles.forEach((bubble, bIndex) => {
            this.level.enemies.forEach((enemy, eIndex) => {
                if (bubble.isColliding(enemy)) {
                    this.sound.play('bubbleHit');
                    if (!enemy.endboss) {
                        this.bubbleSplicing(bIndex, bubble, enemy, eIndex);
                    } else if (enemy.endboss) {
                        this.poisonBubbleSplicing(bIndex, bubble, enemy, eIndex);
                    }
                }
            });
        });
    }

    /**
     * Handles the collision of a poisonous bubble with the endboss.
     *
     * - Removes the bubble from the active bubbles array.
     * - Plays the 'bossHit' sound effect.
     * - If the bubble is poisonous and the enemy is the endboss:
     *   - Applies damage to the endboss by calling `hit()`.
     *   - Updates the endboss health bar to reflect the current energy.
     *   - Calls `bubbleIntervallHandling` to handle any additional endboss-specific effects.
     *
     * @param {number} bIndex - The index of the bubble in the bubbles array.
     * @param {Object} bubble - The bubble object that collided.
     * @param {Object} enemy - The enemy object (endboss) that was hit.
     * @param {number} eIndex - The index of the enemy in the enemies array.
     */
    poisonBubbleSplicing(bIndex, bubble, enemy, eIndex) {
        this.bubbles.splice(bIndex, 1);
        this.sound.play('bossHit');
        if (bubble.poisonous && enemy.endboss) {
            enemy.hit();
            enemy.healthbar.setHealth(enemy.energy);
            this.bubbleIntervallHandling(enemy, eIndex);
        }
    }

    /**
     * Handles the aftermath of a bubble hitting an enemy, specifically for the endboss.
     *
     * - If the enemy's energy is 0 or less:
     *   - Stops the endboss movement and swimming intervals.
     *   - Reduces the endboss speed and triggers its dying animation.
     *   - Moves the endboss upwards.
     *   - Removes the endboss from the enemies array after 3 seconds.
     * - If the enemy still has energy:
     *   - Stops both the endboss swimming interval and the general move-towards-shark interval.
     *
     * @param {Object} enemy - The enemy object that was hit by a bubble.
     * @param {number} eIndex - The index of the enemy in the enemies array.
     */
    bubbleIntervallHandling(enemy, eIndex) {
        if (enemy.energy <= 0) {
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

    /**
     * Handles the effects of a regular bubble hitting a non-endboss enemy.
     *
     * - Removes the bubble from the bubbles array.
     * - Reduces the enemy's energy based on whether the bubble is poisonous (40 if poisonous, 20 otherwise).
     * - If the enemy's energy drops to 0 or below, triggers `poisonBubbleIntervalHandling` for further processing.
     *
     * @param {number} bIndex - The index of the bubble in the bubbles array.
     * @param {Object} bubble - The bubble object that collided with the enemy.
     * @param {Object} enemy - The enemy object that was hit by the bubble.
     * @param {number} eIndex - The index of the enemy in the enemies array.
     */
    bubbleSplicing(bIndex, bubble, enemy, eIndex) {
        this.bubbles.splice(bIndex, 1);
        if (bubble.poisonous) enemy.energy -= 40;
        else enemy.energy -= 20;
        if (enemy.energy <= 0) {
            this.poisonBubbleIntervalHandling(enemy, eIndex);
        }
    }

    /**
     * Handles the death sequence for an enemy after being hit by a bubble that reduces its energy to zero.
     *
     * - Determines the enemy type based on its image source.
     *   - If it's a Puffer fish, stops its left movement interval and plays the dying animation.
     *   - Otherwise, assumes it's a Jellyfish, stops its vertical movement interval and plays the jelly dying animation.
     * - Moves the enemy upward to simulate a death movement.
     * - Removes the enemy from the `level.enemies` array after 3 seconds.
     *
     * @param {Object} enemy - The enemy object that is dying.
     * @param {number} eIndex - The index of the enemy in the `level.enemies` array.
     */
    poisonBubbleIntervalHandling(enemy, eIndex) {
        if (enemy.img.currentSrc.includes('Puffer')) {
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

    /**
     * Checks for collisions between the shark and poison items in the level.
     *
     * - If the shark collides with a poison item:
     *   - Increases the shark's poison count via `collectPoison()`.
     *   - Plays a "flask" sound effect.
     *   - Removes the collected poison item from the level.
     *   - Updates the poison bar to reflect the shark's current poison count.
     */
    poisonCollecting() {
        this.level.poison.forEach((poison, index) => {
            if (this.shark.isColliding(poison)) {
                this.shark.collectPoison();
                this.sound.play('flask');
                this.level.poison.splice(index, 1);
                this.poisonBar.setBarProgress(this.shark.poisonCount);
            }
        });
    }

    /**
     * Checks for collisions between the shark and collectible coins in the level.
     *
     * - If the shark collides with a coin:
     *   - Increases the shark's coin count via `collect()`.
     *   - Plays a "coin" sound effect.
     *   - Removes the collected coin from the level.
     *   - Updates the coin bar to reflect the shark's current coin count.
     */
    coinCollecting() {
        this.level.collectibles.forEach((collectible, index) => {
            if (this.shark.isColliding(collectible)) {
                this.shark.collect();
                this.sound.play('coin');
                this.level.collectibles.splice(index, 1);
                this.coinBar.setBarProgress(this.shark.coinCount);
            }
        });
    }

    /**
     * Checks for collisions between the shark and all enemies in the level.
     *
     * - If a collision occurs and the shark has not been hit recently:
     *   - Reduces the shark's energy via `hit()`.
     *   - Plays the "sharkHit" sound effect.
     *   - Updates the status bar to reflect the shark's current energy.
     *   - If the enemy is the endboss:
     *     - Stops the endboss's swimming interval.
     *     - Resets the endboss's hit counter.
     */
    sharkColliding() {
        this.level.enemies.forEach(enemy => {
            if (this.shark.isColliding(enemy) && !this.hitTimePassed(this.shark)) {
                this.shark.hit();
                this.sound.play('sharkHit');
                this.statusBar.setPercentage(this.shark.energy);
                if (enemy.endboss) {
                    clearInterval(enemy.endbossSwimmingInterval);
                    enemy.endbossHitCounter = 0;
                }
            }
        });
    }

    /**
     * Renders the entire game frame, including the background, objects, player, and HUD.
     *
     * - Calls `barDrawings()` to draw the background and all status/UI bars.
     * - Translates the canvas by `camera_x` to simulate camera movement.
     * - Draws all enemies, collectibles, poison objects, and bubbles in the game world.
     * - Draws the player character (`shark`) on top of other objects.
     * - Resets the canvas translation after drawing moving objects.
     * - Continuously requests the next animation frame using `requestAnimationFrame` to
     *   create a smooth game loop.
     *
     * This function is the main rendering loop responsible for visual updates in the game.
     */
    draw() {
        this.barDrawings();        
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

    /**
     * Draws the game scene including background objects and all UI/status bars.
     *
     * - Clears the entire canvas before drawing.
     * - Translates the canvas context by `camera_x` to simulate camera movement and
     *   draws all background objects.
     * - Resets the translation and draws the player's status bar, coin bar, and poison bar.
     * - If the endboss exists and has been triggered, also draws the endboss's health bar.
     *
     * This method is responsible for rendering all visual elements that appear on the main
     * game screen and the heads-up display (HUD).
     */
    barDrawings() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);       
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.poisonBar);
        if(this.endboss){
            if(this.endboss.triggered) this.addToMap(this.endboss.healthbar);
        }
    }

    /**
     * Adds an array of game objects to the map.
     *
     * - Iterates through each object in the `objects` array.
     * - Skips objects that are `endboss` and not yet `triggered`.
     * - Calls `addToMap` for each remaining object to render it on the map.
     *
     * @param {Array<Object>} objects - The array of game objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            if(obj.endboss && !obj.triggered) return;
            this.addToMap(obj);
        });
    }

    /**
     * Renders a movable object (`mo`) onto the game canvas.
     *
     * - Flips the image horizontally if the object's `otherDirection` property is true.
     * - Draws the object on the canvas using its `draw` method.
     * - Optionally, `drawFrame` could be called for debugging hitboxes (currently commented out).
     * - Resets the image flip if it was flipped before drawing.
     *
     * @param {MovableObject} mo - The movable object to render on the canvas.
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        /*mo.drawFrame(this.ctx);*/
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips a movable object's image horizontally on the canvas.
     *
     * - Saves the current canvas state.
     * - Translates and scales the canvas to mirror the object along the vertical axis.
     * - Inverts the object's x-coordinate to match the flipped canvas.
     *
     * @param {MovableObject} mo - The movable object whose image should be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores a previously flipped movable object's image to its original orientation.
     *
     * - Reverts the object's x-coordinate back to its original value.
     * - Restores the canvas state to undo the horizontal flip.
     *
     * @param {MovableObject} mo - The movable object whose image should be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks if less than 1 second has passed since the character was last hit.
     *
     * - Calculates the time difference between now and the character's `lastHit` timestamp.
     * - Converts the difference from milliseconds to seconds.
     * - Returns `true` if the character was hit less than 1 second ago, otherwise `false`.
     *
     * @param {Object} character - The character object to check.
     * @param {number} character.lastHit - The timestamp (in milliseconds) of the character's last hit.
     * @returns {boolean} True if the last hit was less than 1 second ago, false otherwise.
     */
    hitTimePassed(character) {        
        this.lastHitTime = new Date().getTime() - character.lastHit;
        this.lastHitTime = this.lastHitTime / 1000;
        return this.lastHitTime < 1;
    }

    /**
     * Resizes the game canvas to the specified width and height.
     *
     * - Updates the canvas element's `width` and `height` properties.
     * - Re-initializes the 2D rendering context (`ctx`) after resizing.
     * - Resets the horizontal camera position (`camera_x`) to 0.
     *
     * @param {number} width - The new width of the canvas in pixels.
     * @param {number} height - The new height of the canvas in pixels.
     */
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
        this.camera_x = 0;
    }

    /**
     * Continuously checks if the game has reached a winning or losing condition.
     *
     * - Monitors the endboss and the player's shark energy.
     * - If the endboss is defeated or the shark's energy drops to 0, clears relevant intervals
     *   (end screen check, collision detection, shark movement) and triggers the end screen
     *   sequence via `endscreenTimeout()`.
     *
     * This function is typically called at game start to start monitoring the game's end condition.
     */
    checkWinningCondition() {
        this.endscreenInterval = setInterval(() => {
            if (this.endboss && this.endboss.energy <= 0 || this.shark.energy <= 0) {
                clearInterval(this.endscreenInterval);
                clearInterval(this.collisionInterval);
                clearInterval(this.shark.sharkMovementInterval);
                this.endscreenTimeout();   
            }
        }, 1000);
    }

    /**
     * Displays the end screen after a short delay to allow final animations to play.
     *
     * - Waits 1.5 seconds before showing the end screen and hiding mobile controls.
     * - If the player's shark has 0 or less energy, updates the end screen title and message to indicate game over.
     * - Plays the end condition sound and pauses the game world.
     *
     * This allows the player to see any final animations (e.g., the shark or endboss dying) before the end screen appears.
     */
    endscreenTimeout() {
        setTimeout(() => {
            document.getElementById("endscreen").style.display = "flex";
            document.getElementById("mobile-controls").style.display = "none";
            if (this.shark.energy <= 0) {
                document.getElementById("endscreen-title").innerText = "Game Over!";
                document.getElementById("endscreen-msg").innerText = "The Deep Guardian has defeated you. Better luck next time!";
            }
            this.playendcondtionSound();
            this.pause();
        }, 1500);
    }

    /**
     * Plays the appropriate end-of-game sound based on the player's outcome.
     *
     * - If the player's shark has 0 or less energy, stops the game music and plays the "game over" sound.
     * - Otherwise, stops the game music and plays the "game won" sound.
     *
     * This function ensures the correct audio feedback is given when the game ends.
     */
    playendcondtionSound() {
        if (this.shark.energy <= 0) {
            this.sound.stop('gameMusic');
            this.sound.play('gameOver');
        } else {
            this.sound.stop('gameMusic');
            this.sound.play('gameWon');
        }
    }    

    /**
     * Resets the game world to its initial state.
     *
     * - Clears active intervals for collisions and the endscreen.
     * - Resets game-specific variables to their default values.
     * - Re-initializes collision and winning condition checks.
     * - Reconnects all game objects (enemies, collectibles, shark, etc.) to the world.
     * - Redraws the game world to reflect the reset state.
     *
     * This method allows the game to be restarted without reloading the page.
     */
    reset() {
        clearInterval(this.collisionInterval);
        clearInterval(this.endscreenInterval);
        this.resetGameVariables();
        this.checkCollisions();
        this.checkWinningCondition();
        this.connectWorldToObjects();
        this.draw();
    }

    /**
     * Resets the core game variables to their initial state.
     *
     * - Unpauses the game and resets the camera position.
     * - Recreates the level and initializes a new Shark instance.
     * - Sets the Shark's world reference to the current World instance.
     * - Finds and sets the Endboss from the newly created level.
     * - Hides the endscreen UI.
     * - Resets all status bars (health, coins, poison) to their starting values.
     *
     * This method is intended to be called when restarting the game
     * without reloading the page.
     */
    resetGameVariables() {
        this.isPaused = false;
        this.camera_x = 0;
        this.level = createLevel1();
        this.shark = new Shark();
        this.shark.setWorld(this);
        this.endboss = this.level.enemies.find(e => e.endboss);
        document.getElementById("endscreen").style.display = "none";
        this.statusBar.setPercentage(100);
        this.coinBar.setBarProgress(0);
        this.poisonBar.setBarProgress(0);
    }

}
    