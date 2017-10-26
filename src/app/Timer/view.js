import { h } from 'hyperapp'

const CircularTimer = ({ strokeWidth, offset, percent }) => {
	const width = 120
	const radius =
		(width - strokeWidth) / 2
	const circumference =
		radius * 2 * Math.PI
	const backgroundOffset =
		circumference - circumference * offset / 100
	const foregroundOffset =
		circumference - circumference * (percent / 100 * offset) / 100
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
			<svg
				class="timer-svg"
				viewBox={`0 0 ${width} ${width}`}
				style={{ transform: 'rotate(-210)' }}
			>
				<circle
					class="timer-circle timer-background"
					style={styleBackground}
				/>
				<circle
					class="timer-circle timer-foreground"
					style={styleForeground}
				/>
			</svg>
		</div>
	)
}

module.exports = CircularTimer