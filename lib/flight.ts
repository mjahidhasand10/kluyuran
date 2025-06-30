export const getAirlineClass = (code: string): string => {
  const upperCode = code.toUpperCase() as keyof typeof classMap;

  const classMap = {
    F: "First Class",
    A: "First Class",

    J: "Business Class",
    C: "Business Class",
    D: "Business Class",
    I: "Business Class",
    Z: "Business Class",

    W: "Premium Economy",
    R: "Premium Economy",
    E: "Premium Economy",

    Y: "Economy Class",
    B: "Economy Class",
    H: "Economy Class",
    K: "Economy Class",
    L: "Economy Class",
    M: "Economy Class",
    N: "Economy Class",
    Q: "Economy Class",
    S: "Economy Class",
    T: "Economy Class",
    U: "Economy Class",
    V: "Economy Class",
    X: "Economy Class",
    G: "Economy Class",
    O: "Economy Class",
  };

  return classMap[upperCode];
};

export const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

export const getReturnDate = (): string => {
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 6);
  return returnDate.toISOString().split("T")[0];
};

export const getAirlineName = (
  logoUrl: string,
  airlineCode?: string
): string => {
  const airlineMap: { [key: string]: string } = {
    QR: "Qatar Airways",
    EK: "Emirates",
    BS: "US-Bangla Airlines",
    TG: "Thai Airways",
    SQ: "Singapore Airlines",
    BG: "Biman Bangladesh Airlines",
    AI: "Air India",
    "9W": "Jet Airways",
    UK: "Vistara",
    "6E": "IndiGo",
    SG: "SpiceJet",
    AA: "American Airlines",
    DL: "Delta Air Lines",
    UA: "United Airlines",
    BA: "British Airways",
    LH: "Lufthansa",
    AF: "Air France",
    KL: "KLM",
    TK: "Turkish Airlines",
  };

  const match = logoUrl.match(/\/([A-Z0-9]{2,3})\.svg$/);
  const codeFromUrl = match ? match[1] : "";

  const code = airlineCode || codeFromUrl;

  return airlineMap[code] || code || "Unknown Airline";
};

export const formatTime = (timeString: string): string => {
  if (!timeString) return "N/A";

  try {
    if (timeString.includes("T")) {
      const date = new Date(timeString);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }

    if (/^\d{2}:\d{2}$/.test(timeString)) {
      return timeString;
    }

    return timeString;
  } catch {
    return timeString;
  }
};

export const calculateDuration = (
  departure: string,
  arrival: string
): string => {
  if (!departure || !arrival) return "N/A";

  try {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diffMs = arr.getTime() - dep.getTime();

    if (diffMs <= 0) return "N/A";

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  } catch {
    return "N/A";
  }
};

export const extractPrice = (priceInfo: any): number => {
  if (!priceInfo) return 0;

  return (
    priceInfo.total_price ||
    priceInfo.totalPrice ||
    priceInfo.base_price ||
    priceInfo.basePrice ||
    priceInfo.price ||
    priceInfo.amount ||
    0
  );
};

export const extractCurrency = (
  priceInfo: any,
  saleCurrencyCode: string
): string => {
  return priceInfo?.currency || saleCurrencyCode || "USD";
};

export const formatDateForDisplay = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};
