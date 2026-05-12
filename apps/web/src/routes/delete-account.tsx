import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/delete-account")({
	component: DeleteAccount,
});

const requestSteps = [
	"Contact Echo support using the support method listed in the App Store listing or the support channel available inside the app.",
	"Use the email address associated with your Echo account, or include it in the request so we can verify account ownership.",
	"State clearly that you want to delete your Echo account and associated personal data.",
	"If you want us to remove specific saved memories or support tickets instead of deleting the entire account, say that explicitly.",
];

const deletionDetails = [
	"Account profile information and sign-in access",
	"Stored conversations, memory items, and personalization settings tied to the account",
	"Support records and service logs that are no longer needed for legal, fraud, or security purposes",
];

function DeleteAccount() {
	return (
		<main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
			<div className="space-y-10">
				<header className="space-y-4 border-b pb-8">
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
						App Store Compliance
					</p>
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
						Delete Your Echo Account
					</h1>
					<p className="max-w-2xl leading-relaxed text-muted-foreground">
						This page explains how Echo users can request account deletion and
						what happens to personal data after the request is processed.
					</p>
				</header>

				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight">
						How to request deletion
					</h2>
					<ol className="space-y-3">
						{requestSteps.map((step, index) => (
							<li
								key={step}
								className="flex gap-4 rounded-xl border bg-muted/20 px-4 py-4"
							>
								<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
									{index + 1}
								</span>
								<p className="text-sm leading-6 text-muted-foreground">{step}</p>
							</li>
						))}
					</ol>
				</section>

				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight">
						What gets deleted
					</h2>
					<ul className="space-y-3">
						{deletionDetails.map((item) => (
							<li
								key={item}
								className="rounded-xl border bg-background px-4 py-3 text-sm text-muted-foreground"
							>
								{item}
							</li>
						))}
					</ul>
				</section>

				<section className="space-y-4">
					<h2 className="text-2xl font-semibold tracking-tight">
						What may be retained
					</h2>
					<div className="space-y-3 text-muted-foreground">
						<p className="leading-7">
							We may retain limited records when required by law or when
							reasonably necessary for fraud prevention, security, dispute
							resolution, subscription reconciliation, or enforcement of our
							agreements.
						</p>
						<p className="leading-7">
							If you used Apple billing, Apple may continue to retain its own
							transaction records under Apple's policies. Deleting your Echo
							account does not automatically cancel an active App Store
							subscription. Subscriptions must be cancelled separately in your
							Apple ID subscription settings.
						</p>
					</div>
				</section>

				<section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
					<h2 className="text-2xl font-semibold tracking-tight">Response time</h2>
					<p className="mt-3 leading-7 text-muted-foreground">
						Once we verify the request, we aim to process deletion within a
						reasonable period. If we need more information to verify ownership or
						to distinguish between full-account deletion and a partial data
						request, support may contact you before completing the request.
					</p>
				</section>
			</div>
		</main>
	);
}
