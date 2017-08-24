const Fork = emit => ({
	events: {
		resolve(state, actions, result) {
			return typeof result.fork === 'function'
				? update => result.fork(console.error,update)
				: update => update(result)
		}
	}
})

export default Fork