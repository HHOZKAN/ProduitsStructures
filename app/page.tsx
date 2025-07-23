"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimulatorForm } from "@/components/simulator-form"
import { PerformanceChart } from "@/components/performance-chart"
import { ScenarioResults } from "@/components/scenario-results"
import { ProductComparison } from "@/components/product-comparison"
import { EducationalContent } from "@/components/educational-content"
import { RiskWarnings } from "@/components/risk-warnings"

export interface SimulationParams {
  underlying: string
  duration: number
  coupon: number
  barrier: number
  initialCapital: number
  protectionType: "guaranteed" | "protected"
  observationFrequency: "annual" | "quarterly"
  decrementRate?: number
}

export interface SimulationResult {
  scenarios: {
    bullish: { finalValue: number; probability: number; earlyExit?: number }
    neutral: { finalValue: number; probability: number; earlyExit?: number }
    bearish: { finalValue: number; probability: number; earlyExit?: number }
    crash: { finalValue: number; probability: number; earlyExit?: number }
  }
  expectedReturn: number
  maxGain: number
  maxLoss: number
  breakEvenProbability: number
}

const defaultParams: SimulationParams = {
  underlying: "EUROSTOXX50",
  duration: 8,
  coupon: 6.5,
  barrier: 50,
  initialCapital: 100000,
  protectionType: "protected",
  observationFrequency: "annual",
  decrementRate: 0,
}

export default function Home() {
  const [params, setParams] = useState<SimulationParams>(defaultParams)
  const [results, setResults] = useState<SimulationResult | null>(null)

  const calculateSimulation = (params: SimulationParams): SimulationResult => {
    const { duration, coupon, barrier, initialCapital, protectionType } = params

    // Simulation simplifiée basée sur des probabilités historiques
    const scenarios = {
      bullish: {
        finalValue: initialCapital * (1 + (coupon / 100) * duration),
        probability: 0.35,
        earlyExit: Math.random() > 0.5 ? Math.floor(duration * 0.6) : undefined,
      },
      neutral: {
        finalValue: initialCapital * (1 + (coupon / 100) * duration * 0.8),
        probability: 0.4,
        earlyExit: Math.random() > 0.3 ? Math.floor(duration * 0.7) : undefined,
      },
      bearish: {
        finalValue:
          protectionType === "guaranteed" ? initialCapital : initialCapital * Math.max(0.5, (100 - barrier) / 100),
        probability: 0.2,
        earlyExit: undefined,
      },
      crash: {
        finalValue:
          protectionType === "guaranteed"
            ? initialCapital
            : initialCapital * Math.max(0.2, (100 - barrier * 1.5) / 100),
        probability: 0.05,
        earlyExit: undefined,
      },
    }

    const expectedReturn = Object.values(scenarios).reduce(
      (acc, scenario) => acc + scenario.finalValue * scenario.probability,
      0,
    )

    return {
      scenarios,
      expectedReturn,
      maxGain: scenarios.bullish.finalValue,
      maxLoss: Math.min(...Object.values(scenarios).map((s) => s.finalValue)),
      breakEvenProbability: scenarios.bullish.probability + scenarios.neutral.probability,
    }
  }

  useEffect(() => {
    setResults(calculateSimulation(params))
  }, [params])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simulateur de Produits Structurés</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprenez et visualisez la performance potentielle de vos investissements structurés en fonction de
            différents scénarios de marché
          </p>
        </div>

        <Tabs defaultValue="simulator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="simulator">Simulateur</TabsTrigger>
            <TabsTrigger value="comparison">Comparaison</TabsTrigger>
            <TabsTrigger value="education">Guide</TabsTrigger>
            <TabsTrigger value="risks">Risques</TabsTrigger>
          </TabsList>

          <TabsContent value="simulator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <SimulatorForm params={params} onParamsChange={setParams} />
              </div>

              <div className="lg:col-span-2 space-y-6">
                {results && (
                  <>
                    <PerformanceChart params={params} results={results} />
                    <ScenarioResults results={results} params={params} />
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <ProductComparison />
          </TabsContent>

          <TabsContent value="education">
            <EducationalContent />
          </TabsContent>

          <TabsContent value="risks">
            <RiskWarnings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
