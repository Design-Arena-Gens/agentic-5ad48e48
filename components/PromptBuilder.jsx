"use client";
import { useMemo, useState } from "react";

const presetStyles = [
  "fotografia realista",
  "cinematogr?fico",
  "retr?/filme 35mm",
  "ilustra??o digital",
  "arte conceitual",
  "ultra-detalhado",
  "minimalista",
];

const aspectRatios = [
  "1:1 quadrado",
  "3:2 horizontal",
  "2:3 vertical",
  "16:9 widescreen",
  "9:16 vertical (stories)",
];

function buildPrompt(p) {
  const lines = [];
  lines.push(`COMANDO: criar com 100% das caracter?sticas e fidelidade ao briefing`);
  lines.push(``);
  lines.push(`Briefing detalhado (PT-BR):`);
  lines.push(
    `${p.subject} ? ${p.style}. Contexto: ${p.context}. Ambiente: ${p.environment}.`);
  lines.push(
    `Composi??o: ${p.composition}. Enquadramento: ${p.framing}. Perspectiva: ${p.perspective}.`);
  lines.push(`Luz: ${p.lighting}. Paleta: ${p.palette}. Texturas: ${p.textures}.`);
  if (p.references) {
    lines.push(`Refer?ncias visuais: ${p.references}`);
  }
  lines.push(``);
  lines.push(`Diretrizes t?cnicas:`);
  lines.push(
    `Qualidade: ${p.quality}. Resolu??o alvo: ${p.resolution}. Propor??o: ${p.ratio}.`);
  lines.push(
    `N?tidez e detalhe: ${p.sharpness}. Ru?do/gr?o: ${p.grain}. Cores: ${p.colorMode}.`);
  lines.push(
    `C?mera: ${p.camera}. Lente: ${p.lens}. Abertura/velocidade/ISO: ${p.exposure}.`);
  lines.push(``);
  lines.push(`Par?metros de IA (sugest?o):`);
  lines.push(
    `seed ${p.seed} | steps ${p.steps} | cfg ${p.cfg} | sampler ${p.sampler}`
  );
  if (p.negative) {
    lines.push(``);
    lines.push(`N?O INCLUIR (negative prompt): ${p.negative}`);
  }
  lines.push(``);
  lines.push(
    `Foco: consist?ncia de estilo e fidelidade total ?s caracter?sticas descritas (100%).`
  );
  return lines.join("\n");
}

