export default function mockPickImage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          uri: 'https://picsum.photos/400/400?random=1',
          type: 'image/jpeg',
          fileSize: 2 * 1024 * 1024,
        },
        {
          uri: 'https://picsum.photos/400/400?random=2',
          type: 'image/jpeg',
          fileSize: 2 * 1024 * 1024,
        },
      ]);
    }, 500);
  });
}