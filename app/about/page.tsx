import { redirect } from "next/navigation";

/* The old About page now lives on the canvas as "My story". */
export default function AboutPage() {
  redirect("/#story");
}