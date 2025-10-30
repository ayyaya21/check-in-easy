import AWS from 'aws-sdk';
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_DEFAULT_REGION,
} from '$env/static/private';

AWS.config.update({
  region: AWS_DEFAULT_REGION!,
  accessKeyId: AWS_ACCESS_KEY_ID!,
  secretAccessKey: AWS_SECRET_ACCESS_KEY!,
});

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'check-in-easy';

export interface Student {
  id: string;
  name: string;
  student_id: string;
  email: string;
  type?: 'STUDENT';
}

export interface Professor {
  id: string;
  name: string;
  email: string;
  department: string;
  type?: 'PROFESSOR';
}

export interface Course {
  id: string;
  title: string;
  code: string;
  professorId: string;
  students: string[];
  type?: 'COURSE';
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  weekNumber: number;
  date: string;
  location: {
    lat: number;
    lon: number;
    radiusMeters: number;
  };
  startTime: string;
  endTime: string;
  type?: 'SESSION';
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  sessionId: string;
  date: string;
  present: boolean;
  late?: boolean;
  type?: 'ATTENDANCE';
}

async function putItem(item: any) {
  await db.put({ TableName: TABLE_NAME, Item: item }).promise();
  return item;
}

export const addProfessor = async (prof: Professor) => putItem({ ...prof, type: 'PROFESSOR' });

export const getProfessors = async (): Promise<Professor[]> => {
  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: TABLE_NAME,
    FilterExpression: '#t = :type',
    ExpressionAttributeNames: { '#t': 'type' },
    ExpressionAttributeValues: { ':type': 'PROFESSOR' },
  };
  const result = await db.scan(params).promise();
  return result.Items as Professor[];
};

export const getProfessorById = async (id: string): Promise<Professor | undefined> => {
  const result = await db.get({ TableName: TABLE_NAME, Key: { id } }).promise();
  return result.Item as Professor | undefined;
};

export const updateProfessor = async (id: string, updates: Partial<Professor>) => {
  const keys = Object.keys(updates);
  if (!keys.length) return null;

  const updateExpr = keys.map(k => `#${k} = :${k}`).join(', ');
  const exprNames = Object.fromEntries(keys.map(k => [`#${k}`, k]));
  const exprValues = Object.fromEntries(keys.map(k => [`:${k}`, (updates as any)[k]]));

  const result = await db.update({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: `SET ${updateExpr}`,
    ExpressionAttributeNames: exprNames,
    ExpressionAttributeValues: exprValues,
    ReturnValues: 'ALL_NEW',
  }).promise();

  return result.Attributes as Professor;
};

export const deleteProfessor = async (id: string) => {
  await db.delete({ TableName: TABLE_NAME, Key: { id } }).promise();
  return { success: true };
};

export const addStudent = async (student: Student) => putItem({ ...student, type: 'STUDENT' });

export const getStudents = async (): Promise<Student[]> => {
  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: TABLE_NAME,
    FilterExpression: '#t = :type',
    ExpressionAttributeNames: { '#t': 'type' },
    ExpressionAttributeValues: { ':type': 'STUDENT' },
  };
  const result = await db.scan(params).promise();
  return result.Items as Student[];
};

export const getStudentById = async (id: string): Promise<Student | undefined> => {
  const result = await db.get({ TableName: TABLE_NAME, Key: { id } }).promise();
  return result.Item as Student | undefined;
};

export const updateStudent = async (id: string, updates: Partial<Student>) => {
  const keys = Object.keys(updates);
  if (!keys.length) return null;

  const updateExpr = keys.map(k => `#${k} = :${k}`).join(', ');
  const exprNames = Object.fromEntries(keys.map(k => [`#${k}`, k]));
  const exprValues = Object.fromEntries(keys.map(k => [`:${k}`, (updates as any)[k]]));

  const result = await db.update({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: `SET ${updateExpr}`,
    ExpressionAttributeNames: exprNames,
    ExpressionAttributeValues: exprValues,
    ReturnValues: 'ALL_NEW',
  }).promise();

  return result.Attributes as Student;
};

export const deleteStudent = async (id: string) => {
  await db.delete({ TableName: TABLE_NAME, Key: { id } }).promise();
  return { success: true };
};

export const addCourse = async (course: Course) =>
  putItem({ ...course, type: 'COURSE', students: course.students || [] });

