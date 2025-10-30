<script lang="ts">
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { emailStore } from '../../../stores/auth'
</script>

<nav class="flex justify-between items-center bg-white shadow-md rounded-xl px-6 py-3 m-4">
  <a href="/">
    <h4 class="text-2xl font-bold text-blue-600 tracking-tight uppercase">
      Check-in-easy
    </h4>
  </a>

  <DropdownMenu.Root>
    <DropdownMenu.Trigger class="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
      My Account
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M19 9l-7 7-7-7"/>
      </svg>
    </DropdownMenu.Trigger>

    <DropdownMenu.Content class="bg-white shadow-lg rounded-lg p-2 w-40">
      <DropdownMenu.Group>
        <DropdownMenu.Label class="px-2 py-1 text-sm font-semibold text-gray-500">{$emailStore.split('@')[0]}</DropdownMenu.Label>
        <DropdownMenu.Separator class="my-1 border-t" />
        <a href="/api/logout">
        <DropdownMenu.Item class="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
            LOGOUT
          </DropdownMenu.Item>
        </a>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</nav>
