/**
 * Exemplo de uso com Next.js (App Router)
 * 
 * Este é um exemplo ilustrativo de como usar bank-check-br em um projeto Next.js.
 * Arquivo: app/page.tsx
 */

import React from 'react';

interface Bank {
  nomeExtenso: string;
  nomeReduzido: string;
  numeroCodigo: string;
  svg: string | null;
}

// Server Component - busca dados no servidor
async function getBanks(): Promise<Bank[]> {
  // Em um projeto real, você usaria a lib diretamente no servidor
  // import { listarBancos } from 'bank-check-br';
  // return await listarBancos();

  // Simulando dados para demonstração
  return [
    { nomeExtenso: 'Banco do Brasil', nomeReduzido: 'BB', numeroCodigo: '001', svg: null },
    { nomeExtenso: 'Itaú Unibanco', nomeReduzido: 'Itaú', numeroCodigo: '341', svg: null },
    { nomeExtenso: 'Bradesco', nomeReduzido: 'Bradesco', numeroCodigo: '237', svg: null },
    { nomeExtenso: 'Nubank', nomeReduzido: 'Nu', numeroCodigo: '260', svg: null },
  ];
}

// Componente que exibe um banco
function BankCard({ bank }: { bank: Bank }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3">
        {bank.svg ? (
          <div dangerouslySetInnerHTML={{ __html: bank.svg }} className="w-12 h-12" />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
            🏦
          </div>
        )}
        <div>
          <h3 className="font-semibold">{bank.nomeExtenso}</h3>
          <p className="text-sm text-gray-500">Código: {bank.numeroCodigo}</p>
        </div>
      </div>
    </div>
  );
}

// Página principal
export default async function HomePage() {
  const banks = await getBanks();

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">
        bank-check-br - Exemplo Next.js
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Bancos Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {banks.map((bank) => (
            <BankCard key={bank.numeroCodigo} bank={bank} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Exemplo com Server Action</h2>
        <form action={searchBank} className="flex gap-2">
          <input
            type="text"
            name="code"
            placeholder="Código do banco (ex: 001)"
            className="border rounded px-3 py-2 flex-1"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Buscar
          </button>
        </form>
      </section>
    </main>
  );
}

// Server Action para busca
async function searchBank(formData: FormData) {
  'use server';

  const code = formData.get('code') as string;
  
  if (!code) {
    return;
  }

  // Em um projeto real:
  // import { buscarBanco } from 'bank-check-br';
  // const bank = await buscarBanco(code);
  // console.log(bank);

  console.log(`Buscando banco: ${code}`);
}
