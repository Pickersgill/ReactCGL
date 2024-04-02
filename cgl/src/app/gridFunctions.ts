export function randomGrid(density: number): boolean[][] {
	return new Array(10).fill(0)
	.map(() => new Array(10).fill(0)
	.map(() => Math.random() <= density));
}

export function emptyGrid(): boolean[][] {
	return new Array(10).fill(0)
	.map(() => new Array(10).fill(0)
	.map(() => false));
}

export function updateGridCell(grid: boolean[][], x: number, y: number, playing: boolean): boolean[][] {
	if (playing) {
		return grid;
	}
	let old = [...grid];
	old[y][x] = !old[y][x];
	return old;
}

export function getNeighbours(grid: boolean[][], x: number, y: number): number {
	let neighbourCount = 0;
	const h = grid.length;
	const w = grid[0].length;
	for (const dx of [-1,0,1]){
		let cx = x + dx;
		if (cx >= 0 && cx < w) {
			for (const dy of [-1,0,1]){
				let cy = y + dy;
				if (cy >= 0 && cy < h && !(dx === 0 && dy === 0)) {
					neighbourCount += grid[cy][cx] ? 1 : 0;
				}
			}
		}
	}
	return neighbourCount;
}

export function shouldLive(alive: boolean, neighbours: number): boolean {
	if (alive) {
		if (neighbours < 2) {
			return false;
		} else if (neighbours > 3) {
			return false;
		} else {
			return true;
		}
	} else {
		if (neighbours === 3) {
			return true;
		} else {
			return false;
		}
	}
}

export function getNextGrid(grid: boolean[][]): boolean[][] {
	return grid
		.map((row, y) => row
			.map((alive, x) => shouldLive(alive, getNeighbours(grid, x, y)))
		)
}
