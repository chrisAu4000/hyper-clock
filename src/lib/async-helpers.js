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

module.exports = {
	delay,
	periode
}