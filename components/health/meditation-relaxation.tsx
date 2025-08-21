'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Circle, 
  Play, 
  Pause, 
  RotateCcw, 
  Timer, 
  Heart, 
  Brain, 
  Leaf,
  Users,
  Volume2,
  VolumeX,
  Zap,
  Sun,
  Moon,
  Activity,
  Target
} from 'lucide-react';

interface MeditationType {
  name: string;
  description: string;
  benefits: string[];
  technique: string;
  icon: string;
  sessions: number;
}

interface YogaSession {
  id: number;
  title: string;
  objective: string;
  duration: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  time: 'Mañana' | 'Tarde' | 'Noche' | 'Cualquiera';
  exercises: YogaExercise[];
  benefits: string[];
}

interface YogaExercise {
  name: string;
  description: string;
  duration: string;
  benefit: string;
}

interface BreathingTechnique {
  name: string;
  description: string;
  pattern: string;
  benefits: string[];
  defaultCycles: number;
  instructions: string[];
}

const meditationTypes: MeditationType[] = [
  {
    name: "Mindfulness",
    description: "Atención plena al momento presente, observando pensamientos sin juzgar",
    benefits: [
      "Reduce ansiedad y estrés",
      "Aumenta concentración",
      "Mejora regulación emocional",
      "Desarrolla autoconciencia"
    ],
    technique: "Enfócate en la respiración o sensaciones corporales, cuando la mente divague, vuelve suavemente al foco",
    icon: "🧘",
    sessions: 7
  },
  {
    name: "Zen",
    description: "Práctica de silencio mental centrada en postura y respiración",
    benefits: [
      "Claridad mental profunda",
      "Calma interior duradera",
      "Mejora postura corporal",
      "Desarrolla disciplina"
    ],
    technique: "Siéntate erecto, cuenta respiraciones del 1 al 10, mantén la mente clara y presente",
    icon: "⛩️",
    sessions: 7
  },
  {
    name: "Vipassana",
    description: "Observación profunda de sensaciones corporales para desarrollar sabiduría",
    benefits: [
      "Autocomprensión profunda",
      "Liberación de patrones mentales",
      "Ecuanimidad ante cambios",
      "Reducción del sufrimiento"
    ],
    technique: "Escanea el cuerpo sistemáticamente, observa sensaciones sin reaccionar, desarrolla ecuanimidad",
    icon: "🌅",
    sessions: 7
  },
  {
    name: "Trascendental",
    description: "Uso de mantras personales para alcanzar estados profundos de relajación",
    benefits: [
      "Relajación profunda",
      "Reducción de estrés cortisol",
      "Creatividad aumentada",
      "Energía renovada"
    ],
    technique: "Repite mentalmente tu mantra personal, permite que los pensamientos fluyan naturalmente",
    icon: "🕉️",
    sessions: 7
  }
];

