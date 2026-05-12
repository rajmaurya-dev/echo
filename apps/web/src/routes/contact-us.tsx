import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact-us")({
	component: ContactUs,
});

const supportTopics = [
	"Account access and sign-in problems",
	"Subscription, billing, and renewal questions",
	"Privacy, memory, and personalization requests",
	"Bug reports, safety concerns, and general feedback",
];

const supportChannels = [
	{
		title: "In-app support",
		description:
			"Use the support or settings area inside Echo when you can still access your account. This is the fastest way for us to match your request to the correct account.",
	},
	{
		title: "App Store support contact",
		description:
			"If you are reaching us from the App Store listing, use the support contact configured in the listing and include the email attached to your Echo account if possible.",
	},
	{
		title: "Privacy and deletion requests",
		description:
			"For data access, correction, memory concerns, or account deletion, include enough information for us to verify the request and safely process it.",
	},
];

function ContactUs() {
	return (
		<main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
			<div className="space-y-10">
				<header className="space-y-4 border-b pb-8">
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
						App Store Support
					</p>
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
						Contact Echo Support
					</h1>
					<p className="max-w-2xl leading-relaxed text-muted-foreground">
						This page is the support destination for Echo users coming from the
						app, the web product, or the App Store listing.
					</p>
				</header>

				<section className="grid gap-6 md:grid-cols-3">
					{supportChannels.map((channel) => (
						<div key={channel.title} className="rounded-2xl border bg-muted/20 p-6">
							<h2 className="text-lg font-semibold tracking-tight">
								{channel.title}
							</h2>
							<p className="mt-3 text-sm leading-6 text-muted-foreground">
								{channel.description}
							</p>
						</div>
					))}
				</section>

				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight">
						What we can help with
					</h2>
					<ul className="grid gap-3 sm:grid-cols-2">
						{supportTopics.map((topic) => (
							<li
								key={topic}
								className="rounded-xl border bg-background px-4 py-3 text-sm text-muted-foreground"
							>
								{topic}
							</li>
						))}
					</ul>
				</section>

				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight">
						Before you contact us
					</h2>
					<div className="space-y-3 text-muted-foreground">
						<p className="leading-7">
							Include your account email or sign-in method, device type, app
							version if known, and a short description of the issue.
						</p>
						<p className="leading-7">
							For billing problems, tell us whether the subscription was started
							through Apple. For safety or privacy requests, include enough
							context for us to investigate without sending unnecessary sensitive
							information.
						</p>
						<p className="leading-7">
							If you cannot access your account and need deletion help, use the
							account deletion instructions below.
						</p>
					</div>
				</section>

				<section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
					<h2 className="text-2xl font-semibold tracking-tight">
						Account and data requests
					</h2>
					<p className="mt-3 leading-7 text-muted-foreground">
						Need to delete your account, remove saved memories, or make a data
						request? Use the dedicated deletion and privacy pages so your request
						can be handled correctly.
					</p>
					<div className="mt-5 flex flex-col gap-3 sm:flex-row">
						<a
							href="/delete-account"
							className="inline-flex w-fit rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
						>
							Delete account instructions
						</a>
						<Link
							to="/privacy-policy"
							className="inline-flex w-fit rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
						>
							Review privacy policy
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}
