if (process.env.NODE_ENV !== 'production') {
  (await import('dotenv')).config({ path: '../.env' });
}

console.log(process.env.IVAN_CHAT_ID, 'asd', process.env.NODE_ENV);
