import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountry();
  }, []);

  async function fetchCountry() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setCountries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>Countries</h1>
      {
        loading ? (<p>Loading...</p>) : (
          <ul className="country-list">
            {
              countries.map((country, index) => {
                return (
                  <li key={index} className="country-item">
                  
                    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className="country-flag" />
                    <p className="country-name">{country.name.common}</p>
                  </li>
                );
              })
            }
          </ul>
        )
      }
    </div>
  );
}

export default App;