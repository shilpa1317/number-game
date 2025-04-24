const container = document.getElementById('puzzle-container');
const statusText = document.getElementById('status');
let tiles = [];

function createTiles() {
    tiles = [];
    container.innerHTML = '';
    for (let i = 1; i <= 15; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.textContent = i;
        tile.addEventListener('click', () => moveTile(i));
        tiles.push(tile);
    }
    tiles.push(null); // the empty space
    renderTiles();
}

function renderTiles() {
    container.innerHTML = '';
    tiles.forEach(tile => {
        if (tile) {
            container.appendChild(tile);
        } else {
            const empty = document.createElement('div');
            empty.className = 'tile';
            empty.style.backgroundColor = 'transparent';
            container.appendChild(empty);
        }
    });
}

function moveTile(number) {
    const index = tiles.findIndex(t => t && t.textContent == number);
    const emptyIndex = tiles.indexOf(null);

    const validMoves = [
        emptyIndex - 1, emptyIndex + 1,
        emptyIndex - 4, emptyIndex + 4
    ];

    if (validMoves.includes(index)) {
        [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
        renderTiles();
        checkWin();
    }
}

function shuffleTiles() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    renderTiles();
    statusText.textContent = '';
}

function checkWin() {
    const numbers = tiles.map(t => (t ? parseInt(t.textContent) : null));
    const isWin = numbers.every((val, i) => val === (i < 15 ? i + 1 : null));
    if (isWin) statusText.textContent = '🎉 Puzzle Solved!';
}

document.getElementById('shuffle-btn').addEventListener('click', shuffleTiles);

createTiles();
