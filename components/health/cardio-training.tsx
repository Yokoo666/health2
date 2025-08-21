'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  Heart, 
  Clock, 
  MapPin, 
  Trophy, 
  TrendingUp,
  Watch,
  Brain,
  Shield,
  AlertTriangle,
  Play,
  Users,
  Timer,
  Target,
  Zap
} from 'lucide-react';

interface CardioType {
  name: string;
  description: string;
  benefits: string[];
  intensity: 'Baja' | 'Moderada' | 'Alta';
  duration: string;
  examples: string[];
  zone: string;
  calories: string;
  icon: string;
}

const cardioTypes: CardioType[] = [
  {
    name: "Cardio de Baja Intensidad (LISS)",
    description: "Ejercicio aeróbico continuo a ritmo constante y moderado",
    benefits: [
      "Quema grasa de manera eficiente",
      "Mejora la resistencia cardiovascular",
      "Fácil de mantener y recuperarse",
      "Ideal para principiantes"
    ],
    intensity: "Baja",
    duration: "30-60 minutos",
    examples: ["Caminar rápido", "Trotar suave", "Bicicleta estática", "Elíptica"],
    zone: "60-70% FCM",
    calories: "200-400 kcal/hora",
    icon: "🚶"
  },
  {
    name: "Cardio de Alta Intensidad (HIIT)",
    description: "Intervalos cortos de alta intensidad alternados con descanso",
    benefits: [
      "Quema calorías hasta 24h después",
      "Mejora la capacidad anaeróbica",
      "Ahorra tiempo (20-30 min)",
      "Preserva masa muscular"
    ],
    intensity: "Alta",
    duration: "15-30 minutos",
    examples: ["Sprints", "Burpees", "Mountain climbers", "Bike intervals"],
    zone: "80-95% FCM",
    calories: "300-600 kcal/hora",
    icon: "⚡"
  },
  {
    name: "Cardio Moderado",
    description: "Zona intermedia que combina beneficios de LISS y HIIT",
    benefits: [
      "Balance entre eficiencia y sostenibilidad",
      "Mejora resistencia general",
      "Fácil de combinar con pesas",
      "Versátil para diferentes objetivos"
    ],
    intensity: "Moderada",
    duration: "20-45 minutos",
    examples: ["Correr moderado", "Natación", "Remo", "Cross-training"],
    zone: "70-80% FCM",
    calories: "250-500 kcal/hora",
    icon: "🏃"
  },
  {
    name: "Cardio Funcional",
    description: "Movimientos naturales que mejoran la capacidad funcional",
    benefits: [
      "Mejora coordinación y agilidad",
      "Fortalece músculos estabilizadores",
      "Reduce riesgo de lesiones",
      "Aplicable a la vida diaria"
    ],
    intensity: "Moderada",
    duration: "20-40 minutos",
    examples: ["Battle ropes", "Escalador", "Box jumps", "Circuitos funcionales"],
    zone: "65-85% FCM",
    calories: "300-550 kcal/hora",
    icon: "🤸"
  }
];

const cardioMyths = [
  {
    myth: "Cardio en ayunas quema más grasa",
    truth: "Lo importante es el déficit calórico total, no el momento",
    explanation: "Aunque uses más grasa como energía en ayunas, el efecto neto es similar si las calorías totales son iguales"
  },
  {
    myth: "Solo el cardio largo quema grasa",
    truth: "HIIT puede ser más efectivo para pérdida de grasa",
    explanation: "HIIT genera mayor gasto energético post-ejercicio y preserva mejor la masa muscular"
  },
  {
    myth: "Cardio y pesas no se pueden combinar",
    truth: "La combinación es óptima para salud general",
    explanation: "Cardio mejora la recuperación entre sesiones de pesas y potencia los beneficios cardiovasculares"
  }
];

const longevityBenefits = [
  "Reduce riesgo cardiovascular en 30-35%",
  "Mejora la función cerebral y memoria",
  "Fortalece el sistema inmunológico",
  "Reduce la inflamación crónica",
  "Mejora la calidad del sueño",
  "Aumenta la densidad ósea",
  "Reduce riesgo de diabetes tipo 2"
];

