import { ProjectsIndex } from "@/components/ProjectsIndex";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Interieur",
  description: "Interieurprojecten van MHD: keukens, maatkasten, wandbekleding en volledige binnenafwerking op maat.",
  path: "/projecten/interieur/",
});

export default function Page() {
  return <ProjectsIndex category="interieur" />;
}
