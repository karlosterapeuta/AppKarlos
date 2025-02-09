'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

// Definição das áreas da escala TEA
const AREAS_AVALIACAO = {
  musicalidade: {
    titulo: 'Musicalidade',
    itens: [
      'Percepção Rítmica',
      'Percepção Melódica',
      'Expressão Musical',
      'Coordenação Sonoro-Motora',
      'Atenção Musical'
    ]
  },
  comunicacao: {
    titulo: 'Comunicação',
    itens: [
      'Comunicação Verbal',
      'Comunicação Não-Verbal',
      'Interação Musical',
      'Expressão Vocal',
      'Compreensão de Comandos'
    ]
  },
  interacaoSocial: {
    titulo: 'Interação Social',
    itens: [
      'Contato Visual',
      'Atenção Compartilhada',
      'Participação em Grupo',
      'Reciprocidade Social',
      'Imitação'
    ]
  },
  comportamento: {
    titulo: 'Comportamento',
    itens: [
      'Estereotipias',
      'Autorregulação',
      'Flexibilidade',
      'Interesse Musical',
      'Comportamento Adaptativo'
    ]
  }
} as const

// Escala de pontuação
const ESCALA_PONTUACAO = [
  { valor: 1, descricao: 'Ausente/Muito Baixo' },
  { valor: 2, descricao: 'Baixo/Emergente' },
  { valor: 3, descricao: 'Moderado' },
  { valor: 4, descricao: 'Adequado' },
  { valor: 5, descricao: 'Excelente' }
] as const

interface Area {
  titulo: string;
  itens: string[];
}

interface FormData {
  data: string;
  horario: string;
  paciente: string;
  dataNascimento: string;
  idade: string;
  responsavel: string;
  pontuacoes: {
    [key: string]: {
      [key: string]: number;
    };
  };
  observacoes: {
    [key: string]: string;
  };
  conclusaoGeral: string;
  recomendacoes: string;
  planejamentoTerapeutico: string;
}

interface Professional {
  nome: string;
  registro: string;
}

