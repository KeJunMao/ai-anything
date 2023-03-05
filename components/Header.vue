<template>
  <header h-16 flex items-center container mx-auto px-4 md:px-0>
    <NuxtLink to="/"><Logo /></NuxtLink>
    <Nav flex-1 />
    <div flex flex-cols gap-4>
      <ThemeSelect />
      <NuxtLink to="https://github.com/KeJunMao/ai-anything" target="_blank">
        <ABtn color="inherit" variant="text">
          <div class="i-mdi:github"></div>
        </ABtn>
      </NuxtLink>
    </div>
  </header>
</template>
