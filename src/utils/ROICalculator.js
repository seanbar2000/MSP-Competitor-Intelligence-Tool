export const calculateROI = (competitor, formData) => {
  if (!competitor || formData.currentSolution === "None") {
    return null;
  }

  // Extract number of endpoints from client base size
  const endpointMap = {
    "Under 500 endpoints": 500,
    "500-2,000 endpoints": 1250, // midpoint
    "2,000-5,000 endpoints": 3500, // midpoint
    "5,000+ endpoints": 7500,
  };
  const endpoints = endpointMap[formData.clientBaseSize] || 500;
  const competitorPrice = parseFloat(competitor.price_per_endpoint);
  const guardzPrice = 2.5;

  const currentMonthlyCost = competitorPrice * endpoints;
  const guardzMonthlyCost = guardzPrice * endpoints;
  const monthlySavings = currentMonthlyCost - guardzMonthlyCost;
  const annualSavings = monthlySavings * 12;
  console.log("guardz:", guardzMonthlyCost);

  return {
    endpoints,
    competitorPrice: competitorPrice.toFixed(2),
    currentMonthlyCost,
    guardzMonthlyCost,
    monthlySavings,
    annualSavings,
  };
};
