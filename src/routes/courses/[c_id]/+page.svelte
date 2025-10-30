<script lang="ts">
  import { onMount } from "svelte";
  import qrcode from "qrcode-generator";
  import { page } from "$app/stores";

  let { data } = $props();
  let { course, attendance } = data;

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

  onMount(() => {
    courseId = $page.params.c_id!;
  });

  function selectWeek(weekNum: number) {
    selectedWeek = weekNum;
    weekNumber = weekNum;
    filteredAttendance = attendance.filter(
      (a) => +a.sessionId.split("_")[2] == weekNum
    );
    presentCount = filteredAttendance.filter((w) => w.present).length;
    lateCount = filteredAttendance.filter((w) => w.late).length;
  }

  async function getLocation() {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async function createSession() {
    loading = true;

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
      qr.addData(`http://localhost:5173/courses/attendance/${data.sessionId}`);
      qr.make();
      qrUrl = qr.createDataURL(8, 4);
      message = `Session created successfully! (${data.sessionId})`;
    } catch (err: any) {
      message = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="main-h-screen bg-gray-100 flex justify-center item-center p-2">
  <div
    class="grid grid-cols-2 bg-white rounded-2xl shadow-xl w-full max-w-6xl p-8 gap-6"
  >
    <div
      class="bg-blue-500 bg-[url('https://www.transparenttextures.com/patterns/squared-metal.png')] col-span-2 rounded-xl h-36 flex justify-center items-center"
    >
      <h1 class="text-xl sm:text-3xl font-bold text-white">{course?.title}</h1>
    </div>

    <div class="bg-gray-200 rounded-xl p-4 flex flex-col">
      <h2
        class="text-center text-white bg-blue-500 font-semibold py-3 rounded-md"
      >
        WEEK
      </h2>

      <div class="flex flex-wrap mt-4 justify-center items-center gap-4">
        <div class="flex items-center gap-1 justify-center">
          <div class="w-3 h-3 bg-green-500 rounded-sm"></div>
          <span class="text-black font-medium">
            Present: {presentCount} time
          </span>
        </div>

        <div class="flex items-center gap-1 justify-center">
          <div class="w-3 h-3 bg-orange-500 rounded-sm"></div>
          <span class="text-black font-medium">Late: {lateCount} time</span>
        </div>
      </div>

      <div class="mt-4 space-y-3 h-64 overflow-y-auto flex-grow">
        {#each weeks as week}
          <button
            onclick={() => selectWeek(week.weekNumber)}
            class="w-full text-center text-black font-bold py-3 rounded-lg duration-200"
            class:bg-green-400={week.status === 1}
            class:bg-yellow-400={week.status === 2}
            class:bg-red-400={week.status === 3}
            class:ring-4={selectedWeek === week.weekNumber}
            class:ring-blue-500={selectedWeek === week.weekNumber}
          >
            {week.text}
          </button>
        {/each}
      </div>
    </div>

    <div class="bg-gray-200 rounded-xl p-4">
      <h2
        class="text-center text-white bg-blue-500 font-semibold py-3 rounded-md"
      >
        CREATE QR SESSION
      </h2>

      <div class="space-y-2 mt-4">
        <label>Week Number</label>
        <input
          type="text"
          placeholder="Week Number"
          disabled
          value={weekNumber}
          class="border rounded p-2 w-full bg-white"
        />

        <label>Radius (meters)</label>
        <input
          type="text"
          placeholder="Radius"
          disabled
          value={radiusMeters}
          class="border rounded p-2 w-full bg-white"
        />

        <label>Start Time</label>
        <input
          type="datetime-local"
          placeholder="Start Time"
          bind:value={startTime}
          class="border rounded p-2 w-full bg-white"
        />

        <label>End Time</label>
        <input
          type="datetime-local"
          placeholder="End Time"
          bind:value={endTime}
          class="border rounded p-2 w-full bg-white"
        />
      </div>

      {#if qrUrl}
        <div class="flex flex-col items-center mt-4">
          <img
            src={qrUrl}
            alt="QR Code"
            class="border-2 border-gray-300 rounded-lg p-2"
            style="image-rendering: pixelated; width: auto; max-width: 256px;"
          />
          <p class="text-sm text-gray-500 mt-2">
            Students can scan this QR to check in
          </p>
        </div>
      {/if}

      <button
        onclick={createSession}
        disabled={loading}
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-4"
      >
        {loading ? "Creating..." : "Create Session"}
      </button>

      {#if message}
        <p class="text-center mt-2 text-gray-700">{message}</p>
      {/if}
    </div>
    <div class="mt-6 bg-white rounded-lg shadow-md p-4 col-span-2">
      <h3 class="font-bold text-start text-xl uppercase mb-2">
        Attendance for Week {selectedWeek}
      </h3>
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="bg-gray-300 text-left">
            <th class="p-2 border">Student ID</th>
            <th class="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {#each (course?.students.filter(e => e != '') || []).map((studentId) => {
            const record = filteredAttendance.find((a) => a.studentId === studentId);
            return record || { studentId, present: false, late: false };
          }) as record}
            <tr>
              <td class="p-2 border">{record.studentId}</td>
              <td class="p-2 border text-center uppercase">
                {#if record.late}
                  <span class="text-orange-600 font-semibold">Late</span>
                {:else if record.present}
                  <span class="text-green-600 font-semibold">Present</span>
                {:else}
                  <span class="text-red-600 font-semibold">Absent</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
