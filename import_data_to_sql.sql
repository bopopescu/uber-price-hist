use datakind_skoll;

LOAD DATA LOCAL INFILE '/Users/zbodnar/learning/datakind/fny_ilinet_cdclab_athena.csv'
INTO TABLE fny_ilinet_cdclab_athena
FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;
