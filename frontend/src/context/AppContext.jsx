import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Base URL for API calls
  const BASE_URL = import.meta.env.VITE_API_URL || "";

  // 1. Initialize Alerts first to avoid initialization reference errors
  const addAlert = useCallback((type, message) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  // 2. Data Fetching
  const fetchCourses = useCallback(() => {
    fetch(`${BASE_URL}/api/courses`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        }
      })
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, [BASE_URL]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // 3. Auth Actions
  const login = useCallback(
    async (email, password) => {
      try {
        const res = await fetch(`${BASE_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password }),
        });
        if (res.ok) {
          const userData = await res.json();
          setUser({
            studentId: userData.studentId,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            enrolledCourses: userData.enrolledCourseIds || [],
            completedCourses: [],
          });
          setIsAuthenticated(true);
          setIsAdmin(false);
          addAlert("success", "Successfully logged in!");
          return true;
        }
        addAlert("error", "Login failed");
        return false;
      } catch {
        addAlert("error", "Server connection error");
        return false;
      }
    },
    [BASE_URL, addAlert]
  );

  const adminLogin = useCallback(
    async (email, password) => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password }),
        });
        if (res.ok) {
          const adminData = await res.json();
          setUser(adminData);
          setIsAuthenticated(true);
          setIsAdmin(true);
          addAlert("success", "Admin logged in successfully!");
          return true;
        }
        addAlert("error", "Admin login failed");
        return false;
      } catch {
        addAlert("error", "Server connection error");
        return false;
      }
    },
    [BASE_URL, addAlert]
  );

  const signup = useCallback(
    async (name, email, password) => {
      try {
        const res = await fetch(`${BASE_URL}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
            phone: "",
          }),
        });
        if (res.ok) {
          addAlert("success", "Account created! Please login.");
          return true;
        }
        addAlert("error", "Signup failed");
        return false;
      } catch {
        addAlert("error", "Server connection error");
        return false;
      }
    },
    [BASE_URL, addAlert]
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    addAlert("info", "You have been logged out.");
  }, [addAlert]);

  // 4. Enrollment Actions
  const enrollCourse = useCallback(
    async (courseId) => {
      if (!user) return;
      try {
        const res = await fetch(`${BASE_URL}/api/enroll`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: user.studentId,
            courseId: courseId,
            enrollDate: new Date().toLocaleDateString(),
            status: "Ongoing",
          }),
        });
        if (res.ok) {
          const updatedIds = await res.json();
          setUser((prev) => ({
            ...prev,
            enrolledCourses: updatedIds,
          }));
          addAlert("success", "Successfully enrolled!");
        } else {
          addAlert("error", "Enrollment failed");
        }
      } catch {
        addAlert("error", "Connection error");
      }
    },
    [BASE_URL, user, addAlert]
  );

  const completeCourse = useCallback((courseId) => {
    setUser((prev) => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.filter((id) => id !== courseId),
      completedCourses: [...prev.completedCourses, courseId],
    }));
  }, []);

  const value = useMemo(
    () => ({
      courses,
      user,
      isAuthenticated,
      isAdmin,
      alerts,
      login,
      adminLogin,
      signup,
      logout,
      enrollCourse,
      completeCourse,
      addAlert,
      removeAlert,
      fetchCourses,
    }),
    [
      courses,
      user,
      isAuthenticated,
      isAdmin,
      alerts,
      login,
      adminLogin,
      signup,
      logout,
      enrollCourse,
      completeCourse,
      addAlert,
      removeAlert,
      fetchCourses,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
