import { coursesContent, images } from "../data/content";
import { BookOpen, Users } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";

export default function CoursesSection() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenBooking = (courseName: string) => {
    setSelectedCourse(courseName);
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <section id="courses" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-maroon font-semibold text-sm uppercase tracking-wide mb-2">
            World-Class Education
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
            Programs Offered
          </h2>
        </div>

        {/* B.Tech grid */}
        <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4">
          B.Tech Programs (4 Years)
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {coursesContent.btech.map((course) => (
            <div
              key={course.name}
              onClick={() => handleOpenBooking(course.name)}
              className="bg-white rounded-lg p-5 border border-gray-100 hover:border-maroon hover:shadow-md transition-all duration-300 cursor-pointer relative"
            >
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-maroon mt-1 flex-shrink-0" />
                <div className="w-full relative">
                  <h4 className="font-semibold text-gray-900 pr-6">{course.name}</h4>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {course.seats} seats
                    </span>
                    <span className="text-maroon font-medium">{course.avg}</span>
                  </div>
                  {/* Action UI overlay info */}
                  <div className="mt-4 text-center">
                    <button className="w-full bg-maroon text-white font-medium py-2 rounded flex items-center justify-center hover:bg-maroon/90 transition-colors">
                      Book Seat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* M.Tech & MBA */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* M.Tech */}
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <img src={images.tech2} alt="Tech" className="w-16 h-16 rounded-lg object-cover" />
              <h3 className="font-heading text-xl font-semibold text-gray-800">M.Tech Programs</h3>
            </div>
            <div className="space-y-4">
              {coursesContent.mtech.map((course) => (
                <div key={course.name} className="flex justify-between items-center text-sm pb-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 p-2 rounded transition-colors group">
                  <div>
                    <span className="block font-medium text-gray-900">{course.name}</span>
                    <span className="text-gray-500">{course.seats} seats</span>
                  </div>
                  <button
                    onClick={() => handleOpenBooking(course.name)}
                    className="bg-maroon text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center"
                  >
                    Book Seat
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* MBA */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 relative group">
            <div className="flex items-center gap-4 mb-4">
              <img src={images.tech3} alt="MBA" className="w-16 h-16 rounded-lg object-cover" />
              <h3 className="font-heading text-xl font-semibold text-gray-800">MBA Program</h3>
            </div>
            <p className="text-gray-700 font-medium">{coursesContent.mba.name}</p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="text-gray-500">{coursesContent.mba.seats} seats</span>
              <span className="text-maroon font-medium">{coursesContent.mba.avg}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Specializations in Finance, Marketing, HR, and IT
            </p>
             <button
                onClick={() => handleOpenBooking(coursesContent.mba.name)}
                className="w-full bg-maroon text-white font-medium py-2 rounded flex items-center justify-center hover:bg-maroon/90 transition-colors"
              >
                Book MBA Seat
              </button>
          </div>
        </div>
      </div>
      
      <BookingModal 
        open={isModalOpen} 
        onClose={handleCloseBooking} 
        selectedCourse={selectedCourse} 
      />
    </section>
  );
}