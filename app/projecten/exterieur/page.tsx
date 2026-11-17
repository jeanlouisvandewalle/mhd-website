import { ProjectsIndex } from "@/components/ProjectsIndex";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Exterieur",
  description: "Exterieurprojecten van MHD: poolhouses, gevelbekleding en buitenschrijnwerk op maat.",
  path: "/projecten/exterieur/",
});

export default function Page() {
  return <ProjectsIndex category="exterieur" />;
}