export default function PromptBuilder() {
  const [state, setState] = useState({
    subject: "Retrato de uma pessoa sorrindo, pele natural, express?o aut?ntica",
    style: presetStyles[0],
    context: "tom editorial moderno",
    environment: "fundo suave desfocado (bokeh) em ambiente urbano",
    composition: "regra dos ter?os, linhas-guia sutis, equil?brio visual",
    framing: "plano m?dio (do busto para cima)",
    perspective: "olho no n?vel da c?mera",
    lighting: "luz suave difusa, temperatura levemente quente, realce controlado",
    palette: "tons quentes neutros com acentos suaves em azul",
    textures: "pele com poros sutis, tecido de algod?o, fundo granulado leve",
    references: "",
    quality: "ultra-alta, foco preciso, microdetalhes naturais",
    resolution: "2048px ou superior",
    ratio: aspectRatios[2],
    sharpness: "n?tido sem oversharpening",
    grain: "gr?o org?nico leve (se fotografia)",
    colorMode: "cores realistas com leve contraste",
    camera: "full-frame",
    lens: "85mm prime",
    exposure: "f/2.0 | 1/200s | ISO 200",
    seed: 42,
    steps: 30,
    cfg: 7,
    sampler: "DPM++ 2M Karras",
    negative: "pele de pl?stico, artefatos de IA, dedos extras, distor??es faciais, logotipos",
  });

  const prompt = useMemo(() => buildPrompt(state), [state]);

  function set(key, value) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(prompt);
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card grid" style={{ gap: 16 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="badge">PT-BR</div>
            <h1 style={{ margin: '8px 0 0 0' }}>Gerador de Prompt Perfeito</h1>
            <small className="muted">Inclui o <b>comando: criar</b> com 100% das caracter?sticas</small>
          </div>
          <button className="copy" onClick={copyToClipboard} title="Copiar prompt">
            <span>Copiar</span>
          </button>
        </div>

        <div className="grid grid-2">
          <div>
            <label className="label">Assunto</label>
            <input className="input" value={state.subject} onChange={e=>set('subject', e.target.value)} />
          </div>
          <div>
            <label className="label">Estilo</label>
            <select className="select" value={state.style} onChange={e=>set('style', e.target.value)}>
              {presetStyles.map(s=> <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Contexto</label>
            <input className="input" value={state.context} onChange={e=>set('context', e.target.value)} />
          </div>
          <div>
            <label className="label">Ambiente</label>
            <input className="input" value={state.environment} onChange={e=>set('environment', e.target.value)} />
          </div>
          <div>
            <label className="label">Composi??o</label>
            <input className="input" value={state.composition} onChange={e=>set('composition', e.target.value)} />
          </div>
          <div>
            <label className="label">Enquadramento</label>
            <input className="input" value={state.framing} onChange={e=>set('framing', e.target.value)} />
          </div>
          <div>
            <label className="label">Perspectiva</label>
            <input className="input" value={state.perspective} onChange={e=>set('perspective', e.target.value)} />
          </div>
          <div>
            <label className="label">Ilumina??o</label>
            <input className="input" value={state.lighting} onChange={e=>set('lighting', e.target.value)} />
          </div>
          <div>
            <label className="label">Paleta de cores</label>
            <input className="input" value={state.palette} onChange={e=>set('palette', e.target.value)} />
          </div>
          <div>
            <label className="label">Texturas</label>
            <input className="input" value={state.textures} onChange={e=>set('textures', e.target.value)} />
          </div>
          <div className="grid" style={{ gap: 8 }}>
            <label className="label">Refer?ncias (opcional)</label>
            <textarea className="textarea" value={state.references} onChange={e=>set('references', e.target.value)} placeholder="links, palavras-chave, artistas" />
          </div>
        </div>

        <hr />

        <div className="grid grid-2">
          <div>
            <label className="label">Qualidade</label>
            <input className="input" value={state.quality} onChange={e=>set('quality', e.target.value)} />
          </div>
          <div>
            <label className="label">Resolu??o</label>
            <input className="input" value={state.resolution} onChange={e=>set('resolution', e.target.value)} />
          </div>
          <div>
            <label className="label">Propor??o</label>
            <select className="select" value={state.ratio} onChange={e=>set('ratio', e.target.value)}>
              {aspectRatios.map(r=> <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="label">N?tidez</label>
            <input className="input" value={state.sharpness} onChange={e=>set('sharpness', e.target.value)} />
          </div>
          <div>
            <label className="label">Gr?o/Ru?do</label>
            <input className="input" value={state.grain} onChange={e=>set('grain', e.target.value)} />
          </div>
          <div>
            <label className="label">Modo de cor</label>
            <input className="input" value={state.colorMode} onChange={e=>set('colorMode', e.target.value)} />
          </div>
          <div>
            <label className="label">C?mera</label>
            <input className="input" value={state.camera} onChange={e=>set('camera', e.target.value)} />
          </div>
          <div>
            <label className="label">Lente</label>
            <input className="input" value={state.lens} onChange={e=>set('lens', e.target.value)} />
          </div>
          <div>
            <label className="label">Exposi??o</label>
            <input className="input" value={state.exposure} onChange={e=>set('exposure', e.target.value)} />
          </div>
        </div>

        <hr />

        <div className="grid grid-2">
          <div>
            <label className="label">Seed</label>
            <input className="input" type="number" value={state.seed} onChange={e=>set('seed', e.target.value)} />
          </div>
          <div>
            <label className="label">Steps</label>
            <input className="input" type="number" value={state.steps} onChange={e=>set('steps', e.target.value)} />
          </div>
          <div>
            <label className="label">CFG</label>
            <input className="input" type="number" step="0.5" value={state.cfg} onChange={e=>set('cfg', e.target.value)} />
          </div>
          <div>
            <label className="label">Sampler</label>
            <input className="input" value={state.sampler} onChange={e=>set('sampler', e.target.value)} />
          </div>
        </div>

        <div className="grid" style={{ gap: 8 }}>
          <label className="label">Negative prompt</label>
          <textarea className="textarea" value={state.negative} onChange={e=>set('negative', e.target.value)} />
        </div>

        <div className="row" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
          <button className="btn" onClick={copyToClipboard}>Gerar & Copiar</button>
        </div>
      </div>

      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0 }}>Prompt final</h3>
          <small className="muted">Use diretamente no seu gerador de imagens</small>
        </div>
        <pre className="mono" style={{ whiteSpace: 'pre-wrap' }}>{prompt}</pre>
      </div>
    </div>
  );
}
