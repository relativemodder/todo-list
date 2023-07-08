<script lang="ts">
    import ToDoCard from "../components/ToDoCard.svelte";
    import type { ToDo } from "../types/ToDo"
    import Swal from 'sweetalert2'
    import { todoStore } from "../stores/todoStore";
	import { fly } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';


    function handleTodoDone(e: CustomEvent<ToDoCard>) {
        const todoIndex: number = e.detail as unknown as number;
        const newTodoList = $todoStore.filter((value, index) => index !== todoIndex);

        todoStore.set(
            newTodoList
        );

        console.debug(`Done ${todoIndex} task`);
    }

    function handleCreateTodo() {
        Swal.fire({
            title: 'New task',
            input: 'text',
            buttonsStyling: true,
            confirmButtonColor: '#0d6efd',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'OK',
            showLoaderOnConfirm: true
            })
        .then((result) => {
            if (result.isConfirmed) {
                const newTodo: ToDo = {
                    title: result.value
                };
                todoStore.set([...$todoStore, newTodo]);
            }
        })
    }

</script>

<div class="todo-container">
    <div class="todo-content">
        <div class="mt-3 d-flex flex-row align-items-center">
            <span class="fs-2">ToDo List</span>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="#" class="btn btn-primary my-3 ms-4" on:click={handleCreateTodo}>
                <i class="bi bi-plus-circle"></i>
            </a>
        </div>
        <div class="d-flex flex-column w-100 align-items-center px-3 mb-3">
            { #if $todoStore.length > 0 }
                { #each $todoStore as todo, index }
                    <ToDoCard index={index} todo={todo} on:done={handleTodoDone} />
                { /each }
            { :else }
                <div class="w-100 py-5 text-center no-todos"  transition:fly={{ x: 300, duration: 200, easing: quadOut }}>
                    {'No tasks. Add a new one by clicking '}
                    "<i class="bi bi-plus-circle"></i>"
                    {'button.'}
                </div>
            {/if}
        </div>
    </div>
</div>
<style>
@import "../styles/main.css";
</style>