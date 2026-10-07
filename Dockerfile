# Servidor único: Express (backend/) sirve API + SSR del frontend.
# Raíz usa pnpm, backend/ usa npm: cada stage usa su package manager.
# Se invoca vite directo (no los scripts build:*) para no mezclar managers.

# ---- frontend (build cliente + SSR) ----
FROM node:22-bookworm-slim AS frontend
RUN corepack enable && corepack prepare pnpm@12.9.1 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY vite.config.ts ./
COPY src ./src
RUN pnpm exec vite build && pnpm exec vite build --ssr

# ---- backend (compila TS) ----
FROM node:22-bookworm-slim AS backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci
COPY backend/tsconfig.json ./
COPY backend/src ./src
RUN npm run build && npm prune --omit=dev

# ---- runtime prod (sin vite/tsx/devDeps) ----
FROM node:22-bookworm-slim AS runner
ENV NODE_ENV=production
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=backend /app/backend/dist ./dist
COPY --from=frontend /app/dist /app/dist
EXPOSE 3000
CMD ["node", "dist/server.js"]
