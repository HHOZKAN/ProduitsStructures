import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { BookOpen, TrendingUp, Shield, Calendar, AlertCircle, Calculator } from "lucide-react"

export function EducationalContent() {
  const concepts = [
    {
      id: "basics",
      title: "Qu'est-ce qu'un Produit Structuré ?",
      icon: BookOpen,
      content: `Un produit structuré est un instrument financier qui combine une obligation (pour la protection du capital) avec des produits dérivés (pour le rendement). Il permet d'investir sur un sous-jacent (indice, action, panier d'actions) tout en bénéficiant d'une protection partielle ou totale du capital investi.

Les produits structurés sont conçus pour offrir un équilibre entre rendement potentiel et protection du capital, adapté aux investisseurs qui souhaitent participer à la performance des marchés financiers sans prendre tous les risques d'un investissement direct.`,
    },
    {
      id: "autocall",
      title: "Mécanisme d'Autocall",
      icon: TrendingUp,
      content: `L'autocall est un mécanisme de remboursement anticipé automatique. À chaque date d'observation (généralement annuelle), si l'indice de référence est au niveau ou au-dessus de son niveau initial, le produit est automatiquement remboursé.

L'investisseur récupère alors :
• Son capital initial
• Tous les coupons accumulés depuis le début
• Le produit se termine avant l'échéance

Ce mécanisme permet de sécuriser les gains en cas de performance favorable du marché et de réduire la durée d'exposition au risque.`,
    },
    {
      id: "protection",
      title: "Types de Protection",
      icon: Shield,
      content: `Il existe deux types principaux de protection :

**Capital Garanti :**
• La banque s'engage à rembourser 100% du capital initial
• Rendement généralement plus faible (3-5%)
• Aucun risque de perte en capital
• Adapté aux profils très conservateurs

**Capital Protégé :**
• Protection jusqu'à un certain niveau de baisse (ex: -50%)
• Rendement plus élevé (6-8%)
• Risque de perte si l'indice chute sous la barrière
• Équilibre entre protection et performance`,
    },
    {
      id: "observation",
      title: "Dates de Constatation",
      icon: Calendar,
      content: `Les dates de constatation sont les moments où le niveau de l'indice est vérifié pour déclencher :

**Remboursement Anticipé (Autocall) :**
• Si l'indice ≥ niveau initial → remboursement + coupons
• Fréquence : annuelle ou trimestrielle
• Plus la fréquence est élevée, plus les chances de sortie anticipée sont importantes

**À l'échéance :**
• Si pas de remboursement anticipé
• Vérification du niveau par rapport à la barrière
• Détermination du remboursement final`,
    },
    {
      id: "decrement",
      title: "Indices à Décrément",
      icon: Calculator,
      content: `Les indices à décrément sont des versions modifiées des indices classiques :

**Principe :**
• Un montant fixe (décrément) est soustrait chaque année
• Remplace le versement des dividendes réels
• Transfert du risque dividende vers l'investisseur

**Avantages :**
• Rendements supérieurs de 3-5%
• Barrières de protection plus basses
• Conditions d'autocall plus favorables

**Attention :**
• Vérifier que le décrément correspond aux dividendes historiques
• Risque si les dividendes réels sont inférieurs au décrément`,
    },
    {
      id: "risks",
      title: "Principaux Risques",
      icon: AlertCircle,
      content: `**Risque de Marché :**
• Perte en capital si l'indice chute sous la barrière
• Performance plafonnée au niveau du coupon

**Risque de Crédit :**
• Risque de défaut de la banque émettrice
• Choisir des émetteurs de qualité (rating élevé)

**Risque de Liquidité :**
• Difficile de sortir avant l'échéance
• Marché secondaire limité

**Risque de Change :**
• Si l'indice est en devise étrangère
• Impact des fluctuations de change`,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Guide des Produits Structurés</CardTitle>
          <CardDescription>
            Comprenez les concepts clés pour mieux appréhender ces instruments financiers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {concepts.map((concept) => {
              const Icon = concept.icon
              return (
                <AccordionItem key={concept.id} value={concept.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <span>{concept.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-4 prose prose-sm max-w-none">
                      {concept.content.split("\n").map((paragraph, index) => (
                        <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Conseils Pratiques */}
      <Card>
        <CardHeader>
          <CardTitle>Conseils d'Investissement</CardTitle>
          <CardDescription>Bonnes pratiques pour investir dans les produits structurés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">À Faire</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 text-xs">
                    ✓
                  </Badge>
                  <span>Diversifier les sous-jacents et émetteurs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 text-xs">
                    ✓
                  </Badge>
                  <span>Investir de l'argent dont vous n'avez pas besoin</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 text-xs">
                    ✓
                  </Badge>
                  <span>Rester investi jusqu'au terme</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 text-xs">
                    ✓
                  </Badge>
                  <span>Limiter à 25-30% de votre patrimoine</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">À Éviter</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 text-xs">
                    ✗
                  </Badge>
                  <span>Investir tout sur un seul produit</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 text-xs">
                    ✗
                  </Badge>
                  <span>Sortir prématurément sans raison valable</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 text-xs">
                    ✗
                  </Badge>
                  <span>Ignorer la qualité de l'émetteur</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 text-xs">
                    ✗
                  </Badge>
                  <span>Investir de l'argent nécessaire à court terme</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
