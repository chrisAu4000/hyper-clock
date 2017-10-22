import { h } from 'hyperapp'
import TaskListItem from './TaskListItem'

const TaskList = ({ tasks, onclick }, children) => (
	<ul class="task-list">
		{
			tasks.map(task => <TaskListItem
				onclick={ onclick.bind(null, task.id) }
				name={task.name}
				duration={task.duration}
				pause={task.pause} />
			)
		}
	</ul>
)

export default TaskList