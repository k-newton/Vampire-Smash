/*
 * Created: Player entity class for the luchador character.
 * Updated: Added global variable to ensure the class is accessible to other scripts.
 * Handles player state, movement, and abilities.
 * Updated: [2025-03-11 00:54] - Added to GitHub repository
 */

// Declare as global variable
var Player = class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        
        // Add player to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Set up physics properties
        this.setBounce(0.8);
        this.setCollideWorldBounds(false);
        this.setScale(0.7);
        
        // Player state
        this.isLaunched = false;
        this.stompAvailable = true;
        this.stompCooldown = 3000;
        
        // Apply upgrades
        this.applyUpgrades();
    }
    
    applyUpgrades() {
        // Apply bounce upgrade
        this.setBounce(0.8 + (0.05 * (gameData.upgrades.bounce - 1)));
        
        // Adjusted stomp cooldown
        this.stompCooldown = 3000 / gameData.upgrades.stompCooldown;
    }
    
    launch(velocityX, velocityY) {
        this.isLaunched = true;
        
        // Apply launch power upgrade
        const powerMultiplier = 1 + (0.2 * (gameData.upgrades.power - 1));
        this.setVelocity(
            velocityX * powerMultiplier,
            velocityY * powerMultiplier
        );
        
        // Make player rotate while flying
        this.scene.tweens.add({
            targets: this,
            angle: 360,
            duration: 1000,
            repeat: -1
        });
        
        return this;
    }
    
    stomp() {
        if (this.stompAvailable && this.isLaunched) {
            this.stompAvailable = false;
            
            // Apply stomp power upgrade
            const stompPower = 1200 * gameData.upgrades.stompPower;
            this.setVelocityY(stompPower);
            this.setVelocityX(this.body.velocity.x * 1.2);
            
            // Start cooldown timer
            this.scene.time.delayedCall(this.stompCooldown, () => {
                this.stompAvailable = true;
            });
            
            return true;
        }
        
        return false;
    }
    
    update() {
        // Apply drag while in air
        if (this.isLaunched && !this.body.touching.down) {
            this.body.velocity.x *= 0.99;
        }
    }
}