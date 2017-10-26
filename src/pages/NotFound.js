import { h } from 'hyperapp'
import Navigation from '../components/Navigation'

const NotFound = (state, actions) => (
	<div class="page">
		<Navigation onclick={actions.router.go} />
		<div class="not-found">
			<h1 class="h1__xxl">404</h1>
		</div>
	</div>
)

export default NotFound