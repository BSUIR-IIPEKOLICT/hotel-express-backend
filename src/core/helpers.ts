export async function bootstrap(
  port: string | number,
  callback: () => Promise<void>
) {
  try {
    await callback();
  } catch (e) {
    console.log(`Server error: ${e.message}`);
    process.exit(1);
  }
}
