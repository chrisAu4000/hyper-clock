import { h } from 'hyperapp'
import Time from './Time'
import { timeFormat } from '../pages/Timer'

const RangeInput = ({ label, min, max, value, oninput }) => (
	<div class="range-group">
		<label class="range-input-label__active">{ label }</label>
		<input
			oninput={ (e) =>
				oninput({ prop: label, value: parseInt(e.target.value, 10) })
			}
			type="range"
			class="input range-input range-input__visible task-edit-input"
			max={ max }
			min={ min }
			value={ value }
		/>
		<span class="range-input-value">
			<Time format={ timeFormat } msec={ value } />
		</span >
	</div>
)

const EditTaskLayer = ({ x, y, visible, task, oninput }) => task.map(task =>
	<div
		class={`task-edit ${visible === true ? 'visible' : ''}`}
		style={{ top: y, left: x }}
	>
		<input
			oninput={ (e) => oninput({ prop: 'Name', value: e.target.value }) }
			type="text"
			class="text-input text-input__visible task-edit-input"
			value={ task.name }
		/>
		<div class="task-layer-ranges task-layer-ranges__horizontal">
			<RangeInput
				oninput={ oninput }
				min="0" max="10000"
				value={ task.duration }
				label="Duration"
			/>
			<RangeInput
				oninput={ oninput }
				min="0" max="10000"
				value={ task.pause }
				label="Pause"
			/>
		</div>
	</div>
).option('')

export default EditTaskLayer