import React from 'react'
import Navbar from './Pages/Navbar'
import Hero from './Pages/Hero'
import Features from './Pages/Features'
import Discover from './Pages/Discover'
import PremierHouses from './Pages/PremierHouses'
import FAQ from './Pages/FAQ'
import Testimonials from './Pages/Testimonials'
import CTA from './Pages/CTA'
import Footer from './Pages/Footer'
import SignUpModal from './Pages/Signup'

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <Hero />
        {/* Added margin-top to account for the absolute-positioned search bar from Hero */}
        <div className="mt-32"> 
            <Features />
            <Discover />
            <PremierHouses />
            <FAQ />
            <Testimonials />
            <CTA />
        </div>
      </main>
      <Footer />

      {/* Modal Component (globally accessible) */}
      <SignUpModal />
    </div>
  )
}

export default App