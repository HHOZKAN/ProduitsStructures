"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { SimulationParams } from "@/app/page"

interface SimulatorFormProps {
  params: SimulationParams
  onParamsChange: (params: SimulationParams) => void
}

export function SimulatorForm({ params, onParamsChange }: SimulatorFormProps) {
  const updateParam = (key: keyof SimulationParams, value: any) => {
    onParamsChange({ ...params, [key]: value })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Configuration du Produit
            <Badge variant="outline">Simulation</Badge>
          </CardTitle>
          <CardDescription>Ajustez les paramètres pour simuler différents produits structurés</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sous-jacent */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="underlying">Indice de Référence</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>L'actif dont dépend la performance du produit structuré</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select value={params.underlying} onValueChange={(value) => updateParam("underlying", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUROSTOXX50">DJ EuroStoxx 50</SelectItem>
                <SelectItem value="CAC40">CAC 40</SelectItem>
                <SelectItem value="SP500">S&P 500</SelectItem>
                <SelectItem value="NIKKEI">Nikkei 225</SelectItem>
                <SelectItem value="CUSTOM">Panier d'actions personnalisé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Capital Initial */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="capital">Capital Initial</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Montant que vous souhaitez investir</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="capital"
              type="number"
              value={params.initialCapital}
              onChange={(e) => updateParam("initialCapital", Number(e.target.value))}
              min="10000"
              step="1000"
            />
            <p className="text-sm text-muted-foreground">{formatCurrency(params.initialCapital)}</p>
          </div>

          {/* Durée */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label>Durée d'Investissement</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Durée maximale de l'investissement. Il est recommandé de rester investi jusqu'au terme.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider
              value={[params.duration]}
              onValueChange={(value) => updateParam("duration", value[0])}
              min={3}
              max={12}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>3 ans</span>
              <span className="font-medium">{params.duration} ans</span>
              <span>12 ans</span>
            </div>
          </div>

          {/* Coupon */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label>Coupon Annuel</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pourcentage de performance espéré chaque année en cas de scénario favorable</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider
              value={[params.coupon]}
              onValueChange={(value) => updateParam("coupon", value[0])}
              min={3}
              max={12}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>3%</span>
              <span className="font-medium">{params.coupon}% par an</span>
              <span>12%</span>
            </div>
            <p className="text-sm text-green-600">
              Gain potentiel total : {(params.coupon * params.duration).toFixed(1)}%
            </p>
          </div>

          {/* Barrière de Protection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label>Barrière de Protection</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Niveau de baisse maximum de l'indice avant perte en capital</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider
              value={[params.barrier]}
              onValueChange={(value) => updateParam("barrier", value[0])}
              min={20}
              max={70}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>-20%</span>
              <span className="font-medium">-{params.barrier}%</span>
              <span>-70%</span>
            </div>
          </div>

          {/* Type de Protection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label>Type de Protection</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Capital garanti : remboursement intégral garanti
                    <br />
                    Capital protégé : protection jusqu'à la barrière
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <RadioGroup
              value={params.protectionType}
              onValueChange={(value: "guaranteed" | "protected") => updateParam("protectionType", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="guaranteed" id="guaranteed" />
                <Label htmlFor="guaranteed">Capital Garanti</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="protected" id="protected" />
                <Label htmlFor="protected">Capital Protégé</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Fréquence d'Observation */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Dates de Constatation</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fréquence des tests pour remboursement anticipé (autocall)</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select
              value={params.observationFrequency}
              onValueChange={(value: "annual" | "quarterly") => updateParam("observationFrequency", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Annuelle</SelectItem>
                <SelectItem value="quarterly">Trimestrielle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
