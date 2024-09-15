const cards = [
    '🏀', '🏀',
    '⚽️', '⚽️',
    '🏈', '🏈',
    '🎾', '🎾',
    '🏐', '🏐',
    '🥋', '🥋',
    '🛹', '🛹',
    '🏄', '🏄',
];

let firstcard = null;
let secondcard = null;
let lockboard = false;

// Função de embaralhamento corrigida
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // Correção aqui
    }
}

function createboard() {
    const gameBoard = document.querySelector('.game-board');
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.icon = card;
        cardElement.addEventListener('click', flipcard);  // Correção aqui

        gameBoard.appendChild(cardElement);
    });
}

function flipcard() {
    if (lockboard) return;
    if (this === firstcard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.icon;

    if (!firstcard) {
        firstcard = this;
        return;
    }
    secondcard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstcard.dataset.icon === secondcard.dataset.icon) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstcard.removeEventListener('click', flipcard);
    secondcard.removeEventListener('click', flipcard);
    resetBoard();
}

function unflipCards() {
    lockboard = true;
    setTimeout(() => {
        firstcard.classList.remove('flipped');
        secondcard.classList.remove('flipped');
        firstcard.textContent = '';
        secondcard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstcard, secondcard, lockboard] = [null, null, false];
}

document.getElementById('reset-button').addEventListener('click', () => {
    document.querySelector('.game-board').innerHTML = '';  // Reiniciar tabuleiro
    createboard();
});

createboard();