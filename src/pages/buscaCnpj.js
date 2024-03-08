import React, { useEffect, useState } from "react";
import axios from 'axios';
import './buscaCnpj.css'
import { toast } from 'react-toastify';

export default function BuscaCnpj(props) {
    const [cnpj, setCnpj] = useState("");
    const [data, setData] = useState(null);
    const [endereco, setEndereco] = useState("");
    // const textInputRef = useRef(null);

    useEffect(() => {
    }, [data]);

    async function buscar(e) {
        e.preventDefault();
        try {
          const response = await axios.get(`https://publica.cnpj.ws/cnpj/${cnpj}`);
          const jsonData = response.data;
          setData(jsonData);
          const endereco = jsonData.estabelecimento.tipo_logradouro + " "+ jsonData.estabelecimento.logradouro + ", " +
          jsonData.estabelecimento.numero+ ", " +
          jsonData.estabelecimento.complemento+ ", " +
          jsonData.estabelecimento.cidade.nome+ "-" +
          jsonData.estabelecimento.estado.sigla;
          setEndereco(endereco);
        } catch (error) {
          toast.error('CNPJ não encontrado.')
        }
    }

    function handleChange (e) {
        setCnpj(e.target.value);
    };

    function salvarDados() {
      axios.post('http://localhost:4000/api/salvarEmpresa', data)
      .then(response => {
        console.log(response.data)
        toast.success('Dados salvos com sucesso!')
      })
      .catch(error => {
        toast.error('Erro ao salvar os dados.')
        console.error('Erro ao fazer requisição:', error)
      });
    }

    return (
        <div className="container">
        <form onSubmit={buscar} className="search">
          <label className="label">
            Insira o CNPJ:
            <input
              type="number"
              value={cnpj}
              onChange={handleChange}
              required
              className="input"
            />
          </label>
          <button type="submit" className="button">Enviar</button>
        </form>
        {data && endereco ? (
          <div className="dados">
            <h2>Dados da Empresa</h2>
            <p><strong>Razão Social:</strong> {data.razao_social}</p>
            <p><strong>CNPJ:</strong> {data.estabelecimento.cnpj}</p>
            <p><strong>Capital Social:</strong> {data.capital_social}</p>
            <p><strong>Natureza Jurídica:</strong> {data.natureza_juridica?.descricao}</p>
            <p><strong>Porte:</strong> {data.porte?.descricao}</p>
            <p><strong>Simples Nacional:</strong> {data.simples?.simples}</p>
            <p><strong>Atualizado em:</strong> {new Date(data.atualizado_em).toLocaleDateString()}</p>
            <p><strong>Endereço:</strong> {endereco}</p>

            <button type="button" className="button" onClick={salvarDados}>Salvar dados</button>
          </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    );
};
