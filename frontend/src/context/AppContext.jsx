import React, { createContext, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { courses as initialCourses, user as initialUser } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [courses, setCourses] = useState(initialCourses);
  const [user, setUser] = useState(initialUser);
  const [alerts, setAlerts] = useState([]);

  const enrollCourse = useCallback((id) => {
    setUser(prev => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, id]
    }));
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, enrolled: true } : course
    ));
    addAlert('success', 'Successfully enrolled in course!');
  }, []);

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
    alerts,
    enrollCourse,
    completeCourse,
    addAlert,
    removeAlert
  }), [courses, user, alerts, enrollCourse, completeCourse, addAlert, removeAlert]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};
