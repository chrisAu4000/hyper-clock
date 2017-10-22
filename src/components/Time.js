const { h } = require('hyperapp')
const Identity = require('crocks/Identity')
const curry = require('crocks/helpers/curry')

const getMilliseconds = ms => ms % 1000
const getSeconds = ms => Math.floor(ms / 1000) % 60
const getMinutes = ms => Math.floor(ms / 60000) % 60
const getHours = ms => Math.floor(ms / 60000 / 60) % 24
const getDays = ms => ms / 60000 / 60 / 24
const secondsToTimeStr = curry((format, msec) =>
	Identity(format)
		.ap(Identity(getHours(msec)))
		.ap(Identity(getMinutes(msec)))
		.ap(Identity(getSeconds(msec)))
		.ap(Identity(getMilliseconds(msec)))
)
		
const Time = ({ format, msec }) => <p class="timer-value">{secondsToTimeStr(format, msec).value() }</p>

export default Time