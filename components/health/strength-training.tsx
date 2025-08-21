'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { 
  Dumbbell, 
  Clock, 
  Users, 
  Target, 
  Home, 
  TrendingUp,
  PlayCircle,
  Info,
  CheckCircle,
  Star,
  Calendar,
  Timer,
  Zap,
  Heart,
  Brain,
  AlertTriangle
} from 'lucide-react';

interface RoutineData {
  name: string;
  description: string;
  exercises: string[];
  variations: string[];
  sets: string;
  reps: string;
  sessionTime: string;
  frequency: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  homeAlternatives: string[];
  timeAdaptations: {
    short: string;
    long: string;
  };
  objectives: string[];
  benefits: string[];
  icon: string;
}

const routines: RoutineData[] = [
  {
    name: "Push-Pull-Leg (PPL)",
    description: "División clásica que separa músculos empujadores, jaladores y piernas",
    exercises: [
      "Push: Press banca, press militar, fondos, extensiones tríceps",
      "Pull: Dominadas, remo, curl bíceps, face pulls",
      "Leg: Sentadillas, peso muerto, prensa, curl femoral"
    ],
    variations: [
      "PPL tradicional (6 días)",
      "PPL de fuerza (5-6 reps)",
      "PPL de hipertrofia (8-12 reps)",
      "PPL con énfasis en debilidades"
    ],
    sets: "3-4 series",
    reps: "6-12 repeticiones",
    sessionTime: "60-90 minutos",
    frequency: "6 días/semana (2x cada grupo)",
    level: "Intermedio",
    homeAlternatives: [
      "Push: Flexiones, fondos en silla, press con bandas",
      "Pull: Dominadas en barra, remo con bandas, curl con bandas",
      "Leg: Sentadillas al aire, zancadas, peso muerto con bandas"
    ],
    timeAdaptations: {
      short: "30 min: 2-3 ejercicios por sesión, superseries",
      long: "90+ min: 5-6 ejercicios, trabajo accesorio extra"
    },
    objectives: ["Hipertrofia", "Fuerza", "Definición"],
    benefits: [
      "Alta frecuencia de entrenamiento",
      "Recuperación específica por grupo muscular",
      "Ideal para crecimiento muscular",
      "Flexibilidad en ejercicios"
    ],
    icon: "💪"
  },
  {
    name: "Upper-Lower",
    description: "División simple entre tren superior e inferior, ideal para balance",
    exercises: [
      "Upper: Press banca, remo, press militar, dominadas, curl, extensiones",
      "Lower: Sentadillas, peso muerto, prensa, curl femoral, gemelos"
    ],
    variations: [
      "Upper-Lower clásico (4 días)",
      "Upper-Lower de fuerza",
      "Upper-Lower con cardio",
      "Upper-Lower especializado"
    ],
    sets: "3-4 series",
    reps: "8-12 repeticiones",
    sessionTime: "60-75 minutos",
    frequency: "4 días/semana",
    level: "Intermedio",
    homeAlternatives: [
      "Upper: Flexiones, dominadas, fondos, remo con bandas",
      "Lower: Sentadillas, zancadas, peso muerto rumano, saltos"
    ],
    timeAdaptations: {
      short: "45 min: Ejercicios compuestos prioritarios",
      long: "90 min: Trabajo accesorio y especialización"
    },
    objectives: ["Equilibrio muscular", "Fuerza", "Masa muscular"],
    benefits: [
      "Balance perfecto trabajo/descanso",
      "Ideal para vida ocupada",
      "Permite recuperación completa",
      "Muy sostenible a largo plazo"
    ],
    icon: "⚖️"
  },
  {
    name: "Full-Body",
    description: "Entrenamiento completo del cuerpo en cada sesión",
    exercises: [
      "Sentadillas o prensa",
      "Press banca o flexiones",
      "Remo o dominadas",
      "Press militar",
      "Peso muerto o hip thrust"
    ],
    variations: [
      "Full-Body básico (3 días)",
      "Full-Body intensivo (5 días)",
      "Full-Body con superseries",
      "Full-Body funcional"
    ],
    sets: "2-3 series",
    reps: "8-15 repeticiones",
    sessionTime: "45-60 minutos",
    frequency: "3-4 días/semana",
    level: "Principiante",
    homeAlternatives: [
      "Sentadillas al aire",
      "Flexiones",
      "Remo con bandas",
      "Press militar con bandas",
      "Peso muerto con bandas"
    ],
    timeAdaptations: {
      short: "30 min: Ejercicios compuestos únicamente",
      long: "75 min: Trabajo accesorio y cardio"
    },
    objectives: ["Condición general", "Pérdida de peso", "Mantenimiento"],
    benefits: [
      "Máxima frecuencia de estímulo",
      "Ideal para principiantes",
      "Muy eficiente en tiempo",
      "Mejora coordinación general"
    ],
    icon: "🎯"
  },
  {
    name: "Arnold Split",
    description: "División avanzada de 6 días popularizada por Arnold Schwarzenegger",
    exercises: [
      "Día 1-4: Pecho/Espalda - Press banca, remo, aperturas, dominadas",
      "Día 2-5: Hombros/Brazos - Press militar, laterales, curl, extensiones",
      "Día 3-6: Piernas/Core - Sentadillas, peso muerto, prensa, abdominales"
    ],
    variations: [
      "Arnold clásico (6 días)",
      "Arnold modificado (5 días)",
      "Arnold con énfasis en débiles",
      "Arnold de definición"
    ],
    sets: "4-5 series",
    reps: "8-15 repeticiones",
    sessionTime: "75-90 minutos",
    frequency: "6 días/semana",
    level: "Avanzado",
    homeAlternatives: [
      "Flexiones variadas + remo con bandas",
      "Press con bandas + curl/extensiones",
      "Sentadillas + peso muerto con bandas + plancha"
    ],
    timeAdaptations: {
      short: "60 min: Ejercicios básicos únicamente",
      long: "120 min: Alto volumen y trabajo de detalle"
    },
    objectives: ["Máxima hipertrofia", "Simetría", "Competición"],
    benefits: [
      "Máximo volumen por grupo muscular",
      "Ideal para culturismo",
      "Trabajo de simetría",
      "Especialización muscular"
    ],
    icon: "🏆"
  }
];

