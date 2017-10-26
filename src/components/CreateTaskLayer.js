import { h } from 'hyperapp'

const CreateTaskLayer = ({ x, y, visible }) => (
	<div
		class={`task-edit ${visible === true ? 'visible' : ''}`}
		style={{ top: y, left: x }}
	>
		<input
			type="text"
			class="text-input text-input__visible task-edit-input"
			value=""
		/>
		<input
			type="range"
			class="input range-input task-edit-input"
			max="1000000"
			min="0"
			value="50000"
		/>
		<input
			type="range"
			class="input range-input task-edit-input"
			max="1000000"
			min="0"
			value="50000"
		/>
	</div>
)

export default CreateTaskLayer