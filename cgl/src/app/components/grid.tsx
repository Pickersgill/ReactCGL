import Cell from "./cell";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";

export default function Grid(props: {density: number, play: boolean, grid: boolean[][], clickHandler: any}) {
	let grid_style = {
		display: "grid",
		width: "604px",
		height: "604px",
		gridTemplateColumns: "repeat(10, 60px)",
		gridTemplateRows: "repeat(10, 60px)",
		border: "2px solid black",
	};

	return (
		<div style={grid_style}>
			{props.grid.map((x: boolean[],i: number) => 
				<div key={i}>
					{
						x.map((alive: boolean, j: number) => <Cell alive={alive} onClick={() => props.clickHandler(j,i)} key={i*props.grid.length+j}/>)
					}
					<br/>
				</div>
			)}
		</div>
	);
}
