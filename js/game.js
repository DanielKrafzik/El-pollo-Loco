let canvas;
let world;
let musicCondition = true;
let keyboard = new Keyboard();

/**
 * Handles the click event on the Play button to start the game.
 *
 * - Prevents the click event from propagating to avoid triggering other listeners.
 * - Attempts to lock the screen orientation to landscape mode on supported devices.
 * - Disables the initial music condition flag to prevent replaying start music.
 * - Hides the start screen UI.
 * - Displays mobile control buttons if the device is detected as mobile.
 * - Resumes the game world and starts playing the game background music.
 *
 * This listener initializes the active gameplay state when the user presses "Play".
 */
document.getElementById("play-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(() => {});
    }
    musicCondition = false;
    document.getElementById("start-screen").style.display = "none";
    if (isMobile()) {
        document.getElementById("mobile-controls").style.display = "flex";
    }
    world.resume();
    world.sound.play('gameMusic');
});

/**
 * Initializes the game environment.
 *
 * - Retrieves the canvas element and creates a new `World` instance with it and the keyboard controls.
 * - Immediately pauses the world after creation.
 * - Sets up the volume slider for sound control.
 * - Checks the device orientation and displays a rotate hint if necessary.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    
    world.pause();
    setupVolumeSlider();
    checkOrientation();
}

/**
 * Initializes the volume slider for controlling the game's sound volume.
 *
 * - Sets the slider's initial value based on the current volume of `world.sound`.
 * - Adds an "input" event listener to update the game's sound volume in real-time as the slider is moved.
 *
 * Requires a global `world` object with a `sound` property that has `volume` and `setVolume` methods.
 */
function setupVolumeSlider() {
    const volumeSlider = document.getElementById("volume-slider");
    if (!volumeSlider) return;

    volumeSlider.value = world.sound.volume * 100;

    volumeSlider.addEventListener("input", (e) => {
        const volume = e.target.value / 100;
        world.sound.setVolume(volume);
    });
}

/**
 * Handles key release events to reset keyboard input states.
 *
 * This event listener listens for `keydown` events and sets the corresponding
 * properties on the global `keyboard` object to `false` when a key is pressed down.
 * This ensures that movement and action inputs stop when the user releases
 * the respective key.
 *
 * Key mappings:
 * - Right Arrow (39): keyboard.RIGHT
 * - Left Arrow (37): keyboard.LEFT
 * - Up Arrow (38): keyboard.UP
 * - Down Arrow (40): keyboard.DOWN
 * - Space (32): keyboard.SPACE
 * - D key (68): keyboard.D
 */
window.addEventListener('keydown', (event) => {
    if(event.keyCode == 39) keyboard.RIGHT = true;
    if(event.keyCode == 37) keyboard.LEFT = true;
    if(event.keyCode == 38) keyboard.UP = true;
    if(event.keyCode == 40) keyboard.DOWN = true;
    if(event.keyCode == 32) keyboard.SPACE = true;
    if(event.keyCode == 68) keyboard.D = true;
});

/**
 * Handles key release events to reset keyboard input states.
 *
 * This event listener listens for `keyup` events and sets the corresponding
 * properties on the global `keyboard` object to `false` when a key is released.
 * This ensures that movement and action inputs stop when the user releases
 * the respective key.
 *
 * Key mappings:
 * - Right Arrow (39): keyboard.RIGHT
 * - Left Arrow (37): keyboard.LEFT
 * - Up Arrow (38): keyboard.UP
 * - Down Arrow (40): keyboard.DOWN
 * - Space (32): keyboard.SPACE
 * - D key (68): keyboard.D
 */
window.addEventListener('keyup', (event) => {
    if(event.keyCode == 39) keyboard.RIGHT = false;
    if(event.keyCode == 37) keyboard.LEFT = false;
    if(event.keyCode == 38) keyboard.UP = false;    
    if(event.keyCode == 40) keyboard.DOWN = false;    
    if(event.keyCode == 32) keyboard.SPACE = false;    
    if(event.keyCode == 68) keyboard.D = false;    
});

