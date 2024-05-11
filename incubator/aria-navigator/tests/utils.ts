export async function settled() {
  await new Promise((resolve) => window.setTimeout(resolve, 1));
}
