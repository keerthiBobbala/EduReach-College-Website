import { useState } from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import AchievementsSection from "../components/AchievementsSection";
import CoursesSection from "../components/CoursesSection";
import QuotesSection from "../components/QuotesSection";
import MentorsSection from "../components/MentorsSection";
import StudentLifeSection from "../components/StudentLifeSection";
import EventsGallery from "../components/EventsGallery";
import CounselorCTA from "../components/CounselorCTA";
import HiringStatsSection from "../components/HiringStatsSection";
import Footer from "../components/Footer";
import CallPopup from "../components/CallPopup";

export default function HomePage() {
  const [showCallPopup, setShowCallPopup] = useState(false);

  const handleReachMentors = () => {
    // Scroll to mentors section or open modal
    document.getElementById('mentors')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <CoursesSection />
      <QuotesSection />
      <MentorsSection onReachMentors={handleReachMentors} />
      
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <StudentLifeSection />
          <EventsGallery />
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <CounselorCTA onOpenCall={() => setShowCallPopup(true)} />
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <HiringStatsSection />
        </div>
      </div>
      
      <Footer />
      
      {showCallPopup && (
        <CallPopup open={showCallPopup} onClose={() => setShowCallPopup(false)} />
      )}
    </>
  );
}
