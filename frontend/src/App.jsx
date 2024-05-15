import './App.css'
import { useContext } from 'react'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Outlet,
	RouterProvider,
	useLocation,
} from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import EmailListPage from './pages/emailList/EmailListPage'
import EmailPage from './pages/emailPage/EmailPage'
import ComposePage from './pages/compose/ComposePage'
import { Navigate } from 'react-router-dom'
import { AuthContext, AuthContextProvider } from './components/AuthContext'

const ProtectedRoute = () => {
	const location = useLocation()
	const { user, initialLoading } = useContext(AuthContext)

	if (initialLoading) return null

	if (user !== null) {
		return <Outlet />
	}

	return user ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ next: location.pathname }} />
	)
}

const RedirectIfLoggedIn = () => {
	const { user, initialLoading } = useContext(AuthContext)
	const { state } = useLocation()

	if (initialLoading) return null

	if (user !== null) {
		return <Navigate to={state?.next || '/c/inbox'} />
	}

	return <Outlet />
}

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<RootLayout />}>
				<Route index element={<Navigate to="/c/inbox" />} />

				<Route element={<ProtectedRoute />}>
					<Route path="c/:emailCategory" element={<EmailListPage />} />
					<Route path="c/:emailCategory/:emailId" element={<EmailPage />} />
					<Route path="compose" element={<ComposePage />} />
				</Route>

				<Route element={<RedirectIfLoggedIn />}>
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</Route>
		)
	)

	return (
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	)
}

export default App
