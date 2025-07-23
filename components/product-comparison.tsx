"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import { Scatter, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts"
import { ChartContainer, ChartTooltipContent, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SimulatorForm } from "@/components/simulator-form"
import type { SimulationParams } from "@/app/page"

type RiskLevel = "low" | "medium" | "high"

interface Product {
  id: string
  name: string
  params: SimulationParams
  expectedReturn: number
  risk: RiskLevel
}

const defaultProductParams: SimulationParams = {
  underlying: "EUROSTOXX50",
  duration: 8,
  coupon: 5.5,
  barrier: 60,
  initialCapital: 100000,
  protectionType: "protected",
  observationFrequency: "annual",
}

export function ProductComparison() {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Autocall EuroStoxx 50 Conservateur", params: defaultProductParams, expectedReturn: 144000, risk: "low" },
    {
      id: "2",
      name: "Autocall CAC 40 Dynamique",
      params: {
        underlying: "CAC40",
        duration: 6,
        coupon: 8.0,
        barrier: 40,
        initialCapital: 100000,
        protectionType: "protected",
        observationFrequency: "quarterly",
      },
      expectedReturn: 148000,
      risk: "high",
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newProductParams, setNewProductParams] = useState<SimulationParams>(defaultProductParams)

  const handleAddProduct = () => {
    const { initialCapital, coupon, duration, barrier, underlying } = newProductParams

    // Simple risk calculation
    let risk: RiskLevel
    if (barrier > 55 && coupon < 7) {
      risk = "low"
    } else if (barrier < 45 || coupon > 9) {
      risk = "high"
    } else {
      risk = "medium"
    }

    const newProduct: Product = {
      id: new Date().toISOString(),
      name: `Autocall ${underlying} ${coupon}%`,
      params: newProductParams,
      // Simplified return calculation
      expectedReturn: initialCapital * (1 + (coupon / 100) * duration),
      risk,
    }

    setProducts([...products, newProduct])
    setIsDialogOpen(false)
    setNewProductParams(defaultProductParams) // Reset form for next time
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case "low":
        return "Faible"
      case "medium":
        return "Modéré"
      case "high":
        return "Élevé"
      default:
        return "Non défini"
    }
  }

  const getRiskHexColor = (risk: RiskLevel) => {
    switch (risk) {
      case "low":
        return "#10B981" // Green-500
      case "medium":
        return "#F59E0B" // Amber-500
      case "high":
        return "#EF4444" // Red-500
    }
  }

  const riskToNumber = (risk: RiskLevel) => {
    switch (risk) {
      case "low":
        return 1
      case "medium":
        return 2
      case "high":
        return 3
    }
  }

  const chartData = products.map((p) => ({
    name: p.name,
    return: p.expectedReturn,
    risk: riskToNumber(p.risk),
    riskLabel: getRiskLabel(p.risk),
    fill: getRiskHexColor(p.risk),
  }))

  const chartConfig = {
    return: {
      label: "Rendement",
    },
    faible: {
      label: "Faible",
      color: "#10B981",
    },
    modere: {
      label: "Modéré",
      color: "#F59E0B",
    },
    eleve: {
      label: "Élevé",
      color: "#EF4444",
    },
  } satisfies ChartConfig

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Comparaison de Produits</CardTitle>
          <CardDescription>
            Comparez différents produits structurés pour trouver celui qui correspond le mieux à votre profil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mb-4">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un Produit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                <DialogDescription>
                  Configurez les paramètres du produit structuré que vous souhaitez ajouter à la comparaison.
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto p-1">
                <SimulatorForm params={newProductParams} onParamsChange={setNewProductParams} />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddProduct}>Ajouter au comparateur</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Produit</th>
                  <th className="text-left p-4 font-medium">Sous-jacent</th>
                  <th className="text-left p-4 font-medium">Durée</th>
                  <th className="text-left p-4 font-medium">Coupon</th>
                  <th className="text-left p-4 font-medium">Protection</th>
                  <th className="text-left p-4 font-medium">Rendement Espéré</th>
                  <th className="text-left p-4 font-medium">Risque</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{product.name}</div>
                    </td>
                    <td className="p-4">{product.params.underlying}</td>
                    <td className="p-4">{product.params.duration} ans</td>
                    <td className="p-4">{product.params.coupon}%</td>
                    <td className="p-4">-{product.params.barrier}%</td>
                    <td className="p-4 font-medium text-green-600">{formatCurrency(product.expectedReturn)}</td>
                    <td className="p-4">
                      <Badge className={getRiskColor(product.risk)}>{getRiskLabel(product.risk)}</Badge>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Graphique de Comparaison */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse Rendement vs Risque</CardTitle>
          <CardDescription>Positionnement des produits selon leur profil risque/rendement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ScatterChart
                margin={{
                  top: 20,
                  right: 40,
                  bottom: 40,
                  left: 60,
                }}
              >
                <CartesianGrid />
                <XAxis
                  dataKey="risk"
                  type="number"
                  name="Risque"
                  domain={[0.5, 3.5]}
                  ticks={[1, 2, 3]}
                  tickFormatter={(value) => getRiskLabel(value === 1 ? "low" : value === 2 ? "medium" : "high")}
                  label={{ value: "Niveau de Risque", position: "insideBottom", offset: -25 }}
                />
                <YAxis
                  dataKey="return"
                  type="number"
                  name="Rendement Espéré"
                  tickFormatter={(value) => formatCurrency(value)}
                  label={{ value: "Rendement Espéré", angle: -90, position: "insideLeft", offset: -40 }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      formatter={(value, name, props) => (
                        <div>
                          <p className="font-medium">{props.payload.name}</p>
                          <p>Rendement: {formatCurrency(props.payload.return as number)}</p>
                          <p>Risque: {props.payload.riskLabel}</p>
                        </div>
                      )}
                    />
                  }
                />
                <Legend
                  content={
                    <ChartLegendContent
                      payload={[
                        { value: "faible", type: "circle", id: "faible", color: chartConfig.faible.color },
                        { value: "modere", type: "circle", id: "modere", color: chartConfig.modere.color },
                        { value: "eleve", type: "circle", id: "eleve", color: chartConfig.eleve.color },
                      ]}
                    />
                  }
                  verticalAlign="bottom"
                  wrapperStyle={{ paddingTop: 20 }}
                />
                <Scatter name="Produits" data={chartData}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
