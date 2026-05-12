import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-and-conditions")({
	component: TermsAndConditions,
});

const sections = [
	{
		title: "1. Agreement to the Terms",
		content:
			"These Terms govern your use of the Echo mobile app, website, subscriptions, and related services. By creating an account, starting a trial, or using the service, you agree to these Terms.",
	},
	{
		title: "2. Eligibility and Accounts",
		content:
			"You must be legally able to enter into this agreement and are responsible for the activity that occurs under your account. Keep your login credentials secure and accurate.",
	},
	{
		title: "3. The Echo Service",
		content:
			"Echo is an AI companion product designed for conversation, continuity, personalization, and proactive check-ins. Echo is not a human being, emergency service, licensed therapist, or medical provider.",
	},
	{
		title: "4. Subscriptions and Billing",
		content:
			"Paid features may be offered through auto-renewing subscriptions. Subscription pricing, billing cadence, and renewal terms will be disclosed before purchase. Subscriptions renew automatically unless cancelled before the end of the current billing period. You can manage or cancel your subscription through the billing method and account settings used for purchase.",
	},
	{
		title: "5. Trials, Pricing, and Refunds",
		content:
			"Any free trial, introductory price, or promotional offer will be disclosed before purchase. Refunds and billing adjustments are handled according to the payment method and platform used for purchase, subject to applicable law. Where required by law, we may provide additional rights.",
	},
	{
		title: "6. Acceptable Use",
		content:
			"You may not use Echo to break the law, harass or exploit others, infringe rights, reverse engineer the product, bypass security controls, or attempt to generate abusive, fraudulent, or harmful content at scale.",
	},
	{
		title: "7. User Content and Feedback",
		content:
			"You retain rights to the content you submit, but you grant us the rights needed to operate, secure, and improve the service. If you provide product feedback, you allow us to use it without restriction or compensation.",
	},
	{
		title: "8. Safety and Service Limits",
		content:
			"We may limit or refuse certain prompts, features, or accounts when needed for legal compliance, safety, fraud prevention, abuse prevention, or product integrity. We may also suspend accounts that violate these Terms.",
	},
	{
		title: "9. Intellectual Property",
		content:
			"Echo, its software, design, branding, and service materials are owned by us or our licensors and are protected by applicable intellectual property laws. These Terms grant a limited right to use the service, not ownership of it.",
	},
	{
		title: "10. Disclaimers",
		content:
			"Echo is provided on an as-available basis. AI-generated outputs may be incomplete, inaccurate, or unsuitable for your situation. You should not rely on Echo for crisis response, medical, legal, financial, or other high-stakes decisions without qualified professional advice.",
	},
	{
		title: "11. Limitation of Liability",
		content:
			"To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, profits, goodwill, or business interruption. If liability cannot be excluded, it is limited to the amount you paid us for the service during the 12 months before the event giving rise to the claim.",
	},
	{
		title: "12. Changes and Termination",
		content:
			"We may update the service and these Terms over time. If we make material changes, we will post an updated effective date. We may suspend or terminate access if necessary to protect the service, users, or our legal obligations.",
	},
];

function TermsAndConditions() {
	return (
		<main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
			<div className="space-y-10">
				<header className="space-y-4 border-b pb-8">
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
						Legal
					</p>
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
						Terms and Conditions
					</h1>
					<p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
						Effective date: May 12, 2026
					</p>
					<p className="max-w-2xl leading-relaxed text-muted-foreground">
						These terms apply to Echo subscriptions, the mobile app, and related
						web services.
					</p>
				</header>

				<div className="space-y-8">
					{sections.map((section) => (
						<section key={section.title} className="space-y-3">
							<h2 className="text-2xl font-semibold tracking-tight">
								{section.title}
							</h2>
							<p className="leading-7 text-muted-foreground">
								{section.content}
							</p>
						</section>
					))}
				</div>

				<section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
					<h2 className="text-2xl font-semibold tracking-tight">13. Contact</h2>
					<p className="mt-3 leading-7 text-muted-foreground">
						If you have questions about these Terms, subscription access, or
						billing expectations, use our support page.
					</p>
					<div className="mt-5">
						<Link
							to="/contact-us"
							className="inline-flex rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
						>
							Open support page
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}
