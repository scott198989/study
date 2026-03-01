import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

const diagramComponents: Record<string, ComponentType> = {
  figure_10_1: dynamic(() => import('@/components/diagrams/Figure10_1')),
  figure_10_2: dynamic(() => import('@/components/diagrams/Figure10_2')),
  figure_10_3: dynamic(() => import('@/components/diagrams/Figure10_3')),
  figure_10_4: dynamic(() => import('@/components/diagrams/Figure10_4')),
  figure_10_5: dynamic(() => import('@/components/diagrams/Figure10_5')),
  figure_10_6: dynamic(() => import('@/components/diagrams/Figure10_6')),
  figure_11_1: dynamic(() => import('@/components/diagrams/Figure11_1')),
  figure_11_2: dynamic(() => import('@/components/diagrams/Figure11_2')),
  figure_11_3: dynamic(() => import('@/components/diagrams/Figure11_3')),
  figure_11_4: dynamic(() => import('@/components/diagrams/Figure11_4')),
  figure_11_5: dynamic(() => import('@/components/diagrams/Figure11_5')),
  figure_11_6: dynamic(() => import('@/components/diagrams/Figure11_6')),
  figure_14_3: dynamic(() => import('@/components/diagrams/Figure14_3')),
}

export function getDiagram(ref: string): ComponentType | null {
  return diagramComponents[ref] || null
}
