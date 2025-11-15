import './globals.css';

export const metadata = {
  title: 'Gerador de Prompt Perfeito',
  description: 'Crie prompts detalhados e consistentes em PT-BR com o comando "criar"',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
