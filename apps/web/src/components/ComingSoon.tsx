import { motion } from "motion/react";

interface ComingSoonProps {
	serviceName: string;
}

const ComingSoon = ({ serviceName }: ComingSoonProps) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="text-center"
			>
				<h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-primary">
					Coming Soon
				</h1>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 1 }}
					className="text-2xl md:text-3xl text-muted-foreground font-medium"
				>
					{serviceName}
				</motion.p>
			</motion.div>

			<motion.div
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
				className="w-24 h-1 bg-primary mt-8 rounded-full"
			/>
		</div>
	);
};

export default ComingSoon;
