interface Token {
  type: string
  content: string
  attr?: string
}


export const Component = (html: string): HTMLElement => {
  const obj = document.createElement('div');
  obj.insertAdjacentHTML('beforeend', parseHtmlString(html));
  return obj;
};

const parseHtmlString = (html: string): string => {
  const tokens = tokenize(html);
  const res = tokens.map((token) => {
    const attr = token.attr.replaceAll('}', '').replaceAll('{', '').replaceAll(';', '');
    if (token.attr.includes('onClick')) {
      if (token.attr.includes('id')) {
        return `<${token.type}${attr}>${token.content}</${token.type}>`;
      } else {
        const id = crypto.randomUUID();
        return `<${token.type}${attr} id="${id}">${token.content}</${token.type}>`;
      }
    } else {
      return `<${token.type}${attr}>${token.content}</${token.type}>`;
    }
  }).join('');
  console.log(res);
  return res;
};

const tokenize = (html: string): Token[] => {
  const src = html.split('');
  const tokens = new Array<Token>();

  while (src.length > 0) {
    const char = src.shift();
    if (char === '<') {
      let type = '';
      let attr = '';
      let content = '';
      
      while (src.length > 0 && src[0] !== '>' && src[0] !== ' ') {
        type += src.shift();
      }
      
      while (src.length > 0 && src[0] !== '>') {
        if (src[0] === '=') {
          attr += '=';
          src.shift();
        }
        attr += src.shift();
      }
      src.shift();

      while (src.length > 0 && src[0] !== '<' && src[1] !== '/') {
        content += src.shift();
      }
      if (!type.includes('/')) tokens.push({ type, attr, content });
    }
  }
  return tokens;
};


