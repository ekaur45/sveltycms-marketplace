<script lang="ts">
    	import { onMount } from 'svelte';
    import axios from "axios";
    let name;
    let categories = [];
    const handleOnAddSubmit = async (e)=>{
        e.preventDefault();
        await axios.post('/api/category',{name});
        getAllCategories();
    }
    const getAllCategories = async ()=>{
        const result = await axios.get('/api/category');
        categories = result.data;
    }
    const deleteCategory = async (id)=>{
        await axios.delete('/api/category/'+id);
        getAllCategories();
    }
    onMount(() => {
        getAllCategories();
    })
</script>

<form on:submit={handleOnAddSubmit}>
    <input type="text" bind:value={name} class="mp-input">
    <button class="btn-default">Submit</button>
</form>
<div class="w-full">
    <ul class="flex flex-col w-full">
        {#each categories as category}
            <li>{category.name}
                <button class="border border-gray p-2 rounded" on:click={deleteCategory(category.categoryId)}>Delete</button>
            </li>
        {/each}
    </ul>
</div>