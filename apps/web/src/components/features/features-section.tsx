import { Badge } from "@/components/ui/badge";
import { AuthCard } from "./auth-card";
import { DeployCard } from "./deploy-card";
import { DrizzleCard } from "./drizzle-card";
import { EdgeApiCard } from "./edge-api-card";
import { TypeSafeCard } from "./typesafe-card";
import { UIComponentsCard } from "./ui-components-card";

export function FeaturesSection() {
	return (
		<section id="features" className="py-20 lg:py-28">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
				<div className="text-center mb-14">
					<Badge variant="secondary" className="mb-4 px-3 py-1 text-sm">
						Features
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
						Everything you need to ship
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Fully configured with authentication, database, UI components, and
						edge-first APIs. No boilerplate fatigue.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<AuthCard />
					<EdgeApiCard />
					<TypeSafeCard />
					<DrizzleCard />
					<UIComponentsCard />
					<DeployCard />
				</div>
			</div>
		</section>
	);
}
