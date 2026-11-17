import { ProjectsIndex } from "@/components/ProjectsIndex";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Totaalprojecten",
  description: "Totaalprojecten van MHD: van eerste idee tot laatste detail, binnen en buiten als één geheel.",
  path: "/projecten/totaalprojecten/",
});

export default function Page() {
  return <ProjectsIndex category="totaalprojecten" />;
}
