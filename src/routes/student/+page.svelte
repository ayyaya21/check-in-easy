<script>
  const courses = [
    {
      code: "06066303",
      name: "PROBLEM SOLVING AND...",
      time: "Mon 9:00 - 12:00 PM",
      bg: "bg-blue-500 bg-[url('https://www.transparenttextures.com/patterns/squared-metal.png')]",
      link: "/professor/06066303"
    },
    {
      code: "06016411",
      name: "INTRODUCTION TO...",
      time: "Mon 13:00 - 16:00 PM",
      bg: "bg-emerald-500 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')]",
      link: "/professor/06016411"
    },
    {
      code: "06016402",
      name: "INFORMATION...",
      time: "Tues 9:00 - 12:00 PM",
      bg: "bg-gray-200 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]",
      link: "/professor/06016402"
    },
    {
      code: "06016401",
      name: "MATHEMATICS FOR...",
      time: "Wed 13:00 - 17:00 PM",
      bg: "bg-indigo-400 bg-[url('https://www.transparenttextures.com/patterns/circles.png')]",
      link: "/professor/06016401"
    },
  ];
</script>

<div class="flex flex-wrap justify-center gap-6 p-10">
  {#each courses as c}
    <a href={c.link} class="w-75 rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div class={`h-40 ${c.bg} bg-cover bg-center`}></div>
      <div class="p-4 bg-white">
        <div class="text-blue-500 font-semibold">{c.code}</div>
        <div class="text-gray-800 text-sm mt-1">{c.name}</div>
        <div class="text-gray-800 text-sm mt-1">{c.time}</div>
      </div>
    </a>
  {/each}
</div>
