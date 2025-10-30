import { writable } from "svelte/store";

export const isAdmin = writable(false);
export const emailStore = writable("");
