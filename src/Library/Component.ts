export const Component = (html: string): HTMLElement => {
  const obj = document.createElement('div');
  obj.insertAdjacentHTML('beforeend', html);
  return obj;
};
