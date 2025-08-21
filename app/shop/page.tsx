"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Gem,
  Play,
  Crown,
  Shirt,
  Palette,
  Star,
  Gift,
  Timer,
  Shield,
  Zap
} from "lucide-react"
import { UserStatsDisplay } from "@/components/gamification/user-stats"
import { ProtectedRoute } from "@/auth/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useAuth } from "@/auth/auth-provider"
import { useEffect } from "react"

export default function ShopPage() {
  const { user, updateUser } = useAuth()
  const [watchingAd, setWatchingAd] = useState(false)
  const [lastDailyReward, setLastDailyReward] = useState<string | null>(null)

  const gems = user?.gems || 0

  useEffect(() => {
    const stored = localStorage.getItem('lastDailyReward')
    setLastDailyReward(stored)
  }, [])

  const canClaimDailyReward = () => {
    if (!lastDailyReward) return true
    const last = new Date(lastDailyReward)
    const now = new Date()
    const hoursDiff = (now.getTime() - last.getTime()) / (1000 * 60 * 60)
    return hoursDiff >= 24
  }

  const claimDailyReward = () => {
    if (canClaimDailyReward()) {
      const newGems = (user?.gems || 0) + 10
      updateUser({ gems: newGems })
      const now = new Date().toISOString()
      localStorage.setItem('lastDailyReward', now)
      setLastDailyReward(now)
    }
  }

  const handleWatchAd = () => {
    setWatchingAd(true)
    // Simulate ad watching
    setTimeout(() => {
      const newGems = (user?.gems || 0) + 5
      updateUser({ gems: newGems })
      setWatchingAd(false)
    }, 3000)
  }

  const purchaseItem = (cost: number) => {
    if (gems >= cost) {
      const newGems = gems - cost
      updateUser({ gems: newGems })
    }
  }

  // Generate daily shop items based on date
  const getDailyShopItems = () => {
    const today = new Date().toDateString()
    const seed = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0)

    const allItems = [
      { name: "Corona Dorada", description: "Muestra tu estatus real", icon: Crown, cost: 100, rarity: "legendary" },
      { name: "Camisa de Entrenamiento", description: "Para los atletas serios", icon: Shirt, cost: 50, rarity: "rare" },
      { name: "Tema Neón", description: "Colores vibrantes", icon: Palette, cost: 75, rarity: "epic" },
      { name: "Halo Celestial", description: "Brilla con luz divina", icon: Star, cost: 150, rarity: "legendary" },
      { name: "Camiseta Vintage", description: "Estilo retro", icon: Shirt, cost: 30, rarity: "common" },
      { name: "Tema Oscuro", description: "Para los nocturnos", icon: Palette, cost: 60, rarity: "rare" },
      { name: "Corona de Diamante", description: "El máximo lujo", icon: Crown, cost: 200, rarity: "legendary" },
      { name: "Uniforme Espacial", description: "Para explorar galaxias", icon: Shirt, cost: 90, rarity: "epic" }
    ]

    // Select 3 random items based on date seed
    const shuffled = allItems.sort(() => (seed % 2) - 0.5)
    return shuffled.slice(0, 3)
  }

  const getDailyPowerUps = () => {
    const today = new Date().toDateString()
    const seed = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0) + 100

    const allPowerUps = [
      { name: "Congelador de Racha (Tarea)", description: "Protege tu racha específica", icon: Timer, cost: 20, type: "streak_freeze_task" },
      { name: "Congelador de Racha (Día)", description: "Protege todas tus rachas", icon: Shield, cost: 35, type: "streak_freeze_day" },
      { name: "Boost de XP", description: "Duplica tu XP por 24h", icon: Zap, cost: 40, type: "xp_boost" },
      { name: "Multiplicador de Gemas", description: "x2 gemas por 12h", icon: Gem, cost: 45, type: "gem_multiplier" },
      { name: "Protección Total", description: "Inmunidad por 48h", icon: Shield, cost: 80, type: "total_protection" },
      { name: "Mega Boost XP", description: "x3 XP por 8h", icon: Zap, cost: 70, type: "mega_xp_boost" }
    ]

    const shuffled = allPowerUps.sort(() => (seed % 2) - 0.5)
    return shuffled.slice(0, 4)
  }

  const avatarItems = getDailyShopItems()
  const powerUps = getDailyPowerUps()

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-500 border-gray-500/20"
      case "rare": return "text-blue-500 border-blue-500/20"
      case "epic": return "text-purple-500 border-purple-500/20"
      case "legendary": return "text-yellow-500 border-yellow-500/20"
      default: return "text-gray-500 border-gray-500/20"
    }
  }

  return (
    <ProtectedRoute>
      <SidebarLayout
        breadcrumbs={[
          { label: "Tienda" }
        ]}
      >
        <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">🛒 Tienda</h1>
          <p className="text-muted-foreground">
            Personaliza tu experiencia y obtén ventajas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Gem className="w-5 h-5 text-blue-500" />
          <span className="text-2xl font-bold text-blue-500">{gems}</span>
        </div>
      </div>

      <UserStatsDisplay />

      {/* Sección de Anuncios */}
      <Card className="glow-card border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5 text-green-500" />
            Gana Gemas Gratis
          </CardTitle>
          <CardDescription>
            Ve anuncios para ganar gemas y apoyar a HealthMaxxing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">+5 Gemas por anuncio</p>
              <p className="text-sm text-muted-foreground">
                Disponible cada 15 minutos
              </p>
            </div>
            <Button 
              onClick={handleWatchAd} 
              disabled={watchingAd}
              className="bg-green-600 hover:bg-green-700"
            >
              {watchingAd ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Viendo...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Ver Anuncio
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="avatar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="avatar">Personalización</TabsTrigger>
          <TabsTrigger value="powerups">Power-ups</TabsTrigger>
        </TabsList>

        <TabsContent value="avatar" className="space-y-4">
          <div className="text-center mb-4 p-2 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">🔄 Objetos rotan cada 24 horas</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {avatarItems.map((item) => (
              <Card key={item.id} className={`glow-card ${getRarityColor(item.rarity)}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <item.icon className="w-8 h-8" />
                    <Badge variant="outline" className={getRarityColor(item.rarity)}>
                      {item.rarity}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Gem className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold">{item.cost}</span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => purchaseItem(item.cost)}
                      disabled={gems < item.cost}
                    >
                      Comprar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="powerups" className="space-y-4">
          <div className="text-center mb-4 p-2 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">⚡ Power-ups cambian diariamente</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {powerUps.map((item) => (
              <Card key={item.id} className="glow-card border-orange-500/20">
                <CardHeader>
                  <item.icon className="w-8 h-8 text-orange-500" />
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Gem className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold">{item.cost}</span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => purchaseItem(item.cost)}
                      disabled={gems < item.cost}
                    >
                      Comprar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Caja de regalo diaria */}
      <Card className="glow-card border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-500" />
            Recompensa Diaria
          </CardTitle>
          <CardDescription>
            Inicia sesión todos los días para obtener recompensas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">+10 Gemas</p>
              <p className="text-sm text-muted-foreground">
                {canClaimDailyReward() ? "¡Disponible ahora!" : "Ya reclamado hoy"}
              </p>
            </div>
            <Button
              onClick={claimDailyReward}
              disabled={!canClaimDailyReward()}
            >
              {canClaimDailyReward() ? "Reclamar" : "Reclamado"}
            </Button>
          </div>
        </CardContent>
      </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
