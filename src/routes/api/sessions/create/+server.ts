import { json } from '@sveltejs/kit';
import { addAttendanceSession } from '$lib/db';

export async function POST({ request }) {
  try {
    const { courseId, weekNumber, lat, lon, radiusMeters, startTime, endTime } = await request.json();
    if (!courseId || !weekNumber || !lat || !lon || !radiusMeters || !startTime || !endTime) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    const sessionId = `session_${courseId}_${weekNumber}_${Date.now()}`;
    const session = {
      id: sessionId,
      courseId,
      weekNumber,
      date: new Date().toISOString(),
      location: { lat, lon, radiusMeters },
      startTime,
      endTime,
    };

    await addAttendanceSession(session);

    return json({ success: true, sessionId, qrData: { sessionId } });
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
}
