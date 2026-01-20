class SoundManager {
    sounds = {};
    muted = false;
    volume = 1;

    constructor() {
        this.load();

        const savedVolume = localStorage.getItem("volume");
        if (savedVolume !== null) {
            this.volume = parseFloat(savedVolume);
        }
        this.applyVolume();
    }

    applyVolume() {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = (sound.baseVolume ?? 1) * this.volume;
        });
    }

    setVolume(value) {
        this.volume = value;
        localStorage.setItem("volume", value);
        this.applyVolume();
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
            bossHit: new Audio('./audio/hit_orca.ogg'),
            sharkHit: new Audio('./audio/hit_shark.ogg'),
            boss: new Audio('./audio/orca_apperance.flac'),
            orcaAttack: new Audio('./audio/orca_bite.wav'),
            startMusic: new Audio('./audio/start_screen_music.wav')
        };

        this.sounds.startMusic.baseVolume = 0.5;
        this.sounds.gameMusic.baseVolume = 1;
        this.sounds.flask.baseVolume = 0.5;
        this.sounds.sharkHit.baseVolume = 0.7;
        this.sounds.gameWon.baseVolume = 0.5;   
        this.sounds.orcaAttack.baseVolume = 0.5;
        this.sounds.bubbleHit.baseVolume = 0.5;

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