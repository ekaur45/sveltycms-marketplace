<script lang="ts">
    import './../app.css';
    import axios from "axios";
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { invalidate } from '$app/navigation';
    const {user} = $page.data;
    const handleLogoutClick = async (e:any) => {
        await axios.get('/api/account/logout');
        window.location.reload();
    }
</script>
<div class="container mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
    {#if $page.url.pathname!=='/account/login' && $page.url.pathname!=='/account/create'}    
    <header class="bg-whit shadow bg-black bg-opacity-10">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div class="flex lg:flex-1">
            <a href="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Marketplace</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="">
            </a>
          </div>
          <div class="flex hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span class="sr-only">Open main menu</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div class="hidden lg:flex lg:gap-x-12">
            {#if user}
            {#if user.role =='admin'}
            <a href="/category" class="text-sm font-semibold leading-6 text-gray-900 me-3">Add category</a>
            {/if}
            <a href="/products/add" class="text-sm font-semibold leading-6 text-gray-900 me-3">Add Product</a>
            <a href="/products/mine" class="text-sm font-semibold leading-6 text-gray-900 me-3">My Product</a>
             {/if}
          </div>
          {#if user}
            <!-- <button>Upload</button>
            <button on:click={handleLogoutClick}>Logout</button>
            <img src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" class="h-10 w-10 shadow flex-none rounded-full"> -->
            <div class="flex gap-2">
                <span>{user?.name}</span> | 
            <div class="lg:flex lg:flex-1 lg:justify-end">
                <a href="/account/login" on:click={handleLogoutClick} class="text-sm font-semibold leading-6 text-gray-900">Log out <span aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
        {:else}
        <div class="lg:flex lg:flex-1 lg:justify-end">
            <a href="/account/login" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
          </div>
        {/if}
       
        </nav>
        <!-- Mobile menu, show/hide based on menu open state. -->
        <div class="hidden" role="dialog" aria-modal="true">
          <!-- Background backdrop, show/hide based on slide-over state. -->
          <div class="fixed inset-0 z-10"></div>
          <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
              <a href="/" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="">
              </a>
              <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span class="sr-only">Close menu</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                
                  <a href="/" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
                </div>
                <div class="py-6">
                  <a href="/account/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </header>
    {/if}
    <slot/>
</div>