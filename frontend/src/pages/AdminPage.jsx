import { useEffect, useState } from 'react';
import { api } from '../services/api';

function AdminPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getAdminDashboard()
      .then(setStats)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="page">
      <h2>Admin Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {stats && (
        <section className="grid">
          {Object.entries(stats).map(([key, value]) => (
            <article className="card" key={key}>
              <h3>{key}</h3>
              <p>{value}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default AdminPage;