const userProfiles = [
  {
    title: "Principiante (0-6 meses)",
    recommendations: ["Full-Body 3x/semana", "Upper-Lower 4x/semana"],
    time: "3-4 horas/semana",
    focus: "Aprender técnica, crear hábito, fuerza base"
  },
  {
    title: "Intermedio (6-24 meses)",
    recommendations: ["PPL 6x/semana", "Upper-Lower 4-5x/semana"],
    time: "4-6 horas/semana",
    focus: "Hipertrofia, especialización, corrección debilidades"
  },
  {
    title: "Avanzado (2+ años)",
    recommendations: ["Arnold Split", "PPL especializado", "Rutinas personalizadas"],
    time: "6-8 horas/semana",
    focus: "Perfeccionamiento, competición, objetivos específicos"
  }
];

const strengthMyths = [
  {
    myth: "Full-Body no sirve para hipertrofia",
    reality: "Full-Body puede ser muy efectivo para hipertrofia con la frecuencia y volumen adecuados",
    explanation: "La clave está en el volumen total semanal, no en cómo se distribuye"
  },
  {
    myth: "Más días = mejores resultados",
    reality: "La recuperación es tan importante como el entrenamiento",
    explanation: "El músculo crece durante el descanso, no durante el entrenamiento"
  },
  {
    myth: "Las mujeres deben entrenar diferente",
    reality: "Los principios básicos son iguales para todos",
    explanation: "Las diferencias hormonales afectan la velocidad, no los métodos de entrenamiento"
  }
];

