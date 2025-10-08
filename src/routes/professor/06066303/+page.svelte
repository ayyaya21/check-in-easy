<script>
  const weeks = ["WEEK 01", "WEEK 02", "WEEK 03", "WEEK 04", "WEEK 05"];
  const students = [
    { id: "6607XXXX Kritsada Aneg.", count: 4 },
    { id: "6607XXXX Kritsada Aneg.", count: 3 },
    { id: "6607XXXX Kritsada Aneg.", count: 3 },
    { id: "6607XXXX Kritsada Aneg.", count: 3 },
    { id: "6607XXXX Kritsada Aneg.", count: 3 },
    { id: "6607XXXX Kritsada Aneg.", count: 3 },
  ];
</script>

<div class="min-h-screen bg-gray-100 flex justify-center items-center p-2">
  <div class="grid grid-cols-2 bg-white rounded-2xl shadow-xl w-full max-w-6xl p-8 gap-6">
    <!-- Description -->
    <div class="col-span-2 bg-gray-200 rounded-xl h-24 flex justify-center items-center">
      <h1 class="text-xl font-semibold">Description</h1>
    </div>

    <!-- WEEK column -->
    <div class="bg-gray-200 rounded-xl p-4">
      <h2 class="text-center text-white bg-blue-500 font-semibold py-3 rounded-md">
        WEEK
      </h2>
      <div class="mt-4 space-y-3">
        {#each weeks as week}
        <div class="bg-gray-400 text-center text-black font-bold py-3 rounded-lg">
          {week}
        </div>
        {/each}
      </div>
    </div>

    <!-- Most-absent student column -->
    <div class="bg-gray-200 rounded-xl p-4">
      <h2 class="text-center text-white bg-blue-500 font-semibold py-3 rounded-md">
        Most-absent student
      </h2>
      <div class="mt-4 space-y-3">
        {#each students as student}
        <div
          class="flex justify-between items-center px-4 py-3 rounded-lg font-semibold"
          class:bg-red-400={student.count === 4}
          class:bg-gray-400={student.count !== 4}
        >
          <span>{student.id}</span>
          <span>{student.count}</span>
        </div>
        {/each}
      </div>
    </div>
  </div>
</div>