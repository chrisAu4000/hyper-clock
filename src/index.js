import { h, app } from 'hyperapp'
import curry from 'crocks/helpers/curry'

import TimeSignal from './lib/TimeSignal'

import Router from './mixins/Router'
import Timer from './pages/Timer'
import updateTimer from './app/Timer/update'
import modelTimer from './app/Timer/model'

import BlurPage from './components/BlurPage'
import Time from './components/Time'
import Navigation from './components/Navigation'
import TaskList from './components/TaskList'
import TaskListItem from './components/TaskListItem'


const main = () => app({
	root: document.getElementById('app'),
	state: Object.assign(modelTimer, { 
		tasks: [
			{ id: '1', name: 'TAsk 1', duration: 1234, pause: 322 },
			{ id: '2', name: 'TAsk 1', duration: 1234, pause: 322 },
			{ id: '3', name: 'TAsk 1', duration: 1234, pause: 322 },
			{ id: '4', name: 'TAsk 1', duration: 1234, pause: 322 },
			{ id: '6', name: 'TAsk 1', duration: 1234, pause: 322 }
		],
		button: {
			pos: {
				x: 'calc(50% - 35px)',
				y: '88%'
			}
		},
		blurPage: {
			pageBlocked: false,
			status: undefined,
			data: []
		}
	}),
	actions: {
		timer: updateTimer,
		button: {
			pos: (state, actions, { x, y }) =>
				({ button: { pos: { x: x, y: y } } })
		},
		blurPage: {
			block: (state, actions, isBlocked) =>
				({ blurPage: { isBlocked: isBlocked } }),
			status: (state, actions, { status, taskId }) => ({
				blurPage: {
					status: status, 
					isBlocked: status === 'edit' || status === 'create'
						? true
						: false,
					data: state.tasks.filter(task => task.id === taskId)
				}
			})
		}
	},
	events: {
		load: (state, actions) => {
			TimeSignal(1)
				.map(Math.floor)
				.map(dt => ({ interval: dt }))
				.fork(console.error, actions.timer.updateTime)
		},
	},
	mixins: [ Router ],
	view: [
		[ '/', (state, actions) => {

			return (
				<BlurPage
					onclick={() => {
						actions.button.pos({ x: 'calc(50% - 35px)', y: '88%' })
						actions.blurPage.status({ status: 'default' })
					}}
					status={ state.blurPage.status }
					task={ state.blurPage.data }
					buttonPosX={ state.button.pos.y }
					buttonPosY={ state.button.pos.x }
					buttonVal={ '+' }
					isBlocked={ state.blurPage.isBlocked }
				>
					<Navigation onclick={actions.router.go} />
					<h1 class="h1__xxl">Tasks</h1>
					<div class="content button-playground">
						<TaskList
							tasks={ state.tasks }
							onclick={(taskId) => {
								actions.button.pos({ x: '0px', y: '110px' })
								actions.blurPage.status({ status: 'edit', taskId: taskId })
							} }
						/>
					</div>
				</BlurPage>
			)
		} ],
		[ '#/timer', Timer ],
		['*', (state, actions) => (
			<div class="page">
				<Navigation onclick={actions.router.go} />
				<div class="not-found">
					<h1 class="h1__xxl">404</h1>
				</div>
			</div>
		) ]
	]
})

main()


// app({
// 	root: document.getElementById('app'),
// 	state: {
// 		timer: Timer.state, 
// 		navigation: Navigation.state,
// 		taskList: TaskList.state,
// 		taskForm: TaskForm.state
// 	},
// 	actions: {
// 		timer: {
// 			start: Timer.start,
// 			stop: Timer.stop,
// 			reset: Timer.reset,
// 		},
// 		taskList: {
// 			addTask: _addTask,
// 			removeTask: removeTask
// 		},
// 		taskForm: {
// 			changeTaskName: changeTaskName,
// 			addTask: addTask
// 		}
// 	},
// view: [
// 	["/", Layout(Navigation.view, TaskList.view)],
// 	['#/addTask', Layout(Navigation.view, TaskForm.view)],
// 	["#/clock", Layout(Navigation.view, Timer.view)],
// 	["#/login", Layout(Navigation.view, Login)],
// 	["*", state => <h1>404</h1>]
// ],
// mixins: [Router, Fork]
// })

// console.log(a)
