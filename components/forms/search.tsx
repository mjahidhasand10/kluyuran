"use client";
import { useState } from "react";
import { MapPin, Calendar, Users, Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useClickOutside } from "@mantine/hooks";
import { AIRPORT_LOCATIONS } from "@/lib";

// Types
interface Airport {
  name: string;
  city: string;
  code: string;
}

interface SearchState {
  origin: Airport;
  destination: Airport;
  departure: Date;
  return: Date;
  passenger: {
    adults: number;
    children: number;
    infants: number;
  };
}

export const Search = () => {
  const router = useRouter();

  const [search, setSearch] = useState<SearchState>({
    origin: {
      name: "Hazrat Shahjalal International Airport",
      city: "Dhaka",
      code: "DAC",
    },
    destination: {
      name: "Dubai International Airport",
      city: "Dubai",
      code: "DXB",
    },
    departure: new Date(),
    return: new Date(),
    passenger: {
      adults: 1,
      children: 0,
      infants: 0,
    },
  });

  const [dropdown, setDropdown] = useState({
    origin: false,
    destination: false,
    departure: false,
    return: false,
    passenger: false,
  });

  // Refs and disclosures
  const originRef = useClickOutside(() =>
    setDropdown((d) => ({ ...d, origin: false }))
  );
  const destinationRef = useClickOutside(() =>
    setDropdown((d) => ({ ...d, destination: false }))
  );
  const departureRef = useClickOutside(() =>
    setDropdown((d) => ({ ...d, departure: false }))
  );
  const returnRef = useClickOutside(() =>
    setDropdown((d) => ({ ...d, return: false }))
  );
  const passengerRef = useClickOutside(() =>
    setDropdown((d) => ({ ...d, passenger: false }))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams({
      origin: search.origin.code,
      destination: search.destination.code,
      originName: search.origin.name,
      destinationName: search.destination.name,
      departureDate: format(search.departure, "dd MMM yyyy"),
      returnDate: format(search.return, "dd MMM yyyy"),
      adults: String(search.passenger.adults),
      children: String(search.passenger.children),
      infants: String(search.passenger.infants),
    });

    router.push(`/search?${query.toString()}`);
  };

  const updateGuest = (
    type: keyof SearchState["passenger"],
    amount: number
  ) => {
    setSearch((prev) => ({
      ...prev,
      passenger: {
        ...prev.passenger,
        [type]: Math.max(0, prev.passenger[type] + amount),
      },
    }));
  };

  const updateDate = (key: "departure" | "return", date: Date) => {
    setSearch((prev) => ({
      ...prev,
      [key]: date,
    }));
  };

  const updateAirport = (key: "origin" | "destination", airport: Airport) => {
    setSearch((prev) => ({
      ...prev,
      [key]: airport,
    }));
    setDropdown((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
      <form onSubmit={handleSubmit}>
        {/* Origin */}
        <div className="mb-4" ref={originRef}>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Your location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button
              type="button"
              onClick={() => setDropdown((d) => ({ ...d, origin: !d.origin }))}
              className="w-full text-left pl-10 pr-4 h-12 border border-gray-200 rounded-md bg-white hover:bg-gray-50"
            >
              {search.origin.name}
            </button>
            {dropdown.origin && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-y-auto">
                {AIRPORT_LOCATIONS.map((airport) => (
                  <button
                    key={airport.code}
                    type="button"
                    onClick={() => updateAirport("origin", airport)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {airport.name} ({airport.city})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Destination, Departure, Return, Passengers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Destination */}
          <div ref={destinationRef}>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="button"
                onClick={() =>
                  setDropdown((d) => ({ ...d, destination: !d.destination }))
                }
                className="w-full text-left pl-10 pr-4 h-12 border border-gray-200 rounded-md bg-white hover:bg-gray-50"
              >
                {search.destination.name}
              </button>
              {dropdown.destination && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-y-auto">
                  {AIRPORT_LOCATIONS.map((airport) => (
                    <button
                      key={airport.code}
                      type="button"
                      onClick={() => updateAirport("destination", airport)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {airport.name} ({airport.city})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Departure Date */}
          <div ref={departureRef}>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Departure
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                readOnly
                value={format(search.departure, "dd MMM yyyy")}
                onClick={() =>
                  setDropdown((d) => ({
                    ...d,
                    departure: !d.departure,
                    return: false,
                  }))
                }
                className="w-full pl-10 pr-4 h-12 border border-gray-200 rounded-md bg-white hover:bg-gray-50 cursor-pointer"
              />
              {dropdown.departure && (
                <div className="absolute z-20 mt-2">
                  <DateRange
                    onChange={(ranges) =>
                      updateDate("departure", ranges.selection.startDate!)
                    }
                    moveRangeOnFirstSelection={false}
                    ranges={[
                      {
                        startDate: search.departure,
                        endDate: search.departure,
                        key: "selection",
                      },
                    ]}
                    rangeColors={["#ef4444"]}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Return Date */}
          <div ref={returnRef}>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Return
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                readOnly
                value={format(search.return, "dd MMM yyyy")}
                onClick={() =>
                  setDropdown((d) => ({
                    ...d,
                    return: !d.return,
                    departure: false,
                  }))
                }
                className="w-full pl-10 pr-4 h-12 border border-gray-200 rounded-md bg-white hover:bg-gray-50 cursor-pointer"
              />
              {dropdown.return && (
                <div className="absolute z-20 mt-2">
                  <DateRange
                    onChange={(ranges) =>
                      updateDate("return", ranges.selection.endDate!)
                    }
                    moveRangeOnFirstSelection={false}
                    ranges={[
                      {
                        startDate: search.return,
                        endDate: search.return,
                        key: "selection",
                      },
                    ]}
                    rangeColors={["#ef4444"]}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Passengers */}
          <div ref={passengerRef}>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Passengers
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="button"
                onClick={() =>
                  setDropdown((d) => ({ ...d, passenger: !d.passenger }))
                }
                className="w-full pl-10 pr-4 h-12 border border-gray-200 rounded-md bg-white hover:bg-gray-50 text-left"
              >
                {`${search.passenger.adults} Adults, ${search.passenger.children} Children, ${search.passenger.infants} Infants`}
              </button>
              {dropdown.passenger && (
                <div className="absolute top-full mt-1 w-full bg-white border rounded shadow-lg z-10 p-4 space-y-2">
                  {(["adults", "children", "infants"] as const).map((type) => (
                    <div
                      key={type}
                      className="flex items-center justify-between"
                    >
                      <span className="capitalize">{type}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateGuest(type, -1)}
                          className="px-2 py-1 border rounded"
                        >
                          -
                        </button>
                        <span>{search.passenger[type]}</span>
                        <button
                          type="button"
                          onClick={() => updateGuest(type, 1)}
                          className="px-2 py-1 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 h-12 text-lg rounded-md font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <SearchIcon className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};
