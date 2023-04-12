import React, { useEffect, useState } from 'react';
import BarDataI from '../interfaces/barInterface';
import axios, { AxiosResponse } from 'axios';
import '../styles/header.css'

interface Props {
  setBares: React.Dispatch<React.SetStateAction<BarDataI[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header(props: Props) {
  const [cidades, setCidades] = useState<string[]>([]);
  const { setBares, setLoading } = props

  useEffect(() => {
      axios.get('http://127.0.0.1:8000/cidades')
      .then((response: AxiosResponse<string[]>) => setCidades(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true)
    const selectedCity = event.target.value;
    if (selectedCity !== 'Selecione uma cidade') {
      axios.get(`http://127.0.0.1:8000/bares/${selectedCity}`)
        .then((response: AxiosResponse<BarDataI[]>) => {
          setBares(response.data);
        })
        .catch((error) => console.log(error));
    }
    setLoading(false)
  }

  return (
    <div className='header'>
      <select
        className='city-selector'
        onChange={ handleSelectChange }
      >
        <option value=''>Selecione uma cidade</option>
        {cidades.map((cidade, index) => (
          <option key={index} value={cidade}>{cidade}</option>
        ))}
      </select>
    </div>
  );
}

export default Header;