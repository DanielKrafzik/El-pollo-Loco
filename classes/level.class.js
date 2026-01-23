export class Level {
    enemies;
    collectibles;
    poison;
    backgroundObjects;
    level_end_x = 2700;

    constructor(enemies, collectibles, poison, backgroundObjects) {
        this.enemies = enemies;
        this.collectibles = collectibles;
        this.poison = poison;
        this.backgroundObjects = backgroundObjects;
    }
}