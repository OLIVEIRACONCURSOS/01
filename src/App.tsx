import React, { useState, useEffect } from 'react';
import {
  Scale, BookOpen, Award, ShieldCheck, Phone, MessageCircle, ShoppingCart,
  User, Lock, CheckCircle, Search, Filter, ChevronRight, Menu, X, ArrowRight,
  DollarSign, FileText, Settings, LogOut, HelpCircle, AlertTriangle, ExternalLink
} from 'lucide-react';
import logoEmblem from './assets/uploads/1792452124665-0-Emblema-Dourado-da-Oliveira-Concursos.png';

interface Course {
  id: string;
  title: string;
  category: 'OAB' | 'Concursos Públicos' | 'Carreiras Jurídicas' | 'Outras Preparações';
  institution: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice: number;
  image: string;
  badge?: string;
  features: string[];
  targetAudience: string;
}

interface Order {
  id: string;
  courseTitle: string;
  clientName: string;
  clientPhone: string;
  amount: number;
  status: 'Pendente' | 'Confirmado' | 'Cancelado';
  date: string;
  paymentMethod: string;
}

const INITIAL_COURSES: Course[] = [
  {
    id: 'oab-1-fase',
    title: 'Intensivo OAB 1ª Fase - Exame Unificado',
    category: 'OAB',
    institution: 'Oliveira Concursos & Parceiros',
    description: 'Preparação focada nos principais temas cobrados pela FGV com simulados comentados.',
    longDescription: 'O curso mais completo para garantir sua aprovação na 1ª fase da OAB. Conteúdo atualizado, resolução de questões da FGV, simulados inéditos e mapas mentais exclusivos.',
    price: 697.00,
    originalPrice: 997.00,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    badge: 'Mais Vendido',
    features: ['Mais de 180h de vídeo aulas', 'Simulados semanais comentados', 'Cronograma de estudos personalizado', 'Grupo VIP de tira-dúvidas'],
    targetAudience: 'Bacharel em Direito ou estudantes do último ano da faculdade de Direito.'
  },
  {
    id: 'oab-2-fase-penal',
    title: 'OAB 2ª Fase - Direito Penal',
    category: 'OAB',
    institution: 'Oliveira Concursos',
    description: 'Domine a peça profissional e as questões discursivas de Penal com técnica infalível.',
    longDescription: 'Treinamento intensivo de 2ª fase em Direito Penal. Aprenda a estruturar peças perfeitas, fundamentar artigos com segurança e treinar discursivas corrigidas.',
    price: 797.00,
    originalPrice: 1100.00,
    image: 'https://images.unsplash.com/photo-1453945619913-79ec89ba6565?auto=format&fit=crop&w=800&q=80',
    badge: 'Destaque',
    features: ['Correção individualizada de peças', 'Vade Mecum estratégico', 'Aulas de jurisprudência STF/STJ', 'Simulado realístico com tempo cronometrado'],
    targetAudience: 'Aprovados na 1ª fase que escolheram a editoria de Direito Penal.'
  },
  {
    id: 'concurso-prf',
    title: 'Polícia Rodoviária Federal - PRF (Completo)',
    category: 'Concursos Públicos',
    institution: 'Oliveira Concursos',
    description: 'Edital verticalizado, legislação de trânsito aprofundada e foco total na banca.',
    longDescription: 'Prepare-se para o concurso da PRF com a equipe que mais entende de carreiras policiais. Aulas teóricas, resolução de questões e simulados físicos e mentais.',
    price: 1297.00,
    originalPrice: 1697.00,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    badge: 'Alta Procura',
    features: ['Legislação de Trânsito esquematizada', 'Física e Redação discursiva', 'Simulados no padrão da banca', 'Plataforma de flashcards'],
    targetAudience: 'Candidatos de nível superior com CNH categoria B.'
  },
  {
    id: 'concurso-inss',
    title: 'Técnico do Seguro Social - INSS',
    category: 'Concursos Públicos',
    institution: 'Oliveira Concursos',
    description: 'Direito Previdenciário descomplicado e foco em todas as disciplinas do edital.',
    longDescription: 'O curso definitivo para o concurso do INSS. Professor referência nacional em Direito Previdenciário com foco em memorização de artigos e jurisprudência.',
    price: 497.00,
    originalPrice: 797.00,
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    features: ['Direito Previdenciário completo', 'Português e Raciocínio Lógico', 'Caderno de 3.000 questões comentadas', 'Garantia de atualização pós-edital'],
    targetAudience: 'Candidatos com ensino médio completo.'
  },
  {
    id: 'juridica-magistratura',
    title: 'Magistratura e Ministério Público Estaduais (Reta Final)',
    category: 'Carreiras Jurídicas',
    institution: 'Oliveira Concursos & Jurídico',
    description: 'Aprofundamento avançado em jurisprudência do STF/STJ, súmulas e peças.',
    longDescription: 'Preparação de alto nível para magistratura e promotoria. Estudo direcionado de informativos, resoluções de casos práticos e discursivas de alto padrão.',
    price: 1897.00,
    originalPrice: 2497.00,
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb13745?auto=format&fit=crop&w=800&q=80',
    badge: 'Exclusivo',
    features: ['Análise de informativos dos últimos 5 anos', 'Simulados de 1ª e 2ª fase', 'Mentorias ao vivo com magistrados', 'Material em PDF avançado'],
    targetAudience: 'Bacharel em Direito com exigência de 3 anos de prática jurídica.'
  },
  {
    id: 'juridica-delegado',
    title: 'Delegado de Polícia Civil - Carreiras Policiais',
    category: 'Carreiras Jurídicas',
    institution: 'Oliveira Concursos',
    description: 'Direito Penal, Processual Penal, Criminologia e Legislação Penal Especial.',
    longDescription: 'Treinamento completo para o cargo de Delegado de Polícia Civil. Foco em peças cautelares, inquérito policial, jurisprudência e prática policial.',
    price: 1197.00,
    originalPrice: 1597.00,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    features: ['Peças cautelares e fundamentação', 'Medicina Legal e Criminologia', 'Simulados de prova oral', 'Videoaulas aprofundadas'],
    targetAudience: 'Bacharel em Direito.'
  },
  {
    id: 'outros-enem',
    title: 'ENEM Nota 1000 - Extensivo Completo',
    category: 'Outras Preparações',
    institution: 'Oliveira Concursos',
    description: 'Redação nota 1000 e todas as áreas do conhecimento para o ENEM.',
    longDescription: 'Prepare-se para conquistar a vaga dos sonhos na universidade com nosso método exclusivo de redação e simulados oficiais.',
    price: 397.00,
    originalPrice: 597.00,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    features: ['Correção ilimitada de redações', 'Aulas de Matemática e Linguagens', 'Cronograma adaptativo', 'Banco de simulados TRI'],
    targetAudience: 'Estudantes do ensino médio e pré-vestibulandos.'
  }
];

