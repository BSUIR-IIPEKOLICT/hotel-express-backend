export async function bootstrap(
  port: string | number,
  callback: () => Promise<void>
) {
  try {
    await callback();
  } catch (e) {
    console.error(`Server error: ${e.message}`);
  }
}
