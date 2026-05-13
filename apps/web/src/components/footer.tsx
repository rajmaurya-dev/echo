import { Link } from "@tanstack/react-router";
import { Github, Heart, Linkedin, Mail, Twitter } from "lucide-react";
import type { FooterSection } from "@/types";

const productLinks: FooterSection[] = [
	{
		title: "Product",
		links: [
			{ title: "Principles", href: "/#principles" },
			{ title: "How it works", href: "/#daily-loop" },
			{ title: "Pricing", href: "/#pricing" },
			{ title: "Trust & Safety", href: "/#safety" },
		],
	},
	{
		title: "Company",
		links: [
			{ title: "Contact us", href: "/contact-us" },
			{ title: "Start chatting", href: "/auth" },
		],
	},
	{
		title: "Legal",
		links: [
			{ title: "Privacy Policy", href: "/privacy-policy" },
			{ title: "Terms of Service", href: "/terms-and-conditions" },
			{ title: "Delete Account", href: "/delete-account" },
		],
	},
];

const socialLinks = [
	{ icon: Twitter, href: "https://twitter.com", label: "Twitter" },
	{ icon: Github, href: "https://github.com", label: "GitHub" },
	{ icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
	return (
		<footer className="relative border-t border-border/50 bg-muted/[0.03]">
			{/* Gradient top border */}
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
				{/* Main Footer Content */}
				<div className="py-16 lg:py-20">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
						{/* Brand Column */}
						<div className="lg:col-span-5 space-y-6">
							<Link to="/" className="inline-flex items-center gap-2.5 group">
								<div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm shadow-primary/20 group-hover:shadow-md group-hover:shadow-primary/30 transition-shadow">
									<Heart className="h-4.5 w-4.5 text-primary-foreground" />
								</div>
								<span className="font-bold text-xl tracking-tight">Echo</span>
							</Link>

							<p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
								Your personal AI companion that remembers you. Built for
								emotional continuity, meaningful conversations, and healthy
								boundaries.
							</p>

							{/* Social Links */}
							<div className="flex items-center gap-3 pt-2">
								{socialLinks.map((social) => (
									<a
										key={social.label}
										href={social.href}
										target="_blank"
										rel="noreferrer"
										aria-label={social.label}
										className="w-10 h-10 rounded-xl bg-muted/50 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border/60 transition-all duration-200"
									>
										<social.icon className="h-4 w-4" />
									</a>
								))}
							</div>
						</div>

						{/* Links Columns */}
						<div className="lg:col-span-7">
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
								{productLinks.map((section) => (
									<div key={section.title} className="space-y-4">
										<h4 className="text-sm font-semibold text-foreground">
											{section.title}
										</h4>
										<ul className="space-y-3">
											{section.links.map((link) => (
												<li key={link.title}>
													{link.href.startsWith("/#") ? (
														<a
															href={link.href}
															className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-1 group"
														>
															{link.title}
															<span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-200" />
														</a>
													) : (
														<Link
															to={link.href}
															className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-1 group"
														>
															{link.title}
															<span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-200" />
														</Link>
													)}
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-border/30 py-6">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
						<p className="text-xs text-muted-foreground">
							© {new Date().getFullYear()} Echo. All rights reserved.
						</p>
						<div className="flex items-center gap-6">
							<a
								href="/privacy-policy"
								className="text-xs text-muted-foreground hover:text-foreground transition-colors"
							>
								Privacy
							</a>
							<a
								href="/terms-and-conditions"
								className="text-xs text-muted-foreground hover:text-foreground transition-colors"
							>
								Terms
							</a>
							<a
								href="mailto:hello@echo.ai"
								className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
							>
								<Mail className="h-3 w-3" />
								Contact
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