const breathingTechniques: BreathingTechnique[] = [
  {
    name: "Respiración Equitativa",
    description: "Inhala y exhala por la misma duración para equilibrar el sistema nervioso",
    pattern: "4-4 (Inhala 4s, Exhala 4s)",
    benefits: ["Equilibra sistema nervioso", "Reduce estrés", "Mejora concentración"],
    defaultCycles: 10,
    instructions: [
      "Siéntate cómodamente con la espalda recta",
      "Inhala por la nariz contando hasta 4",
      "Exhala por la nariz contando hasta 4",
      "Mantén un ritmo constante y relajado"
    ]
  },
  {
    name: "Respiración del Cuadrilátero",
    description: "Técnica de 4 fases iguales que estabiliza profundamente la mente",
    pattern: "4-4-4-4 (Inhala, Retén, Exhala, Pausa)",
    benefits: ["Calma profunda", "Control de ansiedad", "Mejora capacidad pulmonar"],
    defaultCycles: 8,
    instructions: [
      "Inhala lentamente contando hasta 4",
      "Retén el aire contando hasta 4",
      "Exhala lentamente contando hasta 4",
      "Mantén los pulmones vacíos contando hasta 4"
    ]
  },
  {
    name: "Respiración 4-7-8",
    description: "Técnica sedante perfecta para relajación y sueño",
    pattern: "4-7-8 (Inhala 4s, Retén 7s, Exhala 8s)",
    benefits: ["Induce relajación", "Facilita el sueño", "Reduce activación nerviosa"],
    defaultCycles: 6,
    instructions: [
      "Exhala completamente por la boca",
      "Cierra la boca e inhala por nariz contando 4",
      "Retén la respiración contando hasta 7",
      "Exhala por la boca contando hasta 8 con sonido 'whoosh'"
    ]
  },
  {
    name: "Prueba de Contención",
    description: "Mide y mejora tu capacidad respiratoria y control mental",
    pattern: "Variable (hasta tu límite cómodo)",
    benefits: ["Fortalece capacidad pulmonar", "Desarrolla autocontrol", "Mide progreso"],
    defaultCycles: 3,
    instructions: [
      "Inhala profundamente hasta llenar los pulmones",
      "Retén la respiración lo máximo posible cómodamente",
      "Exhala lentamente y controla el tiempo",
      "Descansa 1 minuto entre repeticiones"
    ]
  }
];

