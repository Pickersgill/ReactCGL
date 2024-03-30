export default function Cell(props: {alive?: boolean, onClick: () => any}) {
	let cell_style = {
		backgroundColor: props.alive ? "orange" : "white",
		width: "100%",
		height: "100%",
		textAlign: "center",
		border: "1px solid black"
	};

	return (
		<div style={cell_style} onClick={props.onClick}> </div>
	);
}
