import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EasyCook India',
    short_name: 'EasyCook',
    description: 'Simple, authentic Indian recipes for everyone.',
    start_url: '/',
    display: 'standalone', // Removes browser URL bar
    background_color: '#faf9f6',
    theme_color: '#059669',
    icons: [
      {
        src: '/icon.png', // You need to put a 192x192 png in /public
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png', // You need to put a 512x512 png in /public
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}