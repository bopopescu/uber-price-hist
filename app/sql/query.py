sql = {}

sql['SELECT.SAMPLE_QUERY'] = """
SELECT sum(ili) as ili
  FROM fny_ilinet_cdclab_athena
 WHERE 1=1
   and week_of between %s and %s
"""

sql['SELECT.SAMPLE_DATA'] = """
select est_time,
       estimate
  from estimates
 where 1=1
   and product in ('uberPool', 'POOL')
   and route_sk = 1
 limit 100
"""

sql['SELECT.ONE'] = """
SELECT 1
"""
