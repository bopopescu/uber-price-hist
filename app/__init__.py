from flask import Flask, render_template
from flask import g, redirect, url_for, request, session, json, jsonify, request

from lib.mysql import MySQLClass
import lib.req_handler as jsoner
from conf.uber import config
import lib.req_handler as Req
from sql.query import sql
import simplejson
from decimal import Decimal

app = Flask(__name__,
			static_folder='html',
			static_url_path='',
			template_folder="html/templates")

@app.route('/', methods=['GET'])
@app.route('/params', methods=['GET'])
@app.route('/params/<string:start_date>', methods=['GET'])
def root(start_date = None):
	print start_date
	page = render_template('header.html')
	page += render_template('body.html')
	page += render_template('footer.html')
	return page


# ***** API ******
@app.route('/ili', methods=['GET'])
def ili():
	start_date = Req.getParameter('start_date')
	end_date = Req.getParameter('end_date')
	Db = MySQLClass(config['mysql'])
	rows = Db.getAllRows(sql['SELECT.SUM.ILI'],(start_date,end_date))
	return str(rows[0]['ili'])
	#return Req.json(rows)

@app.route('/ili_weekly', methods=['GET'])
def ili_weekly():
	start_date = Req.getParameter('start_date')
	end_date = Req.getParameter('end_date')
	state = Req.getParameter('state')
	Db = MySQLClass(config['mysql'])
	print(state)
	rows = Db.getAllRows(sql['SELECT.SUM.ILI.WEEK'],(start_date,end_date, state, state))
	result = {}
	result['data'] = rows
	result['success'] = 'success'
	print(result)
	return str(json.dumps(result))
	#return Req.json(rows)

@app.route('/ili_by_state', methods=['GET'])
def ili_by_state():
	start_date = Req.getParameter('start_date')
	end_date = Req.getParameter('end_date')
	Db = MySQLClass(config['mysql'])
	rows = Db.getAllRows(sql['SELECT.US.STATES'],(start_date,end_date))
	result = {}
	result['data'] = rows
	result['success'] = 'success'
	print(result)
	return str(json.dumps(result))

@app.route('/options', methods=['GET'])
def options():
	Db = MySQLClass(config['mysql'])
	rows = Db.getAllRows(sql['SELECT.OPTIONS'])
	result = {}
	result['data'] = rows
	result['success'] = 'success'
	print(result)
	return str(json.dumps(result))

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')
	#app.run(debug=True)
