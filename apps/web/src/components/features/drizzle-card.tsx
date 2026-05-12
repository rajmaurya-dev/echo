import { Database } from "lucide-react";
import { motion } from "motion/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const tables = [
	{ table: "users", cols: "id, email, name, role", rows: "2,847" },
	{ table: "sessions", cols: "id, userId, token, expiresAt", rows: "12,003" },
	{ table: "subscriptions", cols: "id, userId, plan, status", rows: "1,204" },
];

export function DrizzleCard() {
	return (
		<motion.div
			initial="idle"
			whileHover="hovered"
			animate="idle"
			className="md:row-span-2 h-full"
		>
			<Card className="rounded-3xl border-0 bg-muted shadow-none p-0 h-full">
				<CardHeader className="p-8 pb-0">
					<div className="bg-muted-foreground/10 w-10 h-10 rounded-xl flex items-center justify-center mb-2">
						<Database className="h-5 w-5 text-muted-foreground" />
					</div>
					<CardTitle className="text-2xl font-bold">Drizzle ORM</CardTitle>
					<CardDescription className="leading-relaxed">
						Type-safe database layer with automatic migrations, relations, and
						zero-overhead queries.
					</CardDescription>
				</CardHeader>
				<CardContent className="p-8 pt-4 mt-auto">
					<motion.div
						className="space-y-2"
						variants={{
							hovered: { transition: { staggerChildren: 0.07 } },
						}}
					>
						{tables.map((t) => (
							<motion.div
								key={t.table}
								className="rounded-xl bg-background p-3"
								variants={{
									idle: { opacity: 0.6, y: 12 },
									hovered: { opacity: 1, y: 0 },
								}}
								transition={{
									type: "spring",
									stiffness: 350,
									damping: 22,
								}}
							>
								<div className="flex items-center justify-between mb-1">
									<span className="text-xs font-semibold text-foreground">
										{t.table}
									</span>
									<span className="text-[10px] font-mono text-muted-foreground">
										{t.rows} rows
									</span>
								</div>
								<span className="text-[10px] text-muted-foreground font-mono">
									{t.cols}
								</span>
							</motion.div>
						))}
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
