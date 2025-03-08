/*
Created: Menu scene with game title, start button, and basic instructions.
Updated: Added asset creation functionality since PreloadScene was removed.
This is now the first scene that loads and creates all game assets.
Further Updated: Redesigned with Super Nintendo Castlevania-style aesthetics for menus, buttons, and game elements.
Further Updated: Changed game title to "Vampire Smash" and adjusted home screen elements.
Further Updated: Redesigned main menu to match Castlevania Symphony of the Night aesthetic with title logo and instruction button.
*/

// Declare as global variable so it can be used in config.js
var MenuScene = class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    
    preload() {
        console.log('MenuScene preload - Creating assets directly');
        this.createCastlevaniaTextures();
    }
    
    createCastlevaniaTextures() {
        console.log('Creating Castlevania-style textures...');
        
        // Create Castlevania-inspired dark gradient background
        this.createGradientTexture('background', 800, 600, ['#000000', '#110011', '#000000']);
        
        // Create moonlit castle background
        this.createCastleBackground('castleBackground', 800, 600);
        
        // Create character (Luchador with Castlevania-inspired design)
        this.createCharacterTexture('player', 70, 70);
        
        // Create gothic wrestling ring
        this.createRingTexture('ring', 200, 200);
        
        // Create gothic-styled ground
        this.createGroundTexture('ground', 800, 40);
        
        // Create enemy textures with Castlevania-inspired monster designs
        this.createEnemyTexture('enemyRegular', 50, 50, '#b93f27'); // Zombie-like
        this.createEnemyTexture('enemyBouncy', 50, 50, '#7a511a'); // Bat-like
        this.createEnemyTexture('enemySpecial', 50, 50, '#6b226e'); // Medusa-like
        
        // Create gothic UI elements
        this.createGothicButton('button', 200, 60);
        
        // Create currency item (hearts/coins in Castlevania style)
        this.createHeartTexture('gummy', 20, '#f1c40f');
        
        // Create door (Castlevania-style ornate door)
        this.createDoorTexture('door', 100, 150);
        
        // Create particle effects
        this.createCastlevaniaParticle('particle', 8);
        
        // Create shop background (ornate gothic interior)
        this.createGothicPatternTexture('shopBackground', 800, 600);
    }
    
    // Create a gothic Castlevania-style background with moon and castle silhouette
    createCastleBackground(key, width, height) {
        const canvas = this.textures.createCanvas(key, width, height);
        const context = canvas.getContext('2d');
        
        // Dark night sky gradient
        const skyGradient = context.createLinearGradient(0, 0, 0, height);
        skyGradient.addColorStop(0, '#0c0028');
        skyGradient.addColorStop(0.7, '#20144a');
        skyGradient.addColorStop(1, '#3a1e5e');
        
        context.fillStyle = skyGradient;
        context.fillRect(0, 0, width, height);
        
        // Draw moon
        context.beginPath();
        context.arc(width * 0.8, height * 0.2, 40, 0, Math.PI * 2);
        context.fillStyle = '#f1e4b3';
        context.fill();
        
        // Create slight glow around moon
        const moonGlow = context.createRadialGradient(
            width * 0.8, height * 0.2, 40,
            width * 0.8, height * 0.2, 60
        );
        moonGlow.addColorStop(0, 'rgba(241, 228, 179, 0.3)');
        moonGlow.addColorStop(1, 'rgba(241, 228, 179, 0)');
        
        context.beginPath();
        context.arc(width * 0.8, height * 0.2, 60, 0, Math.PI * 2);
        context.fillStyle = moonGlow;
        context.fill();
        
        // Draw distant mountains
        context.beginPath();
        context.moveTo(0, height * 0.7);
        for (let x = 0; x < width; x += 50) {
            context.lineTo(x + 25, height * 0.7 - Math.random() * 60 - 20);
            context.lineTo(x + 50, height * 0.7);
        }
        context.lineTo(width, height);
        context.lineTo(0, height);
        context.closePath();
        context.fillStyle = '#0e0720';
        context.fill();
        
        // Draw castle silhouette
        this.drawCastleSilhouette(context, width / 2 - 150, height * 0.55, 300, 200);
        
        canvas.refresh();
    }
    
    // Draw a castle silhouette reminiscent of Castlevania
    drawCastleSilhouette(context, x, y, width, height) {
        context.fillStyle = '#000000';
        
        // Main castle body
        context.beginPath();
        context.rect(x + width * 0.2, y + height * 0.3, width * 0.6, height * 0.7);
        context.fill();
        
        // Left tower
        context.beginPath();
        context.rect(x, y + height * 0.5, width * 0.2, height * 0.5);
        context.fill();
        
        // Right tower
        context.beginPath();
        context.rect(x + width * 0.8, y + height * 0.5, width * 0.2, height * 0.5);
        context.fill();
        
        // Center tower
        context.beginPath();
        context.rect(x + width * 0.4, y, width * 0.2, height * 0.7);
        context.fill();
        
        // Tower tops - left
        context.beginPath();
        context.moveTo(x, y + height * 0.5);
        context.lineTo(x, y + height * 0.4);
        context.lineTo(x + width * 0.05, y + height * 0.35);
        context.lineTo(x + width * 0.1, y + height * 0.4);
        context.lineTo(x + width * 0.15, y + height * 0.35);
        context.lineTo(x + width * 0.2, y + height * 0.4);
        context.lineTo(x + width * 0.2, y + height * 0.5);
        context.fill();
        
        // Tower tops - center
        context.beginPath();
        context.moveTo(x + width * 0.4, y);
        context.lineTo(x + width * 0.4, y - height * 0.1);
        context.lineTo(x + width * 0.45, y - height * 0.15);
        context.lineTo(x + width * 0.5, y - height * 0.1);
        context.lineTo(x + width * 0.55, y - height * 0.15);
        context.lineTo(x + width * 0.6, y - height * 0.1);
        context.lineTo(x + width * 0.6, y);
        context.fill();
        
        // Tower tops - right
        context.beginPath();
        context.moveTo(x + width * 0.8, y + height * 0.5);
        context.lineTo(x + width * 0.8, y + height * 0.4);
        context.lineTo(x + width * 0.85, y + height * 0.35);
        context.lineTo(x + width * 0.9, y + height * 0.4);
        context.lineTo(x + width * 0.95, y + height * 0.35);
        context.lineTo(x + width, y + height * 0.4);
        context.lineTo(x + width, y + height * 0.5);
        context.fill();
    }
    
    // Create a character texture with Castlevania-inspired design
    createCharacterTexture(key, width, height) {
        const canvas = this.textures.createCanvas(key, width, height);
        const context = canvas.getContext('2d');
        
        // Clear background
        context.clearRect(0, 0, width, height);
        
        // Draw character body (luchador with vampire hunter elements)
        context.fillStyle = '#4a2700'; // Dark brown for leather outfit
        context.fillRect(width * 0.2, height * 0.2, width * 0.6, height * 0.6);
        
        // Draw cape
        context.beginPath();
        context.moveTo(width * 0.2, height * 0.3);
        context.lineTo(width * 0.1, height * 0.6);
        context.lineTo(width * 0.2, height * 0.8);
        context.closePath();
        context.fillStyle = '#6b0000'; // Dark red cape
        context.fill();
        
        // Draw mask/face
        context.fillStyle = '#2f2f8a'; // Blue mask
        context.fillRect(width * 0.25, height * 0.2, width * 0.5, height * 0.25);
        
        // Draw belt
        context.fillStyle = '#d4a400'; // Gold belt
        context.fillRect(width * 0.2, height * 0.5, width * 0.6, height * 0.1);
        
        canvas.refresh();
    }
    
    // Create a gothic wrestling ring
    createRingTexture(key, width, height) {
        const canvas = this.textures.createCanvas(key, width, height);
        const context = canvas.getContext('2d');
        
        // Ring platform
        context.fillStyle = '#2a0d0d'; // Dark red-brown for the ring
        context.fillRect(width * 0.1, height * 0.6, width * 0.8, height * 0.2);
        
        // Ring ropes (ornate gothic style)
        context.strokeStyle = '#d4a400'; // Gold ropes
        context.lineWidth = 3;
        
        // Posts
        context.fillStyle = '#3d1c1c';
        context.fillRect(width * 0.1, height * 0.3, width * 0.05, height * 0.3);
        context.fillRect(width * 0.85, height * 0.3, width * 0.05, height * 0.3);
        
        // Top rope
        context.beginPath();
        context.moveTo(width * 0.1, height * 0.3);
        context.lineTo(width * 0.9, height * 0.3);
        context.stroke();
        
        // Gothic ornaments on posts
        context.fillStyle = '#d4a400';
        context.beginPath();
        context.arc(width * 0.125, height * 0.3, width * 0.03, 0, Math.PI * 2);
        context.fill();
        context.beginPath();
        context.arc(width * 0.875, height * 0.3, width * 0.03, 0, Math.PI * 2);
        context.fill();
        
        canvas.refresh();
    }
    
    // Create gothic ground texture
    createGroundTexture(key, width, height) {
        const canvas = this.textures.createCanvas(key, width, height);
        const context = canvas.getContext('2d');
        
        // Base color
        context.fillStyle = '#1a0c0c';
        context.fillRect(0, 0, width, height);
        
        // Stone texture
        for (let x = 0; x < width; x += 40) {
            context.strokeStyle = '#2a1616';
            context.lineWidth = 1;
            context.strokeRect(x, 0, 40, height);
            
            // Some stones are slightly different color
            if (Math.random() > 0.7) {
                context.fillStyle = 'rgba(50, 30, 30, 0.3)';
                context.fillRect(x, 0, 40, height);
            }
        }
        
        canvas.refresh();
    }
    
    // Create enemy textures with Castlevania-inspired designs
    createEnemyTexture(key, width, height, baseColor) {
        const canvas = this.textures.createCanvas(key, width, height);
        const context = canvas.getContext('2d');
        
        // Clear and set base shape
        context.fillStyle = baseColor;
        context.fillRect(0, 0, width, height);
        
        // Add gothic monster details based on enemy type
        if (key === 'enemyRegular') {
            // Zombie-like enemy
            context.fillStyle = '#000000';
            // Eyes
            context.fillRect(width * 0.2, height * 0.3, width * 0.15, height * 0.1);
            context.fillRect(width * 0.65, height * 0.3, width * 0.15, height * 0.1);
            // Mouth
            context.fillRect(width * 0.3, height * 0.6, width * 0.4, height * 0.1);
        } 
        else if (key === 'enemyBouncy') {
            // Bat-like enemy
            context.fillStyle = '#000000';
            // Wings
            context.beginPath();
            context.moveTo(0, height * 0.3);
            context.lineTo(width * 0.3, height * 0.1);
            context.lineTo(width * 0.3, height * 0.5);
            context.closePath();
            context.fill();
            
            context.beginPath();
            context.moveTo(width, height * 0.3);
            context.lineTo(width * 0.7, height * 0.1);
            context.lineTo(width * 0.7, height * 0.5);
            context.closePath();
            context.fill();
            
            // Eyes
            context.fillStyle = '#ff0000';
            context.beginPath();
            context.arc(width * 0.3, height * 0.3, width * 0.08, 0, Math.PI * 2);
            context.arc(width * 0.7, height * 0.3, width * 0.08, 0, Math.PI * 2);
            context.fill();
        }
        else if (key === 'enemySpecial') {
            // Medusa-like enemy
            context.fillStyle = '#000000';
            // Snake hair
            for (let i = 0; i < 5; i++) {
                context.beginPath();
                context.moveTo(width * 0.5, height * 0.1);
                context.quadraticCurveTo(
                    width * (0.3 + Math.random() * 0.4),
                    height * (0 - Math.random() * 0.2),
                    width * (0.2 + Math.random() * 0.6),
                    height * (0 + Math.random() * 0.2)
                );
                context.lineWidth = 3;
                context.stroke();
            }
            
            // Eyes
            context.fillStyle = '#57ff57';
            context.beginPath();
            context.arc(width * 0.3, height * 0.4, width * 0.1, 0, Math.PI * 2);
            context.arc(width * 0.7, height * 0.4, width * 0.1, 0, Math.PI * 2);
            context.fill();
        }
        
        canvas.refresh();
    }
    
    // Create a gothic button for UI
    createGothicButton(key, width, height) {
        const canvas = this.textures.createCanvas(key, width, height);
        const context = canvas.getContext('2d');
        
        // Button base
        context.fillStyle = '#100808';
        context.fillRect(0, 0, width, height);
        
        // Ornate border
        context.strokeStyle = '#d4a400';
        context.lineWidth = 3;
        context.strokeRect(3, 3, width - 6, height - 6);
        
        // Corner ornaments
        this.drawGothicOrnament(context, 3, 3, 10);
        this.drawGothicOrnament(context, width - 3, 3, 10);
        this.drawGothicOrnament(context, 3, height - 3, 10);
        this.drawGothicOrnament(context, width - 3, height - 3, 10);
        
        canvas.refresh();
    }
    
    // Draw a gothic ornament for UI elements
    drawGothicOrnament(context, x, y, size) {
        context.fillStyle = '#d4a400';
        context.beginPath();
        context.arc(x, y, size / 2, 0, Math.PI * 2);
        context.fill();
        
        context.fillStyle = '#6b0000';
        context.beginPath();
        context.arc(x, y, size / 4, 0, Math.PI * 2);
        context.fill();
    }
    
    // Create Castlevania-style heart collectible
    createHeartTexture(key, size, color) {
        const canvas = this.textures.createCanvas(key, size, size);
        const context = canvas.getContext('2d');
        
        // Heart shape
        context.beginPath();
        context.moveTo(size / 2, size / 4);
        context.bezierCurveTo(size / 2, size / 5, size / 4, 0, 0, size / 4);
        context.bezierCurveTo(0, size / 2, size / 2, size * 0.8, size / 2, size);
        context.bezierCurveTo(size / 2, size * 0.8, size, size / 2, size, size / 4);
        context.bezierCurveTo(size * 0.75, 0, size / 2, size / 5, size / 2, size / 4);
        context.closePath();
        
        // Fill with Castlevania blue-white heart color
        context.fillStyle = '#6bcaff';
        context.fill();
        
        // Add highlight
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.arc(size * 0.3, size * 0.3, size * 0.1, 0, Math.PI * 2);
        context.fill();
        
        canvas.refresh();
    }
    
    // Create Castlevania-style door
    createDoorTexture(key, width, height) {
        const canvas = this.textures.createCanvas(key, width, height);
        const context = canvas.getContext('2d');
        
        // Door base
        context.fillStyle = '#2a0c0c';
        context.fillRect(0, 0, width, height);
        
        // Door frame
        context.strokeStyle = '#d4a400';
        context.lineWidth = 4;
        context.strokeRect(5, 5, width - 10, height - 10);
        
        // Door details - gothic arch
        context.beginPath();
        context.moveTo(10, height * 0.3);
        context.quadraticCurveTo(width / 2, 0, width - 10, height * 0.3);
        context.strokeStyle = '#d4a400';
        context.lineWidth = 2;
        context.stroke();
        
        // Door handle
        context.fillStyle = '#d4a400';
        context.beginPath();
        context.arc(width * 0.3, height * 0.5, width * 0.08, 0, Math.PI * 2);
        context.fill();
        
        canvas.refresh();
    }
    
    // Create Castlevania-style particle effect
    createCastlevaniaParticle(key, size) {
        const canvas = this.textures.createCanvas(key, size * 2, size * 2);
        const context = canvas.getContext('2d');
        
        // Glowing particle in blue-white (like Castlevania holy water)
        const gradient = context.createRadialGradient(
            size, size, 0,
            size, size, size
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#6bcaff');
        gradient.addColorStop(1, 'rgba(107, 202, 255, 0)');
        
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(size, size, size, 0, Math.PI * 2);
        context.fill();
        
        canvas.refresh();
    }
    
    // Create gothic pattern for shop background
    createGothicPatternTexture(key, width, height) {
        const canvas = this.textures.createCanvas(key, width, height);
        const context = canvas.getContext('2d');
        
        // Base dark background
        context.fillStyle = '#10060c';
        context.fillRect(0, 0, width, height);
        
        // Add gothic stone wall pattern
        for (let y = 0; y < height; y += 60) {
            for (let x = 0; x < width; x += 80) {
                // Slight color variations for stones
                const colorShift = Math.floor(Math.random() * 20);
                context.fillStyle = `rgb(${30 + colorShift}, ${20 + colorShift}, ${30 + colorShift})`;
                context.fillRect(x, y, 80, 60);
                
                // Stone borders
                context.strokeStyle = '#000000';
                context.lineWidth = 2;
                context.strokeRect(x, y, 80, 60);
            }
        }
        
        // Add gothic window
        this.drawGothicWindow(context, width / 2 - 100, 50, 200, 300);
        
        // Add candles/torches on the walls
        this.drawWallTorch(context, width * 0.2, height * 0.5);
        this.drawWallTorch(context, width * 0.8, height * 0.5);
        
        canvas.refresh();
    }
    
    // Draw a gothic window
    drawGothicWindow(context, x, y, width, height) {
        // Window frame
        context.fillStyle = '#2a0c0c';
        context.fillRect(x, y, width, height);
        
        // Window border
        context.strokeStyle = '#d4a400';
        context.lineWidth = 5;
        context.strokeRect(x, y, width, height);
        
        // Gothic arch
        context.beginPath();
        context.moveTo(x, y + height * 0.2);
        context.quadraticCurveTo(x + width / 2, y - height * 0.1, x + width, y + height * 0.2);
        context.stroke();
        
        // Window dividers
        context.beginPath();
        context.moveTo(x + width / 2, y);
        context.lineTo(x + width / 2, y + height);
        context.moveTo(x, y + height / 2);
        context.lineTo(x + width, y + height / 2);
        context.stroke();
    }
    
    // Draw Castlevania-style wall torch
    drawWallTorch(context, x, y) {
        // Torch base
        context.fillStyle = '#493122';
        context.fillRect(x - 5, y, 10, 30);
        
        // Torch flame
        const flameGradient = context.createRadialGradient(
            x, y - 10, 0,
            x, y - 10, 20
        );
        flameGradient.addColorStop(0, '#ffffff');
        flameGradient.addColorStop(0.5, '#ff9c00');
        flameGradient.addColorStop(1, 'rgba(255, 80, 0, 0)');
        
        context.fillStyle = flameGradient;
        context.beginPath();
        context.arc(x, y - 10, 20, 0, Math.PI * 2);
        context.fill();
    }
    
    createGradientTexture(key, width, height, colorStops) {
        // Create a canvas for the gradient
        const canvas = this.textures.createCanvas(key, width, height);
        const context = canvas.getContext('2d');
        
        // Create gradient
        const gradient = context.createLinearGradient(0, 0, 0, height);
        colorStops.forEach((color, index) => {
            gradient.addColorStop(index / (colorStops.length - 1), color);
        });
        
        // Fill with gradient
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
        
        // Update the texture
        canvas.refresh();
    }
    
    createCircleTexture(key, radius, color) {
        // Create a canvas for the circle
        const canvas = this.textures.createCanvas(key, radius * 2, radius * 2);
        const context = canvas.getContext('2d');
        
        // Draw circle
        context.beginPath();
        context.arc(radius, radius, radius, 0, Math.PI * 2);
        context.fillStyle = this.colorToHex(color);
        context.fill();
        
        // Update the texture
        canvas.refresh();
    }
    
    createRectTexture(key, width, height, color) {
        // Create a canvas for the rectangle
        const canvas = this.textures.createCanvas(key, width, height);
        const context = canvas.getContext('2d');
        
        // Draw rectangle
        context.fillStyle = this.colorToHex(color);
        context.fillRect(0, 0, width, height);
        
        // Update the texture
        canvas.refresh();
    }
    
    createRoundedRectTexture(key, width, height, color, radius) {
        // Create a canvas for the rounded rectangle
        const canvas = this.textures.createCanvas(key, width, height);
        const context = canvas.getContext('2d');
        
        // Draw rounded rectangle
        context.beginPath();
        context.moveTo(radius, 0);
        context.lineTo(width - radius, 0);
        context.quadraticCurveTo(width, 0, width, radius);
        context.lineTo(width, height - radius);
        context.quadraticCurveTo(width, height, width - radius, height);
        context.lineTo(radius, height);
        context.quadraticCurveTo(0, height, 0, height - radius);
        context.lineTo(0, radius);
        context.quadraticCurveTo(0, 0, radius, 0);
        context.closePath();
        
        context.fillStyle = this.colorToHex(color);
        context.fill();
        
        // Update the texture
        canvas.refresh();
    }
    
    createPatternTexture(key, width, height, color) {
        // Create a canvas for the patterned background
        const canvas = this.textures.createCanvas(key, width, height);
        const context = canvas.getContext('2d');
        
        // Fill with base color
        context.fillStyle = this.colorToHex(color);
        context.fillRect(0, 0, width, height);
        
        // Add pattern
        context.fillStyle = 'rgba(255, 255, 255, 0.05)';
        const patternSize = 20;
        
        for (let y = 0; y < height; y += patternSize * 2) {
            for (let x = 0; x < width; x += patternSize * 2) {
                context.fillRect(x, y, patternSize, patternSize);
                context.fillRect(x + patternSize, y + patternSize, patternSize, patternSize);
            }
        }
        
        // Update the texture
        canvas.refresh();
    }
    
    colorToHex(color) {
        // If already a hex string or named color, return as is
        if (typeof color === 'string') return color;
        
        // Convert from number to hex string
        return '#' + ('00000' + (color | 0).toString(16)).substr(-6);
    }
    
    create() {
        console.log('MenuScene: create started');
        
        // Add the dark background with castle silhouette
        this.add.image(400, 300, 'background').setDisplaySize(800, 600);
        this.add.image(400, 300, 'castleBackground').setDisplaySize(800, 600).setAlpha(0.7);
        
        // Add a slight overlay for the aged effect
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.25);
        
        // Create the game title with Castlevania Symphony of the Night style
        const titleText = this.add.text(400, 150, 'VAMPIRE SMASH', { 
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '64px', 
            fontWeight: 'bold',
            fill: '#ff0000',  // Changed to red like Castlevania logo
            stroke: '#600000',
            strokeThickness: 6,
            shadow: { offsetX: 3, offsetY: 3, color: '#000', blur: 8, stroke: true, fill: true }
        }).setOrigin(0.5);
        
        // Add gothic divider line beneath title
        const lineGraphics = this.add.graphics();
        lineGraphics.lineStyle(2, 0xaaaaaa, 0.8);
        lineGraphics.lineBetween(250, 220, 550, 220);
        
        // Add subtitle in smaller font
        this.add.text(400, 240, 'SYMPHONY OF DESTRUCTION', { 
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '18px', 
            fill: '#cccccc',
            stroke: '#000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Add copyright text at bottom
        this.add.text(400, 560, '© 1997 NOT KONAMI - ALL RIGHTS RESERVED', { 
            fontFamily: 'Arial',
            fontSize: '10px', 
            fill: '#888888'
        }).setOrigin(0.5);
        
        // Create Start button
        const startButton = this.add.text(400, 400, 'PRESS START BUTTON', { 
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '24px', 
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Make the start button pulse slowly
        this.tweens.add({
            targets: startButton,
            alpha: { from: 1, to: 0.5 },
            duration: 1500,
            yoyo: true,
            repeat: -1
        });
        
        // Start button interaction
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene', { 
                currency: gameData.currency,
                maxDistance: gameData.maxDistance,
                level: gameData.level,
                upgrades: gameData.upgrades
            });
        });
        
        // Create instructions button
        const instructionsButton = this.add.text(400, 460, 'INSTRUCTIONS', { 
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '18px', 
            fill: '#dddddd',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Instructions button interaction
        instructionsButton.on('pointerover', () => {
            instructionsButton.setTint(0xffff00);
        });
        instructionsButton.on('pointerout', () => {
            instructionsButton.clearTint();
        });
        instructionsButton.on('pointerdown', () => {
            this.showInstructions();
        });
        
        // Add decorative elements
        this.createBatDecorations();
        
        // Add flickering torches for atmosphere
        this.createFlickeringTorch(150, 250);
        this.createFlickeringTorch(650, 250);
    }
    
    // Create bat decorations around the title
    createBatDecorations() {
        // Create bat texture if it doesn't exist
        if (!this.textures.exists('bat')) {
            const canvas = this.textures.createCanvas('bat', 40, 30);
            const ctx = canvas.getContext('2d');
            
            // Bat body
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(20, 15, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Left wing
            ctx.beginPath();
            ctx.moveTo(20, 15);
            ctx.quadraticCurveTo(10, 5, 0, 15);
            ctx.quadraticCurveTo(10, 25, 20, 15);
            ctx.fill();
            
            // Right wing
            ctx.beginPath();
            ctx.moveTo(20, 15);
            ctx.quadraticCurveTo(30, 5, 40, 15);
            ctx.quadraticCurveTo(30, 25, 20, 15);
            ctx.fill();
            
            // Eyes
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(16, 14, 2, 0, Math.PI * 2);
            ctx.arc(24, 14, 2, 0, Math.PI * 2);
            ctx.fill();
            
            canvas.refresh();
        }
        
        // Add bats around the title
        const batPositions = [
            {x: 200, y: 120},
            {x: 600, y: 120},
            {x: 300, y: 100},
            {x: 500, y: 100}
        ];
        
        batPositions.forEach(pos => {
            const bat = this.add.image(pos.x, pos.y, 'bat').setScale(1.2);
            
            // Add flying animation
            this.tweens.add({
                targets: bat,
                y: pos.y + 20,
                x: pos.x + (Math.random() > 0.5 ? 30 : -30),
                duration: 1000 + Math.random() * 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }
    
    // Show game instructions modal
    showInstructions() {
        // Create a semi-transparent background panel
        const panel = this.add.rectangle(400, 300, 600, 400, 0x000000, 0.9).setInteractive();
        
        // Add ornate border to the panel
        const border = this.add.graphics();
        border.lineStyle(3, 0xaa7700, 1);
        border.strokeRect(100, 100, 600, 400);
        
        // Add gothic ornaments at corners
        this.drawGothicOrnament(border, 100, 100, 20);
        this.drawGothicOrnament(border, 700, 100, 20);
        this.drawGothicOrnament(border, 100, 500, 20);
        this.drawGothicOrnament(border, 700, 500, 20);
        
        // Add title to instructions panel
        const instructionsTitle = this.add.text(400, 130, 'GAME INSTRUCTIONS', {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '28px',
            fill: '#ff0000',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        // Add instructions text
        const instructions = [
            "- Click and hold to aim your vampire",
            "- Release to launch your vampire into battle",
            "- Bounce off enemies to gain height and distance",
            "- Collect blood to upgrade your abilities",
            "- Defeat the night creatures and travel as far as possible"
        ];
        
        let y = 200;
        instructions.forEach(line => {
            this.add.text(400, y, line, {
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '18px',
                fill: '#dddddd',
                align: 'center'
            }).setOrigin(0.5);
            y += 40;
        });
        
        // Add close button
        const closeButton = this.add.text(400, 440, 'RETURN', {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '22px',
            fill: '#dddddd',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Close button interaction
        closeButton.on('pointerover', () => {
            closeButton.setTint(0xffff00);
        });
        closeButton.on('pointerout', () => {
            closeButton.clearTint();
        });
        closeButton.on('pointerdown', () => {
            // Remove all elements of the instructions modal
            panel.destroy();
            border.destroy();
            instructionsTitle.destroy();
            closeButton.destroy();
            // Destroy all instruction text lines
            this.children.list
                .filter(child => child.type === 'Text' && instructions.includes(child.text))
                .forEach(text => text.destroy());
        });
    }
    
    // Create flickering torch effect
    createFlickeringTorch(x, y) {
        // Create a light sprite
        const light = this.add.image(x, y, 'particle').setScale(5);
        
        // Create flickering animation
        this.tweens.add({
            targets: light,
            alpha: { from: 0.7, to: 1 },
            scale: { from: 5, to: 5.5 },
            duration: 100 + Math.random() * 200,
            yoyo: true,
            repeat: -1
        });
    }
}; 