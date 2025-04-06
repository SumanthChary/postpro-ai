
import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'INR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRate: number; // USD to INR rate
}

// Create context with a more informative default value
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    console.error('useCurrency must be used within a CurrencyProvider');
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(83.5); // Default exchange rate USD to INR

  // Fetch the latest exchange rate (could be expanded to use a real API)
  useEffect(() => {
    // In a real app, you would fetch the exchange rate from an API
    // For demo purposes, we're using a static rate
    // Example API endpoint: https://api.exchangerate-api.com/v4/latest/USD
    
    console.log('CurrencyProvider initialized with exchange rate:', exchangeRate);
    setExchangeRate(83.5); // 1 USD = 83.5 INR (approximate)
  }, []);

  // Create the context value object
  const contextValue: CurrencyContextType = {
    currency,
    setCurrency,
    exchangeRate
  };

  console.log('CurrencyProvider rendering with currency:', currency);

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};
