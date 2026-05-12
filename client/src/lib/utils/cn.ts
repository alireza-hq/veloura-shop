import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...items: any[]) => {
  return twMerge(clsx(items))
}
