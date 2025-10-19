import { useState, useMemo } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow,
  TableCell, TableBody, ButtonGroup, Button, TableFooter, TablePagination
} from "@mui/material";
import { useApp } from "../context/AppContext";

const transactionsMock = [
  { id: 1, date: "2025-10-15", type: "Buy", symbol: "AAPL", quantity: 10, price: 172 },
  { id: 2, date: "2025-10-16", type: "Sell", symbol: "TSLA", quantity: 5, price: 805 },
  { id: 3, date: "2025-10-17", type: "Buy", symbol: "GOOG", quantity: 8, price: 2680 },
  { id: 4, date: "2025-10-18", type: "Sell", symbol: "AAPL", quantity: 3, price: 175 },
  // ... add more mock data as needed
];

export default function Transactions() {
  const { user } = useApp(); // for user info if needed
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // Filtered transactions
  const filteredTransactions = useMemo(() =>
    filter === "All" ? transactionsMock : transactionsMock.filter(t => t.type === filter), [filter]);

  // Pagination slice
  const displayedTransactions = useMemo(() =>
    filteredTransactions.slice(page * rowsPerPage, (page + 1) * rowsPerPage), [filteredTransactions, page]);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  return (
    <Box sx={{ p: 3, minHeight: "100vh", background: "#121623" }}>
      <Typography variant="h4" fontWeight={700} color="#e3e8fd" mb={3}>Transactions</Typography>

      <ButtonGroup variant="outlined" sx={{ mb: 3 }} color="primary">
        <Button onClick={() => setFilter("All")} variant={filter === "All" ? "contained" : "outlined"}>All</Button>
        <Button onClick={() => setFilter("Buy")} variant={filter === "Buy" ? "contained" : "outlined"}>Buy</Button>
        <Button onClick={() => setFilter("Sell")} variant={filter === "Sell" ? "contained" : "outlined"}>Sell</Button>
      </ButtonGroup>

      <Paper sx={{ bgcolor: "#1a1f38", color: "#eee" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price (₹)</TableCell>
              <TableCell>Total (₹)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedTransactions.map(t => (
              <TableRow key={t.id} hover>
                <TableCell>{t.date}</TableCell>
                <TableCell sx={{ color: t.type === "Buy" ? "#4caf50" : "#f44336", fontWeight: "bold" }}>{t.type}</TableCell>
                <TableCell>{t.symbol}</TableCell>
                <TableCell>{t.quantity}</TableCell>
                <TableCell>{t.price}</TableCell>
                <TableCell>{t.price * t.quantity}</TableCell>
              </TableRow>
            ))}
            {displayedTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4, color: "#999" }}>
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={filteredTransactions.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
                sx={{ color: "#eee" }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </Box>
  );
}
