import { h } from 'hyperapp'
import TaskListItem from '../TaskListItem'

const test = x => console.log(x)

const TaskList = ({ taskList }, actions) => (
	<div class="task-list">
		<h1 class="headline_xxl">Tasks</h1>
		<button class="button button--primary button--primary_round  button--success align-center">
			<a href="#/addTask">+</a>
		</button>
		<div class="task-list-wrapper">
			<ul class="task-list--list">
			{ 
				taskList.tasks.map(TaskListItem(actions.taskList.removeTask, test))
			}
			</ul>
			{
				taskList.tasks.length === 0 && 'Tasklist is empty'
			}
		</div>
	</div>
)

export default TaskList