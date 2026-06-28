import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
}


def _resp(status, body):
    return {'statusCode': status, 'headers': {**CORS, 'Content-Type': 'application/json'},
            'isBase64Encoded': False, 'body': json.dumps(body, ensure_ascii=False, default=str)}


def handler(event: dict, context) -> dict:
    '''Авторизация пользователей админ-панели через базу данных'''
    method = event.get('httpMethod', 'POST')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'isBase64Encoded': False, 'body': ''}
    if method != 'POST':
        return _resp(405, {'error': 'Method not allowed'})

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        body = {}

    email = (body.get('email') or '').strip().lower()
    password = body.get('password') or ''
    if not email or not password:
        return _resp(400, {'error': 'Email и пароль обязательны'})

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                'SELECT id, name, email, role, status, password FROM users WHERE LOWER(email) = %s',
                [email],
            )
            user = cur.fetchone()
        if not user or user['password'] != password:
            return _resp(401, {'error': 'Неверный логин или пароль'})
        if user['status'] == 'blocked':
            return _resp(403, {'error': 'Учётная запись заблокирована'})
        del user['password']
        return _resp(200, {'user': user, 'token': f"tk-{user['id']}-{user['role']}"})
    finally:
        conn.close()
