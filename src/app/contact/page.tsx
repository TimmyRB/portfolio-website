import ContactClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Jacob Brasil",
  description: "Contact me for any inquiries or to get in touch",
  openGraph: {
    title: "Contact - Jacob Brasil",
    description: "Contact me for any inquiries or to get in touch",
    images: [{ url: "https://jacobbrasil.com/logo-bg.png" }],
    siteName: "Jacob Brasil",
    url: "https://jacobbrasil.com/contact",
    type: "website",
    locale: "en_CA",
  },
};

export default function Contact() {
  return <ContactClient />;
}
