import './App.css'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import NotFoundPage from './pages/NotFoundPage'
import { AuthContextProvider } from './components/AuthContext'

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<RootLayout />}>
				{/* <Route index element={<EmailListPage />} />
				<Route path="c/:emailCategory" element={<EmailListPage />} />
				<Route path="c/:emailId" element={<EmailPage />} />

				<Route element={<RedirectIfLoggedIn />}>
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Route> */}

				<Route path="*" element={<NotFoundPage />} />
			</Route>
		)
	)

	return (
		<>
			<AuthContextProvider>
				<RouterProvider router={router} />
			</AuthContextProvider>
		</>
	)
}

export default App
