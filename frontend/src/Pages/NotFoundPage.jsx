import { Route, RouterProvider, useLocation } from 'react-router-dom'

const NotFoundPage = () => {
	const { state, pathname } = useLocation()

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
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
				}}>
				<h1>Page</h1>
				<h1
					style={{
						color: 'var(--gray)',
						maxWidth: '16rem',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}>
					{state?.url || (pathname == '404' ? '' : pathname)}
				</h1>
				<h1>Not Found</h1>
			</div>
		</div>
	)
}

export default NotFoundPage
