<template>
  <div
    key="workshop-header"
    mb-8
    flex
    flex-col
    justify-center
    gap-y-4
    sm:gap-y-5
  >
    <h2
      text-4xl
      font-semibold
      sm:text-5xl
      text-transparent
      bg-clip-text
      bg-gradient-to-r
      from-green-400
      to-teal-600
    >
      {{ $t("workshop.header.title") }}
    </h2>
    <div font-medium sm:text-lg text-gray-500 dark:text-gray-400 sm:max-w-lg>
      {{ $t("workshop.header.desc") }}
    </div>
  </div>
</template>
