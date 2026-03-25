import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BookOpen, X, Loader2 } from "lucide-react";
import { bookSeat } from "../services/booking.service";
import { useNavigate } from "react-router-dom";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  selectedCourse: string | null;
}

export default function BookingModal({ open, onClose, selectedCourse }: BookingModalProps) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCourse) {
      setBranch(selectedCourse);
    }
  }, [selectedCourse]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !branch) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await bookSeat({
        courseName: selectedCourse || branch,
        name,
        phone,
        branch,
      });
      toast.success(res.message || "Successfully booked your seat!");
      onClose();
      // Reset form
      setName("");
      setPhone("");
    } catch (error: any) {
      if (error.message === "UNAUTHORIZED") {
        toast.error("Please login to book a seat.");
        onClose();
        navigate("/login");
      } else {
        toast.error(error.message || "Failed to book seat");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-maroon/10 p-3 rounded-full text-maroon hover:bg-maroon/20 transition-colors">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-900">Book Your Seat</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Please provide your details below to confirm your seat booking for the selected program.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="studentName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon outline-none transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="studentPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="studentPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 9876543210"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon outline-none transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="studentBranch" className="block text-sm font-medium text-gray-700 mb-1">
              Branch / Program
            </label>
            <input
              type="text"
              id="studentBranch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="e.g. Computer Science & Engineering"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon outline-none transition-all"
              required
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-maroon text-white rounded-lg hover:bg-maroon/90 transition-colors font-medium flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
