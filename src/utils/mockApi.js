// Simulate async API calls with Promise

export function mockLogin(user) {
  return new Promise((resolve) => setTimeout(() => resolve({ success: true, user }), 400));
}

export function mockRegister(user) {
  return new Promise((resolve) => setTimeout(() => resolve({ success: true, user }), 400));
}

export function mockGetPortfolio() {
  // Example stocks
  const stocks = [
    { symbol: 'AAPL', company: 'Apple', quantity: 15, price: 172 },
    { symbol: 'GOOG', company: 'Google', quantity: 8, price: 2680 },
    { symbol: 'TSLA', company: 'Tesla', quantity: 10, price: 800 }
  ];
  return new Promise((resolve) =>
    setTimeout(() => resolve(stocks), 500)
  );
}

export function mockDeleteStock(symbol) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true, symbol }), 300)
  );
}
