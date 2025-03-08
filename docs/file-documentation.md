# File Documentation: Vampire Smash Game
*Created: [2025-03-07 17:40] - Initial documentation of project files.*
*Updated: [2025-03-07 17:50] - Updated to reflect file structure simplification and game name change.*
*Updated: [2025-03-10 12:00] - Reviewed documentation and confirmed accuracy of file descriptions.*
*Updated: [2025-03-11 00:43] - Added GitHub repository information.*

This document provides detailed documentation for each important file in the project, explaining what each file does and how it works.

## Core Files

### /js/game.js
- **Purpose**: Main game initialization and globals
- **Key Functions**:
  - Initializes the game instance with configuration
  - Sets up global game data storage
  - Manages localStorage save/load functionality
  - Implements error handling for game crashes and asset loading failures
- **Global Variables**:
  - `gameData`: Stores player progress, currency, and upgrades
  - `game`: Main Phaser game instance
- **Dependencies**: Depends on config.js and all scene files

### /js/config.js
- **Purpose**: Defines core game configuration
- **Key Settings**:
  - Game dimensions (800x600)
  - Physics engine settings (Arcade physics with gravity)
  - Scene list (MenuScene, GameScene, ShopScene)
  - Rendering type (AUTO - WebGL with Canvas fallback)
- **Dependencies**: Scene classes must be defined before this file is loaded

## Scene Files

### /js/scenes/MenuScene.js
- **Purpose**: Main menu interface
- **Key Functions**:
  - Renders game title and main menu options
  - Handles navigation to other scenes (play, shop)
  - Displays player stats (max distance, currency)
  - Shows Castlevania: Symphony of the Night-inspired title screen
  - Creates all procedurally generated textures for the game
- **Notable Features**:
  - Container-based layout for consistent element alignment
  - Castlevania-styled title with beveled red background
  - Procedurally generated filigree decorations
  - "PRESS START BUTTON" with pulsing animation
  - Instructions modal with gothic styling and ornate borders
  - Dynamic decoration generation using graphics context
- **Implementation Details**:
  - Uses Phaser.Container for grouping related UI elements
  - Creates beveled effect with layered rectangles
  - Implements decorative elements using Phaser's graphics API
  - Maintains relative positioning via container coordinates
- **Dependencies**: None (now handles all asset creation itself)

### /js/scenes/GameScene.js
- **Purpose**: Core gameplay scene
- **Key Functions**:
  - Implements launch mechanics (drag and release)
  - Manages physics for bouncing and momentum
  - Handles enemy spawning and collisions
  - Implements slam ability mechanics
  - Tracks and displays game progress (distance, currency)
  - Manages camera following and world boundaries
- **Notable Features**:
  - Castlevania-inspired visual design
  - Parallax scrolling background with multiple layers
  - Atmospheric elements (floating candles, lightning)
  - Particle systems for impacts and enemy destruction
- **Core Mechanics**:
  - Speed-based bounce height calculation
  - Momentum preservation and reduction
  - Enemy collision handling
  - Slam mechanics with cooldown
- **Dependencies**: Player.js, Enemy.js

### /js/scenes/ShopScene.js
- **Purpose**: Upgrade shop interface
- **Key Functions**:
  - Displays available upgrades with current levels
  - Handles upgrade purchases and currency management
  - Updates game data when upgrades are purchased
  - Provides navigation back to menu or gameplay
- **Notable Features**:
  - Dynamic pricing based on upgrade level
  - Visual feedback for purchases
  - Gothic-themed UI elements
- **Dependencies**: Requires gameData from game.js

## Entity Files

### /js/entities/Player.js
- **Purpose**: Player character class
- **Key Functions**:
  - Manages player state and physics properties
  - Implements launch method with upgrade effects
  - Handles stomp ability with cooldown
  - Applies upgrade effects to player capabilities
- **Notable Properties**:
  - `isLaunched`: Tracks if player has been launched
  - `stompAvailable`: Controls stomp ability availability
  - `stompCooldown`: Time between stomp uses (modified by upgrades)
- **Dependencies**: Requires gameData for upgrade effects

### /js/entities/Enemy.js
- **Purpose**: Enemy classes (Skeletons and Goblins)
- **Key Functions**:
  - Implements enemy behavior and physics
  - Manages animation states
  - Handles destruction effects and particle systems
  - Tracks value (currency reward) for each enemy type
- **Notable Features**:
  - Different enemy types with unique visuals
  - Custom death animations with particle effects
  - Varied reward values (Skeletons: 25, Goblins: 15)
- **Dependencies**: None

## HTML Files

### /index.html
- **Purpose**: Main entry point for the game
- **Key Elements**:
  - Simple launcher page that loads the standalone game in an iframe
  - Responsive design that works on various screen sizes
  - Includes game instructions
- **Dependencies**: vampire-smash.html

### /vampire-smash.html
- **Purpose**: Self-contained game file for distribution
- **Key Features**:
  - Includes all game code and Phaser library in a single file
  - No external dependencies required
  - Procedurally generates all game assets at runtime
