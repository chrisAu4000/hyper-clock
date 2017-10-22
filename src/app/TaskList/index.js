import view from './view'
import assoc from 'crocks/helpers/assoc'
import assign from 'crocks/helpers/assign'

const state = {
	tasks: [{ id: 0, name: 'task', duration: 300, pause: 30 }],
}

const assignToTaskList = fn => (state, actions, params) => 
	assoc('taskList', fn(state.taskList, actions, params), state)

const addTask = (state, actions, task) => {
	console.log(state)
	const id = state.taskList.tasks.length
	const newTasks = [assign({ id }, task)].concat(state.taskList.tasks)
	return assign({ tasks: newTasks }, state.taskList)
}

const removeTask = (state, actions, id) => {
	console.log(id)
	const newTasks = state.taskList.tasks.filter(task => task.id !== id)
	return {taskList: assign({ tasks: newTasks }, state.taskList)}
}

const actions = [
	addTask,
	removeTask
]//.map(assignToTaskList)

const TaskList = { view, state, actions }
export default TaskList