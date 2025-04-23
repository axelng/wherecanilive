import type { NextApiRequest, NextApiResponse } from 'next';

const data = [
  {
    city_id: 'ottawa_on',
    name: 'Ottawa',
    province: 'ON',
    avg_rent_1br: 1320,
    walk_score: 78,
    transit_score: 87,
    green_space_score: 62,
    future_growth_index: 1.25,
  },
  {
    city_id: 'halifax_ns',
    name: 'Halifax',
    province: 'NS',
    avg_rent_1br: 1180,
    walk_score: 72,
    transit_score: 69,
    green_space_score: 74,
    future_growth_index: 1.15,
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(data);
}