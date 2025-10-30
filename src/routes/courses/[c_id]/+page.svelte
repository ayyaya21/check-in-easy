<script lang="ts">
  import { onMount } from "svelte";
  import qrcode from "qrcode-generator";
  import { page } from "$app/stores";

  let { data } = $props();
  let { course, attendance, student_attendance, isAdmin } = data;

  const weeks = [
    { weekNumber: 1, status: 1, text: "WEEK 01" },
    { weekNumber: 2, status: 1, text: "WEEK 02" },
    { weekNumber: 3, status: 1, text: "WEEK 03" },
    { weekNumber: 4, status: 1, text: "WEEK 04" },
    { weekNumber: 5, status: 1, text: "WEEK 05" },
    { weekNumber: 6, status: 1, text: "WEEK 06" },
    { weekNumber: 7, status: 1, text: "WEEK 07" },
    { weekNumber: 8, status: 1, text: "WEEK 08" },
    { weekNumber: 9, status: 1, text: "WEEK 09" },
    { weekNumber: 10, status: 1, text: "WEEK 10" },
    { weekNumber: 11, status: 1, text: "WEEK 11" },
  ];

  let selectedWeek = $state<number>();
  let filteredAttendance = $state<any[]>([]);

  let presentCount = $state(0);
  let lateCount = $state(0);
  let absentCount = $state(0);

  let qrUrl = $state("");
  let courseId = $state();
  let weekNumber = $state(0);
  let lat = $state(0);
  let lon = $state(0);
  let radiusMeters = $state(30);
  let startTime = $state("");
  let endTime = $state("");
  let loading = $state(false);
  let message = $state("");

  let studentStats = $state({
    present: 0,
    late: 0,
    absent: 0,
    attendanceRate: 0
  });

  onMount(() => {
    courseId = $page.params.c_id!;
    calculateStudentStats();
  });

  function calculateStudentStats() {
    if (!isAdmin && student_attendance) {
      const present = student_attendance.filter(a => a.present && !a.late).length;
      const late = student_attendance.filter(a => a.late).length;
      const total = weeks.length;
      const absent = total - present - late;
      const rate = ((present + late) / total * 100).toFixed(1);

      studentStats = {
        present,
        late,
        absent,
        attendanceRate: parseFloat(rate)
      };
    }
  }

  function selectWeek(weekNum: number) {
    selectedWeek = weekNum;
    weekNumber = weekNum;
    
    if (isAdmin) {
      filteredAttendance = attendance.filter(
        (a) => +a.sessionId.split("_")[2] == weekNum
      );
      const totalStudents = course?.students.filter(e => e != '').length || 0;
      presentCount = filteredAttendance.filter((w) => w.present && !w.late).length;
      lateCount = filteredAttendance.filter((w) => w.late).length;
      absentCount = totalStudents - presentCount - lateCount;
    }
  }

  async function getLocation() {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async function createSession() {
    loading = true;
    message = "";

    try {
      const pos = await getLocation();
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;

      const body = {
        courseId,
        weekNumber,
        lat,
        lon,
        radiusMeters,
        startTime,
        endTime,
      };

      const res = await fetch("/api/sessions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create session");

      const qr = qrcode(0, "M");
      qr.addData(`${window.location.origin}/courses/attendance/${data.sessionId}`);
      qr.make();
      qrUrl = qr.createDataURL(8, 4);
      message = `✓ Session created successfully! (${data.sessionId})`;
    } catch (err: any) {
      message = `✗ Error: ${err.message}`;
    } finally {
      loading = false;
    }
  }

  function getWeekStatus(weekNum: number) {
    if (isAdmin) {
      return { present: false, late: false };
    }
    const record = student_attendance.find(e => +e.sessionId.split('_')[2] == weekNum);
    return {
      present: record?.present || false,
      late: record?.late || false
    };
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-start p-4">
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-7xl sm:p-8">
    <div
      class="bg-blue-500 bg-[url('https://www.transparenttextures.com/patterns/squared-metal.png')] rounded-xl h-32 sm:h-36 flex justify-center items-center mb-6 shadow-lg"
    >
      <h1 class="text-2xl sm:text-4xl font-bold text-white text-center px-4">
        {course?.title || "Course Attendance"}
      </h1>
    </div>
    {#if isAdmin}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-md">
          <h2 class="text-center text-white bg-gradient-to-r from-blue-600 to-blue-500 font-semibold py-3 rounded-lg mb-4 text-lg shadow-md">
            📅 WEEK OVERVIEW
          </h2>
          {#if selectedWeek}
            <div class="grid grid-cols-3 gap-3 mb-4">
              <div class="bg-white rounded-lg p-3 shadow-sm border-l-4 border-green-500">
                <div class="text-xs text-gray-600 font-medium">Present</div>
                <div class="text-2xl font-bold text-green-600">{presentCount}</div>
              </div>
              <div class="bg-white rounded-lg p-3 shadow-sm border-l-4 border-orange-500">
                <div class="text-xs text-gray-600 font-medium">Late</div>
                <div class="text-2xl font-bold text-orange-600">{lateCount}</div>
              </div>
              <div class="bg-white rounded-lg p-3 shadow-sm border-l-4 border-red-500">
                <div class="text-xs text-gray-600 font-medium">Absent</div>
                <div class="text-2xl font-bold text-red-600">{absentCount}</div>
              </div>
            </div>
          {/if}

          <div class="space-y-2 h-80 overflow-y-auto pr-2 custom-scrollbar">
            {#each weeks as week}
              <button
                onclick={() => selectWeek(week.weekNumber)}
                class="w-full text-center text-gray-800 font-bold py-4 rounded-lg duration-200 transform hover:scale-[1.02] hover:shadow-md transition-all bg-gradient-to-r shadow-sm"
                class:from-green-400={week.status === 1}
                class:to-green-300={week.status === 1}
                class:from-yellow-400={week.status === 2}
                class:to-yellow-300={week.status === 2}
                class:from-red-400={week.status === 3}
                class:to-red-300={week.status === 3}
                class:ring-4={selectedWeek === week.weekNumber}
                class:ring-blue-500={selectedWeek === week.weekNumber}
                class:ring-offset-2={selectedWeek === week.weekNumber}
              >
                {week.text}
              </button>
            {/each}
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-md">
          <h2 class="text-center text-white bg-gradient-to-r from-blue-600 to-blue-500 font-semibold py-3 rounded-lg mb-4 text-lg shadow-md">
            🔐 CREATE QR SESSION
          </h2>

          <div class="space-y-3">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Week Number</label>
              <input
                type="text"
                disabled
                value={weekNumber || "Select a week"}
                class="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 font-medium"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Radius (meters)</label>
              <input
                type="number"
                bind:value={radiusMeters}
                class="border-2 border-gray-300 rounded-lg p-3 w-full bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Start Time</label>
              <input
                type="datetime-local"
                bind:value={startTime}
                class="border-2 border-gray-300 rounded-lg p-3 w-full bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">End Time</label>
              <input
                type="datetime-local"
                bind:value={endTime}
                class="border-2 border-gray-300 rounded-lg p-3 w-full bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          {#if qrUrl}
            <div class="flex flex-col items-center mt-6 bg-white rounded-lg p-4 shadow-inner">
              <img
                src={qrUrl}
                alt="QR Code"
                class="border-4 border-blue-500 rounded-lg p-2 shadow-lg"
                style="image-rendering: pixelated; width: auto; max-width: 256px;"
              />
              <p class="text-sm text-gray-600 mt-3 font-medium">
                📱 Students can scan this QR to check in
              </p>
            </div>
          {/if}

          <button
            onclick={createSession}
            disabled={loading || !weekNumber}
            class="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 rounded-lg mt-4 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "🔄 Creating..." : "✨ Create Session"}
          </button>

          {#if message}
            <div class="mt-3 p-3 rounded-lg text-center font-medium" class:bg-green-100={message.includes('✓')} class:text-green-800={message.includes('✓')} class:bg-red-100={message.includes('✗')} class:text-red-800={message.includes('✗')}>
              {message}
            </div>
          {/if}
        </div>

        {#if selectedWeek}
          <div class="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 class="font-bold text-2xl uppercase mb-4 text-gray-800 border-b-2 border-blue-500 pb-2">
              📊 Attendance for Week {selectedWeek}
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr class="bg-gradient-to-r from-gray-200 to-gray-100">
                    <th class="p-3 border border-gray-300 text-left font-bold text-gray-700">Student ID</th>
                    <th class="p-3 border border-gray-300 text-center font-bold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {#each (course?.students.filter(e => e != '') || []).map((studentId) => {
                    const record = filteredAttendance.find((a) => a.studentId === studentId);
                    return record || { studentId, present: false, late: false };
                  }) as record, i}
                    <tr class:bg-gray-50={i % 2 === 0} class="hover:bg-blue-50 transition-colors">
                      <td class="p-3 border border-gray-300 font-medium">{record.studentId}</td>
                      <td class="p-3 border border-gray-300 text-center">
                        {#if Math.max(record.late, 0)}
                          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-300">
                            🕐 LATE
                          </span>
                        {:else if record.present}
                          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-300">
                            ✓ PRESENT
                          </span>
                        {:else}
                          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-300">
                            ✗ ABSENT
                          </span>
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-lg text-white">
            <div class="text-sm font-semibold opacity-90">Present</div>
            <div class="text-4xl font-bold mt-2">{Math.max(studentStats.present, 0)}</div>
            <div class="text-xs mt-1 opacity-80">sessions</div>
          </div>
          <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg text-white">
            <div class="text-sm font-semibold opacity-90">Late</div>
            <div class="text-4xl font-bold mt-2">{Math.max(studentStats.late, 0)}</div>
            <div class="text-xs mt-1 opacity-80">sessions</div>
          </div>
          <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 shadow-lg text-white">
            <div class="text-sm font-semibold opacity-90">Absent</div>
            <div class="text-4xl font-bold mt-2">{Math.max(studentStats.absent,0)}</div>
            <div class="text-xs mt-1 opacity-80">sessions</div>
          </div>
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg text-white">
            <div class="text-sm font-semibold opacity-90">Attendance Rate</div>
            <div class="text-4xl font-bold mt-2">{studentStats.attendanceRate}%</div>
            <div class="text-xs mt-1 opacity-80">overall</div>
          </div>
        </div>

        <div class="lg:col-span-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-md">
          <h2 class="text-center text-white bg-gradient-to-r from-blue-600 to-blue-500 font-semibold py-3 rounded-lg mb-6 text-lg shadow-md">
            📅 YOUR ATTENDANCE
          </h2>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {#each weeks as week}
              {@const status = getWeekStatus(week.weekNumber)}
              <button
                onclick={() => selectWeek(week.weekNumber)}
                class="relative text-center text-gray-800 font-bold py-6 rounded-lg duration-200 transform hover:scale-105 hover:shadow-lg transition-all shadow-sm"
                class:bg-gradient-to-br={true}
                class:from-green-400={status.present && !status.late}
                class:to-green-300={status.present && !status.late}
                class:from-orange-400={status.late}
                class:to-orange-300={status.late}
                class:from-red-400={!status.present && !status.late}
                class:to-red-300={!status.present && !status.late}
                class:ring-4={selectedWeek === week.weekNumber}
                class:ring-blue-500={selectedWeek === week.weekNumber}
                class:ring-offset-2={selectedWeek === week.weekNumber}
              >
                <div class="text-lg font-bold">{week.weekNumber}</div>
                <div class="text-xs mt-1 opacity-80">
                  {status.present && !status.late ? '✓' : status.late ? '🕐' : '✗'}
                </div>
              </button>
            {/each}
          </div>

          {#if selectedWeek}
            {@const status = getWeekStatus(selectedWeek)}
            <div class="mt-6 bg-white rounded-lg p-6 shadow-inner">
              <h3 class="font-bold text-xl mb-3 text-gray-800">Week {selectedWeek} Status</h3>
              <div class="flex items-center gap-3">
                {#if status.late}
                  <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-orange-100 text-orange-700 border-2 border-orange-300">
                    🕐 You were LATE
                  </span>
                {:else if status.present}
                  <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-700 border-2 border-green-300">
                    ✓ You were PRESENT
                  </span>
                {:else}
                  <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-700 border-2 border-red-300">
                    ✗ You were ABSENT
                  </span>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>