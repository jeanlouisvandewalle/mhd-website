import { ProjectsIndex } from "@/components/ProjectsIndex";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Projecten",
  description: "Een selectie van realisaties door MHD: maatwerk in interieur, exterieur en totaalprojecten.",
  path: "/projecten/",
});

export default function Page() {
  return <ProjectsIndex />;
}
