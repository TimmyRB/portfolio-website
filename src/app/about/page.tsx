import { Metadata } from "next";
import AboutClient from "./client";
import { getAbout } from "./server";

export const metadata: Metadata = {
  title: "About - Jacob Brasil",
  description: "About me including my work experiences and education",
  openGraph: {
    title: "About - Jacob Brasil",
    description: "About me including my work experiences and education",
    images: [{ url: "https://jacobbrasil.com/logo-bg.png" }],
    siteName: "Jacob Brasil",
    url: "https://jacobbrasil.com/about",
    type: "profile",
    locale: "en_CA",
    firstName: "Jacob",
    lastName: "Brasil",
    username: "TimmyRB",
    gender: "male",
  },
};

export default async function About() {
  const about = await getAbout();

  return <AboutClient about={about} />;
}
