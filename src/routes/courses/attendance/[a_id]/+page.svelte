<script lang="ts">
  let loading = $state(false);
  let success = $state(false);
  let error: string = $state("")
  let studentId = $state("66070070");
  let studentName = $state("Tanansorn Sirirath");
  let message = $state("");
  let {data} = $props()
  let { attendance } = data
  async function markAttendance() {
    if (!studentId || !studentName) {
      error = "Please enter your name and student ID first.";
      return;
    }

    loading = true;
    error = "";
    success = false;

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const { latitude, longitude } = position.coords;

      const res = await fetch("/api/attendance/attend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: attendance?.id,
          studentId,
          courseId: attendance?.courseId,
          studentName,
          lat: latitude,
          lon: longitude,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to mark attendance");

      success = true;
      message = data.message || "Attendance recorded successfully!";
    } catch (err: any) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Attendance Check-in</h1>
  <p>Session ID: {attendance?.id}</p>

  <div class="mt-4 space-y-2">
    <input
      type="text"
      placeholder="Student ID"
      bind:value={studentId}
      class="border rounded p-2 w-full"
    />
    <input
      type="text"
      placeholder="Student Name"
      bind:value={studentName}
      class="border rounded p-2 w-full"
    />
    <input
      type="text"
      placeholder="Course ID"
      disabled
      value={attendance?.courseId}
      class="border rounded p-2 w-full bg-gray-200"
    />
     <input
      type="text"
      placeholder="Week"
      disabled
      value={`WEEK ${attendance?.weekNumber}`}
      class="border rounded p-2 w-full bg-gray-200"
    />
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
      on:click={markAttendance}
      disabled={loading}
    >
      {loading ? "Submitting..." : "Check In"}
    </button>

    {#if success}
      <p class="text-green-600 mt-2">{message}</p>
    {/if}

    {#if error}
      <p class="text-red-500 mt-2">❌ {error}</p>
    {/if}
  </div>
</div>

<style>
  .container {
    max-width: 400px;
  }
</style>
