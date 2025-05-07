import { getProjects } from "./navbar-server";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const projects = await getProjects();
  return <NavbarClient projects={projects} />;
}
