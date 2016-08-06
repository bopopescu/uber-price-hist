sql = {}

sql['SELECT.SUM.ILI'] = """
SELECT sum(ili) as ili
  FROM fny_ilinet_cdclab_athena
 WHERE 1=1
   and week_of between %s and %s
"""

sql['SELECT.SUM.ILI.WEEK'] = """
SELECT week_of,
	   sum(ili) as ili
  FROM fny_ilinet_cdclab_athena
 WHERE 1=1
   and week_of between %s and %s
   and (state_abbr = %s or '' = %s)
 group by week_of
"""

sql['SELECT.OPTIONS'] = """
SELECT min(week_of) as min_date,
       max(weeK_of) as max_date
  FROM fny_ilinet_cdclab_athena
"""

sql['SELECT.US.STATES'] = """
SELECT state_abbr,
	   sum(ili) as ili
  FROM fny_ilinet_cdclab_athena
 WHERE 1=1
   and (week_of between %s and %s)
 group by state_abbr
"""

sql['SELECT.ONE'] = """
SELECT 1
"""