const yogaSessions: YogaSession[] = [
  {
    id: 1,
    title: "Energía Matutina",
    objective: "Activar el cuerpo, mejorar la circulación y empezar el día con energía",
    duration: "20-25 min",
    difficulty: "Principiante",
    time: "Mañana",
    exercises: [
      {
        name: "Respiración profunda (Pranayama simple)",
        description: "Respiración abdominal consciente para oxigenar el cuerpo",
        duration: "2 min",
        benefit: "Oxigena el cuerpo y despierta la mente"
      },
      {
        name: "Saludo al Sol (Surya Namaskar)",
        description: "Secuencia fluida de 12 posturas que calienta todo el cuerpo",
        duration: "3 rondas",
        benefit: "Calienta músculos y articulaciones, activa la circulación"
      },
      {
        name: "Postura del Guerrero I (Virabhadrasana I)",
        description: "Postura de pie que fortalece piernas y abre el pecho",
        duration: "30s por lado",
        benefit: "Fortalece piernas y glúteos, mejora la resistencia"
      },
      {
        name: "Postura del Perro boca abajo (Adho Mukha Svanasana)",
        description: "Inversión suave que estira la cadena posterior",
        duration: "1 min",
        benefit: "Estira la espalda, hombros y pantorrillas"
      },
      {
        name: "Postura de la Cobra (Bhujangasana)",
        description: "Extensión de columna que abre el pecho",
        duration: "30s x 2",
        benefit: "Abre el pecho y mejora la postura"
      },
      {
        name: "Postura del Niño (Balasana)",
        description: "Postura de descanso y conexión interior",
        duration: "1-2 min",
        benefit: "Relaja la espalda y calma la mente"
      }
    ],
    benefits: ["Aumenta energía matutina", "Mejora flexibilidad", "Prepara cuerpo para el día"]
  },
  {
    id: 2,
    title: "Yoga para Después de Comer (Digestión y Ligereza)",
    objective: "Favorecer la digestión, aliviar hinchazón abdominal y aportar energía suave tras comer",
    duration: "20-25 min",
    difficulty: "Principiante",
    time: "Tarde",
    exercises: [
      {
        name: "Respiración Abdominal Suave",
        description: "Respiración que masajea suavemente los órganos digestivos",
        duration: "2 min",
        benefit: "Masajea los órganos digestivos y prepara el cuerpo para el movimiento"
      },
      {
        name: "Torsión Sentada Suave (Ardha Matsyendrasana modificada)",
        description: "Giro espinal suave sentado que estimula la digestión",
        duration: "30s por lado",
        benefit: "Estimula digestión y libera tensión abdominal"
      },
      {
        name: "Gato-Vaca (Marjaryasana-Bitilasana)",
        description: "Movimiento fluido de flexión y extensión espinal",
        duration: "1 min",
        benefit: "Favorece movilidad espinal y masaje intestinal"
      },
      {
        name: "Postura del Niño con torsión lateral",
        description: "Variación de la postura del niño con giro lateral",
        duration: "1 min por lado",
        benefit: "Estira costados y facilita el movimiento intestinal"
      },
      {
        name: "Postura de la Mariposa (Baddha Konasana)",
        description: "Postura sedente que abre caderas y relaja abdomen",
        duration: "2 min",
        benefit: "Abre caderas y relaja abdomen"
      },
      {
        name: "Rodillas al Pecho (Apanasana)",
        description: "Abrazo de rodillas hacia el pecho para masajear abdomen",
        duration: "1-2 min",
        benefit: "Masajea la zona abdominal y reduce gases"
      },
      {
        name: "Savasana con respiración consciente",
        description: "Relajación final con atención a la respiración",
        duration: "5 min",
        benefit: "Relaja completamente y permite que el sistema digestivo trabaje sin tensión"
      }
    ],
    benefits: ["Mejora digestión", "Reduce hinchazón", "Aumenta energía post-comida"]
  },
  {
    id: 3,
    title: "Yoga para Reducir Estrés y Ansiedad",
    objective: "Calmar la mente, mejorar la respiración y disminuir tensión mental",
    duration: "25 min",
    difficulty: "Intermedio",
    time: "Cualquiera",
    exercises: [
      {
        name: "Respiración Alterna (Nadi Shodhana)",
        description: "Respiración por fosas nasales alternas para equilibrar sistema nervioso",
        duration: "3 min",
        benefit: "Equilibra el sistema nervioso y reduce ansiedad"
      },
      {
        name: "Postura del Niño (Balasana)",
        description: "Postura que proporciona sensación de seguridad y recogimiento",
        duration: "2 min",
        benefit: "Proporciona sensación de seguridad y descanso mental"
      },
      {
        name: "Postura de la Mariposa (Baddha Konasana)",
        description: "Apertura de caderas que libera tensión emocional",
        duration: "1 min",
        benefit: "Abre caderas y relaja tensión emocional"
      },
      {
        name: "Torsión Sentada Suave",
        description: "Giros espinales suaves para liberar tensión",
        duration: "30s por lado",
        benefit: "Libera tensión de la columna y órganos internos"
      },
      {
        name: "Postura de la Pierna sobre la pared (Viparita Karani)",
        description: "Inversión suave con piernas apoyadas en la pared",
        duration: "5 min",
        benefit: "Mejora el retorno venoso, calma el sistema nervioso"
      },
      {
        name: "Savasana (Relajación final)",
        description: "Relajación completa consciente de todo el cuerpo",
        duration: "5 min",
        benefit: "Relajación completa del cuerpo y la mente"
      }
    ],
    benefits: ["Reduce estrés", "Calma ansiedad", "Mejora regulación emocional"]
  },
  {
    id: 4,
    title: "Yoga Restaurativo y Relajante",
    objective: "Soltar tensiones físicas y mentales, inducir calma profunda",
    duration: "30 min",
    difficulty: "Principiante",
    time: "Noche",
    exercises: [
      {
        name: "Respiración Ujjayi",
        description: "Respiración con sonido suave que calma el sistema nervioso",
        duration: "3 min",
        benefit: "Calma la mente, regula el ritmo cardíaco y prepara para la relajación"
      },
      {
        name: "Postura del Cocodrilo (Makarasana)",
        description: "Postura boca abajo con brazos cruzados bajo la cabeza",
        duration: "3 min",
        benefit: "Libera tensión lumbar y permite respiración profunda"
      },
      {
        name: "Postura de Rodillas al Pecho (Apanasana)",
        description: "Abrazo suave de rodillas hacia el pecho",
        duration: "2 min",
        benefit: "Relaja la espalda baja y masajea la zona abdominal"
      },
      {
        name: "Postura del Bebé Feliz (Ananda Balasana)",
        description: "Postura lúdica que abre caderas y relaja",
        duration: "2 min",
        benefit: "Suelta tensión en caderas y zona lumbar; promueve sensación de juego y relajación"
      },
      {
        name: "Postura de la Diosa Reclining (Supta Baddha Konasana)",
        description: "Apertura de caderas y pecho en posición supina",
        duration: "5 min",
        benefit: "Abre caderas y pecho, facilita respiración profunda y relajación"
      },
      {
        name: "Piernas en la Pared (Viparita Karani)",
        description: "Inversión reparadora con piernas en la pared",
        duration: "7 min",
        benefit: "Mejora la circulación, reduce cansancio en piernas y calma el sistema nervioso"
      },
      {
        name: "Savasana Guiada (Relajación Final)",
        description: "Relajación guiada con visualización o respiración consciente",
        duration: "8 min",
        benefit: "Relajación total del cuerpo y mente; puedes acompañar con respiración consciente o visualización"
      }
    ],
    benefits: ["Relajación profunda", "Libera tensiones", "Calma sistema nervioso"]
  },
  {
    id: 5,
    title: "Yoga para Dormir Mejor",
    objective: "Relajar el cuerpo y la mente antes de dormir",
    duration: "20 min",
    difficulty: "Principiante",
    time: "Noche",
    exercises: [
      {
        name: "Respiración 4-7-8",
        description: "Técnica respiratoria sedante para inducir relajación",
        duration: "2 min",
        benefit: "Induce relajación profunda"
      },
      {
        name: "Postura de la Mariposa tumbada (Supta Baddha Konasana)",
        description: "Apertura suave de caderas en posición supina",
        duration: "2 min",
        benefit: "Relaja caderas y zona lumbar"
      },
      {
        name: "Torsión Supina (Supta Matsyendrasana)",
        description: "Giro espinal suave en el suelo",
        duration: "1 min por lado",
        benefit: "Libera tensión de la espalda"
      },
      {
        name: "Postura de las Piernas en la pared (Viparita Karani)",
        description: "Inversión calmante con soporte",
        duration: "5 min",
        benefit: "Calma el sistema nervioso y facilita el sueño"
      },
      {
        name: "Savasana con respiración lenta",
        description: "Relajación final con respiración progresivamente más lenta",
        duration: "5-7 min",
        benefit: "Cierra la sesión con relajación total"
      }
    ],
    benefits: ["Facilita el sueño", "Calma mente", "Relaja cuerpo"]
  },
  {
    id: 6,
    title: "Yoga para la Espalda y Postura",
    objective: "Fortalecer y estirar la espalda, mejorar la alineación corporal",
    duration: "25 min",
    difficulty: "Intermedio",
    time: "Cualquiera",
    exercises: [
      {
        name: "Respiración diafragmática",
        description: "Respiración profunda que activa la conciencia corporal",
        duration: "2 min",
        benefit: "Activa la conciencia corporal"
      },
      {
        name: "Gato-Vaca",
        description: "Movimiento de flexión y extensión espinal",
        duration: "1 min",
        benefit: "Flexibiliza y lubrica la columna"
      },
      {
        name: "Postura de la Esfinge (Salamba Bhujangasana)",
        description: "Extensión suave de columna con apoyo de antebrazos",
        duration: "30s x 2",
        benefit: "Fortalece lumbares suavemente"
      },
      {
        name: "Postura del Perro Boca Abajo",
        description: "Inversión que alarga la columna",
        duration: "1 min",
        benefit: "Estira columna y hombros"
      },
      {
        name: "Postura del Puente (Setu Bandhasana)",
        description: "Fortalecimiento de cadena posterior",
        duration: "30s x 2",
        benefit: "Fortalece glúteos y mejora la postura"
      },
      {
        name: "Torsión Supina",
        description: "Giros espinales en el suelo",
        duration: "1 min por lado",
        benefit: "Relaja la zona lumbar y dorsal"
      },
      {
        name: "Savasana",
        description: "Relajación final enfocada en la columna",
        duration: "3 min",
        benefit: "Finaliza relajando toda la columna"
      }
    ],
    benefits: ["Mejora postura", "Fortalece espalda", "Reduce dolor lumbar"]
  },
  {
    id: 7,
    title: "Yoga para la Tarde (Renovación y Equilibrio)",
    objective: "Recuperar energía a media tarde, reducir fatiga mental y mejorar la concentración sin activar demasiado el cuerpo",
    duration: "25-30 min",
    difficulty: "Intermedio",
    time: "Tarde",
    exercises: [
      {
        name: "Respiración Alterna (Nadi Shodhana)",
        description: "Respiración por fosas nasales alternas",
        duration: "3 min",
        benefit: "Equilibra hemisferios cerebrales, aporta claridad mental"
      },
      {
        name: "Postura de la Montaña con Brazos Arriba (Tadasana Urdhva Hastasana)",
        description: "Postura de pie con brazos elevados",
        duration: "1 min",
        benefit: "Estira columna y activa circulación suave"
      },
      {
        name: "Postura del Triángulo Suave (Trikonasana con apoyo)",
        description: "Flexión lateral con soporte",
        duration: "30s por lado",
        benefit: "Abre costados, favorece respiración profunda y libera tensión"
      },
      {
        name: "Postura de la Media Luna en el Suelo (Ardha Chandrasana adaptada)",
        description: "Postura de equilibrio modificada",
        duration: "1 min por lado",
        benefit: "Mejora equilibrio interno sin fatiga"
      },
      {
        name: "Torsión Supina Suave",
        description: "Giros espinales suaves en el suelo",
        duration: "1 min por lado",
        benefit: "Libera tensión acumulada en columna y abdomen"
      },
      {
        name: "Piernas en la Pared (Viparita Karani)",
        description: "Inversión restaurativa",
        duration: "5 min",
        benefit: "Reduce la pesadez de piernas y calma el sistema nervioso"
      },
      {
        name: "Savasana o Meditación Cortita",
        description: "Relajación final o meditación breve",
        duration: "5 min",
        benefit: "Finaliza la sesión renovado, listo para continuar el día con claridad y calma"
      }
    ],
    benefits: ["Renueva energía", "Mejora concentración", "Equilibra día"]
  }
];

