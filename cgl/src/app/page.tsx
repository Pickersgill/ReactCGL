'use client';
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Cell from "./components/cell";

function randomGrid(density: number) {
	return new Array(10).fill(0)
	.map(() => new Array(10).fill(0)
	.map(() => Math.random() >= density));
}
export default function Home() {
	const [density, setDensity] = useState(0.5);
	const [play, setPlay] = useState(true);
	const [refresh, setRefresh] = useState(true);
	const [grid, setGrid] = useState(randomGrid(density));

	useEffect(function nextFrame() {
			if (refresh && play) {
				setGrid(randomGrid(density));
				setRefresh(false);
				setTimeout(() => setRefresh(true), 500);
			}
		}, [refresh]);
	
	return (
		<main className={styles.main}>
  			<div className={styles.description}>
				<b> words </b>
  			</div>
			{grid
			.map((x,i) => <div key={i}>{x.map((alive, j) => <Cell alive={alive} key={i*grid.length+j}/>)}<br/></div>)}
			{/*
				React Fragment, <> </>; way of encapsulating multiple react components.
			*/}
		</main>
	);
}
