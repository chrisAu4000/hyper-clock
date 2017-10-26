import { h } from 'hyperapp'
import Time from './Time'
import { timeFormat } from '../pages/Timer'

const LabeledTime = ({ label, value }) => (
	<label class="time-label">{ label }
		<Time format={ timeFormat } msec={ value } />
	</label>
)

const TaskListItem = ({ onclick, id, name, duration, pause }) => (
	<li class="task" onclick={ () => onclick(id) }>
		<p class="p task-name">{ name }</p>
		<div class="task-subinfo">
			<div class="task-times">
				{LabeledTime({ label: 'Duration: ', value: duration })}
				{LabeledTime({ label: 'Pause: ', value: pause })}
			</div>
		</div>
	</li>
)

export default TaskListItem