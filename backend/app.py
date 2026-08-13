"""
Atelier Interiors — Premium demo backend (FastAPI).

A business-growth backend supporting a booking/consultation workflow, a general
enquiry form and newsletter sign-ups. All data is stored in a local SQLite
database (studio.db). Runs fully offline — no keys or external services.

Run:
    pip install -r requirements.txt
    python app.py            # or: uvicorn app:app --reload --port 5002
API:  http://localhost:5002      Docs: http://localhost:5002/docs
"""

import os
import re
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "studio.db")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

app = FastAPI(title="Atelier Interiors API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()


def init_db():
    with get_db() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS consultations (
                id            INTEGER PRIMARY KEY AUTOINCREMENT,
                name          TEXT NOT NULL,
                email         TEXT,
                phone         TEXT NOT NULL,
                project_type  TEXT,
                property_size TEXT,
                area_sqft     TEXT,
                budget        TEXT,
                timeline      TEXT,
                preferred_date TEXT,
                message       TEXT,
                estimate      TEXT,
                source        TEXT,
                created_at    TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS enquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL, email TEXT, phone TEXT NOT NULL,
                message TEXT NOT NULL, source TEXT, created_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS subscribers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL
            )
            """
        )
        conn.commit()


class ConsultationIn(BaseModel):
    name: str = ""
    email: str = ""
    phone: str = ""
    project_type: str = ""
    property_size: str = ""
    area_sqft: str = ""
    budget: str = ""
    timeline: str = ""
    preferred_date: str = ""
    message: str = ""
    estimate: str = ""
    source: str = "book-page"


class EnquiryIn(BaseModel):
    name: str = ""
    email: str = ""
    phone: str = ""
    message: str = ""
    source: str = "contact-page"


class SubscribeIn(BaseModel):
    email: str = ""


def _now():
    return datetime.now(timezone.utc).isoformat()


def _validate_contact(name, phone, message, email, need_message=True):
    errors = {}
    if not name:
        errors["name"] = "Please enter your name."
    if not phone:
        errors["phone"] = "Please enter a phone number."
    elif len(re.sub(r"\D", "", phone)) < 7:
        errors["phone"] = "Please enter a valid phone number."
    if email and not EMAIL_RE.match(email):
        errors["email"] = "Please enter a valid email address."
    if need_message and not message:
        errors["message"] = "Please add a short message."
    return errors


@app.on_event("startup")
def _startup():
    init_db()


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "atelier-interiors", "time": _now()}


@app.post("/api/consultation")
def consultation(p: ConsultationIn):
    name, phone, email = p.name.strip(), p.phone.strip(), p.email.strip()
    errors = _validate_contact(name, phone, p.message, email, need_message=False)
    if errors:
        return JSONResponse(status_code=400, content={"ok": False, "errors": errors})
    with get_db() as conn:
        cur = conn.execute(
            """INSERT INTO consultations
               (name,email,phone,project_type,property_size,area_sqft,budget,timeline,preferred_date,message,estimate,source,created_at)
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)""",
            (name, email, phone, p.project_type.strip(), p.property_size.strip(), p.area_sqft.strip(),
             p.budget.strip(), p.timeline.strip(), p.preferred_date.strip(), p.message.strip(),
             p.estimate.strip(), p.source.strip(), _now()),
        )
        conn.commit()
        cid = cur.lastrowid
    return JSONResponse(status_code=201, content={
        "ok": True, "id": cid,
        "message": "Thank you! Your consultation request is booked — our design team will confirm within 24 hours.",
    })


@app.post("/api/enquiry")
def enquiry(p: EnquiryIn):
    name, phone, email, message = p.name.strip(), p.phone.strip(), p.email.strip(), p.message.strip()
    errors = _validate_contact(name, phone, message, email, need_message=True)
    if errors:
        return JSONResponse(status_code=400, content={"ok": False, "errors": errors})
    with get_db() as conn:
        cur = conn.execute(
            "INSERT INTO enquiries (name,email,phone,message,source,created_at) VALUES (?,?,?,?,?,?)",
            (name, email, phone, message, p.source.strip(), _now()),
        )
        conn.commit()
        eid = cur.lastrowid
    return JSONResponse(status_code=201, content={
        "ok": True, "id": eid, "message": "Thanks! We've received your message and will reply shortly.",
    })


@app.post("/api/subscribe")
def subscribe(p: SubscribeIn):
    email = p.email.strip()
    if not EMAIL_RE.match(email):
        return JSONResponse(status_code=400, content={"ok": False, "errors": {"email": "Please enter a valid email."}})
    try:
        with get_db() as conn:
            conn.execute("INSERT INTO subscribers (email, created_at) VALUES (?, ?)", (email, _now()))
            conn.commit()
    except sqlite3.IntegrityError:
        pass
    return {"ok": True, "message": "You're subscribed — thank you!"}


@app.get("/api/consultations")
def list_consultations():
    with get_db() as conn:
        rows = conn.execute("SELECT * FROM consultations ORDER BY id DESC LIMIT 200").fetchall()
    return {"count": len(rows), "consultations": [dict(r) for r in rows]}


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5002, reload=True)
