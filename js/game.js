/*
 * Created: Main game initialization file.
 * Updated: Added error handling and asset loading recovery.
 * This file initializes the game instance and sets up global variables.
 * Updated: [2025-03-11 00:53] - Added to GitHub repository
 */

// Initialize game data
var gameData = {
    currency: 0,
    maxDistance: 0,
    level: 1,
    upgrades: {
        power: 1,
        bounce: 1,
        stompPower: 1,
        stompCooldown: 1
    }
};

// Game instance variable
var game;

// Add event listeners for helpful error messages
window.addEventListener('error', function(e) {
    console.error('Game error: ', e.message);
    // Display user-friendly error
    if (document.getElementById('game-container')) {
        const errorDiv = document.createElement('div');
        errorDiv.style.position = 'absolute';
        errorDiv.style.top = '10px';
        errorDiv.style.left = '10px';
        errorDiv.style.color = 'white';
        errorDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        errorDiv.style.padding = '10px';
        errorDiv.style.borderRadius = '5px';
        errorDiv.innerHTML = 'Game error - check console for details';
        document.getElementById('game-container').appendChild(errorDiv);
    }
    return false;
});

// Error handling for asset loading
const handleMissingAsset = (gameInstance) => {
    gameInstance.textures.on('onerror', function(key) {
        console.warn('Could not load texture with key: ' + key);
    });
};

// Load previously saved data if available
if (localStorage.getItem('luchadorLaunchData')) {
    try {
        const savedData = JSON.parse(localStorage.getItem('luchadorLaunchData'));
        gameData = savedData;
    } catch (e) {
        console.error('Error loading saved data', e);
        localStorage.removeItem('luchadorLaunchData');
    }
}

// Initialize the game
game = new Phaser.Game(config);

// Configure error handling
handleMissingAsset(game);

// Add debug info
console.log('Game initialized with config:', config);
console.log('Current game data:', gameData);

// Save game data function
function saveGameData() {
    try {
        localStorage.setItem('luchadorLaunchData', JSON.stringify(gameData));
        console.log('Game data saved:', gameData);
    } catch (e) {
        console.error('Failed to save game data:', e);
    }
}