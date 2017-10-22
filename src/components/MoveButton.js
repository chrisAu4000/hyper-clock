import { h } from 'hyperapp'

const MoveButton = ({ onclick, x, y, value }) => (
	<a
		class="button success button-fixed button-fixed__round"
		onclick={onclick}
		style={{
			top: x,
			left: y,
		}}>
		{value}
	</a>
)

export default MoveButton