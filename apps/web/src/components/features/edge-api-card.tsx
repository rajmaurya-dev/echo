import { Zap } from "lucide-react";
import { motion } from "motion/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const latencyData = [
	{ region: "US East", ms: "12ms", pct: 15 },
	{ region: "Europe", ms: "18ms", pct: 22 },
	{ region: "Asia Pacific", ms: "24ms", pct: 30 },
	{ region: "South America", ms: "31ms", pct: 38 },
];

export function EdgeApiCard() {
	return (
		<motion.div
			initial="idle"
			whileHover="hovered"
			animate="idle"
			className="md:row-span-2 h-full"
		>
			<Card className="rounded-3xl border-0 bg-accent/50 shadow-none p-0 h-full">
				<CardHeader className="p-8 pb-0">
					<div className="bg-accent w-10 h-10 rounded-xl flex items-center justify-center mb-2">
						<Zap className="h-5 w-5 text-accent-foreground" />
					</div>
					<CardTitle className="text-2xl font-bold">Edge-First API</CardTitle>
					<CardDescription className="leading-relaxed">
						Hono running on Cloudflare Workers for blazing-fast API responses
						from 300+ edge locations worldwide.
					</CardDescription>
				</CardHeader>
				<CardContent className="p-8 pt-4 mt-auto">
					<motion.div
						className="space-y-3"
						variants={{
							hovered: { transition: { staggerChildren: 0.08 } },
						}}
					>
						{latencyData.map((item) => (
							<div key={item.region} className="flex items-center gap-3">
								<span className="text-xs text-muted-foreground w-24 shrink-0">
									{item.region}
								</span>
								<div className="flex-1 h-2 rounded-full bg-accent overflow-hidden">
									<motion.div
										className="h-full rounded-full bg-primary"
										variants={{
											idle: { width: "0%" },
											hovered: { width: `${item.pct}%` },
										}}
										transition={{
											type: "spring",
											stiffness: 300,
											damping: 25,
										}}
									/>
								</div>
								<span className="text-xs font-mono font-medium text-primary w-10 text-right">
									{item.ms}
								</span>
							</div>
						))}
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
