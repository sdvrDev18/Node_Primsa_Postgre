## Node.js + Prisma Setup Summary

> **Project Pattern:**
>
> * `Database/` folder → Prisma schema, TS tooling, database access
> * `Backend/` folder → Node.js app in JavaScript using Prisma Client

---

### ✅ Folder Structure

```
FEM_Nodejs_v4/
├── Backend/             → Node.js backend (JavaScript)
│   ├── db.js            → Prisma client usage
│   ├── .env             → Contains both DATABASE_URL and JWT_SECRET
├── Database/            → Prisma + PostgreSQL (TypeScript tooling)
│   ├── prisma/
│   │   └── schema.prisma
```

---

### ✅ Setup Steps

#### ✅ 1. Initialize Node Projects

```bash
cd Backend && npm init -y
cd ../Database && npm init -y
```

#### ✅ 2. Install Dependencies

In `Database/`:

```bash
npm install --save-dev prisma
```

In `Backend/`:

```bash
npm install @prisma/client dotenv
```

#### ✅ 3. Configure `schema.prisma`

In `Database/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../../Backend/node_modules/.prisma/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String   @id @default(uuid())
  username String   @unique
  password String
}
```

> ⚠️ Do not output to `@prisma/client` directly. Use `.prisma/client`.

---

### ✅ 4. Environment Variables

Use a **single `.env` file** in `Backend/`:

**`Backend/.env`:**

```env
DATABASE_URL=postgresql://username:password@host:port/dbname
JWT_SECRET=your_jwt_secret
```

> 🧠 Prisma CLI walks up the folder tree to locate `.env` — so it will find the file in `../Backend/.env` even from `Database/`.

Delete any `.env` in `Database/`.

---

### ✅ 5. Generate Prisma Client

```bash
cd Database
npx prisma generate --schema=prisma/schema.prisma
```

✅ Output:

```
✔ Generated Prisma Client to ../../Backend/node_modules/.prisma/client
```

---

### ✅ 6. Using Prisma in Backend

In `Backend/db.js`:

```js
import dotenv from "dotenv";
dotenv.config(); // ✅ Loads from Backend/.env by default

import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
```

> ✅ `JWT_SECRET` and `DATABASE_URL` are both now loaded into the Node.js environment.

---

### ✅ 7. Optional Prisma Script

In `Database/package.json`:

```json
"scripts": {
  "generate": "prisma generate --schema=prisma/schema.prisma"
}
```

Run with:

```bash
npm run generate
```

---

## 🧽 Common Issues & Fixes

| Issue                               | Cause                                 | Fix                                                      |
| ----------------------------------- | ------------------------------------- | -------------------------------------------------------- |
| `@prisma/client did not initialize` | Output path incorrect                 | Use `.prisma/client`                                     |
| `DATABASE_URL` error at runtime     | Env not loaded in Backend             | Use `dotenv.config()` with no path if .env is in Backend |
| Prisma Client not available         | Generated in wrong path               | Regenerate with correct schema path                      |
| Request hangs                       | No matching route or no response sent | Ensure route method matches + fallback                   |

---

## ✅ Final Checklist

* [x] Prisma CLI installed in `Database/`
* [x] Client output to `Backend/node_modules/.prisma/client`
* [x] `@prisma/client` installed in `Backend/`
* [x] Single `.env` file in `Backend/` with both `DATABASE_URL` and `JWT_SECRET`
* [x] `dotenv.config()` used in backend (no path)
* [x] Prisma successfully picks up `DATABASE_URL` during generation

---

This summary includes all foundational setup decisions, error handling steps, and folder/module structure for your preferred split setup using only one `.env` file.
