<script lang="ts">
	import { fly } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import type { ToDo } from '../types/ToDo';
    import { createEventDispatcher } from 'svelte';

    export let index: number;
    export let todo: ToDo;

	const dispatch = createEventDispatcher();

</script>

<div class="card mt-3 w-100" transition:fly={{ x: -200, duration: 300, easing: quadOut }}>
    <div class="card-body d-flex flex-row align-items-center">
        <span class="fs-5 card-title w-100 mb-0">{ todo.title }</span>
        <button class="btn btn-success" on:click={() => {
            dispatch('done', index)
        }}>
            <i class="bi bi-check"></i>
        </button>
    </div>
</div>