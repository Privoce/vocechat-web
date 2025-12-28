// @ts-ignore
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface PluginContext {
  eventEmitter: {
    listen: (event: string, handler: Function) => void;
  };
}

interface PluginInfo {
  toHTMLRenderers?: {
    [key: string]: (node: any) => any;
  };
}

/**
 * KaTeX plugin for Toast UI Editor
 * Renders LaTeX math expressions using KaTeX
 */
export default function katexPlugin(context: PluginContext): PluginInfo {
  const { eventEmitter } = context;

  // Listen for content changes to render math
  eventEmitter.listen('afterPreviewRender', () => {
    renderMathInElement();
  });

  return {
    toHTMLRenderers: {
      // Render inline math: $...$
      text(node: any) {
        const { literal } = node;
        if (!literal) return null;

        // Match inline math: $...$
        const inlineMathRegex = /\$([^\$]+)\$/g;
        let html = literal;
        
        html = html.replace(inlineMathRegex, (_match: string, math: string) => {
          try {
            return katex.renderToString(math, {
              throwOnError: false,
              displayMode: false,
            });
          } catch (e) {
            console.error('KaTeX inline rendering error:', e);
            return `$${math}$`;
          }
        });

        return {
          type: 'html',
          content: html,
        };
      },
      
      // Render block math: $$...$$
      codeBlock(node: any) {
        const { literal, info } = node;
        
        // Check if it's a math code block
        if (info === 'math' || info === 'latex') {
          try {
            const html = katex.renderToString(literal || '', {
              throwOnError: false,
              displayMode: true,
            });
            return [
              { type: 'openTag', tagName: 'div', classNames: ['math-block'] },
              { type: 'html', content: html },
              { type: 'closeTag', tagName: 'div' },
            ];
          } catch (e) {
            console.error('KaTeX block rendering error:', e);
            return null;
          }
        }
        
        return null;
      },
    },
  };
}

/**
 * Render math expressions in the preview element
 */
function renderMathInElement() {
  const previewElement = document.querySelector('.toastui-editor-contents');
  if (!previewElement) return;

  // Find all text nodes and render inline math
  const walker = document.createTreeWalker(
    previewElement,
    NodeFilter.SHOW_TEXT,
    null
  );

  const nodesToReplace: Array<{ node: Node; parent: Node; html: string }> = [];

  let node;
  while ((node = walker.nextNode())) {
    const text = node.textContent || '';
    
    // Skip if already processed or in code blocks
    const parent = node.parentElement;
    if (!parent || parent.tagName === 'CODE' || parent.tagName === 'PRE') {
      continue;
    }

    // Match display math: $$...$$
    const displayMathRegex = /\$\$([^\$]+)\$\$/g;
    let match;
    let hasDisplayMath = false;

    while ((match = displayMathRegex.exec(text)) !== null) {
      hasDisplayMath = true;
    }

    if (hasDisplayMath) {
      const html = text.replace(displayMathRegex, (_match, math) => {
        try {
          return katex.renderToString(math, {
            throwOnError: false,
            displayMode: true,
          });
        } catch (e) {
          console.error('KaTeX display rendering error:', e);
          return `$$${math}$$`;
        }
      });

      nodesToReplace.push({
        node,
        parent: parent,
        html,
      });
    }
  }

  // Replace nodes with rendered math
  nodesToReplace.forEach(({ node, parent, html }) => {
    const span = document.createElement('span');
    span.innerHTML = html;
    parent.replaceChild(span, node);
  });
}

