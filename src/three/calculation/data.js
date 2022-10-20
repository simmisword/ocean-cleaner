const microTable = {
  1950: 0,
  1951: 2500,
  1952: 5000,
  1953: 7500,
  1954: 10000,
  1955: 12500,
  1956: 15000,
  1957: 17500,
  1958: 20000,
  1959: 22500,
  1960: 25000,
  1961: 27500,
  1962: 30000,
  1963: 32500,
  1964: 35000,
  1965: 37500,
  1966: 40000,
  1967: 42500,
  1968: 45000,
  1969: 47500,
  1970: 50000,
  1971: 52500,
  1972: 55000,
  1973: 57500,
  1974: 60000,
  1975: 62500,
  1976: 65000,
  1977: 67500,
  1978: 70000,
  1979: 72500,
  1980: 75000,
  1981: 77500,
  1982: 80000,
  1983: 82500,
  1984: 85000,
  1985: 87500,
  1986: 90000,
  1987: 92500,
  1988: 95000,
  1989: 97500,
  1990: 100000,
  1991: 102500,
  1992: 105000,
  1993: 107500,
  1994: 110000,
  1995: 112500,
  1996: 115000,
  1997: 117500,
  1998: 120000,
  1999: 122500,
  2000: 125000,
  2001: 146875,
  2002: 168750,
  2003: 190625,
  2004: 212500,
  2005: 234375,
  2006: 256250,
  2007: 278125,
  2008: 300000,
  2009: 321875,
  2010: 343750,
  2011: 368750,
  2012: 393750,
  2013: 418750,
  2014: 443750,
  2015: 468750,
  2016: 493750,
  2017: 518750,
  2018: 543750,
  2019: 568750,
  2020: 593750,
  2021: { growth: 640625, level: 634375, stop: 628125 },
  2022: { growth: 687500, level: 675000, stop: 662500 },
  2023: { growth: 734375, level: 715625, stop: 696875 },
  2024: { growth: 781250, level: 756250, stop: 731250 },
  2025: { growth: 828125, level: 796875, stop: 765625 },
  2026: { growth: 875000, level: 837500, stop: 800000 },
  2027: { growth: 921875, level: 878125, stop: 834375 },
  2028: { growth: 968750, level: 918750, stop: 868750 },
  2029: { growth: 1015625, level: 959375, stop: 903125 },
  2030: { growth: 1062500, level: 1000000, stop: 937500 },
  2031: { growth: 1125000, level: 1056250, stop: 971875 },
  2032: { growth: 1187500, level: 1112500, stop: 1006250 },
  2033: { growth: 1250000, level: 1168750, stop: 1040625 },
  2034: { growth: 1312500, level: 1225000, stop: 1075000 },
  2035: { growth: 1375000, level: 1281250, stop: 1109375 },
  2036: { growth: 1437500, level: 1337500, stop: 1143750 },
  2037: { growth: 1500000, level: 1393750, stop: 1178125 },
  2038: { growth: 1562500, level: 1450000, stop: 1212500 },
  2039: { growth: 1625000, level: 1506250, stop: 1246875 },
  2040: { growth: 1687500, level: 1562500, stop: 1281250 },
  2041: { growth: 1784375, level: 1634375, stop: 1303125 },
  2042: { growth: 1881250, level: 1706250, stop: 1325000 },
  2043: { growth: 1978125, level: 1778125, stop: 1346875 },
  2044: { growth: 2075000, level: 1850000, stop: 1368750 },
  2045: { growth: 2171875, level: 1921875, stop: 1390625 },
  2046: { growth: 2268750, level: 1993750, stop: 1412500 },
  2047: { growth: 2365625, level: 2065625, stop: 1434375 },
  2048: { growth: 2462500, level: 2137500, stop: 1456250 },
  2049: { growth: 2559375, level: 2209375, stop: 1478125 },
  2050: { growth: 2656250, level: 2281250, stop: 1500000 },
};

