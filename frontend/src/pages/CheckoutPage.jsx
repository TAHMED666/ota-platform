import { useState } from 'react';
import { api } from '../services/api';

function CheckoutPage() {
  const [payload, setPayload] = useState({ bookingType: 'flight', bookingId: '', amount: '' });
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setResult('');

    try {
      const response = await api.checkout({ ...payload, amount: Number(payload.amount) });
      setResult(`Payment intent created: ${response.payment.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="page">
      <h2>Payment Checkout</h2>
      <form onSubmit={submit}>
        <select value={payload.bookingType} onChange={(e) => setPayload({ ...payload, bookingType: e.target.value })}>
          <option value="flight">Flight</option>
          <option value="hotel">Hotel</option>
        </select>
        <input
          placeholder="Booking UUID"
          value={payload.bookingId}
          onChange={(e) => setPayload({ ...payload, bookingId: e.target.value })}
        />
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Amount"
          value={payload.amount}
          onChange={(e) => setPayload({ ...payload, amount: e.target.value })}
        />
        <button type="submit">Create Payment</button>
      </form>
      {result && <p>{result}</p>}
      {error && <p className="error">{error}</p>}
    </main>
  );
}

export default CheckoutPage;
