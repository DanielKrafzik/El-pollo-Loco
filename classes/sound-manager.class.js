export class SoundManager {
    sounds = {};
    muted = false;
    volume = 1;

    constructor() {
        this.load();
        this.sounds.startMusic.baseVolume = 0.5;
        this.sounds.gameMusic.baseVolume = 1;
        this.sounds.flask.baseVolume = 0.5;
        this.sounds.sharkHit.baseVolume = 0.7;
        this.sounds.gameWon.baseVolume = 0.5;   
        this.sounds.orcaAttack.baseVolume = 0.5;
        this.sounds.bubbleHit.baseVolume = 0.5;
        this.sounds.gameMusic.loop = true;
        this.sounds.startMusic.loop = true;

        const savedVolume = localStorage.getItem("volume");
        if (savedVolume !== null) {
            this.volume = parseFloat(savedVolume);
        }
        this.applyVolume();
    }

    /**
     * Applies the current global volume to all managed sounds.
     * Each sound's volume is set to its baseVolume (if defined, otherwise 1) multiplied by the global volume.
     */
    applyVolume() {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = (sound.baseVolume ?? 1) * this.volume;
        });
    }

    /**
     * Sets the volume to the specified value, saves it to localStorage,
     * and applies the new volume setting.
     *
     * @param {number} value - The new volume level to set (typically between 0 and 1).
     */
    setVolume(value) {
        this.volume = value;
        localStorage.setItem("volume", value);
        this.applyVolume();
    }

    /**
     * Loads and initializes all game audio assets into the `sounds` property.
     * Each key in the `sounds` object corresponds to a specific game event or action,
     * and is mapped to an Audio instance with the appropriate audio file.
     *
     * @example
     * soundManager.load();
     * // soundManager.sounds.bubbleHit.play();
     */
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
    }

    /**
     * Plays the specified sound by name if not muted.
     * Resets the sound to the beginning before playing.
     *
     * @param {string} name - The key/name of the sound to play.
     */
    play(name) {
        if (this.muted || !this.sounds[name]) return;

        const sound = this.sounds[name];
        sound.currentTime = 0;
        sound.play();
    }

    /**
     * Stops the playback of the specified sound by name.
     * Pauses the sound and resets its playback position to the beginning.
     *
     * @param {string} name - The name of the sound to stop.
     */
    stop(name) {
        if (!this.sounds[name]) return;
        this.sounds[name].pause();
        this.sounds[name].currentTime = 0;
    }

    /**
     * Toggles the mute state for all sounds managed by this SoundManager.
     * When called, it inverts the current mute state and applies it to all sounds.
     */
    toggleMute() {
        this.muted = !this.muted;
        Object.values(this.sounds).forEach(s => s.muted = this.muted);
    }
}