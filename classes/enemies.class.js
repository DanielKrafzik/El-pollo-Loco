class Enemies extends MovableObject {
    y = 360;
    height = 100;
    width = 100;
    energy = 40;
    colorIndex;
    isDead = false;

    //PUFFER FISH IMAGES
    IMAGES_SWIMMING_PUFFER = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];
    IMAGES_SWIMMING_PUFFER2 = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png'
    ];
    IMAGES_SWIMMING_PUFFER3 = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png'
    ];
    IMAGES_TRANSITION_PUFFER = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/1.transition5.png'
    ];
    IMAGES_TRANSITION_PUFFER2 = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/2.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/2.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/2.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/2.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/2.transition5.png'
    ];
    IMAGES_TRANSITION_PUFFER3 = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/3.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/3.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/3.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/3.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.Transition/3.transition5.png'
    ];
    IMAGES_BUBBLESWIM_PUFFER = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png'
    ];
    IMAGES_BUBBLESWIM_PUFFER2 = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png'
    ];
    IMAGES_BUBBLESWIM_PUFFER3 = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png'
    ];
    IMAGES_DYING_PUFFER = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
    ];
    IMAGES_DYING_PUFFER2 = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png'
    ];
    IMAGES_DYING_PUFFER3 = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png'
    ];

    //YELLY FISH IMAGES
    IMAGES_SWIMMING_YELLY = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];
    IMAGES_SWIMMING_YELLY2 = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];
    IMAGES_TRANSITION_YELLY = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png'
    ];
    IMAGES_TRANSITION_YELLY2 = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png'
    ];
    IMAGES_DEAD_YELLY_YELLOW =[
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
    ];
    IMAGES_DEAD_YELLY_LILA =[
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];
    IMAGES_DEAD_YELLY_GREEN =[
        'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g4.png'
    ];
    IMAGES_DEAD_YELLY_PINK =[
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png'
    ];

    //Puffer fish animation arrays
    pufferColorAnimations = [
        this.IMAGES_SWIMMING_PUFFER, 
        this.IMAGES_SWIMMING_PUFFER2, 
        this.IMAGES_SWIMMING_PUFFER3
    ];
    pufferTransitionAnimations = [
        this.IMAGES_TRANSITION_PUFFER, 
        this.IMAGES_TRANSITION_PUFFER2,
        this.IMAGES_TRANSITION_PUFFER3
    ];
    bubbleSwimAnimations = [
        this.IMAGES_BUBBLESWIM_PUFFER,
        this.IMAGES_BUBBLESWIM_PUFFER2,
        this.IMAGES_BUBBLESWIM_PUFFER3
    ];
    dyingPufferAnimations = [
        this.IMAGES_DYING_PUFFER,
        this.IMAGES_DYING_PUFFER2,
        this.IMAGES_DYING_PUFFER3
    ];

    //Jelly fish animation arrays
    jellyColorAnimations = [
        this.IMAGES_SWIMMING_YELLY,
        this.IMAGES_SWIMMING_YELLY2
    ];
    jellyTransitionAnimations = [
        this.IMAGES_TRANSITION_YELLY,
        this.IMAGES_TRANSITION_YELLY2
    ];
    jellyDeadAnimations = [
        this.IMAGES_DEAD_YELLY_YELLOW,
        this.IMAGES_DEAD_YELLY_LILA,
    ];
    jellyTransitionDeadAnimations = [
        this.IMAGES_DEAD_YELLY_GREEN,
        this.IMAGES_DEAD_YELLY_PINK
    ];

    constructor(startImage, top, right, bottom, left, currentColor) {
        super().loadImage(startImage);
        
        this.colorIndex = currentColor;
        this.offset = {
            top: top,
            right: right,
            bottom: bottom,
            left: left
        };

        this.x = 300 + Math.random() * 3500;
        this.y = 50 + Math.random() * 250;
        this.speed = 0.15 + Math.random() * 0.5;
        this.loadImages(this.IMAGES_SWIMMING_PUFFER);  
        this.loadImages(this.IMAGES_SWIMMING_PUFFER2);
        this.loadImages(this.IMAGES_SWIMMING_PUFFER3);
        this.loadImages(this.IMAGES_TRANSITION_PUFFER);
        this.loadImages(this.IMAGES_TRANSITION_PUFFER2);
        this.loadImages(this.IMAGES_TRANSITION_PUFFER3);
        this.loadImages(this.IMAGES_BUBBLESWIM_PUFFER);
        this.loadImages(this.IMAGES_BUBBLESWIM_PUFFER2);
        this.loadImages(this.IMAGES_BUBBLESWIM_PUFFER3);
        this.loadImages(this.IMAGES_DYING_PUFFER);
        this.loadImages(this.IMAGES_DYING_PUFFER2);
        this.loadImages(this.IMAGES_DYING_PUFFER3);
        this.loadImages(this.IMAGES_SWIMMING_YELLY);
        this.loadImages(this.IMAGES_SWIMMING_YELLY2);
        this.loadImages(this.IMAGES_TRANSITION_YELLY);
        this.loadImages(this.IMAGES_TRANSITION_YELLY2);
        this.loadImages(this.IMAGES_DEAD_YELLY_YELLOW);
        this.loadImages(this.IMAGES_DEAD_YELLY_LILA);
        this.loadImages(this.IMAGES_DEAD_YELLY_GREEN);
        this.loadImages(this.IMAGES_DEAD_YELLY_PINK);
        if (startImage.includes('Puffer fish')) {
            this.animatePuffer(currentColor);           
            this.moveLeft();
        } else {
            this.animateJelly(currentColor);
            this.moveUpDown();
        }
    }

    //PUFFER FISH ANIMATIONS
    animatePuffer(currentColor) {
        if (this.isDead) return;
        clearInterval(this.normalPufferAnimationInterval);

        this.currentImage = 0;
        this.offset.bottom = 30; 
        this.offset.top = 10;

        this.normalPufferAnimationInterval = setInterval(() => {
            this.normalPufferAnimation(currentColor);
        }, 1000 / 6);

        setTimeout(() => {
            clearInterval(this.normalPufferAnimationInterval);
            this.transitionPufferAnimation(currentColor);
        }, Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000);
    }


    normalPufferAnimation(currentColor) {
        if (this.isDead) return;
        let frames = this.pufferColorAnimations[currentColor];
        let i = this.currentImage % frames.length;
        this.img = this.imageCache[frames[i]];
        this.currentImage++;
    }


    transitionPufferAnimation(currentColor) {
        if (this.isDead) return;
        clearInterval(this.transitionPufferAnimationInterval);

        this.currentImage = 0;

        this.transitionPufferAnimationInterval = setInterval(() => {
            let frames = this.pufferTransitionAnimations[currentColor];
            let i = this.currentImage % frames.length;
            this.img = this.imageCache[frames[i]];
            this.currentImage++;
        }, 1000 / 6);

        setTimeout(() => {
            clearInterval(this.transitionPufferAnimationInterval);
            this.bubbleSwimAnimation(currentColor);
        }, 833);
    }


    bubbleSwimAnimation(currentColor) {
        if (this.isDead) return;
        clearInterval(this.bubbleSwimInterval);

        this.currentImage = 0;
        this.offset.bottom = 0; 
        this.offset.top = 0;

        this.bubbleSwimInterval = setInterval(() => {
            let frames = this.bubbleSwimAnimations[currentColor];
            let i = this.currentImage % frames.length;
            this.img = this.imageCache[frames[i]];
            this.currentImage++;
        }, 1000 / 6);

        setTimeout(() => {
            clearInterval(this.bubbleSwimInterval);
            this.transitionPufferAnimationReverse(currentColor);
        }, Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000);
    }

    transitionPufferAnimationReverse(currentColor) {
        if (this.isDead) return;
        clearInterval(this.transitionPufferAnimationReverseInterval);

        this.currentImage = this.pufferTransitionAnimations[currentColor].length - 1;
        this.transitionPufferAnimationReverseInterval = setInterval(() => {
            let frames = this.pufferTransitionAnimations[currentColor];
            let i = this.currentImage % frames.length;
            this.img = this.imageCache[frames[i]];
            this.currentImage--;
        }, 1000 / 6);

        setTimeout(() => {
            clearInterval(this.transitionPufferAnimationReverseInterval);
            this.animatePuffer(currentColor);
        }, 833);
    }

    dyingPufferAnimation() {
        this.isDead = true;
        clearInterval(this.normalPufferAnimationInterval);
        clearInterval(this.transitionPufferAnimationInterval);
        clearInterval(this.bubbleSwimInterval);
        clearInterval(this.transitionPufferAnimationReverseInterval);
        this.currentImage = 0;

        let path = this.dyingPufferAnimations[this.colorIndex][0];
        this.img = this.imageCache[path];
    }

    //JELLY FISH ANIMATIONS
    animateJelly(currentColor) {
        if (this.isDead) return;
        this.animateJellyInterval = setInterval(() => {
            let i = this.currentImage % this.jellyColorAnimations[currentColor].length;
            
            let path = this.jellyColorAnimations[currentColor][i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 6);

        setTimeout(() => {
            clearInterval(this.animateJellyInterval);
            this.animateJellyTransition(currentColor);
        }, Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000);
    }

    animateJellyTransition(currentColor) {
        if (this.isDead) return;
        this.currentImage = 0;

        this.animateJellyTransitionInterval = setInterval(() => {
            let i = this.currentImage % this.jellyTransitionAnimations[currentColor].length;
            let path = this.jellyTransitionAnimations[currentColor][i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 6);

        setTimeout(() => {
            clearInterval(this.animateJellyTransitionInterval);
            this.animateJelly(currentColor);
        },Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000);
    }

    animateJellyDying(enemy) {
        this.isDead = true;
        clearInterval(this.animateJellyInterval);
        clearInterval(this.animateJellyTransitionInterval);
        this.currentImage = 0;

        let deadImgArray;

        if(enemy.img.currentSrc.includes('Yellow')|| enemy.img.currentSrc.includes('Lila')){
            deadImgArray = this.jellyDeadAnimations;
        } else {
            deadImgArray = this.jellyTransitionDeadAnimations;
        }

        setInterval(() => {
            let i = this.currentImage % deadImgArray[this.colorIndex].length;
            let path = deadImgArray[this.colorIndex][i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 6);
    }

}