/**
 * Represents exchange rates between two currencies.
 */
export interface ExchangeRate {
  /**
   * The rate to convert from currencyFrom to currencyTo.
   */
  rate: number;
}

/**
 * Asynchronously retrieves the exchange rate between two currencies.
 *
 * @param currencyFrom The currency to convert from (e.g., USD).
 * @param currencyTo The currency to convert to (e.g., EUR).
 * @returns A promise that resolves to an ExchangeRate object containing the conversion rate.
 */
export async function getExchangeRate(
  currencyFrom: string,
  currencyTo: string
): Promise<ExchangeRate> {
  // TODO: Implement this by calling an API.

  return {
    rate: 0.85,
  };
}
