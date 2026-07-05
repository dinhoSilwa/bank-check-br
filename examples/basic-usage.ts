/**
 * Exemplo básico de uso do bank-check-br
 */

import {
  validarBanco,
  buscarBanco,
  buscarBancoPorISPB,
  buscarBancosPorNome,
  listarBancos,
  listarBancosComIcone,
  gerarSVG,
  recarregarDados,
  clearCaches,
  getCacheStats,
} from '../src/index';

async function main() {
  console.log('=== bank-check-br - Exemplo Básico ===\n');

  // 1. Validar banco por código de agência
  console.log('1. Validar banco por código:');
  const banco = await validarBanco('001');
  if (banco) {
    console.log(`   ${banco.nomeExtenso} (${banco.numeroCodigo})`);
  }

  // 2. Buscar banco com SVG
  console.log('\n2. Buscar banco com SVG:');
  const comSvg = await buscarBanco('341', { includeSvg: true });
  if (comSvg) {
    console.log(`   ${comSvg.nomeExtenso}`);
    console.log(`   SVG: ${comSvg.svg ? 'Sim' : 'Não'}`);
  }

  // 3. Buscar por ISPB
  console.log('\n3. Buscar por ISPB:');
  const porIspb = await buscarBancoPorISPB('00000000');
  if (porIspb) {
    console.log(`   ${porIspb.nomeExtenso}`);
  }

  // 4. Buscar por nome
  console.log('\n4. Buscar por nome "Banco":');
  const porNome = await buscarBancosPorNome('Banco');
  console.log(`   Encontrados: ${porNome.length} bancos`);

  // 5. Listar bancos com ícone
  console.log('\n5. Listar bancos com ícone:');
  const comIcone = await listarBancosComIcone();
  console.log(`   Disponíveis: ${comIcone.length} bancos`);

  // 6. Gerar SVG
  console.log('\n6. Gerar SVG:');
  const svg = gerarSVG('Nubank');
  if (svg) {
    console.log(`   SVG gerado: ${svg.substring(0, 50)}...`);
  }

  // 7. Gerar SVG personalizado
  console.log('\n7. Gerar SVG personalizado:');
  const svgPersonalizado = gerarSVG('Itaú', {
    width: 64,
    className: 'bank-icon-large',
  });
  if (svgPersonalizado) {
    console.log(`   SVG personalizado: ${svgPersonalizado.substring(0, 50)}...`);
  }

  // 8. Estatísticas do cache
  console.log('\n8. Estatísticas do cache:');
  const stats = getCacheStats();
  console.log(`   Bancos em cache: ${stats.bankCacheSize}`);
  console.log(`   SVGs em cache: ${stats.svgCacheSize}`);

  // 9. Limpar cache
  console.log('\n9. Limpar cache:');
  clearCaches();
  const statsLimpo = getCacheStats();
  console.log(`   Cache limpo: ${statsLimpo.bankCacheSize === 0}`);

  // 10. Recarregar dados
  console.log('\n10. Recarregar dados:');
  await recarregarDados();
  const statsRecarregado = getCacheStats();
  console.log(`   Dados recarregados: ${statsRecarregado.bankCacheSize} bancos`);
}

main().catch(console.error);
