import { curry } from 'crocks'
import { h } from 'hyperapp'

const Layout = curry((page, state, actions) => {
	return (
		<div class="app">
			<header class="header">
				<nav class="nav">
					{state.router.goto}
					<ul>
						<li>
							<a href="#">home</a>
						</li>
						<li>
							<a href="#/login">login</a>
						</li>	
						<li>
							<a href="#/counter">clock</a>
						</li>
					</ul>
				</nav>
			</header>
			<aside class="aside"></aside>
			<main class="main">
				{page(state, actions)}
			</main>
			<footer class="footer"></footer>
		</div>
	)
})

export default Layout