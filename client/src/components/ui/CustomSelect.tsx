'use client'

import { Check, ChevronDown } from 'lucide-react'

import { Listbox } from '@headlessui/react'

import { cn } from '@/lib/utils/cn'

export type SelectOption<T extends string = string> = {
  value: T
  label: string
}

type Props<T extends string> = {
  value: T
  onChange: (value: T) => void
  options: SelectOption<T>[]
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const CustomSelect = <T extends string>({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  disabled = false,
  className,
}: Props<T>) => {
  const selected = options.find((option) => option.value === value)

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className={cn('relative min-w-40', className)}>
        <Listbox.Button className='flex w-full items-center justify-between gap-3 rounded-xl border border-black/10 bg-white/80 px-4 py-2.5 text-left text-sm text-black shadow-sm backdrop-blur-md transition hover:border-black/20 focus:outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50 dark:border-white/10 dark:bg-zinc-950/80 dark:text-white dark:hover:border-white/20'>
          <span className={cn('truncate', !selected && 'opacity-45')}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronDown className='h-4 w-4 shrink-0 opacity-45 transition group-data-open:rotate-180' />
        </Listbox.Button>

        <Listbox.Options
          anchor='bottom end'
          className='z-60 mt-2 min-w-[var(--button-width)] rounded-2xl border border-black/10 bg-white/95 p-1.5 text-sm text-black shadow-xl backdrop-blur-xl focus:outline-none dark:border-white/10 dark:bg-zinc-950/95 dark:text-white'
        >
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className='group flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition data-focus:bg-black/5 dark:data-focus:bg-white/10'
            >
              <span className='truncate'>{option.label}</span>
              <Check className='h-4 w-4 opacity-0 group-data-selected:opacity-100' />
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
