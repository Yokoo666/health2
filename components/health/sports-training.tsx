'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Trophy, 
  Users, 
  Target, 
  Brain, 
  Heart, 
  Zap,
  Shield,
  Play,
  Timer,
  Activity,
  Eye,
  AlertTriangle
} from 'lucide-react';

interface SportData {
  name: string;
  icon: string;
  description: string;
  positions: Position[];
  tactics: Tactic[];
  benefits: string[];
  myths: Myth[];
  examples: Example[];
}

interface Position {
  name: string;
  focus: string;
  exercises: Exercise[];
}

interface Exercise {
  name: string;
  description: string;
  skill: string;
  duration: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
}

interface Tactic {
  name: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
}

interface Myth {
  myth: string;
  reality: string;
}

interface Example {
  title: string;
  description: string;
  player: string;
}

const footballData: SportData = {
  name: "Fútbol",
  icon: "⚽",
  description: "El deporte más popular del mundo, que combina técnica, táctica y resistencia física",
  positions: [
    {
      name: "Portero",
      focus: "Reflejos, agarre y despejes",
      exercises: [
        {
          name: "Entrenamiento de reflejos",
          description: "Reaccionar rápidamente a balones lanzados desde corta distancia",
          skill: "Reflejos y coordinación",
          duration: "15-20 min",
          difficulty: "Intermedio"
        },
        {
          name: "Práctica de agarre",
          description: "Recepcionar balones a diferentes alturas y velocidades",
          skill: "Técnica de agarre",
          duration: "20 min",
          difficulty: "Básico"
        },
        {
          name: "Despejes y saques",
          description: "Practicar despejes con puños y saques de portería precisos",
          skill: "Técnica de despeje",
          duration: "25 min",
          difficulty: "Intermedio"
        }
      ]
    },
    {
      name: "Defensa",
      focus: "Anticipación, entradas y marcaje",
      exercises: [
        {
          name: "Ejercicios de anticipación",
          description: "Lectura del juego y posicionamiento defensivo",
          skill: "Anticipación táctica",
          duration: "20 min",
          difficulty: "Avanzado"
        },
        {
          name: "Técnica de entrada",
          description: "Entrada limpia y recuperación de balón",
          skill: "Técnica defensiva",
          duration: "15 min",
          difficulty: "Intermedio"
        },
        {
          name: "Marcaje al hombre",
          description: "Seguimiento y presión sobre el atacante",
          skill: "Marcaje",
          duration: "25 min",
          difficulty: "Intermedio"
        }
      ]
    },
    {
      name: "Centrocampista",
      focus: "Visión de juego, pases largos y resistencia",
      exercises: [
        {
          name: "Pases de precisión",
          description: "Pases cortos y largos con precisión bajo presión",
          skill: "Técnica de pase",
          duration: "30 min",
          difficulty: "Intermedio"
        },
        {
          name: "Visión de juego",
          description: "Toma de decisiones rápidas con cabeza levantada",
          skill: "Visión táctica",
          duration: "25 min",
          difficulty: "Avanzado"
        },
        {
          name: "Resistencia con balón",
          description: "Intervalos manteniendo posesión del balón",
          skill: "Resistencia específica",
          duration: "20 min",
          difficulty: "Intermedio"
        }
      ]
    },
    {
      name: "Delantero",
      focus: "Definición, desmarques y velocidad",
      exercises: [
        {
          name: "Finalización",
          description: "Tiros a portería desde diferentes ángulos y distancias",
          skill: "Definición",
          duration: "25 min",
          difficulty: "Básico"
        },
        {
          name: "Desmarques",
          description: "Movimientos para eludir defensores y crear espacios",
          skill: "Movimiento sin balón",
          duration: "20 min",
          difficulty: "Intermedio"
        },
        {
          name: "Velocidad de reacción",
          description: "Sprints cortos y cambios de dirección",
          skill: "Velocidad",
          duration: "15 min",
          difficulty: "Básico"
        }
      ]
    }
  ],
  tactics: [
    {
      name: "Presión Alta",
      description: "Presionar al rival en su propio campo para recuperar rápido",
      advantages: ["Recuperación en zona peligrosa", "Desestabiliza al rival", "Crea ocasiones de gol"],
      disadvantages: ["Mayor desgaste físico", "Vulnerable a contraataques", "Requiere coordinación perfecta"]
    },
    {
      name: "Defensa en Bloque",
      description: "Mantener líneas compactas y defender en campo propio",
      advantages: ["Solidez defensiva", "Menor desgaste", "Facilita contraataques"],
      disadvantages: ["Cede iniciativa", "Menos posesión", "Requiere paciencia"]
    },
    {
      name: "Contraataque",
      description: "Transición rápida tras recuperar el balón",
      advantages: ["Aprovecha espacios", "Sorprende al rival", "Muy efectivo"],
      disadvantages: ["Depende de la precisión", "Pocas oportunidades", "Requiere velocidad"]
    }
  ],
  benefits: [
    "Mejora coordinación y agilidad",
    "Desarrolla trabajo en equipo",
    "Aumenta resistencia cardiovascular",
    "Fortalece músculos de piernas",
    "Mejora toma de decisiones rápidas",
    "Desarrolla liderazgo y comunicación"
  ],
  myths: [
    {
      myth: "Solo importa el talento natural",
      reality: "El trabajo duro y la técnica son más importantes que el talento"
    },
    {
      myth: "Los porteros no necesitan entrenar con los pies",
      reality: "El juego moderno requiere porteros hábiles con el balón en los pies"
    }
  ],
  examples: [
    {
      title: "Entrenamiento de Cristiano Ronaldo",
      description: "1000 abdominales diarios, sprints de alta intensidad, práctica de tiros libres",
      player: "Cristiano Ronaldo"
    },
    {
      title: "Precisión de Messi",
      description: "Práctica de regate en espacios reducidos, tiros de precisión desde diferentes ángulos",
      player: "Lionel Messi"
    }
  ]
};

