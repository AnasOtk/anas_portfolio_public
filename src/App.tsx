import Experience from "./components/experience/Experience";
import Faq from "./components/faq/Faq";
import Garden from "./components/garden/Garden";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Projects from "./components/projects/Projects";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Projects />
      <Experience />
      <Faq />
      <Garden />
    </>
  );
}
