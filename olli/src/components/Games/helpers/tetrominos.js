export const TETROMINOS = {
    0: { shape: [[0]], color: '0, 0, 0' },
    I: {
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        color: '0, 255, 255'
    },
    J: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0]
        ],
        color: '0, 0, 255'
    },
    L: {
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L']
        ],
        color: '255, 153, 51'
    },
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O']

        ],
        color: '255, 255, 36'
    },
    S: {
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0]
        ],
        color: '0, 255, 0'
    },
    T: {
        shape: [
            [0, 'T', 0],
            ['T', 'T', 'T'],
            [0, 0, 0]
        ],
        color: '127, 0, 255'
    },
    Z: {
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0]
        ],
        color: '255, 0, 0'
    },


}
export const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino =
        tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randTetromino];
}