export default function EscalaTEA() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Informações Básicas
    data: new Date().toISOString().split('T')[0],
    horario: new Date().toLocaleTimeString().slice(0, 5),
    
    // Dados do Paciente
    paciente: '',
    dataNascimento: '',
    idade: '',
    responsavel: '',
    
    // Pontuações
    pontuacoes: {
      musicalidade: {
        'Percepção Rítmica': 3,
        'Percepção Melódica': 2,
        'Expressão Musical': 3,
        'Coordenação Sonoro-Motora': 2,
        'Atenção Musical': 3
      },
      comunicacao: {
        'Comunicação Verbal': 2,
        'Comunicação Não-Verbal': 3,
        'Interação Musical': 3,
        'Expressão Vocal': 2,
        'Compreensão de Comandos': 3
      },
      interacaoSocial: {
        'Contato Visual': 2,
        'Atenção Compartilhada': 2,
        'Participação em Grupo': 2,
        'Reciprocidade Social': 2,
        'Imitação': 3
      },
      comportamento: {
        'Estereotipias': 2,
        'Autorregulação': 2,
        'Flexibilidade': 2,
        'Interesse Musical': 4,
        'Comportamento Adaptativo': 3
      }
    },
    
    // Observações por área
    observacoes: {
      musicalidade: '',
      comunicacao: '',
      interacaoSocial: '',
      comportamento: ''
    },
    
    // Conclusões e Recomendações
    conclusaoGeral: '',
    recomendacoes: '',
    planejamentoTerapeutico: ''
  })

  // Estado para os dados do profissional
  const [profissional, setProfissional] = useState({
    nome: '',
    registro: ''
  })

  // Carrega os dados do profissional do localStorage
  useEffect(() => {
    const savedProfessional = localStorage.getItem('professional')
    if (savedProfessional) {
      setProfissional(JSON.parse(savedProfessional))
    }
  }, [])

  // Manipulador de mudanças nos campos
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Manipulador de mudanças nas pontuações
  const handlePontuacaoChange = (area: string, item: string, valor: number) => {
    setFormData(prev => ({
      ...prev,
      pontuacoes: {
        ...prev.pontuacoes,
        [area]: {
          ...prev.pontuacoes[area],
          [item]: valor
        }
      }
    }))
  }

  // Manipulador de mudanças nas observações
  const handleObservacaoChange = (area: string, valor: string) => {
    setFormData(prev => ({
      ...prev,
      observacoes: {
        ...prev.observacoes,
        [area]: valor
      }
    }))
  }

  // Função para calcular média de uma área
  const calcularMediaArea = (area: string): string => {
    const pontuacoes: number[] = Object.values(formData.pontuacoes[area])
    const soma: number = pontuacoes.reduce((acc: number, curr: number): number => acc + curr, 0)
    const media: number = soma / pontuacoes.length
    return media.toFixed(1)
  }

  // Função para gerar o PDF
  const generatePDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.width
    const margin = 20
    const contentWidth = pageWidth - (margin * 2)
    let y = margin

    // Função para adicionar texto
    const addText = (text: string, options: {
      x?: number,
      fontSize?: number,
      bold?: boolean,
      align?: 'left' | 'center',
      indent?: number
    } = {}) => {
      const {
        x = margin,
        fontSize = 12,
        bold = false,
        align = 'left',
        indent = 0
      } = options

      // Verifica se precisa de nova página
      if (y > 270) {
        doc.addPage()
        y = margin
      }

      doc.setFontSize(fontSize)
      doc.setFont('helvetica', bold ? 'bold' : 'normal')

      const lines = doc.splitTextToSize(text, contentWidth - indent)
      const xPos = align === 'center' ? pageWidth / 2 : x + indent

      doc.text(lines, xPos, y, { align })
      y += (lines.length * fontSize * 0.5) + 5
    }

    // Título
    addText('Escala de Avaliação TEA', {
      fontSize: 16,
      bold: true,
      align: 'center'
    })
    y += 10

    // Informações básicas
    addText(`Data: ${formData.data}    Horário: ${formData.horario}`)
    addText(`Paciente: ${formData.paciente}`)
    addText(`Data de Nascimento: ${formData.dataNascimento}    Idade: ${formData.idade}`)
    addText(`Responsável: ${formData.responsavel}`)
    y += 10

    // Função para adicionar seções
    const addSection = (title: string, content: string) => {
      addText(title, { bold: true })
      addText(content, { indent: 10 })
      y += 5
    }

    // Adiciona resultados por área
    Object.keys(AREAS_AVALIACAO).forEach(area => {
      const areaTitle = AREAS_AVALIACAO[area].titulo
      const pontuacoes = AREAS_AVALIACAO[area].itens.map(item => 
        `${item}: ${formData.pontuacoes[area][item]}`
      ).join('\n')
      
      addSection(`${areaTitle} (Média: ${calcularMediaArea(area)})`, pontuacoes)
      addSection(`Observações - ${areaTitle}`, formData.observacoes[area])
    })

    // Adiciona conclusões e recomendações
    addSection('Conclusão Geral', formData.conclusaoGeral)
    addSection('Recomendações', formData.recomendacoes)
    addSection('Planejamento Terapêutico', formData.planejamentoTerapeutico)

    // Adiciona assinatura do profissional
    y += 10
    const signatureLine = '_'.repeat(40)
    addText(signatureLine, { align: 'center' })
    addText(profissional.nome, { align: 'center' })
    addText(`Musicoterapeuta - MT ${profissional.registro}`, { align: 'center' })

    // Salva o PDF
    doc.save(`Escala_DEMUCA_${formData.data.replace(/\//g, '-')}_${formData.paciente}.pdf`)
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-8">
      <Card className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Escala DE Avaliação TEA</h1>

        <form className="space-y-4 sm:space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="w-full">
              <Label className="text-sm sm:text-base">Data</Label>
              <Input
                type="date"
                value={formData.data}
                onChange={(e) => handleInputChange('data', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Horário</Label>
              <Input
                type="time"
                value={formData.horario}
                onChange={(e) => handleInputChange('horario', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Dados do Paciente */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="w-full">
              <Label className="text-sm sm:text-base">Nome do Paciente</Label>
              <Input
                value={formData.paciente}
                onChange={(e) => handleInputChange('paciente', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Data de Nascimento</Label>
              <Input
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Idade</Label>
              <Input
                value={formData.idade}
                onChange={(e) => handleInputChange('idade', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label className="text-sm sm:text-base">Responsável</Label>
              <Input
                value={formData.responsavel}
                onChange={(e) => handleInputChange('responsavel', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Áreas de Avaliação */}
          {Object.entries(AREAS_AVALIACAO).map(([areaKey, area]) => (
            <div key={areaKey} className="space-y-3 sm:space-y-4 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg sm:text-xl font-semibold flex flex-col sm:flex-row sm:items-center gap-2">
                {area.titulo}
                <span className="text-sm font-normal text-gray-600">
                  (Média: {calcularMediaArea(areaKey)})
                </span>
              </h2>
              
              {/* Pontuações */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {area.itens.map(item => (
                  <div key={item} className="space-y-1">
                    <Label className="text-sm sm:text-base">{item}</Label>
                    <select
                      className="w-full p-2 border rounded text-sm sm:text-base bg-white"
                      value={formData.pontuacoes[areaKey][item]}
                      onChange={(e) => handlePontuacaoChange(areaKey, item, Number(e.target.value))}
                    >
                      {ESCALA_PONTUACAO.map(opcao => (
                        <option key={opcao.valor} value={opcao.valor}>
                          {opcao.valor} - {opcao.descricao}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Observações da área */}
              <div className="w-full">
                <Label className="text-sm sm:text-base">Observações - {area.titulo}</Label>
                <Textarea
                  value={formData.observacoes[areaKey]}
                  onChange={(e) => handleObservacaoChange(areaKey, e.target.value)}
                  rows={4}
                  className="w-full min-h-[100px] text-sm sm:text-base mt-1"
                />
              </div>
            </div>
          ))}

          {/* Conclusões e Recomendações */}
          <div className="space-y-3 sm:space-y-4">
            {[
              { label: 'Conclusão Geral', field: 'conclusaoGeral' },
              { label: 'Recomendações', field: 'recomendacoes' },
              { label: 'Planejamento Terapêutico', field: 'planejamentoTerapeutico' }
            ].map(({ label, field }) => (
              <div key={field} className="w-full">
                <Label className="text-sm sm:text-base">{label}</Label>
                <Textarea
                  value={formData[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  rows={4}
                  className="w-full min-h-[100px] text-sm sm:text-base mt-1"
                />
              </div>
            ))}
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={generatePDF}
              className="w-full sm:w-auto"
            >
              Gerar PDF
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
