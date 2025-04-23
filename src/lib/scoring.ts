export function scoreLocation(city: any, userInput: any) {
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