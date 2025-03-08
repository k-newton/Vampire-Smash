/*
Created: Shop scene for purchasing upgrades between gameplay runs.
Updated: Fixed issue with currency display and improved upgrade descriptions.
Further Updated: Redesigned with Super Nintendo Castlevania-style aesthetics for shop interface.
*/

// Declare as global variable so it can be used in config.js
var ShopScene = class ShopScene extends Phaser.Scene {
    constructor() {
        super('ShopScene');
        this.selectedUpgrade = null;
    }
    
    create() {
        console.log('ShopScene started');
        
        // Add gothic shop background with candles and artifacts
        this.createCastlevaniaShop();
        
        // Show player currency (hearts in Castlevania style)
        this.createCurrencyDisplay();
        
        // Create gothic header title
        this.createGothicHeader('RELICS SHOP', 400, 80);
        
        // Create upgrades UI with Castlevania-style ornate frames
        this.createUpgradesUI();
        
        // Create navigation buttons with gothic design
        this.createNavigationButtons();
    }
    
    createCastlevaniaShop() {
        // Add gothic shop background
        this.add.image(400, 300, 'shopBackground').setDisplaySize(800, 600);
        
        // Add flickering candles for atmosphere
        this.createShopCandles();
        
        // Add decorative shop elements
        this.addShopDecorations();
    }
    
    createShopCandles() {
        // Add candles at the corners of the shop
        const candlePositions = [
            {x: 150, y: 150},
            {x: 650, y: 150},
            {x: 150, y: 450},
            {x: 650, y: 450}
        ];
        
        // Create candle texture if not exists
        if (!this.textures.exists('shopCandle')) {
            const canvas = this.textures.createCanvas('shopCandle', 30, 50);
            const ctx = canvas.getContext('2d');
            
            // Candle base
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(5, 25, 20, 25);
            
            // Candlestick
            ctx.fillStyle = '#d4a400';
            ctx.beginPath();
            ctx.arc(15, 25, 12, 0, Math.PI, true);
            ctx.fill();
            
            // Candle wax
            ctx.fillStyle = '#F5F5DC';
            ctx.fillRect(10, 10, 10, 15);
            
            // Flame
            const gradient = ctx.createRadialGradient(15, 10, 0, 15, 10, 8);
            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(0.5, '#FFA500');
            gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(15, 10, 8, 0, Math.PI * 2);
            ctx.fill();
            
            canvas.refresh();
        }
        
        // Add candles with flickering effect
        candlePositions.forEach(pos => {
            const candle = this.add.image(pos.x, pos.y, 'shopCandle').setScale(1.5);
            
            // Create flickering effect
            this.tweens.add({
                targets: candle,
                alpha: { from: 0.85, to: 1 },
                duration: 100 + Math.random() * 200,
                yoyo: true,
                repeat: -1
            });
            
            // Add light glow around candle
            const light = this.add.circle(pos.x, pos.y - 15, 40, 0xffaa00, 0.2);
            
            // Pulsate the light
            this.tweens.add({
                targets: light,
                alpha: { from: 0.1, to: 0.3 },
                radius: { from: 35, to: 45 },
                duration: 1000 + Math.random() * 500,
                yoyo: true,
                repeat: -1
            });
        });
    }
    
    addShopDecorations() {
        // Create shop keeper (mysterious figure in shadows)
        this.createShopkeeper(650, 300);
        
        // Add gothic decorative elements
        this.addGothicDecorations();
    }
    
    createShopkeeper(x, y) {
        // Create shopkeeper texture (cloaked figure)
        if (!this.textures.exists('shopkeeper')) {
            const canvas = this.textures.createCanvas('shopkeeper', 100, 150);
            const ctx = canvas.getContext('2d');
            
            // Shadowy cloak
            ctx.fillStyle = '#1a0c0c';
            ctx.beginPath();
            ctx.moveTo(50, 30);
            ctx.lineTo(20, 150);
            ctx.lineTo(80, 150);
            ctx.closePath();
            ctx.fill();
            
            // Hood
            ctx.beginPath();
            ctx.arc(50, 50, 25, 0, Math.PI, true);
            ctx.closePath();
            ctx.fill();
            
            // Glowing eyes
            ctx.fillStyle = '#d4a400';
            ctx.beginPath();
            ctx.arc(40, 50, 3, 0, Math.PI * 2);
            ctx.arc(60, 50, 3, 0, Math.PI * 2);
            ctx.fill();
            
            canvas.refresh();
        }
        
        // Add shopkeeper to the scene
        const shopkeeper = this.add.image(x, y, 'shopkeeper').setScale(2);
        
        // Subtle floating animation
        this.tweens.add({
            targets: shopkeeper,
            y: y - 10,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Add a greeting message
        this.add.text(x, y - 100, "Choose wisely...", {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '20px',
            fill: '#d4a400',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0.5);
    }
    
    addGothicDecorations() {
        // Add decorative old weapons on the wall
        this.createWeaponDecoration(200, 170, 'cross');
        this.createWeaponDecoration(200, 250, 'dagger');
        this.createWeaponDecoration(200, 330, 'holyWater');
        this.createWeaponDecoration(200, 410, 'axe');
    }
    
    createWeaponDecoration(x, y, type) {
        // Create weapon textures if they don't exist
        if (!this.textures.exists(type)) {
            const canvas = this.textures.createCanvas(type, 40, 40);
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = '#d4a400';
            
            if (type === 'cross') {
                // Draw cross (like Castlevania cross)
                ctx.fillRect(15, 5, 10, 30);
                ctx.fillRect(5, 15, 30, 10);
            }
            else if (type === 'dagger') {
                // Draw dagger
                ctx.beginPath();
                ctx.moveTo(20, 5);
                ctx.lineTo(30, 15);
                ctx.lineTo(25, 35);
                ctx.lineTo(15, 35);
                ctx.lineTo(10, 15);
                ctx.closePath();
                ctx.fill();
                
                // Handle
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(15, 25, 10, 10);
            }
            else if (type === 'holyWater') {
                // Draw holy water bottle
                ctx.beginPath();
                ctx.arc(20, 15, 10, 0, Math.PI * 2);
                ctx.fill();
                
                // Bottle neck
                ctx.fillRect(17, 5, 6, 10);
                
                // Water
                ctx.fillStyle = '#6bcaff';
                ctx.beginPath();
                ctx.arc(20, 15, 6, 0, Math.PI * 2);
                ctx.fill();
            }
            else if (type === 'axe') {
                // Draw axe
                ctx.beginPath();
                ctx.arc(20, 20, 15, 0, Math.PI * 2);
                ctx.fill();
                
                // Blade shape
                ctx.fillStyle = '#c0c0c0';
                ctx.beginPath();
                ctx.moveTo(10, 10);
                ctx.lineTo(30, 10);
                ctx.lineTo(30, 30);
                ctx.lineTo(10, 30);
                ctx.closePath();
                ctx.fill();
                
                // Handle
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(15, 25, 10, 15);
            }
            
            canvas.refresh();
        }
        
        // Add weapon to scene
        this.add.image(x, y, type).setScale(1.5);
    }
    
    createCurrencyDisplay() {
        // Create Castlevania-style currency display with heart icon
        if (!this.textures.exists('heart')) {
            const canvas = this.textures.createCanvas('heart', 20, 20);
            const ctx = canvas.getContext('2d');
            
            // Draw Castlevania-style heart
            ctx.fillStyle = '#6bcaff';
            ctx.beginPath();
            ctx.moveTo(10, 5);
            ctx.bezierCurveTo(10, 3, 5, 0, 0, 5);
            ctx.bezierCurveTo(0, 10, 10, 16, 10, 20);
            ctx.bezierCurveTo(10, 16, 20, 10, 20, 5);
            ctx.bezierCurveTo(15, 0, 10, 3, 10, 5);
            ctx.closePath();
            ctx.fill();
            
            // Highlight
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(5, 7, 2, 0, Math.PI * 2);
            ctx.fill();
            
            canvas.refresh();
        }
        
        // Add heart icon
        this.add.image(30, 30, 'heart').setScale(1.5);
        
        // Add currency text
        this.currencyText = this.add.text(50, 30, `${gameData.currency}`, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '24px', 
            fill: '#d4a400',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0, 0.5);
    }
    
    createGothicHeader(text, x, y) {
        // Create ornate header
        const headerText = this.add.text(x, y, text, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '36px',
            fontWeight: 'bold',
            fill: '#d4a400',
            stroke: '#000',
            strokeThickness: 5,
            shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 5, fill: true }
        }).setOrigin(0.5);
        
        // Add ornate decorations on sides of header
        this.drawOrnateDecoration(x - headerText.width/2 - 40, y);
        this.drawOrnateDecoration(x + headerText.width/2 + 40, y, true);
    }
    
    drawOrnateDecoration(x, y, flipX = false) {
        // Create ornate decoration texture (if not exists)
        const key = flipX ? 'ornamentRight' : 'ornamentLeft';
        
        if (!this.textures.exists(key)) {
            const canvas = this.textures.createCanvas(key, 40, 40);
            const ctx = canvas.getContext('2d');
            
            // Gold ornate swirl
            ctx.strokeStyle = '#d4a400';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            if (!flipX) {
                ctx.moveTo(40, 20);
                ctx.bezierCurveTo(30, 15, 20, 30, 10, 15);
                ctx.bezierCurveTo(0, 0, 10, 40, 0, 25);
            } else {
                ctx.moveTo(0, 20);
                ctx.bezierCurveTo(10, 15, 20, 30, 30, 15);
                ctx.bezierCurveTo(40, 0, 30, 40, 40, 25);
            }
            
            ctx.stroke();
            
            // Add small decorative circle
            ctx.fillStyle = '#d4a400';
            ctx.beginPath();
            ctx.arc(flipX ? 5 : 35, 20, 5, 0, Math.PI * 2);
            ctx.fill();
            
            canvas.refresh();
        }
        
        // Add to scene
        this.add.image(x, y, key);
    }
    
    createUpgradesUI() {
        // Define upgrade options with Castlevania relic theme
        const upgrades = [
            { 
                name: 'Launch Power', 
                desc: 'Increases your initial launch power', 
                key: 'power',
                icon: 'powerRelic'
            },
            { 
                name: 'Bounce Power', 
                desc: 'Increases your bounce power off enemies', 
                key: 'bounce',
                icon: 'bounceRelic'
            },
            { 
                name: 'Stomp Power', 
                desc: 'Increases the strength of your stomp attack', 
                key: 'stompPower',
                icon: 'stompRelic'
            },
            { 
                name: 'Stomp Cooldown', 
                desc: 'Reduces the cooldown time of your stomp attack', 
                key: 'stompCooldown',
                icon: 'cooldownRelic'
            }
        ];
        
        // Create upgrade items
        this.upgradeItems = [];
        
        // Create upgrade relic item textures
        this.createRelicTextures();
        
        // Create the upgrade cards with gothic frames
        upgrades.forEach((upgrade, index) => {
            const x = 400;
            const y = 180 + index * 100;
            
            // Create the upgrade card with castle-style frame
            const card = this.createUpgradeCard(x, y, upgrade);
            this.upgradeItems.push(card);
        });
    }
    
    createRelicTextures() {
        // Create relic textures for each upgrade type
        this.createRelicTexture('powerRelic', '#ff5555');     // Red for power
        this.createRelicTexture('bounceRelic', '#55ff55');    // Green for bounce
        this.createRelicTexture('stompRelic', '#5555ff');     // Blue for stomp
        this.createRelicTexture('cooldownRelic', '#ffff55');  // Yellow for cooldown
    }
    
    createRelicTexture(key, gemColor) {
        if (!this.textures.exists(key)) {
            const canvas = this.textures.createCanvas(key, 40, 40);
            const ctx = canvas.getContext('2d');
            
            // Relic base (medal-like)
            ctx.fillStyle = '#d4a400';
            ctx.beginPath();
            ctx.arc(20, 20, 15, 0, Math.PI * 2);
            ctx.fill();
            
            // Inner circle
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.arc(20, 20, 12, 0, Math.PI * 2);
            ctx.fill();
            
            // Gem in center
            ctx.fillStyle = gemColor;
            ctx.beginPath();
            ctx.arc(20, 20, 8, 0, Math.PI * 2);
            ctx.fill();
        
            // Shine highlight
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.arc(17, 17, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Decorative detail (rays)
            ctx.globalAlpha = 1;
            ctx.strokeStyle = '#d4a400';
            ctx.lineWidth = 2;
            
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const startX = 20 + Math.cos(angle) * 15;
                const startY = 20 + Math.sin(angle) * 15;
                const endX = 20 + Math.cos(angle) * 18;
                const endY = 20 + Math.sin(angle) * 18;
                
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }
            
            canvas.refresh();
        }
    }
    
    createUpgradeCard(x, y, upgrade) {
        // Create gothic frame for upgrade card
        const cardWidth = 500;
        const cardHeight = 80;
        
        const card = this.add.graphics();
        card.fillStyle(0x000000, 0.7);
        card.fillRect(x - cardWidth/2, y - cardHeight/2, cardWidth, cardHeight);
        
        // Gold border
        card.lineStyle(3, 0xd4a400, 1);
        card.strokeRect(x - cardWidth/2 + 3, y - cardHeight/2 + 3, cardWidth - 6, cardHeight - 6);
        
        // Add upgrade icon
        const icon = this.add.image(x - cardWidth/2 + 40, y, upgrade.icon).setScale(1.5);
        
        // Add upgrade title with gothic style
        const title = this.add.text(x - cardWidth/2 + 80, y - 20, upgrade.name, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '20px', 
            fill: '#d4a400'
        });
        
        // Add upgrade description
        const desc = this.add.text(x - cardWidth/2 + 80, y + 5, upgrade.desc, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '16px',
            fill: '#ffffff'
        });
        
        // Add level indicator
        const currentLevel = gameData.upgrades[upgrade.key];
        const maxLevel = 10;
        const levelText = this.add.text(x + cardWidth/2 - 60, y - 20, `Level: ${currentLevel}/${maxLevel}`, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '16px',
            fill: '#ffffff'
        });
        
        // Calculate cost
        const cost = Math.floor(currentLevel * currentLevel * 10 + 10);
        
        // Add cost text with heart icon
        const costIcon = this.add.image(x + cardWidth/2 - 80, y + 10, 'heart').setScale(1);
        const costText = this.add.text(x + cardWidth/2 - 65, y + 10, cost.toString(), {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '18px', 
            fill: '#6bcaff'
        }).setOrigin(0, 0.5);
        
        // Add upgrade button with gothic style
        const upgradeBtn = this.createGothicButton(
            x + cardWidth/2 - 30, 
            y + 10, 
            'Upgrade',
            () => this.purchaseUpgrade(upgrade.key)
        );
        
        // Make entire card interactive
        const hitArea = new Phaser.Geom.Rectangle(-cardWidth/2, -cardHeight/2, cardWidth, cardHeight);
        card.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
        
        card.on('pointerover', () => {
            card.clear();
            card.fillStyle(0x1a0c0c, 0.7);
            card.fillRect(x - cardWidth/2, y - cardHeight/2, cardWidth, cardHeight);
            card.lineStyle(3, 0xd4a400, 1);
            card.strokeRect(x - cardWidth/2 + 3, y - cardHeight/2 + 3, cardWidth - 6, cardHeight - 6);
        });
        
        card.on('pointerout', () => {
            card.clear();
            card.fillStyle(0x000000, 0.7);
            card.fillRect(x - cardWidth/2, y - cardHeight/2, cardWidth, cardHeight);
            card.lineStyle(3, 0xd4a400, 1);
            card.strokeRect(x - cardWidth/2 + 3, y - cardHeight/2 + 3, cardWidth - 6, cardHeight - 6);
        });
        
        card.on('pointerdown', () => {
            this.purchaseUpgrade(upgrade.key);
        });
        
        // Store elements for updates
        card.upgrade = upgrade;
        card.levelText = levelText;
        card.costText = costText;
        card.costIcon = costIcon;
        card.upgradeBtn = upgradeBtn;
        
        return card;
    }
    
    createGothicButton(x, y, text, callback) {
        // Create the button background
        const btn = this.add.image(x, y, 'button').setDisplaySize(100, 30);
        
        // Add button text
        const btnText = this.add.text(x, y, text, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '14px',
            fill: '#d4a400'
        }).setOrigin(0.5);
        
        // Make it interactive
        btn.setInteractive({ useHandCursor: true });
        
        // Add hover effects
        btn.on('pointerover', () => {
            btn.setTint(0x777777);
            btnText.setTint(0xffdd77);
        });
        
        btn.on('pointerout', () => {
            btn.clearTint();
            btnText.clearTint();
        });
        
        // Add click event
        btn.on('pointerdown', callback);
        
        // Return button group
        return { btn, btnText };
    }
    
    createNavigationButtons() {
        // Back to game button
        const backBtn = this.createGothicButton(400, 530, 'Return to Castle', () => {
            this.scene.start('GameScene', {
                currency: gameData.currency,
                maxDistance: gameData.maxDistance,
                level: gameData.level,
                upgrades: gameData.upgrades
            });
        });
        
        // Make button larger
        backBtn.btn.setDisplaySize(200, 40);
    }
    
    purchaseUpgrade(upgradeKey) {
        // Find the upgrade card
        const card = this.upgradeItems.find(item => item.upgrade.key === upgradeKey);
        if (!card) return;
        
        // Get current level and calculate cost
        const currentLevel = gameData.upgrades[upgradeKey];
        const maxLevel = 10;
        
        // Check if already max level
        if (currentLevel >= maxLevel) {
            this.showMessage('Maximum level reached!');
            return;
        }
        
        // Calculate cost
        const cost = Math.floor(currentLevel * currentLevel * 10 + 10);
        
        // Check if player can afford it
        if (gameData.currency < cost) {
            this.showMessage('Not enough hearts!');
            return;
        }
        
        // Purchase upgrade
            gameData.currency -= cost;
        gameData.upgrades[upgradeKey]++;
            
            // Update UI
        this.updateUpgradeCards();
        this.currencyText.setText(`${gameData.currency}`);
        
        // Save the game data
        localStorage.setItem('luchadorLaunchData', JSON.stringify(gameData));
        
        // Show purchase effect
        this.showPurchaseEffect(card);
    }
    
    updateUpgradeCards() {
        // Update all upgrade cards
        this.upgradeItems.forEach(card => {
            const key = card.upgrade.key;
            const currentLevel = gameData.upgrades[key];
            const maxLevel = 10;
            
            // Update level text
            card.levelText.setText(`Level: ${currentLevel}/${maxLevel}`);
            
            // Calculate new cost
            const cost = Math.floor(currentLevel * currentLevel * 10 + 10);
            
            // Update cost text
            card.costText.setText(cost.toString());
            
            // Update button state
            if (currentLevel >= maxLevel) {
                card.upgradeBtn.btn.setTint(0x555555);
                card.upgradeBtn.btnText.setText('MAX');
            } else {
                // Set button color based on affordability
                if (gameData.currency < cost) {
                    card.upgradeBtn.btn.setTint(0x555555);
                } else {
                    card.upgradeBtn.btn.clearTint();
                }
            }
        });
    }
    
    showPurchaseEffect(card) {
        // Create flash effect
        const flash = this.add.rectangle(
            card.x, 
            card.y, 
            500, 
            80, 
            0xffffff, 
            0.7
        );
        
        // Create particle effect around the upgrade icon
        const particles = this.add.particles('particle');
        
        const emitter = particles.createEmitter({
            x: card.x - 250 + 40,
            y: card.y,
            speed: { min: 50, max: 100 },
            scale: { start: 0.5, end: 0 },
            lifespan: 1000,
            blendMode: 'ADD',
            quantity: 20
        });
        
        // Play sound effect (if you have one)
        
        // Fade out flash and destroy
            this.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                flash.destroy();
                
                // Stop particle emitter after a delay
                this.time.delayedCall(500, () => {
                    emitter.stop();
                    // Destroy particles after they finish
                    this.time.delayedCall(1000, () => {
                        particles.destroy();
                    });
                });
            }
        });
    }
    
    showMessage(text) {
        // Create message box with gothic style
        const messageBoxWidth = 300;
        const messageBoxHeight = 80;
        const x = 400;
        const y = 300;
        
        // Create the box
        const box = this.add.graphics();
        box.fillStyle(0x000000, 0.8);
        box.fillRect(x - messageBoxWidth/2, y - messageBoxHeight/2, messageBoxWidth, messageBoxHeight);
            
        // Gold border
        box.lineStyle(3, 0xd4a400, 1);
        box.strokeRect(x - messageBoxWidth/2 + 3, y - messageBoxHeight/2 + 3, messageBoxWidth - 6, messageBoxHeight - 6);
        
        // Add message text
        const message = this.add.text(x, y, text, {
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
            
        // Fade in
        box.alpha = 0;
        message.alpha = 0;
        
        this.tweens.add({
            targets: [box, message],
            alpha: 1,
            duration: 200
        });
        
        // Fade out after delay
        this.time.delayedCall(1500, () => {
            this.tweens.add({
                targets: [box, message],
                alpha: 0,
                duration: 200,
                onComplete: () => {
                    box.destroy();
                    message.destroy();
                }
            });
            });
        }
}; 