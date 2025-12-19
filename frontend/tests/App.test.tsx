import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders welcome heading', () => {
    render(<App />);
    const heading = screen.getByText(/PDPw/i);
    expect(heading).toBeInTheDocument();
  });
});
