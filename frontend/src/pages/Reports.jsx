import React, { useState, useContext, useEffect, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const { courses, isAdmin, addAlert } = useContext(AppContext);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, navigate]);

  const fetchReport = useCallback(async () => {
    if (!selectedCourse) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/reports/course?id=${selectedCourse}`
      );
      if (res.ok) {
        const data = await res.json();
        setReportData(data);
      } else {
        addAlert("error", "Failed to generate report");
      }
    } catch {
      addAlert("error", "Server connection error");
    } finally {
      setIsLoading(false);
    }
  }, [BASE_URL, selectedCourse, addAlert]);

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4">
              Administrative Analytics
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Report Console</h1>
          </div>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-slate-900 hover:text-slate-900 transition-all shadow-sm"
          >
            Back to Dashboard
          </button>
        </header>

        <div className="bg-white p-10 rounded-[32px] shadow-xl shadow-slate-200/50 mb-10 border border-slate-100">
          <div className="flex flex-col gap-6">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Target Curricula Selection</label>
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="flex-grow py-4 px-6 rounded-2xl border-2 border-slate-100 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50 text-slate-900 font-bold"
              >
                <option value="">-- Choose Course for Deep-Scan --</option>
                {courses.map((c) => (
                  <option key={c.courseId} value={c.courseId}>
                    {c.title}
                  </option>
                ))}
              </select>
              <button
                onClick={fetchReport}
                className="bg-slate-900 text-white font-black py-4 px-10 rounded-2xl hover:bg-emerald-600 transition-all text-xs uppercase tracking-widest active:scale-95 shadow-xl shadow-slate-900/10 disabled:opacity-50"
                disabled={isLoading || !selectedCourse}
              >
                {isLoading ? "Scanning..." : "Execute Report"}
              </button>
            </div>
          </div>
        </div>

        {reportData && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-2xl font-black text-slate-900 mb-8 border-l-8 border-emerald-500 pl-6 uppercase tracking-tight">
              Report Intelligence: {reportData.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg shadow-slate-200/40 group hover:border-emerald-300 transition-all">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Institutional Enrollments</span>
                <span className="text-5xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{reportData.enrollments}</span>
                <p className="mt-4 text-sm text-slate-500 font-medium leading-relaxed">
                  Active scholars currently matriculated within this specific module.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg shadow-slate-200/40 group hover:border-emerald-300 transition-all">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Global Ecosystem Census</span>
                <span className="text-5xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {reportData.total_students || 0}
                </span>
                <p className="mt-4 text-sm text-slate-500 font-medium leading-relaxed">
                  Aggregated registered user base across the entire educational platform.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-[32px] flex items-start gap-6">
               <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <div>
                  <h4 className="text-sm font-black text-emerald-900 uppercase tracking-widest mb-2">Technical Implementation Note</h4>
                  <p className="text-emerald-800 text-sm font-medium leading-relaxed">
                    This report was synthesized by executing the <code className="bg-emerald-200 px-1.5 py-0.5 rounded font-black">GetCourseReport</code> 
                    stored procedure. System-wide metrics were aggregated via native MySQL functions for maximum computational accuracy.
                  </p>
               </div>
            </div>
          </div>
        )}

        {selectedCourse && !reportData && !isLoading && (
          <div className="py-20 text-center bg-white rounded-[32px] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">
              Initiate scan to reveal underlying PL/SQL metadata.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
