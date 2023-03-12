export const useQuerySearch = createSharedComposable(() => {
  const route = useRoute();
  const search = ref((route.query.q as string) ?? "");
  watch(search, () => {
    navigateTo({
      query: {
        q: search.value,
      },
      replace: true,
    });
  });
  return {
    search,
  };
});
