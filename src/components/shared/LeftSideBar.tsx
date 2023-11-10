import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { MouseEvent, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";
const LeftSideBar = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { user, setIsAuthenticated, setUser } = useUserContext();
	const { mutate: signOut, isSuccess } = useSignOutAccount();

	useEffect(() => {
		if (isSuccess) navigate(0);
	}, [isSuccess]);

	const handleSignOut = (
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		console.log(e);
		e.preventDefault();
		signOut();
		setIsAuthenticated(false);
		setUser(INITIAL_USER);
		navigate("/sign-in");
	};
	return (
		<nav className="leftsidebar">
			<div className="flex flex-col gap-11">
				<Link to="/" className="flex gap-3 items-center">
					<img
						src="/public/assets/images/logo.svg"
						alt="logo"
						width={130}
						height={325}
					/>
				</Link>
				<div className="flex gap-3">
					<Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
						<img
							src={
								user.imageUrl || "/public/assets/icons/profile-placeholder.svg"
							}
							alt="profile"
							className="h-14 w-14 rounded-full"
						/>
					</Link>
					<div className="flex flex-col">
						<p className="body-bold">{user.name}</p>
						<p className="small-regular text-light-3">@{user.username}</p>
					</div>
				</div>

				<ul>
					{sidebarLinks.map((link: INavLink) => {
						const isActive = pathname === link.route;
						return (
							<li
								key={link.label}
								className={`leftsidebar-link group ${
									isActive && "bg-primary-500"
								}`}>
								<NavLink
									to={link.route}
									className="flex gap-4 items-center p-4">
									<img
										alt={link.label}
										src={link.imgURL}
										className={`group-hover:invert-white ${
											isActive && "invert-white"
										}`}
									/>
									{link.label}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>
			<Button
				variant="ghost"
				className="shad-button_ghost"
				onClick={(e) => handleSignOut(e)}>
				<img src="/assets/icons/logout.svg" alt="logout" />
				<p className="small-medium lg:base-medium">Logout</p>
			</Button>
		</nav>
	);
};

export default LeftSideBar;
