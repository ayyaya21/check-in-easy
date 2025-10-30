<script>
  let {data} = $props()
  let {courses} = data
</script>

<div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-6 p-10 place-items-center w-fit">
  {#each courses as c}
    <a href={`/courses/${c.id}`} class="bg-blue-500 bg-[url('https://www.transparenttextures.com/patterns/squared-metal.png')] w-75 rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div class={`h-40 bg-cover bg-center`}></div>
      <div class="p-4 bg-white">
        <div class="text-blue-500 font-semibold">{c.code}</div>
        <div class="text-gray-800 text-sm mt-1">{c.title}</div>
      </div>
    </a>
  {/each}
</div>
