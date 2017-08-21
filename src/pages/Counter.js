import { h } from 'hyperapp'

const seconds = (date) => new Date(date).getSeconds()

const Counter = (state, actions) => (
	<div>
		<h1>Counter {state.formated}</h1>
		<button onclick={actions.timer.start}>Start</button>
		<button onclick={actions.timer.stop}>Stop</button>
		<button onclick={actions.timer.reset}>Reset</button>
	</div>
)

export default Counter