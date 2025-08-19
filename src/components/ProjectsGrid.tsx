import { projects } from "@/data/projects";
import ProjectRow from "@/components/ProjectRow";
import ScrollFloatTitle from "@/components/ui/ScrollFloatTitle";

export default function ProjectsGrid() {
  return (
    <section id="projects" className="scroll-mt-24 py-20">
      <div className="max-w-full px-12">
        <div className="mb-20 flex items-end justify-between">
          <ScrollFloatTitle text="Projects" className="text-4xl font-bold" />
          <a
            href="https://github.com/KenCamagay"
            target="_blank"
            rel="noreferrer"
            className="text-sm underline text-white/80 hover:text-white"
          >
            More on GitHub
          </a>
        </div>

        <div className="space-y-36 md:space-y-40">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <ProjectRow p={p} reversed={i % 2 === 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
