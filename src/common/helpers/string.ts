export function isWithoutSpace(value?: string): boolean {
  if (!value) {
    return true;
  }
  const hasSpace = /\s/.test(value);
  return !hasSpace;
}
