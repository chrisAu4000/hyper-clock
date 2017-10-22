import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'

const Navigation = ({onclick}) => (
	<nav class="navbar">
		<ul class="navbar-list">
			<li class="navbar-item">
				<Link class="navbar-link" to={"#"} go={onclick}>Home</Link>
			</li>
			<li class="navbar-item">
				<Link class="navbar-link" to={"#/timer"} go={onclick}>Timer</Link>
			</li>
		</ul>
	</nav>
)

export default Navigation