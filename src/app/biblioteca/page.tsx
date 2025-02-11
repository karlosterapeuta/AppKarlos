import React from 'react'
import Card from '@/components/ui/Card'
import EmotionalAssessment from '@/components/hawkins/EmotionalAssessment'

export default function BibliotecaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Biblioteca de Recursos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Avaliação Emocional"
          description="Ferramenta para avaliação emocional dos pacientes"
        >
          <EmotionalAssessment />
        </Card>

        <Card
          title="Recursos Musicais"
          description="Biblioteca de músicas e instrumentos"
        >
          <div className="p-4">
            <p>Conteúdo em desenvolvimento</p>
          </div>
        </Card>

        <Card
          title="Documentos"
          description="Templates e documentos úteis"
        >
          <div className="p-4">
            <p>Conteúdo em desenvolvimento</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
