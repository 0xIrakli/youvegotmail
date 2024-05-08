import { Route, RouterProvider } from 'react-router-dom'

const NotFoundPage = () => {
	return (
		<div
			style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				paddingTop: '15%',
			}}>
			<h1>404</h1>
			<h1>Page Not Found</h1>
		</div>
	)
}

export default NotFoundPage
