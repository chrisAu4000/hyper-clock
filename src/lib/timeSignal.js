const Async = require('crocks/Async')

const TimeSignal = (interval) => Async((rej, res) => {
	let last = 0
	let acc = 0
	const tick = timestamp => {
		const dt = timestamp - last
		last = timestamp
		acc = acc + dt
		if (last && acc >= interval) {
			res(acc)
			acc = 0
		}
		requestAnimationFrame(tick)
	}
	return requestAnimationFrame(tick)
})

export default TimeSignal