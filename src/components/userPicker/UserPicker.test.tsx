/* @vitest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UserPicker from './UserPicker';

describe('UserPicker component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders input and clear button', () => {
    const onChange = vi.fn();
    render(React.createElement(UserPicker, { value: "", onChange } as any));
    expect(screen.getByPlaceholderText('Search by username...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('performs search and displays results', async () => {
    const onChange = vi.fn();
    const mockUsers = [{ id: 2, username: 'bob', avatarUrl: '/b.png' }];
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => mockUsers })) as any);

    render(React.createElement(UserPicker, { value: "", onChange } as any));

    const input = screen.getByPlaceholderText('Search by username...');
    fireEvent.change(input, { target: { value: 'bo' } });

    await waitFor(() => {
      expect(screen.getByText('bob')).toBeInTheDocument();
    });

    const item = screen.getByText('bob');
    fireEvent.click(item);

    expect(onChange).toHaveBeenCalledWith('2');
  });
});
