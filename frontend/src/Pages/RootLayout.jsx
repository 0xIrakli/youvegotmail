import { Outlet } from 'react-router-dom'

const RootLayout = () => {
	return (
		<div>
			<header></header>
			<main>
				<Outlet />
			</main>
		</div>
	)
}

export default RootLayout
