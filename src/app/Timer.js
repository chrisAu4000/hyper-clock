import { getHours, getMinutes, getSeconds, getMilliseconds, format } from '../lib/time'
import { periode } from '../lib/async-helpers'
import Async from 'crocks/Async'
import Pair from 'crocks/Pair'
import assign from 'crocks/helpers/assign'
// humanReadableTime : Int -> Pair Array String
const humanReadableTime =
	ms => Pair([], format)
		.ap(Pair([], getHours(ms)))
		.ap(Pair([], getMinutes(ms)))
		.ap(Pair([], getSeconds(ms)))
		.ap(Pair([], getMilliseconds(ms)))
// clearInterval : State -> Async Error State
const clearInterval =
	state => Async((rej, res) => {
		state.interval && window.clearInterval(state.interval)
		res(assign({ interval: null }, state))
	})
// clearInterval : State -> ... Async Error State
const start = 
	state => state.timer_started === true
		? Async.of(state)
		: periode(200, 'timer', state.timer_speed, state)
			.map(([delta, interval]) => ({
				timer: state.timer + delta,
				interval: interval,
				timer_started: interval !== null
			}))
			.map(state => Pair([state], state.timer).chain(humanReadableTime))
			.map(p => assign({ formated: p.snd() }, p.fst()[0]))
// stop : State -> Async Error State
const stop = 
	state => clearInterval(state)
		.map(state => assign({ timer_started: false }, state))
// reset : State -> Async Error State
const reset = 
	state => state.timer_started === true
		? Async.of(state)
		: Async.of({ timer: 0, formated: format(0, 0, 0, 0) })

const Timer = {
	start, stop, reset
}

export default Timer