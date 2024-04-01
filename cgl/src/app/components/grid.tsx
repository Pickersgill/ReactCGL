import styles from "./components.module.css";
import Cell from "./cell";

export default function Grid(props: {grid: boolean[][], clickHandler: (x: number, y: number) => void}) {
	const {grid, clickHandler} = props;
	return (
		<div className={styles.grid}>
			{grid.map((x: boolean[],i: number) => 
				<div key={i}>
					{
						x.map((alive: boolean, j: number) => <Cell alive={alive} onClick={() => clickHandler(j,i)} key={i*grid.length+j}/>)
					}
					<br/>
				</div>
			)}
		</div>
	);
}
