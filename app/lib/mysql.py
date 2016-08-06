import pymysql as mysql


class MySQLClass():
    cur = None
    connection = None

    def __init__(self, config):
        try:
            self.connection = mysql.connect(host=config['host'],
                                            user=config['user'],
                                            password=config['password'],
                                            db=config['db'],
                                            port=config['port'],
                                            charset='utf8mb4',
                                            cursorclass=mysql.cursors.DictCursor)
            self.cur = self.connection.cursor()
        except:
            print "Unable to connect to MySQL DB."

    def __del__(self):
        self.connection.close()
        self.cur.close()

    def connect(self):
        self.cur = self.connection.cursor()

    def executeQuery(self, query, params=None):
        try:
            self.cur.execute(query, params)
            self.connection.commit()
        except:
            print "executeQuery error"

    def getAllRows(self, query, params=None):
        try:
            self.cur.execute(query, params)
            self.connection.commit()
            result = self.cur.fetchall()
            result = result if result != None else []
            return result
        except:
            print "getAllRows error"

    def getRow(self, query, params=None):
        try:
            self.cur.execute(query, params)
            self.connection.commit()
            result = self.cur.fetchone()
            result = result if result != None else []
            return result
        except:
            log.debug("getRow error")

    def bindParameters(self, query, params=None):
        pass

    def rows_to_dict_list(self, cursor):
        columns = [i[0] for i in cursor.description]
        return [dict(zip(columns, row)) for row in cursor]
