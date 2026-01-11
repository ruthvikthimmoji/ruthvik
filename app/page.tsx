import Contact from "./components/Contact"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Projects from "./components/Projects"
import Testimonials from "./components/Testimonials"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
  )
}
