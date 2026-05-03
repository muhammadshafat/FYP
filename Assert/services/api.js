import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.90.211.62:5294/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔹 Login APIs
export const loginStudent = (data) => API.post('/auth/student-login', data);
export const loginTeacher = (data) => API.post('/auth/teacher-login', data);
export const loginParent = (data) => API.post('/auth/parent-login', data);

// 🔹 GET teacher classes
export const getTeacherClasses = (tid) =>
  API.get(`/UpdateDiary/teacher-classes/${tid}`);

// 🔹 GET teacher subjects
export const getTeacherSubjects = (tid, cid) =>
  API.get(`/UpdateDiary/teacher-subjects/${tid}/${cid}`);

export const addDiary = (data) =>
  API.post('/UpdateDiary', data);

export const getTeacherDiaries = (tid) =>
  API.get(`/UpdateDiary/view-diary/${tid}`);

export const getParentChildren = (pid) =>
  API.get(`/Parent/parent-children/${pid}`);

export const getStudentDiary = (sid, category) => {
  return API.get(
    `/UpdateDiary/parent-view-diary/${sid}/${category}`
  );
};
export const getClassStudents = (cid) => {
  return API.get(`/Student/class/${cid}`);
};

export const addNoteDiary = (data) => {
  return API.post('/UpdateDiary/add-note', data);
};
export default API;