# Deploy

## Seguridad (crítico)
- Rota credenciales expuestas (Meta/WhatsApp y Google Cloud) y elimina su rastro del historial de Git.
- Limpieza recomendada (git-filter-repo):

```
# En la rama principal
git rm -f --cached server/.env server/credentials.json
git commit -m "chore(security): remove leaked secrets from index"
# Reescribir historial
git filter-repo --invert-paths --path server/.env --path server/credentials.json
# Publicar cambios reescritos
git push origin --force --all
git push origin --force --tags
```

> Alternativa (más lenta): `git filter-branch --force --index-filter "git rm --cached --ignore-unmatch server/.env server/credentials.json" --prune-empty --tag-name-filter cat -- --all` seguido de `git gc` y push forzado.

## Frontend (Vercel)
1. Crea cuenta e inicia sesión en Vercel.
2. Conecta el repositorio (GitHub/GitLab/Bitbucket).
3. New Project → selecciona el repo.
4. Usa configuración por defecto (detecta sitio estático).
5. Deploy automático en cada `git push` a la rama configurada.

## Backend (Fly.io)
1. Requisitos: instala `flyctl` y ejecuta `fly auth login`.
2. Inicializa la app desde el backend:

```
cd server
fly launch
```

- Detectará `server/Dockerfile` y creará `fly.toml`.
- Asegura que `internal_port = 3000` (el servidor escucha `process.env.PORT || 3000`).

3. Configura secretos con un archivo local `.secrets.env` (no versionar):

```
WHATSAPP_PHONE_NUMBER_ID=xxxxxxxxxxxxxxxx
WHATSAPP_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_CLIENT_EMAIL=service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n
GOOGLE_CALENDAR_ID=tu-calendario@group.calendar.google.com
FRONTEND_URL=https://tu-frontend.vercel.app
NODE_ENV=production
PORT=3000
```

- Importar secretos:

```
# Windows PowerShell
type .secrets.env | fly secrets import
# o bien
Get-Content .secrets.env | fly secrets import

# macOS/Linux
fly secrets import < .secrets.env
```

4. Despliega y verifica:

```
fly deploy
fly status
fly open
```

5. (Opcional) Dominio personalizado:

```
fly certs create tu-dominio.com
fly certs show tu-dominio.com
```

## Archivos útiles
- `server/Dockerfile`: Node 20-alpine, expone `3000`, arranque `node server.js`.
- `server/.dockerignore`: excluye dependencias, logs, tests, docs y secretos.
- `server/.gitignore`: incluye `.secrets.env` y `.env*`.

## CORS
- Ajusta `FRONTEND_URL` al dominio real de Vercel para restringir CORS en producción.
- Alternativamente, codifica la URL en el código si lo prefieres, pero se recomienda variable de entorno.
