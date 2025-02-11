import React from 'react'

export default function EmotionalAssessment() {
  return (
    <div className="p-4">
      <h4 className="text-lg font-semibold mb-4">Avaliação Emocional</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado Emocional
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            defaultValue=""
          >
            <option value="" disabled>Selecione uma opção</option>
            <option value="calmo">Calmo</option>
            <option value="ansioso">Ansioso</option>
            <option value="irritado">Irritado</option>
            <option value="triste">Triste</option>
            <option value="alegre">Alegre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Intensidade
          </label>
          <input
            type="range"
            min="1"
            max="5"
            className="w-full"
            defaultValue="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Observações
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Digite suas observações aqui..."
          />
        </div>

        <button
          type="button"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Salvar Avaliação
        </button>
      </div>
    </div>
  )
}
