import React from 'react';
import BarDataI from '../interfaces/barInterface';

interface Props {
  setBares: React.Dispatch<React.SetStateAction<BarDataI[]>>;
}

function Header(props: Props) {

  const { setBares } = props

  // useEffect(() => {
  //   axios.get('http://myapi.com/data')
  //     .then((response: AxiosResponse<BarData[]>) => setData(response.data))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <div>
      <h1>HEADER</h1>
    </div>
  );
}

export default Header;