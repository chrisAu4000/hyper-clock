import { h } from 'hyperapp'
import curry from 'crocks/helpers/curry'
import { secondsToTimeStr } from '../../lib/time'

const FormGroup = ({className}, children) => (
	<div class={`form-group ${className}`}>
		{ children }
	</div>
)

const TextInput = ({ id, label, value, oninput }) => (
	<input type="text" class="text-input" id={id} value={value} oninput={oninput} required />
)

const RangeInput = actions => ({ id, label, value, min, max, action }) => (
	<div class="form-group">
		<input
			type="range"
			class={`range-input blue ${value !== 0 ? 'range-input__visible' : ''}`}
			id={id}
			value={value}
			min={min}
			max={max}
			oninput={actions[action]} />
		<label for={id} class="range-input-label">{label}</label>
		<span class="range-input-value">{ secondsToTimeStr(value) }</span>
	</div>
)

const everyText = (inputs) => inputs
	.filter(input => input.type === 'text')
	.map(input => input.value.length)
	.reduce((acc, curr) => acc && curr > 0, true)

const isType = curry((type, a) => a.type === type)

const TaskForm = ({ taskForm }, actions) => {
	console.log(actions)
	return (
	<div class="task-form">
		<h1 class="headline_xxl">Add Task</h1>
		<form action="#" class="task-form form-vertical" onsubmit={ actions.taskForm.addTask }>
			<input
				type="submit"
				class={`button button--primary button--primary_round ${everyText(taskForm.inputs) ? '' : 'button--primary_round__invisible'} button--success form-align-right`}
				value="+">
			</input>
			{
				taskForm.inputs
					.filter(isType('text'))
					.map(({ id, label, value, action }) => (
						<FormGroup className=''>
							<TextInput id={id} value={value} oninput={actions[action]}/>
							<label for={id} class="text-input-label">	{label}</label>
						</FormGroup>)
					)
			}		
			<FormGroup className='form-group__three-row'>

			</FormGroup>
			
			{
				taskForm.inputs
					.filter(isType('range'))
					.map(RangeInput(actions.taskForm))
			}
		</form>
	</div>
)
}
export default TaskForm