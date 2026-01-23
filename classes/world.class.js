import { Shark } from "./shark.class.js";
import { Level } from "./level.class.js";
import { createLevel1 } from "../levels/level1.js";
import { Statusbar } from "./status-bar.class.js";
import { CoinBar } from "./coin-counter.class.js";
import { PoisonBar } from "./poison-counter.class.js";
import { SoundManager } from "./sound-manager.class.js";
import { CollisionManager } from "./collision-manager.class.js";

export class World {
    shark = new Shark();
    level = createLevel1();
    collisionmanager = new CollisionManager();
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
        this.connectWorldToObjects();
        this.collisionmanager.setWorld(this);
        this.checkWinningCondition();
    }

    /**
     * Connects the game world to all game objects so they can interact with it.     
     * - Sets the world reference for the Shark, allowing it to access world properties and methods.
     * - Iterates over all enemies in the current level and sets their world reference.
     * - Iterates over all collectibles in the current level and sets their world reference.     
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
     * Renders the entire game frame, including the background, objects, player, and HUD.     
     * - Calls `barDrawings()` to draw the background and all status/UI bars.
     * - Translates the canvas by `camera_x` to simulate camera movement.
     * - Draws all enemies, collectibles, poison objects, and bubbles in the game world.
     * - Draws the player character (`shark`) on top of other objects.
     * - Resets the canvas translation after drawing moving objects.
     * - Continuously requests the next animation frame using `requestAnimationFrame` to create a smooth game loop.     
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
     * - Clears the entire canvas before drawing.
     * - Translates the canvas context by `camera_x` to simulate camera movement and
     *   draws all background objects.
     * - Resets the translation and draws the player's status bar, coin bar, and poison bar.
     * - If the endboss exists and has been triggered, also draws the endboss's health bar.     
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
     * - Iterates through each object in the `objects` array.
     * - Skips objects that are `endboss` and not yet `triggered`.
     * - Calls `addToMap` for each remaining object to render it on the map.     
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
     * - Flips the image horizontally if the object's `otherDirection` property is true.
     * - Draws the object on the canvas using its `draw` method.
     * - Optionally, `drawFrame` could be called for debugging hitboxes (currently commented out).
     * - Resets the image flip if it was flipped before drawing.     
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
     * - Saves the current canvas state.
     * - Translates and scales the canvas to mirror the object along the vertical axis.
     * - Inverts the object's x-coordinate to match the flipped canvas.     
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
     * - Reverts the object's x-coordinate back to its original value.
     * - Restores the canvas state to undo the horizontal flip.     
     * @param {MovableObject} mo - The movable object whose image should be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks if less than 1 second has passed since the character was last hit.     
     * - Calculates the time difference between now and the character's `lastHit` timestamp.
     * - Converts the difference from milliseconds to seconds.
     * - Returns `true` if the character was hit less than 1 second ago, otherwise `false`.     
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
     * - Updates the canvas element's `width` and `height` properties.
     * - Re-initializes the 2D rendering context (`ctx`) after resizing.
     * - Resets the horizontal camera position (`camera_x`) to 0.     
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
     * - Monitors the endboss and the player's shark energy.
     * - If the endboss is defeated or the shark's energy drops to 0, clears relevant intervals
     *   (end screen check, collision detection, shark movement) and triggers the end screen
     *   sequence via `endscreenTimeout()`.     
     * This function is typically called at game start to start monitoring the game's end condition.
     */
    checkWinningCondition() {
        this.endscreenInterval = setInterval(() => {
            if (this.endboss && this.endboss.energy <= 0 || this.shark.energy <= 0) {
                clearInterval(this.endscreenInterval);
                clearInterval(this.collisionmanager.collisionInterval);
                clearInterval(this.shark.sharkMovementInterval);
                this.endscreenTimeout();   
            }
        }, 1000);
    }

    /**
     * Displays the end screen after a short delay to allow final animations to play.     
     * - Waits 1.5 seconds before showing the end screen and hiding mobile controls.
     * - If the player's shark has 0 or less energy, updates the end screen title and message to indicate game over.
     * - Plays the end condition sound and pauses the game world.     
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
     * - If the player's shark has 0 or less energy, stops the game music and plays the "game over" sound.
     * - Otherwise, stops the game music and plays the "game won" sound.     
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
     * - Clears active intervals for collisions and the endscreen.
     * - Resets game-specific variables to their default values.
     * - Re-initializes collision and winning condition checks.
     * - Reconnects all game objects (enemies, collectibles, shark, etc.) to the world.
     * - Redraws the game world to reflect the reset state.     
     * This method allows the game to be restarted without reloading the page.
     */
    reset() {
        clearInterval(this.collisionInterval);
        clearInterval(this.endscreenInterval);
        this.resetGameVariables();
        this.collisionmanager.checkCollisions();
        this.checkWinningCondition();
        this.connectWorldToObjects();
        this.draw();
    }

    /**
     * Resets the core game variables to their initial state.     
     * - Unpauses the game and resets the camera position.
     * - Recreates the level and initializes a new Shark instance.
     * - Sets the Shark's world reference to the current World instance.
     * - Finds and sets the Endboss from the newly created level.
     * - Hides the endscreen UI.
     * - Resets all status bars (health, coins, poison) to their starting values.     
     * This method is intended to be called when restarting the game without reloading the page.
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