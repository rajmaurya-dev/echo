import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	Bell,
	Brain,
	Check,
	Heart,
	MessageCircle,
	Plus,
	Sparkles,
	X,
	Shield,
	Zap,
	Clock,
	User,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
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

const dailyFlow = [
	{
		title: "Onboarding that feels personal",
		description:
			"Users set companion vibe, boundaries, and context in a short setup instead of a long form.",
		outcome: "Fast first-time activation",
		icon: Heart,
	},
	{
		title: "Daily message loop",
		description:
			"Conversations stay short, warm, and contextual, with natural follow-up questions.",
		outcome: "Low-friction daily habit",
		icon: MessageCircle,
	},
	{
		title: "Timely proactive check-ins",
		description:
			"Echo follows up on important moments and inactivity without becoming noisy or clingy.",
		outcome: "Higher return rate with user control",
		icon: Bell,
	},
];

const safetyCommitments = [
	"Echo is always disclosed as AI.",
	"No manipulative dependency-promoting language.",
	"Proactive check-ins are user-configurable.",
	"Sensitive situations use safer fallback behavior.",
];

const corePrinciples = [
	{
		title: "Relationship first",
		description:
			"Every interaction should strengthen continuity between one user and one companion.",
		icon: Heart,
	},
	{
		title: "Memory is the product",
		description:
			"Echo remembers meaningful context so users feel known, not reset every session.",
		icon: Brain,
	},
	{
		title: "Short, human-feeling messages",
		description:
			"The experience feels like texting someone familiar, not reading assistant monologues.",
		icon: MessageCircle,
	},
	{
		title: "Proactive, never pushy",
		description:
			"Check-ins are useful and caring, while users keep full control over frequency.",
		icon: Bell,
	},
];

const faqs = [
	{
		question: "Is Echo a replacement for therapy or professional care?",
		answer:
			"No. Echo is a supportive AI companion and not a licensed mental health provider. In high-risk moments, Echo uses safer responses and encourages seeking professional help.",
	},
	{
		question: "Can I control how often Echo checks in?",
		answer:
			"Yes. Users configure notification and check-in frequency, and can reduce or disable proactive messages at any time.",
	},
	{
		question: "What does Echo remember about me?",
		answer:
			"Echo keeps key context like preferences, ongoing threads, and important personal details to maintain continuity across conversations.",
	},
	{
		question: "Can I edit or delete memories?",
		answer:
			"Yes. Memory controls let users correct, remove, or refine remembered details so personalization stays accurate and comfortable.",
	},
	{
		question: "Does Echo pretend to be human?",
		answer:
			"No. Echo is emotionally warm but transparent about being AI. The product does not rely on deception.",
	},
	{
		question: "How does Echo handle sensitive conversations?",
		answer:
			"Safety guardrails are built in for crisis, self-harm, abuse, and extreme vulnerability scenarios, with respectful escalation guidance where appropriate.",
	},
];

const stats = [
	{ label: "Conversations", value: "1M+", icon: MessageCircle },
	{ label: "Active Users", value: "50K+", icon: User },
	{ label: "Avg. Response Time", value: "<2s", icon: Zap },
	{ label: "Uptime", value: "99.9%", icon: Clock },
];

const pricingPlans = [
	{
		name: "Free",
		description: "Get started with Echo",
		monthlyPrice: 0,
		annualPrice: 0,
		features: [
			"100 messages per month",
			"1 companion",
			"Basic memory",
			"Standard response speed",
			"Email support",
		],
		notIncluded: [
			"Advanced memory",
			"Priority responses",
			"Custom personality",
			"Voice interactions",
		],
		cta: "Get started",
		popular: false,
	},
	{
		name: "Pro",
		description: "For your daily companion",
		monthlyPrice: 9.99,
		annualPrice: 7.99,
		features: [
			"Unlimited messages",
			"1 companion",
			"Advanced memory",
			"Priority response speed",
			"Custom personality traits",
			"Memory editing & pinning",
			"Priority support",
		],
		notIncluded: [
			"Voice interactions",
			"Early access features",
		],
		cta: "Start free trial",
		popular: true,
	},
	{
		name: "Ultra",
		description: "The full experience",
		monthlyPrice: 19.99,
		annualPrice: 15.99,
		features: [
			"Everything in Pro",
			"Voice messages",
			"Extended memory depth",
			"Conversation summaries",
			"Early access to new features",
			"API access",
			"Dedicated support",
		],
		notIncluded: [],
		cta: "Start free trial",
		popular: false,
	},
];

