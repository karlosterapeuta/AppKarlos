const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function main() {
  const dbDir = path.join(process.cwd(), '.next/sqlite');
  const dbPath = path.join(dbDir, 'prisma.db');

  console.log('Diretório base:', process.cwd());
  console.log('Configurando SQLite em:', dbDir);

  // Criar diretório se não existir
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true, mode: 0o777 });
    console.log('Diretório SQLite criado com sucesso');
  }

  // Definir permissões do diretório
  try {
    fs.chmodSync(dbDir, 0o777);
    console.log('Permissões do diretório atualizadas');
  } catch (error) {
    console.warn('Aviso ao definir permissões do diretório:', error.message);
  }

  // Criar ou verificar arquivo do banco de dados
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '', { mode: 0o666 });
    console.log('Arquivo do banco de dados criado');
  }

  // Definir permissões do arquivo
  try {
    fs.chmodSync(dbPath, 0o666);
    console.log('Permissões do arquivo atualizadas');
  } catch (error) {
    console.warn('Aviso ao definir permissões do arquivo:', error.message);
  }

  // Verificar permissões
  const dirStats = fs.statSync(dbDir);
  const fileStats = fs.statSync(dbPath);
  console.log('Permissões finais:');
  console.log('- Diretório:', dirStats.mode.toString(8));
  console.log('- Arquivo:', fileStats.mode.toString(8));

  // Executar comando para garantir permissões no Linux
  if (process.platform !== 'win32') {
    try {
      execSync(`chmod -R 777 ${dbDir}`);
      execSync(`chmod 666 ${dbPath}`);
      console.log('Permissões definidas via chmod');
    } catch (error) {
      console.warn('Aviso ao executar chmod:', error.message);
    }
  }

  // Verificar se o arquivo é gravável
  try {
    fs.accessSync(dbPath, fs.constants.W_OK);
    console.log('Arquivo do banco de dados tem permissão de escrita');
  } catch (error) {
    console.error('Erro: Arquivo do banco de dados não tem permissão de escrita:', error.message);
    process.exit(1);
  }

  console.log('Setup do SQLite concluído com sucesso');
}

main();
