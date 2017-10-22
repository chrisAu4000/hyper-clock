import { curry } from 'crocks'
import { h } from 'hyperapp'
import Navigation from '../app/Navigation'

const Layout = (navigation) => {
	return (
		<div class="app">
			<header class="header">
				{ navigation }
			</header>
			<aside class="aside"></aside>
			<main class="main"></main>
			<footer class="footer"></footer>
		</div>
	)
}

export default Layout