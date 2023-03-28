export function downloadJson(name: string, jsonObj: any) {
  const a = document.createElement("a");
  a.download = `${name}.json`;
  const blob = new Blob([JSON.stringify(jsonObj, null, 2)], {
    type: "application/json",
  });
  const href = URL.createObjectURL(blob);
  a.href = href;
  a.click();
  URL.revokeObjectURL(href);
}