export function App() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'course-detail' | 'admin' | 'student' | 'privacy' | 'terms'>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('oab-1-fase');
  
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [isStudentLogged, setIsStudentLogged] = useState<boolean>(false);
  const [studentEmail, setStudentEmail] = useState<string>('');
  const [studentPassword, setStudentPassword] = useState<string>('');

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-1001',
      courseTitle: 'Intensivo OAB 1ª Fase',
      clientName: 'Carlos Eduardo Silva',
      clientPhone: '71991234567',
      amount: 697.00,
      status: 'Pendente',
      date: '2025-05-12 14:30',
      paymentMethod: 'Pix Manual'
    }
  ]);

  const whatsappNumber = '5571992747496';

  const openWhatsApp = (courseTitle?: string) => {
    const text = courseTitle 
      ? `Olá! Conheci o curso *${courseTitle}* pelo site da Oliveira Concursos e gostaria de receber informações sobre valores, acesso e formas de pagamento.`
      : `Olá! Conheci o site da Oliveira Concursos e gostaria de receber informações sobre os cursos preparatórios.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const filteredCourses = courses.filter(c => {
    const matchCat = selectedCategory === 'Todos' || c.category === selectedCategory;
    const matchQuery = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123' || adminPassword === 'oliveira2025') {
      setIsAdmin(true);
    } else {
      alert('Senha incorreta! Use admin123');
    }
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentEmail) {
      setIsStudentLogged(true);
    } else {
      alert('Por favor, informe seu e-mail cadastrado.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <div className="bg-gradient-to-r from-blue-900 via-amber-600 to-blue-900 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-inner">
        ⚡ Matrículas Abertas para Turmas 2025 | Garantia de Atualização Pós-Edital | Fale Conosco pelo WhatsApp (71) 99274-7496
      </div>

      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-amber-500/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <img 
              src={logoEmblem} 
              alt="Oliveira Concursos Emblema" 
              className="w-12 h-12 object-contain rounded-full border border-amber-500/50 shadow-md group-hover:scale-105 transition"
            />
            <div>
              <span className="text-xl font-bold tracking-wider text-white font-serif flex items-center gap-1">
                OLIVEIRA <span className="text-amber-400">CONCURSOS</span>
              </span>
              <span className="text-xs text-amber-200 tracking-widest block uppercase">Sua aprovação começa aqui</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('home')}
              className={`text-sm font-medium hover:text-amber-400 transition ${activeTab === 'home' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : 'text-slate-300'}`}
            >
              Início
            </button>
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`text-sm font-medium hover:text-amber-400 transition ${activeTab === 'catalog' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : 'text-slate-300'}`}
            >
              Catálogo de Cursos
            </button>
            <button 
              onClick={() => setActiveTab('student')}
              className={`text-sm font-medium hover:text-amber-400 transition ${activeTab === 'student' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : 'text-slate-300'}`}
            >
              Área do Aluno
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={`text-sm font-medium hover:text-amber-400 transition flex items-center gap-1 ${activeTab === 'admin' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : 'text-slate-300'}`}
            >
              <Lock className="w-3.5 h-3.5" /> Admin
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openWhatsApp()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {activeTab === 'home' && (
          <div>
            <section className="relative bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 py-20 px-4 sm:px-6 lg:px-8 border-b border-amber-500/20 overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-sm">
                    <Scale className="w-4 h-4" /> Referência em Aprovação na OAB e Concursos
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif tracking-tight leading-tight mb-6">
                    Sua aprovação começa com a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">preparação certa!</span>
                  </h1>
                  <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
                    Encontre cursos preparatórios para OAB, concursos públicos e carreiras jurídicas em um só lugar. Metodologia validada e foco total nos editais.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button
                      onClick={() => setActiveTab('catalog')}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
                    >
                      Explorar Cursos <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openWhatsApp()}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <MessageCircle className="w-5 h-5 text-emerald-400" /> Fale conosco pelo WhatsApp
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-full max-w-md">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-blue-600 rounded-3xl blur-lg opacity-30"></div>
                    <div className="relative bg-slate-900 border border-amber-500/40 p-6 rounded-3xl shadow-2xl flex flex-col items-center text-center">
                      <img 
                        src={logoEmblem} 
                        alt="Emblema Oliveira Concursos" 
                        className="w-32 h-32 object-contain mb-4 rounded-full border-2 border-amber-400 shadow-xl"
                      />
                      <h3 className="text-xl font-bold text-white font-serif mb-1">Oliveira Concursos</h3>
                      <p className="text-xs text-amber-300 uppercase tracking-widest mb-4">Excelência Acadêmica</p>
                      <div className="w-full bg-slate-800/80 rounded-xl p-4 text-left border border-slate-700 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          <span>Professores renomados e especialistas</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          <span>Simulados e materiais em PDF</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          <span>Atendimento humanizado via WhatsApp</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16 bg-slate-900/60 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold text-white font-serif mb-4">Por que escolher a Oliveira Concursos?</h2>
                  <p className="text-slate-400">Oferecemos a estrutura completa que você precisa para conquistar sua vaga no serviço público ou na OAB.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg hover:border-amber-500/50 transition">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Conteúdo Direcionado</h3>
                    <p className="text-slate-400 text-sm">
                      Foco absoluto no que realmente cai nas provas da FGV, Cebraspe, FCC e demais bancas examinadoras.
                    </p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg hover:border-amber-500/50 transition">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Segurança e Confiança</h3>
                    <p className="text-slate-400 text-sm">
                      Suporte individualizado pelo WhatsApp para tirar dúvidas de matrícula, acesso e cronogramas.
                    </p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg hover:border-amber-500/50 transition">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Material Atualizado</h3>
                    <p className="text-slate-400 text-sm">
                      Videoaulas em alta definição, apostilas em PDF esquematizadas e simulados inéditos.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                <div>
                  <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Cursos em Destaque</span>
                  <h2 className="text-3xl font-bold text-white font-serif mt-1">Prepare-se com os melhores programas</h2>
                </div>
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className="mt-4 md:mt-0 text-amber-400 hover:text-amber-300 font-semibold text-sm flex items-center gap-1"
                >
                  Ver catálogo completo <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.slice(0, 3).map(course => (
                  <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col group hover:border-amber-500/50 transition">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      {course.badge && (
                        <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow">
                          {course.badge}
                        </span>
                      )}
                      <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-500/30">
                        {course.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-300 transition">
                        {course.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="mt-auto">
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl font-extrabold text-amber-400">
                            R$ {course.price.toFixed(2).replace('.', ',')}
                          </span>
                          {course.originalPrice > course.price && (
                            <span className="text-sm text-slate-500 line-through">
                              R$ {course.originalPrice.toFixed(2).replace('.', ',')}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              setSelectedCourseId(course.id);
                              setActiveTab('course-detail');
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 px-3 rounded-lg text-center transition"
                          >
                            Ver Detalhes
                          </button>
                          <button
                            onClick={() => openWhatsApp(course.title)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> Comprar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-4">Catálogo de Cursos Preparatórios</h1>
              <p className="text-slate-400">Filtre por categoria ou pesquise o curso ideal para sua aprovação na OAB, concursos públicos ou carreiras jurídicas.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
              <div className="w-full md:w-96 relative">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar curso por nome..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
                {['Todos', 'OAB', 'Concursos Públicos', 'Carreiras Jurídicas', 'Outras Preparações'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                      selectedCategory === cat 
                        ? 'bg-amber-500 text-slate-950 shadow-md' 
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
                <p className="text-slate-400 text-lg mb-2">Nenhum curso encontrado para sua busca.</p>
                <button 
                  onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
                  className="text-amber-400 text-sm font-semibold underline"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map(course => (
                  <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col group hover:border-amber-500/50 transition">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      {course.badge && (
                        <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow">
                          {course.badge}
                        </span>
                      )}
                      <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-500/30">
                        {course.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-300 transition">
                        {course.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="mt-auto">
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl font-extrabold text-amber-400">
                            R$ {course.price.toFixed(2).replace('.', ',')}
                          </span>
                          {course.originalPrice > course.price && (
                            <span className="text-sm text-slate-500 line-through">
                              R$ {course.originalPrice.toFixed(2).replace('.', ',')}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              setSelectedCourseId(course.id);
                              setActiveTab('course-detail');
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 px-3 rounded-lg text-center transition"
                          >
                            Ver Detalhes
                          </button>
                          <button
                            onClick={() => openWhatsApp(course.title)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> Comprar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'course-detail' && currentCourse && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button 
              onClick={() => setActiveTab('catalog')}
              className="text-amber-400 text-sm font-semibold mb-6 flex items-center gap-1 hover:underline"
            >
              ← Voltar para o Catálogo
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold px-3 py-1 rounded-full uppercase">
                    {currentCourse.category}
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif mt-3 mb-4">
                    {currentCourse.title}
                  </h1>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {currentCourse.longDescription}
                  </p>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                  <img src={currentCourse.image} alt={currentCourse.title} className="w-full h-80 object-cover" />
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-white font-serif mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" /> O que você vai encontrar neste curso:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentCourse.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-amber-400 font-bold">✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-white font-serif mb-2">Público-Alvo</h3>
                  <p className="text-slate-300 text-sm">{currentCourse.targetAudience}</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-white font-serif mb-4">Perguntas Frequentes (FAQ)</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-amber-300 mb-1">Como recebo os dados de acesso após o pagamento?</h4>
                      <p className="text-slate-400">Após realizar o pagamento via Pix manual e enviar o comprovante no WhatsApp, nossa equipe valida o pedido e libera o acesso à plataforma de estudos em até 1 hora.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-300 mb-1">As aulas são atualizadas caso o edital mude?</h4>
                      <p className="text-slate-400">Sim! Todos os nossos cursos contam com garantia de atualização pós-edital sem nenhum custo adicional.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="sticky top-28 bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <div className="text-center mb-6">
                    <span className="text-xs text-slate-400 uppercase tracking-widest">Investimento Único</span>
                    <div className="flex items-baseline justify-center gap-3 mt-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">
                        R$ {currentCourse.price.toFixed(2).replace('.', ',')}
                      </span>
                      {currentCourse.originalPrice > currentCourse.price && (
                        <span className="text-slate-500 line-through text-base">
                          R$ {currentCourse.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold mt-1 block">Pagamento via Pix ou WhatsApp</span>
                  </div>

                  <div className="space-y-4 mb-6 text-sm text-slate-300">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Acesso imediato após confirmação</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Instituição: {currentCourse.institution}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Suporte direto via WhatsApp</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openWhatsApp(currentCourse.title)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition mb-3"
                  >
                    <MessageCircle className="w-5 h-5" /> Comprar pelo WhatsApp
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    Ao clicar, você será direcionado para o atendimento comercial oficial da Oliveira Concursos (71 99274-7496).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {!isAdmin ? (
              <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-6">
                  <Lock className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                  <h2 className="text-2xl font-bold text-white font-serif">Área Administrativa</h2>
                  <p className="text-slate-400 text-sm">Acesso restrito à equipe Oliveira Concursos</p>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Senha de Acesso (padrão: admin123)</label>
                    <input 
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition"
                  >
                    Entrar no Painel
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <div>
                    <h1 className="text-2xl font-bold text-white font-serif">Painel de Gestão - Oliveira Concursos</h1>
                    <p className="text-slate-400 text-sm">Gerencie cursos, preços, ofertas e pedidos manuais.</p>
                  </div>
                  <button 
                    onClick={() => setIsAdmin(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sair do Admin
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <span className="text-slate-400 text-xs uppercase">Total de Cursos</span>
                    <h3 className="text-3xl font-extrabold text-amber-400 mt-1">{courses.length}</h3>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <span className="text-slate-400 text-xs uppercase">Pedidos Registrados</span>
                    <h3 className="text-3xl font-extrabold text-white mt-1">{orders.length}</h3>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <span className="text-slate-400 text-xs uppercase">WhatsApp Comercial</span>
                    <h3 className="text-lg font-bold text-emerald-400 mt-1">(71) 99274-7496</h3>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Pedidos e Confirmação de Pagamento Pix</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase">
                          <th className="pb-3">Pedido</th>
                          <th className="pb-3">Cliente / WhatsApp</th>
                          <th className="pb-3">Curso</th>
                          <th className="pb-3">Valor</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {orders.map(order => (
                          <tr key={order.id} className="text-slate-300">
                            <td className="py-4 font-mono text-xs text-amber-400">{order.id}</td>
                            <td className="py-4">
                              <div className="font-semibold text-white">{order.clientName}</div>
                              <div className="text-xs text-slate-400">{order.clientPhone}</div>
                            </td>
                            <td className="py-4">{order.courseTitle}</td>
                            <td className="py-4 font-bold text-amber-400">R$ {order.amount.toFixed(2)}</td>
                            <td className="py-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                order.status === 'Confirmado' 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4">
                              <button
                                onClick={() => {
                                  setOrders(orders.map(o => o.id === order.id ? { ...o, status: o.status === 'Confirmado' ? 'Pendente' : 'Confirmado' } : o));
                                }}
                                className="bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg text-amber-300"
                              >
                                Alternar Status
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Cursos Cadastrados</h3>
                    <span className="text-xs text-slate-400">Preços e descrições editáveis</span>
                  </div>
                  <div className="space-y-4">
                    {courses.map(course => (
                      <div key={course.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-950 p-4 rounded-xl border border-slate-800 gap-4">
                        <div>
                          <span className="text-xs text-amber-400 font-semibold">{course.category}</span>
                          <h4 className="font-bold text-white text-base">{course.title}</h4>
                          <p className="text-xs text-slate-400">Preço atual: R$ {course.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              const newPrice = prompt('Novo preço (R$):', course.price.toString());
                              if (newPrice && !isNaN(Number(newPrice))) {
                                setCourses(courses.map(c => c.id === course.id ? { ...c, price: Number(newPrice) } : c));
                              }
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-3 py-2 rounded-lg text-slate-200"
                          >
                            Editar Preço
                          </button>
                          <button
                            onClick={() => openWhatsApp(course.title)}
                            className="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 text-xs font-semibold px-3 py-2 rounded-lg"
                          >
                            Testar WhatsApp
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'student' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {!isStudentLogged ? (
              <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-6">
                  <User className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                  <h2 className="text-2xl font-bold text-white font-serif">Área do Aluno</h2>
                  <p className="text-slate-400 text-sm">Acesse seus cursos e materiais exclusivos</p>
                </div>
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">E-mail Cadastrado</label>
                    <input 
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Senha</label>
                    <input 
                      type="password"
                      required
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 rounded-xl transition"
                  >
                    Entrar na Plataforma
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-white font-serif">Painel do Aluno</h1>
                    <p className="text-slate-400 text-sm">Bem-vindo(a), {studentEmail}</p>
                  </div>
                  <button 
                    onClick={() => setIsStudentLogged(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    Sair
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Seus Cursos Liberados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.slice(0, 2).map(c => (
                      <div key={c.id} className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
                        <div>
                          <span className="text-xs text-amber-400 font-semibold">{c.category}</span>
                          <h4 className="font-bold text-white text-base mt-1 mb-2">{c.title}</h4>
                          <p className="text-xs text-slate-400 mb-4">Acesso liberado com suporte ativo.</p>
                        </div>
                        <button
                          onClick={() => openWhatsApp(c.title)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> Suporte WhatsApp
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-slate-300">
            <button onClick={() => setActiveTab('home')} className="text-amber-400 text-sm font-semibold mb-4">← Voltar para o Início</button>
            <h1 className="text-3xl font-bold text-white font-serif">Política de Privacidade</h1>
            <p className="text-sm">A Oliveira Concursos está comprometida com a proteção dos seus dados pessoais em conformidade com a LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018). Coletamos apenas informações essenciais para o atendimento comercial e liberação dos cursos contratados.</p>
            <h3 className="text-lg font-bold text-white mt-4">Contato</h3>
            <p className="text-sm">Dúvidas sobre seus dados podem ser encaminhadas via WhatsApp oficial: (71) 99274-7496.</p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-slate-300">
            <button onClick={() => setActiveTab('home')} className="text-amber-400 text-sm font-semibold mb-4">← Voltar para o Início</button>
            <h1 className="text-3xl font-bold text-white font-serif">Termos de Uso</h1>
            <p className="text-sm">Ao utilizar o site da Oliveira Concursos e adquirir nossos cursos preparatórios para OAB, concursos públicos e carreiras jurídicas, o usuário concorda com os termos de prestação de serviços educacionais.</p>
            <p className="text-sm font-semibold text-amber-400">
Aviso Legal: A Oliveira Concursos oferece preparação de excelência acadêmica, porém não garante aprovação em concursos públicos ou exames, visto que o resultado depende exclusivamente do desempenho do candidato.</p>
          </div>
        )}
      </main>

      <button
        onClick={() => openWhatsApp()}
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition transform hover:scale-110"
        aria-label="Fale Conosco pelo WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      <footer className="bg-slate-900 border-t border-slate-800 mt-20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoEmblem} alt="Emblema" className="w-10 h-10 object-contain rounded-full" />
              <span className="font-bold text-white font-serif">OLIVEIRA CONCURSOS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sua aprovação começa com a preparação certa. Cursos preparatórios para OAB, carreiras jurídicas e concursos públicos.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Navegação</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-400">Início</button></li>
              <li><button onClick={() => setActiveTab('catalog')} className="hover:text-amber-400">Catálogo de Cursos</button></li>
              <li><button onClick={() => setActiveTab('student')} className="hover:text-amber-400">Área do Aluno</button></li>
              <li><button onClick={() => setActiveTab('admin')} className="hover:text-amber-400">Área Administrativa</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Atendimento</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>WhatsApp: (71) 99274-7496</li>
              <li>Segunda a Sexta: 08h às 19h</li>
              <li><button onClick={() => openWhatsApp()} className="text-emerald-400 hover:underline">Falar com Atendente</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Legal e Privacidade</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => setActiveTab('privacy')} className="hover:text-amber-400">Política de Privacidade</button></li>
              <li><button onClick={() => setActiveTab('terms')} className="hover:text-amber-400">Termos de Uso</button></li>
              <li className="text-amber-300/80 text-[11px] mt-2">
                ⚠️ A Oliveira Concursos não garante aprovação em concursos públicos ou exames educacionais.
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Oliveira Concursos. Todos os direitos reservados. CNPJ comercial e educacional protegido.
        </div>
      </footer>
    </div>
  );
}
export default App;