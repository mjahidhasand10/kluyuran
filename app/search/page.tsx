"use client";
import {
  extractCurrency,
  extractPrice,
  formatDateForDisplay,
  formatTime,
  getAirlineClass,
  getAirlineName,
  getReturnDate,
  getTomorrowDate,
  promise,
} from "@/lib";
import { Button, Tag } from "antd";
import { format, parse } from "date-fns";
import {
  CalendarIcon,
  ChevronUp,
  MapPin,
  Plane,
  Search,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FlightSegment {
  airline_code?: string;
  bookingclasscode?: string;
  departuredate?: string;
  arrivaldate?: string;
  departure_airport?: string;
  arrival_airport?: string;
  departure_city?: string;
  arrival_city?: string;
  duration?: number;
  stops?: number;
}

interface ItineraryDetail {
  flight_data?: FlightSegment[]; // ✅ Add this line
  [key: string]: unknown;
}

interface PriceInfo {
  total_price?: number;
  base_price?: number;
  currency?: string;
  fare_type?: string;
  taxes?: number;
  [key: string]: unknown; // Allow for additional properties
}

interface FlightData {
  travel_type: string;
  resultid: string;
  salecurrencycode: string;
  air_logo: string;
  itin_details: ItineraryDetail[];
  variants: unknown[];
  variant_count: number;
  price_info: PriceInfo;
  [key: string]: unknown; // Allow for additional properties from API
}

interface FlightSearchResponse {
  message: string;
  status_code: number;
  data?: FlightData[];
  error?: string;
}

interface SearchPageProps {
  searchParams: {
    origin: string;
    destination: string;
    originName?: string;
    destinationName?: string;
    departureDate?: string;
    returnDate?: string;
    adults?: string;
    children?: string;
    infants?: string;
  };
}

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const fetchFlights = async (
  origin: string,
  destination: string,
  checkIn: string,
  checkOut: string | undefined,
  adults: number,
  children = 0,
  infant = 0
): Promise<FlightSearchResponse> => {
  console.log(origin, destination, checkIn);
  if (!origin || !destination || !checkIn) {
    throw new Error(
      "Missing required fields: origin, destination, or check-in date"
    );
  }

  if (adults < 1) {
    throw new Error("At least one adult is required");
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(checkIn) || (checkOut && !dateRegex.test(checkOut))) {
    throw new Error("Invalid date format. Use YYYY-MM-DD");
  }

  const payload = {
    origin: origin,
    destination: destination,
    departureDate: checkIn,
    ...(checkOut ? { returnDate: checkOut } : {}),
    passenger: {
      adult: adults,
      children,
      infant,
    },
  };

  console.log(payload);

  const res = await fetch("https://api.tbp.travel/flights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  console.log("🚀 ~ data:", data);

  return data;
};

export default function FlightSearch({ searchParams }: SearchPageProps) {
  const router = useRouter();
  const origin = searchParams.origin || "";
  const destination = searchParams.destination || "";
  const originName = searchParams.originName || "";
  const destinationName = searchParams.destinationName || "";
  const checkInRaw = searchParams.departureDate || getTomorrowDate();
  const checkOutRaw = searchParams.returnDate || getReturnDate();
  const adults = parseInt(searchParams.adults || "1", 10);
  const children = parseInt(searchParams.children || "0", 10);
  const infants = parseInt(searchParams.infants || "0", 10);

  const checkIn = format(
    parse(checkInRaw, "dd MMM yyyy", new Date()),
    "yyyy-MM-dd"
  );
  const checkOut = format(
    parse(checkOutRaw, "dd MMM yyyy", new Date()),
    "yyyy-MM-dd"
  );

  const [flights, setFlights] = useState<FlightData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    promise(() =>
      fetchFlights(
        origin,
        destination,
        checkIn,
        checkOut,
        adults,
        children,
        infants
      )
    ).then(([err, res]) => {
      if (err) setError(err);
      else setFlights(res?.data || []);
    });
  }, [origin, destination, checkIn, checkOut, adults, children, infants]);

  const hasFlights = flights.length > 0;

  // Get unique airlines for filter
  const uniqueAirlines = Array.from(
    new Set(
      flights.map((flight) =>
        getAirlineName(
          flight.air_logo,
          flight?.itin_details?.[0]?.flight_data?.[0]?.airline_code
        )
      )
    )
  );

  const handleBookNow = (flight: FlightData) => {
    // Combine flight data and original search parameters into one object
    const dataToPass = {
      flight,
      searchParams: {
        origin,
        destination,
        originName,
        destinationName,
        departureDate: checkInRaw, // Use raw dates for display if preferred
        returnDate: checkOutRaw,
        adults: adults.toString(),
        children: children.toString(),
        infants: infants.toString(),
      },
    };

    const dataString = JSON.stringify(dataToPass);
    const encodedData = encodeURIComponent(dataString);
    router.push(`/book?data=${encodedData}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <MapPin className="w-4 h-4 text-blue-600" />
              <input
                type="text"
                placeholder="From"
                value={origin}
                className="border-0 shadow-none text-sm bg-transparent outline-none flex-1 font-medium"
                readOnly
              />
            </div>

            <div className="flex items-center gap-2 flex-1 min-w-0">
              <MapPin className="w-4 h-4 text-blue-600" />
              <input
                type="text"
                placeholder="To"
                value={destination}
                className="border-0 shadow-none text-sm bg-transparent outline-none flex-1 font-medium"
                readOnly
              />
            </div>

            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">
                {formatDateForDisplay(checkIn)} -{" "}
                {formatDateForDisplay(checkOut)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">
                {adults} Traveler{adults > 1 ? "s" : ""}
              </span>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="trip"
                  className="text-blue-600"
                  defaultChecked
                />
                <span className="text-sm">Round-Trip</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="trip" className="text-blue-600" />
                <span className="text-sm">One-Way</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="trip" className="text-blue-600" />
                <span className="text-sm">Multi-City</span>
              </label>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                Economy
              </button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                Business Class
              </button>
              <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                First Class
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4">
                <div className="space-y-6">
                  {/* Filter By Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Filter By</h3>
                    <button className="text-blue-600 text-sm hover:underline">
                      Reset
                    </button>
                  </div>

                  {/* Route Info */}
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-blue-900 mb-1">
                      Current Search
                    </div>
                    <div className="text-xs text-blue-700">
                      <div>
                        {origin} → {destination}
                      </div>
                      <div className="mt-1">
                        Depart: {formatDateForDisplay(checkIn)}
                      </div>
                      <div>Return: {formatDateForDisplay(checkOut)}</div>
                    </div>
                  </div>

                  {/* Stops Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Stop</h4>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">Direct</span>
                        </div>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">1 Stop</span>
                        </div>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">2+ Stops</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Airlines Filter */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Airlines</h4>
                      <ChevronUp className="w-4 h-4" />
                    </div>
                    <div className="space-y-2">
                      {uniqueAirlines.length > 0 ? (
                        uniqueAirlines.slice(0, 6).map((airline) => (
                          <label
                            key={airline}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm">{airline}</span>
                            </div>
                          </label>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500">
                          Loading airlines...
                        </div>
                      )}
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Price Filter */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Price</h4>
                      <ChevronUp className="w-4 h-4" />
                    </div>
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="5000"
                          defaultValue="1000"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>$0</span>
                        <span>$5000</span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Duration Filter */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Duration</h4>
                      <ChevronUp className="w-4 h-4" />
                    </div>
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="2000"
                          defaultValue="800"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>8h</span>
                        <span>30h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {hasFlights
                  ? `${flights.length} of ${flights.length} Results`
                  : "Searching flights..."}
              </h2>
              <div className="flex items-center gap-4">
                <button className="border border-blue-600 text-blue-600 bg-blue-50 px-4 py-2 rounded text-sm hover:bg-blue-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Recommended
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Fastest
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Cheapest
                </button>
              </div>
            </div>

            {/* Search Info Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Plane className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-blue-900">
                    Searching flights from {origin} to {destination}
                  </div>
                  <div className="text-sm text-blue-700">
                    Departure: {formatDateForDisplay(checkIn)} • Return:{" "}
                    {formatDateForDisplay(checkOut)} • {adults} passenger
                    {adults > 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600 font-medium">
                  Error fetching flights:
                </p>
                <p className="text-red-600 text-sm mt-1">{error.message}</p>
                <div className="mt-3 text-sm text-red-600">
                  <p>Please check:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Your internet connection</li>
                    <li>The search parameters are valid</li>
                    <li>The API service is available</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Flight Results */}
            {hasFlights ? (
              <div className="space-y-4">
                {flights.map((flight, index) => {
                  const firstItinerary =
                    flight.itin_details?.[0]?.flight_data?.[0] || {};
                  console.log(firstItinerary);
                  const airlineName = getAirlineName(
                    flight.air_logo,
                    firstItinerary.airline_code
                  );
                  const departureTime = formatTime(
                    firstItinerary.departuredate || ""
                  );
                  const arrivalTime = formatTime(
                    firstItinerary.arrivaldate || ""
                  );
                  const duration = formatDuration(firstItinerary.duration || 0);
                  const currency = extractCurrency(
                    flight.price_info,
                    flight.salecurrencycode
                  );
                  const currencySymbol = currency === "BDT" ? "৳" : "$";

                  return (
                    <div
                      key={flight.resultid}
                      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            {/* Airline Logo */}
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                                <Image
                                  src={flight.air_logo || "/placeholder.svg"}
                                  alt={airlineName}
                                  width={32}
                                  height={32}
                                  className="object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                      "/placeholder.svg?height=32&width=32";
                                  }}
                                />
                              </div>
                              <div>
                                <div className="font-medium text-sm">
                                  {airlineName}
                                </div>
                                {index % 3 === 0 ? (
                                  <Tag color="green">Partially Refundable</Tag>
                                ) : (
                                  <Tag color="red">Non Refundable</Tag>
                                )}
                              </div>
                            </div>

                            {/* Flight Details */}
                            <div className="flex items-center gap-8 flex-1">
                              <div className="text-center">
                                <div className="font-semibold text-lg">
                                  {departureTime}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {firstItinerary.departure_airport ||
                                    firstItinerary.departure_city ||
                                    origin}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 flex-1">
                                <div className="text-xs text-gray-500">
                                  {duration}
                                </div>
                                <div className="flex-1 relative">
                                  <div className="h-px bg-gray-300"></div>
                                  <Plane className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                                <div className="text-xs text-gray-500">
                                  {(firstItinerary.stops || 0) === 0
                                    ? "Non Stop"
                                    : `${firstItinerary.stops} Stop`}
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="font-semibold text-lg">
                                  {arrivalTime}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {firstItinerary.arrival_airport ||
                                    firstItinerary.arrival_city ||
                                    destination}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Price and Book */}
                          <div className="text-right ml-6">
                            <div className="mb-2">
                              {index === 0 && <Tag color="blue">Cheapest</Tag>}
                              {index === 1 && (
                                <Tag color="orange">Exclusive</Tag>
                              )}
                              {index % 5 === 0 && index > 0 && (
                                <Tag color="green"> Best Value</Tag>
                              )}
                            </div>
                            <div className="text-2xl font-bold">
                              {currencySymbol}
                              {extractPrice(flight.price_info)}
                            </div>
                            <div className="text-sm text-gray-500 mb-3">
                              {getAirlineClass(
                                flight?.itin_details?.[0]?.flight_data?.[0]
                                  ?.bookingclasscode || ""
                              )}
                            </div>
                            <Button
                              type="primary"
                              onClick={() => handleBookNow(flight)}
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : !error ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-lg">Searching for flights...</p>
                  <p className="text-sm">This may take a few moments</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
