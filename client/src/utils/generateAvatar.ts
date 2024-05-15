/* eslint-disable import/prefer-default-export */

export function generateAvatar(name: string) {
  const url = new URL('https://ui-avatars.com/api/');
  const searchParams = new URLSearchParams({
    'font-size': '0.42',
    background: 'random',
    name,
  });

  url.search = searchParams.toString();

  return url.toString();
}
