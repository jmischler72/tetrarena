import { ColorEnum, GameStateDTO, Tetrimino as TetriminoDTO } from '@jmischler72/core';
import { Block, GameState, Tetrimino, PlayerState } from '../schemas/PlayerState';
import { MapSchema } from '@colyseus/schema';

function blocksToMatrix(blocks: Block[]): ColorEnum[][] {
	const maxX = Math.max(...blocks.map((block) => block.x)) + 1;
	const maxY = Math.max(...blocks.map((block) => block.y)) + 1;

	const matrix: ColorEnum[][] = Array.from({ length: maxY }, () => Array(maxX).fill(ColorEnum.NONE));

	blocks.forEach((block) => {
		matrix[block.y][block.x] = block.value;
	});

	return matrix;
}

function toTetriminoDTO(tetrimino: Tetrimino): TetriminoDTO {
	return {
		id: tetrimino.id,
		position_x: tetrimino.x,
		position_y: tetrimino.y,
		rotation: tetrimino.rotation,
		color: tetrimino.color,
	};
}

export function toGameStateDTO(player: GameState): GameStateDTO {
	return {
		board: blocksToMatrix(player.board),
		currentTetrimino: toTetriminoDTO(player.currentTetrimino),
		shadowTetrimino: toTetriminoDTO(player.shadowTetrimino),
		score: player.score,
		nextTetriminos: player.nextTetriminos,
		isGameOver: player.isGameOver,
		linesId: player.linesId,
	};
}

export function matrixToBlocks(matrix: number[][]) {
	const blocks: Block[] = [];

	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			const block = new Block();
			block.value = matrix[y][x];
			block.x = x;
			block.y = y;
			blocks.push(block);
		}
	}
	return blocks;
}

export function getOpponents(
	currentPlayer: PlayerState | undefined,
	players: MapSchema<PlayerState, string> | undefined,
) {
	if (!players || !currentPlayer) return [];
	let opps: PlayerState[] = [];
	players.forEach((otherPlayer) => {
		if (currentPlayer !== otherPlayer) opps.push(otherPlayer);
	});

	return opps;
}
