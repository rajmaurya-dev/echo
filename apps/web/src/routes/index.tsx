import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Mail, Plus, Star, X, Zap } from "lucide-react";
import { FeaturesSection } from "@/components/features";
import { Input } from "@/components/ui/input";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: HomePage,
});

/* ─── Data ─────────────────────────────────────────── */


const pricingPlans = [
	{
		name: "Starter",
		price: "$0",
		period: "forever",
		lead: "For beginners.",
		description: "Get started with the full boilerplate for personal projects.",
		features: [
			"All boilerplate code",
			"Auth + Database setup",
			"Community support",
			"MIT License",
		],
		cta: "Get Started",
		ctaVariant: "outline" as const,
		popular: false,
	},
	{
		name: "Pro",
		price: "$49",
		period: "one-time",
		lead: "For indie hackers.",
		description: "Unlock premium templates, priority support, and integrations.",
		features: [
			"Everything in Starter",
			"Premium templates",
			"Priority support",
			"Lifetime updates",
			"Stripe integration",
			"Email templates",
		],
		cta: "Get Started",
		ctaVariant: "default" as const,
		popular: true,
	},
	{
		name: "Team",
		price: "$149",
		period: "one-time",
		lead: "For teams.",
		description: "Unlock multi-tenant support and advanced admin features.",
		features: [
			"Everything in Pro",
			"Multi-tenant support",
			"Admin dashboard",
			"Analytics built-in",
			"Team license (up to 5)",
			"1-on-1 onboarding call",
		],
		cta: "Get Started",
		ctaVariant: "default" as const,
		popular: false,
	},
];

const testimonials = [
	{
		name: "Sarah Chen",
		role: "Founder, Pluto AI",
		content:
			"Saved us 3 weeks of setup. We went from idea to paying customers in under a month.",
		rating: 5,
	},
	{
		name: "Marcus Rivera",
		role: "CTO, StreamLab",
		content:
			"The type-safety across the entire stack is incredible. Refactoring is actually enjoyable now.",
		rating: 5,
	},
	{
		name: "Emily Watson",
		role: "Indie Hacker",
		content:
			"Best boilerplate I've used. The auth and database setup alone is worth the price.",
		rating: 5,
	},
];

const stats = [
	{ value: "2,000+", label: "Developers" },
	{ value: "500+", label: "Projects shipped" },
	{ value: "99.9%", label: "Uptime" },
	{ value: "4.9/5", label: "Avg rating" },
];

const faqs = [
	{
		question: "What is ShipFast, and how is it different?",
		answer:
			"ShipFast is a production-ready SaaS boilerplate with auth, database, payments, and email pre-configured. Unlike other starters, it gives you a full-stack TypeScript setup with edge-first APIs on Cloudflare Workers — not just a frontend template.",
	},
	{
		question: "Do I need to pay to get started?",
		answer:
			"No. The Starter plan is completely free and includes all boilerplate code, auth, and database setup. You only pay if you want premium templates, priority support, and additional integrations.",
	},
	{
		question: "What tech stack does ShipFast use?",
		answer:
			"ShipFast uses React with TanStack Router and Query on the frontend, Hono on Cloudflare Workers for the API, Drizzle ORM for the database, Better Auth for authentication, and shadcn/ui for components — all fully typed with TypeScript.",
	},
	{
		question: "Can I use ShipFast for commercial projects?",
		answer:
			"Absolutely. The Starter plan is MIT licensed. Pro and Team plans include a commercial license with lifetime updates. You own everything you build.",
	},
	{
		question: "How do I deploy my ShipFast project?",
		answer:
			"ShipFast comes with pre-configured CI/CD pipelines for Cloudflare, Vercel, and Netlify. Just connect your repo and deploy with a single click — no DevOps knowledge required.",
	},
	{
		question: "Do you offer refunds?",
		answer:
			"Yes. If you're not satisfied within 14 days of purchase, we'll give you a full refund — no questions asked.",
	},
];

