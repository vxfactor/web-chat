import React from 'react';

// Define available OpenAI models
const availableModels = [
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'gpt-3.5-turbo-16k', name: 'GPT-3.5 Turbo (16K)' },
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
  { id: 'gpt-4-32k', name: 'GPT-4 (32K)' },
];

type ModelSelectorProps = {
  selectedModel: string;
  onSelect: (modelId: string) => void;
};

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onSelect }) => {
  return (
    <div className="flex justify-center items-center my-4">
      <label htmlFor="model-select" className="mr-2 text-gray-700">
        Select OpenAI Model:
      </label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => onSelect(e.target.value)}
        className="border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {availableModels.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;