import { h, app } from 'hyperapp'
import Async from 'crocks/Async'
import Pair from 'crocks/Pair'
import { List, curry, head, tail, assoc } from 'crocks'

import TimeSignal from './lib/TimeSignal'
import { printError } from './lib/IO'

import Router from './mixins/Router'
import Timer from './pages/Timer'
import NotFound from './pages/NotFound'
import updateTimer from './app/Timer/update'
import modelTimer from './app/Timer/model'

import BlurPage from './components/BlurPage'
import BlurPageLayer from './data/BlurPageLayer'
import Time from './components/Time'
import Navigation from './components/Navigation'
import TaskList from './components/TaskList'

import { merge, delay } from './lib/async-helpers'

const debug = msg => x => {
	console.log(msg, x)
	return x
}

const buttonLeftUp =
	({ button: {
		rotation: 45,
		pos: { x: '0px', y: '110px' } }
	})
const buttonDown =
	({ button: {
		rotation: 0,
		pos: { x: 'calc(50% - 35px)', y: '88%' } }
	})

const blockBackground =
	{ blurPage: {
		isBlocked: true,
		layer: () => BlurPageLayer.None } }
const unblockBackground =
	{ blurPage: {
		isBlocked: false,
		layer: () => BlurPageLayer.None } }

// showEditLayer :: Task -> Task
const initEditLayer =
	({ blurPage: {
		isBlocked: true,
		layer: (x) => BlurPageLayer.Edit('0px', '110px', false, x)
	} })
// taskById :: Id -> [ Task ] -> Maybe Task
const showEditLayer =
	({ blurPage: {
		isBlocked: true,
		layer: (x) => BlurPageLayer.Edit('0px', '110px', true, x)
	} })
const unshowEditLayer =
	({ blurPage: {
		isBlocked: true,
		layer: (x) => BlurPageLayer.Edit('0px', '110px', false, x)
	} })
const removeLayer = {
	blurPage: {
		isBlocked: true,
		layer: BlurPageLayer.None
	}
}

const animateEditState = () => merge([
	Async.of(blockBackground),
	Async.of(buttonLeftUp),
	Async.of(initEditLayer),
	delay('300', showEditLayer)
])

const editState = (tasks, taskId) => {
	return merge([
		Async.of({ tasks: taskById(taskId, tasks) }),
		animateEditState(head(taskById(taskId, tasks).fst()))
	])
}

const defaultState = () => merge([
	Async.of(unshowEditLayer),
	delay('300', removeLayer),
	delay('300', buttonDown),
	delay('300', unblockBackground)
])

const tasks = Pair([], [
	{ id: '1', name: 'Aask 1', duration: 1234, pause: 322 },
	{ id: '3', name: 'Cask 2', duration: 1234, pause: 322 },
	{ id: '4', name: 'Dask 3', duration: 1234, pause: 322 },
	{ id: '2', name: 'Bask 4', duration: 1234, pause: 322 },
	{ id: '5', name: 'Zask 5', duration: 1234, pause: 322 }
])

const taskById = curry(
	(id, tasks) => tasks.merge(
		(x, y) => Pair(
			x.concat(y).filter(t => t.id === id),
			x.concat(y).filter(t => t.id !== id)
		)
	)
)

const _sort = curry((sorter, all) => {
	const swap = (a, b, all) => all
		.map((x, i) => {
			if 			(i === a)	{ return all[b] }
			else if (i === b) { return all[a] }
			return x
		})
	const make2 = () => {

	}
	const make1 = (acc, all) => {
		acc.concat(all.length > 1
			? make2(acc)
			: make1(acc, tail(all).option([]))
		)
	}
	return make1([], all, x => x > 0)
})

console.log(tasks.snd())
console.log(_sort({}, tasks.snd()))
// TODO: make declarative
const sort = curry((acc, sorter, all) => {
	let result = all.map(x => x)
	for (let n=result.length; n>1; n=n-1) {
		for (let i=0; i<n-1; i=i+1) {
			if (sorter(result[i], result[i+1]) > 0) {
				let tmp = result[i]
				result[i] = result[i+1]
				result[i+1] = tmp
			}
		}
	}
	return result
})
const sortList = sort([ ])
const sortByName = sortList(curry(
	(a, b) => a.name.charCodeAt(0) > b.name.charCodeAt(0) ? 1 : -1))
console.log(sortByName(tasks.fst().concat(tasks.snd())))

const updateTask = curry(
	(prop, value, tasks) => head(tasks.fst())
		.map(assoc(prop, value))
		.either(
			() => tasks,
			task => Pair([ task ], tasks.snd())
		)
)

const main = () => app({
	root: document.getElementById('app'),
	state: Object.assign(modelTimer, {
		tasks: tasks,
		button: {
			rotation: 0,
			pos: {
				x: 'calc(50% - 35px)',
				y: '88%'
			}
		},
		blurPage: {
			isBlocked: false,
			layer: () => BlurPageLayer.None
		}
	}),
	actions: {
		timer: updateTimer,
		editState: (state, actions, taskId) => update =>
			editState(state.tasks, taskId)
				.fork(printError.run, update),
		defaultState: (state) => update =>
			defaultState(state.tasks)
				.fork(printError.run, update),
		updateTask: (state, actions, { prop, value }) => {
			switch (prop) {
			case 'Name':
				return { tasks: updateTask('name', value, state.tasks) }
			case 'Duration':
				return { tasks: updateTask('duration', value, state.tasks) }
			case 'Pause':
				return { tasks: updateTask('pause', value, state.tasks) }
			default:
				return { tasks: state.tasks }
			}
		}
	},
	events: {
		load: (state, { timer }) => {
			TimeSignal(1)
				.map(Math.floor)
				.map(dt => ({ interval: dt }))
				.fork(printError.run, timer.updateTime)
		},
	},
	mixins: [ Router ],
	view: [
		[ '/', (state, actions) => {
			console.log(state.tasks.fst(), state.tasks.snd())
			return (
				<BlurPage
					onclick={ actions.defaultState }
					oninput={ actions.updateTask }
					layer={ state.blurPage.layer(head(state.tasks.fst())) }
					buttonPosX={ state.button.pos.y }
					buttonPosY={ state.button.pos.x }
					buttonVal={ '+' }
					buttonRot={ state.button.rotation }
					isBlocked={ state.blurPage.isBlocked }
				>
					<Navigation onclick={actions.router.go} />
					<h1 class="h1__xxl">Tasks</h1>
					<div class="content button-playground">
						<TaskList
							tasks={
								sortByName(
									state.tasks.fst().concat(state.tasks.snd())
								)
							}
							onclick={ actions.editState }
						/>
					</div>
				</BlurPage>
			)
		} ],
		[ '#/timer', Timer ],
		[ '*', NotFound ]
	]
})

main()