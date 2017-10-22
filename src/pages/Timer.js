import { h } from 'hyperapp'
import curry from 'crocks/helpers/curry'

import Navigation from '../components/Navigation'
import Time from '../components/Time'
import Timer from '../app/Timer/view'

import padL from '../lib/padL'

const padL0 = padL('0')
const padL02 = padL0(2)
const padL03 = padL0(3)
const timeFormat = curry(
	(h, m, s, ms) => `${h}:${m}:${padL02(s)}:${padL03(ms)}`
)

const TimerPage = (state, actions) => (
	<div class="page">
		<div class="content">
			<Navigation onclick={actions.router.go} />
			<div class="timer">
				<h1 class="h1 h1__xxl">Timer</h1>
				<Timer
					strokeWidth={12}
					offset={100}
					percent={state.milliseconds / state.duration * 100}
				/>
				<Time format={timeFormat} msec={state.milliseconds} />
				<div class="button-group button-group__centered">
					<div class="buttons">
						{
							state.milliseconds < state.duration
								? state.started === false
									? <button class="button success" onclick={actions.timer.start.bind(null, { duration: 10000 })}>Start</button>
									: <button class="button warning" onclick={actions.timer.pause}>Stop</button>
								: ''
						}
						{
							state.started === false && state.milliseconds !== 0
							&& <button class="button" onclick={actions.timer.stop}>Reset</button>
						}
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default TimerPage