# Frontend Integration with API Gateway

This file explains how the React SPA connects to the API Gateway and how to test the Admin flows (register user, enable MFA).

1) Configure the frontend to use your API Gateway

- Edit `.env` or copy `.env.example` and set `VITE_API_URL` to your gateway URL (example already set to http://localhost:5281):

  VITE_API_URL=http://localhost:5281

- The frontend `src/services/api.js` reads `import.meta.env.VITE_API_URL` as `baseURL`. No other changes required for the admin endpoints.

2) Run frontend locally

```bash
npm install
npm run dev
```

3) Admin routes in the SPA

- Open: `/app/admin` (requires logged-in user with `role: 'ADMIN'`).
- The Admin Dashboard components call the following gateway endpoints via `src/services/api.js`:
  - `POST /api/Auth/register` — payload: { firstName, lastName, email, password, privilageType, role }
  - `POST /api/Auth/enable-mfa` — payload: { userId, deliveryMethod }

4) Quick API examples (via gateway)

- Register a user (curl):

```bash
curl -X POST http://localhost:5281/api/Auth/register \
  -H 'Content-Type: application/json' \
  -d '{ "firstName":"Test","lastName":"User","email":"test@example.com","password":"P@ssw0rd","privilageType":0,"role":"USER" }'
```

- Enable MFA for a user (curl):

```bash
curl -X POST http://localhost:5281/api/Auth/enable-mfa \
  -H 'Content-Type: application/json' \
  -d '{ "userId":"<user-id>", "deliveryMethod":2 }'
```

5) Notes & best practices
- Use HttpOnly secure cookies for refresh tokens at the gateway, and return access tokens in response bodies only if required.
- Ensure gateway routes forward cookies and headers (`withCredentials` is enabled in `src/services/api.js`).
- Server must enforce RBAC; client-side checks are only for UX.
