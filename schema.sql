-- Atelier Interiors — D1 schema (mirrors the SQLite tables in backend/app.py)

CREATE TABLE IF NOT EXISTS consultations (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT NOT NULL,
    email          TEXT,
    phone          TEXT NOT NULL,
    project_type   TEXT,
    property_size  TEXT,
    area_sqft      TEXT,
    budget         TEXT,
    timeline       TEXT,
    preferred_date TEXT,
    message        TEXT,
    estimate       TEXT,
    source         TEXT,
    created_at     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS enquiries (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT,
    phone      TEXT NOT NULL,
    message    TEXT NOT NULL,
    source     TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS subscribers (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    email      TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);