const relaxingSounds = [
  { name: "Sonido de pájaros cantando", icon: "🐦", category: "nature" },
  { name: "Sonido de olas rompiendo", icon: "🌊", category: "nature" },
  { name: "Sonido de lluvia", icon: "🌧️", category: "nature" },
  { name: "Sonido de río fluyendo", icon: "🏞️", category: "nature" },
  { name: "Sonido paisaje con cascada", icon: "💧", category: "nature" },
  { name: "Ruido blanco", icon: "⚪", category: "technical" },
  { name: "Ruido Rosa", icon: "🌸", category: "technical" }
];

const relaxingMusic = [
  { name: "Hymn to the Dawn", artist: "Scott Buckley", duration: "3:42" },
  { name: "Morning Sunrise", artist: "Calm Ambient Music", duration: "4:15" },
  { name: "Meditation Music", artist: "Pixabay", duration: "5:30" },
  { name: "Sunrise (Ambient Instrumental)", artist: "Pixabay", duration: "4:48" },
  { name: "417Hz Energy Cleansing", artist: "Freesound (CC0)", duration: "6:00" },
  { name: "741Hz Inner Peace", artist: "Freesound (CC0)", duration: "6:00" },
  { name: "Deep Sleep Ambient", artist: "Pixabay", duration: "7:22" }
];

