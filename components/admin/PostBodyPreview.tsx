'use client';

/**
 * Lightweight client-side markdown preview used inside the admin post editor.
 * Mirrors the subset of formatting supported by RenderMdx (lib/mdx-render.tsx)
 * so authors see a faithful preview while typing. <Product asin="..." /> tags
 * are rendered as small placeholders; the full product card is shown on the
 * public site after the post is saved.
 */

const productTagRegex =
  /^<Product\s+asin="([^"]+)"(?:\s+title="([^"]*)")?(?:\s+tagline="([^"]*)")?(?:\s+category="([^"]*)")?(?:\s+price="([^"]*)")?\s*\/>$/;

type Block =
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'p'; lines: string[] }
  | { kind: 'ul'; items: string[] }
  | { kind: 'quote'; text: string }
  | { kind: 'product'; asin: string; title?: string; tagline?: string };

function parseInline(text: string): Array<
  | { kind: 'text'; value: string }
  | { kind: 'bold'; value: string }
  | { kind: 'italic'; value: string }
  | { kind: 'link'; value: string; href: string }
> {
  // Tokenise bold, italic, and links. Order matters: bold before italic.
  const tokens: Array<
    | { kind: 'text'; value: string }
    | { kind: 'bold'; value: string }
    | { kind: 'italic'; value: string }
    | { kind: 'link'; value: string; href: string }
  > = [];

  let i = 0;
  let buf = '';
  const flush = () => {
    if (buf) {
      tokens.push({ kind: 'text', value: buf });
      buf = '';
    }
  };

  while (i < text.length) {
    // Link [text](url)
    if (text[i] === '[') {
      const close = text.indexOf(']', i + 1);
      if (close > 0 && text[close + 1] === '(') {
        const urlEnd = text.indexOf(')', close + 2);
        if (urlEnd > 0) {
          flush();
          tokens.push({
            kind: 'link',
            value: text.slice(i + 1, close),
            href: text.slice(close + 2, urlEnd),
          });
          i = urlEnd + 1;
          continue;
        }
      }
    }
    // Bold **x**
    if (text[i] === '*' && text[i + 1] === '*') {
      const end = text.indexOf('**', i + 2);
      if (end > 0) {
        flush();
        tokens.push({ kind: 'bold', value: text.slice(i + 2, end) });
        i = end + 2;
        continue;
      }
    }
    // Italic *x*
    if (text[i] === '*') {
      const end = text.indexOf('*', i + 1);
      if (end > 0 && text[i + 1] !== ' ') {
        flush();
        tokens.push({ kind: 'italic', value: text.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    buf += text[i];
    i++;
  }
  flush();
  return tokens;
}

function renderInline(text: string, keyPrefix: string): React.ReactNode {
  const tokens = parseInline(text);
  return tokens.map((t, i) => {
    const key = `${keyPrefix}-i-${i}`;
    switch (t.kind) {
      case 'bold':
        return <strong key={key}>{t.value}</strong>;
      case 'italic':
        return <em key={key}>{t.value}</em>;
      case 'link': {
        const isExternal = /^https?:\/\//i.test(t.href);
        return isExternal ? (
          <a
            key={key}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta underline-offset-4 hover:underline"
          >
            {t.value}
          </a>
        ) : (
          <a
            key={key}
            href={t.href}
            className="text-terracotta underline-offset-4 hover:underline"
          >
            {t.value}
          </a>
        );
      }
      default:
        return <span key={key}>{t.value}</span>;
    }
  });
}

export function PostBodyPreview({ content }: { content: string }) {
  const src = content.replace(/\r\n/g, '\n').trim();
  if (!src) return null;
  const lines = src.split('\n');

  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trimEnd();
    if (line.trim() === '') {
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      blocks.push({ kind: 'h3', text: line.slice(4) });
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push({ kind: 'h2', text: line.slice(3) });
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      blocks.push({ kind: 'h2', text: line.slice(2) });
      i++;
      continue;
    }
    const pm = line.match(productTagRegex);
    if (pm) {
      blocks.push({
        kind: 'product',
        asin: pm[1],
        title: pm[2] || undefined,
        tagline: pm[3] || undefined,
      });
      i++;
      continue;
    }
    if (line.startsWith('> ')) {
      blocks.push({ kind: 'quote', text: line.slice(2) });
      i++;
      continue;
    }
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ kind: 'ul', items });
      continue;
    }
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].startsWith('> ') &&
      !productTagRegex.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({ kind: 'p', lines: paraLines });
  }

  return (
    <div className="prose-posh">
      {blocks.map((block, idx) => {
        const key = `b-${idx}`;
        switch (block.kind) {
          case 'h2':
            return <h2 key={key}>{block.text}</h2>;
          case 'h3':
            return <h3 key={key}>{block.text}</h3>;
          case 'p':
            return (
              <p key={key}>
                {renderInline(block.lines.join(' '), key)}
              </p>
            );
          case 'ul':
            return (
              <ul key={key}>
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
                ))}
              </ul>
            );
          case 'quote':
            return <blockquote key={key}>{renderInline(block.text, key)}</blockquote>;
          case 'product':
            return (
              <div
                key={key}
                className="not-prose my-8 p-4 rounded-xl border border-dashed border-espresso/15 bg-ivory/40"
              >
                <p className="text-xs uppercase tracking-widest text-espresso-soft">
                  Product preview
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-mono text-espresso-soft">{block.asin}</span>
                  {block.title && (
                    <span className="ml-2 text-espresso">{block.title}</span>
                  )}
                </p>
                {block.tagline && (
                  <p className="text-xs text-espresso-soft mt-1">{block.tagline}</p>
                )}
                <p className="mt-2 text-[11px] text-espresso-soft/70 italic">
                  The full product card (with image + price + Amazon link) renders on the public page after saving.
                </p>
              </div>
            );
        }
      })}
    </div>
  );
}