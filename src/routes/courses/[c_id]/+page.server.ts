import { addStudent, enrollStudent, getAttendanceForCourse, getAttendanceForStudent, getCourseById } from '$lib/db';

export const load = async ({ params, cookies }) => {
  const id = params.c_id;
  const result = await getCourseById(id);
  const attendance = await getAttendanceForCourse(id);

  const student_id = cookies.get("email")?.split("@")[0] || "";
  const all_attendance = (await getAttendanceForStudent(student_id)) || [];

  const student_attendance = all_attendance.filter(a => a.courseId === id);
  return {
    course: result,
    attendance,
    student_attendance,
    isAdmin: cookies.get('isAdmin') == "true"  
  };
};
