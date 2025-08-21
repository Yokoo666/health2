'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Heart, 
  Brain, 
  Shield, 
  TrendingUp, 
  Smile,
  Calendar,
  BookOpen,
  Target,
  Zap,
  Activity,
  CheckCircle,
  AlertTriangle,
  Info,
  Timer
} from 'lucide-react';

interface Emotion {
  id: string;
  name: string;
  category: 'basic' | 'complex';
  description: string;
  physicalSigns: string[];
  causes: string[];
  healthyResponses: string[];
  color: string;
}

interface MoodEntry {
  date: string;
  mood: number;
  emotions: string[];
  notes: string;
  triggers?: string;
  coping?: string;
}

interface BreathingExercise {
  name: string;
  pattern: string;
  duration: string;
  description: string;
  benefits: string[];
  instructions: string[];
}

const emotions: Emotion[] = [
  {
    id: 'joy',
    name: 'Alegría',
    category: 'basic',
    description: 'Sentimiento de bienestar, satisfacción y placer',
    physicalSigns: ['Sonrisa', 'Relajación muscular', 'Energía aumentada'],
    causes: ['Logros', 'Conexiones sociales', 'Experiencias placenteras'],
    healthyResponses: ['Compartir con otros', 'Saborear el momento', 'Expresar gratitud'],
    color: 'bg-yellow-100 border-yellow-300 text-yellow-800'
  },
  {
    id: 'sadness',
    name: 'Tristeza',
    category: 'basic',
    description: 'Sentimiento de pena, dolor emocional o melancolía',
    physicalSigns: ['Lágrimas', 'Baja energía', 'Tensión en el pecho'],
    causes: ['Pérdidas', 'Desilusiones', 'Soledad'],
    healthyResponses: ['Permitirse sentir', 'Buscar apoyo', 'Practicar autocompasión'],
    color: 'bg-blue-100 border-blue-300 text-blue-800'
  },
  {
    id: 'anger',
    name: 'Ira',
    category: 'basic',
    description: 'Respuesta emocional ante injusticias o frustraciones',
    physicalSigns: ['Tensión muscular', 'Calor corporal', 'Respiración acelerada'],
    causes: ['Injusticias', 'Obstáculos', 'Violación de límites'],
    healthyResponses: ['Ejercicio físico', 'Comunicación asertiva', 'Técnicas de respiración'],
    color: 'bg-red-100 border-red-300 text-red-800'
  },
  {
    id: 'fear',
    name: 'Miedo',
    category: 'basic',
    description: 'Respuesta ante amenazas reales o percibidas',
    physicalSigns: ['Corazón acelerado', 'Sudoración', 'Tensión muscular'],
    causes: ['Peligros', 'Incertidumbre', 'Experiencias traumáticas'],
    healthyResponses: ['Respiración profunda', 'Buscar información', 'Apoyo social'],
    color: 'bg-purple-100 border-purple-300 text-purple-800'
  },
  {
    id: 'anxiety',
    name: 'Ansiedad',
    category: 'complex',
    description: 'Preocupación excesiva sobre eventos futuros',
    physicalSigns: ['Inquietud', 'Fatiga', 'Dificultad concentración'],
    causes: ['Estrés crónico', 'Perfeccionismo', 'Cambios importantes'],
    healthyResponses: ['Mindfulness', 'Planificación realista', 'Técnicas de relajación'],
    color: 'bg-orange-100 border-orange-300 text-orange-800'
  },
  {
    id: 'guilt',
    name: 'Culpa',
    category: 'complex',
    description: 'Sentimiento de responsabilidad por daño causado',
    physicalSigns: ['Peso en el estómago', 'Inquietud', 'Evitación'],
    causes: ['Errores cometidos', 'Daño a otros', 'Violación de valores'],
    healthyResponses: ['Disculparse genuinamente', 'Hacer amends', 'Perdonarse a sí mismo'],
    color: 'bg-gray-100 border-gray-300 text-gray-800'
  },
  {
    id: 'shame',
    name: 'Vergüenza',
    category: 'complex',
    description: 'Sentimiento de ser fundamentalmente defectuoso',
    physicalSigns: ['Rubor', 'Evitar contacto visual', 'Encogerse'],
    causes: ['Crítica severa', 'Rechazo social', 'Expectativas no cumplidas'],
    healthyResponses: ['Autocompasión', 'Desafiar pensamientos', 'Conexión social'],
    color: 'bg-pink-100 border-pink-300 text-pink-800'
  },
  {
    id: 'gratitude',
    name: 'Gratitud',
    category: 'complex',
    description: 'Apreciación por lo que se tiene o se ha recibido',
    physicalSigns: ['Calidez en el pecho', 'Relajación', 'Sonrisa suave'],
    causes: ['Reconocer bendiciones', 'Actos de bondad', 'Perspectiva'],
    healthyResponses: ['Expresar agradecimiento', 'Journaling', 'Actos de bondad'],
    color: 'bg-green-100 border-green-300 text-green-800'
  }
];

