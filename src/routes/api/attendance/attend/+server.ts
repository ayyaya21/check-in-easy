import { json } from '@sveltejs/kit';
import { markAttendanceWithLocation } from '$lib/db';

export async function POST({ request }) {
  try {
    const { sessionId, studentId, courseId, studentName, lat, lon } = await request.json();
    if (!sessionId || !studentId || !courseId) {
      return json({ error: 'Missing fields' }, { status: 400 });
    }

    const record = await markAttendanceWithLocation(
      { sessionId, studentId, courseId, date: new Date().toISOString(), present: true },
      lat,
      lon
    );

    return json({
      success: true,
      message: `Attendance marked for ${studentName}`,
      record
    });
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
}
