<template>
  <main flex-1>
    <div max-w-300 mx-auto px-4 mt-10>
      <div
        rounded-xl
        bg-white
        dark:bg-dark-900
        transition-all
        drop-shadow-none
        sm:drop-shadow-lg
        border-light
        of-hidden
      >
        <div flex flex-col-reverse sm:flex-row>
          <div px-16px py-20px flex-1>
            <slot></slot>
          </div>
          <div flex-1 bg-light-200 dark:bg-dark-800 px-16px py-20px of-hidden>
            <slot name="preview"></slot>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
