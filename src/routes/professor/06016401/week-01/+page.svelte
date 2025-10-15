<script>
  // Data for the student list
  const students = [
    { id: "6607XXXX Kritsada Aneg.", count: 4, color: "red" },
    { id: "6607XXXX Kritsada Aneg.", count: 3, color: "gray" },
    { id: "6607XXXX Kritsada Aneg.", count: 3, color: "gray" },
  ];
</script>

<div class="min-h-screen bg-gray-100 flex justify-center items-center p-4">
  <div class="bg-white rounded-2xl shadow-xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-8">

    <div class="flex flex-col items-center justify-between p-4 bg-gray-200 rounded-xl">
      <div class="bg-white p-4 rounded-xl shadow-md w-full max-w-xs flex justify-center items-center">
        <div class="w-full aspect-square bg-gray-400">
        </div>
      </div>
      
      <div class="mt-8 w-full space-y-4">
        <button class="w-full bg-blue-500 text-white font-bold py-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200">
          START
        </button>
        <div class="grid grid-cols-2 gap-4">
          <button class="w-full bg-red-500 text-white font-bold py-4 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200">
            STOP
          </button>
          <button class="w-full bg-yellow-400 text-white font-bold py-4 rounded-lg shadow-md hover:bg-yellow-500 transition-colors duration-200">
            LATE
          </button>
        </div>
      </div>
    </div>

    <div class="bg-gray-200 rounded-xl p-4 flex flex-col">
      <h2 class="text-center text-white bg-blue-500 font-semibold py-3 rounded-md">
        absent student week
      </h2>
      <div class="mt-4 space-y-3">
        {#each students as student}
          <div
            class="flex justify-between items-center px-4 py-3 rounded-lg font-semibold text-white"
            class:bg-red-500={student.count === 4}
            class:bg-gray-600={student.count !== 4}
          >
            <span>{student.id}</span>
            <span>{student.count}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>