<script lang="ts">
    import { onMount } from 'svelte';
    import axios from 'axios';
    let products: any[] = [];
    import { goto } from '$app/navigation';
    onMount(async () => {
      const result = await axios.get('/api/products');
      products = result.data;
    });
  </script>
  
    <div class="shadow-md p-4 mb-4 bg-white-300 mt-3">
      <h4>Submit Your Package</h4>
      <p class="mb-3">Are you passionate about improving content management? Join us in enhancing SveltyCMS! Utilize our powerful REST API and comprehensive documentation to create your own extensions and features. Together, we can transform SveltyCMS into the leading platform for all your content management needs</p>
      <button on:click={()=>{goto('/products/add')}} class="btn-default">Create package</button>
    </div>
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4">Packages</h1>
    </div>
    <div class="filter">

    </div>
    <div class="products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
      <input type="search" placeholder="Search" class="mp-input">
      <select class="mp-input">
        <option value="theme">Theme</option>
        <option value="plugin">Plugin</option>
      </select>
      <select class="mp-input">
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#if !products || products.length ===0}
        <p>No data</p>
      {/if}
      {#each products as product}
          <a href={`/products/${product.id}`}>
            <div class="shadow-lg bg-white">
              {#if product.imageUrl}
              <img src="{'/file/'+product.imageUrl}" alt="">
                {:else}
                <img src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" alt="">
              {/if}
              <div class="p-3">
                <span>
                  {#if product.price==0}
                    Free
                  {:else}
                  ${product.price}
                  {/if}
                </span>
                <br>
                <h4>
                  {product.title}
                </h4>
                <p>
                  {product.description}
                </p>
              </div>
            </div>
          </a>
      {/each}
    </div>