import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { ToDo } from "../types/ToDo";
import { browser } from '$app/environment';

const initialValue = browser ? JSON.parse(window.localStorage.getItem('todos') || "[]") ?? [] : [];
const todoStore: Writable<Array<ToDo>> = writable(initialValue);

todoStore.subscribe(value => {
    if (browser) {
        window.localStorage.setItem('todos', JSON.stringify(value));
    }
});

export { todoStore };