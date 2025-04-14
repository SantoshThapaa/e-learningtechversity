export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const base64Payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      console.log("🔍 Decoded Token Payload:", decodedPayload);
      return decodedPayload.userId || null;
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
