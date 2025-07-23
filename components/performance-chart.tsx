import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts"
import type { SimulationParams, SimulationResult } from "@/app/page"

interface PerformanceChartProps {
  params: SimulationParams
  results: SimulationResult
}

export function PerformanceChart({ params, results }: PerformanceChartProps) {
  // Génération des données pour le graphique
  const generateChartData = () => {
    const data = []
    const years = params.duration

    for (let year = 0; year <= years; year++) {
      const baseValue = params.initialCapital

      // Scénario haussier
      const bullishValue = year === 0 ? baseValue : baseValue * (1 + (params.coupon / 100) * year)

      // Scénario neutre
      const neutralValue = year === 0 ? baseValue : baseValue * (1 + (params.coupon / 100) * year * 0.8)

      // Scénario baissier
      const bearishValue =
        year === 0
          ? baseValue
          : year < years
            ? baseValue
            : params.protectionType === "guaranteed"
              ? baseValue
              : baseValue * Math.max(0.5, (100 - params.barrier) / 100)

      // Indice de référence simulé
      const indexValue = year === 0 ? 100 : 100 + ((Math.random() - 0.5) * 40 * year) / years

      data.push({
        year,
        bullish: Math.round(bullishValue),
        neutral: Math.round(neutralValue),
        bearish: Math.round(bearishValue),
        index: Math.round(indexValue),
        barrier: 100 - params.barrier,
      })
    }

    return data
  }

  const chartData = generateChartData()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Évolution du Capital */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution du Capital</CardTitle>
          <CardDescription>Projection de la valeur de votre investissement selon différents scénarios</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: "Années", position: "insideBottom", offset: -5 }} />
              <YAxis
                tickFormatter={formatCurrency}
                label={{ value: "Valeur (€)", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), ""]}
                labelFormatter={(year) => `Année ${year}`}
              />
              <Legend />
              <Line type="monotone" dataKey="bullish" stroke="#22c55e" strokeWidth={2} name="Scénario Haussier" />
              <Line type="monotone" dataKey="neutral" stroke="#3b82f6" strokeWidth={2} name="Scénario Neutre" />
              <Line type="monotone" dataKey="bearish" stroke="#ef4444" strokeWidth={2} name="Scénario Baissier" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance de l'Indice */}
      <Card>
        <CardHeader>
          <CardTitle>Indice de Référence</CardTitle>
          <CardDescription>
            Évolution simulée de l'indice {params.underlying} avec barrière de protection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: "Années", position: "insideBottom", offset: -5 }} />
              <YAxis label={{ value: "Indice (Base 100)", angle: -90, position: "insideLeft" }} />
              <Tooltip
                formatter={(value: number) => [value.toFixed(1), ""]}
                labelFormatter={(year) => `Année ${year}`}
              />
              <Legend />
              <Area type="monotone" dataKey="index" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="Indice" />
              <ReferenceLine
                y={100 - params.barrier}
                stroke="#ef4444"
                strokeDasharray="5 5"
                label="Barrière de Protection"
              />
              <ReferenceLine y={100} stroke="#22c55e" strokeDasharray="5 5" label="Niveau Initial" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
