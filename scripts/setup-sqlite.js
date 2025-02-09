const fs = require('fs');
const path = require('path');

// Determina o diretório base com base no ambiente
const baseDir = path.join(process.cwd(), '.next/sqlite');
console.log('Diretório base:', process.cwd());
console.log('Criando diretório SQLite em:', baseDir);

// Cria o diretório para o SQLite se ele não existir
if (!fs.existsSync(baseDir)) {
  try {
    fs.mkdirSync(baseDir, { recursive: true, mode: 0o777 });
    console.log('Diretório SQLite criado com sucesso');
  } catch (error) {
    console.error('Erro ao criar diretório SQLite:', error);
    process.exit(1);
  }
}

// Cria um arquivo vazio para o banco de dados se ele não existir
const dbPath = path.join(baseDir, 'prisma.db');
if (!fs.existsSync(dbPath)) {
  try {
    fs.writeFileSync(dbPath, '', { mode: 0o666 });
    console.log('Arquivo do banco de dados criado com sucesso em:', dbPath);
  } catch (error) {
    console.error('Erro ao criar arquivo do banco de dados:', error);
    process.exit(1);
  }
}

// Define as permissões corretas para o diretório e arquivo no Linux/Unix
if (process.platform !== 'win32') {
  try {
    // Define permissões 777 para o diretório
    fs.chmodSync(baseDir, 0o777);
    // Define permissões 666 para o arquivo do banco de dados
    fs.chmodSync(dbPath, 0o666);
    console.log('Permissões definidas com sucesso:');
    console.log('- Diretório:', fs.statSync(baseDir).mode.toString(8));
    console.log('- Arquivo:', fs.statSync(dbPath).mode.toString(8));
  } catch (error) {
    console.warn('Aviso: Não foi possível definir as permissões:', error.message);
  }
}

// Verifica se o arquivo é gravável
try {
  fs.accessSync(dbPath, fs.constants.W_OK);
  console.log('Arquivo do banco de dados tem permissão de escrita');
} catch (error) {
  console.error('Erro: Arquivo do banco de dados não tem permissão de escrita:', error.message);
  process.exit(1);
}

console.log('Setup do SQLite concluído com sucesso');
