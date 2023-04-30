export async function initEnv() {
  if (process.env.NODE_ENV !== 'production') {
    (await import('dotenv')).config({ path: '../.env' });
  }
}
