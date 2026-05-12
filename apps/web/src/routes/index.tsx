import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	Bell,
	Brain,
	Check,
	Heart,
	Mail,
	MessageCircle,
	Plus,
	X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
	component: HomePage,
});

/* ─── Data ─────────────────────────────────────────── */


const v1MustHave = [
	"Mobile-first messaging experience",
	"Single persistent companion per user",
	"Personalization onboarding and companion setup",
	"Short-form conversational response style",
	"Persistent conversation history + foundational memory",
	"Companion-initiated check-ins and follow-ups",
	"Notification frequency controls",
	"Basic safety handling for sensitive conversations",
];

const v1ShouldHave = [
	"Companion trait editing over time",
	"Memory correction and deletion controls",
	"Pinned memories for important context",
	"Simple conversation continuity summaries",
];

const v1Later = [
	"Voice interactions",
	"Rich avatars and visual identity",
	"Calendar-aware check-ins",
	"Tool actions and external integrations",
];

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
						<Heart className="mr-1.5 h-3.5 w-3.5" />
						Companionship-first AI
					</Badge>

					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
						Your personal AI companion
						<br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
							that remembers you
						</span>
					</h1>

					<p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
						One consistent buddy who talks in short natural messages, checks in
						through your day, and gets more personal over time.
					</p>

					<div className="flex flex-col sm:flex-row justify-center gap-3">
						<Button
							size="lg"
							className="h-12 px-8 text-base rounded-xl"
							asChild
						>
							<Link to="/auth">
								Start your first chat
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="h-12 px-8 text-base rounded-xl"
						>
							See v1 scope
						</Button>
					</div>
					<div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
						<Badge variant="outline" className="px-3 py-1 text-sm">
							One companion per user
						</Badge>
						<Badge variant="outline" className="px-3 py-1 text-sm">
							Memory-first by design
						</Badge>
						<Badge variant="outline" className="px-3 py-1 text-sm">
							Proactive check-ins you control
						</Badge>
					</div>
				</div>
			</section>

			{/* Core principles */}
			<section className="py-20 lg:py-28 bg-muted/30">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="text-center mb-14">
						<Badge variant="secondary" className="mb-4 px-3 py-1 text-sm">
							Product principles
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
							Built for emotional continuity
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Echo is designed as one consistent relationship that gets more
							useful and more personal over time.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{corePrinciples.map((principle) => {
							const Icon = principle.icon;
							return (
								<Card key={principle.title} className="gap-4">
									<CardHeader className="gap-3">
										<div className="w-fit rounded-lg border bg-background p-2.5">
											<Icon className="h-4 w-4 text-primary" />
										</div>
										<CardTitle>{principle.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription className="text-sm leading-relaxed">
											{principle.description}
										</CardDescription>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* Daily experience flow */}
			<section className="py-20 lg:py-28 bg-muted/30">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="text-center mb-14">
						<Badge variant="secondary" className="mb-4 px-3 py-1 text-sm">
							How it works
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
							The daily Echo relationship loop
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							A lightweight interaction model built for continuity, comfort, and
							consistent re-engagement.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-6">
						{dailyFlow.map((item) => {
							const Icon = item.icon;
							return (
								<Card key={item.title} className="gap-4">
									<CardHeader className="gap-3">
										<div className="w-fit rounded-lg border bg-background p-2.5">
											<Icon className="h-4 w-4 text-primary" />
										</div>
										<CardTitle className="text-xl">{item.title}</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<CardDescription className="text-sm leading-relaxed">
											{item.description}
										</CardDescription>
										<div className="rounded-md border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
											<span className="font-medium text-foreground">
												Outcome:
											</span>{" "}
											{item.outcome}
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* v1 scope */}
			<section id="v1-scope" className="py-20 lg:py-28">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="text-center mb-14">
						<Badge variant="secondary" className="mb-4 px-3 py-1 text-sm">
							v1 scope
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
							What ships now vs later
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Echo v1 stays focused on emotional continuity, memory, and healthy
							proactive engagement.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-6 items-start">
						<Card className="gap-4">
							<CardHeader className="gap-3">
								<Badge className="w-fit">Must ship</Badge>
								<CardTitle>Core MVP</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3">
									{v1MustHave.map((item) => (
										<li key={item} className="flex items-start gap-2.5 text-sm">
											<Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
						<Card className="gap-4">
							<CardHeader className="gap-3">
								<Badge variant="secondary" className="w-fit">
									Should have
								</Badge>
								<CardTitle>Continuity upgrades</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3">
									{v1ShouldHave.map((item) => (
										<li key={item} className="flex items-start gap-2.5 text-sm">
											<Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
						<Card className="gap-4">
							<CardHeader className="gap-3">
								<Badge variant="outline" className="w-fit">
									Later
								</Badge>
								<CardTitle>Not in v1</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3">
									{v1Later.map((item) => (
										<li key={item} className="flex items-start gap-2.5 text-sm">
											<X className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Safety and trust */}
			<section id="safety" className="py-20 lg:py-28 bg-muted/30">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="text-center mb-14">
						<Badge variant="secondary" className="mb-4 px-3 py-1 text-sm">
							Safety and trust
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
							Emotional warmth, clear boundaries
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Echo is designed to feel close and supportive without crossing
							safety lines or encouraging unhealthy dependency.
						</p>
					</div>
					<div className="grid md:grid-cols-2 gap-4 mb-10">
						{safetyCommitments.map((commitment) => (
							<Card key={commitment} className="gap-2">
								<CardContent className="flex items-start gap-2.5 pt-6">
									<Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
									<p className="text-sm">{commitment}</p>
								</CardContent>
							</Card>
						))}
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
