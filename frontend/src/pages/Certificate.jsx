import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Certificate = () => {
  const { user } = useContext(AppContext);
  const latestCertificate = user.certificates[user.certificates.length - 1];

  if (!latestCertificate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            No Certificates Yet
          </h2>
          <p className="text-gray-500 mt-2">
            Complete a course to earn your first certificate!
          </p>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    // Placeholder for actual PDF generation logic
    alert("Downloading PDF... (Placeholder)");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Your Certificate
        </h1>
        <p className="text-gray-600">Congratulations on your achievement!</p>
      </div>

      {/* Certificate Container */}
      <div className="bg-white p-2 shadow-xl border border-gray-200 max-w-4xl w-full mx-auto relative print:shadow-none print:p-0 print:border-none">
        {/* Changed gradient to slate/emerald, border to emerald-600 */}
        <div className="border-4 border-emerald-600 p-12 text-center relative overflow-hidden bg-gradient-to-br from-slate-50 to-emerald-50">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-slate-200 rounded-br-full opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-200 rounded-tl-full opacity-30"></div>

          <div className="mb-8 relative z-10">
            {/* Changed indigo-900 to slate-900 */}
            <span className="text-4xl font-bold text-slate-900 uppercase tracking-widest border-b-4 border-slate-900 pb-2 inline-block">
              Certificate of Completion
            </span>
          </div>

          <div className="text-xl text-gray-600 italic mb-8 relative z-10">
            This is to proudly certify that
          </div>

          <div className="text-5xl font-serif text-slate-900 mb-8 border-b border-gray-300 pb-4 inline-block px-12 relative z-10">
            {user.name}
          </div>

          <div className="text-xl text-gray-600 italic mb-8 relative z-10">
            has successfully completed the course
          </div>

          {/* Changed indigo-800 to emerald-700 */}
          <div className="text-3xl font-bold text-emerald-700 mb-16 relative z-10">
            {latestCertificate.courseTitle}
          </div>

          <div className="flex justify-between items-end px-12 mt-12 relative z-10">
            <div className="text-center">
              <div className="border-b border-gray-400 pb-2 mb-2 w-48 text-lg text-slate-900">
                {latestCertificate.date}
              </div>
              <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                Date Issued
              </div>
            </div>

            <div className="text-center">
              {/* Fake seal: changed yellow to emerald */}
              <div className="w-24 h-24 mx-auto border-4 border-emerald-600 rounded-full flex items-center justify-center bg-emerald-600 shadow-inner mb-4 relative">
                <div className="absolute inset-1 border-2 border-dashed border-emerald-300 rounded-full"></div>
                <span className="text-white font-bold text-xs uppercase text-center leading-tight">
                  LearnHub
                  <br />
                  Certified
                </span>
              </div>
            </div>

            <div className="text-center">
              <div className="border-b border-gray-400 pb-2 mb-2 w-48 relative">
                <span className="font-script text-3xl text-slate-900 absolute bottom-1 left-1/2 transform -translate-x-1/2 font-signature">
                  J. Doe
                </span>
              </div>
              <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                Director of Education
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 flex gap-4 print:hidden">
        {/* Changed indigo to emerald */}
        <button
          onClick={() => window.print()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all flex items-center gap-2 focus:ring-4 focus:ring-emerald-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            ></path>
          </svg>
          Print Certificate
        </button>
        {/* Secondary button */}
        <button
          onClick={handleDownload}
          className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all flex items-center gap-2 focus:ring-4 focus:ring-slate-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            ></path>
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Certificate;