- **Dependencies**: None (self-contained)

## Utility Scripts

### /run-game.command
- **Purpose**: Local development server script
- **Key Functions**:
  - Starts a simple HTTP server for local development
  - Manages port availability (kills existing processes on port 8000)
  - Provides user-friendly instructions in the terminal
- **Usage**: Run `./run-game.command` to start server on port 8000
- **Dependencies**: Requires bash shell and Python

## Assets

### /assets/images/
- **Purpose**: Directory for image assets
- **Notable Feature**: Most assets are procedurally generated at runtime rather than stored as files

## Version Control

### GitHub Repository
- **URL**: https://github.com/k-newton/Vampire-Smash
- **Created**: March 11, 2025 (00:43)
- **Purpose**: Version control and project sharing
- **Contents**: Complete codebase including all source files and documentation

## Progress Log

This section logs changes to files over time:

### March 11, 2025 (00:43)
- Created GitHub repository for the project
- Updated documentation with repository information
- Set up initial commit with complete codebase

### March 8, 2025 (23:30)
- Completely refactored the title screen implementation with a container-based approach:
  - Created a single container to hold all title elements for proper alignment
  - Used a single text element for "VAMPIRE SMASH" rather than splitting it
  - Directly drew the filigree decorations in the container's coordinate space
  - Properly centered the subtitle below the title
  - Simplified positioning by using container-relative coordinates
  - Removed the complex and error-prone split-text approach

### March 8, 2025 (23:00)
- Fixed title screen layout issues for better visual alignment:
  - Adjusted the "V" position to align better with "AMPIRE SMASH"
  - Changed text anchoring to improve spacing between title components
  - Repositioned subtitle for proper alignment with the V
  - Enhanced filigree decorations with more pronounced curves and details
  - Fine-tuned all positioning values for a more cohesive look

### March 8, 2025 (22:30)
- Implemented authentic Castlevania logo styling elements:
  - Added decorative filigree to left and right sides of the title bar
  - Created specialized "V" in title that extends beyond the red background
  - Repositioned subtitle to appear to the right of the bottom of the "V"
  - Removed horizontal divider line
  - Added new drawFiligree method to create ornamental decorations
  - Separated title into two text objects for proper layout and sizing

