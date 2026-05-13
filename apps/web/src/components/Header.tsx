import { Link } from "@tanstack/react-router";
import { Heart, Menu, X } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient, useSession } from "@/lib/auth-client";
import type { NavItem } from "@/types";
import { Button } from "./ui/button";

const navigationItems: NavItem[] = [
	{ title: "Product", href: "/#principles" },
	{ title: "How it works", href: "/#daily-loop" },
	{ title: "Pricing", href: "/#pricing" },
	{ title: "Trust", href: "/#safety" },
];

export function Header() {
	const [isOpen, setIsOpen] = React.useState(false);
	const { data: session, isPending } = useSession();

	return (
		<>
			<header className="relative z-50 w-full border-b border-border/30 bg-background/80 backdrop-blur-md">
				<div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
					{/* Logo */}
					<Link to="/" className="flex items-center gap-2.5 group">
						<div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm shadow-primary/20 group-hover:shadow-md group-hover:shadow-primary/30 transition-shadow">
							<Heart className="h-4 w-4 text-primary-foreground" />
						</div>
						<span className="font-bold text-lg tracking-tight">
							Echo
						</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-1">
						{navigationItems.map((item) => (
							<a
								key={item.title}
								href={item.href}
								className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
							>
								{item.title}
							</a>
						))}
					</nav>

					{/* Desktop Auth */}
					<div className="hidden md:flex items-center gap-3">
						{isPending ? (
							<div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
						) : session?.user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="relative h-9 w-9 rounded-full hover:bg-muted"
									>
										<Avatar className="h-8 w-8 border border-border/50">
											<AvatarImage
												src={session.user?.image || ""}
												alt={session.user?.name || ""}
											/>
											<AvatarFallback className="text-xs bg-primary/10 text-primary">
												{session.user?.name?.charAt(0) || "?"}
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-56 rounded-xl"
									align="end"
									forceMount
								>
									<DropdownMenuLabel className="font-normal p-3">
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-semibold leading-none">
												{session.user?.name}
											</p>
											<p className="text-xs leading-none text-muted-foreground">
												{session.user?.email}
											</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild className="rounded-lg cursor-pointer">
										<a href="/dashboard">Dashboard</a>
									</DropdownMenuItem>
									<DropdownMenuItem asChild className="rounded-lg cursor-pointer">
										<a href="/settings">Settings</a>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										className="rounded-lg cursor-pointer text-destructive focus:text-destructive"
										onClick={async () => {
											await authClient.signOut();
										}}
									>
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<>
								<Button
									variant="ghost"
									size="sm"
									className="text-sm font-medium hover:bg-muted/50"
									asChild
								>
									<Link to="/auth">Log in</Link>
								</Button>
								<Button
									variant="default"
									size="sm"
									className="text-sm font-semibold rounded-full px-5 shadow-sm"
									asChild
								>
									<Link to="/auth">Get Started</Link>
								</Button>
							</>
						)}
					</div>

					{/* Mobile Menu Toggle */}
					<div className="flex items-center gap-2 md:hidden">
						{session?.user && (
							<Avatar className="h-8 w-8 border border-border/50">
								<AvatarImage
									src={session.user?.image || ""}
									alt={session.user?.name || ""}
								/>
								<AvatarFallback className="text-xs bg-primary/10 text-primary">
									{session.user?.name?.charAt(0) || "?"}
								</AvatarFallback>
							</Avatar>
						)}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-muted/50 transition-colors"
						>
							{isOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>
			</header>

			{/* Mobile Menu Overlay */}
			{isOpen && (
				<div className="fixed inset-0 z-40 md:hidden">
					<div
						className="absolute inset-0 bg-background/80 backdrop-blur-sm"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute top-4 left-4 right-4 mt-14 bg-card border border-border/50 rounded-2xl shadow-xl p-6 space-y-1">
						{navigationItems.map((item) => (
							<a
								key={item.title}
								href={item.href}
								onClick={() => setIsOpen(false)}
								className="flex items-center px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-colors"
							>
								{item.title}
							</a>
						))}
						<div className="border-t border-border/50 pt-4 mt-4 space-y-3">
							{session?.user ? (
								<>
									<a
										href="/dashboard"
										onClick={() => setIsOpen(false)}
										className="flex items-center px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-colors"
									>
										Dashboard
									</a>
									<button
										onClick={async () => {
											await authClient.signOut();
											setIsOpen(false);
										}}
										className="w-full flex items-center px-4 py-3 text-base font-medium text-destructive hover:bg-destructive/5 rounded-xl transition-colors"
									>
										Log out
									</button>
								</>
							) : (
								<>
									<Link
										to="/auth"
										onClick={() => setIsOpen(false)}
										className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-colors"
									>
										Log in
									</Link>
									<Link
										to="/auth"
										onClick={() => setIsOpen(false)}
										className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-colors"
									>
										Get Started
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
