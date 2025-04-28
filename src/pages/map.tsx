import { useEffect, useState } from 'react';
import { scoreLocation } from '../lib/scoring';

interface City {
  city_id: string;
  name: string;
  avg_rent_1br: number;
  transit_score: number;
  walk_score: number;
  green_space_score: number;
  future_growth_index: number;
}

export default function MapView() {
  const [cities, setCities] = useState<City[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [income, setIncome] = useState(60000);

  useEffect(() => {
    async function fetchCities() {
      const res = await fetch('/api/locations');
      const data: City[] = await res.json();
      setCities(data);
    }
    fetchCities();
  }, []);

  useEffect(() => {
    const newScores = cities.reduce((acc, city) => {
      acc[city.city_id] = scoreLocation(city, { income });
      return acc;
    }, {} as { [key: string]: number });
    setScores(newScores);
  }, [cities, income]);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-semibold mb-4">Explore Your Options</h1>

      <div className="mb-6">
        <label
          htmlFor="income"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Annual Income (after tax)
        </label>
        <input
          id="income"
          type="number"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="border border-gray-300 rounded px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="space-y-4">
        {cities.map((city) => (
          <div key={city.city_id} className="p-4 border rounded shadow-sm">
            <h2 className="text-xl font-bold">{city.name}</h2>
            <p className="text-gray-600">
              Score:&nbsp;
              <span className="font-mono">{scores[city.city_id]}</span>
            </p>
            <p className="text-sm text-gray-500">
              Avg&nbsp;Rent&nbsp;(1 br): ${city.avg_rent_1br} | Transit:&nbsp;
              {city.transit_score} | Walk:&nbsp;{city.walk_score}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}