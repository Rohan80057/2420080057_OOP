import useLocalStorage from './useLocalStorage';

export function usePortfolio() {
  const [portfolio, setPortfolio] = useLocalStorage('portfolio', []);
  function addStock(stock) {
    setPortfolio([...portfolio, stock]);
  }
  function removeStock(symbol) {
    setPortfolio(portfolio.filter(s => s.symbol !== symbol));
  }
  return { portfolio, addStock, removeStock };
}
