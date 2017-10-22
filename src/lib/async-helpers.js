import Async from 'crocks/Async'
import curry from 'crocks/helpers/curry'
// delay : Integer -> a -> Async Error a
const delay = curry((delay, x) => Async((rej, res) => {
	const interval = setTimeout(() => {
		return res(x)
	}, delay)
}))
// periode : Integer -> String -> Integer -> State -> ... Async Error State
const periode = curry((max, key, delay, state) => Async((rej, res) => {
	let i = 0
	let interval = window.setInterval(() => {
		if (max <= i + state[key]) {
			res([i, null])
			window.clearInterval(interval)
		} else {
			i += 1
			res([i, interval])
		}
	}, delay)
}))
const interval = (period, cancel) => {
	if (cancel.inspect() !== 'Async Function') {
		throw new Error('cancel must be of type Async.')
	}

	let i = 0
	const startInterval = (rej, res) => {
		const interval = window.setInterval(() => {
			i += 1
			res(i)
		}, period)
		cancel.fork && cancel.fork(
			error => rej,
			resolve => window.clearInterval(interval)
		)
	}
	return Async((rej, res) => interval === null
		? res(i)
		: startInterval(rej, res)
	)
}

interval(500, delay(2000, ''))
	.map(i => ({index: i}))

const merge = asyncs => Async((rej, res) => {
	asyncs.forEach(async => async.fork(rej, res))
})

module.exports = {
	delay,
	interval,
	periode,
	merge
}