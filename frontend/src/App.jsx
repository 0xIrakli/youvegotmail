import './App.css'
import { useContext } from 'react'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Outlet,
	RouterProvider,
} from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import { Navigate } from 'react-router-dom'
import { AuthContext, AuthContextProvider } from './components/AuthContext'

const RedirectIfLoggedIn = () => {
	const { user, initialLoading } = useContext(AuthContext)

	if (initialLoading) return null

	if (user !== null) {
		return <Navigate to="/c/inbox" />
	}

	return <Outlet />
}

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<RootLayout />}>
				{/* <Route index element={<EmailListPage />} />
				<Route path="c/:emailCategory" element={<EmailListPage />} />
				<Route path="c/:emailId" element={<EmailPage />} /> */}

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
