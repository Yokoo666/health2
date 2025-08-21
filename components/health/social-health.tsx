'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Handshake, 
  Target,
  CheckCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  Brain,
  Lightbulb,
  Shield,
  Zap,
  Eye,
  Smile
} from 'lucide-react';

interface SocialSkill {
  id: string;
  name: string;
  category: 'communication' | 'charisma' | 'empathy';
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  description: string;
  exercises: string[];
  benefits: string[];
  practiceTime: string;
}

interface RelationshipTool {
  id: string;
  name: string;
  description: string;
  technique: string;
  example: string;
  difficulty: 'Fácil' | 'Moderado' | 'Difícil';
}

interface RelationshipFlag {
  type: 'green' | 'red';
  category: string;
  items: string[];
}

const socialSkills: SocialSkill[] = [
  // Communication Skills
  {
    id: 'active-listening',
    name: 'Escucha Activa',
    category: 'communication',
    level: 'Principiante',
    description: 'Prestar atención completa a lo que dice la otra persona',
    exercises: [
      'Repetir lo que escuchaste con tus propias palabras',
      'Hacer preguntas de seguimiento relevantes',
      'Mantener contacto visual y asentir',
      'Evitar interrumpir o planear tu respuesta mientras hablan'
    ],
    benefits: [
      'Las personas se sienten valoradas',
      'Evitas malentendidos',
      'Construyes confianza',
      'Aprendes más sobre otros'
    ],
    practiceTime: '10-15 min diarios'
  },
  {
    id: 'assertive-communication',
    name: 'Comunicación Asertiva',
    category: 'communication',
    level: 'Intermedio',
    description: 'Expresar tus necesidades de forma clara y respetuosa',
    exercises: [
      'Practicar frases "Yo siento/pienso/necesito"',
      'Decir "no" sin dar excusas extensas',
      'Expresar desacuerdo sin atacar a la persona',
      'Pedir lo que necesitas directamente'
    ],
    benefits: [
      'Relaciones más honestas',
      'Menos resentimiento acumulado',
      'Mayor respeto mutuo',
      'Conflictos más constructivos'
    ],
    practiceTime: '15-20 min diarios'
  },
  {
    id: 'public-speaking',
    name: 'Hablar en Público',
    category: 'communication',
    level: 'Avanzado',
    description: 'Comunicarte con confianza ante grupos',
    exercises: [
      'Grabar videos de 2 minutos hablando de un tema',
      'Practicar presentaciones frente al espejo',
      'Unirte a grupos de debate o presentaciones',
      'Hacer preguntas en reuniones o clases'
    ],
    benefits: [
      'Mayor confianza personal',
      'Mejor presencia profesional',
      'Capacidad de influir positivamente',
      'Reducción de ansiedad social'
    ],
    practiceTime: '20-30 min diarios'
  },
  // Charisma Skills
  {
    id: 'natural-charm',
    name: 'Carisma Natural',
    category: 'charisma',
    level: 'Principiante',
    description: 'Desarrollar una presencia magnética y auténtica',
    exercises: [
      'Sonreír genuinamente al conocer gente nueva',
      'Mostrar interés real en las historias de otros',
      'Usar el nombre de la persona en la conversación',
      'Hacer cumplidos específicos y sinceros'
    ],
    benefits: [
      'Las personas disfrutan tu compañía',
      'Conexiones más rápidas y profundas',
      'Mayor influencia social positiva',
      'Mejor primera impresión'
    ],
    practiceTime: '5-10 min en cada interacción'
  },
  {
    id: 'storytelling',
    name: 'Narrativa Cautivadora',
    category: 'charisma',
    level: 'Intermedio',
    description: 'Contar historias que conecten y entretengan',
    exercises: [
      'Practicar contar anécdotas personales de 2-3 minutos',
      'Usar variaciones de tono y pausas dramáticas',
      'Incluir detalles sensoriales en tus historias',
      'Terminar con una reflexión o aprendizaje'
    ],
    benefits: [
      'Conversaciones más memorables',
      'Mayor capacidad de influencia',
      'Conexiones emocionales más fuertes',
      'Mejor entretenimiento social'
    ],
    practiceTime: '15 min diarios'
  },
  {
    id: 'emotional-intelligence',
    name: 'Inteligencia Emocional Social',
    category: 'charisma',
    level: 'Avanzado',
    description: 'Leer y responder a las emociones de otros',
    exercises: [
      'Observar lenguaje corporal y expresiones faciales',
      'Adaptar tu energía al estado emocional del grupo',
      'Hacer preguntas que ayuden a otros a expresarse',
      'Ofrecer apoyo emocional cuando sea apropiado'
    ],
    benefits: [
      'Relaciones más profundas y auténticas',
      'Mejor liderazgo e influencia',
      'Capacidad de ayudar y apoyar efectivamente',
      'Mayor popularidad y respeto social'
    ],
    practiceTime: '20-30 min de observación diaria'
  },
  // Empathy Skills
  {
    id: 'perspective-taking',
    name: 'Toma de Perspectiva',
    category: 'empathy',
    level: 'Principiante',
    description: 'Ver situaciones desde el punto de vista de otros',
    exercises: [
      'Preguntarte "¿Cómo se siente esta persona?" en conflictos',
      'Imaginar las circunstancias que llevaron a su comportamiento',
      'Evitar juzgar inmediatamente las acciones de otros',
      'Preguntarle a la persona cómo se siente directamente'
    ],
    benefits: [
      'Menos conflictos interpersonales',
      'Mayor comprensión mutua',
      'Relaciones más compasivas',
      'Mejor resolución de problemas en grupo'
    ],
    practiceTime: '5 min en cada interacción compleja'
  },
  {
    id: 'emotional-validation',
    name: 'Validación Emocional',
    category: 'empathy',
    level: 'Intermedio',
    description: 'Reconocer y legitimar los sentimientos de otros',
    exercises: [
      'Usar frases como "Entiendo que te sientes..."',
      'Evitar minimizar o "arreglar" emociones ajenas',
      'Reflejar las emociones que observas: "Pareces frustrado"',
      'Hacer preguntas abiertas sobre sus sentimientos'
    ],
    benefits: [
      'Las personas se sienten comprendidas',
      'Mayor confianza en tus relaciones',
      'Conflictos se resuelven más fácilmente',
      'Apoyo emocional más efectivo'
    ],
    practiceTime: '10 min en conversaciones difíciles'
  },
  {
    id: 'compassionate-action',
    name: 'Acción Compasiva',
    category: 'empathy',
    level: 'Avanzado',
    description: 'Traducir la empatía en acciones concretas de ayuda',
    exercises: [
      'Ofrecer ayuda específica: "¿Puedo hacer X por ti?"',
      'Recordar detalles importantes de la vida de otros',
      'Actuar proactivamente cuando veas que alguien necesita apoyo',
      'Dar tu tiempo y atención sin esperar nada a cambio'
    ],
    benefits: [
      'Relaciones extraordinariamente profundas',
      'Reputación de persona confiable y bondadosa',
      'Red de apoyo mutuo muy fuerte',
      'Impacto positivo significativo en otros'
    ],
    practiceTime: 'Acciones semanales consistentes'
  }
];

