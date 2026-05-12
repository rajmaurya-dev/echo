import { Link } from "@tanstack/react-router";
import { Github, Heart, Linkedin, Twitter } from "lucide-react";
import type { FooterSection, SocialLink } from "@/types";
import { Separator } from "./ui/separator";

const footerSections: FooterSection[] = [
	{
		title: "Product",
		links: [
			{ title: "Principles", href: "/#principles" },
			{ title: "Daily Loop", href: "/#daily-loop" },
			{ title: "v1 Scope", href: "/#v1-scope" },
			{ title: "Safety", href: "/#safety" },
		],
	},
	{
		title: "Company",
		links: [
			{ title: "Contact", href: "/contact-us" },
			{ title: "Start chat", href: "/auth" },
		],
	},
	{
		title: "Legal",
		links: [
			{ title: "Privacy Policy", href: "/privacy-policy" },
			{ title: "Terms & Conditions", href: "/terms-and-conditions" },
		],
	},
];

const socialLinks: SocialLink[] = [
	{ icon: Twitter, href: "https://twitter.com", label: "Twitter" },
	{ icon: Github, href: "https://github.com", label: "GitHub" },
	{ icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
	return (
		<footer className="bg-muted/30 border-t">
			<div className="container mx-auto px-4 py-12 max-w-7xl">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
					{/* Brand & Outline */}
					<div className="lg:col-span-2 space-y-4">
						<Link to="/" className="inline-flex items-center space-x-2">
							<div className="bg-primary p-2 rounded-lg">
								<Heart className="h-5 w-5 text-primary-foreground" />
							</div>
							<span className="font-bold text-xl tracking-tight">
								Echo
							</span>
						</Link>
						<p className="text-sm text-muted-foreground max-w-xs pt-4 leading-relaxed">
							A companionship-first AI app built around one persistent buddy,
							short natural messages, and memory that makes every return feel
							more personal.
						</p>
					</div>

					{/* Links Sections */}
					{footerSections.map((section) => (
						<div key={section.title} className="space-y-4">
							<h4 className="font-semibold text-sm tracking-wider text-foreground uppercase">
								{section.title}
							</h4>
							<ul className="space-y-3">
								{section.links.map((link) => (
									<li key={link.title}>
										{link.href.startsWith("/#") ? (
											<a
												href={link.href}
												className="text-sm text-muted-foreground hover:text-foreground transition-colors"
											>
												{link.title}
											</a>
										) : (
											<Link
												to={link.href}
												className="text-sm text-muted-foreground hover:text-foreground transition-colors"
											>
												{link.title}
											</Link>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<Separator className="my-10" />

				{/* Bottom Section */}
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<div className="text-sm text-muted-foreground text-center md:text-left">
						© {new Date().getFullYear()} Echo. All rights reserved.
					</div>

					<div className="flex items-center space-x-6">
						{/* Social Links */}
						<div className="flex space-x-4">
							{socialLinks.map((social) => (
								<a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noreferrer"
									aria-label={social.label}
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									<social.icon className="h-5 w-5" />
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