export default function StrengthTraining() {
  const [selectedRoutine, setSelectedRoutine] = useState<RoutineData | null>(null);
  const [showExerciseGuide, setShowExerciseGuide] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Dumbbell className="w-8 h-8 text-primary" />
          Entrenamiento de Fuerza
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Desarrolla músculo, fuerza y resistencia con planes científicamente diseñados para todos los niveles
        </p>
      </div>

      {/* Benefits Overview */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">🏆 Beneficios del Entrenamiento de Fuerza</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-red-500 mt-0.5" />
              <div>
                <div className="font-medium">Salud Mental</div>
                <div className="text-muted-foreground">Reduce ansiedad, aumenta autoestima y mejora estado de ánimo</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-blue-500 mt-0.5" />
              <div>
                <div className="font-medium">Salud Emocional</div>
                <div className="text-muted-foreground">Desarrolla constancia, disciplina y resiliencia mental</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Salud Social</div>
                <div className="text-muted-foreground">Entrenar acompañado refuerza vínculos y crea comunidad</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="routines" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="routines">Rutinas</TabsTrigger>
          <TabsTrigger value="profiles">Perfiles</TabsTrigger>
          <TabsTrigger value="education">Educación</TabsTrigger>
          <TabsTrigger value="exercises">Ejercicios</TabsTrigger>
        </TabsList>

        {/* Routines Tab */}
        <TabsContent value="routines" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {routines.map((routine, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedRoutine(routine)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{routine.icon}</span>
                      {routine.name}
                    </CardTitle>
                    <Badge variant={
                      routine.level === 'Principiante' ? 'default' :
                      routine.level === 'Intermedio' ? 'secondary' : 'destructive'
                    }>
                      {routine.level}
                    </Badge>
                  </div>
                  <CardDescription>{routine.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{routine.sessionTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{routine.frequency}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {routine.objectives.slice(0, 2).map((obj, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {obj}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Profiles Tab */}
        <TabsContent value="profiles" className="space-y-4">
          <div className="space-y-4">
            {userProfiles.map((profile, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    {profile.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Rutinas Recomendadas</h4>
                      <ul className="text-sm space-y-1">
                        {profile.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Tiempo Semanal</h4>
                      <p className="text-sm text-muted-foreground">{profile.time}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Enfoque Principal</h4>
                      <p className="text-sm text-muted-foreground">{profile.focus}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Example Case */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">📖 Caso de Ejemplo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-blue-700">
                <p className="font-medium">Ana, 28 años, principiante con poco tiempo</p>
                <p className="text-sm mt-2">
                  <strong>Situación:</strong> Trabaja 8 horas, puede entrenar 3 días/semana máximo<br/>
                  <strong>Recomendación:</strong> Full-Body 3x/semana, 45 minutos<br/>
                  <strong>Progresión:</strong> Después de 6 meses, cambiar a Upper-Lower 4x/semana
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Mitos Comunes sobre Entrenamiento de Fuerza
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {strengthMyths.map((item, index) => (
                  <AccordionItem key={index} value={`myth-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div>
                        <div className="text-red-600 font-medium">❌ Mito: {item.myth}</div>
                        <div className="text-green-600 text-sm">✅ Realidad: {item.reality}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{item.explanation}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Key Principles */}
          <Card>
            <CardHeader>
              <CardTitle>🔑 Principios Fundamentales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">1. Sobrecarga Progresiva</h4>
                    <p className="text-sm text-muted-foreground">
                      Aumenta gradualmente peso, repeticiones o series para seguir progresando
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">2. Especificidad</h4>
                    <p className="text-sm text-muted-foreground">
                      Entrena según tu objetivo: fuerza (1-5 reps), hipertrofia (6-12 reps), resistencia (12+ reps)
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">3. Recuperación</h4>
                    <p className="text-sm text-muted-foreground">
                      El músculo crece durante el descanso, no durante el entrenamiento
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">4. Consistencia</h4>
                    <p className="text-sm text-muted-foreground">
                      Mejor entrenar 3 días consistentes que 6 días esporádicos
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exercises Tab */}
        <TabsContent value="exercises" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Guía Visual de Ejercicios
              </CardTitle>
              <CardDescription>
                Aprende la técnica correcta y evita lesiones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowExerciseGuide(true)} className="w-full">
                <PlayCircle className="w-4 h-4 mr-2" />
                Ver Guía de Ejercicios
              </Button>
              
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">⚠️ Tips de Seguridad</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Siempre calienta antes de entrenar</li>
                  <li>• Aprende la técnica antes de aumentar peso</li>
                  <li>• Usa un spotter en ejercicios pesados</li>
                  <li>• Escucha a tu cuerpo y descansa si hay dolor</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Routine Detail Modal */}
      {selectedRoutine && (
        <Dialog open={!!selectedRoutine} onOpenChange={() => setSelectedRoutine(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="text-2xl">{selectedRoutine.icon}</span>
                {selectedRoutine.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">{selectedRoutine.sessionTime}</div>
                  <div className="text-xs text-muted-foreground">Duración</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">{selectedRoutine.frequency}</div>
                  <div className="text-xs text-muted-foreground">Frecuencia</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Target className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">{selectedRoutine.level}</div>
                  <div className="text-xs text-muted-foreground">Nivel</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">{selectedRoutine.sets}</div>
                  <div className="text-xs text-muted-foreground">Series</div>
                </div>
              </div>

              {/* Detailed Content */}
              <Tabs defaultValue="exercises" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="exercises">Ejercicios</TabsTrigger>
                  <TabsTrigger value="variations">Variaciones</TabsTrigger>
                  <TabsTrigger value="home">En Casa</TabsTrigger>
                  <TabsTrigger value="benefits">Beneficios</TabsTrigger>
                </TabsList>

                <TabsContent value="exercises" className="space-y-3">
                  {selectedRoutine.exercises.map((exercise, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm">{exercise}</p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="variations" className="space-y-3">
                  {selectedRoutine.variations.map((variation, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <p className="text-sm">{variation}</p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="home" className="space-y-3">
                  {selectedRoutine.homeAlternatives.map((alt, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <Home className="w-4 h-4 text-green-600" />
                      <p className="text-sm">{alt}</p>
                    </div>
                  ))}
                  
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">⏱️ Adaptaciones por Tiempo</h4>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div><strong>30 min:</strong> {selectedRoutine.timeAdaptations.short}</div>
                      <div><strong>60+ min:</strong> {selectedRoutine.timeAdaptations.long}</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="benefits" className="space-y-3">
                  {selectedRoutine.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <p className="text-sm">{benefit}</p>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">🎯 Objetivos Principales</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoutine.objectives.map((obj, i) => (
                        <Badge key={i} variant="outline">{obj}</Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Exercise Guide Modal */}
      <Dialog open={showExerciseGuide} onOpenChange={setShowExerciseGuide}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>🎥 Guía Visual de Ejercicios</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <PlayCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-muted-foreground">
              Las animaciones y videos de ejercicios se añadirán en la próxima actualización
            </p>
            <Button variant="outline" className="mt-4" onClick={() => setShowExerciseGuide(false)}>
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
