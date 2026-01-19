class SoundManager {
    sounds = {};
    muted = false;

    constructor() {
        this.load();
    }

    load() {
        this.sounds = {
            bubbleHit: new Audio('./audio/bubble_pop.mp3'),
            bubble: new Audio('./audio/bubble_apperance.wav'),
            coin: new Audio('./audio/coin_collect.wav'),
            flask: new Audio('./audio/flask_collect.wav'),
            gameMusic: new Audio('./audio/game_music.wav'),
            gameOver: new Audio('./audio/game_over.wav'),
            gameWon: new Audio('./audio/game_won.wav'),
            bossHit: new Audio('./audio/hit_orca.wav'),
            sharkHit: new Audio('./audio/hit_shark.ogg'),
            boss: new Audio('./audio/orca_apperance.flac'),
            orcaAttack: new Audio('./audio/orca_bite.wav'),
            startMusic: new Audio('./audio/start_screen_music.wav')
        };

        this.sounds.gameMusic.loop = true;
        this.sounds.startMusic.loop = true;
    }

    play(name) {
        if (this.muted || !this.sounds[name]) return;

        const sound = this.sounds[name];
        sound.currentTime = 0;
        sound.play();
    }

    stop(name) {
        if (!this.sounds[name]) return;
        this.sounds[name].pause();
        this.sounds[name].currentTime = 0;
    }

    toggleMute() {
        this.muted = !this.muted;
        Object.values(this.sounds).forEach(s => s.muted = this.muted);
    }
}