const basketballData: SportData = {
  name: "Baloncesto",
  icon: "🏀",
  description: "Deporte dinámico que combina velocidad, precisión, estrategia y trabajo en equipo",
  positions: [
    {
      name: "Base (Point Guard)",
      focus: "Control del balón, visión de juego y dirección del ataque",
      exercises: [
        {
          name: "Dribbling de control",
          description: "Manejo del balón con ambas manos bajo presión",
          skill: "Control del balón",
          duration: "20 min",
          difficulty: "Básico"
        },
        {
          name: "Pases rápidos",
          description: "Pases precisos y rápidos en situaciones de juego",
          skill: "Técnica de pase",
          duration: "25 min",
          difficulty: "Intermedio"
        },
        {
          name: "Lectura de defensa",
          description: "Identificar ventajas tácticas y dirigir el ataque",
          skill: "Visión de juego",
          duration: "30 min",
          difficulty: "Avanzado"
        }
      ]
    },
    {
      name: "Escolta (Shooting Guard)",
      focus: "Tiro exterior, velocidad y penetraciones",
      exercises: [
        {
          name: "Tiro de perímetro",
          description: "Tiros de 3 puntos desde diferentes posiciones",
          skill: "Tiro exterior",
          duration: "30 min",
          difficulty: "Intermedio"
        },
        {
          name: "Penetraciones",
          description: "Entrada a canasta con diferentes finalizaciones",
          skill: "Penetración",
          duration: "25 min",
          difficulty: "Intermedio"
        },
        {
          name: "Movimiento sin balón",
          description: "Desmarques y cortes para recibir pases",
          skill: "Movimiento",
          duration: "20 min",
          difficulty: "Básico"
        }
      ]
    },
    {
      name: "Alero (Small Forward)",
      focus: "Versatilidad ofensiva y defensa uno contra uno",
      exercises: [
        {
          name: "Tiro de media distancia",
          description: "Tiros desde la zona de tiros libres y perímetro cercano",
          skill: "Tiro medio",
          duration: "25 min",
          difficulty: "Intermedio"
        },
        {
          name: "Defensa individual",
          description: "Marcaje uno contra uno en diferentes posiciones",
          skill: "Defensa",
          duration: "20 min",
          difficulty: "Intermedio"
        },
        {
          name: "Transiciones",
          description: "Correr la cancha en ataque y defensa",
          skill: "Transición",
          duration: "15 min",
          difficulty: "Básico"
        }
      ]
    },
    {
      name: "Ala-Pívot (Power Forward)",
      focus: "Rebotes, bloqueos y juego en poste medio",
      exercises: [
        {
          name: "Rebote ofensivo",
          description: "Lucha por rebotes en ataque y segunda oportunidad",
          skill: "Rebote",
          duration: "20 min",
          difficulty: "Intermedio"
        },
        {
          name: "Bloqueos directos",
          description: "Pick and roll efectivo con diferentes compañeros",
          skill: "Bloqueo",
          duration: "25 min",
          difficulty: "Intermedio"
        },
        {
          name: "Juego en poste",
          description: "Movimientos en zona pintada con espaldas a canasta",
          skill: "Poste medio",
          duration: "30 min",
          difficulty: "Avanzado"
        }
      ]
    },
    {
      name: "Pívot (Center)",
      focus: "Dominio interior, tapones y defensa de la zona",
      exercises: [
        {
          name: "Movimientos de poste bajo",
          description: "Gancho, giro y tiro cercano a canasta",
          skill: "Poste bajo",
          duration: "30 min",
          difficulty: "Avanzado"
        },
        {
          name: "Técnica de tapón",
          description: "Bloqueo vertical y recuperación defensiva",
          skill: "Tapones",
          duration: "20 min",
          difficulty: "Intermedio"
        },
        {
          name: "Rebote defensivo",
          description: "Proteger la canasta y iniciar contraataque",
          skill: "Rebote defensivo",
          duration: "25 min",
          difficulty: "Básico"
        }
      ]
    }
  ],
  tactics: [
    {
      name: "Pick and Roll",
      description: "Bloqueo directo para crear ventaja ofensiva",
      advantages: ["Crea superioridad numérica", "Múltiples opciones", "Difícil de defender"],
      disadvantages: ["Requiere coordinación", "Vulnerable a switches", "Necesita espacios"]
    },
    {
      name: "Defensa en Zona 2-3",
      description: "Dos jugadores arriba y tres en línea de fondo",
      advantages: ["Protege la zona", "Facilita rebotes", "Cansa menos"],
      disadvantages: ["Vulnerable al perímetro", "Pases entre líneas", "Requiere disciplina"]
    },
    {
      name: "Contraataque",
      description: "Transición rápida tras recuperar rebote defensivo",
      advantages: ["Canastas fáciles", "Desequilibra rival", "Genera ventajas"],
      disadvantages: ["Riesgo de pérdidas", "Requiere condición", "Expone defensa"]
    }
  ],
  benefits: [
    "Mejora coordinación ojo-mano",
    "Desarrolla agilidad y salto",
    "Fortalece concentración y toma de decisiones",
    "Aumenta resistencia cardiovascular",
    "Mejora trabajo en equipo",
    "Desarrolla competitividad sana"
  ],
  myths: [
    {
      myth: "Solo sirve si eres alto",
      reality: "La técnica, velocidad y inteligencia son más importantes que la altura"
    },
    {
      myth: "El tiro de 3 es lo más importante",
      reality: "Un juego equilibrado incluye todos los aspectos: defensa, rebote y pase"
    }
  ],
  examples: [
    {
      title: "Rutina de tiro de Stephen Curry",
      description: "400-500 tiros diarios desde diferentes posiciones, incluyendo tiros en movimiento",
      player: "Stephen Curry"
    },
    {
      title: "Trabajo físico de Giannis",
      description: "Entrenamiento de fuerza funcional y pliometría para potencia explosiva",
      player: "Giannis Antetokounmpo"
    }
  ]
};

