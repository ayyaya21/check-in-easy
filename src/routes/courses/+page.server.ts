import { getCourses, addCourse } from '$lib/db';

export const load = async ({ params }) => {
    const result = await getCourses()
	return {
		courses: result
	};
};