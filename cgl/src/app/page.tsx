'use client';
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Grid from "./components/grid";
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';

function randomGrid(density: number): boolean[][] {
	return new Array(10).fill(0)
	.map(() => new Array(10).fill(0)
	.map(() => Math.random() <= density));
}

function emptyGrid(): boolean[][] {
	return new Array(10).fill(0)
	.map(() => new Array(10).fill(0)
	.map(() => false));
}

function updateGridCell(grid: boolean[][], x: number, y: number, playing: boolean): boolean[][] {
	if (playing) {
		return grid;
	}
	let old = [...grid];
	old[y][x] = !old[y][x];
	return old;
}

function getNeighbours(grid: boolean[][], x: number, y: number): number {
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

function shouldLive(alive: boolean, neighbours: number): boolean {
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
function getNextGrid(grid: boolean[][]): boolean[][] {
	return grid
		.map((row, y) => row
			.map((alive, x) => shouldLive(alive, getNeighbours(grid, x, y)))
		)
}
export default function Home() {
	const [density, setDensity] = useState<number>(0.5);
	const [play, setPlay] = useState<boolean>(false);
	const [grid, setGrid] = useState<boolean[][]>(emptyGrid());
	const [refresh, setRefresh] = useState<boolean>(true);

	useEffect(function nextFrame() {
		if (refresh && play) {
			setGrid(getNextGrid(grid));
			setRefresh(false);
			setTimeout(() => setRefresh(true), 100);
		}
	}, [refresh, play]);

	return (
		<main className={styles.main}>
  			<div className={styles.description}>
				<h1> Conway's Game of Life... </h1>
  			</div>

    		<Stack direction={"row"} spacing={2}>
				<Button variant={"contained"} onClick={() => setPlay(!play)}> {play ? <PauseIcon/> : <PlayArrowIcon/>}</Button>
				<Button variant={"contained"} onClick={() => setGrid(randomGrid(density))} disabled={play}> <ReplayIcon/> </Button>
				<Button variant={"contained"} onClick={() => setGrid(emptyGrid())} disabled={play}> <DeleteIcon/> </Button>
				<Stack direction={"row"} spacing={2} padding={"5px"} width={"400px"} alignItems={"center"} sx={{border: 1, borderRadius: "16px"}}>
					<Typography gutterBottom>
						Density:
					</Typography>
					<Slider
						defaultValue={50} 
						onChange={(_, dens) => setDensity((dens as number/100))}
						min={0}
						max={100}
						step={1}
						disabled={play}
					/>
				</Stack>
			</Stack>
			<Grid grid={grid} clickHandler={(x, y) => setGrid(updateGridCell(grid, x, y, play))}/>
		</main>
	);
}
