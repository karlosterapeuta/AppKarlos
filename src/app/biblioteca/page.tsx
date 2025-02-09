'use client'

import Card from 'components/ui/Card' // Ensure this is a named import
import EmotionalAssessment from '@/components/hawkins/EmotionalAssessment' // Ensure this path is correct

export default function BibliotecaPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hawkins</h1>
        <div className="mt-4 bg-white rounded-lg shadow p-6">
          <p className="text-gray-700 leading-relaxed">
            A escala "Níveis de consciência de Hawkins" foi desenvolvida pelo psiquiatra David R. Hawkins. 
            Esta metodologia inovadora é capaz de medir a frequência do campo vibracional de pessoas, filmes, 
            documentos, criando uma escala abrangente de estados de consciência.
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Como funciona?</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Selecione seu estado emocional atual no menu</li>
              <li>Visualize a frequência correspondente em Hz</li>
              <li>Explore a descrição detalhada do estado</li>
              <li>Receba recomendações musicais personalizadas</li>
            </ul>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Use esta ferramenta para:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Avaliar seu estado emocional atual</li>
              <li>Compreender diferentes níveis de consciência</li>
              <li>Receber sugestões musicais terapêuticas</li>
              <li>Acompanhar sua evolução ao longo do tempo</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sugestões de Música */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Sugestões de Música</h2>
        <h3 className="text-lg font-semibold">1. Músicas para Estimulação Motora e Coordenação</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>"Fazendinha" (Mundo Bita)</strong> - Trabalha imitação de animais e movimentos corporais. Benefício: Promove a coordenação motora grossa e a interação por meio de gestos lúdicos.</li>
          <li><strong>"Chuá Tchibum" (Mundo Bita)</strong> - Associada a brincadeiras com água ou movimentos rítmicos. Benefício: Estimula a consciência corporal e a regulação sensorial.</li>
          <li><strong>"Borboletinha" (Galinha Pintadinha)</strong> - Coreografias simples com as mãos. Benefício: Desenvolve coordenação motora fina e sincronia.</li>
          <li><strong>"Marcha Soldado" (Tradicional)</strong> - Ritmo marcante para marchar ou bater palmas. Benefício: Melhora o senso de ritmo e a organização espacial.</li>
        </ul>

        <h3 className="text-lg font-semibold">2. Músicas para Comunicação Não Verbal e Expressão Emocional</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>"Boa Noite" (Mundo Bita)</strong> - Melodia suave para transição entre atividades. Benefício: Acalma e auxilia na regulação emocional.</li>
          <li><strong>"Samba Lelê" (Tradicional)</strong> - Repetição de versos e gestos simbólicos. Benefício: Facilita a expressão de sentimentos por meio de metáforas.</li>
          <li><strong>"O Caderno" (Toquinho)</strong> - Letra simples sobre rotinas e emoções. Benefício: Estimula a identificação de emoções cotidianas.</li>
        </ul>

        <h3 className="text-lg font-semibold">3. Músicas para Interação Social e Imitação</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>"Galinha Pintadinha" (Pintinho Amarelinho)</strong> - Repetição de sons e coreografias. Benefício: Promove imitação e engajamento em grupo.</li>
          <li><strong>"Ciranda Cirandinha" (Tradicional)</strong> - Atividade em roda com movimentos coletivos. Benefício: Fortalece a socialização e a reciprocidade.</li>
          <li><strong>"Parabéns do Bita" (Mundo Bita)</strong> - Celebração com gestos de festa. Benefício: Trabalha interação em contextos sociais estruturados.</li>
        </ul>

        <h3 className="text-lg font-semibold">4. Músicas para Estímulo Sensorial e Atenção</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>"Voa Voa Passarinho" (Mundo Bita)</strong> - Imitação de voo com sons suaves. Benefício: Estimula a atenção auditiva e visual.</li>
          <li><strong>"A Linda Rosa Juvenil" (Tradicional)</strong> - Variações de volume e dinâmica. Benefício: Auxilia na modulação sensorial (hiper/hipossensibilidade).</li>
          <li><strong>"Cai Cai Balão" (Tradicional)</strong> - Contagem e movimento descendente. Benefício: Desenvolve foco e sequenciamento lógico.</li>
        </ul>

        <h3 className="text-lg font-semibold">5. Músicas para Relaxamento e Regulação</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>"Canção pro Universo" (Mundo Bita)</strong> - Melodia calmante com temas cósmicos. Benefício: Reduz ansiedade e prepara para momentos de transição.</li>
          <li><strong>"Dorme João" (Tradicional)</strong> - Ritmo lento e repetitivo. Benefício: Ajuda na autorregulação emocional.</li>
        </ul>

        <h3 className="text-lg font-semibold">6. Músicas Adaptáveis para Improvisação</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>"Uni-Duni-Tê" (Trem da Alegria)</strong> - Estrutura simples para escolhas e sequências. Benefício: Incentiva a tomada de decisão e a criatividade.</li>
          <li><strong>"Se Essa Rua Fosse Minha" (Tradicional)</strong> - Versos abertos para adaptação de letras. Benefício: Facilita a expressão verbal e a improvisação.</li>
        </ul>
      </div>

      {/* Avaliação Emocional de Hawkins */}
      <EmotionalAssessment />
    </div>
  )
}
