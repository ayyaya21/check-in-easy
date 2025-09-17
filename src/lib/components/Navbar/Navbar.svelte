<script lang="ts">
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<nav class="flex justify-between m-2">
    <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
        Check-in-easy
    </h4>
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>Profiles</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Profile</DropdownMenu.Item>
            <DropdownMenu.Item>Logout</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      
</nav>