export default function MeditationRelaxation() {
  const [activeSession, setActiveSession] = useState<'meditation' | 'breathing' | 'yoga' | null>(null);
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationType | null>(null);
  const [selectedBreathing, setSelectedBreathing] = useState<BreathingTechnique | null>(null);
  const [selectedYoga, setSelectedYoga] = useState<YogaSession | null>(null);
  const [sessionTime, setSessionTime] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [breathingCycles, setBreathingCycles] = useState(10);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [playingSound, setPlayingSound] = useState<string | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const startMeditationTimer = () => {
    setTimeRemaining(sessionTime * 60);
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Circle className="w-8 h-8 text-purple-500" />
          Meditación y Relajación
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calma tu mente, reduce el estrés y encuentra el equilibrio interior con técnicas milenarias
        </p>
      </div>

      {/* Benefits Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">🧘 Beneficios de la Meditación</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-blue-500 mt-0.5" />
              <div>
                <div className="font-medium">Salud Mental</div>
                <div className="text-muted-foreground">Reduce ansiedad, mejora concentración y claridad mental</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-red-500 mt-0.5" />
              <div>
                <div className="font-medium">Salud Emocional</div>
                <div className="text-muted-foreground">Desarrolla ecuanimidad y regulación emocional</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Leaf className="w-4 h-4 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Salud Física</div>
                <div className="text-muted-foreground">Reduce presión arterial y fortalece sistema inmune</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="meditation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="meditation">Meditación</TabsTrigger>
          <TabsTrigger value="breathing">Respiración</TabsTrigger>
          <TabsTrigger value="yoga">Yoga (7 sesiones)</TabsTrigger>
          <TabsTrigger value="sounds">Sonidos</TabsTrigger>
        </TabsList>

        {/* Meditation Tab */}
        <TabsContent value="meditation" className="space-y-4">
          {/* Timer Section */}
          {activeSession === 'meditation' && (
            <Card className="bg-gradient-to-br from-purple-100 to-blue-100 border-purple-300">
              <CardHeader>
                <CardTitle className="text-center">
                  {selectedMeditation?.name} - {formatTime(timeRemaining)}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto relative">
                  <Circle className="w-full h-full text-purple-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">{selectedMeditation?.icon}</span>
                  </div>
                </div>
                
                <div className="flex justify-center gap-2">
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    variant={isPlaying ? "secondary" : "default"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsPlaying(false);
                      setTimeRemaining(sessionTime * 60);
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveSession(null)}
                  >
                    Cerrar
                  </Button>
                </div>

                <div className="text-sm text-purple-700 bg-white/50 p-3 rounded-lg">
                  <strong>Técnica:</strong> {selectedMeditation?.technique}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Meditation Timer Setup */}
          {!activeSession && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  Temporizador Personalizado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-6 gap-2">
                  {[3, 5, 10, 12, 15, 20].map(time => (
                    <Button 
                      key={time}
                      variant={sessionTime === time ? "default" : "outline"}
                      onClick={() => setSessionTime(time)}
                      className="w-full"
                    >
                      {time}m
                    </Button>
                  ))}
                </div>
                
                <Button 
                  onClick={startMeditationTimer} 
                  className="w-full"
                  disabled={!selectedMeditation}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar Meditación ({sessionTime} min)
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Meditation Types */}
          <div className="grid md:grid-cols-2 gap-4">
            {meditationTypes.map((type, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all ${
                  selectedMeditation?.name === type.name 
                    ? 'ring-2 ring-purple-500 bg-purple-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => {
                  setSelectedMeditation(type);
                  setActiveSession('meditation');
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{type.icon}</span>
                    {type.name}
                  </CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="outline">{type.sessions} sesiones guiadas</Badge>
                    <div className="text-sm">
                      <strong>Beneficios principales:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {type.benefits.slice(0, 2).map((benefit, i) => (
                          <li key={i} className="text-muted-foreground">{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Educational Content */}
          <Card>
            <CardHeader>
              <CardTitle>📚 Sobre la Meditación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">¿Qué es la meditación?</h4>
                <p className="text-muted-foreground">
                  La meditación es una práctica mental que entrena la atención y la conciencia. 
                  No se trata de detener los pensamientos, sino de observarlos sin juzgar y desarrollar una mente más calmada y clara.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">🧠 Beneficios Científicos</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Reduce el cortisol (hormona del estrés) hasta un 23%</li>
                  <li>Aumenta la materia gris en áreas relacionadas con la memoria</li>
                  <li>Mejora la función del sistema inmunológico</li>
                  <li>Reduce la presión arterial y mejora la salud cardiovascular</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">💭 Los pensamientos no son enemigos</h4>
                <p className="text-muted-foreground">
                  Es normal que la mente divague durante la meditación. Cuando notes que te has distraído, 
                  simplemente vuelve suavemente al foco de atención sin juzgarte. Esta es la práctica.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Breathing Tab */}
        <TabsContent value="breathing" className="space-y-4">
          {/* Active Breathing Session */}
          {activeSession === 'breathing' && selectedBreathing && (
            <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-300">
              <CardHeader>
                <CardTitle className="text-center">
                  {selectedBreathing.name}
                </CardTitle>
                <CardDescription className="text-center">
                  Ciclo {currentCycle + 1} de {breathingCycles}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-4xl mb-4">💨</div>
                <div className="text-lg font-medium">{selectedBreathing.pattern}</div>
                
                <Progress value={(currentCycle / breathingCycles) * 100} className="h-2" />
                
                <div className="grid grid-cols-4 gap-2 text-sm">
                  {selectedBreathing.instructions.map((instruction, i) => (
                    <div key={i} className="p-2 bg-white/50 rounded text-center">
                      {instruction}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-2">
                  <Button onClick={() => setCurrentCycle(Math.min(currentCycle + 1, breathingCycles - 1))}>
                    Siguiente
                  </Button>
                  <Button variant="outline" onClick={() => setActiveSession(null)}>
                    Terminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Breathing Techniques */}
          {!activeSession && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>⚙️ Configuración</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium">Número de ciclos:</label>
                    <Select value={breathingCycles.toString()} onValueChange={(value) => setBreathingCycles(parseInt(value))}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 8, 10, 15, 20].map(cycles => (
                          <SelectItem key={cycles} value={cycles.toString()}>{cycles}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                {breathingTechniques.map((technique, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => {
                      setSelectedBreathing(technique);
                      setActiveSession('breathing');
                      setCurrentCycle(0);
                    }}
                  >
                    <CardHeader>
                      <CardTitle>{technique.name}</CardTitle>
                      <CardDescription>{technique.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm">
                          <strong>Patrón:</strong> {technique.pattern}
                        </div>
                        <div className="text-sm">
                          <strong>Beneficios:</strong>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            {technique.benefits.map((benefit, i) => (
                              <li key={i} className="text-muted-foreground">{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Yoga Tab */}
        <TabsContent value="yoga" className="space-y-4">
          {/* Yoga Session Detail */}
          {selectedYoga && (
            <Dialog open={!!selectedYoga} onOpenChange={() => setSelectedYoga(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{selectedYoga.title}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Target className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <div className="text-sm font-medium">{selectedYoga.duration}</div>
                      <div className="text-xs text-muted-foreground">Duración</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Activity className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <div className="text-sm font-medium">{selectedYoga.difficulty}</div>
                      <div className="text-xs text-muted-foreground">Nivel</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      {selectedYoga.time === 'Mañana' ? <Sun className="w-5 h-5 mx-auto mb-1 text-yellow-500" /> :
                       selectedYoga.time === 'Noche' ? <Moon className="w-5 h-5 mx-auto mb-1 text-blue-500" /> :
                       <Circle className="w-5 h-5 mx-auto mb-1 text-primary" />}
                      <div className="text-sm font-medium">{selectedYoga.time}</div>
                      <div className="text-xs text-muted-foreground">Momento</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Zap className="w-5 h-5 mx-auto mb-1 text-green-500" />
                      <div className="text-sm font-medium">{selectedYoga.exercises.length}</div>
                      <div className="text-xs text-muted-foreground">Ejercicios</div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">🎯 Objetivo</h4>
                    <p className="text-sm text-blue-700">{selectedYoga.objective}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Secuencia de Ejercicios:</h4>
                    {selectedYoga.exercises.map((exercise, i) => (
                      <Card key={i} className="border-l-4 border-primary">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{exercise.name}</CardTitle>
                            <Badge variant="outline">{exercise.duration}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">{exercise.description}</p>
                          <div className="text-sm">
                            <strong>Beneficio:</strong> {exercise.benefit}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">✨ Beneficios de esta sesión</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedYoga.benefits.map((benefit, i) => (
                        <Badge key={i} variant="outline" className="text-green-700 border-green-300">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Yoga Sessions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {yogaSessions.map((session) => (
              <Card 
                key={session.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedYoga(session)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{session.title}</CardTitle>
                    <Badge variant={
                      session.difficulty === 'Principiante' ? 'default' :
                      session.difficulty === 'Intermedio' ? 'secondary' : 'destructive'
                    }>
                      {session.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {session.objective}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4" />
                      <span>{session.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.time === 'Mañana' ? <Sun className="w-4 h-4 text-yellow-500" /> :
                       session.time === 'Noche' ? <Moon className="w-4 h-4 text-blue-500" /> :
                       <Circle className="w-4 h-4" />}
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <span>{session.exercises.length} ejercicios</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Yoga Info */}
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800">🧘‍♀️ Sobre las Sesiones de Yoga</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-orange-700 space-y-2">
                <p>
                  Cada sesión está diseñada para momentos específicos del día y objetivos particulares. 
                  Todas incluyen explicaciones detalladas de para qué sirve cada ejercicio.
                </p>
                <p>
                  <strong>Tip:</strong> Empieza con sesiones de nivel principiante y progresa gradualmente. 
                  Escucha a tu cuerpo y nunca fuerces las posturas.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sounds Tab */}
        <TabsContent value="sounds" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Nature Sounds */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  Sonidos de la Naturaleza
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {relaxingSounds.filter(sound => sound.category === 'nature').map((sound, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{sound.icon}</span>
                        <span className="text-sm">{sound.name}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setPlayingSound(playingSound === sound.name ? null : sound.name)}
                      >
                        {playingSound === sound.name ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technical Sounds */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  Sonidos Técnicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {relaxingSounds.filter(sound => sound.category === 'technical').map((sound, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{sound.icon}</span>
                        <span className="text-sm">{sound.name}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setPlayingSound(playingSound === sound.name ? null : sound.name)}
                      >
                        {playingSound === sound.name ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Relaxing Music */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-purple-500" />
                Música Relajante
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {relaxingMusic.map((track, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{track.name}</div>
                      <div className="text-xs text-muted-foreground">{track.artist} • {track.duration}</div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setPlayingSound(playingSound === track.name ? null : track.name)}
                    >
                      {playingSound === track.name ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sound Player */}
          {playingSound && (
            <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Reproduciendo: {playingSound}</div>
                    <div className="text-sm text-muted-foreground">Los archivos de audio se añadirán en la próxima actualización</div>
                  </div>
                  <Button variant="outline" onClick={() => setPlayingSound(null)}>
                    <VolumeX className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
