# Vampire Smash - A Castlevania-styled Burrito Bison Inspired Game

## Game Vision
Vampire Smash is a physics-based launcher game inspired by Burrito Bison with Castlevania aesthetic elements. Players catapult a character through a gothic world filled with skeletons and goblins, aiming to travel as far as possible while defeating enemies and maintaining momentum.

## Core Mechanics
- **Launch Mechanics**: Pull back and release to launch the character with varying power and angle
- **Bounce Physics**: Bounce height directly tied to horizontal speed - faster movement means higher bounces
- **Minimum Bounce Height**: Character always bounces at least 3x their height when speed is low
- **Slam Ability**: Tactical ground pound ability to maintain momentum even when hitting bare ground
- **Momentum Management**: Ground reduces momentum with each bounce, enemies preserve it
- **Defeat Enemies**: Earn bones (currency) by defeating skeletons and goblins with satisfying visual effects

## Technical Specifications
- Built with Phaser 3 (HTML5 game framework)
- Vanilla JavaScript implementation
- No external assets - all graphics are generated procedurally
- Responsive design that works in modern browsers
- Dynamic camera system that tracks both horizontal progress and vertical jumps

## Current Features
- **Character Controls**: Launch angle and power system, mid-air slam ability
- **Physics System**: Horizontal speed-based bouncing, momentum preservation, and collision detection
- **Procedural World**: Randomly generated enemy clusters spanning an extended world (50,000 units)
- **Enemies**: Skeletons and goblins that shatter or explode with particle effects when hit
- **Visual Effects**: Particle effects for launches, slams, bounces, and enemy defeats
- **Game States**: Start menu, gameplay, and game over screens
- **Persistence**: Local storage saving of player progress and currency
- **Castlevania Aesthetic**: Symphony of the Night-inspired title screen and gothic visual elements

## Progress Log

### March 10, 2025 (12:00)
- Performed comprehensive documentation review

### March 9, 2025 (15:45)
- Fixed issues with game over screen in vampire-smash.html
- Changed "Bones" to "Enemies Defeated" for better clarity
- Fixed interactive buttons that weren't responding to clicks

### March 9, 2025 (14:30)
- Redesigned game over screen with Castlevania-inspired styling

### March 8, 2025 (23:30)
- Completely refactored the title screen implementation with a container-based approach

### March 8, 2025 (19:30-23:00)
- Enhanced MenuScene to closer match Castlevania: Symphony of the Night title screen
- Implemented authentic Castlevania logo styling elements
- Improved title screen layout and visual elements

### March 8, 2025 (10:45-18:00)
- Updated physics system to ensure forward-only momentum
- Finalized enhanced physics system with perfect forward momentum
- Set 200px guaranteed minimum bounce height using physics formula
- Fixed critical player reference errors

### March 7, 2025
- Renamed to "Vampire Smash" and simplified file structure
- Updated UI with Castlevania-style aesthetics

### March 5, 2025
- Enemy Overhaul: Replaced gummy bears with skeletons and goblins
- Currency System Update: Renamed currency from "Gummies" to "Bones"
- Visual Improvements with detailed enemy designs

### March 4, 2025
- Implemented Upgrades System with shop interface
- Improved Game Mechanics with speed display and physics refinements

### March 3, 2025
- Enhanced Slam Mechanics to preserve momentum on ground impact
- Expanded world to 50,000 units with organized enemy clusters

## Running the Game
To run the game locally:
1. Clone the repository
2. Run `./run-game.command` to start a local server (Mac/Linux) or use your preferred web server
3. Open your browser and navigate to `http://localhost:8000`

---

*This README serves as a progress log and specifications document.*