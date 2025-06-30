export const AIRPORT_LOCATIONS = [
  {
    name: "Hartsfield-Jackson Atlanta Intl. (ATL)",
    city: "Atlanta",
    code: "ATL",
  },
  { name: "Beijing Capital Intl. (PEK)", city: "Beijing", code: "PEK" },
  { name: "Changi Airport (SIN)", city: "Singapore", code: "SIN" },
  {
    name: "Dallas/Fort Worth Intl. (DFW)",
    city: "Dallas/Fort Worth",
    code: "DFW",
  },
  { name: "Denver Intl. (DEN)", city: "Denver", code: "DEN" },
  { name: "Dubai Intl. (DXB)", city: "Dubai", code: "DXB" },
  { name: "Frankfurt Airport (FRA)", city: "Frankfurt", code: "FRA" },
  { name: "Guangzhou Baiyun Intl. (CAN)", city: "Guangzhou", code: "CAN" },
  { name: "Hong Kong Intl. (HKG)", city: "Hong Kong", code: "HKG" },
  { name: "Istanbul Airport (IST)", city: "Istanbul", code: "IST" },
  { name: "John F. Kennedy Intl. (JFK)", city: "New York", code: "JFK" },
  { name: "London Heathrow Airport (LHR)", city: "London", code: "LHR" },
  { name: "Los Angeles Intl. (LAX)", city: "Los Angeles", code: "LAX" },
  { name: "Madrid Barajas Airport (MAD)", city: "Madrid", code: "MAD" },
  { name: "Narita Intl. Airport (NRT)", city: "Tokyo", code: "NRT" },
  { name: "O'Hare Intl. Airport (ORD)", city: "Chicago", code: "ORD" },
  { name: "Paris Charles de Gaulle Airport (CDG)", city: "Paris", code: "CDG" },
  { name: "Qatar Hamad Intl. (DOH)", city: "Doha", code: "DOH" },
  { name: "Shanghai Pudong Intl. (PVG)", city: "Shanghai", code: "PVG" },
  { name: "Sydney Airport (SYD)", city: "Sydney", code: "SYD" },
  { name: "Tokyo Haneda Airport (HND)", city: "Tokyo", code: "HND" },

  // Southeast Asia & South Asia Focus (with more specific regional airports)
  { name: "Hazrat Shahjalal Intl. (DAC)", city: "Dhaka", code: "DAC" }, // Bangladesh (Current location)
  { name: "Shah Amanat Intl. (CGP)", city: "Chattogram", code: "CGP" }, // Bangladesh
  { name: "Osmani Intl. (ZYL)", city: "Sylhet", code: "ZYL" }, // Bangladesh
  { name: "Soekarno-Hatta Intl. (CGK)", city: "Jakarta", code: "CGK" }, // Indonesia
  { name: "Ngurah Rai Intl. (DPS)", city: "Denpasar, Bali", code: "DPS" }, // Indonesia (Bali)
  { name: "Kuala Lumpur Intl. (KUL)", city: "Kuala Lumpur", code: "KUL" }, // Malaysia
  { name: "Ninoy Aquino Intl. (MNL)", city: "Manila", code: "MNL" }, // Philippines
  { name: "Mactan-Cebu Intl. (CEB)", city: "Cebu", code: "CEB" }, // Philippines
  { name: "Suvarnabhumi Airport (BKK)", city: "Bangkok", code: "BKK" }, // Thailand
  { name: "Don Mueang Intl. (DMK)", city: "Bangkok", code: "DMK" }, // Thailand (Low-cost)
  { name: "Phuket Intl. (HKT)", city: "Phuket", code: "HKT" }, // Thailand
  { name: "Tan Son Nhat Intl. (SGN)", city: "Ho Chi Minh City", code: "SGN" }, // Vietnam
  { name: "Noi Bai Intl. (HAN)", city: "Hanoi", code: "HAN" }, // Vietnam
  { name: "Bandaranaike Intl. (CMB)", city: "Colombo", code: "CMB" }, // Sri Lanka
  { name: "Tribhuvan Intl. (KTM)", city: "Kathmandu", code: "KTM" }, // Nepal
  { name: "Velana Intl. (MLE)", city: "Malé", code: "MLE" }, // Maldives
  { name: "Indira Gandhi Intl. (DEL)", city: "New Delhi", code: "DEL" }, // India
  {
    name: "Chhatrapati Shivaji Maharaj Intl. (BOM)",
    city: "Mumbai",
    code: "BOM",
  }, // India
  { name: "Kempegowda Intl. (BLR)", city: "Bengaluru", code: "BLR" }, // India
  { name: "Rajiv Gandhi Intl. (HYD)", city: "Hyderabad", code: "HYD" }, // India
  { name: "Chennai Intl. (MAA)", city: "Chennai", code: "MAA" }, // India
  { name: "Phnom Penh Intl. (PNH)", city: "Phnom Penh", code: "PNH" }, // Cambodia
  { name: "Siem Reap Intl. (REP)", city: "Siem Reap", code: "REP" }, // Cambodia
  { name: "Wattay Intl. (VTE)", city: "Vientiane", code: "VTE" }, // Laos
  { name: "Yangon Intl. (RGN)", city: "Yangon", code: "RGN" }, // Myanmar

  // Other Relevant International
  { name: "Amsterdam Airport Schiphol (AMS)", city: "Amsterdam", code: "AMS" },
  { name: "Auckland Airport (AKL)", city: "Auckland", code: "AKL" },
  { name: "Brussels Airport (BRU)", city: "Brussels", code: "BRU" },
  { name: "Cairo Intl. (CAI)", city: "Cairo", code: "CAI" },
  { name: "Cape Town Intl. (CPT)", city: "Cape Town", code: "CPT" },
  { name: "Dublin Airport (DUB)", city: "Dublin", code: "DUB" },
  { name: "Lisbon Airport (LIS)", city: "Lisbon", code: "LIS" },
  { name: "Melbourne Airport (MEL)", city: "Melbourne", code: "MEL" },
  { name: "Mexico City Intl. (MEX)", city: "Mexico City", code: "MEX" },
  { name: "Munich Airport (MUC)", city: "Munich", code: "MUC" },
  { name: "Oslo Airport, Gardermoen (OSL)", city: "Oslo", code: "OSL" },
  { name: "Punta Cana Intl. (PUJ)", city: "Punta Cana", code: "PUJ" },
  { name: "Rio de Janeiro-Galeão (GIG)", city: "Rio de Janeiro", code: "GIG" },
  { name: "Rome Fiumicino Airport (FCO)", city: "Rome", code: "FCO" },
  { name: "São Paulo-Guarulhos Intl. (GRU)", city: "São Paulo", code: "GRU" },
  { name: "Seattle-Tacoma Intl. (SEA)", city: "Seattle", code: "SEA" },
  { name: "Stockholm Arlanda Airport (ARN)", city: "Stockholm", code: "ARN" },
  { name: "Toronto Pearson Intl. (YYZ)", city: "Toronto", code: "YYZ" },
  { name: "Vancouver Intl. (YVR)", city: "Vancouver", code: "YVR" },
  { name: "Vienna Intl. (VIE)", city: "Vienna", code: "VIE" },
  { name: "Warsaw Chopin Airport (WAW)", city: "Warsaw", code: "WAW" },
  { name: "Zurich Airport (ZRH)", city: "Zurich", code: "ZRH" },
];
