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
    <input type="text" bind:value={name}>
    <button>Submit</button>
</form>
<div>
    <ul>
        {#each categories as category}
            <li>{category.name}

                <button on:click={deleteCategory(category.categoryId)}>Delete</button>
            </li>
        {/each}
    </ul>
</div>