// Generates random chart data for analytics demo

export function generatePieChartData(portfolio) {
  return portfolio.map(stock => ({
    symbol: stock.symbol,
    value: stock.quantity * stock.price
  }));
}
