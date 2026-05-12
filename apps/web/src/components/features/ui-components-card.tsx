import { Layers } from "lucide-react";
import { motion } from "motion/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const components = ["Button", "Dialog", "Table", "Form", "Toast", "Tabs"];

export function UIComponentsCard() {
	return (
		<motion.div initial="idle" whileHover="hovered" animate="idle">
			<Card className="rounded-3xl border-0 bg-accent/50 shadow-none p-0 h-full">
				<CardHeader className="p-8 pb-0">
					<div className="bg-accent w-10 h-10 rounded-xl flex items-center justify-center mb-2">
						<Layers className="h-5 w-5 text-accent-foreground" />
					</div>
					<CardTitle className="text-2xl font-bold">UI Components</CardTitle>
					<CardDescription className="leading-relaxed">
						50+ polished shadcn/ui components with dark mode, theming, and full
						accessibility.
					</CardDescription>
				</CardHeader>
				<CardContent className="p-8 pt-4">
					<motion.div
						className="grid grid-cols-3 gap-2"
						variants={{
							hovered: { transition: { staggerChildren: 0.04 } },
						}}
					>
						{components.map((c) => (
							<motion.div
								key={c}
								className="rounded-lg bg-accent px-2 py-2 text-center text-[11px] font-medium text-accent-foreground"
								variants={{
									idle: { scale: 1 },
									hovered: { scale: 1.06 },
								}}
								transition={{
									type: "spring",
									stiffness: 500,
									damping: 15,
								}}
							>
								{c}
							</motion.div>
						))}
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
