<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';

  const dispatch = createEventDispatcher();
  import {page} from '$app/stores';
  const categories = $page.data.categories;
  // Form data state
  let product = {
    id: null,
    userId: null,
    title: '',
    description: '',
    price: 0,
    categoryId: null,
    stock: 0,
    imageUrl: '',
  };

  // Function to handle form submission
  async function handleSubmit(event: Event) {
    event.preventDefault();

    try {
      // Send the form data to the backend (update or create)
      const response = await fetch('/api/products', {
        method: product.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
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
        required
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
      <label for="stock">Stock</label>
      <input
        type="number"
        id="stock"
        class="mp-input"
        bind:value={product.stock}
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
        required
      />
    </div>
  
    <button type="submit" class="btn-default">Save Product</button>
  </form>
</div>
