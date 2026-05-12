import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-and-conditions")({
	component: () => (
		<main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
			<h1 className="text-3xl font-semibold">Terms and Conditions</h1>
			<p>
				By accessing or using our website, applications, subscriptions, and
				services (the “Services”), you agree to these Terms. If you do not
				agree, do not use the Services.
			</p>
			<h2 className="text-xl font-semibold">Subscriptions & Billing</h2>
			<ul className="list-disc pl-6 space-y-2">
				<li>
					Subscriptions renew automatically unless cancelled before renewal.
				</li>
				<li>Fees are disclosed at checkout; taxes may apply.</li>
				<li>All sales are final. See our Cancellation & Refunds policy.</li>
			</ul>
			<h2 className="text-xl font-semibold">Account & Access</h2>
			<ul className="list-disc pl-6 space-y-2">
				<li>You are responsible for your account and credentials.</li>
				<li>Do not share access or resell our content without permission.</li>
				<li>We may suspend accounts for suspected misuse or violations.</li>
			</ul>
			<h2 className="text-xl font-semibold">Acceptable Use</h2>
			<ul className="list-disc pl-6 space-y-2">
				<li>No unlawful, infringing, or harmful activities.</li>
				<li>No reverse engineering, scraping, or circumvention of security.</li>
			</ul>
			<h2 className="text-xl font-semibold">Intellectual Property</h2>
			<p>
				All content, software, and materials provided through the Services are
				owned by us or our licensors and protected by applicable laws. No rights
				are granted except as expressly stated.
			</p>
			<h2 className="text-xl font-semibold">Disclaimers & Liability</h2>
			<p>
				The Services are provided “as is” without warranties. To the maximum
				extent permitted by law, our liability is limited to amounts paid in the
				last 12 months for the applicable Service.
			</p>
			<h2 className="text-xl font-semibold">Changes</h2>
			<p>
				We may update these Terms from time to time. Material changes will be
				posted on this page with an updated date. Continued use constitutes
				acceptance.
			</p>
			<h2 className="text-xl font-semibold">Contact</h2>
			<p>If you have questions about these Terms, please contact us.</p>
		</main>
	),
});
