import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const history = useHistory();

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await api.login(form);
      localStorage.setItem('token', response.token);
      history.push('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="page">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </main>
  );
}

export default LoginPage;
