import type { LucideIcon } from "lucide-react";

export interface NavItem {
	title: string;
	href?: string;
	items?: {
		title: string;
		href: string;
		description: string;
	}[];
}

export interface FooterSection {
	title: string;
	links: {
		title: string;
		href: string;
	}[];
}

export interface SocialLink {
	icon: LucideIcon;
	href: string;
	label: string;
}

export interface PaymentMethod {
	name: string;
	icon: string;
}

export interface HowItWorksStep {
	icon: LucideIcon;
	title: string;
	description: string;
}

export interface Category {
	name: string;
	icon: LucideIcon;
	href: string;
	color: string;
	count: string;
}

export interface Stat {
	icon: LucideIcon;
	label: string;
	value: string;
}
