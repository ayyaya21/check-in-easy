<script>
  const weeks = ["WEEK 01", "WEEK 02", "WEEK 03", "WEEK 04", "WEEK 05", "WEEK 06", "WEEK 07", "WEEK 08", "WEEK 09", "WEEK 10"];
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
    <div class="col-span-2 bg-gray-200 rounded-xl h-36 flex justify-center items-center">
      <h1 class="text-xl font-semibold">Description</h1>
    </div>

    <div class="bg-gray-200 rounded-xl p-4 flex flex-col">
      <h2 class="text-center text-white bg-blue-500 font-semibold py-3 rounded-md">
        WEEK
      </h2>
      <div class="mt-4 space-y-3 h-64 overflow-y-auto flex-grow">
        {#each weeks as week}
        <a href="/professor/06016401/{week.toLowerCase().replace(' ', '-')}" class="block">
          <div class="bg-gray-400 text-center text-black font-bold py-3 rounded-lg hover:bg-gray-500 transition-colors duration-200">
            {week}
          </div>
        </a>
        {/each}
      </div>
    </div>

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