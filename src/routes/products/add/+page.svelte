<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';

  const dispatch = createEventDispatcher();
  import {page} from '$app/stores';
  const categories = $page.data.categories;
  // Form data state
  let product = {
    userId: null,
    title: '',
    description: '',
    price: 0,
    categoryId: null,
    summary: '',
    imageUrl: '',
    file:null
  };

  // Function to handle form submission
  async function handleSubmit(event: Event) {
    event.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(product).forEach(key => {        
        formData.append(key, product[key]);
      });
      // Send the form data to the backend (update or create)
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        dispatch('save', { product: result });
      } else {
        console.error('Failed to save product');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
const   handleFileChange = e=>{
  
    product.file = e.target.files[0];
  }
</script>
<div class="card">
  <form on:submit={handleSubmit} class="product-form">
    <div>
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        class="mp-input"
        bind:value={product.title}
        required
      />
    </div>
  
    <div>
      <label for="description">Description</label>
      <textarea
        id="description"
        class="mp-input"
        bind:value={product.description}
        required
      />
    </div>
  
    <div>
      <label for="price">Price</label>
      <input
        type="number"
        id="price"
        class="mp-input"
        bind:value={product.price}
        step="0.01"
        placeholder="Leave empty if the product is free"
      />
    </div>
  
    <div>
      <label for="categoryId">Category ID</label>
      <select bind:value={product.categoryId}
      class="mp-input">
        {#each categories as category}        
          <option value="{category.categoryId}">{category.name}</option>
        {/each}
      </select>
      <!-- <input
        type="number"
        id="categoryId"
        bind:value={product.categoryId}
        required
      /> -->
    </div>
  
    <div>
      <label for="summary">Summary</label>
      <input
        type="text"
        id="summary"
        class="mp-input"
        bind:value={product.summary}
        required
      />
    </div>
  
    <div>
      <label for="imageUrl">Image URL</label>
      <input
        type="text"
        id="imageUrl"
        class="mp-input"
        bind:value={product.imageUrl}
        
      />
    </div>
    <div>
      <label for="file">File</label>
      <input
        type="file"
        id="file"
        class="mp-input"
        on:change={handleFileChange}
        
      />
    </div>
  
    <button type="submit" class="btn-default">Save Product</button>
  </form>
</div>
