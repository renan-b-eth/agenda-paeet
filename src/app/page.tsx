import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <header className="flex flex-col items-center justify-center px-6 py-20 text-center bg-gradient-to-b from-blue-600 to-blue-800 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">📅 Agenda PAEET</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 opacity-90">
          Sistema de gerenciamento de agenda para estágios, lembretes e acompanhamento de estudantes.
        </p>
        <Link
          href="/agenda"
          className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg"
        >
          Abrir Agenda →
        </Link>
      </header>

      {/* Features */}
      <section className="flex-1 px-6 py-16 max-w-5xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">O que a Agenda faz?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon="📋"
            title="Agenda Semanal"
            description="Visualize e gerencie suas atividades semanais por dia e período. Organize suas aulas, atendimentos e tarefas em um só lugar."
          />
          <FeatureCard
            icon="🔔"
            title="Lembretes"
            description="Crie lembretes personalizados com data, hora e descrição. Nunca mais esqueça de uma tarefa importante."
          />
          <FeatureCard
            icon="🎓"
            title="Estudantes"
            description="Cadastre e acompanhe seus estudantes, incluindo turma, curso e fichas de apoio pedagógico."
          />
          <FeatureCard
            icon="🏢"
            title="Estágios"
            description="Registre estágios com dados do empresa, responsável e periodos. Acompanhe o progresso de cada estagiário."
          />
          <FeatureCard
            icon="📊"
            title="Ficha de Apoio"
            description="Registre frequência, notas e encaminhamentos para acompanhamento pedagógico dos estudantes."
          />
          <FeatureCard
            icon="📱"
            title="Notificações Push"
            description="Receba notificações push no navegador para lembretes e atualizações importantes da agenda."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t text-sm text-zinc-500">
        <p>
          Agenda PAEET © {new Date().getFullYear()} — Desenvolvido por{" "}
          <a
            href="https://rendey.store"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:underline"
          >
            Rendey LLC
          </a>{" "}
          —{" "}
          <a href="https://rendey.store" target="_blank" rel="noopener noreferrer" className="hover:underline">
            rendey.store
          </a>
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
      <span className="text-4xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">{description}</p>
    </div>
  );
}
