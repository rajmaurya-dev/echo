import { Code2 } from "lucide-react";
import { motion } from "motion/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const codeLineTransition = { type: "spring" as const, stiffness: 400, damping: 22 };

export function TypeSafeCard() {
	return (
		<motion.div initial="idle" whileHover="hovered" animate="idle">
			<Card className="rounded-3xl border-0 bg-secondary shadow-none p-0 h-full">
				<CardHeader className="p-8 pb-0">
					<div className="bg-secondary-foreground/10 w-10 h-10 rounded-xl flex items-center justify-center mb-2">
						<Code2 className="h-5 w-5 text-secondary-foreground" />
					</div>
					<CardTitle className="text-2xl font-bold">
						Type-Safe Stack
					</CardTitle>
					<CardDescription className="leading-relaxed">
						End-to-end TypeScript with TanStack Router and Query for robust,
						refactor-friendly development.
					</CardDescription>
				</CardHeader>
				<CardContent className="p-8 pt-4">
					<motion.div
						className="rounded-xl bg-secondary-foreground/5 p-4 font-mono text-xs leading-relaxed text-secondary-foreground overflow-hidden"
						variants={{
							hovered: { transition: { staggerChildren: 0.06 } },
						}}
					>
						<motion.div
							className="opacity-50"
							variants={{
								idle: { opacity: 0.3, x: -8, filter: "blur(2px)" },
								hovered: { opacity: 0.5, x: 0, filter: "blur(0px)" },
							}}
							transition={codeLineTransition}
						>
							{"// Fully typed routes"}
						</motion.div>
						<motion.div
							variants={{
								idle: { opacity: 0.4, x: -8, filter: "blur(2px)" },
								hovered: { opacity: 1, x: 0, filter: "blur(0px)" },
							}}
							transition={codeLineTransition}
						>
							<span className="text-primary">const</span> route ={" "}
							<span className="text-primary">createFileRoute</span>(
						</motion.div>
						<motion.div
							className="pl-2"
							variants={{
								idle: { opacity: 0.4, x: -8, filter: "blur(2px)" },
								hovered: { opacity: 1, x: 0, filter: "blur(0px)" },
							}}
							transition={codeLineTransition}
						>
							<span className="text-accent-foreground">"/dashboard"</span>
						</motion.div>
						<motion.div
							variants={{
								idle: { opacity: 0.4, x: -8, filter: "blur(2px)" },
								hovered: { opacity: 1, x: 0, filter: "blur(0px)" },
							}}
							transition={codeLineTransition}
						>
							)
						</motion.div>
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
