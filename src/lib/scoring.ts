interface City {
  avg_rent_1br: number;
  transit_score: number;
  walk_score: number;
  green_space_score: number;
  future_growth_index: number;
}

interface UserInput {
  income: number;
}

export function scoreLocation(city: City, userInput: UserInput) {
    const affordability = userInput.income / (12 * city.avg_rent_1br);
    const growthScore = city.future_growth_index || 1;
  
    let score = 0;
    score += affordability * 2;
    score += city.transit_score * 0.5;
    score += city.walk_score * 0.5;
    score += city.green_space_score * 0.25;
    score += growthScore * 1;
  
    return Number(score.toFixed(2));
  }