import Hero from '@/components/Hero';
import ProjectsGrid from '@/components/ProjectsGrid';
import PageContainer from "@/components/PageContainer";
import SkillsBento from "@/components/SkillsBento";
export default function HomePage() {
  return (
    <PageContainer>
      <Hero />
      <ProjectsGrid />
       <SkillsBento />
    </PageContainer>
  );
}
