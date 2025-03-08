/*
Created: Main game scene implementing core gameplay mechanics.
Includes character launch system, physics, enemies, collectibles, and level progression.
Updated: Fixed issue where player loses momentum too quickly after launch by adjusting physics properties and dramatically reducing gravity.
Further Updated: Redesigned with Super Nintendo Castlevania-style aesthetics for backgrounds, UI, and game elements.
*/

// Declare as global variable so it can be used in config.js
var GameScene = class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.isAiming = false;
        this.isLaunched = false;
        this.canLaunch = true; // Flag to ensure launch only happens once
        this.rubberBand = null;
        this.launchGuide = null;
        this.currency = 0;
        this.startX = 0;
        this.startY = 0;
        this.playerStartX = 150;
        this.playerStartY = 400;
        this.currentDistance = 0;
        this.maxDistance = 0;
        this.stompAvailable = true;
        this.stompCooldown = 3000; // milliseconds
        this.levelBounds = [2000, 4000, 6000]; // End boundaries for each level
        
        // Game state
        this.isStomping = false;
        this.canStomp = true;
    }

    create() {
        // Set up background with parallax scrolling for Castlevania feel
        this.createCastlevaniaBackground();
        
        // Set game world bounds - much larger for long flights
        this.physics.world.setBounds(0, 0, 50000, 600);
        
        // Initialize physics with extremely low gravity
        this.physics.world.gravity.y = 50; // Drastically reduced from default
        
        // Create UI elements with Castlevania style
        this.createCastlevaniaUI();
        
        // Create the wrestling ring (launch area) with gothic design
        this.ring = this.add.image(150, 450, 'ring');
        this.ring.setScale(0.5);
        
        // Create player character
        this.player = this.physics.add.sprite(this.playerStartX, this.playerStartY, 'player');
        this.player.setBounce(0.8);
        this.player.setCollideWorldBounds(false);
        this.player.setScale(0.7);
        
        // Set up launch visuals with gothic elements
        this.setupLaunchVisuals();
        
        // Setup input handlers
        this.setupInputHandlers();
        
        // Create rest of the game elements
        this.createGameElements();
        
        // Set up physics collisions
        this.setupCollisions();
        
        // Setup reset button
        this.createResetButton();
        
        // Initialize data from previous scene
        if (this.scene.settings.data) {
            this.currency = this.scene.settings.data.currency || 0;
            this.maxDistance = this.scene.settings.data.maxDistance || 0;
            this.upgrades = this.scene.settings.data.upgrades || {
                power: 1,
                bounce: 1,
                stompPower: 1,
                stompCooldown: 1
            };
            
            // Update UI
            this.currencyText.setText(`Hearts: ${this.currency}`);
            this.maxDistanceText.setText(`Best: ${Math.floor(this.maxDistance)}m`);
        }
        
        // Add gothic castlevania elements for atmosphere
        this.addCastlevaniaAtmosphere();
    }
    
    // Create Castlevania-style background with parallax layers
    createCastlevaniaBackground() {
        // Dark sky background - fixed
        this.skyBackground = this.add.image(400, 300, 'background').setScrollFactor(0);
        
        // Castle silhouette background - slow parallax
        this.castleBackground = this.add.tileSprite(400, 300, 800, 600, 'castleBackground')
            .setScrollFactor(0.1);
        
        // Distant mountains - medium parallax
        this.createScrollingMountains();
        
        // Foreground elements - faster parallax
        this.createForegroundElements();
    }
    
    // Create scrolling mountain silhouettes in background
    createScrollingMountains() {
        // Create a mountain silhouette texture programmatically
        const mountainKey = 'mountains';
        const canvas = this.textures.createCanvas(mountainKey, 800, 200);
        const ctx = canvas.getContext('2d');
        
        // Fill with transparent initially
        ctx.clearRect(0, 0, 800, 200);
        
        // Draw mountain silhouettes
        ctx.fillStyle = '#0a0612';
        ctx.beginPath();
        ctx.moveTo(0, 200);
        
        // Create jagged mountain profile
        for (let x = 0; x < 800; x += 40) {
            const height = 30 + Math.random() * 120;
            ctx.lineTo(x, 200 - height);
            ctx.lineTo(x + 20, 200 - height + 10 + Math.random() * 30);
            ctx.lineTo(x + 40, 200 - Math.random() * 40);
        }
        
        ctx.lineTo(800, 200);
        ctx.closePath();
        ctx.fill();
        
        canvas.refresh();
        
        // Create scrolling mountain sprite
        this.mountains = this.add.tileSprite(400, 500, 800, 200, mountainKey)
            .setScrollFactor(0.2);
    }
    
    // Create foreground decorative elements
    createForegroundElements() {
        // Create foreground texture
        const foregroundKey = 'foreground';
        const canvas = this.textures.createCanvas(foregroundKey, 800, 100);
        const ctx = canvas.getContext('2d');
        
        // Fill with transparent initially
        ctx.clearRect(0, 0, 800, 100);
        
        // Draw gothic fence/pillars
        ctx.fillStyle = '#000000';
        for (let x = 0; x < 800; x += 120) {
            // Draw a gothic pillar
            ctx.fillRect(x, 10, 15, 90);
            
            // Ornate top
            ctx.beginPath();
            ctx.moveTo(x, 10);
            ctx.lineTo(x + 7.5, 0);
            ctx.lineTo(x + 15, 10);
            ctx.closePath();
            ctx.fill();
            
            // Draw fence between pillars
            if (x < 700) {
                for (let fx = x + 20; fx < x + 120; fx += 20) {
                    ctx.fillRect(fx, 50, 5, 50);
                    
                    // Pointed top
                    ctx.beginPath();
                    ctx.moveTo(fx, 50);
                    ctx.lineTo(fx + 2.5, 40);
                    ctx.lineTo(fx + 5, 50);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }
        
        canvas.refresh();
        
        // Create scrolling foreground sprite
        this.foreground = this.add.tileSprite(400, 550, 800, 100, foregroundKey)
            .setScrollFactor(0.4);
    }
    
    // Setup gothic launch visuals
    setupLaunchVisuals() {
        // Create gothic-styled crossbow aiming guide
        this.rubberBand = this.add.graphics().setDepth(1);
        
        // Launch trajectory guide with Castlevania magic effect
        this.launchGuide = this.add.graphics().setDepth(1);
    }
    
    // Add atmospheric elements from Castlevania
    addCastlevaniaAtmosphere() {
        // Add some floating ghosts in the background that move slowly
        this.createBackgroundGhosts();
        
        // Add occasional lightning flash effect
        this.createLightningEffect();
        
        // Add floating candles with particle effects
        this.createFloatingCandles();
    }
    
    // Create ghostly figures that move in the background
    createBackgroundGhosts() {
        // Create ghost texture
        const ghostKey = 'ghost';
        if (!this.textures.exists(ghostKey)) {
            const canvas = this.textures.createCanvas(ghostKey, 40, 60);
            const ctx = canvas.getContext('2d');
            
            // Ghost shape
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(20, 20, 15, 0, Math.PI * 2);
            ctx.rect(5, 20, 30, 20);
            
            // Wavy bottom
            ctx.moveTo(5, 40);
            ctx.quadraticCurveTo(10, 50, 15, 40);
            ctx.quadraticCurveTo(20, 50, 25, 40);
            ctx.quadraticCurveTo(30, 50, 35, 40);
            
            ctx.fill();
            
            // Eyes
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.beginPath();
            ctx.arc(15, 20, 3, 0, Math.PI * 2);
            ctx.arc(25, 20, 3, 0, Math.PI * 2);
            ctx.fill();
            
            canvas.refresh();
        }
        
        // Add 3 ghosts at different positions
        for (let i = 0; i < 3; i++) {
            const ghost = this.add.image(
                Math.random() * 1000 + 400, 
                100 + Math.random() * 200, 
                ghostKey
            ).setAlpha(0.7).setScrollFactor(0.3);
            
            // Floating animation
            this.tweens.add({
                targets: ghost,
                y: ghost.y + 20,
                duration: 2000 + Math.random() * 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            // Slowly move ghost horizontally
            this.tweens.add({
                targets: ghost,
                x: ghost.x + 200,
                duration: 10000 + Math.random() * 5000,
                yoyo: true,
                repeat: -1,
                ease: 'Linear'
            });
        }
    }
    
    // Create lightning effect that occasionally flashes
    createLightningEffect() {
        // Create a lightning overlay
        this.lightning = this.add.rectangle(400, 300, 800, 600, 0xaaaaff, 0)
            .setScrollFactor(0)
            .setDepth(10);
        
        // Set up lightning timing
        this.time.addEvent({
            delay: 10000 + Math.random() * 20000, // Random time between flashes
            callback: this.flashLightning,
            callbackScope: this,
            loop: true
        });
    }
    
    // Flash the lightning
    flashLightning() {
        // Don't flash if we're not launched yet
        if (!this.isLaunched) return;
        
        // Create the flash sequence
        this.tweens.add({
            targets: this.lightning,
            alpha: { from: 0, to: 0.4 },
            duration: 100,
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                // Ensure lightning is hidden after flash
                this.lightning.alpha = 0;
            }
        });
    }
    
    // Create floating candles like in Castlevania
    createFloatingCandles() {
        // Create candle texture if it doesn't exist
        const candleKey = 'candle';
        if (!this.textures.exists(candleKey)) {
            const canvas = this.textures.createCanvas(candleKey, 20, 30);
            const ctx = canvas.getContext('2d');
            
            // Candle holder
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(5, 15, 10, 15);
            
            // Candle
            ctx.fillStyle = '#F0E68C';
            ctx.fillRect(7, 5, 6, 10);
            
            // Flame
            const gradient = ctx.createRadialGradient(10, 5, 0, 10, 5, 6);
            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(0.5, '#FFA500');
            gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(10, 5, 6, 0, Math.PI * 2);
            ctx.fill();
            
            canvas.refresh();
        }
        
        // Place candles at regular intervals
        for (let x = 500; x < 5000; x += 500) {
            const candle = this.add.image(x, 300, candleKey)
                .setScale(2)
                .setScrollFactor(1);
            
            // Add flickering effect
            this.tweens.add({
                targets: candle,
                alpha: { from: 0.8, to: 1 },
                scale: { from: 2, to: 2.1 },
                duration: 100 + Math.random() * 200,
                yoyo: true,
                repeat: -1
            });
            
            // Add particle emitter for sparks
            const particles = this.add.particles(candleKey);
            const emitter = particles.createEmitter({
                x: x,
                y: 290,
                speed: { min: 20, max: 50 },
                angle: { min: 230, max: 310 },
                scale: { start: 0.4, end: 0 },
                lifespan: 1000,
                quantity: 1,
                frequency: 500,
                alpha: { start: 1, end: 0 }
            });
            
            // Make emitter follow candle
            emitter.startFollow(candle);
        }
    }
    
    createCastlevaniaUI() {
        // Create a gothic frame for UI elements
        this.createGothicUIFrame();
        
        // Add UI text with Castlevania-style font
        const textStyle = {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '16px',
            fill: '#d4a400',
            stroke: '#000',
            strokeThickness: 2
        };
        
        // Distance
        this.distanceText = this.add.text(20, 20, 'Distance: 0m', textStyle).setScrollFactor(0);
        
        // Currency (Hearts in Castlevania)
        this.currencyText = this.add.text(20, 50, 'Hearts: 0', textStyle).setScrollFactor(0);
        
        // Best distance
        this.maxDistanceText = this.add.text(20, 80, 'Best: 0m', textStyle).setScrollFactor(0);
        
        // Stomp attack indicator with Castlevania sub-weapon style
        this.createStompIndicator();
    }
    
    // Create a gothic frame for UI elements
    createGothicUIFrame() {
        // Create frame texture
        const frameKey = 'uiFrame';
        if (!this.textures.exists(frameKey)) {
            const canvas = this.textures.createCanvas(frameKey, 200, 120);
            const ctx = canvas.getContext('2d');
            
            // Frame background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, 200, 120);
            
            // Ornate border
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 3;
            ctx.strokeRect(3, 3, 194, 114);
            
            // Gold inner border
            ctx.strokeStyle = '#d4a400';
            ctx.lineWidth = 1;
            ctx.strokeRect(6, 6, 188, 108);
            
            // Corner ornaments
            this.drawCornerOrnament(ctx, 3, 3, 10);
            this.drawCornerOrnament(ctx, 197, 3, 10);
            this.drawCornerOrnament(ctx, 3, 117, 10);
            this.drawCornerOrnament(ctx, 197, 117, 10);
            
            canvas.refresh();
        }
        
        // Add the frame to the UI
        this.add.image(110, 70, frameKey).setScrollFactor(0).setAlpha(0.8);
    }
    
    // Draw corner ornament for UI frame
    drawCornerOrnament(ctx, x, y, size) {
        ctx.fillStyle = '#d4a400';
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Create Castlevania sub-weapon style stomp indicator
    createStompIndicator() {
        // Create axe-like stomp icon
        const iconKey = 'stompIcon';
        if (!this.textures.exists(iconKey)) {
            const canvas = this.textures.createCanvas(iconKey, 30, 30);
            const ctx = canvas.getContext('2d');
            
            // Axe shape (like Castlevania axe sub-weapon)
            ctx.fillStyle = '#d4a400';
            ctx.beginPath();
            ctx.arc(15, 15, 10, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.moveTo(15, 5);
            ctx.lineTo(8, 15);
            ctx.lineTo(22, 15);
            ctx.closePath();
            ctx.fill();
            
            canvas.refresh();
        }
        
        // Add the icon to the UI
        this.stompIcon = this.add.image(170, 40, iconKey).setScrollFactor(0);
        
        // Add cooldown overlay
        this.stompCooldownOverlay = this.add.graphics().setScrollFactor(0);
        this.updateStompIndicator(true);
    }
    
    // Update the stomp indicator based on availability
    updateStompIndicator(available) {
        this.stompCooldownOverlay.clear();
        
        if (!available) {
            // Show cooldown with a red overlay
            this.stompCooldownOverlay.fillStyle(0xff0000, 0.5);
            this.stompCooldownOverlay.fillRect(155, 25, 30, 30);
            this.stompIcon.setAlpha(0.5);
        } else {
            this.stompIcon.setAlpha(1);
        }
    }
    
    // Create reset button with Castlevania style
    createResetButton() {
        // Create a gothic-styled button
        const resetButtonBackground = this.add.image(700, 40, 'button')
            .setDisplaySize(160, 40)
            .setScrollFactor(0)
            .setInteractive({ useHandCursor: true });
        
        const resetText = this.add.text(700, 40, 'RETURN', {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '18px',
            fill: '#d4a400'
        }).setOrigin(0.5).setScrollFactor(0);
        
        // Button hover effect
        resetButtonBackground.on('pointerover', () => {
            resetButtonBackground.setTint(0x777777);
            resetText.setTint(0xffdd77);
        });
        
        resetButtonBackground.on('pointerout', () => {
            resetButtonBackground.clearTint();
            resetText.clearTint();
        });
        
        resetButtonBackground.on('pointerdown', () => {
            this.resetGame();
        });
    }
    
    resetGame() {
        // Store current currency for persistence (optional)
        gameData.currency += this.currency;
        
        // Add a visual feedback that reset is happening
        const resetText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'RESETTING...', {
            fontSize: '48px',
            fontStyle: 'bold',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setScrollFactor(0);
        
        // Brief pause for visual feedback before resetting
        this.time.delayedCall(300, () => {
            // Stop all physics
            this.physics.pause();
            
            // Completely restart the scene - this is the most reliable way to reset everything
            this.scene.restart();
        });
    }
    
    update() {
        if (this.isLaunched) {
            // Update distance traveled
            this.currentDistance = Math.floor(this.player.x / 10);
            this.distanceText.setText(`Distance: ${this.currentDistance}m`);
            
            // Update max distance if current distance is greater
            if (this.currentDistance > this.maxDistance) {
                this.maxDistance = this.currentDistance;
            }
            
            // Maintain horizontal momentum by applying tiny boost
            if (this.player.body.velocity.x > 0 && this.player.body.velocity.x < 500) {
                // Apply a small constant force to keep player moving
                this.player.body.velocity.x *= 1.005;
            }
            
            // Apply gentle upward force if player is falling to extend flight
            if (this.player.body.velocity.y > 50) {
                // Apply a small counterforce to reduce falling speed
                this.player.body.velocity.y *= 0.95;
            }
            
            // Check if player has stopped moving
            if (Math.abs(this.player.body.velocity.x) < 5 && this.player.body.touching.down) {
                this.endRun();
            }
            
            // Apply very minimal drag while in air to maintain momentum longer
            if (!this.player.body.touching.down) {
                // Make sure velocity doesn't slow down too much
                this.player.body.velocity.x *= 0.9998; // Almost no air resistance
                
                // Add some debug visuals to see velocity
                if (this.debugText) {
                    this.debugText.destroy();
                }
                this.debugText = this.add.text(10, 130, 
                    `Velocity: ${Math.round(this.player.body.velocity.x)}, ${Math.round(this.player.body.velocity.y)}`, 
                    { fontSize: '16px', fill: '#fff' }).setScrollFactor(0);
            }
            
            // Update stomp button text based on availability
            if (this.stompAvailable) {
                this.stompText.setText('Stomp: READY');
                this.stompText.setFill('#00ff00');
            } else {
                this.stompText.setText('Stomp: COOLDOWN');
                this.stompText.setFill('#ff0000');
            }
            
            // Update camera to follow player - keep player in left third of screen
            this.cameras.main.scrollX = this.player.x - 200;
        }
    }
    
    setupInputHandlers() {
        this.input.on('pointerdown', (pointer) => {
            if (!this.isLaunched && this.canLaunch) {
                // Only allow aiming if pointer is near player
                const distance = Phaser.Math.Distance.Between(
                    pointer.x, pointer.y,
                    this.player.x, this.player.y
                );
                
                if (distance < 100) {
                    this.isAiming = true;
                    this.startX = this.player.x;
                    this.startY = this.player.y;
                    
                    // Show visual cue that aiming has started
                    this.player.setTint(0xffff00);
                }
            } else if (this.isLaunched && this.stompAvailable) {
                this.activateStomp();
            }
        });
        
        this.input.on('pointermove', (pointer) => {
            if (this.isAiming) {
                // Update the aim visuals
                this.updateAimVisuals(pointer);
                
                // Move the player slightly in the pulling direction to show elasticity
                const pullX = this.startX - (pointer.x - this.startX) * 0.1;
                const pullY = this.startY - (pointer.y - this.startY) * 0.1;
                
                // Limit how far the player can be pulled from starting position
                const maxPullDistance = 50;
                const currentPullDistance = Phaser.Math.Distance.Between(
                    this.startX, this.startY, pullX, pullY
                );
                
                if (currentPullDistance > maxPullDistance) {
                    const angle = Phaser.Math.Angle.Between(
                        this.startX, this.startY, pullX, pullY
                    );
                    const limitedX = this.startX + Math.cos(angle) * maxPullDistance;
                    const limitedY = this.startY + Math.sin(angle) * maxPullDistance;
                    this.player.x = limitedX;
                    this.player.y = limitedY;
                } else {
                    this.player.x = pullX;
                    this.player.y = pullY;
                }
            }
        });
        
        this.input.on('pointerup', (pointer) => {
            if (this.isAiming && this.canLaunch) {
                this.launchPlayer(pointer);
                
                // Clear any tint
                this.player.clearTint();
                
                // Ensure we can only launch once per game session
                this.canLaunch = false;
            }
        });
    }
    
    createGameElements() {
        // Create collectible gummies
        this.gummies = this.physics.add.group();
        this.spawnGummies();
        
        // Create enemies
        this.enemies = this.physics.add.group();
        this.spawnEnemies();
        
        // Create level end doors
        this.doors = this.physics.add.staticGroup();
        this.spawnDoors();
    }
    
    setupCollisions() {
        // Collision with gummies
        this.physics.add.overlap(this.player, this.gummies, this.collectGummy, null, this);
        
        // Collision with enemies
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
        
        // Collision with doors
        this.physics.add.collider(this.player, this.doors, this.hitDoor, null, this);
    }
    
    updateAimVisuals(pointer) {
        if (!this.isAiming || this.isLaunched) return;
        
        // Calculate launch vector
        const dx = this.playerStartX - pointer.x;
        const dy = this.playerStartY - pointer.y;
        
        // Clear previous graphics
        this.rubberBand.clear();
        this.launchGuide.clear();
        
        // Don't draw if pointer is too close to start point
        if (dx * dx + dy * dy < 100) return;
        
        // Draw the pull-back string (like a gothic crossbow)
        this.rubberBand.lineStyle(3, 0xd4a400, 0.8);
        this.rubberBand.beginPath();
        this.rubberBand.moveTo(this.playerStartX, this.playerStartY);
        this.rubberBand.lineTo(pointer.x, pointer.y);
        this.rubberBand.closePath();
        this.rubberBand.strokePath();
        
        // Draw mystic energy at the player position
        this.rubberBand.fillStyle(0x6bcaff, 0.6);
        this.rubberBand.fillCircle(this.playerStartX, this.playerStartY, 12);
        
        // Draw launch power indicator
        const power = Math.min(Math.sqrt(dx * dx + dy * dy) / 100, 1);
        const colorHex = this.getPowerColor(power);
        
        // Draw trajectory guide points with Castlevania magic style
        this.launchGuide.fillStyle(colorHex, 0.7);
        
        // Add magic runes around the player for power indicator
        const numRunes = Math.floor(power * 5) + 1;
        for (let i = 0; i < numRunes; i++) {
            const angle = (i / numRunes) * Math.PI * 2;
            const runeX = this.playerStartX + Math.cos(angle) * 30;
            const runeY = this.playerStartY + Math.sin(angle) * 30;
            
            this.launchGuide.fillCircle(runeX, runeY, 5);
        }
        
        // Show approximate trajectory with magic trail
        const vx = dx * 0.2 * power;
        const vy = dy * 0.2 * power;
        let simX = this.playerStartX;
        let simY = this.playerStartY;
        let simVX = vx;
        let simVY = vy;
        
        for (let i = 0; i < 10; i++) {
            simX += simVX * 0.5;
            simY += simVY * 0.5;
            simVY += this.physics.world.gravity.y * 0.01;
            
            // Make the prediction dots get smaller and more transparent
            const alpha = 1 - (i / 10);
            const size = 6 - (i * 0.4);
            this.launchGuide.fillStyle(colorHex, alpha * 0.7);
            this.launchGuide.fillCircle(simX, simY, size);
        }
    }
    
    // Get power-based color (red for high power, blue for low)
    getPowerColor(power) {
        if (power < 0.3) return 0x6bcaff; // Light blue (low power)
        if (power < 0.6) return 0xd4a400; // Gold (medium power)
        return 0xff5555;                 // Red (high power)
    }
    
    launchPlayer(pointer) {
        // Calculate launch velocity based on drag distance and angle
        const dx = this.player.x - pointer.x;
        const dy = this.player.y - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        console.log(`Launch distance: ${distance}, dx: ${dx}, dy: ${dy}`);
        
        // Apply power scaling with much more power
        const powerScale = 15; // Dramatically increased for much longer flights
        const minPower = 1000; // Much higher minimum power
        const maxPower = 4000; // Much higher maximum power
        
        // Calculate final power based on distance and upgrades
        const basePower = Math.max(minPower, Math.min(distance * powerScale, maxPower));
        const finalPower = basePower * (gameData.upgrades.power || 1);
        
        console.log(`Launch power: base=${basePower}, final=${finalPower}`);
        
        // Set launch flags BEFORE applying velocity
        this.isAiming = false;
        this.isLaunched = true;
        
        // Clear the visuals
        this.rubberBand.clear();
        this.launchGuide.clear();
        if (this.powerText) {
            this.powerText.destroy();
            this.powerText = null;
        }
        
        // IMPORTANT: Don't reset player position! Let it launch from current position
        // Apply velocity to player using angle for more accurate direction
        const angle = Math.atan2(dy, dx);
        this.player.body.velocity.x = Math.cos(angle) * finalPower;
        this.player.body.velocity.y = Math.sin(angle) * finalPower;
        
        // Apply float effect by counteracting gravity
        this.player.body.setGravityY(-40); // Counter some of the world gravity
        
        // Critical: Set extremely low drag
        this.player.body.setDamping(true);
        this.player.body.setDrag(0.0001, 0.0001); // Nearly zero drag
        
        // Apply a bit of upward force to help maintain height
        if (this.player.body.velocity.y > 0) {
            this.player.body.velocity.y *= 0.7; // Reduce downward velocity
        }
        
        console.log(`Velocity applied: vx=${this.player.body.velocity.x}, vy=${this.player.body.velocity.y}`);
        
        // Reduce world gravity to almost nothing for much longer flight
        this.physics.world.gravity.y = 20; // Extremely light gravity for very long flights
        
        // Play launch sound with volume based on power
        const volume = Math.min(1, finalPower / maxPower);
        this.sound.play('launch', { volume: volume });
        
        // Make player rotate while flying
        this.tweens.add({
            targets: this.player,
            angle: 360,
            duration: 1000,
            repeat: -1
        });
        
        // Add particle effect for launch
        const particles = this.add.particles('particle');
        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            lifespan: 1500
        });
        
        emitter.startFollow(this.player);
        
        // Auto-destroy particles after launch
        this.time.delayedCall(2000, () => {
            particles.destroy();
        });
        
        // Add launch message
        const launchText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'LAUNCH!', {
            fontSize: '48px',
            fontStyle: 'bold',
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setScrollFactor(0);
        
        // Animate and remove launch text
        this.tweens.add({
            targets: launchText,
            alpha: 0,
            y: this.cameras.main.centerY - 200,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                launchText.destroy();
            }
        });
        
        // Debug info to console to track what's happening
        console.log("Player launched with velocity:", this.player.body.velocity.x, this.player.body.velocity.y);
        
        // Ensure we can only launch once per game session
        this.canLaunch = false;
    }
    
    activateStomp() {
        // Activate stomp ability
        this.stompAvailable = false;
        
        // Apply downward force based on stomp power upgrade
        const stompPower = 1200 * gameData.upgrades.stompPower;
        this.player.setVelocityY(stompPower);
        this.player.setVelocityX(this.player.body.velocity.x * 1.2);
        
        // Play stomp sound
        this.sound.play('bounce');
        
        // Add visual effect for stomp
        const stompEffect = this.add.particles('particle');
        const emitter = stompEffect.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            lifespan: 500
        });
        
        emitter.startFollow(this.player);
        
        // Set cooldown timer based on cooldown upgrade
        const adjustedCooldown = this.stompCooldown / gameData.upgrades.stompCooldown;
        this.time.delayedCall(adjustedCooldown, () => {
            this.stompAvailable = true;
        });
        
        // Auto-destroy particles after animation completes
        this.time.delayedCall(500, () => {
            stompEffect.destroy();
        });
    }
    
    spawnEnemies() {
        // Spawn different types of enemies throughout the level
        for (let i = 0; i < 100; i++) {
            const x = Phaser.Math.Between(500, 9500);
            const y = Phaser.Math.Between(100, 500);
            
            // Random enemy type (normal, bouncy, special)
            const type = Phaser.Math.Between(1, 10);
            let enemy;
            
            if (type <= 7) {
                // Regular gummy bear
                enemy = this.enemies.create(x, y, 'enemyRegular');
                enemy.type = 'regular';
                enemy.value = 5;
            } else if (type <= 9) {
                // Bouncy gummy bear
                enemy = this.enemies.create(x, y, 'enemyBouncy');
                enemy.type = 'bouncy';
                enemy.value = 10;
                enemy.setBounce(1.2); // Extra bouncy
            } else {
                // Special power-up gummy bear
                enemy = this.enemies.create(x, y, 'enemySpecial');
                enemy.type = 'special';
                enemy.value = 25;
            }
            
            enemy.setScale(0.6);
            enemy.setBounce(0.5);
            enemy.setCollideWorldBounds(false);
            enemy.body.setAllowGravity(false);
        }
    }
    
    spawnGummies() {
        // Spawn collectible gummies throughout the level
        for (let i = 0; i < 200; i++) {
            const x = Phaser.Math.Between(500, 9500);
            const y = Phaser.Math.Between(100, 550);
            
            const gummy = this.gummies.create(x, y, 'gummy');
            gummy.setScale(0.4);
            gummy.body.setAllowGravity(false);
        }
    }
    
    spawnDoors() {
        // Add doors at the end of each level
        for (let i = 0; i < this.levelBounds.length; i++) {
            const door = this.doors.create(this.levelBounds[i], 300, 'door');
            door.setScale(1.5);
            door.refreshBody();
            door.level = i + 1;
        }
    }
    
    collectGummy(player, gummy) {
        // Handle gummy collection
        gummy.disableBody(true, true);
        this.currency += 1;
        gameData.currency += 1;
        this.currencyText.setText(`Hearts: ${this.currency}`);
        
        // Add visual/audio feedback
        this.sound.play('collect');
        
        // Create a small animation for collection
        this.tweens.add({
            targets: this.currencyText,
            scale: 1.2,
            duration: 100,
            yoyo: true
        });
    }
    
    hitEnemy(player, enemy) {
        // Handle collision with enemies
        if (enemy.active) {
            enemy.disableBody(true, true);
            
            // Give currency based on enemy type
            this.currency += enemy.value;
            gameData.currency += enemy.value;
            this.currencyText.setText(`Hearts: ${this.currency}`);
            
            // Add visual/audio feedback
            this.sound.play('squish');
            
            // Apply bounce effect based on player velocity and upgrades
            if (player.body.velocity.y > 0) {
                // Player is moving downward, give a bounce boost
                player.setVelocityY(-player.body.velocity.y * 0.8 * gameData.upgrades.bounce);
            }
            
            if (enemy.type === 'bouncy') {
                // Ensure horizontal velocity is positive, but no boost
                player.setVelocityX(Math.abs(player.body.velocity.x));
            } else if (enemy.type === 'special') {
                // Special enemies trigger power-ups
                this.activatePowerUp();
            }
            
            // Create particles for squished enemy
            const particles = this.add.particles('particle');
            const emitter = particles.createEmitter({
                x: enemy.x,
                y: enemy.y,
                speed: { min: 50, max: 100 },
                scale: { start: 0.6, end: 0 },
                lifespan: 1000,
                blendMode: 'ADD'
            });
            
            // Auto-destroy particles after animation completes
            this.time.delayedCall(1000, () => {
                particles.destroy();
            });
        }
    }
    
    hitDoor(player, door) {
        // Handle collision with level end doors
        if (gameData.level === door.level) {
            // Unlock next level if current level is completed
            gameData.level++;
            
            // Save game data
            saveGameData();
            
            // Transition to shop scene
            this.scene.start('ShopScene');
        } else if (gameData.level > door.level) {
            // If player already unlocked this level, just break through
            door.disableBody(true, true);
            
            // Add visual effect for breaking door
            const particles = this.add.particles('particle');
            const emitter = particles.createEmitter({
                x: door.x,
                y: door.y,
                speed: { min: 100, max: 200 },
                scale: { start: 0.8, end: 0 },
                lifespan: 1500,
                blendMode: 'ADD'
            });
            
            // Auto-destroy particles after animation completes
            this.time.delayedCall(1500, () => {
                particles.destroy();
            });
        } else {
            // Player hasn't unlocked this level yet, bounce back
            player.setVelocityX(-player.body.velocity.x * 0.5);
            
            // Show message that level is locked
            const lockText = this.add.text(door.x, door.y - 50, 'LEVEL LOCKED', {
                fontSize: '24px',
                fill: '#ff0000',
                stroke: '#000',
                strokeThickness: 4
            }).setOrigin(0.5);
            
            // Fade out the text
            this.tweens.add({
                targets: lockText,
                alpha: 0,
                y: door.y - 100,
                duration: 2000,
                onComplete: () => {
                    lockText.destroy();
                }
            });
        }
    }
    
    activatePowerUp() {
        // Randomly choose a power-up effect
        const powerType = Phaser.Math.Between(1, 3);
        
        // Create power-up text
        let powerUpText;
        
        switch (powerType) {
            case 1:
                // Speed boost
                this.player.setVelocityX(this.player.body.velocity.x * 1.5);
                powerUpText = 'SPEED BOOST!';
                break;
            case 2:
                // Super bounce
                this.player.setVelocityY(-800);
                powerUpText = 'SUPER BOUNCE!';
                break;
            case 3:
                // Temporary invincibility and magnet effect
                this.player.setTint(0xffff00); // Yellow tint
                powerUpText = 'GUMMY MAGNET!';
                
                // Collect nearby gummies automatically
                this.time.addEvent({
                    delay: 100,
                    callback: this.magnetEffect,
                    callbackScope: this,
                    repeat: 30 // 3 seconds of magnet effect
                });
                
                // Remove tint after effect ends
                this.time.delayedCall(3000, () => {
                    this.player.clearTint();
                });
                break;
        }
        
        // Display power-up text
        const text = this.add.text(this.player.x, this.player.y - 50, powerUpText, {
            fontSize: '28px',
            fill: '#ffff00',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        // Animate and remove the text
        this.tweens.add({
            targets: text,
            y: text.y - 100,
            alpha: 0,
            duration: 2000,
            onComplete: () => {
                text.destroy();
            }
        });
    }
    
    magnetEffect() {
        // Find nearby gummies and pull them towards player
        this.gummies.getChildren().forEach(gummy => {
            const distance = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                gummy.x, gummy.y
            );
            
            if (distance < 200) {
                // Move gummy towards player
                const angle = Phaser.Math.Angle.Between(
                    gummy.x, gummy.y,
                    this.player.x, this.player.y
                );
                
                const speed = 10;
                gummy.x += Math.cos(angle) * speed;
                gummy.y += Math.sin(angle) * speed;
            }
        });
    }
    
    endRun() {
        // End the current run and transition to shop
        this.isLaunched = false;
        gameData.maxDistance = Math.max(gameData.maxDistance, this.maxDistance);
        
        // Save game data
        saveGameData();
        
        // Show end run message
        const endText = this.add.text(
            this.cameras.main.scrollX + 400, 
            300, 
            'RUN COMPLETE!\nDistance: ' + this.maxDistance + 'm\nHearts: ' + this.currency,
            { 
                fontSize: '32px', 
                fill: '#fff', 
                align: 'center',
                stroke: '#000',
                strokeThickness: 4
            }
        ).setOrigin(0.5);
        
        // Transition to shop after delay
        this.time.delayedCall(3000, () => {
            this.scene.start('ShopScene');
        });
    }
} 