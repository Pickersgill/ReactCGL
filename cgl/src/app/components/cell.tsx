export default function Cell(props: {alive?: boolean}) {
	return (
		<div style={{display: "inline", backgroundColor: props.alive ? "yellow" : "white"}}> cell </div>
	);
}
