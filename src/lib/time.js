import curry from 'crocks/helpers/curry'

const padL = curry(
	(c, max, str) => {
		return str.toString().length < max
			? padL(c, max, c + str)
			: str
	}
)

const getMilliseconds = ms => ms % 1000
const getSeconds = ms => Math.floor(ms / 1000) % 60
const getMinutes = ms => Math.floor(ms / 60000) % 60
const getHours = ms => Math.floor(ms / 60000 / 60) % 24
const getDays = ms => ms / 60000 / 60 / 24

module.exports = {
	getMilliseconds,
	getSeconds,
	getMinutes,
	getHours,
	getDays,
}