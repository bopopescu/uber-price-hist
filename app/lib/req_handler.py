from flask import jsonify, request
from datetime import datetime
from urllib import unquote
import simplejson
from decimal import Decimal


def json(rows, total=None):
    if type(rows) in ( dict, ):
        count = 1
    else:
        count = 0 if rows is None else len(rows)

    res = jsonify(count=count,
                  total=total,
                  result="success",
                  date=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                  data=rows)
    res.status_code = 200
    return res

def getParameter(key):
    if request.form.get(key) is None:
        val = request.args.get(key) or ''
    else:
        val = request.form.get(key) or ''

    return unquote(val)
