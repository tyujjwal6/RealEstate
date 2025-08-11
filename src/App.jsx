import React, { lazy, Suspense } from 'react'

import Loader from './Pages/Loader'; 
const Navbar = lazy(() => import('./Pages/Navbar'));
const Hero = lazy(() => import('./Pages/Hero'));
const Features = lazy(() => import('./Pages/Features'));
const Discover = lazy(() => import('./Pages/Discover'));
const PremierHouses = lazy(() => import('./Pages/PremierHouses'));
const FAQ = lazy(() => import('./Pages/FAQ'));
const Testimonials = lazy(() => import('./Pages/Testimonials'));
const CTA = lazy(() => import('./Pages/CTA'));
const Footer = lazy(() => import('./Pages/Footer'));
const SignUpModal = lazy(() => import('./Pages/Signup'));

function App() {
  return (
    // Wrap your entire application in a Suspense component
    // The `fallback` is what gets shown while components are loading.
    <Suspense fallback={<Loader />}>
      <div className="font-sans">
        <Navbar />
        <main>
          <Hero />
          {/* Added margin-top to account for the absolute-positioned search bar from Hero */}
          <div className=""> 
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
    </Suspense>
  );
}

export default App;