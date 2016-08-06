import requests
import datetime
import pymysql

url = 'https://api.uber.com/v1/estimates/price'
uber_server_token = '_7DHtwN4NNNia-xbdwkZLATb5iULY3UOM9KFp8Yh'

connection = pymysql.connect(host='localhost',
                             user='root',
                             db='uber',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

sql_insert = ('INSERT INTO estimates (est_time,' 
				'product,'
				'distance,'
				'duration,'
				'estimate,'
				'high_estimate,'
				'low_estimate,'
				'minimum,'
				'surge_multiplier,'
				'route_sk)'
				'VALUES'
				'(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)')

routes = []
rcur = connection.cursor()
sql = "SELECT * FROM routes"
rcur.execute(sql)
routes = rcur.fetchall()

for route in routes:
	parameters = {
	    'server_token': uber_server_token,
	    'start_latitude': route['start_latitude'],
	    'start_longitude': route['start_longitude'],
	    'end_latitude': route['end_latitude'],
	    'end_longitude': route['end_longitude'],
	    'seat_count' : 1
	}

	response = requests.get(url, params=parameters)

	timenow = str(datetime.datetime.now())
	data = response.json()

	for estimate in data['prices']:
		est_cost = -1.1
		estr = estimate['estimate']
		if (estr.find('$') != -1):
			if (estr.find("-") == -1 ):
				est_cost = float(estr[1:len(estr)])
			else:
				esplit = estr.split('-')
				low = float(esplit[0][1:len(esplit[0])])
				high = float(esplit[1])
				est_cost = (low+high)/2 
		product = estimate['display_name']
		distance = estimate['distance']
		duration = estimate['duration']
		high_estimate = estimate['high_estimate']
		low_estimate = estimate['low_estimate']
		minimum = estimate['minimum']
		surge_multiplier = estimate['surge_multiplier']
		route_sk = route['route_sk']
		with connection.cursor() as cursor:
			cursor.execute(sql_insert, (timenow, product, distance, duration, est_cost, high_estimate, low_estimate, minimum, surge_multiplier, route_sk))
		connection.commit()

connection.close()

print "done!"