const breathingExercises: BreathingExercise[] = [
  {
    name: 'Respiración Diafragmática',
    pattern: '4-4 (Inhala 4s, Exhala 4s)',
    duration: '5-10 minutos',
    description: 'Respiración profunda que activa el sistema nervioso parasimpático',
    benefits: ['Reduce estrés', 'Calma ansiedad', 'Mejora concentración'],
    instructions: [
      'Coloca una mano en el pecho, otra en el abdomen',
      'Inhala lentamente por la nariz, expandiendo el abdomen',
      'Exhala lentamente por la boca, contrayendo el abdomen',
      'La mano del pecho debe moverse mínimamente'
    ]
  },
  {
    name: 'Respiración 4-7-8',
    pattern: '4-7-8 (Inhala 4s, Retén 7s, Exhala 8s)',
    duration: '3-5 minutos',
    description: 'Técnica sedante para reducir activación del sistema nervioso',
    benefits: ['Induce calma', 'Reduce ansiedad', 'Facilita sueño'],
    instructions: [
      'Exhala completamente por la boca',
      'Inhala por la nariz contando hasta 4',
      'Retén la respiración contando hasta 7',
      'Exhala por la boca contando hasta 8'
    ]
  }
];

export default function EmotionalHealth() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [todayMood, setTodayMood] = useState(5);
  const [todayEmotions, setTodayEmotions] = useState<string[]>([]);
  const [todayNotes, setTodayNotes] = useState('');
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [selectedBreathing, setSelectedBreathing] = useState<BreathingExercise | null>(null);
  const [breathingActive, setBreathingActive] = useState(false);

  useEffect(() => {
    // Load mood entries from localStorage
    const saved = localStorage.getItem('mood-entries');
    if (saved) {
      setMoodEntries(JSON.parse(saved));
    }
  }, []);

  const saveMoodEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    const existingIndex = moodEntries.findIndex(entry => entry.date === today);
    
    const newEntry: MoodEntry = {
      date: today,
      mood: todayMood,
      emotions: todayEmotions,
      notes: todayNotes
    };

    let newEntries;
    if (existingIndex >= 0) {
      newEntries = [...moodEntries];
      newEntries[existingIndex] = newEntry;
    } else {
      newEntries = [newEntry, ...moodEntries];
    }
    
    setMoodEntries(newEntries);
    localStorage.setItem('mood-entries', JSON.stringify(newEntries));
    setShowMoodTracker(false);
  };

  const toggleEmotion = (emotionId: string) => {
    setTodayEmotions(prev => 
      prev.includes(emotionId) 
        ? prev.filter(id => id !== emotionId)
        : [...prev, emotionId]
    );
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0;
    const recent = moodEntries.slice(0, 7);
    return Math.round((recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length) * 10) / 10;
  };

  const getMoodTrend = () => {
    if (moodEntries.length < 2) return 'stable';
    const recent = moodEntries.slice(0, 7);
    const older = moodEntries.slice(7, 14);
    
    if (older.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
    const olderAvg = older.reduce((sum, entry) => sum + entry.mood, 0) / older.length;
    
    if (recentAvg > olderAvg + 0.5) return 'improving';
    if (recentAvg < olderAvg - 0.5) return 'declining';
    return 'stable';
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return 'text-green-600';
    if (mood >= 6) return 'text-blue-600';
    if (mood >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Heart className="w-8 h-8 text-red-500" />
          Salud Emocional
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Desarrolla inteligencia emocional, resiliencia y bienestar a través del autoconocimiento y herramientas prácticas
        </p>
      </div>

      {/* Mood Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${getMoodColor(getAverageMood())}`}>
              {getAverageMood()}/10
            </div>
            <div className="text-sm text-muted-foreground">Humor promedio</div>
            <div className="text-xs text-muted-foreground">Últimos 7 días</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{moodEntries.length}</div>
            <div className="text-sm text-muted-foreground">Registros totales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${
              getMoodTrend() === 'improving' ? 'text-green-600' :
              getMoodTrend() === 'declining' ? 'text-red-600' : 'text-blue-600'
            }`}>
              {getMoodTrend() === 'improving' ? '↗️' :
               getMoodTrend() === 'declining' ? '↘️' : '→'}
            </div>
            <div className="text-sm text-muted-foreground">Tendencia</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Button onClick={() => setShowMoodTracker(true)} className="w-full">
              <Smile className="w-4 h-4 mr-2" />
              Registrar Hoy
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="recognition" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recognition">Reconocimiento</TabsTrigger>
          <TabsTrigger value="regulation">Regulación</TabsTrigger>
          <TabsTrigger value="strengthening">Fortalecimiento</TabsTrigger>
          <TabsTrigger value="tracking">Seguimiento</TabsTrigger>
        </TabsList>

        {/* Recognition Tab */}
        <TabsContent value="recognition" className="space-y-4">
          {/* Emotion Glossary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Glosario de Emociones
              </CardTitle>
              <CardDescription>
                Identifica y comprende tus emociones para gestionarlas mejor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {emotions.map((emotion) => (
                  <Card 
                    key={emotion.id}
                    className={`cursor-pointer hover:shadow-md transition-shadow ${emotion.color}`}
                    onClick={() => setSelectedEmotion(emotion)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{emotion.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {emotion.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className="text-xs">
                        {emotion.category === 'basic' ? 'Básica' : 'Compleja'}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Why Recognition is Important */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 ¿Por qué es importante el reconocimiento emocional?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                El reconocimiento emocional es el primer paso hacia la inteligencia emocional. 
                Cuando puedes identificar qué sientes y por qué, tienes el poder de responder 
                conscientemente en lugar de reaccionar impulsivamente.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">🏆 Resultados de mejorar</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Mayor control emocional</li>
                    <li>Menos impulsividad</li>
                    <li>Mejor calidad en relaciones</li>
                    <li>Reducción del estrés y ansiedad</li>
                    <li>Mejor toma de decisiones</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">💡 Cómo mejorarlo</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Pausar antes de reaccionar</li>
                    <li>Nombrar las emociones específicas</li>
                    <li>Observar sensaciones físicas</li>
                    <li>Llevar un diario emocional</li>
                    <li>Practicar mindfulness</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regulation Tab */}
        <TabsContent value="regulation" className="space-y-4">
          {/* Breathing Exercises */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                Respirómetro Virtual
              </CardTitle>
              <CardDescription>
                Ejercicios de respiración para reducir intensidad emocional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {breathingExercises.map((exercise, index) => (
                  <Card key={index} className="border-l-4 border-orange-500">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{exercise.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {exercise.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm">
                          <strong>Patrón:</strong> {exercise.pattern}<br/>
                          <strong>Duración:</strong> {exercise.duration}
                        </div>
                        
                        <div className="text-sm">
                          <strong>Beneficios:</strong>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            {exercise.benefits.map((benefit, i) => (
                              <li key={i} className="text-muted-foreground">{benefit}</li>
                            ))}
                          </ul>
                        </div>

                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            setSelectedBreathing(exercise);
                            setBreathingActive(true);
                          }}
                        >
                          <Timer className="w-4 h-4 mr-2" />
                          Comenzar Ejercicio
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regulation Strategies */}
          <Card>
            <CardHeader>
              <CardTitle>🛠️ Estrategias de Regulación Emocional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">⏸️ Técnicas de Pausa</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Contar hasta 10 antes de responder</li>
                    <li>Respirar profundamente 3 veces</li>
                    <li>Alejarse temporalmente de la situación</li>
                    <li>Hacer una pregunta reflexiva</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🔄 Reevaluación Cognitiva</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Buscar perspectivas alternativas</li>
                    <li>Separar hechos de interpretaciones</li>
                    <li>Preguntarse: "¿Es esto realmente cierto?"</li>
                    <li>Considerar el impacto a largo plazo</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">💡 Técnica del "STOP"</h4>
                <div className="text-blue-700 space-y-1">
                  <div><strong>S</strong>top - Detente y reconoce la emoción</div>
                  <div><strong>T</strong>ake a breath - Respira profundamente</div>
                  <div><strong>O</strong>bserve - Observa tus pensamientos y sensaciones</div>
                  <div><strong>P</strong>roceed - Procede con respuesta consciente</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strengthening Tab */}
        <TabsContent value="strengthening" className="space-y-4">
          {/* Emotional Strength */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Fortalecimiento Emocional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">🧠 Neurociencia del Fortalecimiento Emocional</h4>
                <p className="text-muted-foreground mb-3">
                  La neuroplasticidad permite que el cerebro cambie físicamente con el entrenamiento emocional. 
                  El córtex prefrontal (área de control ejecutivo) puede fortalecerse para mejor regular 
                  las respuestas de la amígdala (centro emocional).
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">📈 Beneficios Medibles</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>30% reducción probabilidad de burnout</li>
                    <li>Mejora toma de decisiones bajo presión</li>
                    <li>Incremento autocontrol y bienestar</li>
                    <li>Mayor capacidad de adaptación</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">⚠️ Factores que lo debilitan</h4>
                  <ul className="list-disc list-inside space-y-1 text-red-600">
                    <li>Estrés crónico no gestionado</li>
                    <li>Relaciones tóxicas persistentes</li>
                    <li>Falta de descanso adecuado</li>
                    <li>Mala alimentación y sedentarismo</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Emotional Training */}
          <Card>
            <CardHeader>
              <CardTitle>💪 Entrenamiento Emocional Diario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-l-4 border-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Autoestima
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="space-y-2">
                      <div><strong>Ejercicio:</strong> 3 logros diarios</div>
                      <div><strong>Tiempo:</strong> 5 minutos</div>
                      <div><strong>Método:</strong> Anotar 3 cosas que hiciste bien hoy</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Resiliencia
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="space-y-2">
                      <div><strong>Ejercicio:</strong> Reframe challenge</div>
                      <div><strong>Tiempo:</strong> 10 minutos</div>
                      <div><strong>Método:</strong> Reinterpretar 1 desafío como oportunidad</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-yellow-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Smile className="w-4 h-4" />
                      Gratitud
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="space-y-2">
                      <div><strong>Ejercicio:</strong> Gratitud específica</div>
                      <div><strong>Tiempo:</strong> 5 minutos</div>
                      <div><strong>Método:</strong> Describir detalladamente 1 cosa por la que sientes gratitud</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Myths about Emotional Strength */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Mitos sobre la Fortaleza Emocional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-red-600 font-medium">❌ Mito: "Ser fuerte significa no sentir"</div>
                  <div className="text-green-600 font-medium">✅ Realidad: La fortaleza es sentir y gestionar sanamente</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Las personas emocionalmente fuertes sienten profundamente, pero tienen herramientas para procesar esas emociones de forma constructiva.
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-red-600 font-medium">❌ Mito: "Reprimir es igual que regular"</div>
                  <div className="text-green-600 font-medium">✅ Realidad: Reprimir es dañino, regular es saludable</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    La represión acumula tensión emocional. La regulación permite procesar emociones de forma consciente y adaptativa.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tracking Tab */}
        <TabsContent value="tracking" className="space-y-4">
          {/* Mood History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Historial de Estado de Ánimo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {moodEntries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay registros aún</p>
                  <p className="text-sm">Comienza registrando tu estado de ánimo hoy</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {moodEntries.slice(0, 7).map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`text-lg font-bold ${getMoodColor(entry.mood)}`}>
                          {entry.mood}/10
                        </div>
                        <div>
                          <div className="font-medium">{new Date(entry.date).toLocaleDateString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {entry.emotions.map(id => emotions.find(e => e.id === id)?.name).join(', ')}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground max-w-xs">
                        {entry.notes.substring(0, 50)}...
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Progreso Emocional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Estabilidad Emocional</span>
                    <span className="text-sm">75%</span>
                  </div>
                  <Progress value={75} className="h-3" />
                  <div className="text-xs text-muted-foreground mt-1">
                    Basado en consistencia de humor últimos 7 días
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Consciencia Emocional</span>
                    <span className="text-sm">80%</span>
                  </div>
                  <Progress value={80} className="h-3" />
                  <div className="text-xs text-muted-foreground mt-1">
                    Basado en identificación de emociones específicas
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Bienestar General</span>
                    <span className="text-sm">{Math.round(getAverageMood() * 10)}%</span>
                  </div>
                  <Progress value={getAverageMood() * 10} className="h-3" />
                  <div className="text-xs text-muted-foreground mt-1">
                    Promedio de estado de ánimo últimos 7 días
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mood Tracker Modal */}
      <Dialog open={showMoodTracker} onOpenChange={setShowMoodTracker}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Registro de Estado de Ánimo - {new Date().toLocaleDateString()}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Mood Scale */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                ¿Cómo te sientes hoy? ({todayMood}/10)
              </label>
              <div className="flex items-center gap-2 mb-2">
                {[1,2,3,4,5,6,7,8,9,10].map(value => (
                  <button
                    key={value}
                    onClick={() => setTodayMood(value)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${
                      todayMood === value 
                        ? 'bg-primary border-primary text-white' 
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>😢 Muy mal</span>
                <span>😐 Regular</span>
                <span>😊 Excelente</span>
              </div>
            </div>

            {/* Emotions Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                ¿Qué emociones específicas sientes?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.id}
                    onClick={() => toggleEmotion(emotion.id)}
                    className={`p-2 text-xs rounded border transition-colors ${
                      todayEmotions.includes(emotion.id)
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {emotion.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Notas adicionales (opcional)
              </label>
              <Textarea
                value={todayNotes}
                onChange={(e) => setTodayNotes(e.target.value)}
                placeholder="¿Qué eventos o pensamientos influyeron en tu estado de ánimo hoy?"
                className="min-h-20"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={saveMoodEntry} className="flex-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                Guardar Registro
              </Button>
              <Button variant="outline" onClick={() => setShowMoodTracker(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emotion Detail Modal */}
      {selectedEmotion && (
        <Dialog open={!!selectedEmotion} onOpenChange={() => setSelectedEmotion(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedEmotion.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedEmotion.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">🔍 Señales Físicas</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedEmotion.physicalSigns.map((sign, i) => (
                      <li key={i} className="text-muted-foreground">{sign}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">🎯 Causas Comunes</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedEmotion.causes.map((cause, i) => (
                      <li key={i} className="text-muted-foreground">{cause}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">💡 Respuestas Saludables</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {selectedEmotion.healthyResponses.map((response, i) => (
                    <li key={i} className="text-muted-foreground">{response}</li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Breathing Exercise Modal */}
      {selectedBreathing && breathingActive && (
        <Dialog open={breathingActive} onOpenChange={setBreathingActive}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedBreathing.name}</DialogTitle>
            </DialogHeader>
            
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">💨</div>
              <div className="text-lg font-medium">{selectedBreathing.pattern}</div>
              
              <div className="space-y-2 text-sm">
                {selectedBreathing.instructions.map((instruction, i) => (
                  <div key={i} className="p-2 bg-gray-50 rounded">
                    {instruction}
                  </div>
                ))}
              </div>

              <Button onClick={() => setBreathingActive(false)}>
                Terminar Ejercicio
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
