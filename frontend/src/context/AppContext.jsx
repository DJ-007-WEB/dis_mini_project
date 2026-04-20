import React, { createContext, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { courses as initialCourses, user as initialUser } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [courses, setCourses] = useState(initialCourses);
  // Default to false for fake auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [alerts, setAlerts] = useState([]);

  const login = useCallback((email, password) => {
    // Fake login logic
    if (email && password) {
      setIsAuthenticated(true);
      addAlert('success', 'Successfully logged in!');
      return true;
    }
    return false;
  }, []);

  const signup = useCallback((name, email, password) => {
    if (name && email && password) {
      setUser({ ...initialUser, name });
      setIsAuthenticated(true);
      addAlert('success', 'Account created successfully!');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    addAlert('info', 'You have been logged out.');
  }, []);

  const enrollCourse = useCallback((id) => {
    if (!isAuthenticated) {
      addAlert('error', 'Please log in to enroll in courses.');
      return;
    }
    setUser(prev => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, id]
    }));
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, enrolled: true } : course
    ));
    addAlert('success', 'Successfully enrolled in course!');
  }, [isAuthenticated]);

  const completeCourse = useCallback((id) => {
    setUser(prev => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.filter(courseId => courseId !== id),
      completedCourses: [...prev.completedCourses, id]
    }));
    addAlert('success', 'Course completed successfully!');
  }, []);

  const addAlert = useCallback((type, message) => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, type, message }]);
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const value = useMemo(() => ({
    courses,
    user,
    isAuthenticated,
    alerts,
    login,
    signup,
    logout,
    enrollCourse,
    completeCourse,
    addAlert,
    removeAlert
  }), [courses, user, isAuthenticated, alerts, login, signup, logout, enrollCourse, completeCourse, addAlert, removeAlert]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};
