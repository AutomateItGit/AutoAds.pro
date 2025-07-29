import TagSEO from "@/components/TagSEO";
import TagSchema from "@/components/TagSchema";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import components
import AutomationShowcase from "@/components/AutomationShowcase";
import DemoVideo from "@/components/DemoVideo";
import Pricing from "@/components/Pricing";
import Faq from "@/components/FAQ";
import MultipleTestimonials from "@/components/MultipleTestimonials";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <>
      <TagSEO
        canonicalSlug=""
        title="AutoPlanner - Automatisez vos rappels de rendez-vous"
        description="Système automatisé de gestion des rendez-vous et de rappels via SMS, WhatsApp et Email pour salons de coiffure, instituts de beauté et artisans."
      />
      <TagSchema />

      <main>
        <Header />
        
        <Hero />
        <AutomationShowcase />
    
        <DemoVideo />
        <Pricing />
        
        <MultipleTestimonials />
        <Faq />
        <FinalCta />

        <Footer />
        testttttttt
      </main>
    </>
  );
}
