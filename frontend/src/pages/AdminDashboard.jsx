import React, { useState, useContext, useEffect, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { courses, fetchCourses, isAdmin, user, addAlert } =
    useContext(AppContext);
  const [students, setStudents] = useState([]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: "",
    desc: "",
    instructorId: 1,
  });
  const [activeTab, setActiveTab] = useState("courses");
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL || "";

  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/students`);
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch {
      console.error("Failed to fetch students");
    }
  }, [BASE_URL]);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
      return;
    }
    fetchStudents();
  }, [isAdmin, navigate, fetchStudents]);

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    const method = editingCourse ? "PUT" : "POST";
    const payload = editingCourse
      ? { ...courseForm, courseId: editingCourse.courseId }
      : courseForm;

    try {
      const res = await fetch(`${BASE_URL}/api/courses`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        addAlert(
          "success",
          `Course ${editingCourse ? "updated" : "added"} successfully!`,
        );
        setShowCourseModal(false);
        setEditingCourse(null);
        setCourseForm({ title: "", desc: "", instructorId: 1 });
        fetchCourses();
      }
    } catch {
      addAlert("error", "Operation failed");
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/courses?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        addAlert("success", "Course deleted");
        fetchCourses();
      }
    } catch {
      addAlert("error", "Delete failed");
    }
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      desc: course.description,
      instructorId: course.instructorId,
    });
    setShowCourseModal(true);
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <h1>Admin Control Center</h1>
        <div className="admin-meta">
          <span>Welcome, {user?.name}</span>
          <button
            onClick={() => navigate("/reports")}
            className="btn-secondary"
          >
            View Analytics
          </button>
        </div>
      </header>

      <div className="admin-tabs">
        <button
          className={activeTab === "courses" ? "active" : ""}
          onClick={() => setActiveTab("courses")}
        >
          Courses (CRUD)
        </button>
        <button
          className={activeTab === "students" ? "active" : ""}
          onClick={() => setActiveTab("students")}
        >
          Students List
        </button>
      </div>

      {activeTab === "courses" && (
        <section className="admin-section">
          <div className="section-header">
            <h3>Course Management</h3>
            <button
              className="btn-primary"
              onClick={() => {
                setEditingCourse(null);
                setCourseForm({ title: "", desc: "", instructorId: 1 });
                setShowCourseModal(true);
              }}
            >
              Add New Course
            </button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Instructor ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.courseId}>
                  <td>{course.courseId}</td>
                  <td>{course.title}</td>
                  <td>{course.instructorId}</td>
                  <td className="actions">
                    <button
                      onClick={() => openEditModal(course)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.courseId)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {activeTab === "students" && (
        <section className="admin-section">
          <h3>Registered Students</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {showCourseModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingCourse ? "Edit Course" : "Create New Course"}</h3>
            <form onSubmit={handleCourseSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={courseForm.desc}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, desc: e.target.value })
                  }
                  required
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
