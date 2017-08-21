import curry from 'crocks/helpers/curry'

const padL = curry(
	(c, max, str) => {
		return str.toString().length < max
			? padL(c, max, c + str)
			: str
	}
)
const padL0_2 = padL('0', 2)
const format = curry((h, m, s, ms) => `${h}:${m}:${padL0_2(s)}:${padL0_2(ms)}`)
const getMilliseconds = ms => ms % 100
const getSeconds = ms => Math.floor(ms / 100) % 60
const getMinutes = ms => Math.floor(ms / 6000) % 60
const getHours = ms => Math.floor(ms / 6000 / 60) % 24
const getDays = ms => ms / 6000 / 60 / 24

module.exports = { 
	format, 
	getMilliseconds, 
	getSeconds, 
	getMinutes, 
	getHours,
	getDays
}