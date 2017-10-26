import { h } from 'hyperapp'

const MoveButton = ({ onclick, x, y, rotation, value }) => (
	<a
		class="button success button-fixed button-fixed__round"
		onclick={onclick}
		style={{
			top: x,
			left: y,
			transform: `rotate(${ rotation }deg)`
		}}>
		{value}
	</a>
)

export default MoveButton