/* ─── Page ─────────────────────────────────────────── */

function HomePage() {
	return (
		<div className="flex flex-col min-h-screen bg-background text-foreground">
			{/* Hero */}
			<section className="relative overflow-hidden pt-24 pb-16 lg:pt-40 lg:pb-28">
				<div className="pointer-events-none absolute inset-0 -z-10">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/5 blur-3xl" />
				</div>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
					<Badge
						variant="secondary"
						className="mb-6 px-4 py-1.5 text-sm font-medium"
					>
						<Zap className="mr-1.5 h-3.5 w-3.5" />
						Ship faster with ShipFast
					</Badge>

					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
						Build your SaaS
						<br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
							in days, not months
						</span>
					</h1>

					<p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
						Production-ready boilerplate with auth, payments, database, and
						email — so you can focus on what makes your product unique.
					</p>

					<div className="flex flex-col sm:flex-row justify-center gap-3">
						<Button
							size="lg"
							className="h-12 px-8 text-base rounded-xl"
							asChild
						>
							<Link to="/auth">
								Get Started Free
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="h-12 px-8 text-base rounded-xl"
						>
							View Demo
						</Button>
					</div>

					{/* Social proof strip */}
					<div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
						<div className="flex -space-x-2">
							{[...Array(5)].map((_, i) => (
								<div
									key={`avatar-${i}`}
									className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium"
								>
									{String.fromCharCode(65 + i)}
								</div>
							))}
						</div>
						<div className="flex items-center gap-1">
							{[...Array(5)].map((_, i) => (
								<Star
									key={`star-${i}`}
									className="h-4 w-4 fill-yellow-400 text-yellow-400"
								/>
							))}
							<span className="ml-1.5 font-medium text-foreground">4.9/5</span>
							<span>from 200+ reviews</span>
						</div>
					</div>
				</div>
			</section>

			{/* Stats bar */}
			<section className="border-y bg-muted/30">
				<div className="container mx-auto px-4 max-w-5xl">
					<div className="grid grid-cols-2 md:grid-cols-4 divide-x">
						{stats.map((stat) => (
							<div
								key={stat.label}
								className="py-8 md:py-10 text-center px-4"
							>
								<div className="text-2xl md:text-3xl font-bold text-foreground">
									{stat.value}
								</div>
								<div className="text-sm text-muted-foreground mt-1">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<FeaturesSection />

			{/* Testimonials */}
			<section className="py-20 lg:py-28 bg-muted/30">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
					<div className="text-center mb-14">
						<Badge variant="secondary" className="mb-4 px-3 py-1 text-sm">
							Testimonials
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
							Loved by developers
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Join thousands of developers who ship faster with ShipFast.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((t) => (
							<div
								key={t.name}
								className="rounded-2xl bg-white dark:bg-card p-6 space-y-4"
							>
								<div className="flex items-center gap-1">
									{[...Array(t.rating)].map((_, i) => (
										<Star
											key={`${t.name}-star-${i}`}
											className="h-4 w-4 fill-yellow-400 text-yellow-400"
										/>
									))}
								</div>
								<p className="text-sm leading-relaxed text-foreground">
									"{t.content}"
								</p>
								<div className="pt-2">
									<div className="text-sm font-semibold">{t.name}</div>
									<div className="text-xs text-muted-foreground">{t.role}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Pricing */}
			<section id="pricing" className="py-20 lg:py-28">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="text-center mb-14">
						<Badge variant="secondary" className="mb-4 px-3 py-1 text-sm">
							Pricing
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
							Simple, transparent pricing
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							No subscriptions. Pay once, build forever.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6 items-start">
						{pricingPlans.map((plan) => (
							<div
								key={plan.name}
								className="rounded-2xl bg-white dark:bg-card p-6 flex flex-col"
							>
								{/* Name badge + popular tag */}
								<div className="flex items-center gap-3 mb-6">
									<Badge
										variant="outline"
										className="text-sm font-medium px-3 py-1"
									>
										{plan.name}
									</Badge>
									{plan.popular && (
										<span className="text-sm font-medium text-primary">
											Most popular
										</span>
									)}
								</div>

								{/* Price */}
								<div className="mb-4">
									<span className="text-5xl font-bold tracking-tight">
										{plan.price}
									</span>
									<span className="text-sm text-muted-foreground ml-2">
										/{plan.period}
									</span>
								</div>

								{/* Description */}
								<p className="text-sm text-muted-foreground mb-6">
									<span className="font-semibold text-foreground">
										{plan.lead}
									</span>{" "}
									{plan.description}
								</p>

								{/* CTA */}
								<Button
									variant={plan.ctaVariant}
									className="w-full h-12 rounded-full text-base font-semibold mb-8"
									asChild
								>
									<Link to="/auth">{plan.cta}</Link>
								</Button>

								{/* Features */}
								<ul className="space-y-3 flex-1">
									{plan.features.map((f) => (
										<li
											key={f}
											className="flex items-start gap-2.5 text-sm"
										>
											<Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
											<span>{f}</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section id="faq" className="py-20 lg:py-28 bg-muted/30">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16 items-start">
						<div className="md:sticky md:top-24">
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
								Frequently
								<br />
								asked
								<br />
								questions
							</h2>
						</div>
						<Accordion type="single" collapsible className="w-full">
							{faqs.map((faq, i) => (
								<AccordionItem
									key={faq.question}
									value={`faq-${i}`}
									className="border-b-0 rounded-xl px-4 transition-colors data-[state=open]:bg-primary/5 data-[state=open]:border-dashed data-[state=open]:border data-[state=open]:border-primary/20"
								>
									<AccordionTrigger
										className="text-base font-semibold hover:no-underline gap-3 [&[data-state=open]>svg]:rotate-0"
										icon={
											<>
												<Plus className="size-4 shrink-0 text-primary [[data-state=open]>&]:hidden" />
												<X className="size-4 shrink-0 text-primary [[data-state=closed]>&]:hidden" />
											</>
										}
									>
										{faq.question}
									</AccordionTrigger>
									<AccordionContent className="text-muted-foreground leading-relaxed">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</section>

			{/* CTA / Newsletter */}
			<section className="py-20 lg:py-28">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
					<div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-16 sm:py-20 text-center">
						{/* Background glow */}
						<div className="pointer-events-none absolute inset-0">
							<div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-white/10 blur-3xl" />
							<div className="absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
						</div>

						<div className="relative z-10">
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary-foreground mb-4">
								Ready to ship faster?
							</h2>
							<p className="text-base md:text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto leading-relaxed">
								Join 2,000+ developers building their next SaaS with ShipFast.
								Stop setting up infrastructure and start building features.
							</p>

							<div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
								<Button
									size="lg"
									className="h-12 px-8 text-base rounded-full bg-white text-primary hover:bg-white/90 font-semibold"
									asChild
								>
									<Link to="/auth">
										Get Started Free
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</div>

							<div className="max-w-md mx-auto">
								<p className="text-sm text-primary-foreground/60 mb-3">
									Or subscribe to our newsletter
								</p>
								<div className="rounded-full bg-white/10 backdrop-blur-sm p-1.5 flex flex-col sm:flex-row gap-1.5">
									<div className="relative flex-1">
										<Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/40" />
										<Input
											type="email"
											placeholder="Enter your email"
											className="h-10 pl-10 border-0 bg-transparent text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-0 text-sm rounded-full"
										/>
									</div>
									<Button
										size="sm"
										className="h-10 rounded-full px-6 bg-white text-primary hover:bg-white/90 font-medium shrink-0"
									>
										Subscribe
									</Button>
								</div>
								<p className="text-xs text-primary-foreground/40 mt-3">
									No spam. Unsubscribe at any time.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

		</div>
	);
}