/**
 * Toggles fullscreen mode for the game wrapper element.
 *
 * - If the document is not currently in fullscreen mode, the element with
 *   the ID "game-wrapper" is requested to enter fullscreen.
 * - If the document is already in fullscreen mode, fullscreen is exited.
 *
 * This allows the user to switch between fullscreen and windowed mode
 * via the fullscreen button.
 */
document.getElementById("fullscreen-btn").addEventListener("click", () => {
    const wrapper = document.getElementById("game-wrapper");

    if (!document.fullscreenElement) {
        wrapper.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

/**
 * Handles changes to the browser's fullscreen state.
 *
 * - When entering fullscreen mode, the game world is resized to match
 *   the current window dimensions.
 * - When exiting fullscreen mode, the game world is resized back to
 *   its default resolution (960x540).
 *
 * The handler safely exits if the global `world` object is not yet initialized.
 */
document.addEventListener("fullscreenchange", () => {
    if (!world) return;

    if (document.fullscreenElement) {
        world.resize(window.innerWidth, window.innerHeight);
    } else {
        world.resize(960, 540);
    }
});

document.getElementById("controls-btn").addEventListener("click", () => {
    document.getElementById("controls-screen").style.display = "flex";
});

document.getElementById("close-controls-btn").addEventListener("click", () => {
    document.getElementById("controls-screen").style.display = "none";
});

document.getElementById("info-btn").addEventListener("click", () => {
    document.getElementById("start-content").style.display = "flex";
});

document.getElementById("return-btn").addEventListener("click", () => {
    document.getElementById("start-content").style.display = "none";
});

document.getElementById("legal-btn").addEventListener("click", () => {
    document.getElementById("legal-notice").style.display = "flex";
});

document.getElementById("close-legal-btn").addEventListener("click", () => {
    document.getElementById("legal-notice").style.display = "none";
});

document.getElementById("close-impressum").addEventListener("click", () => {
    document.getElementById("impressum").style.display = "none";
});

document.getElementById("impressum-btn").addEventListener("click", () => {
    document.getElementById("impressum").style.display = "flex";
});

/**
 * Handles the pause button click event.
 *
 * - Toggles the game pause state by calling `world.togglePause()`.
 * - Updates the pause button icon to reflect the current state:
 *   - Shows the pause icon when the game is running.
 *   - Shows the play icon when the game is paused.
 *
 * Assumes an image element with the ID `pause-btn-img` exists and that
 * its `src` attribute contains either "play" or "pause" to determine
 * the current state.
 */
document.getElementById("pause-btn").addEventListener("click", () => {
    world.togglePause();
    if (document.getElementById("pause-btn-img").src.includes("play")) {
        document.getElementById("pause-btn-img").src = "./assets/pause.png";
    } else {
        document.getElementById("pause-btn-img").src = "./assets/play-buttton.png";
    }   
});

/**
 * Handles the sound button click event.
 *
 * - Toggles the global sound mute state via `world.sound.toggleMute()`.
 * - Updates the sound button icon to reflect the current sound state
 *   (volume on or muted).
 *
 * Assumes an image element with the ID `sound-btn-img` exists and that
 * its `src` attribute contains either "volume-up" or "mute" to determine
 * the current state.
 */
document.getElementById("sound-btn").addEventListener("click", () => {
    world.sound.toggleMute();
    if (document.getElementById("sound-btn-img").src.includes("volume-up")) {
        document.getElementById("sound-btn-img").src = "./assets/mute.png";
    } else {
        document.getElementById("sound-btn-img").src = "./assets/volume-up.png";
    }
});

/**
 * Handles the restart button click event.
 *
 * - Stores a flag in sessionStorage to skip the start screen after reload.
 * - Reloads the current page to restart the game immediately.
 *
 * The `skipStart` flag is read on page load to resume the game directly
 * without showing the start menu.
 */
document.getElementById("restart-btn").addEventListener("click", () => {
    sessionStorage.setItem("skipStart", "true");
    location.reload();
});

/**
 * Handles the menu button click event.
 *
 * - Reloads the current page to return to the main menu/start screen.
 * - Stops the in-game background music.
 * - Starts playing the start screen music.
 *
 * Note: Since `location.reload()` is called, subsequent code execution
 * may be interrupted depending on the browser timing.
 */
document.getElementById("menu-btn").addEventListener("click", () => {
    location.reload();
    world.sound.stop('gameMusic');
    world.sound.play('startMusic');
});

/**
 * Handles automatic game startup after a page reload when the start screen
 * should be skipped.
 *
 * - Listens for the window "load" event to ensure all resources are available.
 * - Checks the session storage flag "skipStart" to determine whether the game
 *   should start immediately.
 * - Displays mobile controls if the device is detected as mobile.
 * - Hides the start screen and initializes the game world.
 * - Resumes the game, stops the start screen music, and starts the game music.
 * - Removes the "skipStart" flag from session storage after use.
 */
window.addEventListener("load", () => {
    if (sessionStorage.getItem("skipStart") === "true") {
        if (isMobile()) {
            document.getElementById("mobile-controls").style.display = "flex";
        }
        document.getElementById("start-screen").style.display = "none";
        sessionStorage.removeItem("skipStart");
        init();
        world.resume();
        world.sound.stop('startMusic');
        world.sound.play('gameMusic');
    }
});

/**
 * Plays the start screen background music on the first user interaction.
 *
 * - Listens for the first click event on the document to comply with browser
 *   autoplay restrictions for audio.
 * - Starts the "startMusic" sound only if `musicCondition` is true and the
 *   `world.sound` object is available.
 * - The listener is executed only once and then automatically removed.
 *
 * Additionally:
 * - If the session storage flag "skipStart" is set to true, `musicCondition`
 *   is disabled to prevent the start music from playing automatically after a reload.
 */
document.addEventListener("click", () => {
    if (musicCondition && world.sound) world.sound.play('startMusic'); 
}, { once: true });

if (sessionStorage.getItem("skipStart") === "true") {
    musicCondition = false;
}

/**
 * Determines if the device is considered mobile based on viewport dimensions.
 * @returns {boolean} True if the viewport width is less than 900px or height is less than 600px, false otherwise.
 */
function isMobile() {
    return window.innerWidth < 1368 && window.innerHeight < 1025;
}

/**
 * Checks the current device orientation and displays a rotation hint if the device is in portrait mode.
 * Pauses the game world if a global `world` object exists.
 *
 * - If the device is in portrait mode (`window.innerHeight > window.innerWidth`), the element with
 *   ID "rotate-hint" is displayed and the game is paused.
 * - If the device is in landscape mode, the "rotate-hint" element is hidden.
 *
 * This function is typically called on window resize or orientation change events.
 */
function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;

    const rotateHint = document.getElementById("rotate-hint");

    if (isPortrait) {
        rotateHint.style.display = "flex";
        if (world) world.pause();
    } else {
        rotateHint.style.display = "none";
    }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

/**
 * Binds touch events to a mobile button element and updates keyboard state
 * @param {string} id - The HTML element ID of the button to bind
 * @param {string} key - The keyboard key name to update in the keyboard object
 * @returns {void}
 */
function bindMobileButton(id, key) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("touchstart", e => {
        e.preventDefault();
        keyboard[key] = true;
    });
    btn.addEventListener("touchend", e => {
        e.preventDefault();
        keyboard[key] = false;
    });
    btn.addEventListener("touchcancel", () => {
        keyboard[key] = false;
    });
}

bindMobileButton("btn-left", "LEFT");
bindMobileButton("btn-right", "RIGHT");
bindMobileButton("btn-up", "UP");
bindMobileButton("btn-down", "DOWN");
bindMobileButton("btn-attack", "D");
bindMobileButton("btn-poison", "SPACE");