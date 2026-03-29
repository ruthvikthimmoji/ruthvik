import Contact from "./components/Footer"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import OngoingWork from "./components/OngoingWork"
import Projects from "./components/Projects"
import Testimonials from "./components/Testimonials"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OngoingWork />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
  )
}
