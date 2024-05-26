import { Outlet } from 'react-router-dom'
import { Header } from '../components/UI/Header/Header'

const RootLayout = () => {
	return (
		<>
			<Header />
			<main style={{ paddingBlock: '1rem' }}>
				<Outlet />
			</main>
		</>
	)
}

export default RootLayout
