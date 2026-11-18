import { redirect } from "next/navigation";

/* About now lives on the canvas homepage (02 — About me).
   Old links to /about land there instead of an outdated page. */
export default function AboutPage() {
  redirect("/");
}