### March 8, 2025 (22:00)
- Further refined MenuScene to better match Castlevania title screen:
  - Changed title to a less vibrant, darker purple (#663399)
  - Redesigned the red background with beveled 3D effect and shine
  - Added top highlight and bottom shadow to the red banner
  - Changed "PRESS START BUTTON" to a more muted gold color (#cc9900)
  - Adjusted stroke colors for improved contrast and authenticity

### March 8, 2025 (21:30)
- Refined MenuScene to better match client preferences:
  - Changed title color to purple with reduced shadow effects
  - Made the red background span the entire title width
  - Reverted subtitle to "SYMPHONY OF DESTRUCTION"
  - Changed background to dark gray instead of blue/purple theme
  - Removed flickering torch decorations for cleaner look
  - Updated copyright text to light yellow with slightly larger font
  - Kept the gold "PRESS START BUTTON" and instructions button

### March 8, 2025 (20:15)
- Enhanced MenuScene to closer match Castlevania: Symphony of the Night title screen:
  - Added metallic gradient effect to the game title
  - Changed subtitle to "SYMPHONY OF THE NIGHT" with improved styling
  - Enhanced background with textured dark stone effect
  - Changed "PRESS START BUTTON" to gold/yellow color
  - Improved copyright text visibility
  - Adjusted overall color palette to better match the original Castlevania aesthetic

### March 8, 2025 (19:30)
- Finalized enhanced physics system in vampire-smash.html:
  - Implemented stable physics with perfect forward momentum
  - Set 200px guaranteed minimum bounce height using physics formula v = sqrt(2*g*h)
  - Applied maximum speed limit (1000 units) with percentage display
  - Created reliable bounce height tracking and display system
  - Fixed all reference errors for stable gameplay
  - Ensured consistent physics across all collision types (ground, enemies)
  - Established 80% horizontal velocity reduction on each ground contact
  - Set game end threshold at 50 units of horizontal speed

### March 8, 2025 (18:00)
- Fixed critical player reference error:
  - Corrected variable references in update method from `player` to `this.player`
  - Fixed scope issues in bounce height tracking code
  - Resolved "Uncaught ReferenceError: player is not defined" error
  - Properly distinguished between player parameter in callback functions and class property

### March 8, 2025 (17:15)
- Further improved bounce mechanics:
  - Fixed bounce height display to consistently show valid measurements
  - Added tracking for the last valid bounce height to prevent display from resetting to zero
  - Applied minimum bounce height rule to enemy collisions
  - Added buffer zones to prevent premature bounce tracking termination
  - Improved tracking algorithm reliability and fixed edge cases

### March 8, 2025 (16:30)
- Improved bounce mechanics:
  - Fixed inconsistent bounce height tracking and display
  - Implemented minimum bounce height of 200 pixels
  - Added physics-based calculations to ensure minimum height is achieved
  - Improved bounce tracking algorithm for more reliable measurements

### March 8, 2025 (15:45)
- Updated game UI and mechanics:
  - Simplified bounce height display to show only the most recent bounce
  - Implemented maximum speed limit (1000 units)
  - Added speed percentage display showing current speed as a percentage of maximum
  - Adjusted color coding thresholds based on percentage of maximum speed

### March 8, 2025 (14:30)
- Updated game UI:
  - Removed speedometer gauge bar, replaced with text-only display
  - Added bounce height display showing current and maximum bounce heights
  - Relocated bounce height tracking to vampire-smash.html for better visibility

### March 8, 2025 (12:15)
- Added bounce height display to game UI:
  - Added tracking for current and maximum bounce heights
  - Created UI elements to display bounce metrics
  - Added code to reset bounce tracking on ground contact
  - Enhanced the update loop to calculate bounce heights in real-time

### March 8, 2025 (11:30)
- Fixed physics acceleration issue:
  - Removed all horizontal velocity boosts when hitting enemies
  - Ensured player only maintains existing momentum rather than accelerating
  - Fixed collision handlers to prevent unwanted speed increases

### March 8, 2025 (10:45)
- Updated physics system to ensure forward-only momentum:
  - Modified `vampire-smash.html` to prevent backward bouncing when hitting gummies
  - Updated `groundBounce` function to ensure player only moves forward
  - Updated `Enemy.js` squish function to prevent negative x velocity

### March 8, 2025 (10:00)
- Updated MenuScene to match Castlevania: Symphony of the Night aesthetic:
  - Modified `vampire-smash.html` to implement red title logo similar to Castlevania
  - Added "SYMPHONY OF DESTRUCTION" subtitle and gothic divider line
  - Changed start button to "PRESS START BUTTON" with pulsing animation
  - Added new instructions button and modal with Gothic styling
  - Updated copyright text to "© 2025 - 8 O'CLOCK - ALL RIGHTS RESERVED"
  - Added decorative elements (torches, ornate borders) matching the Castlevania style

### March 7, 2025 (17:55)
- Renamed standalone-game-new.html to vampire-smash.html for clarity
- Updated index.html to reference the new file name

### March 7, 2025 (17:50)
- Updated documentation to reflect file structure simplification:
  - Renamed game to "Vampire Smash"
  - Removed unused/redundant files (BootScene.js, PreloadScene.js, etc.)
  - Updated file references throughout documentation
  - Simplified HTML structure to use vampire-smash.html as main game file
  
### March 7, 2025 (17:40)
- Created initial documentation files:
  - `/docs/project-structure.md`: Overview of project architecture and systems
  - `/docs/file-documentation.md`: Detailed documentation of individual files

### March 7, 2025
- Updated `/js/scenes/MenuScene.js`: Enhanced UI with Castlevania-style aesthetics
- Changed game title to "Vampire Smash" and removed subtitle

### March 5, 2025
- Updated `/js/scenes/GameScene.js`: Redesigned with Super Nintendo Castlevania-style aesthetics
- Updated `/js/scenes/ShopScene.js`: Added gothic UI elements to match new visual theme
- Updated `/js/config.js`: Temporarily removed PreloadScene to fix loading issues
- Updated `/js/entities/Player.js`: Added global variable to ensure accessibility

### March 4, 2025
- Updated `/standalone-game.html`: Combined all code for distribution
- Created `/standalone-game-new.html`: New version with upgrades system 

### March 9, 2025 (14:30)
- Redesigned game over screen in vampire-smash.html:
  - Implemented Castlevania-inspired styling to match the title screen aesthetic
  - Added red beveled banner with filigree decorations for the Game Over text
  - Created a styled results panel showing distance traveled and bones collected 
  - Replaced colored rectangular buttons with gothic-styled text buttons
  - Added hover effects that match the main menu style
  - Organized UI elements in containers for better alignment and consistency
  - Updated "Gummies" text to "Bones" to match the game's theme
  - Implemented proper depth layering and improved visual hierarchy
  - Enhanced background opacity for better readability of game over elements 

### March 9, 2025 (15:45)
- Fixed issues with game over screen in vampire-smash.html:
  - Fixed interactive buttons that weren't responding to clicks
  - Changed "Bones" to "Enemies Defeated" for better clarity
  - Removed container-based approach that was causing interaction problems
  - Added proper depth and scroll factors to all UI elements
  - Ensured proper saving of game progress
  - Added debug console logs to verify button functionality
  - Simplified filigree decorations to improve performance
  - Updated button positioning for better visual spacing 

### March 10, 2025 (12:00)
- Performed comprehensive documentation review:
  - Verified all file references are accurate
  - Confirmed file descriptions match current implementation
  - Validated documented features against actual game mechanics
  - Ensured all recent UI changes are properly documented
  - Updated timestamps to maintain documentation currency