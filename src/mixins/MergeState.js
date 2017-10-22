const MergeState = emit => ({
	events: {
		resolve(state, actions, result) {
			return update => update(assign({result}, state))
		}
	}
})

export default MergeState