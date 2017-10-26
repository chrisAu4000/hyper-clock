import { taggedSum } from 'daggy'

const Layer = taggedSum('Overlay', {
	Edit: 	[ 'x', 'y', 'v', 't' ],
	Create: [ 'x', 'y', 'v' ],
	None: 	[ ]
})

export default Layer