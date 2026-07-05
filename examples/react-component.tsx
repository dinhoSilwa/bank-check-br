/**
 * Exemplo de componente React usando bank-check-br
 * 
 * Este é um exemplo ilustrativo. Para usar em um projeto React real,
 * você precisará de um backend que sirva os dados do banco.
 */

import React, { useEffect, useState } from 'react';

interface Bank {
  nomeExtenso: string;
  nomeReduzido: string;
  numeroCodigo: string;
  svg: string | null;
}

interface BankCardProps {
  bankCode: string;
}

// Componente que exibe informações de um banco
export function BankCard({ bankCode }: BankCardProps) {
  const [bank, setBank] = useState<Bank | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBank() {
      try {
        setLoading(true);
        // Em um projeto real, isso seria uma chamada API
        // const response = await fetch(`/api/bank/${bankCode}?svg=true`);
        // const data = await response.json();
        
        // Simulando dados para demonstração
        const data: Bank = {
          nomeExtenso: 'Banco do Brasil',
          nomeReduzido: 'BB',
          numeroCodigo: bankCode,
          svg: null,
        };
        
        setBank(data);
      } catch (err) {
        setError('Erro ao carregar banco');
      } finally {
        setLoading(false);
      }
    }

    fetchBank();
  }, [bankCode]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!bank) {
    return <div>Banco não encontrado</div>;
  }

  return (
    <div className="bank-card">
      {bank.svg && (
        <div 
          className="bank-icon"
          dangerouslySetInnerHTML={{ __html: bank.svg }}
        />
      )}
      <h3>{bank.nomeExtenso}</h3>
      <p>Código: {bank.numeroCodigo}</p>
    </div>
  );
}

// Componente que lista bancos
export function BankList() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanks() {
      try {
        // Em um projeto real, isso seria uma chamada API
        // const response = await fetch('/api/banks');
        // const data = await response.json();
        
        // Simulando dados para demonstração
        const data: Bank[] = [
          { nomeExtenso: 'Banco do Brasil', nomeReduzido: 'BB', numeroCodigo: '001', svg: null },
          { nomeExtenso: 'Itaú Unibanco', nomeReduzido: 'Itaú', numeroCodigo: '341', svg: null },
          { nomeExtenso: 'Bradesco', nomeReduzido: 'Bradesco', numeroCodigo: '237', svg: null },
        ];
        
        setBanks(data);
      } catch (err) {
        console.error('Erro ao carregar bancos:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBanks();
  }, []);

  if (loading) {
    return <div>Carregando bancos...</div>;
  }

  return (
    <div className="bank-list">
      <h2>Bancos Disponíveis</h2>
      <div className="bank-grid">
        {banks.map((bank) => (
          <BankCard key={bank.numeroCodigo} bankCode={bank.numeroCodigo} />
        ))}
      </div>
    </div>
  );
}

// Componente de busca
export function BankSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Bank[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      // Em um projeto real, isso seria uma chamada API
      // const response = await fetch(`/api/banks/search?q=${encodeURIComponent(query)}`);
      // const data = await response.json();
      
      // Simulando dados para demonstração
      const data: Bank[] = [
        { nomeExtenso: 'Banco do Brasil', nomeReduzido: 'BB', numeroCodigo: '001', svg: null },
      ];
      
      setResults(data);
    } catch (err) {
      console.error('Erro na busca:', err);
    }
  };

  return (
    <div className="bank-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar banco..."
        />
        <button type="submit">Buscar</button>
      </form>
      
      {results.length > 0 && (
        <div className="search-results">
          <h3>Resultados:</h3>
          {results.map((bank) => (
            <div key={bank.numeroCodigo} className="search-result">
              {bank.nomeExtenso} ({bank.numeroCodigo})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