const relationshipTools: RelationshipTool[] = [
  {
    id: 'active-listening-technique',
    name: 'Técnica de Escucha Activa',
    description: 'Método estructurado para demostrar que estás presente y entendiendo',
    technique: 'Repetir → Reflexionar → Resumir → Preguntar',
    example: '"Entiendo que te sientes frustrado porque el proyecto se retrasó (repetir). Debe ser muy estresante tener esa presión (reflexionar). Entonces necesitas apoyo para reorganizar las prioridades (resumir). ¿Cómo puedo ayudarte? (preguntar)"',
    difficulty: 'Fácil'
  },
  {
    id: 'i-feel-method',
    name: 'Método "Yo Siento"',
    description: 'Comunicar problemas sin atacar a la otra persona',
    technique: '"Yo siento [emoción] cuando [comportamiento] porque [impacto]"',
    example: '"Yo me siento ignorado cuando llegas tarde a nuestras citas porque me hace pensar que nuestro tiempo juntos no es importante para ti"',
    difficulty: 'Moderado'
  },
  {
    id: 'conflict-resolution',
    name: 'Resolución Colaborativa',
    description: 'Encontrar soluciones que beneficien a ambas partes',
    technique: 'Definir el problema → Generar opciones → Evaluar juntos → Decidir',
    example: 'Problema: Desacuerdo sobre finanzas. Opciones: presupuesto conjunto, cuentas separadas, reuniones mensuales. Evaluación: pros/contras de cada opción. Decisión: combinación que funcione para ambos',
    difficulty: 'Difícil'
  },
  {
    id: 'empathy-bridge',
    name: 'Puente de Empatía',
    description: 'Conectar emocionalmente antes de resolver problemas',
    technique: 'Reconocer sentimientos → Validar experiencia → Compartir perspectiva',
    example: '"Veo que estás realmente molesto por esto (reconocer). Es completamente comprensible sentirse así en esta situación (validar). A mí también me preocupa y quiero encontrar una solución juntos (compartir)"',
    difficulty: 'Moderado'
  }
];

