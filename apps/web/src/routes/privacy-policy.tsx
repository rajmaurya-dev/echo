import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
	component: PrivacyPolicy,
});

const sections = [
	{
		title: "1. Overview",
		body: [
			"Echo is a mobile-first AI companion app built around one persistent relationship between a user and an AI companion. This Privacy Policy explains what information we collect, why we collect it, and the choices users have over their data.",
			"By using Echo on iPhone, iPad, the web, or related services, you agree to the practices described on this page.",
		],
	},
	{
		title: "2. Information We Collect",
		body: [
			"Account information such as name, email address, sign-in provider, and basic profile details used to create and secure your account.",
			"Conversation data, memory items, preferences, onboarding responses, and companion settings needed to provide continuity across sessions.",
			"Usage information such as session activity, feature interactions, device/browser information, approximate diagnostics, and service logs used to maintain and improve the app.",
			"Support information you choose to send us when contacting support, reporting a problem, or requesting account or memory changes.",
		],
	},
	{
		title: "3. How We Use Information",
		body: [
			"To provide the core Echo experience, including personalized replies, memory, proactive check-ins, safety handling, and account access.",
			"To operate subscriptions, authentication, abuse prevention, customer support, and reliability monitoring.",
			"To improve product quality, evaluate feature performance, investigate bugs, and maintain safety systems for sensitive conversations.",
			"We do not sell personal information or use conversation history for unrelated advertising purposes.",
		],
	},
	{
		title: "4. Memory and Personalization",
		body: [
			"Memory is a core part of the Echo product. Echo may store meaningful facts, preferences, ongoing topics, and companion settings so the experience feels consistent over time.",
			"Users can request correction or deletion of saved information. If a memory is no longer appropriate or feels inaccurate, contact support and we will review the request.",
		],
	},
	{
		title: "5. Sharing and Service Providers",
		body: [
			"We share data only with service providers that help us run Echo, such as hosting, authentication, analytics, customer support, and infrastructure vendors, and only for business operations related to the app.",
			"We may disclose information when required by law, to enforce our terms, to protect users or the public, or to investigate fraud, abuse, or security issues.",
		],
	},
	{
		title: "6. Retention",
		body: [
			"We keep account and conversation data for as long as needed to provide the service, comply with legal obligations, resolve disputes, and enforce our agreements.",
			"If you request deletion, we will remove or anonymize personal information within a reasonable period unless retention is legally required or necessary for fraud and security prevention.",
		],
	},
	{
		title: "7. Your Choices",
		body: [
			"You may control check-in frequency, some personalization settings, and whether certain information should remain part of your experience.",
			"You may request access, correction, export, or deletion of your account data using the support and deletion instructions on the Contact and Delete Account pages.",
		],
	},
	{
		title: "8. Children",
		body: [
			"Echo is not intended for children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided personal information, contact us so we can investigate and remove it.",
		],
	},
	{
		title: "9. International Transfers and Security",
		body: [
			"Your information may be processed in countries other than your own. We use reasonable administrative, technical, and organizational safeguards to protect personal information, but no system can be guaranteed to be completely secure.",
		],
	},
	{
		title: "10. Changes",
		body: [
			"We may update this Privacy Policy from time to time. Material changes will be reflected on this page with a revised effective date.",
		],
	},
];

function PrivacyPolicy() {
	return (
		<main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
			<div className="space-y-10">
				<header className="space-y-4 border-b pb-8">
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
						App Store Legal
					</p>
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
						Privacy Policy
					</h1>
					<p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
						Effective date: May 12, 2026
					</p>
					<p className="max-w-2xl leading-relaxed text-muted-foreground">
						This policy is written for the Echo AI Companion app and related web
						experiences.
					</p>
				</header>

				<div className="space-y-10">
					{sections.map((section) => (
						<section key={section.title} className="space-y-4">
							<h2 className="text-2xl font-semibold tracking-tight">
								{section.title}
							</h2>
							<div className="space-y-3">
								{section.body.map((paragraph) => (
									<p
										key={paragraph}
										className="leading-7 text-muted-foreground"
									>
										{paragraph}
									</p>
								))}
							</div>
						</section>
					))}
				</div>

				<section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
					<h2 className="text-2xl font-semibold tracking-tight">11. Contact</h2>
					<p className="mt-3 leading-7 text-muted-foreground">
						For privacy requests, support questions, or data deletion issues,
						use our support page or account deletion page.
					</p>
					<div className="mt-5 flex flex-col gap-3 sm:flex-row">
						<Link
							to="/contact-us"
							className="inline-flex w-fit rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
						>
							Open support page
						</Link>
						<a
							href="/delete-account"
							className="inline-flex w-fit rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
						>
							View deletion instructions
						</a>
					</div>
				</section>
			</div>
		</main>
	);
}
