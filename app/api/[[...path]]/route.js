import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || 'samruddhi_polyplast';

let cachedClient = null;
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }
  return cachedClient.db(dbName);
}

function json(data, init = {}) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      ...(init.headers || {}),
    },
  });
}

export async function OPTIONS() {
  return json({ ok: true });
}

export async function GET(request, { params }) {
  const resolved = await params;
  const path = (resolved?.path || []).join('/');
  try {
    if (path === '' || path === 'health') {
      return json({ status: 'ok', service: 'samruddhi-polyplast', time: new Date().toISOString() });
    }
    if (path === 'inquiries') {
      const db = await getDb();
      const docs = await db.collection('inquiries').find({}).sort({ createdAt: -1 }).limit(100).toArray();
      return json({ inquiries: docs });
    }
    return json({ error: 'Not found', path }, { status: 404 });
  } catch (e) {
    return json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const resolved = await params;
  const path = (resolved?.path || []).join('/');
  try {
    const body = await request.json().catch(() => ({}));
    if (path === 'inquiries') {
      const doc = {
        id: uuidv4(),
        fullName: body.fullName || '',
        company: body.company || '',
        country: body.country || '',
        phone: body.phone || '',
        email: body.email || '',
        product: body.product || '',
        message: body.message || '',
        createdAt: new Date().toISOString(),
      };
      const db = await getDb();
      await db.collection('inquiries').insertOne(doc);
      return json({ ok: true, id: doc.id });
    }
    if (path === 'newsletter') {
      const doc = { id: uuidv4(), email: body.email || '', createdAt: new Date().toISOString() };
      const db = await getDb();
      await db.collection('newsletter').insertOne(doc);
      return json({ ok: true, id: doc.id });
    }
    return json({ error: 'Not found', path }, { status: 404 });
  } catch (e) {
    return json({ error: e.message }, { status: 500 });
  }
}
