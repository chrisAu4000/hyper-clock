import { h } from 'hyperapp'
const vbWidth = 120
const strokeWidth = 12
const visibleCirclePercentage = 100
const percentage = 10

const normalize = (countMax, count) => count / countMax

const stopButton = (state, { pause }) => (
	buttonWrapper([
		{ label: 'Stop', className: 'button button--primary button--success', clickHandler: pause },
	])
)

const CircularTimer = ({strokeWidth, offset, percent}) => {
	const width = 120
	const radius = (width - strokeWidth) / 2
	const circumference = radius * 2 * Math.PI
	const backgroundOffset = circumference - circumference * offset / 100
	const foregroundOffset = circumference - circumference * (percent / 100 * offset) / 100
	const styleBackground = {
		cx: width / 2,
		cy: width / 2,
		r: radius,
		'stroke-dasharray': circumference,
		'stroke-dashoffset': backgroundOffset
	}
	const styleForeground = {
		cx: width / 2,
		cy: width / 2,
		r: radius,
		'stroke-dasharray': circumference,
		'stroke-dashoffset': foregroundOffset
	}
	return (
		<div class="timer__circular">
			<svg class="timer-svg" viewBox={`0 0 ${width} ${width}`} style={{ transform: `rotate(-210)` }}>
				<circle class="timer-circle timer-background" style={styleBackground}/>
				<circle class="timer-circle timer-foreground" style={styleForeground} />
			</svg>
		</div>
	)
}

const startAndResetButtons = (state, { start, stop, resume }) => {
	if (state.milliseconds === 0) {
		return buttonWrapper([
			{ label: 'Start', className: 'button button--primary button--success', clickHandler: start.bind(null, { duration: 10000 }) }
		])
	} else if (state.milliseconds === state.duration) {
		return buttonWrapper([
			{ label: 'Reset', className: 'button button--primary', clickHandler: stop }
		])
	} else {
		return buttonWrapper([
			{ label: 'Start', className: 'button button--primary button--success', clickHandler: resume },
			{ label: 'Reset', className: 'button button--primary', clickHandler: stop }
		])
	}
}

const TimerButton = ({ label, onclick }) => (
	<button class="timer-button" onclick={onclick}>{label}</button>
)

const view = ({started, duration, milliseconds}) => {
	console.log(started)
	return (
		<div class="timer">
			<CircularTimer
				strokeWidth={12}
				offset={100}
				percent={normalize(duration, milliseconds) * 100} />
		</div>
	)
}

const test = (state) => <h1>{state.milliseconds}</h1>
module.exports = CircularTimer