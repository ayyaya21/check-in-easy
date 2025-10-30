import { getCourses, addCourse, getAttendanceSessionById } from '$lib/db';

export const load = async ({ params }) => {
    const result = await getAttendanceSessionById(params.a_id)
	console.log(result);
	return {
		attendance: result
	};
};