import AuthLayout from "./_auth/AuthLayout";
import { SignInForm, SignUpForm } from "./_auth/forms";
import RootLayout from "./_root/RootLayout";
import {
	AllUsers,
	CreatePost,
	EditPost,
	Explore,
	Home,
	PostDetails,
	Profile,
	Saved,
	UpdateProfile,
} from "./_root/pages";
import "./globals.css";
import { Routes, Route } from "react-router-dom";
function App() {
	return (
		<main className="flex h-screen">
			<Routes>
				{/* public */}
				<Route element={<AuthLayout />}>
					<Route path="/sign-in" element={<SignInForm />} />
					<Route path="/sign-up" element={<SignUpForm />} />
				</Route>

				{/* private */}
				<Route element={<RootLayout />}>
					<Route index element={<Home />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/saved" element={<Saved />} />
					<Route path="/all-users" element={<AllUsers />} />
					<Route path="/create-post" element={<CreatePost />} />
					<Route path="/update-post/:id" element={<EditPost />} />
					<Route path="/posts/:id" element={<PostDetails />} />
					<Route path="/profile/:id/*" element={<Profile />} />
					<Route path="/update-profile/:id" element={<UpdateProfile />} />
				</Route>
			</Routes>
		</main>
	);
}

export default App;
