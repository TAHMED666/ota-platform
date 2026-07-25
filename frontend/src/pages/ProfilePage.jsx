import { useEffect, useState } from 'react';
import { api } from '../services/api';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getProfile()
      .then(setProfile)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="page">
      <h2>Account Profile</h2>
      {error && <p className="error">{error}</p>}
      {profile && (
        <article className="card">
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
          <p>Preferred Currency: {profile.preferredCurrency}</p>
        </article>
      )}
    </main>
  );
}

export default ProfilePage;
