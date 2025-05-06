import { Metadata } from "next";
import AboutClient from "./client";
import { getAbout } from "./server";

export const metadata: Metadata = {
  title: "Jacob Brasil - About",
  description: "About me including my work experiences and education",
  openGraph: {
    title: "Jacob Brasil - About",
    description: "About me including my work experiences and education",
    images: [{ url: "https://jacobbrasil.com/logo-bg.png" }],
  },
};

export default async function About() {
  const about = await getAbout();

  return <AboutClient about={about} />;
}
