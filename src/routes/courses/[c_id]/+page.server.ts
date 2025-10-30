import { addStudent, enrollStudent, getAttendanceForCourse, getCourseById } from '$lib/db';

export const load = async ({ params }) => {
    const id = params.c_id
    const result = await getCourseById(id)
    const attendance = await getAttendanceForCourse(id)
    // await addStudent({
    //     'id': '66070070',
    //     'student_id': '66070070',
    //     'email': '66070070@gmail.com',
    //     'name': "Tanansorn Sirirath",
    //     "type": "STUDENT",
    // })
    // await enrollStudent('cs101', '66070070')
    return {
        course: result,
        attendance
    };
};