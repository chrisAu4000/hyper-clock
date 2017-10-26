import { h } from 'hyperapp'
import { timeFormat } from '../../pages/Timer'

const LabeledTime = ({ label, value }) => (
	<label class="time-label">{ label }
		<span class="time-value">{ value }</span>
	</label>
)

const TaskListItem = ({ onclick, id, name, duration, pause }) => (
	<li class="task-list--item">
		<div class="task" onclick={ () => onclick(id) }>
			<h3 class="task-name">{ name }</h3>
			<div class="task-subinfo">
				<div class="task-times">
					{	LabeledTime({ label: 'Duration: ', value: duration }) }
					{ LabeledTime({ label: 'Pause: ', value: pause }) }
				</div>
			</div>
		</div>
	</li>
)

export default TaskListItem