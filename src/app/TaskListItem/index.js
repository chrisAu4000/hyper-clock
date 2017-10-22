import { h } from 'hyperapp'
import { secondsToTimeStr } from '../../lib/time'

const LabeledTime = ({label, value}) => (
	<label class="time-label">{label}
		<span class="time-value">{secondsToTimeStr(value)}</span>
	</label>
)

const TaskListItem = (onDelete, test) => ({ id, name, duration, pause }) => {
	return (
	<li class="task-list--item">
		<div class="task" onclick={ test }>
			<h3 class="task-name">{name}</h3>
			<div class="task-subinfo">
				<div class="task-times">
					{	LabeledTime({ label: 'Duration: ', value: duration }) }
					{ LabeledTime({ label: 'Pause: ', value: pause }) }
				</div>
				<button 
					class="delete button button--primary button--primary_round button--error align-right"
					onclick={e => onDelete(id)}
					>-</button>
			</div>
		</div>
	</li>
)
}
export default TaskListItem