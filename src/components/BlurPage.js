import { h } from 'hyperapp'
import MoveButton from './MoveButton'
import EditTaskLayer from './EditTaskLayer'

const BlurPage =({
	onclick,
	oninput,
	buttonPosX,
	buttonPosY,
	buttonVal,
	buttonRot,
	isBlocked,
	layer
},
children) => (
	<div class="page" >
		<div class={ `layer layer__1 ${ isBlocked ? 'page__blocked' : '' }`}>
			<MoveButton
				onclick={ onclick }
				x={ buttonPosX }
				y={ buttonPosY }
				value={ buttonVal }
				rotation={ buttonRot }
			/>
			{
				layer.cata({
					Edit:
						(x, y, v, t) => <EditTaskLayer
							x={ x }
							y={ y }
							visible={ v }
							task={ t }
							oninput={ oninput }
						/>,
					Create:
						(x, y, v) => <TaskCreateLayer
							x={ x }
							y={ y }
							visible={ v }
							oninput={ oninput }
						/>,
					None: () => ''
				})
			}
		</div>
		<div class={ `layer ${isBlocked ? 'page__blocked blur' : '' }`}>
			{ children }
		</div>
	</div>
)

export default BlurPage