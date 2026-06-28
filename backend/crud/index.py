import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

ENTITIES = {
    'orders': ['number', 'client', 'device', 'problem', 'master', 'status', 'price', 'prepayment', 'priority', 'diagnosis', 'created_at', 'deadline'],
    'clients': ['name', 'phone', 'email', 'address', 'type', 'orders_count', 'total_spent', 'discount', 'notes', 'created_at'],
    'masters': ['name', 'specialization', 'phone', 'email', 'active_orders', 'completed_orders', 'rating', 'status', 'experience_years', 'salary', 'hired_at'],
    'devices': ['type', 'brand', 'model', 'serial', 'client', 'status', 'received_at', 'condition', 'accessories'],
    'services': ['name', 'category', 'price', 'duration', 'popular', 'description', 'warranty_days'],
    'parts': ['name', 'category', 'sku', 'price', 'cost', 'stock', 'min_stock', 'supplier', 'location'],
    'reports': ['title', 'period', 'revenue', 'expenses', 'profit', 'orders', 'avg_check', 'type', 'created_at'],
    'equipment': ['name', 'inventory', 'location', 'condition', 'assigned_to', 'purchase_date', 'price', 'last_service'],
    'users': ['name', 'email', 'password', 'role', 'status', 'phone', 'position', 'last_login'],
}

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, X-User-Id',
    'Access-Control-Max-Age': '86400',
}


def _conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _resp(status, body):
    return {'statusCode': status, 'headers': {**CORS, 'Content-Type': 'application/json'},
            'isBase64Encoded': False, 'body': json.dumps(body, ensure_ascii=False, default=str)}


def handler(event: dict, context) -> dict:
    '''CRUD API для всех сущностей админ-панели сервиса ремонта техники'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'isBase64Encoded': False, 'body': ''}

    params = event.get('queryStringParameters') or {}
    entity = params.get('entity', '')
    if entity not in ENTITIES:
        return _resp(400, {'error': 'Unknown entity'})

    cols = ENTITIES[entity]
    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except Exception:
            body = {}

    conn = _conn()
    try:
        if method == 'GET':
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(f'SELECT * FROM {entity} ORDER BY id DESC')
                rows = cur.fetchall()
            return _resp(200, {'items': rows})

        if method == 'POST':
            fields = [c for c in cols if c in body]
            if not fields:
                return _resp(400, {'error': 'No fields'})
            placeholders = ', '.join(['%s'] * len(fields))
            values = [body[f] for f in fields]
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    f'INSERT INTO {entity} ({", ".join(fields)}) VALUES ({placeholders}) RETURNING *',
                    values,
                )
                row = cur.fetchone()
            conn.commit()
            return _resp(201, row)

        if method == 'PUT':
            item_id = body.get('id') or params.get('id')
            if not item_id:
                return _resp(400, {'error': 'id required'})
            fields = [c for c in cols if c in body]
            if not fields:
                return _resp(400, {'error': 'No fields'})
            sets = ', '.join([f'{f} = %s' for f in fields])
            values = [body[f] for f in fields] + [int(item_id)]
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(f'UPDATE {entity} SET {sets} WHERE id = %s RETURNING *', values)
                row = cur.fetchone()
            conn.commit()
            if not row:
                return _resp(404, {'error': 'Not found'})
            return _resp(200, row)

        if method == 'DELETE':
            item_id = params.get('id') or body.get('id')
            if not item_id:
                return _resp(400, {'error': 'id required'})
            with conn.cursor() as cur:
                cur.execute(f'DELETE FROM {entity} WHERE id = %s', [int(item_id)])
            conn.commit()
            return _resp(200, {'success': True})

        return _resp(405, {'error': 'Method not allowed'})
    finally:
        conn.close()
