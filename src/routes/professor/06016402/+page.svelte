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
  const mytables = [
    { No: 1, student_id: "66070007", student_name: "kritsada", student_surname: "anegtanagul", section: 2, WEEK_01: 1, WEEK_02: 0, WEEK_03: 0.5},
    { No: 2, student_id: "66070007", student_name: "kritsada", student_surname: "anegtanagul", section: 2, WEEK_01: 1, WEEK_02: 0, WEEK_03: 0.5},
    { No: 3, student_id: "66070007", student_name: "kritsada", student_surname: "anegtanagul", section: 2, WEEK_01: 1, WEEK_02: 0, WEEK_03: 0.5},
    { No: 4, student_id: "66070007", student_name: "kritsada", student_surname: "anegtanagul", section: 2, WEEK_01: 1, WEEK_02: 0, WEEK_03: 0.5},
    { No: 5, student_id: "66070007", student_name: "kritsada", student_surname: "anegtanagul", section: 2, WEEK_01: 1, WEEK_02: 0, WEEK_03: 0.5},
  ];

  // Logic ใหม่: ดึงรหัสวิชาจาก URL ของหน้าปัจจุบัน
  const pathSegments = window.location.pathname.split('/');
  
  // พยายามหารหัสวิชาที่อยู่ถัดจาก 'professor' ใน URL
  const professorIndex = pathSegments.indexOf('professor');
  let courseId = 'default-course-id'; // ค่าเริ่มต้น (Fallback)

  if (professorIndex !== -1 && pathSegments.length > professorIndex + 1) {
    // กรณีที่ URL เป็น /.../professor/06016401/...
    courseId = pathSegments[professorIndex + 1];
  } else if (pathSegments.length > 1) {
    // กรณีที่รหัสวิชาอาจจะเป็น Segment ที่ 1 หรือ 2 และไม่มี 'professor' นำหน้า
    // นี่เป็นการเดาโครงสร้าง URL ที่ดีที่สุดจากข้อมูลที่มี
    courseId = pathSegments[1]; 
  }
  // courseId ที่ได้จะถูกใช้ในลิงก์ด้านล่าง
</script>

<div class="min-h-screen bg-gray-100 flex justify-center items-center p-2">
  <div class="grid grid-cols-2 bg-white rounded-2xl shadow-xl w-full max-w-6xl p-8 gap-6">
    <div class="col-span-2 bg-gray-200 rounded-xl h-36 flex justify-center items-center">
      <h1 class="text-xl font-semibold">Description</h1>
    </div>

    <div class="bg-gray-200 rounded-xl p-4 flex flex-col">
      <div class="flex justify-between items-center text-white bg-blue-500 font-semibold py-3 px-4 rounded-md">
        <h2 class="text-center font-semibold text-white">
          WEEK
        </h2>
        <button
            class="w-8 h-8 bg-green-500 text-white text-xl font-bold rounded-full shadow-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
            on:click={() => alert('เพิ่มสัปดาห์ใหม่!')}
            aria-label="Add New Week"
        >
            +
        </button>
      </div>
      
      <div class="mt-4 space-y-3 h-64 overflow-y-auto flex-grow">
        {#each weeks as week}
        <a href="/professor/{courseId}/{week.toLowerCase().replace(' ', '-')}" class="block">
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

    <div class="col-span-2 bg-gray-200 flex justify-center items-center w-full">
      <table class="min-w-full border border-black">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-black px-4 py-2">NO.</th>
            <th class="border border-black px-4 py-2">Student ID</th>
            <th class="border border-black px-4 py-2">Name</th>
            <th class="border border-black px-4 py-2">Section</th>
            <th class="border border-black px-4 py-2">14/04</th>
            <th class="border border-black px-4 py-2">21/04</th>
            <th class="border border-black px-4 py-2">28/04</th>
          </tr>
        </thead>
        <tbody>
          {#each mytables as row}
            <tr>
              <td class="border border-black px-4 py-2 text-center">{row.No}</td>

              <td class="border border-black px-4 py-2 text-center">{row.student_id}</td>

              <td class="border border-black px-4 py-2 text-center">{row.student_name} {row.student_surname}</td>

              <td class="border border-black px-4 py-2 text-center">{row.section}</td>

              <td class="border border-black px-4 py-2 text-center
                        {row.WEEK_01 === 1 ? 'bg-green-200 text-green-800' : 
                          row.WEEK_01 === 0.5 ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}">
                {row.WEEK_01 === 1 ? 'Present' : 
                row.WEEK_01 === 0.5 ? 'Late' : 'Absent'}
              </td>

              <td class="border border-black px-4 py-2 text-center
                        {row.WEEK_02 === 1 ? 'bg-green-200 text-green-800' : 
                          row.WEEK_02 === 0.5 ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}">
                {row.WEEK_02 === 1 ? 'Present' : 
                row.WEEK_02 === 0.5 ? 'Late' : 'Absent'}
              </td>

              <td class="border border-gray-300 px-4 py-2 text-center
                        {row.WEEK_03 === 1 ? 'bg-green-200 text-green-800' : 
                          row.WEEK_03 === 0.5 ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}">
                {row.WEEK_03 === 1 ? 'Present' : 
                row.WEEK_03 === 0.5 ? 'Late' : 'Absent'}
              </td>

            </tr>
          {/each}
        </tbody>
      </table>
    </div>

  </div>
</div>