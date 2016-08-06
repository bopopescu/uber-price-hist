import mysql.connector
from mysql.connector import errorcode

DB_NAME = 'datakind'

TABLES = {}

TABLES['employees'] = (
	"CREATE TABLE combined ("
	"row_id int(11),"
	"zip int(11),"
	"cdc_week int(11),"
	"year int(11),"
	"region varchar(11),"
	"week_of date,"
	"state_abbr varchar(10),"
	"participants int(11),"
	"users int(11),"
	"household int(11),"
	"ili int(11),"
	"no_symptoms int(11),"
	"fever int(11),"
	"diarrhea int(11),"
	"chills int(11),"
	"nausea int(11),"
	"cough int(11),"
	"sorethroat int(11),"
	"bodyache int(11),"
	"headache int(11),"
	"fatigue int(11),"
	"breath int(11),"
	"rash int(11),"
	"red_eyes int(11),"
	"joint_pain int(11),"
	"eye_pain int(11),"
	"dark_urine int(11),"
	"yellow_eyes int(11),"
	"running_nose int(11),"
	"athena_visits int(11),"
	"athena_vaccine_visits int(11),"
	"athena_ili_visits int(11),"
	"athena_cdc_ili_visits int(11),"
	"ilinet_ili int(11),"
	"ilinet_total int(11),"
	"cdclab_positive int(11),"
	"cdclab_total int(11),"
	"county int(11),"
	"PRIMARY KEY (row_id)"
        ") ENGINE=InnoDB")

cnx = mysql.connector.connect(user='root',database='datakind',password='datakind')
cursor = cnx.cursor()


for name, ddl in TABLES.iteritems():
    try:
        print("Creating table {}: ".format(name))
        cursor.execute(ddl)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
            print("already exists.")
        else:
            print(err.msg)
    else:
        print("OK")

cursor.close()
cnx.close()
