export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    );


export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            if (player.tetromino[y][x] !== 0) {
                if (
                // Check that our move is inside the game areas height (y)
                // We shouldn't go through the bottom of the play area
                !stage[y + player.pos.y + moveY] ||
                // Check that our move is inside the game areas width (x)
                !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                // Check that the cell wer'e moving to isn't set to clear
                stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
                    'clear'
                ) {
                return true;
                }
            }
        }
    }
};