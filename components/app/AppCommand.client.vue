<script setup lang="ts">
// @ts-ignore
import { Command } from "vue-command-palette";
import "~/assets/scss/algolia.scss";

const { search } = useQuerySearch();

const visible = ref(false);

const keys = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === "k" && e.type === "keydown") {
      e.preventDefault();
    }
  },
});
const CmdK = keys["Meta+K"];
const CtrlK = keys["Ctrl+K"];
const Escape = keys["Escape"];
watch([CmdK, CtrlK], (v) => {
  if (v) {
    visible.value = true;
  }
});
watch(Escape, (v) => {
  if (v) {
    visible.value = false;
  }
});
</script>
<template>
  <div class="w-full mx-auto">
    <Command.Dialog :visible="visible" theme="algolia">
      <template #header>
        <Command.Input placeholder="Type search..." v-model:value="search" />
      </template>
      <template #body>
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <AppCommandTools @select="visible = false" />
        </Command.List>
      </template>
      <template #footer>
        <div class="command-palette-logo">
          <a
            href="https://github.com/KeJunMao/ai-anything"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="command-palette-Label">Search by</span>
            <div class="i-app:logo text-2xl"></div>
          </a>
        </div>
        <ul class="command-palette-commands">
          <li>
            <kbd class="command-palette-commands-key"
              ><svg width="15" height="15" aria-label="Enter key" role="img">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                >
                  <path
                    d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"
                  ></path>
                </g></svg></kbd
            ><span class="command-palette-Label">to select</span>
          </li>
          <li>
            <kbd class="command-palette-commands-key"
              ><svg width="15" height="15" aria-label="Arrow down" role="img">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                >
                  <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path>
                </g></svg></kbd
            ><kbd class="command-palette-commands-key"
              ><svg width="15" height="15" aria-label="Arrow up" role="img">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                >
                  <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path>
                </g></svg></kbd
            ><span class="command-palette-Label">to navigate</span>
          </li>
          <li>
            <kbd class="command-palette-commands-key"
              ><svg width="15" height="15" aria-label="Escape key" role="img">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                >
                  <path
                    d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"
                  ></path>
                </g></svg></kbd
            ><span class="command-palette-Label">to close</span>
          </li>
        </ul>
      </template>
    </Command.Dialog>
  </div>
</template>

<style>
div [command-dialog-mask] {
  background-color: #0000004d;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 200;
  animation: 333ms cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal none running shown;
}

div [command-dialog-wrapper] {
  position: relative;
  background: var(--gray2);
  border-radius: 6px;
  box-shadow: none;
  flex-direction: column;
  margin: 20vh auto auto;
  max-width: 560px;
  animation: 333ms cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal none running shown;
}

div [command-dialog-footer] {
  border-top: 1px solid var(--gray6);
  align-items: center;
  background: var(--gray4);
  color: var(--gray11);
  border-radius: 0 0 8px 8px;
  box-shadow: none;
  display: flex;
  flex-direction: row-reverse;
  flex-shrink: 0;
  height: 44px;
  justify-content: space-between;
  padding: 0 12px;
  position: relative;
  user-select: none;
  width: 100%;
  z-index: 300;
  font-size: 12px;
}
</style>