export default function CardioTraining() {
  const [selectedType, setSelectedType] = useState<CardioType | null>(null);
  const [showWearOSInfo, setShowWearOSInfo] = useState(false);

  const mockStats = {
    weeklyKm: 15.2,
    avgSession: 32,
    consistency: 85,
    rank: 127
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Activity className="w-8 h-8 text-red-500" />
          Ejercicios Cardiovasculares
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Mejora tu resistencia, salud cardiovascular y bienestar general con planes científicamente respaldados
        </p>
      </div>

      {/* Why Cardio */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-800">❤️ ¿Por qué es importante el cardio?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Beneficios Físicos</h4>
              <ul className="space-y-1 text-red-700">
                <li>• Fortalece el corazón y pulmones</li>
                <li>• Mejora la circulación sanguínea</li>
                <li>• Aumenta la capacidad pulmonar</li>
                <li>• Quema calorías y grasa corporal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Beneficios Mentales</h4>
              <ul className="space-y-1 text-red-700">
                <li>• Libera endorfinas (hormonas del bienestar)</li>
                <li>• Reduce estrés y ansiedad</li>
                <li>• Mejora el estado de ánimo</li>
                <li>• Aumenta la autoestima</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="types" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="types">Tipos</TabsTrigger>
          <TabsTrigger value="tracking">Seguimiento</TabsTrigger>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
          <TabsTrigger value="education">Educación</TabsTrigger>
          <TabsTrigger value="safety">Seguridad</TabsTrigger>
        </TabsList>

        {/* Types Tab */}
        <TabsContent value="types" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {cardioTypes.map((type, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedType(type)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{type.icon}</span>
                      {type.name}
                    </CardTitle>
                    <Badge variant={
                      type.intensity === 'Baja' ? 'default' :
                      type.intensity === 'Moderada' ? 'secondary' : 'destructive'
                    }>
                      {type.intensity}
                    </Badge>
                  </div>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{type.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span>{type.zone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>{type.calories}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Integration with Strength Training */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">🏋️ Combinando Cardio y Pesas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-700">
                <div>
                  <h4 className="font-medium mb-2">Objetivo: Pérdida de Grasa</h4>
                  <p>• Pesas 3-4x/semana<br/>• HIIT 2-3x/semana<br/>• LISS 1-2x/semana</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Objetivo: Masa Muscular</h4>
                  <p>• Pesas 4-5x/semana<br/>• Cardio moderado 2x/semana<br/>• Evitar exceso de HIIT</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Objetivo: Salud General</h4>
                  <p>• Pesas 3x/semana<br/>• Cardio variado 3x/semana<br/>• 150 min/semana mínimo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tracking Tab */}
        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Watch className="w-5 h-5" />
                Integración con Wear OS
              </CardTitle>
              <CardDescription>
                Conecta tu smartwatch para seguimiento automático
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button onClick={() => setShowWearOSInfo(true)} className="w-full">
                  <Watch className="w-4 h-4 mr-2" />
                  Conectar Dispositivo Wear OS
                </Button>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Heart className="w-5 h-5 mx-auto mb-1 text-red-500" />
                    <div className="text-sm font-medium">Frecuencia Cardíaca</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 mx-auto mb-1 text-green-500" />
                    <div className="text-sm font-medium">GPS & Rutas</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Zap className="w-5 h-5 mx-auto mb-1 text-yellow-500" />
                    <div className="text-sm font-medium">Calorías</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Timer className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                    <div className="text-sm font-medium">Tiempo</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Evolución del Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Resistencia Cardiovascular</span>
                    <span className="text-sm">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Velocidad Promedio</span>
                    <span className="text-sm">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Consistencia Semanal</span>
                    <span className="text-sm">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800">🤖 Recomendaciones de IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-purple-700">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 text-purple-600" />
                  <div>
                    <p className="font-medium">Mejora tu consistencia</p>
                    <p>Has faltado 2 días esta semana. Intenta sesiones más cortas pero frecuentes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 mt-0.5 text-purple-600" />
                  <div>
                    <p className="font-medium">Varía tu entrenamiento</p>
                    <p>Has hecho solo LISS. Agrega 1 sesión de HIIT para mejores resultados.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ranking Tab */}
        <TabsContent value="ranking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Tu Ranking de Cardio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">{mockStats.weeklyKm} km</div>
                  <div className="text-sm text-yellow-700">Esta semana</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{mockStats.avgSession} min</div>
                  <div className="text-sm text-blue-700">Sesión promedio</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{mockStats.consistency}%</div>
                  <div className="text-sm text-green-700">Consistencia</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">#{mockStats.rank}</div>
                  <div className="text-sm text-purple-700">Ranking global</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">🏆 Clasificación Semanal</h4>
                <div className="space-y-2">
                  {[
                    { name: "CardioMaster_2024", km: 45.2, badge: "🥇" },
                    { name: "RunnerLife", km: 38.7, badge: "🥈" },
                    { name: "FitnessGuru", km: 34.1, badge: "🥉" },
                    { name: "Tú (HealthMaxxer)", km: mockStats.weeklyKm, badge: "💪" },
                    { name: "ActiveLife2024", km: 12.8, badge: "" }
                  ].map((user, i) => (
                    <div key={i} className={`flex items-center justify-between p-2 rounded ${
                      user.name.includes('Tú') ? 'bg-primary/10 border border-primary/20' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{user.badge}</span>
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <span className="text-sm font-medium">{user.km} km</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-4">
          {/* Myths */}
          <Card>
            <CardHeader>
              <CardTitle>❌ Mitos y Verdades sobre Cardio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cardioMyths.map((myth, index) => (
                  <div key={index} className="border-l-4 border-red-500 pl-4">
                    <div className="text-red-600 font-medium">Mito: {myth.myth}</div>
                    <div className="text-green-600 font-medium">Verdad: {myth.truth}</div>
                    <div className="text-sm text-muted-foreground mt-1">{myth.explanation}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Longevity Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Cardio y Longevidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                El ejercicio cardiovascular regular es uno de los factores más importantes para la longevidad y calidad de vida:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {longevityBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Shield className="w-3 h-3 text-green-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mental Health Connection */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Cardio y Salud Mental
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-blue-700 space-y-2">
                <p><strong>Reducción de Ansiedad:</strong> 20-30 min de cardio pueden reducir ansiedad hasta 4 horas</p>
                <p><strong>Mejora del Estado de Ánimo:</strong> Libera endorfinas, serotonina y noradrenalina</p>
                <p><strong>Función Cerebral:</strong> Aumenta BDNF (factor neurotrófico), mejorando memoria y aprendizaje</p>
                <p><strong>Autoestima:</strong> Logros físicos se traducen en mayor confianza personal</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Safety Tab */}
        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Precauciones y Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">⚠️ Señales de Alarma - Detente Inmediatamente</h4>
                  <ul className="text-sm space-y-1 text-red-600">
                    <li>• Dolor en el pecho o dificultad para respirar</li>
                    <li>• Mareos, náuseas o dolor de cabeza severo</li>
                    <li>• Dolor articular agudo o muscular intenso</li>
                    <li>• Fatiga extrema o debilidad inusual</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">✅ Buenas Prácticas</h4>
                  <ul className="text-sm space-y-1 text-green-600">
                    <li>• Calentamiento 5-10 min antes de empezar</li>
                    <li>• Hidrátate antes, durante y después</li>
                    <li>• Usa calzado adecuado para tu tipo de pie</li>
                    <li>• Progresa gradualmente (regla del 10%)</li>
                    <li>• Escucha a tu cuerpo y descansa cuando sea necesario</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">🌡️ Consideraciones Ambientales</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-orange-600">Calor Extremo (&gt;30°C)</p>
                      <p>• Entrena temprano o tarde<br/>• Reduce intensidad<br/>• Hidrátate más</p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-600">Frío Extremo (&lt;0°C)</p>
                      <p>• Calentamiento más largo<br/>• Viste en capas<br/>• Protege extremidades</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Importante:</strong> Si experimentas síntomas graves durante el ejercicio, busca atención médica inmediata. 
              En caso de emergencia, llama al 112.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      {/* Wear OS Info Modal */}
      {showWearOSInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardHeader>
              <CardTitle>Integración Wear OS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                La integración con Wear OS estará disponible en la próxima actualización. 
                Permitirá seguimiento automático de:
              </p>
              <ul className="text-sm space-y-1">
                <li>• Frecuencia cardíaca en tiempo real</li>
                <li>• GPS y rutas de ejercicio</li>
                <li>• Calorías quemadas</li>
                <li>• Tiempo y distancia</li>
              </ul>
              <Button 
                className="w-full mt-4" 
                onClick={() => setShowWearOSInfo(false)}
              >
                Entendido
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
