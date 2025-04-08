import jwt from 'jsonwebtoken';

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token'); 
  if (token) {
    try {
      
      const decoded = jwt.decode(token); 
      console.log("Decoded token:", decoded); 
      return decoded ? decoded.userId : null; 
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null; 
    }
  }
  return null;  
};

export const getCourseIdFromLocalStorage = () => {
  const courseId = localStorage.getItem("courseId"); 
  if (courseId) {
    console.log("Course ID from localStorage:", courseId); 
    return courseId; 
  }
  return null; 
};
