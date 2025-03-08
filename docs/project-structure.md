# Project Structure: Vampire Smash (Burrito Bison Inspired Game)
*Created: [2025-03-07 17:30] - Initial documentation of project structure.*
*Updated: [2025-03-07 17:45] - Updated to reflect file structure simplification and game name change.*
*Updated: [2025-03-08 23:45] - Updated to reflect Castlevania-inspired title screen improvements.*
*Updated: [2025-03-10 12:00] - Reviewed documentation and confirmed project structure accuracy.*
*Updated: [2025-03-11 00:43] - Added GitHub repository information.*

This document provides a comprehensive overview of the Vampire Smash game project, including its technical stack, core functionality, game mechanics, and file organization.

## Technical Stack

- **Game Engine**: Phaser 3 (HTML5 game framework)
- **Programming Language**: Vanilla JavaScript
- **Graphics**: Procedurally generated (no external assets)
- **Storage**: Browser localStorage for saving game progress
- **Design Approach**: Responsive design for modern browsers
- **Version Control**: GitHub repository at https://github.com/k-newton/Vampire-Smash

## Core Functionality

### Game Mechanics

1. **Launch Mechanics**:
   - Pull-back and release system for launching the luchador character
   - Adjustable angle and power
   - Launch power affected by player upgrades

2. **Physics System**:
   - Bounce height directly tied to horizontal speed
   - Guaranteed minimum bounce height of 200 pixels (implemented using physics formula)
   - Physics-based calculations using formula: v = sqrt(2*g*h) for bounce velocity
   - Maximum speed limit (1000 units) with percentage-based display
   - Forward-only momentum to ensure character always travels rightward
   - Ground contact reduces horizontal velocity while maintaining direction
   - Consistent bounce height tracking with real-time display
   - Progressive slowdown until minimum threshold (50 units) for game end

3. **Slam Ability**:
   - Tactical ground pound ability to maintain momentum
   - Cooldown system with upgradeable recovery time
   - Special visual effects and particle systems

4. **Enemy System**:
   - Skeletons and goblins as destructible enemies
   - Unique death animations and particle effects for each enemy type
   - Enemies preserve player momentum when hit

5. **Currency System**:
   - "Bones" as in-game currency
   - Earned by defeating enemies (Skeletons: 25 bones, Goblins: 15 bones)
   - Displayed with floating text and visual feedback

6. **Upgrades System**:
   - Launch Power: Increases initial velocity
   - Bounce Power: Improves bounce efficiency
   - Slam Power: Enhances slam impact
   - Slam Cooldown: Reduces time between slams
   - Progressive pricing (higher costs for higher levels)

7. **World Design**:
   - Extended world (50,000 units) for long-distance travel
   - Randomly generated enemy clusters
   - Parallax scrolling background with Castlevania-inspired visuals

## Database Schema (Local Storage)

Game data is stored in the browser's localStorage under the key 'luchadorLaunchData' with the following structure:

```javascript
{
  currency: number,       // Player's current bones (currency)
  maxDistance: number,    // Best distance achieved
  level: number,          // Current player level
  upgrades: {
    power: number,        // Launch power upgrade level
    bounce: number,       // Bounce efficiency upgrade level
    stompPower: number,   // Slam power upgrade level
    stompCooldown: number // Slam cooldown upgrade level
  }
}
```

## Frontend Structure

### User Interface

- **Main Menu**: 
  - Castlevania: Symphony of the Night-inspired title screen with red banner
  - "PRESS START BUTTON" prompt with pulsing animation
  - Instructions button with modal interface
  - Container-based layout for consistent element positioning
- **Game HUD**: Distance counter, currency display, stomp indicator
- **Shop Interface**: Upgrade categories with dynamic pricing
- **Game Over Screen**: 
  - Castlevania-inspired design with red beveled banner and filigree decorations
  - Gothic-styled results panel showing distance traveled and enemies defeated
  - Themed buttons with hover effects that match the main menu style
  - Direct-positioned UI elements for reliable interaction
- **Visual Feedback**: Particle effects, text notifications, color-coded indicators

### Visual Design

- Castlevania: Symphony of the Night-inspired title screen with red banner and gothic typography
- Container-based approach for consistent alignment of UI elements
- Procedurally generated decorative elements including filigree and beveled backgrounds
- Parallax scrolling background with multiple layers
- Atmospheric elements (floating candles, lightning effects)
- Particle systems for impacts and enemy destruction

## File Organization

### Directory Structure

```
/                               # Root directory
├── js/                         # JavaScript source files
│   ├── entities/               # Game entity classes
│   │   ├── Player.js           # Player character class
│   │   └── Enemy.js            # Enemy classes
│   ├── scenes/                 # Phaser scene classes
│   │   ├── MenuScene.js        # Main menu scene
│   │   ├── GameScene.js        # Core gameplay scene
│   │   └── ShopScene.js        # Upgrade shop scene
│   ├── game.js                 # Main game initialization
│   ├── config.js               # Game configuration
│   └── phaser.min.js           # Phaser 3 library
├── assets/                     # Game assets
│   └── images/                 # Image assets (procedurally generated)
├── vampire-smash.html          # Self-contained game file
├── index.html                  # Main entry point (loads the game in an iframe)
├── run-game.command            # Local development server script
├── docs/                       # Documentation folder
│   ├── project-structure.md    # Project structure overview (this file)
│   └── file-documentation.md   # Detailed file documentation
└── README.md                   # Project documentation
```

## Development History

The game has undergone several major updates:

1. **Initial Development**: Core launch and bounce mechanics
2. **March 3, 2025**: Major update with slam mechanics and enemy clusters
3. **March 4, 2025**: Upgrade system implementation and game mechanics improvements
4. **March 5, 2025**: Enemy overhaul (skeletons and goblins) and currency system update
5. **March 7, 2025**: Visual improvements with Castlevania-style aesthetics
6. **March 7, 2025**: Renamed to "Vampire Smash" and simplified file structure 
7. **March 8, 2025**: Physics system overhaul to ensure launcher-style forward-only momentum 
8. **March 8, 2025**: Enhanced physics with minimum bounce height, maximum speed limit, and improved bounce tracking
9. **March 8, 2025**: Redesigned title screen with Castlevania: Symphony of the Night aesthetic
10. **March 8, 2025**: Implemented container-based UI for consistent element alignment and positioning 
11. **March 9, 2025 (15:45)**: Improved game over screen with Castlevania-inspired styling and fixed button functionality 
12. **March 11, 2025 (00:43)**: Created GitHub repository for version control and project sharing