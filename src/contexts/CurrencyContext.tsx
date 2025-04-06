
import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'INR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRate: number; // USD to INR rate
  convertPrice: (price: string | number, toCurrency?: Currency) => string;
  formatPrice: (price: string | number, currencyType?: Currency) => string;
}

// Create context with default values
const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {},
  exchangeRate: 83.5,
  convertPrice: () => '',
  formatPrice: () => ''
});

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(83.5); // Default exchange rate USD to INR

  // Fetch the latest exchange rate from an API or service
  useEffect(() => {
    // For production, use a proper exchange rate API
    // For demo, using a static value
    setExchangeRate(83.5); // 1 USD = 83.5 INR
  }, []);

  // Convert price from USD to INR or vice versa
  const convertPrice = (price: string | number, toCurrency?: Currency): string => {
    const targetCurrency = toCurrency || currency;
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    if (targetCurrency === 'USD') {
      return (numericPrice / exchangeRate).toFixed(2);
    } else {
      return (numericPrice * exchangeRate).toFixed(2);
    }
  };

  // Format price with currency symbol
  const formatPrice = (price: string | number, currencyType?: Currency): string => {
    const targetCurrency = currencyType || currency;
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    if (targetCurrency === 'USD') {
      return `$${numericPrice.toFixed(2)}`;
    } else {
      return `₹${numericPrice.toFixed(2)}`;
    }
  };

  // Create the context value object
  const contextValue: CurrencyContextType = {
    currency,
    setCurrency,
    exchangeRate,
    convertPrice,
    formatPrice
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};
