
import React, { createContext, useContext } from 'react';

interface CurrencyContextType {
  currency: 'USD';
  exchangeRate: number;
}

// Create a simplified context with only USD
const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  exchangeRate: 83.5
});

export const useCurrency = () => {
  return useContext(CurrencyContext);
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Simplified context with fixed USD values
  const contextValue: CurrencyContextType = {
    currency: 'USD',
    exchangeRate: 83.5
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};
