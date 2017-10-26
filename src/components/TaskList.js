import { h } from 'hyperapp'
import TaskListItem from './TaskListItem'

const TaskList = ({ tasks, onclick }) => (
	<ul class="task-list">
		{
			tasks.map(task =>
				<TaskListItem
					onclick={ onclick }
					id={ task.id }
					name={task.name}
					duration={task.duration}
					pause={task.pause}
				/>
			)
		}
	</ul>
)

export default TaskList