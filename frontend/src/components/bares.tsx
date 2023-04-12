import React from 'react';
import BarDataI from '../interfaces/barInterface';
import '../styles/bares.css'

interface Props {
  bares: BarDataI[] | null,
  loading: boolean;
}

function Bares(props: Props) {
  const { bares, loading } = props;

  const removeCidadeDoEndereco = (endereco: string): string =>  {
    const partesDoEndereco = endereco.split(', ');
    partesDoEndereco.pop();
    return partesDoEndereco.join(', ');
  }

  return (
    <div>
      { loading ?  <div className="loader"></div>  : (bares && <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>4 + próximos</th>
            <th>3 + próximos</th>
            <th>Em até 500m</th>
            <th>Em até 750m</th>
          </tr>
        </thead>
        <tbody>
        {bares.map((bar, index) => (
            <React.Fragment key={bar.nome}>
              <tr className='linha-bar'>
                <td className='tabela-nome'>{bar.nome}</td>
                <td className='tabela-endereco'>
                  {removeCidadeDoEndereco(bar.endereco)}
                </td>
                <td className='tabela-proximo'>
                  {Object.entries(bar['4proximos']).map(([nome, valor]) => (
                    <div key={nome} className='bar-distancia'>
                      {nome} ({valor}m)
                    </div>
                  ))}
                </td>
                <td className='tabela-proximo'>
                  {Object.entries(bar['3proximos']).map(([nome, valor]) => (
                    <div key={nome} className='bar-distancia'>
                      {nome} ({valor}m)
                    </div>
                  ))}
                </td>
                <td
                  className='tabela-raio'
                  dangerouslySetInnerHTML={{
                    __html: bar['500m']
                      .map((item) => item + '<br>')
                      .join(''),
                  }}
                ></td>
                <td
                  className='tabela-raio'
                  dangerouslySetInnerHTML={{
                    __html: bar['750m']
                      .map((item) => item + '<br>')
                      .join(''),
                  }}
                ></td>
              </tr>
              {index < bares.length - 1 && <tr><td colSpan={6}><hr /></td></tr>}
            </React.Fragment>
          ))}

        </tbody>
      </table>) }
    </div>
  );
}

export default Bares;
