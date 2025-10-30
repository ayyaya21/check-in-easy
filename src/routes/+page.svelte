<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { isAdmin, emailStore } from '../stores/auth'
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";

  async function handleLogin(e: Event) {
    e.preventDefault();

    if (email.trim().toLowerCase() === "professor@it.kmitl.ac.th") {
      isAdmin.set(true);
    } else {
      isAdmin.set(false);
    }

    emailStore.set(email);

    console.log("isAdmin:", $isAdmin);
    goto('/courses')
  }
</script>

<div class="flex flex-col min-h-screen items-center justify-center gap-5">
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>Login to your account</Card.Title>
      <Card.Description>
        Enter your email below to login to your account
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <form>
        <div class="flex flex-col gap-6">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="xxxxxx@kmitl.ac.th"
              required
              bind:value={email}
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              bind:value={password}
              required
            />
          </div>
        </div>
      </form>
    </Card.Content>
    <Card.Footer class="flex-col gap-2">
      <Button onclick={handleLogin} type="button" class="w-full">
        LOGIN
      </Button>
    </Card.Footer>
  </Card.Root>
</div>
