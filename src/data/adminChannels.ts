import type { Status } from '../types';

export const adminChannels: Array<{
  id: string;
  name: string;
  description: string;
  category: string;
  owner: string;
  publications: number;
  lastUpdated: string;
  status: Status;
  audience: string;
  featured?: boolean;
  reach?: number;
  interactions?: number;
}> = [
  {
    id: 'c1',
    name: 'Comunicados Académicos',
    description: 'Avisos y comunicados oficiales de la academia.',
    category: 'Académicos',
    owner: 'Coordinación Académica',
    publications: 124,
    lastUpdated: '2026-05-01',
    status: 'activo',
    audience: 'Estudiantes, Docentes',
    featured: true,
    reach: 5600,
    interactions: 820
  },
  {
    id: 'c2',
    name: 'Becas y Apoyos',
    description: 'Convocatorias y resultados de becas.',
    category: 'Becas',
    owner: 'Departamento de Becas',
    publications: 42,
    lastUpdated: '2026-04-20',
    status: 'activo',
    audience: 'Estudiantes',
    featured: false,
    reach: 2100,
    interactions: 230
  },
  {
    id: 'c3',
    name: 'Cultura y Eventos',
    description: 'Eventos culturales y actividades estudiantiles.',
    category: 'Cultura',
    owner: 'Coordinación de Cultura',
    publications: 78,
    lastUpdated: '2026-05-10',
    status: 'pendiente',
    audience: 'Estudiantes, Comunidad',
    featured: false,
    reach: 3400,
    interactions: 410
  }
];
