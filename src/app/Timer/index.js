const { app } = require('hyperapp')
const model = require('./model')
const update = require('./update')
const view = require('./view')

const Timer = (root) => app({
	root: root,
	state: model,
	actions: update,
	events: {
		// load: (state, actions) => actions.updateTime({ interval: 10 }),
		updateTime: (state,actions, data) => actions.updateTime(data),
		start: (state, actions, data) => actions.start(data),
		reverse: (state, actions, data) => actions.reverse(data),
		stop: (state, actions, data) => actions.stop(data),
		pause: (state, actions, data) => actions.pause(data),
		resume: (state, actions, data) => actions.resume(data)
	},
	view: view
})

module.exports = Timer