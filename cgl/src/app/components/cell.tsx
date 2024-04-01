import styles from "./components.module.css";

export default function Cell({alive, onClick}: {alive?: boolean, onClick: () => void}) {
	const cellStyle = {
		backgroundColor: alive ? "orange" : "white",
	};
	return <div className={styles.cell} style={cellStyle} onClick={onClick}/>;
}
