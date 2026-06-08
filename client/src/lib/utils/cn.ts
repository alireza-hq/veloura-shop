import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...items: ClassValue[]) => {
  return twMerge(clsx(items))
}
