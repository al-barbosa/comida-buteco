export default interface BarDataI {
  nome: string;
  endereco: string;
  latitude: number;
  longitude: number;
  "4proximos": {
    [nomeBar: string]: number;
  };
  "3proximos": {
    [nomeBar: string]: number;
  };
  "500m": string[];
  "750m": string[];
}
