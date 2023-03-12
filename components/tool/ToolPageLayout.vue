<template>
  <main flex-1>
    <div max-w-2xl mx-auto px-4 mt-10>
      <div
        rounded-xl
        bg-white
        dark:bg-dark-900
        transition-all
        drop-shadow-lg
        border-light
        of-hidden
        px-16px
        py-20px
      >
        <slot></slot>
      </div>
    </div>
  </main>
</template>
