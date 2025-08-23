import Hero from '@/components/Hero';
import ProjectsGrid from '@/components/ProjectsGrid';
import PageContainer from "@/components/PageContainer";
import SkillsBento from "@/components/SkillsBento";
import ContactSection from "@/components/ContactSection";
export default function HomePage() {
  return (
    <PageContainer>
      <Hero />
      <ProjectsGrid />
       <SkillsBento />
        <ContactSection />
    </PageContainer>
  );
}
