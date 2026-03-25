import { useState } from "react";
import toast from "react-hot-toast";
import { Phone, X, Loader2 } from "lucide-react";
import { initiateOutboundCall } from "../services/vapi.service";

interface CallPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function CallPopup({ open, onClose }: CallPopupProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferredCourse, setPreferredCourse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setIsLoading(true);
    try {
      await initiateOutboundCall({ phoneNumber, preferredCourse });
      toast.success("Call initiated! You will receive a call shortly.");
      onClose();
    } catch (error) {
      toast.error("Failed to initiate call. Please try again.");
      console.error(error);
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
            <Phone className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-900">AI Counselor Call</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Enter your details below and our AI counselor will call you immediately to discuss your preferred courses and answer any questions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. +91 9876543210"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon outline-none transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Course (Optional)
            </label>
            <input
              type="text"
              id="course"
              value={preferredCourse}
              onChange={(e) => setPreferredCourse(e.target.value)}
              placeholder="e.g. Computer Science"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon outline-none transition-all"
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
                  Calling...
                </>
              ) : (
                "Call Me Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}