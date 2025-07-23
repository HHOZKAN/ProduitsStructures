import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, TrendingDown, Building, Clock, DollarSign } from "lucide-react"

export function RiskWarnings() {
  const risks = [
    {
      id: "market",
      title: "Risque de Marché",
      icon: TrendingDown,
      severity: "high",
      description: "Risque de perte en capital si l'indice de référence chute sous la barrière de protection.",
      details: [
        "Perte proportionnelle à la baisse de l'indice sous la barrière",
        "Dans le pire des cas, perte totale du capital investi",
        "Performance plafonnée au niveau du coupon même si l'indice performe très bien",
      ],
      mitigation: [
        "Choisir une barrière de protection adaptée à votre tolérance au risque",
        "Diversifier sur plusieurs sous-jacents",
        "Analyser l'historique de volatilité de l'indice",
      ],
    },
    {
      id: "credit",
      title: "Risque de Crédit",
      icon: Building,
      severity: "medium",
      description: "Risque lié à la solvabilité de la banque émettrice du produit structuré.",
      details: [
        "En cas de faillite de l'émetteur, risque de perte totale",
        "Le produit structuré est un titre de créance, pas un dépôt garanti",
        "Pas de protection par le fonds de garantie des dépôts",
      ],
      mitigation: [
        "Choisir des émetteurs de très bonne qualité (rating AA ou AAA)",
        "Diversifier entre plusieurs émetteurs",
        "Surveiller l'évolution du rating de crédit",
      ],
    },
    {
      id: "liquidity",
      title: "Risque de Liquidité",
      icon: Clock,
      severity: "medium",
      description: "Difficulté à revendre le produit avant son échéance.",
      details: [
        "Marché secondaire limité ou inexistant",
        "Prix de rachat potentiellement défavorable",
        "Frais de sortie anticipée élevés",
      ],
      mitigation: [
        "Investir uniquement de l'argent dont vous n'avez pas besoin",
        "Respecter l'horizon d'investissement recommandé",
        "Prévoir une réserve de liquidité par ailleurs",
      ],
    },
    {
      id: "complexity",
      title: "Risque de Complexité",
      icon: AlertTriangle,
      severity: "medium",
      description: "Difficulté à comprendre tous les mécanismes du produit.",
      details: [
        "Formules de calcul complexes",
        "Multiples conditions et scénarios",
        "Documents légaux volumineux et techniques",
      ],
      mitigation: [
        "Se faire accompagner par un conseiller qualifié",
        "Utiliser des simulateurs comme celui-ci",
        "Poser toutes les questions avant d'investir",
      ],
    },
    {
      id: "currency",
      title: "Risque de Change",
      icon: DollarSign,
      severity: "low",
      description: "Impact des fluctuations de change si l'indice est en devise étrangère.",
      details: [
        "Exposition aux variations EUR/USD, EUR/JPY, etc.",
        "Peut amplifier ou réduire les gains/pertes",
        "Risque additionnel non lié à la performance de l'indice",
      ],
      mitigation: [
        "Privilégier les indices en euros quand c'est possible",
        "Comprendre l'exposition devise du produit",
        "Considérer la couverture de change si disponible",
      ],
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "high":
        return "Élevé"
      case "medium":
        return "Modéré"
      case "low":
        return "Faible"
      default:
        return "Non défini"
    }
  }

  return (
    <div className="space-y-6">
      {/* Avertissement Principal */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800">Avertissement Important</AlertTitle>
        <AlertDescription className="text-red-700">
          Les produits structurés sont des instruments financiers complexes qui présentent des risques de perte en
          capital. Il est essentiel de bien comprendre ces risques avant d'investir et de ne jamais investir plus que ce
          que vous pouvez vous permettre de perdre.
        </AlertDescription>
      </Alert>

      {/* Analyse Détaillée des Risques */}
      <div className="grid grid-cols-1 gap-6">
        {risks.map((risk) => {
          const Icon = risk.icon
          return (
            <Card key={risk.id} className="border-l-4 border-l-orange-400">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-orange-600" />
                    <span>{risk.title}</span>
                  </div>
                  <Badge className={getSeverityColor(risk.severity)}>Risque {getSeverityLabel(risk.severity)}</Badge>
                </CardTitle>
                <CardDescription>{risk.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-red-700">Impacts Potentiels :</h4>
                  <ul className="space-y-1">
                    {risk.details.map((detail, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-green-700">Mesures d'Atténuation :</h4>
                  <ul className="space-y-1">
                    {risk.mitigation.map((measure, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{measure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recommandations Générales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Recommandations Générales
          </CardTitle>
          <CardDescription>Conseils pour investir de manière responsable dans les produits structurés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-blue-700">Avant d'Investir :</h4>
              <ul className="space-y-2 text-sm">
                <li>• Évaluez votre tolérance au risque</li>
                <li>• Définissez votre horizon d'investissement</li>
                <li>• Lisez attentivement la documentation</li>
                <li>• Consultez un conseiller financier</li>
                <li>• Utilisez des simulateurs comme celui-ci</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-blue-700">Règles de Diversification :</h4>
              <ul className="space-y-2 text-sm">
                <li>• Maximum 25-30% du patrimoine financier</li>
                <li>• Diversifier les sous-jacents</li>
                <li>• Diversifier les émetteurs</li>
                <li>• Échelonner les échéances</li>
                <li>• Maintenir une réserve de liquidité</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mentions Légales */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>Avertissement :</strong> Ce simulateur est fourni à titre informatif et pédagogique uniquement. Les
            résultats présentés sont des estimations basées sur des hypothèses et ne constituent pas une garantie de
            performance future. Les produits structurés présentent des risques de perte en capital et leur valeur peut
            fluctuer. Il est recommandé de consulter un conseiller financier qualifié avant tout investissement. Les
            performances passées ne préjugent pas des performances futures.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
