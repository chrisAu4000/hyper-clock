import { h } from 'hyperapp'

const circleFerence = r => r * 2 * 3.14
const normalize = (countMax, count) => count / countMax
const toCircle = (max, curr, mul) => (normalize(max, curr) * mul)

const Timer = (state, actions) => (
	<div class="timer">
		<h1 class="headline_xxl">Timer</h1>
		<svg class="timer-clock">
			<circle style={
				{
					'stroke-dasharray': toCircle(state.countMax, state.count, circleFerence(90)) + ' ' + (circleFerence(90))
				}
			} />
			<p class="timer-clock-time">{state.formated}</p>
		</svg>
		<p>{ state.formated }</p>
		{ state.count === 0 || state.started === false
			? <button class="button button--primary button--success" onclick={actions.timer.start}>Start</button>
			: <button class="button button--primary button--success button--success_disabled" onclick={actions.timer.start}>Start</button> 
		}
		{ state.started
			? <button class="button button--primary button--success" onclick={actions.timer.stop}>Stop</button>
			: <button class="button button--primary button--success button--success_disabled" onclick={actions.timer.stop}>Stop</button>
		}
		{ state.count === state.countMax
			? <button class="button button--primary" onclick={actions.timer.reset}>Reset</button>
			: <button class="button button--primary button_disabled" onclick={actions.timer.reset}>Reset</button>
		}
	</div>
)

export default Timer