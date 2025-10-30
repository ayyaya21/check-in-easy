import { getCourses, addCourse } from '$lib/db';

export const load = async ({ params, cookies }) => {
    const result = await getCourses()
	return {
		courses: result,
		isAdmin: cookies.get('isAdmin') == "true"  
	};
};