/* ─── Chat Message Component ─────────────────────── */

function ChatBubble({
	sender,
	message,
	delay = 0,
	isUser = false,
}: {
	sender: string;
	message: string;
	delay?: number;
	isUser?: boolean;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.5, delay, ease: "easeOut" as const }}
			className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
		>
			<div
				className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
					isUser
						? "bg-primary text-primary-foreground rounded-br-md"
						: "bg-muted/80 text-foreground rounded-bl-md border border-border/50"
				}`}
			>
				{!isUser && (
					<p className="text-xs text-primary font-semibold mb-1">{sender}</p>
				)}
				<p>{message}</p>
			</div>
		</motion.div>
	);
}

function PhoneMockup() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 40, rotateX: 10 }}
			animate={{ opacity: 1, y: 0, rotateX: 0 }}
			transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
			className="relative mx-auto w-full max-w-[340px]"
			style={{ perspective: "1000px" }}
		>
			{/* Phone Frame */}
			<div className="relative bg-card border-2 border-border/50 rounded-[40px] p-3 shadow-2xl shadow-primary/5">
				{/* Notch */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-card rounded-b-2xl border-x-2 border-b-2 border-border/50 z-10" />

				{/* Screen */}
				<div className="bg-background rounded-[32px] overflow-hidden min-h-[520px] flex flex-col">
					{/* Status Bar */}
					<div className="h-12 bg-card/50 backdrop-blur-sm flex items-end justify-between px-6 pb-2">
						<span className="text-xs font-semibold">9:41</span>
						<div className="flex gap-1">
							<div className="w-4 h-2.5 bg-foreground/80 rounded-sm" />
							<div className="w-0.5 h-2.5 bg-foreground/40 rounded-sm" />
						</div>
					</div>

					{/* Chat Header */}
					<div className="px-4 py-3 border-b border-border/30 flex items-center gap-3">
						<div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
							<Heart className="w-4 h-4 text-primary-foreground" />
						</div>
						<div>
							<p className="text-sm font-semibold">Echo</p>
							<p className="text-[10px] text-muted-foreground">Online</p>
						</div>
					</div>

					{/* Chat Messages */}
					<div className="flex-1 p-4 overflow-hidden">
						<ChatBubble
							sender="Echo"
							message="Hey! How was your presentation today? I remember you were nervous about it."
							delay={0.8}
						/>
						<ChatBubble
							sender="You"
							message="It went really well! The team loved the new design direction."
							delay={1.4}
							isUser
						/>
						<ChatBubble
							sender="Echo"
							message="That's amazing! I'm so proud of you. 🎉 Want to grab coffee later to celebrate?"
							delay={2.0}
						/>
					</div>

					{/* Input */}
					<div className="p-3 border-t border-border/30">
						<div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2.5">
							<div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
							<span className="text-sm text-muted-foreground flex-1">Type a message...</span>
						</div>
					</div>
				</div>
			</div>

			{/* Floating Elements */}
			<motion.div
				animate={{ y: [0, -10, 0] }}
				transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
				className="absolute -top-6 -right-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-xl border border-primary/10 flex items-center justify-center shadow-lg"
			>
				<Sparkles className="w-7 h-7 text-primary" />
			</motion.div>

			<motion.div
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
				className="absolute -bottom-4 -left-10 w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 backdrop-blur-xl border border-primary/10 flex items-center justify-center shadow-lg"
			>
				<Brain className="w-6 h-6 text-primary" />
			</motion.div>
		</motion.div>
	);
}

/* ─── Page ─────────────────────────────────────────── */

function HomePage() {
	const [isAnnual, setIsAnnual] = useState(false);
	return (
		<div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
			{/* ─── HERO ──────────────────────────────────── */}
			<section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
				{/* Background */}
				<div className="pointer-events-none absolute inset-0 -z-10">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 h-[700px] w-[900px] rounded-full bg-primary/[0.04] blur-3xl" />
					<div className="absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-3xl" />
					<div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/[0.02] blur-3xl" />
				</div>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
						{/* Left Content */}
						<motion.div
							initial={{ opacity: 0, x: -40 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7, ease: "easeOut" as const }}
							className="text-center lg:text-left"
						>
							<Badge
								variant="secondary"
								className="mb-6 px-4 py-2 text-sm font-medium rounded-full bg-primary/5 border-primary/10 inline-flex items-center"
							>
								<Sparkles className="mr-2 h-3.5 w-3.5 text-primary" />
								Companionship-first AI
							</Badge>

							<h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
								Your personal
								<br />
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
									AI companion
								</span>
							</h1>

							<p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
								One consistent buddy who talks in short natural messages, checks in
								through your day, and gets more personal over time.
							</p>

							<div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
								<Button
									size="lg"
									className="h-14 px-8 text-base rounded-full font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
									asChild
								>
									<Link to="/auth">
										Start your first chat
										<ArrowRight className="ml-2 h-5 w-5" />
									</Link>
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="h-14 px-8 text-base rounded-full font-medium border-2"
									asChild
								>
									<a href="/#pricing">Explore features</a>
								</Button>
							</div>

							<div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
								{[
									"One companion per user",
									"Memory-first by design",
									"Proactive check-ins you control",
								].map((tag) => (
									<Badge
										key={tag}
										variant="outline"
										className="px-4 py-2 text-sm rounded-full border-primary/20 bg-primary/[0.02]"
									>
										{tag}
									</Badge>
								))}
							</div>
						</motion.div>

						{/* Right - Phone Mockup */}
						<div className="flex justify-center lg:justify-end">
							<PhoneMockup />
						</div>
					</div>
				</div>
			</section>

			{/* ─── STATS ─────────────────────────────────── */}
			<section className="py-14 border-y bg-muted/[0.02]">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat, i) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1, duration: 0.5 }}
								className="text-center"
							>
								<div className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
									{stat.value}
								</div>
								<div className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-1.5">
									<stat.icon className="h-4 w-4" />
									{stat.label}
								</div>
							</motion.div>
						))}
						</div>
					</div>
				</section>

			{/* ─── CORE PRINCIPLES (BENTO GRID) ─────────── */}
			<section id="principles" className="py-24 lg:py-32">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="text-center mb-16">
						<Badge
							variant="secondary"
							className="mb-4 px-4 py-1.5 text-sm rounded-full"
						>
							Product principles
						</Badge>
						<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
							Built for emotional continuity
						</h2>
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Echo is designed as one consistent relationship that gets more
							useful and more personal over time.
						</p>
					</div>

					{/* Bento Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{/* Large Feature Card */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] rounded-3xl border border-primary/10 p-8 relative overflow-hidden group"
						>
							<div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
							<div className="relative z-10 flex flex-col h-full justify-between">
								<div>
									<div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
										<Brain className="h-7 w-7 text-primary" />
									</div>
									<h3 className="text-2xl md:text-3xl font-bold mb-3">
										Memory is the product
									</h3>
									<p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
										Echo remembers meaningful context so users feel known, not reset
										every session. From your favorite coffee order to how your day
										went yesterday.
									</p>
								</div>
								<div className="mt-8 flex gap-3">
									{["Preferences", "History", "Context"].map((tag) => (
										<Badge
											key={tag}
											variant="outline"
											className="px-3 py-1 rounded-full border-primary/20"
										>
											{tag}
										</Badge>
									))}
								</div>
							</div>
						</motion.div>

						{/* Small Cards */}
						{corePrinciples
							.filter((p) => p.title !== "Memory is the product")
							.map((principle, i) => {
								const Icon = principle.icon;
								return (
									<motion.div
										key={principle.title}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.6, delay: i * 0.1 }}
										className="bg-card rounded-3xl border border-border/50 p-8 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
									>
										<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
											<Icon className="h-6 w-6 text-primary" />
										</div>
										<h3 className="text-xl font-bold mb-3">{principle.title}</h3>
										<p className="text-muted-foreground text-sm leading-relaxed">
											{principle.description}
										</p>
									</motion.div>
								);
							})}
					</div>
				</div>
			</section>

			{/* ─── DAILY FLOW ────────────────────────────── */}
			<section id="daily-loop" className="py-24 lg:py-32 bg-muted/[0.02]">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="text-center mb-16">
						<Badge
							variant="secondary"
							className="mb-4 px-4 py-1.5 text-sm rounded-full"
						>
							How it works
						</Badge>
						<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
							The daily Echo relationship
						</h2>
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							A lightweight interaction model built for continuity, comfort, and
							consistent re-engagement.
						</p>
					</div>

					<div className="relative">
						{/* Connecting Line */}
						<div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 hidden md:block" />

						<div className="space-y-8">
							{dailyFlow.map((item, index) => {
								const Icon = item.icon;
								return (
									<motion.div
										key={item.title}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.15 }}
										className="relative flex gap-6 md:gap-8"
									>
										{/* Timeline dot */}
										<div className="hidden md:flex flex-col items-center">
											<div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 z-10 border-2 border-background">
												<Icon className="h-7 w-7 text-primary" />
											</div>
										</div>

										{/* Content Card */}
										<div className="flex-1 bg-card rounded-3xl border border-border/50 p-6 md:p-8 hover:border-primary/20 transition-all duration-300">
											<div className="flex items-start justify-between mb-4">
												<div className="flex items-center gap-3">
													<div className="md:hidden w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
														<Icon className="h-5 w-5 text-primary" />
													</div>
													<div>
														<span className="text-xs font-semibold text-primary uppercase tracking-wider">
															Step 0{index + 1}
														</span>
														<h3 className="text-xl font-bold mt-1">
															{item.title}
														</h3>
													</div>
												</div>
											</div>
											<p className="text-muted-foreground leading-relaxed mb-4">
												{item.description}
											</p>
											<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
												<Zap className="h-3.5 w-3.5 text-primary" />
												<span className="text-sm font-medium text-primary">
													{item.outcome}
												</span>
											</div>
										</div>
									</motion.div>
								);
								})}
							</div>
						</div>
					</div>
				</section>

			{/* ─── PRICING ──────────────────────────────── */}
			<section id="pricing" className="py-24 lg:py-32">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="text-center mb-12">
						<Badge
							variant="secondary"
							className="mb-4 px-4 py-1.5 text-sm rounded-full"
						>
							Pricing
						</Badge>
						<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
							Simple, transparent pricing
						</h2>
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Start free, upgrade when you are ready. No hidden fees.
						</p>
					</div>

					{/* Billing Toggle */}
					<div className="flex items-center justify-center gap-4 mb-16">
						<span
							className={`text-sm font-medium transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}
						>
							Monthly
						</span>
						<button
							onClick={() => setIsAnnual(!isAnnual)}
							className="relative w-14 h-7 rounded-full bg-primary/10 transition-colors hover:bg-primary/20"
						>
							<div
								className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-primary shadow-md transition-transform duration-300 ${isAnnual ? "translate-x-7" : "translate-x-0"}`}
							/>
						</button>
						<span
							className={`text-sm font-medium transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}
						>
							Annual
						</span>
						{isAnnual && (
							<Badge
								variant="secondary"
								className="ml-2 bg-green-500/10 text-green-600 border-green-500/20"
							>
								Save 20%
							</Badge>
						)}
					</div>

					<div className="grid md:grid-cols-3 gap-6 items-start">
						{pricingPlans.map((plan, index) => (
							<motion.div
								key={plan.name}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className={`relative rounded-3xl overflow-hidden ${
									plan.popular
										? "bg-card border-2 border-primary shadow-xl shadow-primary/10 scale-105 z-10"
										: "bg-card border border-border/50"
								}`}
							>
								{plan.popular && (
									<div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center text-xs font-semibold py-1.5">
										Most Popular
									</div>
								)}
								<div className={`p-8 ${plan.popular ? "pt-12" : ""}`}>
									{/* Plan Header */}
									<div className="mb-6">
										<h3 className="text-xl font-bold mb-1">{plan.name}</h3>
										<p className="text-sm text-muted-foreground">
											{plan.description}
										</p>
									</div>

									{/* Price */}
									<div className="mb-8">
										<div className="flex items-baseline gap-1">
											<span className="text-4xl font-bold tracking-tight">
												$
												{isAnnual
													? plan.annualPrice
													: plan.monthlyPrice}
											</span>
											{plan.monthlyPrice > 0 && (
												<span className="text-muted-foreground text-sm">
													/mo
												</span>
											)}
										</div>
										{plan.monthlyPrice > 0 && isAnnual && (
											<p className="text-xs text-muted-foreground mt-1">
												Billed annually ($
												{plan.annualPrice * 12}/year)
											</p>
										)}
									</div>

									{/* CTA */}
									<Button
										className={`w-full h-12 rounded-xl font-semibold mb-8 ${
											plan.popular
												? "bg-primary text-primary-foreground hover:bg-primary/90"
												: "bg-muted text-foreground hover:bg-muted/80"
										}`}
										asChild
									>
										<Link to="/auth">{plan.cta}</Link>
									</Button>

									{/* Divider */}
									<div className="border-t border-border/50 pt-6">
										<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
											Features
										</p>

										{/* Included Features */}
										<ul className="space-y-3">
											{plan.features.map((feature) => (
												<li
													key={feature}
													className="flex items-start gap-3 text-sm"
												>
													<div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
														<Check className="h-3 w-3 text-primary" />
													</div>
													<span className="leading-relaxed">
														{feature}
													</span>
												</li>
											))}
										</ul>

										{/* Not Included Features */}
										{plan.notIncluded.length > 0 && (
											<ul className="space-y-3 mt-3">
												{plan.notIncluded.map((feature) => (
													<li
														key={feature}
														className="flex items-start gap-3 text-sm"
													>
														<div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
															<X className="h-3 w-3 text-muted-foreground" />
														</div>
														<span className="text-muted-foreground leading-relaxed">
															{feature}
														</span>
													</li>
												))}
											</ul>
										)}
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ─── SAFETY ────────────────────────────────── */}
			<section id="safety" className="py-24 lg:py-32 bg-muted/[0.02]">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="grid lg:grid-cols-2 gap-16 items-start">
						{/* Left - Safety Info */}
						<div>
							<Badge
								variant="secondary"
								className="mb-4 px-4 py-1.5 text-sm rounded-full"
							>
								<Shield className="mr-2 h-3.5 w-3.5 inline" />
								Safety and trust
							</Badge>
							<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
								Emotional warmth, clear boundaries
							</h2>
							<p className="text-lg text-muted-foreground leading-relaxed mb-10">
								Echo is designed to feel close and supportive without crossing
								safety lines or encouraging unhealthy dependency.
							</p>

							<div className="space-y-4">
								{safetyCommitments.map((commitment, i) => (
									<motion.div
										key={commitment}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.1, duration: 0.4 }}
										className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300"
									>
										<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
											<Shield className="h-5 w-5 text-primary" />
										</div>
										<p className="text-base font-medium pt-2">{commitment}</p>
									</motion.div>
								))}
							</div>
						</div>

						{/* Right - FAQ */}
						<div className="lg:pt-16">
							<h3 className="text-2xl font-bold mb-6">Frequently asked questions</h3>
							<Accordion type="single" collapsible className="w-full space-y-3">
								{faqs.map((faq, i) => (
									<AccordionItem
										key={faq.question}
										value={`faq-${i}`}
										className="border rounded-2xl px-5 transition-all duration-300 data-[state=open]:bg-primary/[0.02] data-[state=open]:border-primary/20 hover:border-primary/10"
									>
										<AccordionTrigger
											className="text-base font-semibold hover:no-underline gap-3 py-5 [&[data-state=open]>svg]:rotate-0"
											icon={
												<>
													<Plus className="size-5 shrink-0 text-primary [[data-state=open]>&]:hidden" />
													<X className="size-5 shrink-0 text-primary [[data-state=closed]>&]:hidden" />
												</>
											}
										>
											{faq.question}
										</AccordionTrigger>
										<AccordionContent className="text-muted-foreground leading-relaxed pb-5">
											{faq.answer}
										</AccordionContent>
									</AccordionItem>
								))}
								</Accordion>
							</div>
						</div>
					</div>
				</section>

			{/* ─── FINAL CTA ─────────────────────────────── */}
			<section className="py-24 lg:py-32">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
					<div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-20 sm:px-16 sm:py-24 text-center">
						{/* Background */}
						<div className="pointer-events-none absolute inset-0">
							<div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-white/10 blur-3xl" />
							<div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl" />
							<div className="absolute top-1/2 -left-20 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
						</div>

						<div className="relative z-10">
							<Badge
								variant="secondary"
								className="mb-6 px-4 py-1.5 text-sm bg-white/15 text-primary-foreground border-transparent rounded-full"
							>
								<Sparkles className="mr-2 h-3.5 w-3.5 inline" />
								Echo v1
							</Badge>
							<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary-foreground mb-6">
								Start your companion
								<br />
								relationship
							</h2>
							<p className="text-lg md:text-xl text-primary-foreground/80 mb-12 max-w-xl mx-auto leading-relaxed">
								A personal AI that remembers your context, checks in with care,
								and feels more meaningful every time you return.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
								<Button
									size="lg"
									className="h-14 px-10 text-base rounded-full bg-white text-primary hover:bg-white/90 font-semibold shadow-lg"
									asChild
								>
									<Link to="/auth">
										Start your first chat
										<ArrowRight className="ml-2 h-5 w-5" />
									</Link>
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="h-14 px-10 text-base rounded-full border-2 border-white/30 bg-white/10 text-primary-foreground hover:bg-white/20 font-medium"
									asChild
								>
									<a href="/#pricing">View pricing</a>
								</Button>
							</div>
							<p className="text-sm text-primary-foreground/60">
								You stay in control of memory, boundaries, and check-in
								frequency.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
