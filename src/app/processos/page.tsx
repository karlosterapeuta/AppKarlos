'use client'

import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { 
  ClipboardDocumentListIcon, 
  ChartBarIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  UserIcon
} from '@heroicons/react/24/outline'

const processosFuncoes = [
  {
    id: 'anamnese',
    title: 'Anamnese',
    description: 'Cadastro de informações iniciais do paciente',
    icon: UserIcon,
    href: '/processos/anamnese',
  },
  {
    id: 'avaliacao',
    title: 'Avaliação',
    description: 'Avaliação inicial do paciente',
    icon: ClipboardDocumentListIcon,
    href: '/processos/avaliacao',
  },
  {
    id: 'plano',
    title: 'Plano Terapêutico',
    description: 'Definição de objetivos e metas',
    icon: DocumentTextIcon,
    href: '/processos/plano',
  },
  {
    id: 'intervencoes',
    title: 'Intervenções',
    description: 'Atividades musicoterapêuticas',
    icon: MusicalNoteIcon,
    href: '/processos/intervencoes',
  },
  {
    id: 'reavaliacao',
    title: 'Reavaliação',
    description: 'Acompanhamento do progresso',
    icon: ArrowPathIcon,
    href: '/processos/reavaliacao',
  },
  {
    id: 'relatorio',
    title: 'Relatórios',
    description: 'Gere relatórios detalhados sobre o progresso do paciente',
    icon: DocumentDuplicateIcon,
    href: '/processos/relatorios',
  }
]

export default function ProcessosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Logo size="md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processosFuncoes.map((funcao) => (
            <Link key={funcao.id} href={funcao.href}>
              <div className="rounded-lg border bg-white shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <funcao.icon className="h-6 w-6 text-purple-600 mr-2" />
                  <h2 className="text-xl font-semibold">{funcao.title}</h2>
                </div>
                <p className="text-gray-600">{funcao.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
