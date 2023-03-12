<template>
  <Transition name="remove" mode="out-in"> <slot></slot> </Transition>
</template>

<style>
.remove-enter-active {
  animation: remove-in 0.5s;
}
.remove-leave-active {
  animation: remove-out 0.5s;
}
@keyframes remove-in {
  0% {
    opacity: 0;
    transform: translate(100%, 100%) rotate(20deg);
  }
  100% {
    opacity: 1;
  }
}
@keyframes remove-out {
  100% {
    transform: translate(-100%, 100%) rotate(-20deg);
    opacity: 0;
  }
}
</style>
