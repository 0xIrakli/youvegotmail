import { Outlet } from 'react-router-dom'
import { Header } from '../components/UI/Header/Header'

const RootLayout = () => {
	return (
		<div>
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	)
}

export default RootLayout
