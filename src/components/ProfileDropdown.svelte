<script lang="ts">
    let dropdownOpen = false;
    export let user;
    import axios from "axios";
    function toggleDropdown() {
      dropdownOpen = !dropdownOpen;
    }
  
    function closeDropdown() {
      dropdownOpen = false;
    }
    const handleLogoutClick = async (e:any) => {
        await axios.get('/api/account/logout');
        window.location.reload();
    }
  </script>
  
  <!-- Profile Button -->
  <div class="relative inline-block text-left">
    <button 
      on:click={toggleDropdown} 
      class="flex items-center space-x-2 text-white rounded-lg focus:outline-none "
    >
      <!-- Rounded Profile Image -->
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img  src="https://via.placeholder.com/40" 
        alt="Profile Picture" 
        class="w-12 h-12 rounded-full object-cover border"
      />
    </button>
  
    <!-- Dropdown Menu -->
    {#if dropdownOpen}
      <button 
        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
        
        on:click={closeDropdown}
      >
      {#if user}
      <a 
        href="/profile" 
        class="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
      >
        {user?.name}
      </a>
      <hr>
            {#if user.role =='admin'}
            <a href="/category" class="rounded-lg block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left">Add category</a>
            {/if}
            <a href="/products/add" class="rounded-lg block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left">Add Product</a>
            <a href="/products/mine" class="rounded-lg block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left">My Product</a>
             {/if}
        <a 
          href="/account/login"
          on:click={handleLogoutClick}
          class="rounded-lg block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
        >
          Logout
        </a>
    </button>
  
      <!-- Close the dropdown when clicking outside -->
      <button class="fixed inset-0 z-40" on:click={closeDropdown}></button>
    {/if}
  </div>
  