const relationshipFlags: RelationshipFlag[] = [
  {
    type: 'red',
    category: 'Comunicación Tóxica',
    items: [
      'Te critica constantemente o menosprecia tus logros',
      'No escucha tus preocupaciones o las minimiza',
      'Usa el silencio o castigo emocional para controlarte',
      'Te grita, insulta o humilla, especialmente en público'
    ]
  },
  {
    type: 'red',
    category: 'Control y Manipulación',
    items: [
      'Controla tus finanzas, amigos o actividades',
      'Te hace sentir culpable por sus problemas emocionales',
      'Amenaza con lastimarse o lastimarte si lo dejas',
      'Te aísla de familia y amigos gradualmente'
    ]
  },
  {
    type: 'red',
    category: 'Falta de Respeto',
    items: [
      'Viola tus límites físicos o emocionales consistentemente',
      'No respeta tu privacidad (revisa teléfono, correos)',
      'Te presiona para hacer cosas que no quieres',
      'Miente frecuentemente o rompe promesas importantes'
    ]
  },
  {
    type: 'green',
    category: 'Comunicación Saludable',
    items: [
      'Escucha activamente y valida tus sentimientos',
      'Discute problemas sin atacarte personalmente',
      'Admite errores y se disculpa genuinamente',
      'Te apoya en tus metas y celebra tus éxitos'
    ]
  },
  {
    type: 'green',
    category: 'Respeto Mutuo',
    items: [
      'Respeta tus límites y decisiones personales',
      'Te da espacio para amistades y actividades propias',
      'Confía en ti y merece tu confianza',
      'Te hace sentir valorado y apreciado regularmente'
    ]
  },
  {
    type: 'green',
    category: 'Apoyo y Crecimiento',
    items: [
      'Te anima a crecer y perseguir tus sueños',
      'Está presente en momentos difíciles',
      'Trabaja contigo para resolver conflictos',
      'Aporta positividad y alegría a tu vida'
    ]
  }
];

const datingTips = [
  {
    category: 'Preparación',
    tips: [
      'Trabaja en tu autoestima y bienestar personal primero',
      'Define qué buscas en una relación antes de empezar',
      'Desarrolla intereses y pasiones propias',
      'Cuida tu higiene y apariencia personal'
    ]
  },
  {
    category: 'Primera Cita',
    tips: [
      'Elige un lugar público donde puedan conversar',
      'Sé puntual y vístete apropiadamente',
      'Haz preguntas sobre sus intereses y escucha activamente',
      'Sé auténtico, no pretendas ser alguien que no eres'
    ]
  },
  {
    category: 'Comunicación',
    tips: [
      'Sé claro sobre tus intenciones y expectativas',
      'Evita hablar excesivamente de ex-parejas',
      'Muestra interés genuino en conocer a la persona',
      'Mantén un equilibrio entre compartir y preguntar'
    ]
  }
];

const relationshipMicroTechniques = [
  {
    name: 'Técnica del "Yo siento"',
    description: 'En lugar de "Tú siempre..." usa "Yo siento... cuando..."',
    example: 'En vez de "Tú nunca me escuchas", di "Yo me siento ignorado cuando interrumpes mientras hablo"'
  },
  {
    name: 'Regla 5:1',
    description: 'Mantener 5 interacciones positivas por cada interacción negativa',
    example: 'Por cada crítica constructiva, asegúrate de dar 5 elogios, muestras de afecto o momentos positivos'
  },
  {
    name: 'Pausa de 24 horas',
    description: 'Esperar un día antes de abordar conflictos importantes',
    example: 'Si algo te molesta mucho, tómate tiempo para procesar antes de hablar del tema'
  }
];

