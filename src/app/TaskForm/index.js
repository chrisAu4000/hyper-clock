import view from './view'
import assoc from 'crocks/helpers/assoc'
import assign from 'crocks/helpers/assign'
import isNumber from 'crocks/predicates/isNumber'
import isBoolean from 'crocks/predicates/isBoolean'

const state = {
	inputs: [
		{ type: 'text', label: 'Task-name', id: 'name', value: '', action: 'changeTaskName' },
		{ type: 'range', label: 'Duration', id: 'duration', value: 0, min: 0, max: 100, action: 'changeTaskName' },
		{ type: 'range', label: 'Pause', id: 'pause', value: 0, min: 0, max: 100, action: 'changeTaskName' }
	]
}

const assignToTaskForm = fn => (state, actions, params) =>
	assoc('taskForm', fn(state.taskForm, actions, params), state)

const emptyValue = (val) => {
	if (isNumber(parseInt(val))) {
		return 0
	} else if (isBoolean(val)) {
		return false
	} else {
		return ''
	}
}

const emptyForm = (state, actions, event) => {
	return {
		inputs: state.inputs.map(input => assoc('value', emptyValue(input.value), input))
	}
}

const changeTaskName = (state, actions, event) => {
	const value = event.target.value
	const inputId = event.target.id
	const inputs = state.inputs.map(
		input => input.id === inputId
			? assign({ value }, input)
			: input
	)
	return assign({ inputs }, state)
}

const serialize = inputs => inputs.reduce((acc, curr) => assoc(curr.id, curr.value, acc), {})

const addTask = (state, actions, event) => {
	event.preventDefault()
	console.log(actions)
	const taskList = actions.taskList.addTask(serialize(state.taskForm.inputs))
	window.location.hash = ''
	return {
		taskForm: emptyForm(state.taskForm, actions, event),
		taskList
	}
}

const actions = [
		changeTaskName,
	]
	.map(assignToTaskForm)
	.concat(addTask)

export default { view, state, actions }