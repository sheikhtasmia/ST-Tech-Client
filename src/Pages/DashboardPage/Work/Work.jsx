import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ROOT } from "../../../constant/motherUrl";

// কাজ ক্যাটাগরি
const workCategories = [
  "Web Development",
  "Digital & Organic Marketing",
  "SEO",
  "Data Analysis",
  "Graphics Design",
  "Content Writing",
  "HR & Recruitment",
  "MSOffice Services",
];

const Work = () => {
  const [submissionStatus, setSubmissionStatus] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      submitterName: "",
      submitterEmail: "",
      workName: "",
      workCategory: "",
      workDetails: "",
      workLink: "", // নতুন ফিল্ড যোগ করা হয়েছে
    },
  });

  const onSubmit = async (data) => {
    setSubmissionStatus("জমা হচ্ছে...");
    // API Endpoint: local server URL ব্যবহার করুন
    const API_ENDPOINT = `${ROOT}/api/works`;

    try {
      await axios.post(API_ENDPOINT, data);

      setSubmissionStatus(`Success: কাজ সফলভাবে জমা হয়েছে!`);
      reset();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error: কাজ জমা দিতে পারেনি।";
      setSubmissionStatus(errorMessage);
    }
  };

  return (
    <div className="p-4 max-w-full mx-auto bg-white shadow-xl rounded-lg my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        জমা দিন: আপনার কাজ/প্রকল্প
      </h2>

      {/* Submission Status Message */}
      {submissionStatus && (
        <p
          className={`mt-4 p-3 rounded-md text-center text-sm font-medium ${
            submissionStatus.includes("Success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {submissionStatus}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 mt-6"
      >
        {/* 1. Submitter Name / যিনি জমা দিচ্ছেন তাঁর নাম */}
        <div>
          <label
            htmlFor="submitterName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            **আপনার নাম:**
          </label>
          <input
            id="submitterName"
            type="text"
            placeholder="আপনার পুরো নাম"
            {...register("submitterName", {
              required: "নাম অবশ্যই দিতে হবে",
              minLength: {
                value: 3,
                message: "নামের দৈর্ঘ্য কমপক্ষে ৩ অক্ষর হতে হবে",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.submitterName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.submitterName.message}
            </p>
          )}
        </div>

        {/* 2. Submitter Email / ইমেইল */}
        <div>
          <label
            htmlFor="submitterEmail"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            **আপনার ইমেইল:**
          </label>
          <input
            id="submitterEmail"
            type="email"
            placeholder="example@domain.com"
            {...register("submitterEmail", {
              required: "ইমেইল অবশ্যই দিতে হবে",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "বৈধ ইমেইল অ্যাড্রেস দিতে হবে",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.submitterEmail && (
            <p className="text-red-500 text-xs mt-1">
              {errors.submitterEmail.message}
            </p>
          )}
        </div>

        {/* 3. Work Name / কাজের নাম */}
        <div>
          <label
            htmlFor="workName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            **কাজ/প্রকল্পের নাম:**
          </label>
          <input
            id="workName"
            type="text"
            placeholder="যেমন: ই-কমার্স ওয়েবসাইট"
            {...register("workName", {
              required: "কাজের নাম অবশ্যই দিতে হবে",
              minLength: {
                value: 5,
                message: "নামের দৈর্ঘ্য কমপক্ষে ৫ অক্ষর হতে হবে",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.workName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.workName.message}
            </p>
          )}
        </div>

        {/* 4. Work Category / কাজের শ্রেণী */}
        <div>
          <label
            htmlFor="workCategory"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            **কাজের শ্রেণী:**
          </label>
          <select
            id="workCategory"
            {...register("workCategory", {
              required: "কাজের শ্রেণী নির্বাচন করা আবশ্যক",
            })}
            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">-- একটি শ্রেণী নির্বাচন করুন --</option>
            {workCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.workCategory && (
            <p className="text-red-500 text-xs mt-1">
              {errors.workCategory.message}
            </p>
          )}
        </div>

        {/* 5. Work Link / কাজের লিংক (নতুন ফিল্ড) */}
        <div>
          <label
            htmlFor="workLink"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            **কাজের লিঙ্ক (URL):**
          </label>
          <input
            id="workLink"
            type="url"
            placeholder="https://example.com/my-work"
            {...register("workLink", {
              required: "কাজের লিঙ্ক অবশ্যই দিতে হবে",
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: "বৈধ URL ফরম্যাটে লিঙ্ক দিতে হবে",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.workLink && (
            <p className="text-red-500 text-xs mt-1">
              {errors.workLink.message}
            </p>
          )}
        </div>

        {/* 6. Work Details / কাজের বিবরণ */}
        <div>
          <label
            htmlFor="workDetails"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            **কাজের বিবরণ:**
          </label>
          <textarea
            id="workDetails"
            rows="4"
            placeholder="কাজের বিস্তারিত বর্ণনা, ব্যবহৃত প্রযুক্তি ইত্যাদি লিখুন।"
            {...register("workDetails", {
              required: "কাজের বিবরণ দিতে হবে",
              maxLength: {
                value: 500,
                message: "বিবরণ ৫০০ অক্ষরের বেশি হতে পারবে না",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          ></textarea>
          {errors.workDetails && (
            <p className="text-red-500 text-xs mt-1">
              {errors.workDetails.message}
            </p>
          )}
        </div>

        {/* ফর্ম সাবমিট বাটন */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150 ease-in-out ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
        >
          {isSubmitting ? "জমা হচ্ছে..." : "কাজটি জমা দিন"}
        </button>
      </form>
    </div>
  );
};

export default Work;
