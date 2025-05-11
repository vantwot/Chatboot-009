import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModelSelector from './ModelSelector';

describe('ModelSelector Component', () => {
    const mockSetModel = jest.fn();

    beforeEach(() => {
        mockSetModel.mockClear();
    });

    test('renders all model options', () => {
        render(<ModelSelector model="🌟 Gemini" setModel={mockSetModel} />);
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(3);
        expect(options[0]).toHaveTextContent('🌟 GEMINI');
        expect(options[1]).toHaveTextContent('💬 CHATGPT');
        expect(options[2]).toHaveTextContent('🦙 LLAMA');
    });

    test('sets the correct initial value', () => {
        render(<ModelSelector model="💬 ChatGPT" setModel={mockSetModel} />);
        const select = screen.getByRole('combobox');
        expect(select.value).toBe('💬 ChatGPT');
    });

    test('calls setModel on change', () => {
        render(<ModelSelector model="🌟 Gemini" setModel={mockSetModel} />);
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: '🦙 LLaMA' } });
        expect(mockSetModel).toHaveBeenCalledWith('🦙 LLaMA');
    });

    test('applies correct styles to the select element', () => {
        render(<ModelSelector model="🌟 Gemini" setModel={mockSetModel} />);
        const select = screen.getByRole('combobox');
        expect(select).toHaveStyle({
            border: 'none',
            background: '#b71c1c',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
        });
    });
});