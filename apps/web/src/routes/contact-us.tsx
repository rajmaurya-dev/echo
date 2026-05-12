import { createFileRoute } from "@tanstack/react-router";
import ComingSoon from "@/components/ComingSoon";

export const Route = createFileRoute("/contact-us")({
	component: () => <ComingSoon serviceName="Contact Us" />,
});
