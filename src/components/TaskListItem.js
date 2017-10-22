import { h } from 'hyperapp'

const TaskListItem = ({ onclick, id, name, duration, pause }) => (
	<li class="task" onclick={() => onclick()}>
		<p class="p task-name">{name}</p>
		<p class="p task-duration">{duration}</p>
		<p class="p task-pause">{pause}</p>
	</li>
)

export default TaskListItem