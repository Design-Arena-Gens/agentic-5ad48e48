import PromptBuilder from "../components/PromptBuilder";

export default function Page() {
  return (
    <main>
      <div className="container">
        <PromptBuilder />
        <div className="footer">? {new Date().getFullYear()} Prompt Perfeito ? PT-BR</div>
      </div>
    </main>
  );
}
