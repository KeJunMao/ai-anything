<template>
  <div bg-white dark:bg-black text-black dark:text-white>
    <div flex flex-col min-h-screen>
      <Header w-screen />
      <main w-screen container m-auto flex-1>
        <slot />
      </main>
      <Footer w-screen />
    </div>
  </div>
</template>
