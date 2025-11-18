class Level {
    enemies;
    collectibles;
    backgroundObjects;
    level_end_x = 2700;

    constructor(enemies, collectibles, backgroundObjects) {
        this.enemies = enemies;
        this.collectibles = collectibles;
        this.backgroundObjects = backgroundObjects;
    }
}