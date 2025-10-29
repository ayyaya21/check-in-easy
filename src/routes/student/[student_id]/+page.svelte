<script>
    const weeks = [
      {status: 1, text: "WEEK 01"},
      {status: 1, text: "WEEK 02"},
      {status: 2, text: "WEEK 03"},
      {status: 2, text: "WEEK 04"},
      {status: 3, text: "WEEK 05"},
      {status: 3, text: "WEEK 06"},
      {status: 1, text: "WEEK 07"},
      {status: 2, text: "WEEK 08"},
      {status: 3, text: "WEEK 09"},
      {status: 3, text: "WEEK 10"},
      {status: 1, text: "WEEK 11"},
    ];
    const presentCount = weeks.filter(w => w.status === 1).length;
    const lateCount = weeks.filter(w => w.status === 2).length;
    const absentCount = weeks.filter(w => w.status === 3).length;
    const locations = ["allow locations"];
    
  </script>
  
  <div class="main-h-screen bg-gray-100 flex justify-center item-center p-2">
      <div class="grid grid-cols-2 bg-white rounded-2xl shadow-xl w-full max-w-6xl p-8 gap-6">
          <div class="col-span-2 bg-gray-200 rounded-xl h-36 flex justify-center items-center">
              <h1 class="text-xl font-semibold">Description</h1>
          </div>
  
          <div class="bg-gray-200 rounded-xl p-4 flex flex-col">
              <h2 class="text-center text-white bg-blue-500 font-semibold py-3 rounded-md">
                  WEEK
              </h2>
              <div class="flex mt-4 justify-center items-center gap-4">
                  <!-- Present -->
                  <div class="flex items-center gap-1 justify-center">
                      <div class="w-3 h-3 bg-green-500 rounded-sm"></div>
                      <span class="text-black font-medium">Present: {presentCount} time</span>
                  </div>
  
                  <!-- Late -->
                  <div class="flex items-center gap-1 justify-center">
                      <div class="w-3 h-3 bg-orange-500 rounded-sm"></div>
                      <span class="text-black font-medium">Late: {lateCount} time</span>
                  </div>
  
                  <!-- Absent -->
                  <div class="flex items-center gap-1 justify-center">
                      <div class="w-3 h-3 bg-red-500 rounded-sm"></div>
                      <span class="text-black font-medium">Absent: {absentCount} time</span>
                  </div>
              </div>
  
  
              <div class="mt-4 space-y-3 h-64 overflow-y-auto flex-grow">
                  {#each weeks as week}
                  <a class="block">
                  <div
                      class="bg-gray-400 text-center text-black font-bold py-3 rounded-lg  duration-200"
                      class:bg-green-400={week.status === 1}
                      class:bg-yellow-400={week.status === 2}
                      class:bg-red-400={week.status === 3}
                  >
                      <span>{week.text}</span>
                  </div>
                  </a>
                  {/each}
              </div>
          </div>
  
      <div class="bg-gray-200 rounded-xl p-4">
          <h2 class="text-center text-white bg-blue-500 font-semibold py-3 rounded-md">
              QR CODE
          </h2>
          <div class="mt-4 space-y-3 overflow-y-auto flex-grow">
              {#each locations as location}
              <div class="bg-blue-300 text-center text-black font-bold py-3 rounded-lg hover:bg-gray-500 transition-colors duration-200">
                  <a>{location}</a>
              </div>
              {/each}
          </div>
          <div class="bg-gray-100 rounded-lg border-2 border-gray-400 mt-4 w-full aspect-square flex justify-center items-center">
              camera
          </div>
  
      </div>
    </div>
  </div>