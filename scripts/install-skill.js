#!/usr/bin/env node

/**
 * Script para instalar a skill do bank-check-br
 * no diretório de skills do assistente de IA.
 *
 * Uso: npm run install:skill
 */

import { existsSync, mkdirSync, cpSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { homedir } from 'os';

const SKILL_NAME = 'bank-check-br';

// Detectar assistentes de IA
const ASSISTANTS = [
  {
    name: 'Codex/OpenAI',
    path: join(homedir(), '.codex', 'skills'),
  },
  {
    name: 'Claude Code',
    path: join(homedir(), '.claude', 'skills'),
  },
];

// Encontrar diretório da skill no pacote atual
const packageDir = resolve(import.meta.dirname, '..');
const skillSource = join(packageDir, 'skill');

if (!existsSync(skillSource)) {
  console.error('❌ Diretório skill/ não encontrado no pacote.');
  process.exit(1);
}

console.log('🏦 bank-check-br - Instalador de Skill\n');

// Detectar assistentes disponíveis
const available = ASSISTANTS.filter((a) => {
  const parentDir = resolve(a.path, '..');
  return existsSync(parentDir);
});

if (available.length === 0) {
  console.log('Nenhum assistente de IA detectado.');
  console.log('\nInstale manualmente copiando a pasta skill/:');
  console.log(`  cp -r ${skillSource} <diretório-de-skills>/${SKILL_NAME}`);
  process.exit(0);
}

console.log('Assistentes detectados:');
available.forEach((a) => {
  console.log(`  ✓ ${a.name}`);
});

console.log('');

// Instalar em cada assistente
for (const assistant of available) {
  const targetDir = join(assistant.path, SKILL_NAME);

  try {
    mkdirSync(assistant.path, { recursive: true });
    cpSync(skillSource, targetDir, { recursive: true });
    console.log(`✅ ${assistant.name}: ${targetDir}`);
  } catch (error) {
    console.error(`❌ ${assistant.name}: ${error.message}`);
  }
}

console.log('\n🎉 Skill instalada com sucesso!');
console.log('Reinicie o assistente para ativar a skill.');
