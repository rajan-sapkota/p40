import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/underdogs.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const navigation = [
	{ name: "Home", href: "/home" },
	{ name: "About", href: "/about" },
	{ name: "Gallery", href: "/gallery" },
	{ name: "Walk Dogs", href: "/walkdogs" },
	{ name: "Donate", href: "/donate" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar({ onLogout }) {
	const location = useLocation();
	const currentPage = location.pathname;
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Check localStorage for token on component mount
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		// Show the toast message
		toast.success("You have been logged out successfully!");

		// Redirect to the login page after a short delay
		setTimeout(() => {
			window.location.href = "/login";
		}, 1500);
	};

	return (
		<Disclosure as="nav" className="text-yellow-500 shadow-md">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-24">
					<div className="flex items-center">
						<img
							alt="P40 Dog Logo"
							src={logo}
							className="h-20 w-auto mr-4 mb-8"
						/>
					</div>

					<div className="hidden sm:flex sm:space-x-6 mb6 text-large">
						{navigation.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className={classNames(
									item.href === currentPage
										? "bg-white text-maroon-700"
										: "text-white hover:bg-yellow-500 hover:text-red-950",
									"px-4 py-2 rounded-md text-xl font-bold"
								)}
								aria-current={item.href === currentPage ? "page" : undefined}
							>
								{item.name}
							</a>
						))}

						{/* Show Profile only if logged in */}
						{isLoggedIn && (
							<a
								href="/myprofile"
								className={classNames(
									"/myprofile" === currentPage
										? "bg-white text-maroon-700"
										: "text-white hover:bg-yellow-500 hover:text-red-950",
									"px-4 py-2 rounded-md text-xl font-bold"
								)}
							>
								Profile
							</a>
						)}

						{/* Show Login only if not logged in */}
						{!isLoggedIn && (
							<a
								href="/login"
								className={classNames(
									"/login" === currentPage
										? "bg-white text-maroon-700"
										: "text-white hover:bg-yellow-500 hover:text-red-950",
									"px-4 py-2 rounded-md text-xl font-bold"
								)}
							>
								Login
							</a>
						)}

						{/* Logout button if logged in */}
						{isLoggedIn && (
							<button
								onClick={handleLogout}
								className="px-4 py-2 bg-yellow-500 text-red-950 rounded-md text-2xl font-bold shadow-md hover:bg-yellow-400"
							>
								Logout
							</button>
						)}
					</div>

					<div className="flex sm:hidden">
						<DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-yellow-500 hover:bg-gray-300 focus:outline-none">
							<Bars3Icon className="block h-8 w-8" aria-hidden="true" />
							<XMarkIcon className="hidden h-8 w-8" aria-hidden="true" />
						</DisclosureButton>
					</div>
				</div>
			</div>

			<DisclosurePanel className="sm:hidden">
				<div className="px-4 pt-4 pb-4 space-y-2">
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as="a"
							href={item.href}
							className={classNames(
								item.href === currentPage
									? "bg-white text-yellow-500"
									: "text-pink-400 hover:bg-gray-300",
								"block px-4 py-2 rounded-md text-xl font-semibold"
							)}
							aria-current={item.href === currentPage ? "page" : undefined}
						>
							{item.name}
						</DisclosureButton>
					))}

					{/* Show Profile only if logged in */}
					{isLoggedIn && (
						<DisclosureButton
							as="a"
							href="/myprofile"
							className={classNames(
								"/myprofile" === currentPage
									? "bg-white text-yellow-500"
									: "text-black hover:bg-gray-300",
								"block px-4 py-2 rounded-md text-xl font-semibold"
							)}
						>
							Profile
						</DisclosureButton>
					)}

					{/* Show Login only if not logged in */}
					{!isLoggedIn && (
						<DisclosureButton
							as="a"
							href="/login"
							className={classNames(
								"/login" === currentPage
									? "bg-white text-yellow-500"
									: "text-black hover:bg-gray-300",
								"block px-4 py-2 rounded-md text-xl font-semibold"
							)}
						>
							Login
						</DisclosureButton>
					)}

					{/* Logout button if logged in */}
					{isLoggedIn && (
						<button
							onClick={handleLogout}
							className="w-full bg-yellow-500 text-red-950 px-4 py-2 rounded-md text-2xl font-semibold shadow-md hover:bg-yellow-400"
						>
							Logout
						</button>
					)}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
