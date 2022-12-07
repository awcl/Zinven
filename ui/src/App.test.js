import { render, screen } from '@testing-library/react';
import App from './App';

test('renders', () => {
  render(<App />);
  const element = screen.getByText(/Zinventory/i);
  expect(element).toBeInTheDocument();
});
