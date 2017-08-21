import { curry } from 'crocks'
import { h } from 'hyperapp'

const Layout = curry((page, state, actions) => {
	return (
		<div className="">
			<header>
				<nav>
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
			<aside></aside>
			<main>
				{page(state, actions)}
			</main>
			<footer></footer>
		</div>
	)
})

export default Layout