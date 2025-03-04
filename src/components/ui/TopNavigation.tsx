"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useRef, useState } from "react";
import { Bell, Menu, Search, Video } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppContext from "@/context/appContext";

const TopNavigation = () => {
	const [dialogOpen, setDialogOpen] = useState(false);

	const { setShowNav } = useContext(AppContext);

	const searchInputRef = useRef<HTMLInputElement>(null);

	const router = useRouter();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (searchInputRef.current) {
			const searchQuery = searchInputRef.current.value;

			setDialogOpen(false);
			router.push(`/search?q=${searchQuery}`);
		}
	};

	return (
		<nav className='fixed top-0 left-0 w-screen z-20 dark:bg-black bg-white'>
			<div className='flex justify-between items-center px-2 md:px-7 h-16'>
				
				{/* Top Icon and Name with Drop Down Menu */}
				<div className="flex items-center">
					<span className="hover:bg-background-dark/30 md:block hidden hover:text-white cursor-pointer rounded-full p-2 mr-1">
						<Menu onClick={() => setShowNav(prevState => !prevState)} size={30} />
					</span>
					<Link href="/" className="flex items-center space-x-2">
						<svg
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>YouTube</title>
							<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
						</svg>
						<span className='hidden md:block text-2xl font-bold'>ViTube</span>
					</Link>
				</div>

				{/* Search Bar */}
				<div className='md:flex items-center justify-center hidden'>
					<form
						onSubmit={handleSubmit}
						className="flex items-center h-10 mx-auto"
					>
						<input
							type='search'
							placeholder='Search'
							ref={searchInputRef}
							className="px-4 h-full md:w-48 lg:w-96 border dark:border-gray-50 border-gray-300 rounded-l-full focus:outline-none"
						/>
						<div className="h-full px-5 grid place-content-center bg-background-light text-black rounded-r-full">
							<Search />
						</div>
					</form>
				</div>

				{/* Channel Menu with Theme Toggle */}
				<div className="flex items-center space-x-7">
					<div className="md:hidden">
						<ThemeToggle />
					</div>
					<Video />
					<Bell />
					<div className="md:hidden">
						<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
							<DialogTrigger>
								<Search onClick={() => setDialogOpen(true)} />
							</DialogTrigger>

							<DialogContent>
								<form
									onSubmit={handleSubmit}
									className="flex items-center h-10 mx-auto"
								>
									<input
										type='search'
										placeholder='Search'
										ref={searchInputRef}
										className="px-4 h-full md:w-48 lg:w-96 border dark:border-gray-50 border-gray-300 rounded-l-full focus:outline-none"
									/>
									<div className="h-full px-5 grid place-content-center bg-background-light text-black rounded-r-full">
										<Search />
									</div>
								</form>
							</DialogContent>
						</Dialog>
					</div>

					<div className="hidden md:block">
						<DropdownMenu>
							<DropdownMenuTrigger className="focus:outline-none">
								<Avatar>
									<AvatarImage src='/pro_pic.jpg' alt='Vimal' />
									<AvatarFallback>?</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-72">
								<DropdownMenuLabel>
									<div className="flex space-x-4">
										<Avatar>
											<AvatarImage src='/pro_pic.jpg' alt='Vimal' />
											<AvatarFallback>?</AvatarFallback>
										</Avatar>

										<div className="flex flex-col space-y-3 text-base">
											<span>
												<p>Vimal Ramnarain</p>
												<p>@vimalramnarain</p>
											</span>
											<Link href={`/channels/${process.env.NEXT_PUBLIC_CHANNEL_ID}`} className="text-blue-500">
												View your channel
											</Link>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<div className="p-2 flex items-center">
									<span className="mr-2">Appearance: </span> <ThemeToggle />
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default TopNavigation;