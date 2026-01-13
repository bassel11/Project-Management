# Authentication Integration Guide

This project expects a backend that exposes authentication endpoints. The frontend is configured to interact with them via `src/services/authService.js` and `src/services/api.js` (axios instance).

### Environment
- Use `.env` in development with values from `.env.example`:
  - `VITE_API_URL` - Base URL for your API (e.g. `https://api.example.com`)

### Endpoints (recommended)
- POST /api/Auth/login
  - Request body: { username: string, email: string, password: string, authType: number }
  - Response: { user: {...}, token: "<access_token>" }
  - Optionally set httpOnly refresh cookie when authenticated.

- POST /api/Auth/register
  - Request body: { username: string, email: string, password: string, authType: number }
  - Response: { user: {...}, token: "<access_token>" }

- GET /api/Auth/refresh
  - No body required; expects a httpOnly refresh cookie to be sent
  - Response: { user: {...}, token: "<access_token>" }

- POST /api/Auth/logout
  - Clears refresh cookie server-side and invalidates session
  - Response: 200 OK

### Client behaviour
- Access tokens (JWT) are stored in Redux state (not persisted) for improved security.
- Refresh tokens should be stored as httpOnly cookies by the server so the client can call `GET /api/Auth/refresh` to obtain a new access token when necessary.
- Axios instance `src/services/api.js` uses `withCredentials: true` so cookie-based refresh works cross-origin when backend allows credentials.
- On 401 responses, axios interceptor will call the `refreshAuth` thunk which calls `/api/Auth/refresh` and attempts to retry the failed request.

### Security recommendations
- Prefer httpOnly secure refresh cookies and short-lived access tokens.
- Enable SameSite=strict/lax/none according to your cross-site needs and ensure secure flag for HTTPS production.
- Use CSRF protections for cookie-based auth (Double Submit Cookie or server-provided CSRF token).

If you want, I can adapt the endpoints and payload shapes to your backend's exact contract — share the endpoints and response bodies and I'll wire them exactly.