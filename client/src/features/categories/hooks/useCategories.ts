'use client'

import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { getCategories } from '../services/categoryApi';
import { Category } from '../types';

export const useCategories = () =>
  useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
