<template>
  <div class="bg-gradient-to-b from-stone-400 h-full flex items-center justify-center ">
    <div v-if="$route.name === 'home'" class="w-11/12 min-h-screen border-2 flex items-center justify-center py-4">
      <router-view/>
    </div>
    <div v-else class="min-h-screen flex justify-center items-center">
      <router-view/>
    </div>
  </div>
</template>

<style>
</style>
