import { ContactSection } from "@/components/sections/contact";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { ServicesSection } from "@/components/sections/services";
import { TechStackSection } from "@/components/sections/tech-stack";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { WorkflowBuilderSection } from "@/components/sections/workflow-builder";

export default function HomePage() {
	return (
		<div className="flex flex-col w-full">
			<HeroSection />
			<ServicesSection />
			<WorkflowBuilderSection />
			<TechStackSection />
			<ProjectsSection />
			<TestimonialsSection />
			<ContactSection />
		</div>
	);
}
