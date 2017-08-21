import { h, app } from 'hyperapp'
import Router from './mixins/Router'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Counter from './pages/Counter'
import Arrow from 'crocks/Arrow'
import Timer from './app/Timer'
import Async from 'crocks/Async'
import Pair from 'crocks/Pair'	
import assign from 'crocks/helpers/assign'
import curry from 'crocks/helpers/curry'
import { format } from './lib/time'

app({
	root: document.getElementById('app'),
	state: { 
		timer: 0,
		interval: 0,
		formated: format(0, 0, 0, 0),
		timer_started: false,
		timer_speed: 10,
	},
	actions: {
		timer: {
			start: Timer.start,
			stop: Timer.stop,
			reset: Timer.reset,
		}
	},
  view: [
		["/", Layout(Home)],
		["#/counter", Layout(Counter)],
		["#/login", Layout(Login)],
		["*", state => <h1>404</h1>]
	],
	mixins: [Router, emit => ({
		events: {
			resolve(state, actions, result) {
				if (typeof result.fork === 'function') {
					return update => result.fork(
						console.error, 
						res => {
							console.log(res)
							return update(res)
						}
					)
				}
			}
		}
	})]
})

