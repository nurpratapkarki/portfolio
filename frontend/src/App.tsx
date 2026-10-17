import Footer from "./components/Footer";
import SiteNav from "./components/SiteNav";
import ScrollToTop from "./components/ScrollToTop";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PortfolioDetailPage from "./pages/PortfolioDetailPage";
import PortfolioPage from "./pages/PortfolioPage";
import TestimonialDetailPage from "./pages/TestimonialDetailPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="site-page">
      <div className="site-grid" aria-hidden="true" />
      <SiteNav />
      <main className="site-content">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:projectId" element={<PortfolioDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/testimonials/:testimonialId" element={<TestimonialDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
