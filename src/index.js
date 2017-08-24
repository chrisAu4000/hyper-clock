import { h, app } from 'hyperapp'
import Fork from './mixins/Fork'
import Router from './mixins/Router'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Arrow from 'crocks/Arrow'
import Timer from './app/Timer'
import Async from 'crocks/Async'
import Pair from 'crocks/Pair'	
import assign from 'crocks/helpers/assign'
import curry from 'crocks/helpers/curry'
import { format } from './lib/time'

app({
	root: document.getElementById('app'),
	state: Timer.state,
	actions: {
		timer: {
			start: Timer.start,
			stop: Timer.stop,
			reset: Timer.reset,
		}
	},
  view: [
		["/", Layout(Home)],
		["#/counter", Layout(Timer.view)],
		["#/login", Layout(Login)],
		["*", state => <h1>404</h1>]
	],
	mixins: [Router, Fork]
})

