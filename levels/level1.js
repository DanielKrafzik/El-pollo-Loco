import { Level } from "../classes/level.class.js";
import { Enemies } from "../classes/enemies.class.js";
import { Coin } from "../classes/coin.class.js";
import { Poison } from "../classes/poison.class.js";
import { BackgroundObject } from "../classes/background-object.class.js";
import { Endboss } from "../classes/endboss.class.js";

export const level1 = new Level(
    [
        new Enemies('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',10,10,30,0,0),
        new Enemies('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',10,10,30,0,1),
        new Enemies('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',10,10,30,0,2),
        new Enemies('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',10,10,30,0,0),
        new Enemies('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',10,10,30,0,1),
        new Enemies('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',10,10,30,0,2),
        new Enemies('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',10,10,30,0,0),
        new Enemies('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',10,10,30,0,1),
        new Enemies('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',10,10,30,0,2),
        new Enemies('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',10,0,10,0,0),
        new Enemies('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',10,0,10,0,0),
        new Enemies('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',10,0,10,0,1),
        new Enemies('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',10,0,10,0,1),
        new Enemies('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',10,0,10,0,0),
        new Endboss()
    ],
    [        
        new Coin(400, 350),
        new Coin(800, 300),
        new Coin(1200, 100),
        new Coin(1600, 400),
        new Coin(2000, 250)
    ],
    [
        new Poison(600, 350),
        new Poison(1000, 300),
        new Poison(1400, 150),
        new Poison(1800, 400),
        new Poison(2200, 250)
    ],
    [
        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0),    
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),
        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 940),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 940),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 940),
        new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 940),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 940),
        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 940 * 2),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 940 * 2),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 940 * 2),
        new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 940 * 2),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 940 * 2),
        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 940 * 3),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 940 * 3),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 940 * 3),
        new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 940 * 3),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 940 * 3),
        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 940 * 4),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 940 * 4),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 940 * 4),
        new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 940 * 4),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 940 * 4)
    ]
);