export const getCourses = async (): Promise<Course[]> => {
  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: TABLE_NAME,
    FilterExpression: '#t = :type',
    ExpressionAttributeNames: { '#t': 'type' },
    ExpressionAttributeValues: { ':type': 'COURSE' },
  };
  const result = await db.scan(params).promise();
  return result.Items as Course[];
};

export const getCourseById = async (id: string): Promise<Course | undefined> => {
  const result = await db.get({ TableName: TABLE_NAME, Key: { id } }).promise();
  return result.Item as Course | undefined;
};

export const updateCourse = async (id: string, updates: Partial<Course>) => {
  const keys = Object.keys(updates);
  if (!keys.length) return null;

  const updateExpr = keys.map(k => `#${k} = :${k}`).join(', ');
  const exprNames = Object.fromEntries(keys.map(k => [`#${k}`, k]));
  const exprValues = Object.fromEntries(keys.map(k => [`:${k}`, (updates as any)[k]]));

  const result = await db.update({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: `SET ${updateExpr}`,
    ExpressionAttributeNames: exprNames,
    ExpressionAttributeValues: exprValues,
    ReturnValues: 'ALL_NEW',
  }).promise();

  return result.Attributes as Course;
};

export const deleteCourse = async (id: string) => {
  await db.delete({ TableName: TABLE_NAME, Key: { id } }).promise();
  return { success: true };
};

export const enrollStudent = async (courseId: string, studentId: string) => {
  const course = await getCourseById(courseId);
  if (!course) throw new Error('Course not found.');

  const updatedStudents = Array.from(new Set([...(course.students || []), studentId]));
  return await updateCourse(courseId, { students: updatedStudents });
};

export const addAttendanceSession = async (session: AttendanceSession) =>
  putItem({ ...session, type: 'SESSION' });

export const getAttendanceSessionById = async (id: string): Promise<AttendanceSession | undefined> => {
  const result = await db.get({ TableName: TABLE_NAME, Key: { id } }).promise();
  return result.Item as AttendanceSession | undefined;
};

export const markAttendance = async (record: AttendanceRecord) => {
  record.type = 'ATTENDANCE';
  record.id = `att_${record.courseId}_${record.studentId}_${record.date}`;
  await putItem(record);
  return record;
};

export const getAttendanceForStudent = async (studentId: string): Promise<AttendanceRecord[]> => {
  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: TABLE_NAME,
    FilterExpression: '#t = :type AND studentId = :sid',
    ExpressionAttributeNames: { '#t': 'type' },
    ExpressionAttributeValues: { ':type': 'ATTENDANCE', ':sid': studentId },
  };
  const result = await db.scan(params).promise();
  return result.Items as AttendanceRecord[];
};

export const getAttendanceForCourse = async (courseId: string): Promise<AttendanceRecord[]> => {
  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: TABLE_NAME,
    FilterExpression: '#t = :type AND courseId = :cid',
    ExpressionAttributeNames: { '#t': 'type' },
    ExpressionAttributeValues: { ':type': 'ATTENDANCE', ':cid': courseId },
  };
  const result = await db.scan(params).promise();
  return result.Items as AttendanceRecord[];
};

function isWithinRadius(
  studentLat: number,
  studentLon: number,
  sessionLat: number,
  sessionLon: number,
  radiusMeters: number
): boolean {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(sessionLat - studentLat);
  const dLon = toRad(sessionLon - studentLon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(studentLat)) * Math.cos(toRad(sessionLat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance <= radiusMeters;
}

export const markAttendanceWithLocation = async (
  record: Omit<AttendanceRecord, 'id' | 'type' | 'late'>,
  studentLat: number,
  studentLon: number
): Promise<AttendanceRecord> => {
  const session = await getAttendanceSessionById(record.sessionId);
  if (!session) throw new Error('Attendance session not found.');

  if (!isWithinRadius(studentLat, studentLon, session.location.lat, session.location.lon, session.location.radiusMeters)) {
    throw new Error('Student is not within allowed location for attendance.');
  }

  const now = new Date();
  const start = new Date(session.startTime);
  const end = new Date(session.endTime);

  if (now > end) {
    throw new Error('Attendance session is over.');
  }

  let late = false;
  if (now > new Date(start.getTime() + 15 * 60 * 1000)) {
    late = true;
  }

  const attendanceId = `att_${record.courseId}_${record.studentId}_${record.sessionId}`;

  const attendanceRecord: AttendanceRecord = {
    ...record,
    id: attendanceId,
    type: 'ATTENDANCE',
    late,
  };

  await putItem(attendanceRecord);
  return attendanceRecord;
};