export default function SportsTraining() {
  const [selectedSport, setSelectedSport] = useState<'football' | 'basketball'>('football');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const currentSport = selectedSport === 'football' ? footballData : basketballData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Deportes
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Domina los deportes más populares con entrenamientos específicos por posición y estrategias ganadoras
        </p>
      </div>

      {/* Sport Selection */}
      <div className="flex justify-center gap-4">
        <Button
          variant={selectedSport === 'football' ? 'default' : 'outline'}
          onClick={() => setSelectedSport('football')}
          className="flex items-center gap-2"
        >
          <span className="text-lg">⚽</span>
          Fútbol
        </Button>
        <Button
          variant={selectedSport === 'basketball' ? 'default' : 'outline'}
          onClick={() => setSelectedSport('basketball')}
          className="flex items-center gap-2"
        >
          <span className="text-lg">🏀</span>
          Baloncesto
        </Button>
      </div>

      {/* Sport Overview */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{currentSport.icon}</span>
            <div>
              <h2 className="text-2xl font-bold">{currentSport.name}</h2>
              <p className="text-muted-foreground">{currentSport.description}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-red-500 mt-0.5" />
              <div>
                <div className="font-medium">Salud Mental</div>
                <div className="text-muted-foreground">Mejora concentración y reduce estrés</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-blue-500 mt-0.5" />
              <div>
                <div className="font-medium">Salud Emocional</div>
                <div className="text-muted-foreground">Desarrolla resiliencia y gestión de frustración</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Salud Social</div>
                <div className="text-muted-foreground">Fortalece vínculos y trabajo en equipo</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="positions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="positions">Posiciones</TabsTrigger>
          <TabsTrigger value="tactics">Táctica</TabsTrigger>
          <TabsTrigger value="benefits">Beneficios</TabsTrigger>
          <TabsTrigger value="education">Educación</TabsTrigger>
        </TabsList>

        {/* Positions Tab */}
        <TabsContent value="positions" className="space-y-4">
          <div className="grid gap-4">
            {currentSport.positions.map((position, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedPosition(position)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      {position.name}
                    </CardTitle>
                    <Badge variant="outline">{position.exercises.length} ejercicios</Badge>
                  </div>
                  <CardDescription>{position.focus}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-2">
                    {position.exercises.slice(0, 3).map((exercise, i) => (
                      <div key={i} className="text-sm p-2 bg-gray-50 rounded">
                        <div className="font-medium">{exercise.name}</div>
                        <div className="text-xs text-muted-foreground">{exercise.skill}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Warming up and Injury Prevention */}
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Calentamiento y Prevención de Lesiones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-700">
                <div>
                  <h4 className="font-medium mb-2">🔥 Rutina de Calentamiento (10-15 min)</h4>
                  <ul className="space-y-1">
                    <li>• Trote suave en el lugar (3-5 min)</li>
                    <li>• Movimientos articulares (tobillos, rodillas, caderas)</li>
                    <li>• Estiramientos dinámicos</li>
                    <li>• Aceleración progresiva</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🛡️ Prevención Específica</h4>
                  <ul className="space-y-1">
                    <li>• <strong>{selectedSport === 'football' ? 'Fútbol' : 'Baloncesto'}:</strong> Fortalecimiento {selectedSport === 'football' ? 'de rodillas y tobillos' : 'de tobillos y hombros'}</li>
                    <li>• Ejercicios propioceptivos</li>
                    <li>• Trabajo de core y estabilidad</li>
                    <li>• Hidratación constante</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tactics Tab */}
        <TabsContent value="tactics" className="space-y-4">
          <div className="space-y-4">
            {currentSport.tactics.map((tactic, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    {tactic.name}
                  </CardTitle>
                  <CardDescription>{tactic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">✅ Ventajas</h4>
                      <ul className="text-sm space-y-1">
                        {tactic.advantages.map((advantage, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-600 mb-2">⚠️ Desventajas</h4>
                      <ul className="text-sm space-y-1">
                        {tactic.disadvantages.map((disadvantage, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            {disadvantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Formation Visualizer */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Visualizador de Formaciones</CardTitle>
              <CardDescription>
                {selectedSport === 'football' 
                  ? 'Formaciones populares: 4-3-3, 4-4-2, 3-5-2, 5-3-2'
                  : 'Sistemas defensivos: 2-3 zona, 1-3-1, defensa individual'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 bg-green-50 rounded-lg border border-green-200">
                <Play className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <p className="text-green-700">
                  El visualizador interactivo de formaciones estará disponible en la próxima actualización
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🏆 Beneficios del {currentSport.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {currentSport.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Global Health Benefits */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">🌟 Salud Física Global</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-blue-700 space-y-2">
                <p><strong>Cardiovascular:</strong> Mejora resistencia y fortalece el corazón</p>
                <p><strong>Fuerza:</strong> Desarrolla músculos específicos y fuerza explosiva</p>
                <p><strong>Coordinación:</strong> Integra movimientos complejos ojo-{selectedSport === 'football' ? 'pie' : 'mano'}</p>
                <p><strong>Flexibilidad:</strong> Mantiene rango de movimiento articular</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-4">
          {/* Myths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Mitos Comunes del {currentSport.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentSport.myths.map((myth, index) => (
                  <div key={index} className="border-l-4 border-red-500 pl-4">
                    <div className="text-red-600 font-medium">❌ Mito: {myth.myth}</div>
                    <div className="text-green-600 font-medium">✅ Realidad: {myth.reality}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle>⭐ Casos de Ejemplo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentSport.examples.map((example, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-2">{example.title}</h4>
                    <p className="text-sm text-yellow-700 mb-2">{example.description}</p>
                    <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                      {example.player}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mini Games */}
          <Card>
            <CardHeader>
              <CardTitle>🎮 Mini-Juegos y Ejercicios Colectivos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedSport === 'football' ? (
                  <>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800">Rondo (4v2)</h4>
                      <p className="text-sm text-green-700">4 jugadores mantienen posesión vs 2 defensores en espacio reducido</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800">Fútbol tenis</h4>
                      <p className="text-sm text-green-700">Mejora control, pase y trabajo en equipo</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-800">3x3 media cancha</h4>
                      <p className="text-sm text-orange-700">Práctica de movimientos en espacios reducidos</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-800">21 puntos</h4>
                      <p className="text-sm text-orange-700">Competición individual de tiro y rebote</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Position Detail Modal */}
      {selectedPosition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {selectedPosition.name} - Entrenamiento Específico
              </CardTitle>
              <CardDescription>{selectedPosition.focus}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedPosition.exercises.map((exercise, index) => (
                  <Card key={index} className="border-l-4 border-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{exercise.name}</CardTitle>
                        <Badge variant={
                          exercise.difficulty === 'Básico' ? 'default' :
                          exercise.difficulty === 'Intermedio' ? 'secondary' : 'destructive'
                        }>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span><strong>Habilidad:</strong> {exercise.skill}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4 text-blue-500" />
                          <span><strong>Duración:</strong> {exercise.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button 
                className="w-full mt-6" 
                onClick={() => setSelectedPosition(null)}
              >
                Cerrar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
