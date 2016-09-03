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
   and est_time between %s and %s
 limit 100
"""

sql['SELECT.HOURLY_ESTIMATE'] = """
select extract(hour from CONVERT_TZ(est_time,'UTC','US/Pacific')) as hour_of_day,
	   avg(estimate) as overall_avg,
	   avg(case when cast(CONVERT_TZ(est_time,'UTC','US/Pacific') as date) = curdate()
		   then estimate
           else null end)
	   as currdate_avg
  from estimates
 where route_sk = 1
   and product in ('uberPool', 'POOL')
   and dayofweek(CONVERT_TZ(est_time,'UTC','US/Pacific')) in (%s)
 group by hour_of_day;
"""

sql['SELECT.ROUTE_OPTIONS'] = """
select route_name,
       product,
       est.route_sk,
       min(est_time) as earliest,
       max(est_time) as latest
  from estimates est
  join routes rts
    on rts.route_sk = est.route_sk
 group by 1,2,3
"""


sql['SELECT.ONE'] = """
SELECT 1
"""
