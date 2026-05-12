import { Globe } from "lucide-react";
import { motion } from "motion/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const providers = [
	{ name: "Cloudflare", status: "Ready" },
	{ name: "Vercel", status: "Ready" },
	{ name: "Netlify", status: "Ready" },
];

export function DeployCard() {
	return (
		<motion.div initial="idle" whileHover="hovered" animate="idle">
			<Card className="rounded-3xl border-0 bg-primary/5 shadow-none p-0 h-full">
				<CardHeader className="p-8 pb-0">
					<div className="bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center mb-2">
						<Globe className="h-5 w-5 text-primary" />
					</div>
					<CardTitle className="text-2xl font-bold">Deploy Anywhere</CardTitle>
					<CardDescription className="leading-relaxed">
						One-click deploy to Cloudflare, Vercel, or Netlify with CI/CD
						pipelines already configured.
					</CardDescription>
				</CardHeader>
				<CardContent className="p-8 pt-4">
					<motion.div
						className="space-y-2"
						variants={{
							hovered: { transition: { staggerChildren: 0.06 } },
						}}
					>
						{providers.map((d) => (
							<motion.div
								key={d.name}
								className="flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2"
								variants={{
									idle: { opacity: 0.7, x: -6 },
									hovered: { opacity: 1, x: 0 },
								}}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 20,
								}}
							>
								<span className="text-xs font-medium text-primary">
									{d.name}
								</span>
								<div className="flex items-center gap-1.5">
									<motion.div
										className="w-1.5 h-1.5 rounded-full bg-primary"
										variants={{
											idle: { scale: 1 },
											hovered: { scale: [1, 1.8, 1] },
										}}
										transition={{ duration: 0.3 }}
									/>
									<span className="text-[10px] text-muted-foreground">
										{d.status}
									</span>
								</div>
							</motion.div>
						))}
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
