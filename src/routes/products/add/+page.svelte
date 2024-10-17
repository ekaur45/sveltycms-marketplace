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
    file:null,
    featuredImage:null
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
  const handleFileChange = e=>{  
    product.file = e.target.files[0];
  }
  const handleOnFeatureImageChange = e=>{  
    product.featuredImage = e.target.files[0];
  }
</script>
<div class="bg-white p-6 shadow w-full mt-3">
  <h4 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900s">Add new product</h4>
  <form on:submit={handleSubmit} class="product-form">
    <div class="mb-3">
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        class="mp-input mt-3"
        bind:value={product.title}
        required
      />
    </div>
  
    <div class="mb-3">
      <label for="description">Description</label>
      <textarea
        id="description"
        class="mp-input"
        bind:value={product.description}
        required
      />
    </div>
  
    <div class="mb-3">
      <label for="price">Price <span style="font-size: 12px;" class="text-gray-400">(Leave empty if the product is free)</span></label>
      <input
        type="number"
        id="price"
        class="mp-input"
        bind:value={product.price}
        step="0.01"
        placeholder="Leave empty if the product is free"
      />
    </div>
  
    <div class="mb-3">
      <label for="categoryId">Category</label>
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
  
    <div class="mb-3">
      <label for="summary">Summary</label>
      <input
        type="text"
        id="summary"
        class="mp-input"
        bind:value={product.summary}
        required
      />
    </div>
  
    <div class="mb-3">
      <label for="imageUrl">Featured Image</label>
      <!-- <input
        type="text"
        id="imageUrl"
        class="mp-input"
        bind:value={product.imageUrl}
        
      /> -->
      <label for="featuredImage" class="mp-input">
        {product.featuredImage?.name ??"Select featured image"}
        <input type="file" style="display: none;" on:change={handleOnFeatureImageChange}  accept="image/png, image/gif, image/jpeg" name="featuredImage" id="featuredImage" class="mp-input">
      </label>
    </div>
    <div class="mb-3">
      <label for="file">File</label>
      <input
        type="file"
        id="file"
        class="mp-input"
        on:change={handleFileChange}
        
      />
    </div>
  
    <button type="submit" class="btn-primary mb-3">Save Product</button>
  </form>
</div>
