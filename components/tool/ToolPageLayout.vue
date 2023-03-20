<template>
  <main>
    <div grid class="grid-cols-1 md:grid-cols-[300px_1fr]">
      <div hidden md:block>
        <slot name="left" />
      </div>
      <slot></slot>
    </div>
  </main>
</template>
