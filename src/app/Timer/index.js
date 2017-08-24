import { getHours, getMinutes, getSeconds, getMilliseconds, format } from '../../lib/time'
import { periode } from '../../lib/async-helpers'
import Async from 'crocks/Async'
import Pair from 'crocks/Pair'
import assign from 'crocks/helpers/assign'
import view from './view'
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
		state.interval_id && window.clearInterval(state.interval_id)
		res(assign({ interval_id: null }, state))
	})
// clearInterval : State -> ... Async Error State
const start = 
	state => state.started === true
		? Async.of(state)
		: periode(state.countMax, 'count', state.interval, state)
			.map(([delta, interval_id]) => ({
				count: state.count + delta,
				interval_id: interval_id,
				started: interval_id !== null
			}))
			.map(state => Pair([state], state.count).chain(humanReadableTime))
			.map(p => assign({ formated: p.snd() }, p.fst()[0]))
// stop : State -> Async Error State
const stop = 
	state => clearInterval(state)
		.map(state => assign({ started: false }, state))
// reset : State -> Async Error State
const reset = 
	state => state.started === true
		? Async.of(state)
		: Async.of({ count: 0, formated: format(0, 0, 0, 0) })

const state = {
	count: 0,
	countMax: 300,
	interval_id: 0,
	formated: format(0, 0, 0, 0),
	started: false,
	interval: 10,
	startButtonState: 'enabled'
}
const Timer = {
	state, start, stop, reset, view
}

export default Timer