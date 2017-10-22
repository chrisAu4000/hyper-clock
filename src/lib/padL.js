const curry = require('crocks/helpers/curry')

const padL = curry((c, max, str) =>
	str.toString().length < max ? padL(c, max, c + str) : str)

export default padL