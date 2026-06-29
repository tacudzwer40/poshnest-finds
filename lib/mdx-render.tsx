import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { products, type Product } from '@/content/products';

/**
 * Minimal MDX-ish renderer.
 *
 * Supports a small, deliberate subset of Markdown plus a custom
 * `<Product asin="B0..." title="..." tagline="..." category="..." price="..." />` JSX-like tag
 * that resolves to <ProductCard />. We deliberately don't pull in a full
 * MDX pipeline — it's overkill for curated editorial posts and keeps
 * the build tiny.
 *
 * Supported Markdown:
 *   - Headings: ## ### ####
 *   - Paragraphs
 *   - **bold**, *italic*, [text](url)
 *   - Unordered lists with `-`
 *   - Blockquotes with `>`
 *   - Inline `<Product asin="..." title="..." tagline="..." category="..." price="$.." />` on its own line
 */

type InlineToken =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'italic'; value: string }
  | { type: 'link'; text: string; href: string };

function parseInline(line: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let i = 0;
  let buf = '';
  const flush = () => {
    if (buf) {
      tokens.push({ type: 'text', value: buf });
      buf = '';
    }
  };

  while (i < line.length) {
    // link [text](href)
    const linkMatch = line.slice(i).match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      flush();
      tokens.push({ type: 'link', text: linkMatch[1], href: linkMatch[2] });
      i += linkMatch[0].length;
      continue;
    }
    // bold **text**
    const boldMatch = line.slice(i).match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      flush();
      tokens.push({ type: 'bold', value: boldMatch[1] });
      i += boldMatch[0].length;
      continue;
    }
    // italic *text*
    const italicMatch = line.slice(i).match(/^\*([^*]+)\*/);
    if (italicMatch) {
      flush();
      tokens.push({ type: 'italic', value: italicMatch[1] });
      i += italicMatch[0].length;
      continue;
    }
    buf += line[i];
    i++;
  }
  flush();
  return tokens;
}

function renderInline(tokens: InlineToken[], keyPrefix: string) {
  return tokens.map((t, idx) => {
    const key = `${keyPrefix}-${idx}`;
    if (t.type === 'bold') return <strong key={key}>{t.value}</strong>;
    if (t.type === 'italic') return <em key={key}>{t.value}</em>;
    if (t.type === 'link') {
      const isExternal = /^https?:\/\//.test(t.href);
      if (isExternal) {
        return (
          <a key={key} href={t.href} target="_blank" rel="sponsored noopener noreferrer">
            {t.text}
          </a>
        );
      }
      return (
        <Link key={key} href={t.href}>
          {t.text}
        </Link>
      );
    }
    return <span key={key}>{t.value}</span>;
  });
}

function findProductByAsin(asin: string): Product | undefined {
  return products.find((p) => p.asin === asin);
}

const productTagRegex =
  /^<Product\s+asin="([^"]+)"(?:\s+title="([^"]*)")?(?:\s+tagline="([^"]*)")?(?:\s+category="([^"]*)")?(?:\s+price="([^"]*)")?\s*\/>$/;

export function RenderMdx({ content }: { content: string }) {
  // Normalise line endings
  const src = content.replace(/\r\n/g, '\n').trim();
  const lines = src.split('\n');

  type Block =
    | { kind: 'h2'; text: string }
    | { kind: 'h3'; text: string }
    | { kind: 'p'; lines: string[] }
    | { kind: 'ul'; items: string[] }
    | { kind: 'quote'; text: string }
    | { kind: 'product'; asin: string; title?: string; tagline?: string; category?: string; price?: string };

  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();

    if (line.trim() === '') {
      i++;
      continue;
    }

    // Headings
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
      // Treat single # as h2 for posts
      blocks.push({ kind: 'h2', text: line.slice(2) });
      i++;
      continue;
    }

    // Product tag
    const pm = line.match(productTagRegex);
    if (pm) {
      blocks.push({
        kind: 'product',
        asin: pm[1],
        title: pm[2],
        tagline: pm[3],
        category: pm[4],
        price: pm[5],
      });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      blocks.push({ kind: 'quote', text: line.slice(2) });
      i++;
      continue;
    }

    // Unordered list
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ kind: 'ul', items });
      continue;
    }

    // Paragraph: gather contiguous non-empty, non-special lines
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
                {renderInline(
                  parseInline(block.lines.join(' ')),
                  key,
                )}
              </p>
            );
          case 'ul':
            return (
              <ul key={key}>
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{renderInline(parseInline(item), `${key}-${j}`)}</li>
                ))}
              </ul>
            );
          case 'quote':
            return <blockquote key={key}>{renderInline(parseInline(block.text), key)}</blockquote>;
          case 'product': {
            // Prefer full product from the catalog; fall back to inline attrs
            const catalog = findProductByAsin(block.asin);
            const raw: Product = catalog ?? {
              asin: block.asin,
              title: block.title ?? 'Featured piece',
              tagline: block.tagline ?? '',
              category: (block.category as Product['category']) ?? 'Decor',
              price: block.price ?? '',
              image: '',
            };
            // `ProductCard` expects PublicProduct (image_url etc); map at the boundary.
            const product = {
              id: 0,
              asin: raw.asin,
              title: raw.title,
              tagline: raw.tagline,
              category: raw.category,
              price: raw.price,
              image_url: raw.image,
              is_active: true,
              position: 0,
            };
            // If catalog is missing, use a styled placeholder (no image)
            if (!catalog && !raw.image) {
              return (
                <div key={key} className="not-prose my-8">
                  <ProductCard product={product} compact />
                </div>
              );
            }
            return (
              <div key={key} className="not-prose my-8 max-w-sm">
                <ProductCard product={product} compact />
              </div>
            );
          }
        }
      })}
    </div>
  );
}
