<template>
  <main flex-1>
    <div max-w-300 mx-auto px-4 mt-10>
      <div
        rounded-xl
        bg-white
        dark:bg-dark-900
        transition-all
        drop-shadow-lg
        border-light
        of-hidden
      >
        <div grid grid-cols-1 sm:grid-cols-2>
          <div px-16px py-20px>
            <slot></slot>
          </div>
          <div bg-dark-800 px-16px py-20px>
            <slot name="preview"></slot>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
