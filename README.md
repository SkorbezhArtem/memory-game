# Dota 2 Memory Game

A browser-based memory card matching game inspired by Dota 2. Players match pairs of iconic in-game items (Blink Dagger, Divine Rapier, Black King Bar, Aghanims Scepter, etc.) in the fewest moves possible.

Developed as part of the [RS School 2026Q3](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/memory-game).

## Demo
- [Live Demo](https://skorbezhartem.github.io/memory-game/) *(link will be updated upon deployment)*

## Features
- 4x4 card grid (16 cards, 8 unique item pairs).
- Random card shuffling on start and restart (Fisher-Yates shuffle algorithm).
- Move counter and matched pairs tracker (0 / 8).
- Turn logic: mismatched cards remain visible for ~1 second with board clicks locked during comparison.
- Victory modal displaying total moves and a quick restart option.
- Leaderboard: top-10 best runs stored in localStorage (sorted by lowest moves, then by earlier date DD.MM.YYYY).
- 'New Game' button: instantly resets the board and cancels any pending mismatch timers.
- 100% dynamic DOM generation via JavaScript (document.createElement), completely empty initial <body>.
- Pure Vanilla JavaScript and CSS, zero external libraries.

## Game Rules
1. Click a face-down card, then click a second one. Flipping two cards counts as one move.
2. If the items match, they remain face-up until the game ends.
3. If the items differ, they flip back after ~1 second.
4. The game is completed once all 8 pairs are found.

## Tech Stack
- HTML5
- CSS3 (CSS Grid, Flexbox, 3D card flip transforms)
- Vanilla JavaScript (ES6+ Modules, Web Storage API)

## Local Setup
Since the project uses ES Modules, it should be run via a local HTTP server:

1. Clone the repository and checkout the project branch:
```bash
git clone https://github.com/SkorbezhArtem/memory-game.git
cd memory-game
git checkout memory-game
```

2. Start a local server:
- **VS Code**: install the Live Server extension, right-click index.html → *Open with Live Server*.
- **Node.js**:
```bash
npx serve .
```
- **Python**:
```bash
python -m http.server 3000
```

## Author
- GitHub: [@SkorbezhArtem](https://github.com/SkorbezhArtem)