<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { isAdmin, emailStore } from "../stores/auth";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let isLoading = false;
  let errorMessage = "";

  async function handleLogin(e: Event) {
    e.preventDefault();
    isLoading = true;
    errorMessage = "";

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        if (email.trim().toLowerCase() === "professor@it.kmitl.ac.th") {
          isAdmin.set(true);
        } else {
          isAdmin.set(false);
        }

        emailStore.set(email);
        goto("/courses");
      } else {
        errorMessage = "Invalid email or password. Please try again.";
      }
    } catch (error) {
      errorMessage = "An error occurred. Please try again later.";
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="flex min-h-screen">
  <div class="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <div class="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <svg
            class="h-10 w-10 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h2 class="text-3xl font-bold tracking-tight">Attendance System</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          KMITL Course Management
        </p>
      </div>

      <Card.Root class="border-border shadow-lg">
        <Card.Header class="space-y-1">
          <Card.Title class="text-2xl font-bold">Welcome back</Card.Title>
          <Card.Description>
            Enter your credentials to access your account
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <form on:submit={handleLogin} class="space-y-4">
            <div class="space-y-4">
              <div class="grid gap-2">
                <Label for="email" class="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@kmitl.ac.th"
                  required
                  bind:value={email}
                  disabled={isLoading}
                  class="h-11"
                />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center justify-between">
                  <Label for="password" class="text-sm font-medium">Password</Label>
                  <button
                    type="button"
                    class="text-sm text-primary hover:underline"
                    on:click={() => {}}
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  bind:value={password}
                  required
                  disabled={isLoading}
                  class="h-11"
                />
              </div>

              {#if errorMessage}
                <div class="rounded-md bg-destructive/10 border border-destructive/20 p-3">
                  <p class="text-sm text-destructive font-medium">{errorMessage}</p>
                </div>
              {/if}

              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  class="h-4 w-4 rounded border-input"
                />
                <label for="remember" class="text-sm text-muted-foreground">
                  Remember me for 30 days
                </label>
              </div>
            </div>

            <Button
              type="submit"
              class="w-full h-11 font-semibold bg-gradient-to-r from-blue-600 to-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Card.Content>
        <Card.Footer class="flex flex-col space-y-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <!-- <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div> -->
          </div>
          <!-- <Button variant="outline" type="button" class="w-full h-11" disabled={isLoading}>
            <svg class="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google Account
          </Button> -->
        </Card.Footer>
      </Card.Root>

      <!-- <p class="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <a href="/register" class="font-semibold text-primary hover:underline">
          Sign up
        </a>
      </p> -->
    </div>
  </div>

  <div class="hidden lg:flex lg:flex-1 bg-primary/5 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
    <div class="flex flex-col justify-center items-center w-full p-12 relative z-10">
      <div class="max-w-md space-y-6 text-center">
        <div class="space-y-2">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 mb-4">
            <svg
              class="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 class="text-4xl font-bold tracking-tight">
            Easy Check in
          </h2>
          <p class="text-lg text-muted-foreground">
            Track and manage course attendance with QR code check-ins, real-time monitoring, and detailed reports.
          </p>
        </div>

        <div class="grid gap-4 text-left mt-8">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold">QR Code Check-in</h3>
              <p class="text-sm text-muted-foreground">Fast and contactless attendance marking</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold">Real-time Tracking</h3>
              <p class="text-sm text-muted-foreground">Monitor attendance as it happens</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold">Detailed Reports</h3>
              <p class="text-sm text-muted-foreground">Comprehensive attendance analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
  </div>
</div>

<style>
  .bg-grid-pattern {
    background-image: linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
      linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
    background-size: 4rem 4rem;
  }
</style>