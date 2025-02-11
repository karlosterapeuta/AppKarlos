const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function main() {
  const dbDir = path.join(process.cwd(), '.next/sqlite');
  const dbPath = path.join(dbDir, 'prisma.db');

  console.log('Verificando diretório do banco de dados:', dbDir);
  console.log('Caminho do banco de dados:', dbPath);

  // Ensure directory exists with full permissions
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true, mode: 0o777 });
    console.log('Diretório criado com permissões completas');
  } else {
    fs.chmodSync(dbDir, 0o777);
    console.log('Permissões do diretório atualizadas');
  }

  // Create or update database file with full permissions
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, '', { mode: 0o666 });
      console.log('Arquivo do banco de dados criado');
    }
    fs.chmodSync(dbPath, 0o666);
    console.log('Permissões do arquivo atualizadas');

    // Verify file permissions
    const stats = fs.statSync(dbPath);
    console.log('Permissões do arquivo:', stats.mode.toString(8));
    
    // Test file access
    fs.accessSync(dbPath, fs.constants.R_OK | fs.constants.W_OK);
    console.log('Arquivo tem permissões de leitura e escrita');

    // Initialize Prisma Client with absolute path
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: `file:${dbPath}`
        }
      }
    });

    console.log('Testando conexão com o banco de dados...');
    
    // Test database connection
    await prisma.$queryRaw`SELECT 1+1 as result`;
    console.log('Conexão com o banco de dados estabelecida com sucesso');

    await prisma.$disconnect();
  } catch (error) {
    console.error('Erro durante a inicialização:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('Erro durante a inicialização:', e);
    process.exit(1);
  });
