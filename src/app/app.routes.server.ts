import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // ✅ Public pages → prerender
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'courses',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'login',
    renderMode: RenderMode.Client
  },

  // 🔐 Protected routes → CLIENT ONLY
  {
    path: 'admin/**',
    renderMode: RenderMode.Client
  },

  // fallback
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
