import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Clock, Briefcase, Tag, FileText } from "lucide-react";

// --- IMPORTANT: আপনার Firebase Auth Context আমদানি করা হলো ---
// (এই কনটেক্সটটি আপনাকে user অবজেক্ট এবং loading স্টেট প্রদান করে)

import { ROOT } from "../../../constant/motherUrl";
import { AuthContext } from "../../../providers/AuthProvider";
// -----------------------------------------------------------

const MyWork = () => {
  // Auth Context থেকে ইউজারের তথ্য আনা হচ্ছে (useAuth প্রতিস্থাপিত)
  const { user, loading: authLoading } = useContext(AuthContext);

  // API থেকে আসা ডেটা স্টেট
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ইউজারের ইমেইল - ডাটাবেস ফিল্টারিং এর জন্য এটি আবশ্যক
  const userEmail = user?.email; // Firebase Auth থেকে আসা ইউজার অবজেক্টের ইমেইল

  const API_ENDPOINT = `${ROOT}/api/works`;

  useEffect(() => {
    // ১. Auth ডেটা লোড হওয়ার অপেক্ষা
    if (authLoading) {
      setLoading(true);
      return;
    }

    // ২. যদি ইউজার লগইন না করে (ইমেইল না থাকে)
    if (!userEmail) {
      // যদি অথ লোডিং শেষ হয়ে যায় কিন্তু কোনো ইউজার না থাকে
      setError("অনুগ্রহ করে লগইন করুন। আপনার কাজ দেখতে ইমেইল আইডি আবশ্যক।");
      setLoading(false);
      return;
    }

    const fetchWorks = async () => {
      setLoading(true);
      setError(null);

      try {
        // ইউজার ইমেইল Query Parameter হিসেবে যুক্ত করা হলো
        // শুধুমাত্র এই ইমেইলের কাজগুলি ফিল্টার হয়ে আসবে (Backend-এ 'work_routes.js' অনুযায়ী)
        const response = await axios.get(`${API_ENDPOINT}?email=${userEmail}`);

        setWorks(response.data);
      } catch (err) {
        console.error("Error fetching works:", err);
        setError(
          "আপনার কাজগুলো আনতে ব্যর্থ হয়েছে। সার্ভার সংযোগ বা API এন্ডপয়েন্ট চেক করুন।"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
    // userEmail বা authLoading পরিবর্তন হলে useEffect পুনরায় রান হবে
  }, [userEmail, authLoading]);

  // --- Loading, Error, and Empty State Handling ---

  const LoadingState = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-500"></div>
      <p className="ml-4 text-lg font-medium text-indigo-600">
        কাজ লোড হচ্ছে...
      </p>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center p-8 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md max-w-xl mx-auto">
      <p className="font-bold text-xl">ত্রুটি!</p>
      <p className="mt-2">{error}</p>
    </div>
  );

  const EmptyState = () => {
    // যদি ইউজার লগইন না করে, তবে EmptyState এর পরিবর্তে ErrorState দেখাবে।
    if (!userEmail) return null;

    return (
      <div className="text-center p-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-lg shadow-md max-w-xl mx-auto">
        <p className="font-bold text-xl">কোনো কাজ জমা নেই।</p>
        <p className="mt-2">
          আপনি এখনও কোনো কাজ জমা দেননি, অথবা আপনার ইমেইলটি ({userEmail || "N/A"}
          ) ডাটাবেসে কোনো কাজ খুঁজে পায়নি।
        </p>
      </div>
    );
  };

  if (loading || authLoading) {
    return <LoadingState />;
  }

  // যদি Auth লোডিং শেষ হওয়ার পরেও কোনো userEmail না থাকে, তবে ErrorState দেখাও (যা লগইন করতে বলবে)
  if (error || !userEmail) {
    return <ErrorState />;
  }

  if (works.length === 0) {
    return <EmptyState />;
  }

  // --- Work Card Component ---
  const WorkCard = ({ work }) => {
    const submissionDate = work.submissionDate
      ? new Date(work.submissionDate).toLocaleDateString("bn-BD", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "অজানা তারিখ";

    const statusColor =
      work.status === "pending"
        ? "bg-yellow-100 text-yellow-700 ring-yellow-500/20"
        : "bg-green-100 text-green-700 ring-green-500/20";

    const statusText = work.status === "pending" ? "বিচারাধীন" : "অনুমোদিত";

    return (
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 flex flex-col">
        {/* Header and Status */}
        <div className="flex justify-between items-start mb-4 border-b pb-3">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <Briefcase className="w-6 h-6 mr-2 text-indigo-500" />
            {work.workName}
          </h3>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ring-1 ${statusColor}`}
          >
            {statusText}
          </span>
        </div>

        {/* Details Grid */}
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-2 text-purple-400" />
            <span className="font-medium">ক্যাটাগরি:</span>
            <span className="ml-2 text-gray-700 font-semibold">
              {work.workCategory}
            </span>
          </div>

          <div className="flex items-start">
            <FileText className="w-4 h-4 mt-1 mr-2 text-teal-400 shrink-0" />
            <span className="font-medium shrink-0">বিবরণ:</span>
            <p className="ml-2 overflow-auto max-h-20 text-gray-700 bg-gray-50 p-2 rounded-lg border">
              {work.workDetails}
            </p>
          </div>

          {/* Work Link */}
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2 text-sky-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span className="font-medium">লিঙ্ক:</span>
            <a
              href={work.workLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-sky-600 hover:text-sky-800 underline truncate max-w-[200px] inline-block"
              title={work.workLink}
            >
              {work.workLink}
            </a>
          </div>

          <div className="flex items-center pt-2 border-t border-gray-100">
            <Clock className="w-4 h-4 mr-2 text-indigo-400" />
            <span className="font-medium">জমা দেওয়া হয়েছে:</span>
            <span className="ml-2 text-gray-500">{submissionDate}</span>
          </div>
        </div>
      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-2">
        আমার জমা দেওয়া কাজের তালিকা
      </h1>
      <p className="text-center text-gray-500 mb-10 text-sm">
        ({userEmail ? `${userEmail}` : "লগইন প্রয়োজন"} ইমেইল দ্বারা ফিল্টার করা
        হচ্ছে)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {works.map((work) => (
          <WorkCard key={work._id} work={work} />
        ))}
      </div>
    </div>
  );
};

export default MyWork;
