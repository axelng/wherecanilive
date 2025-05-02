import { useEffect, useState } from 'react';
import CityTable from '../components/CityTable';
import { scoreLocation } from '../lib/scoring';

interface City {
  city_id: string;
  name: string;
  avg_rent_1br: number;
  transit_score: number;
  walk_score: number;
  green_space_score: number;
  future_growth_index: number;
  // if you later add lat/lon for Mapbox, include them here
}

export default function MapView() {
  const [cities, setCities] = useState<City[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [income, setIncome] = useState(60000);

  /* ─────────────────── Fetch city list ─────────────────── */
  useEffect(() => {
    async function fetchCities() {
      const res = await fetch('/api/locations');
      const data: City[] = await res.json();
      setCities(data);
    }
    fetchCities();
  }, []);

  /* ─────────────────── Re-score when income or cities change ─────────────────── */
  useEffect(() => {
    const newScores = cities.reduce((acc, city) => {
      acc[city.city_id] = scoreLocation(city, { income });
      return acc;
    }, {} as { [key: string]: number });
    setScores(newScores);
  }, [cities, income]);

  /* ─────────────────────────── UI ─────────────────────────── */
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-semibold mb-4">Explore Your Options</h1>

      {/* Income slider */}
      <div className="mb-6">
        <label
          htmlFor="income"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Annual Income (after tax)
        </label>
        <input
          id="income"
          type="range"
          min={20000}
          max={200000}
          step={5000}
          value={income}
          onChange={e => setIncome(Number(e.target.value))}
          className="w-60"
        />
        <span className="ml-3 font-mono">{income.toLocaleString()}</span>
      </div>

      {/* Sortable table */}
      <CityTable
        rows={cities.map(c => ({
          city: c.name,
          score: scores[c.city_id] ?? 0,
          rent: c.avg_rent_1br,
          transit: c.transit_score,
          walk: c.walk_score,
        }))}
      />
    </div>
  );
}