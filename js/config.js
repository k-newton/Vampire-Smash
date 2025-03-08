/*
 * Created: Initial config file with scene configuration.
 * Updated: Removed PreloadScene to fix loading issues.
 * Updated: [2025-03-11 00:52] - Added to GitHub repository
 */

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: false
        }
    },
    scene: [
        MenuScene,
        GameScene,
        ShopScene
    ]
};