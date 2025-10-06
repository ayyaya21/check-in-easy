<script>
  const courses = [
    {
      code: "06066303",
      name: "PROBLEM SOLVING AND...",
      bg: "bg-blue-500 bg-[url('https://www.transparenttextures.com/patterns/squared-metal.png')]",
    },
    {
      code: "06016411",
      name: "INTRODUCTION TO...",
      bg: "bg-emerald-500 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')]",
    },
    {
      code: "06016402",
      name: "INFORMATION...",
      bg: "bg-gray-200 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]",
    },
    {
      code: "06016401",
      name: "MATHEMATICS FOR...",
      bg: "bg-indigo-400 bg-[url('https://www.transparenttextures.com/patterns/circles.png')]",
    },
  ];
</script>

<div class="flex flex-wrap justify-center gap-6 p-10">
  {#each courses as c}
    <div
      class="w-75 rounded-2xl shadow-md bg-white overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      <div class={`h-40 ${c.bg} bg-cover bg-center`}></div>
      <div class="p-4">
        <div class="text-blue-500 font-semibold">{c.code}</div>
        <div class="text-gray-800 text-sm mt-1">{c.name}</div>
      </div>
    </div>
  {/each}
</div>