export default function SocialHealth() {
  const [selectedSkill, setSelectedSkill] = useState<SocialSkill | null>(null);
  const [showRelationshipCheck, setShowRelationshipCheck] = useState(false);
  const [checklistAnswers, setChecklistAnswers] = useState<{[key: string]: 'yes' | 'no' | ''}>({});
  const [practiceLog, setPracticeLog] = useState<{[key: string]: number}>({});

  useEffect(() => {
    // Load practice log from localStorage
    const saved = localStorage.getItem('social-practice-log');
    if (saved) {
      setPracticeLog(JSON.parse(saved));
    }
  }, []);

  const updatePracticeLog = (skillId: string) => {
    const newLog = {
      ...practiceLog,
      [skillId]: (practiceLog[skillId] || 0) + 1
    };
    setPracticeLog(newLog);
    localStorage.setItem('social-practice-log', JSON.stringify(newLog));
  };

  const calculateRelationshipScore = () => {
    const answers = Object.values(checklistAnswers);
    if (answers.length === 0) return 0;
    
    const positiveAnswers = answers.filter(answer => answer === 'yes').length;
    return Math.round((positiveAnswers / answers.length) * 100);
  };

  const getRelationshipAdvice = (score: number) => {
    if (score >= 80) return { type: 'healthy', message: 'Tu relación muestra signos muy saludables' };
    if (score >= 60) return { type: 'improving', message: 'Tu relación tiene potencial, pero hay áreas para mejorar' };
    if (score >= 40) return { type: 'concerning', message: 'Hay varios aspectos preocupantes que requieren atención' };
    return { type: 'toxic', message: 'Considera buscar apoyo profesional para evaluar esta relación' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Users className="w-8 h-8 text-blue-500" />
          Salud Social
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Desarrolla habilidades sociales, construye relaciones sanas y crea conexiones significativas
        </p>
      </div>

      {/* Practice Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Object.values(practiceLog).reduce((sum, count) => sum + count, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Prácticas totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Object.keys(practiceLog).length}
              </div>
              <div className="text-sm text-muted-foreground">Habilidades practicadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {socialSkills.filter(skill => (practiceLog[skill.id] || 0) >= 5).length}
              </div>
              <div className="text-sm text-muted-foreground">Habilidades desarrolladas</div>
            </div>
            <div className="text-center">
              <Button onClick={() => setShowRelationshipCheck(true)} className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Evaluar Relación
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="skills">Habilidades</TabsTrigger>
          <TabsTrigger value="relationships">Relaciones</TabsTrigger>
          <TabsTrigger value="dating">Citas</TabsTrigger>
          <TabsTrigger value="community">Comunidad</TabsTrigger>
        </TabsList>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-4">
          {/* Skills by Category */}
          {['communication', 'charisma', 'empathy'].map(category => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category === 'communication' && <MessageCircle className="w-5 h-5 text-blue-500" />}
                  {category === 'charisma' && <Zap className="w-5 h-5 text-yellow-500" />}
                  {category === 'empathy' && <Heart className="w-5 h-5 text-red-500" />}
                  {category === 'communication' ? 'Comunicación Asertiva' :
                   category === 'charisma' ? 'Carisma Natural' : 'Empatía'}
                </CardTitle>
                <CardDescription>
                  {category === 'communication' ? 'Expresarte claramente y escuchar efectivamente' :
                   category === 'charisma' ? 'Desarrollar presencia magnética y natural' : 
                   'Conectar emocionalmente y comprender a otros'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {socialSkills.filter(skill => skill.category === category).map((skill) => (
                    <Card 
                      key={skill.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedSkill(skill)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{skill.name}</CardTitle>
                          <Badge variant={
                            skill.level === 'Principiante' ? 'default' :
                            skill.level === 'Intermedio' ? 'secondary' : 'destructive'
                          } className="text-xs">
                            {skill.level}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm">
                          {skill.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Práctica: {skill.practiceTime}</span>
                            <Badge variant="outline" className="text-xs">
                              {practiceLog[skill.id] || 0} veces
                            </Badge>
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              updatePracticeLog(skill.id);
                            }}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Marcar Práctica
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* AI Chat Practice */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Practica con IA Maxx
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-purple-700 space-y-2">
                <p>
                  <strong>💡 Tip:</strong> Usa el chat de IA para practicar conversaciones en un entorno seguro:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Simulaciones de entrevistas de trabajo</li>
                  <li>Práctica de conversaciones difíciles</li>
                  <li>Role-play de situaciones sociales</li>
                  <li>Feedback sobre tu comunicación</li>
                </ul>
                <Button className="mt-3" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ir al Chat de IA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relationships Tab */}
        <TabsContent value="relationships" className="space-y-4">
          {/* Relationship Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="w-5 h-5 text-green-500" />
                Herramientas de Relación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {relationshipTools.map((tool) => (
                  <Card key={tool.id} className="border-l-4 border-green-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{tool.name}</CardTitle>
                        <Badge variant={
                          tool.difficulty === 'Fácil' ? 'default' :
                          tool.difficulty === 'Moderado' ? 'secondary' : 'destructive'
                        } className="text-xs">
                          {tool.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm">
                        <strong>Técnica:</strong> {tool.technique}
                      </div>
                      <div className="text-sm p-3 bg-gray-50 rounded border-l-4 border-blue-500">
                        <strong>Ejemplo:</strong> {tool.example}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Micro-techniques */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Micro-Técnicas de Comunicación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relationshipMicroTechniques.map((technique, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{technique.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{technique.description}</p>
                    <div className="text-sm p-2 bg-blue-50 rounded border-l-4 border-blue-500">
                      <strong>Ejemplo:</strong> {technique.example}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Red and Green Flags */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Red Flags 🚩
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relationshipFlags.filter(flag => flag.type === 'red').map((flag, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-red-700 mb-2">{flag.category}</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {flag.items.map((item, i) => (
                          <li key={i} className="text-red-600">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Green Flags ✅
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relationshipFlags.filter(flag => flag.type === 'green').map((flag, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-green-700 mb-2">{flag.category}</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {flag.items.map((item, i) => (
                          <li key={i} className="text-green-600">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Dating Tab */}
        <TabsContent value="dating" className="space-y-4">
          {/* Dating Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                Consejos para Citas Efectivas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {datingTips.map((section, index) => (
                  <div key={index}>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-pink-500" />
                      {section.category}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {section.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 p-3 bg-pink-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-pink-500 mt-0.5" />
                          <span className="text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dating Mistakes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Errores Frecuentes en Citas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3 text-red-600">❌ Evita estos errores</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                    <li>Intentar impresionar demasiado o exagerar logros</li>
                    <li>Hablar excesivamente sobre ex-parejas</li>
                    <li>Usar el teléfono constantemente durante la cita</li>
                    <li>Ser demasiado insistente o agresivo</li>
                    <li>No mostrar interés genuino en conocer a la persona</li>
                    <li>Llegar tarde sin avisar</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-green-600">✅ Mejor hacer esto</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-green-600">
                    <li>Ser auténtico y natural desde el principio</li>
                    <li>Hacer preguntas abiertas sobre sus intereses</li>
                    <li>Mantener conversación equilibrada (hablar y escuchar)</li>
                    <li>Mostrar modales y cortesía básica</li>
                    <li>Demostrar interés a través de lenguaje corporal positivo</li>
                    <li>Ser puntual y cumplir lo que prometes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Foundation for Dating */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">💡 Recordatorio Importante</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-blue-700 space-y-2">
                <p>
                  <strong>Ligar y tener pareja no dependen solo de habilidades sociales.</strong> 
                  Los fundamentos más importantes son:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-3">
                  <div className="flex items-start gap-2">
                    <Smile className="w-4 h-4 mt-0.5" />
                    <div>
                      <div className="font-medium">Autoestima Sólida</div>
                      <div className="text-xs">Valórate a ti mismo primero</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="w-4 h-4 mt-0.5" />
                    <div>
                      <div className="font-medium">Autocuidado</div>
                      <div className="text-xs">Salud física y mental</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Brain className="w-4 h-4 mt-0.5" />
                    <div>
                      <div className="font-medium">Gestión Emocional</div>
                      <div className="text-xs">Inteligencia emocional</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Conexión y Comunidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Handshake className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-medium">Networking</h4>
                  <p className="text-sm text-muted-foreground">
                    Construye relaciones profesionales auténticas basadas en valor mutuo
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Asiste a eventos de tu industria</li>
                    <li>• Ofrece ayuda antes de pedir favores</li>
                    <li>• Mantén contacto regular</li>
                  </ul>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-medium">Participación Comunitaria</h4>
                  <p className="text-sm text-muted-foreground">
                    Involúcrate en tu comunidad local y causa que te importen
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Voluntariado en organizaciones</li>
                    <li>• Grupos de interés común</li>
                    <li>• Actividades deportivas locales</li>
                  </ul>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-medium">Soporte Social</h4>
                  <p className="text-sm text-muted-foreground">
                    Crea y mantén redes de apoyo mutuo para momentos difíciles
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Círculo íntimo de confianza</li>
                    <li>• Grupos de apoyo temáticos</li>
                    <li>• Reciprocidad en el cuidado</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">🚧 Próximamente</h4>
                <p className="text-sm text-yellow-700">
                  Funcionalidades de comunidad estarán disponibles en futuras actualizaciones, 
                  incluyendo grupos locales, eventos y conexiones con otros usuarios.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits for Other Health Areas */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">🌟 Beneficios para otros tipos de salud</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Salud Mental</div>
                    <div className="text-muted-foreground">Reduce aislamiento, mejora autoestima y proporciona apoyo emocional</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-red-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Salud Emocional</div>
                    <div className="text-muted-foreground">Desarrolla inteligencia emocional y capacidad de regulación</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Salud Física</div>
                    <div className="text-muted-foreground">Reduce estrés, mejora sistema inmune y promueve actividad social</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedSkill.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedSkill.description}</p>
              
              <div>
                <h4 className="font-medium mb-2">🎯 Ejercicios de Práctica</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {selectedSkill.exercises.map((exercise, i) => (
                    <li key={i} className="text-muted-foreground">{exercise}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">✨ Beneficios</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {selectedSkill.benefits.map((benefit, i) => (
                    <li key={i} className="text-muted-foreground">{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Tiempo de práctica: {selectedSkill.practiceTime}</div>
                  <div className="text-sm text-muted-foreground">
                    Practicado {practiceLog[selectedSkill.id] || 0} veces
                  </div>
                </div>
                <Button onClick={() => updatePracticeLog(selectedSkill.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Marcar Práctica
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Relationship Health Check Modal */}
      <Dialog open={showRelationshipCheck} onOpenChange={setShowRelationshipCheck}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Evaluación de Salud Relacional
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Responde honestamente sobre tu relación actual (pareja, amistad importante, etc.)
            </p>

            {relationshipFlags.filter(flag => flag.type === 'green').map((flag, flagIndex) => (
              <div key={flagIndex} className="space-y-3">
                <h4 className="font-medium text-green-700">{flag.category}</h4>
                {flag.items.map((item, itemIndex) => {
                  const key = `${flagIndex}-${itemIndex}`;
                  return (
                    <div key={key} className="flex items-center space-x-3">
                      <RadioGroup
                        value={checklistAnswers[key] || ''}
                        onValueChange={(value) => setChecklistAnswers(prev => ({...prev, [key]: value as 'yes' | 'no'}))}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id={`${key}-yes`} />
                          <Label htmlFor={`${key}-yes`} className="text-sm">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id={`${key}-no`} />
                          <Label htmlFor={`${key}-no`} className="text-sm">No</Label>
                        </div>
                      </RadioGroup>
                      <span className="text-sm flex-1">{item}</span>
                    </div>
                  );
                })}
              </div>
            ))}

            {Object.keys(checklistAnswers).length > 0 && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Resultado:</h4>
                <div className="text-2xl font-bold mb-2">
                  {calculateRelationshipScore()}% saludable
                </div>
                <div className={`text-sm ${
                  getRelationshipAdvice(calculateRelationshipScore()).type === 'healthy' ? 'text-green-600' :
                  getRelationshipAdvice(calculateRelationshipScore()).type === 'improving' ? 'text-blue-600' :
                  getRelationshipAdvice(calculateRelationshipScore()).type === 'concerning' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {getRelationshipAdvice(calculateRelationshipScore()).message}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={() => setShowRelationshipCheck(false)} variant="outline">
                Cerrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
