<template>
  <nav class="bg-gradient-to-r from-sky-700 to-sky-600 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img
          src="/weatherIcon.png"
          alt="Logo de Weather"
          class="w-12 h-12 object-contain drop-shadow-md"
        />
        <h1 class="text-3xl font-bold tracking-wide select-none">Hoy en el Clima</h1>
      </div>

      <ul class="flex space-x-6 text-lg font-semibold">
        <li>
          <button
            class="px-5 py-2 rounded-full bg-sky-800 hover:bg-sky-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            Hoy
          </button>
        </li>
        <!-- Más botones aquí -->
      </ul>
    </div>
  </nav>
</template>
