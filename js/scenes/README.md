# Scene Files

This directory contains the main scene files for the Vampire Smash game:

1. **MenuScene.js** - Implements the main menu with Castlevania-inspired aesthetics
2. **GameScene.js** - Contains the core gameplay mechanics and physics
3. **ShopScene.js** - Implements the upgrade shop system

These files are large (30-40KB each) and should be uploaded separately due to GitHub API limitations.

## File Contents Overview

### MenuScene.js
- Creates all procedurally generated textures
- Implements Castlevania: Symphony of the Night-inspired title screen
- Handles menu navigation and instructions modal
- Contains texture generation for all game assets

### GameScene.js
- Implements physics for bouncing and momentum
- Handles enemy spawning and collision detection
- Manages player launch mechanics and slam ability
- Tracks distance, score, and other gameplay metrics

### ShopScene.js
- Displays available upgrades with current levels
- Handles currency and upgrade purchases
- Provides upgrade descriptions and tooltips
- Implements gothic-themed UI elements

## Note for Contributors
Due to file size limitations in the GitHub API, these files need to be uploaded directly through git or the GitHub web interface rather than through the API.