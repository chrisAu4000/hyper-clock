import { h } from 'hyperapp'
import MoveButton from './MoveButton'
// 
const oncreate = (el) => setTimeout(() => el.classList.add('visible'), 500)
const onremove = (el) => {
	el.classList.remove('visible')
	setTimeout(() => {
		el.parentElement.removeChild(el)
	}, 500)
}
/* <input type="text" class="text-input text-input__visible task-edit-input" value={task.name} />
	<input
		type="range"
		class="input range-input task-edit-input"
		max="1000000"
		min="0"
		value={task.duration}
	/> */
const TaskEditLayer = ({ x, y, task }) => (
	<div
		class="task-edit"
		oncreate={ oncreate }
		onremove={ onremove }
		style={{ top: y, left: x }}
	>
		<input
			type="text"
			class="text-input text-input__visible task-edit-input"
			value={task.name}
		/>
		<input
			type="range"
			class="input range-input task-edit-input"
			max="1000000"
			min="0"
			value={task.duration}
		/>
	</div>
)

const BlurPage =({
	onclick,
	buttonPosX,
	buttonPosY,
	buttonVal,
	isBlocked,
	status,
	task
},
children) => {
	console.log(status)
	return (
	<div class="page" >
		<div class={ `layer layer__1 ${ isBlocked ? 'page__blocked' : '' }`}>
			<MoveButton
				onclick={ onclick }
				x={ buttonPosX }
				y={ buttonPosY }
				value={ buttonVal }
			/>
			{
				status === 'edit'
					? <TaskEditLayer
						x={ buttonPosX }
						y={ buttonPosY }
						task={ task[0] }
					/>
					: undefined
			}
		</div>
		<div class={ `layer ${isBlocked ? 'page__blocked blur' : '' }`}>
			{ children }
		</div>
	</div>
)}

export default BlurPage