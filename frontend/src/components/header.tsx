import React, { useEffect, useState } from 'react';
import BarDataI from '../interfaces/barInterface';
import axios, { AxiosResponse } from 'axios';
import { deburr } from 'lodash';
import '../styles/header.css'

interface Props {
  setBares: React.Dispatch<React.SetStateAction<BarDataI[] | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header(props: Props) {
  const [cidades, setCidades] = useState<string[]>([]);
  const [setText, setSetText] = useState<string>('show-text')
  const { setBares, setLoading } = props

  useEffect(() => {
      axios.get('http://127.0.0.1:8000/cidades')
      .then((response: AxiosResponse<string[]>) => setCidades(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true)
    setSetText('hide-text')
    const selectedCity = event.target.value;
    if (selectedCity !== 'Selecione uma cidade') {
      axios.get(`http://127.0.0.1:8000/bares/${deburr(selectedCity)}`)
        .then((response: AxiosResponse<BarDataI[]>) => {
          setBares(response.data);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    } else {
      setLoading(false)
    }
  }

  return (
    <div className='header'>
      <h2
        className={setText}
      >
        Para começar, escolha:
      </h2>
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