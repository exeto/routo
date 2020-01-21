type ClassName = string | null | undefined;

export const clsx = (...classNames: ClassName[]) =>
  classNames.filter(Boolean).join(' ');
