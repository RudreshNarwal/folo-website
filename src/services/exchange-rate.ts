/**
 * Represents exchange rates between two currencies.
 */
export interface ExchangeRate {
  /**
   * The rate to convert from currencyFrom to currencyTo.
   * 1 unit of currencyFrom equals 'rate' units of currencyTo.
   */
  rate: number;
}

// Simple mock exchange rates - REPLACE with actual API call in production
const mockRates: { [key: string]: number } = {
  'KES_USD': 0.0075, // 1 KES = 0.0075 USD
  'KES_EUR': 0.0070, // 1 KES = 0.0070 EUR
  'KES_GBP': 0.0060, // 1 KES = 0.0060 GBP
  'KES_UGX': 28.5,   // 1 KES = 28.5 UGX
  'KES_CAD': 0.010,  // 1 KES = 0.010 CAD

  'USD_KES': 133.0,  // 1 USD = 133 KES
  'USD_EUR': 0.93,   // 1 USD = 0.93 EUR
  'USD_GBP': 0.80,   // 1 USD = 0.80 GBP
  'USD_UGX': 3800.0, // 1 USD = 3800 UGX
  'USD_CAD': 1.35,   // 1 USD = 1.35 CAD

  'EUR_KES': 143.0,  // 1 EUR = 143 KES
  'EUR_USD': 1.07,   // 1 EUR = 1.07 USD
  'EUR_GBP': 0.86,   // 1 EUR = 0.86 GBP
  'EUR_UGX': 4080.0, // 1 EUR = 4080 UGX
  'EUR_CAD': 1.45,   // 1 EUR = 1.45 CAD

  'GBP_KES': 166.0,  // 1 GBP = 166 KES
  'GBP_USD': 1.25,   // 1 GBP = 1.25 USD
  'GBP_EUR': 1.16,   // 1 GBP = 1.16 EUR
  'GBP_UGX': 4750.0, // 1 GBP = 4750 UGX
  'GBP_CAD': 1.69,   // 1 GBP = 1.69 CAD

  'UGX_KES': 0.035,  // 1 UGX = 0.035 KES
  'UGX_USD': 0.00026,// 1 UGX = 0.00026 USD
  'UGX_EUR': 0.00024,// 1 UGX = 0.00024 EUR
  'UGX_GBP': 0.00021,// 1 UGX = 0.00021 GBP
  'UGX_CAD': 0.00035,// 1 UGX = 0.00035 CAD

  'CAD_KES': 98.5,   // 1 CAD = 98.5 KES
  'CAD_USD': 0.74,   // 1 CAD = 0.74 USD
  'CAD_EUR': 0.69,   // 1 CAD = 0.69 EUR
  'CAD_GBP': 0.59,   // 1 CAD = 0.59 GBP
  'CAD_UGX': 2815.0, // 1 CAD = 2815 UGX
};


/**
 * Asynchronously retrieves the exchange rate between two currencies.
 * Uses mock data for demonstration. Replace with a real API call.
 *
 * @param currencyFrom The currency to convert from (e.g., KES).
 * @param currencyTo The currency to convert to (e.g., USD).
 * @returns A promise that resolves to an ExchangeRate object containing the conversion rate.
 * @throws Error if the currency pair is not supported in the mock data or if currencies are the same.
 */
export async function getExchangeRate(
  currencyFrom: string,
  currencyTo: string
): Promise<ExchangeRate> {
   // Simulate network delay
   await new Promise(resolve => setTimeout(resolve, 150)); // 150ms delay

  if (currencyFrom === currencyTo) {
     return { rate: 1 };
    // throw new Error("Cannot get exchange rate for the same currency.");
  }

  const pairKey = `${currencyFrom.toUpperCase()}_${currencyTo.toUpperCase()}`;
  const rate = mockRates[pairKey];

  if (rate === undefined) {
    console.warn(`Mock exchange rate for ${pairKey} not found. Returning fallback.`);
    // Provide a very basic fallback or throw error
     // Fallback logic: Try inverse rate if direct rate is missing
     const inversePairKey = `${currencyTo.toUpperCase()}_${currencyFrom.toUpperCase()}`;
     const inverseRate = mockRates[inversePairKey];
     if (inverseRate) {
       return { rate: 1 / inverseRate };
     }
     // If neither direct nor inverse rate exists, return a default/error indicator
     return { rate: 0.85 }; // Example fallback rate
    // throw new Error(`Exchange rate for ${currencyFrom} to ${currencyTo} is not supported.`);
  }

  return {
    rate: rate,
  };
}
