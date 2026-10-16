# GreenCore

GreenCore is a full-stack platform for an orchard and fresh-produce business. It combines a public-facing website with produce information and orchard-visit booking, a secure partner portal for order tracking, and an administrative workspace for managing the operation.

## What it does

- Presents the orchard, products, production process, and business partners to visitors.
- Lets visitors request an orchard visit.
- Lets registered partners create and track produce transactions, view available products, and review finance summaries.
- Gives administrators control of transactions, products, bookings, partners, and aggregated financial information.
- Supports separate user and administrator roles, JWT-based authentication, and token revocation on logout.

## Technology

| Area | Tools |
| --- | --- |
| Front end | React 18, Vite, React Router, React Calendar |
| Back end | Python, FastAPI, SQLAlchemy, Pydantic |
| Database | PostgreSQL |
| Database migrations | Alembic |
| Authentication | JWT (`python-jose`) with bcrypt password hashing |

## Project structure

```text
.
├── front-end/              # React single-page application
│   ├── public/assets/       # Images, icons, and brand assets
│   └── src/                # Pages, dashboard UI, routing, and API client logic
├── back-end/
│   ├── app/
│   │   ├── api/routes/      # Authentication, booking, user, and admin endpoints
│   │   ├── core/            # Application settings, database, and security
│   │   ├── crud/            # Database operations
│   │   ├── models/          # SQLAlchemy models
│   │   └── schemas/         # Request and response models
│   └── alembic/             # Database migrations
└── package.json             # Convenience scripts for the front end
```

## Run locally

### Prerequisites

- Node.js 18 or newer
- Python 3.10 or newer
- PostgreSQL 14 or newer

Create a PostgreSQL database named `greencore` (or use any database name you prefer), then configure the backend to use it.

### 1. Configure and start the API

```bash
cd back-end
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create `back-end/.env` with your local settings:

```env
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/greencore
JWT_SECRET_KEY=replace-with-a-long-random-secret
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
BACKEND_CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Apply the database migrations and start FastAPI:

```bash
alembic upgrade head
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`. FastAPI's interactive documentation is available at `http://127.0.0.1:8000/docs`.

### 2. Start the front end

In a second terminal, from the repository root:

```bash
npm --prefix front-end install
npm run dev
```

Open the local URL shown by Vite, normally `http://localhost:5173`.

The client uses `http://127.0.0.1:8000` by default. To point it to another API, create `front-end/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### Production build

```bash
npm run build
```

This creates the deployable front-end bundle in `front-end/dist`.

## Main API areas

| Area | Base path | Purpose |
| --- | --- | --- |
| Authentication | `/greencore` | Registration, login, logout, and account management |
| Bookings | `/greencore/book` | Submit an orchard-visit booking |
| Partner transactions | `/greencore/transactions` | Create, view, update, and delete the current user's transactions |
| Products | `/greencore/products` | View products available to authenticated users |
| Partner finances | `/greencore/finances` | View the current user's finance summary |
| Administration | `/greencore/admin/*` | Manage transactions, products, tourism bookings, partners, and finances |

Use `/docs` for the complete, live API contract and request schemas.

## Notes for deployment

- Never use the example `JWT_SECRET_KEY` in a deployed environment; provide a strong secret through environment variables.
- Set `DATABASE_URL` and `BACKEND_CORS_ORIGINS` for the production database and front-end domain.
- Run `alembic upgrade head` as part of the release process before starting the API.
