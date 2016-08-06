import requests
import datetime
import pymysql

ROUTE_SK = 1

url = 'https://api.uber.com/v1/estimates/price'

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

parameters = {
    'server_token': '_7DHtwN4NNNia-xbdwkZLATb5iULY3UOM9KFp8Yh',
    'start_latitude': '37.786340',
    'start_longitude': '-122.398250',
    'end_latitude': '37.422338',
    'end_longitude': '-122.152273',
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
	with connection.cursor() as cursor:
		cursor.execute(sql_insert, (timenow, product, distance, duration, est_cost, high_estimate, low_estimate, minimum, surge_multiplier, ROUTE_SK))
	connection.commit()

connection.close()

print "done!"
