import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react"
import type { SimulationParams, SimulationResult } from "@/app/page"

interface ScenarioResultsProps {
  results: SimulationResult
  params: SimulationParams
}

export function ScenarioResults({ results, params }: ScenarioResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`
  }

  const calculateReturn = (finalValue: number) => {
    return ((finalValue - params.initialCapital) / params.initialCapital) * 100
  }

  const scenarios = [
    {
      name: "Marché Haussier",
      description: "L'indice performe bien, remboursement anticipé probable",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      ...results.scenarios.bullish,
    },
    {
      name: "Marché Neutre",
      description: "L'indice reste stable, coupons versés progressivement",
      icon: Minus,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      ...results.scenarios.neutral,
    },
    {
      name: "Marché Baissier",
      description: "L'indice baisse mais reste au-dessus de la barrière",
      icon: TrendingDown,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      ...results.scenarios.bearish,
    },
    {
      name: "Krach Boursier",
      description: "L'indice chute sous la barrière de protection",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      ...results.scenarios.crash,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Résumé Global */}
      <Card>
        <CardHeader>
          <CardTitle>Résumé de la Simulation</CardTitle>
          <CardDescription>Analyse des performances potentielles de votre investissement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(results.expectedReturn)}</div>
              <div className="text-sm text-muted-foreground">Rendement Espéré</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{formatPercentage(results.breakEvenProbability)}</div>
              <div className="text-sm text-muted-foreground">Prob. de Gain</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(results.maxGain)}</div>
              <div className="text-sm text-muted-foreground">Gain Maximum</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{formatCurrency(results.maxLoss)}</div>
              <div className="text-sm text-muted-foreground">Perte Maximum</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scénarios Détaillés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((scenario, index) => {
          const Icon = scenario.icon
          const returnPercentage = calculateReturn(scenario.finalValue)

          return (
            <Card key={index} className={`${scenario.borderColor} border-2`}>
              <CardHeader className={`${scenario.bgColor} rounded-t-lg`}>
                <CardTitle className={`flex items-center gap-2 ${scenario.color}`}>
                  <Icon className="h-5 w-5" />
                  {scenario.name}
                </CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Probabilité</span>
                    <Badge variant="outline">{formatPercentage(scenario.probability)}</Badge>
                  </div>

                  <Progress value={scenario.probability * 100} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Valeur Finale</span>
                    <span className="font-bold">{formatCurrency(scenario.finalValue)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Rendement</span>
                    <span className={`font-bold ${returnPercentage >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {returnPercentage >= 0 ? "+" : ""}
                      {returnPercentage.toFixed(1)}%
                    </span>
                  </div>

                  {scenario.earlyExit && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Sortie Anticipée</span>
                      <Badge variant="secondary">Année {scenario.earlyExit}</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