const macroTable = {
  1950: 0,
  1951: 8750,
  1952: 17500,
  1953: 26250,
  1954: 35000,
  1955: 43750,
  1956: 52500,
  1957: 61250,
  1958: 70000,
  1959: 78750,
  1960: 87500,
  1961: 96250,
  1962: 105000,
  1963: 113750,
  1964: 122500,
  1965: 131250,
  1966: 140000,
  1967: 148750,
  1968: 157500,
  1969: 166250,
  1970: 175000,
  1971: 183750,
  1972: 192500,
  1973: 201250,
  1974: 210000,
  1975: 218750,
  1976: 227500,
  1977: 236250,
  1978: 245000,
  1979: 253750,
  1980: 262500,
  1981: 271250,
  1982: 280000,
  1983: 288750,
  1984: 297500,
  1985: 306250,
  1986: 315000,
  1987: 323750,
  1988: 332500,
  1989: 341250,
  1990: 350000,
  1991: 358750,
  1992: 367500,
  1993: 376250,
  1994: 385000,
  1995: 393750,
  1996: 402500,
  1997: 411250,
  1998: 420000,
  1999: 428750,
  2000: 437500,
  2001: 465625,
  2002: 493750,
  2003: 521875,
  2004: 550000,
  2005: 578125,
  2006: 606250,
  2007: 634375,
  2008: 662500,
  2009: 690625,
  2010: 718750,
  2011: 762500,
  2012: 806250,
  2013: 850000,
  2014: 893750,
  2015: 937500,
  2016: 981250,
  2017: 1025000,
  2018: 1068750,
  2019: 1112500,
  2020: 1156250,
  2021: { growth: 1221875, level: 1209365, stop: 1141562 },
  2022: { growth: 1287500, level: 1262480, stop: 1126875 },
  2023: { growth: 1353125, level: 1315595, stop: 1112187 },
  2024: { growth: 1418750, level: 1368710, stop: 1097500 },
  2025: { growth: 1484375, level: 1421825, stop: 1082812 },
  2026: { growth: 1550000, level: 1474940, stop: 1068125 },
  2027: { growth: 1615625, level: 1528055, stop: 1053437 },
  2028: { growth: 1681250, level: 1581170, stop: 1038750 },
  2029: { growth: 1746875, level: 1634285, stop: 1024062 },
  2030: { growth: 1812500, level: 1687400, stop: 1009375 },
  2031: { growth: 1900000, level: 1731160, stop: 1002187 },
  2032: { growth: 1987500, level: 1774920, stop: 995000 },
  2033: { growth: 2075000, level: 1818680, stop: 987812 },
  2034: { growth: 2162500, level: 1862440, stop: 980625 },
  2035: { growth: 2250000, level: 1906200, stop: 973437 },
  2036: { growth: 2337500, level: 1949960, stop: 966250 },
  2037: { growth: 2425000, level: 1993720, stop: 959062 },
  2038: { growth: 2512500, level: 2037480, stop: 951875 },
  2039: { growth: 2600000, level: 2081240, stop: 944687 },
  2040: { growth: 2687500, level: 2125000, stop: 937500 },
  2041: { growth: 2818750, level: 2262500, stop: 925000 },
  2042: { growth: 2950000, level: 2400000, stop: 912500 },
  2043: { growth: 3081250, level: 2537500, stop: 900000 },
  2044: { growth: 3212500, level: 2675000, stop: 887500 },
  2045: { growth: 3343750, level: 2812500, stop: 875000 },
  2046: { growth: 3475000, level: 2950000, stop: 862500 },
  2047: { growth: 3606250, level: 3087500, stop: 850000 },
  2048: { growth: 3737500, level: 3225000, stop: 837500 },
  2049: { growth: 3868750, level: 3362500, stop: 825000 },
  2050: { growth: 4000000, level: 3500000, stop: 812500 },
};

export { microTable, macroTable };