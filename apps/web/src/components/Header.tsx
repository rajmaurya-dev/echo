import { Link } from "@tanstack/react-router";
import { LayoutTemplate, Menu, Zap } from "lucide-react";
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
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { authClient, useSession } from "@/lib/auth-client";
import type { NavItem } from "@/types";
import { Button } from "./ui/button";

const navigationItems: NavItem[] = [
	{ title: "Features", href: "/#features" },
	{ title: "Pricing", href: "/#pricing" },
	{ title: "Documentation", href: "/#docs" },
];

export function Header() {
	const [isOpen, setIsOpen] = React.useState(false);
	const { data: session, isPending } = useSession();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
				{/* Logo - Left side */}
				<Link to="/" className="flex items-center space-x-2">
					<div className="flex items-center space-x-2">
						<div className="bg-primary p-2 rounded-lg">
							<Zap className="h-5 w-5 text-primary-foreground" />
						</div>
						<span className="font-bold text-xl hidden sm:block">
							SaaS Starter
						</span>
					</div>
				</Link>

				{/* Desktop Navigation - Center/Right side */}
				<div className="hidden md:flex items-center space-x-6">
					<nav className="flex items-center space-x-6 text-sm font-medium">
						{navigationItems.map((item) => (
							<Link
								key={item.title}
								to={item.href}
								className="transition-colors hover:text-foreground/80 text-foreground/60"
							>
								{item.title}
							</Link>
						))}
					</nav>

					<div className="flex items-center space-x-2 ml-6">
						{isPending ? (
							<div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
						) : session?.user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="relative h-8 w-8 rounded-full"
									>
										<Avatar className="h-8 w-8">
											<AvatarImage
												src={session.user?.image || ""}
												alt={session.user?.name || ""}
											/>
											<AvatarFallback>
												{session.user?.name?.charAt(0) || "?"}
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56" align="end" forceMount>
									<DropdownMenuLabel className="font-normal">
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-medium leading-none">
												{session.user?.name}
											</p>
											<p className="text-xs leading-none text-muted-foreground">
												{session.user?.email}
											</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<a href="/dashboard">Dashboard</a>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<a href="/settings">Settings</a>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={async () => {
											await authClient.signOut();
										}}
									>
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button variant="default" size="sm" asChild>
								<Link to="/auth">Get Started</Link>
							</Button>
						)}
					</div>
				</div>

				{/* Mobile Menu - Right side */}
				<div className="flex items-center space-x-2 md:hidden">
					{session?.user && (
						<Avatar className="h-8 w-8">
							<AvatarImage
								src={session.user?.image || ""}
								alt={session.user?.name || ""}
							/>
							<AvatarFallback>{session.user?.name?.charAt(0) || "?"}</AvatarFallback>
						</Avatar>
					)}
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="pr-6">
							<SheetHeader className="flex flex-col items-start">
								<SheetTitle>Menu</SheetTitle>
							</SheetHeader>
							<div className="my-4 h-[calc(100vh-8rem)] pb-10">
								<div className="flex flex-col space-y-4">
									{navigationItems.map((item) => (
										<div key={item.title}>
											<Link
												to={item.href}
												onClick={() => setIsOpen(false)}
												className="text-foreground/60 hover:text-foreground font-medium"
											>
												{item.title}
											</Link>
										</div>
									))}
									<div className="pt-4 border-t space-y-2">
										<a
											href="/dashboard"
											onClick={() => setIsOpen(false)}
											className="flex items-center text-foreground/60 hover:text-foreground font-medium mb-4"
										>
											<LayoutTemplate className="h-4 w-4 mr-2" />
											Dashboard
										</a>
										{session?.user ? (
											<Button
												variant="outline"
												className="w-full"
												onClick={async () => {
													await authClient.signOut();
													setIsOpen(false);
												}}
											>
												Log out
											</Button>
										) : (
											<Button variant="default" className="w-full" asChild>
												<Link to="/auth" onClick={() => setIsOpen(false)}>
													Get Started
												</Link>
											</Button>
										)}
									</div>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
