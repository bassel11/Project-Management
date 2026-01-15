# ADR: Unified Dashboard + Microservices Architecture

Status: Proposed

Context
-------
We are building a Committee Management System for enterprise use. Requirements include identity, meetings, decisions, tasks, audit, notifications, and monitoring. UX must be consistent and efficient for admins and users.

Decision
--------
Adopt a Unified Dashboard (Single React SPA) that integrates multiple backend microservices through an API Gateway. Use an independent Identity microservice (OIDC/OAuth2) for authentication and RBAC. Each business capability is a separate microservice with its own datastore (DB-per-service). Use event-driven integration for cross-service data propagation.

Consequences
------------
- Single SPA simplifies UX and context switching (Workspaces).  
- API Gateway centralizes auth, routing, aggregation, and rate-limiting.  
- Consider a BFF (preferably implemented in ASP.NET Core for this stack) to reduce chatty client requests and aggregate data per client type when needed.
- Independent services enable team autonomy and scalability.  
- Need robust observability, contract testing, and CI/CD to manage complexity.

Key Components
--------------
- Frontend: React SPA (Vite), Smart Sidebar, Workspace context.  
- Identity: OIDC/OAuth2 provider (IdentityServer/Azure AD/Auth0), JWTs with refresh rotation + MFA.  
- API Gateway: YARP/Ocelot/NGINX+Lua or Cloud Gateway.  
- BFF: if used, implement in ASP.NET Core to align with the .NET backend and enterprise toolchain.
- Services: Committee, Meeting, Decision, Task, Audit, Notification, Monitoring.  
- Messaging: Kafka/RabbitMQ for events; use Saga or Outbox pattern for consistency.  
- Infra: Kubernetes + Helm, Prometheus, Grafana, ELK/EFK, OpenTelemetry.

Notes
-----
- Start with SPA + Gateway + Identity PoC before splitting to BFFs or micro-frontends.
- Use HttpOnly cookies for refresh tokens; avoid localStorage for tokens.
