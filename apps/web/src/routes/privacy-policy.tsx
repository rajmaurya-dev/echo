import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
	component: PrivacyPolicy,
});

function PrivacyPolicy() {
	return (
		<div className="container mx-auto px-4 py-20 max-w-4xl">
			<div className="space-y-12 text-foreground">
				{/* Header */}
				<header className="border-b pb-8">
					<h1 className="text-4xl font-bold tracking-tight mb-4 text-primary">
						Privacy Policy
					</h1>
					<p className="text-muted-foreground">
						Last Updated: December 21, 2025
					</p>
				</header>

				{/* Introduction */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold">1. Introduction</h2>
					<p className="leading-relaxed text-muted-foreground">
						At Egintech, we are committed to protecting your privacy. This
						Privacy Policy explains how we collect, use, and safeguard your
						personal information when you use our AI-powered services for career
						counseling, educational assessment, and health optimization.
					</p>
				</section>

				{/* Data Collection */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold">2. Information We Collect</h2>
					<div className="space-y-2">
						<p className="font-medium">
							2.1 Personal Identification Information
						</p>
						<p className="text-muted-foreground">
							Name, email address, phone number, and demographic information
							provided during registration.
						</p>
					</div>
					<div className="space-y-2">
						<p className="font-medium">2.2 Assessment & AI Data</p>
						<p className="text-muted-foreground">
							Inputs provided during AI assessments, including educational
							background, career preferences, fitness goals, and physiological
							data (where applicable for specific testing).
						</p>
					</div>
				</section>

				{/* Usage */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold">
						3. How We Use Your Information
					</h2>
					<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
						<li>
							To provide personalized AI-driven guidance and assessment reports.
						</li>
						<li>To improve our algorithms and service efficiency.</li>
						<li>
							To communicate updates regarding your assessments or new service
							features.
						</li>
						<li>
							To manage our franchise network and customer support requests.
						</li>
					</ul>
				</section>

				{/* Security */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold">4. Data Security & Storage</h2>
					<p className="text-muted-foreground leading-relaxed">
						We implement industry-standard encryption and security protocols to
						protect your data. All sensitive information is stored in secure
						cloud environments. As a company built with "Responsible AI," we
						ensure that your personal patterns are analyzed ethically and stored
						with strictly controlled access.
					</p>
				</section>

				{/* Third Parties */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold">5. Third-Party Sharing</h2>
					<p className="text-muted-foreground leading-relaxed">
						We do not sell your personal data. We may share information with
						authorized franchise partners only to fulfill service requests
						initiated by you in your local community.
					</p>
				</section>

				{/* User Rights */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold">6. Your Rights</h2>
					<p className="text-muted-foreground leading-relaxed">
						You have the right to access, correct, or request the deletion of
						your personal information stored on our platforms. You can manage
						these preferences through the Egintech mobile application or by
						contacting our support team.
					</p>
				</section>

				{/* Contact */}
				<section className="space-y-4 rounded-xl bg-muted/50 p-8">
					<h2 className="text-2xl font-semibold border-none">7. Contact Us</h2>
					<p className="text-muted-foreground">
						If you have any questions about this Privacy Policy, please contact
						us at:
					</p>
					<div className="pt-2">
						<p className="font-semibold text-primary">info@saas.com</p>
						<p className="text-sm text-muted-foreground">
							12th, Lokmat Bhawan, Ramdashpath, Nagpur, Maharashtra, 440012
						</p>
					</div>
				</section>
			</div>
		</div>
	);
}
