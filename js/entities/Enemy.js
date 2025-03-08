/*
 * Created: Enemy entity class for various enemy types.
 * Updated: Added global variable to ensure the class is accessible to other scripts.
 * Manages enemy behavior, interactions, and collisions.
 * Updated: [2025-03-11 00:55] - Added to GitHub repository
 */

// Declare as global variable
var Enemy = class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        let texture;
        
        // Determine enemy type and properties
        switch (type) {
            case 'regular':
                texture = 'enemyRegular';
                this.value = 5;
                this.bounceMultiplier = 0.8;
                break;
            case 'bouncy':
                texture = 'enemyBouncy';
                this.value = 10;
                this.bounceMultiplier = 1.2;
                break;
            case 'special':
                texture = 'enemySpecial';
                this.value = 25;
                this.bounceMultiplier = 1.0;
                this.hasPowerUp = true;
                break;
            default:
                texture = 'enemyRegular';
                this.value = 5;
                this.bounceMultiplier = 0.8;
                break;
        }
        
        super(scene, x, y, texture);
        
        // Add enemy to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Set up physics properties
        this.setBounce(0.5);
        this.setCollideWorldBounds(false);
        this.setScale(0.6);
        this.body.setAllowGravity(false);
        
        // Store enemy type
        this.enemyType = type;
        
        // Add simple animation for some enemy types
        if (this.enemyType === 'bouncy' || this.enemyType === 'special') {
            this.scene.tweens.add({
                targets: this,
                y: this.y + 20,
                duration: 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }
    
    squish(playerVelocity) {
        // Create particle effect
        const particles = this.scene.add.particles('particle');
        const emitter = particles.createEmitter({
            x: this.x,
            y: this.y,
            speed: { min: 50, max: 100 },
            scale: { start: 0.6, end: 0 },
            lifespan: 1000,
            blendMode: 'ADD'
        });
        
        // Play squish sound
        this.scene.sound.play('squish');
        
        // Cleanup particles after animation
        this.scene.time.delayedCall(1000, () => {
            particles.destroy();
        });
        
        // Calculate bounce effect
        let bounceVelocity = { x: 0, y: 0 };
        
        if (playerVelocity.y > 0) {
            // Player is moving downward, calculate upward bounce
            bounceVelocity.y = -playerVelocity.y * this.bounceMultiplier;
            
            // Just maintain the existing horizontal velocity (no boosting)
            // Ensure it's positive (forward movement only)
            bounceVelocity.x = Math.abs(playerVelocity.x);
        } else {
            // Player is moving upward or horizontal, maintain velocity
            // But ensure x velocity remains positive - no backward movement
            bounceVelocity.x = Math.abs(playerVelocity.x);
            bounceVelocity.y = playerVelocity.y;
        }
        
        // Disable enemy
        this.disableBody(true, true);
        
        // Return values for player feedback
        return {
            value: this.value,
            bounce: bounceVelocity,
            hasPowerUp: this.hasPowerUp || false
        };
    }
}