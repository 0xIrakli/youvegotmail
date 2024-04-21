import { Route, RouterProvider } from 'react-router-dom'

const NotFoundPage = () => {
	return (
		<div
			style={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<h1>404</h1>
			<h1>page not found</h1>
		</div>
	)
}

export default NotFoundPage
