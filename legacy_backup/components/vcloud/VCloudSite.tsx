'use client'

// ─── Site de révision — Virtualisation & Cloud (LGLSI3, Leila GHORBEL) ───
import { useEffect, useMemo, useState } from 'react'
import { vmodules, vglossary } from '@/data/vcloud'
import { vquestions } from '@/data/vcloud/quiz'
import { vcloudDiagramRegistry } from '@/components/vcloud/diagrams'
import { BlockRenderer } from '@/components/BlockRenderer'
import { QuizEngine } from '@/components/quiz/QuizEngine'
import { SwarmCluster } from '@/components/vcloud/diagrams'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'home', label: 'Accueil', icon: '🏠' },
  { id: 'modules', label: 'Modules', icon: '📚' },
  { id: 'commands', label: 'Commandes', icon: '⌨️' },
  { id: 'glossary', label: 'Glossaire', icon: '📖' },
  { id: 'quiz', label: 'Quiz', icon: '🎯' },
] as const

type TabId = (typeof TABS)[number]['id']

const READ_KEY = 'vcloud-read-sections-v1'

export default function VCloudSite() {
  const [tab, setTab] = useState<TabId>('home')
  const [activeModule, setActiveModule] = useState<string>('v1')
  const [readSections, setReadSections] = useState<string[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(READ_KEY)
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage (external system)
        setReadSections(JSON.parse(raw))
      }
    } catch {}
  }, [])

  const toggleRead = (id: string) => {
    setReadSections((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      localStorage.setItem(READ_KEY, JSON.stringify(next))
      return next
    })
  }

  const mod = vmodules.find((m) => m.id === activeModule) ?? vmodules[0]
  const allSections = vmodules.flatMap((m) => m.sections)
  const readPct = Math.round((readSections.length / allSections.length) * 100)

  const filteredGlossary = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return vglossary
    return vglossary.filter((g) => g.term.toLowerCase().includes(s) || g.def.toLowerCase().includes(s))
  }, [search])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ── Header ── */}
      <header className="sticky top-12 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-lg">☁️</span>
            <div>
              <h1 className="text-sm font-black leading-tight tracking-tight sm:text-base">
                Virtualisation &amp; Cloud <span className="text-violet-400">— LGLSI3</span>
              </h1>
              <p className="text-[11px] text-zinc-500">Virtualisation · Stockage · RAID · Docker · Swarm · Kubernetes</p>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto" aria-label="Navigation principale">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={tab === t.id ? 'page' : undefined}
                className={cn(
                  'whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition sm:text-sm',
                  tab === t.id ? 'bg-violet-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                )}
              >
                <span className="mr-1">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* ═══════════ HOME ═══════════ */}
        {tab === 'home' && (
          <div className="space-y-8">
            <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-violet-500/10 via-zinc-900 to-zinc-950 p-8 sm:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-400">Licence LGLSI3 · Informatique · 2025-2026 · Leila GHORBEL</p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Tout le cours Virtualisation &amp; Cloud.<br />
                <span className="text-violet-400">Zéro information oubliée.</span>
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
                Chaque définition, chaque chiffre, chaque commande et chaque capture des 6 documents du cours
                — de l’histoire des systèmes distribués au cluster Kubernetes — condensés en 14 modules,
                avec 15 schémas interactifs, la référence complète des commandes et un quiz en boucle de maîtrise :
                tu répètes jusqu’au sans-faute.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => setTab('modules')} className="bg-violet-500 font-bold text-zinc-950 hover:bg-violet-400">
                  📚 Commencer la révision
                </Button>
                <Button onClick={() => setTab('quiz')} variant="outline" className="border-violet-700 font-bold text-violet-400 hover:bg-violet-500/10">
                  🎯 Tester mes connaissances
                </Button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-4">
                {[
                  { v: '14', l: 'modules complets' },
                  { v: `${allSections.length}`, l: 'sections de cours' },
                  { v: `${vquestions.length}`, l: 'questions de quiz' },
                  { v: `${vglossary.length}`, l: 'termes de glossaire' },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-center">
                    <p className="text-3xl font-black text-violet-400">{s.v}</p>
                    <p className="text-xs text-zinc-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Modules overview */}
            <section>
              <h3 className="mb-4 text-lg font-black">Les 14 modules</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {vmodules.map((m) => {
                  const done = m.sections.filter((s) => readSections.includes(s.id)).length
                  return (
                    <button
                      key={m.id}
                      onClick={() => { setActiveModule(m.id); setTab('modules') }}
                      className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-left transition hover:border-violet-600/60 hover:bg-zinc-900"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{m.icon}</span>
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-violet-500">Module {m.num}</p>
                            <h4 className="font-bold text-zinc-100">{m.title}</h4>
                          </div>
                        </div>
                        <span className="text-xs text-zinc-500">{done}/{m.sections.length} lus</span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-400">{m.subtitle}</p>
                      <p className="mt-2 text-[11px] text-zinc-600">📄 {m.source}</p>
                      <Progress value={(done / m.sections.length) * 100} className="mt-3 h-1.5" />
                    </button>
                  )
                })}
              </div>
            </section>

            {/* How to use */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h3 className="text-lg font-black">Comment réviser efficacement ?</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { n: '1', t: 'Lis chaque module', d: 'Section par section, coche « lu » pour suivre ta progression. Les cartes 📌 sont les définitions exactes à restituer.' },
                  { n: '2', t: 'Joue avec les schémas', d: '15 diagrammes interactifs : RAID, réseaux Docker, Swarm, architecture K8s… manipule-les pour ancrer les concepts.' },
                  { n: '3', t: 'Boucle de maîtrise', d: 'Le quiz renvoie tes erreurs jusqu\u2019à ce que TOUTES les questions soient réussies : objectif zéro erreur.' },
                ].map((x) => (
                  <div key={x.n} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/20 text-sm font-black text-violet-400">{x.n}</span>
                    <p className="mt-2 font-bold text-zinc-100">{x.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{x.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h3 className="mb-4 text-lg font-black">Aperçu interactif : le cluster Swarm</h3>
              <SwarmCluster />
            </section>
          </div>
        )}

        {/* ═══════════ MODULES ═══════════ */}
        {tab === 'modules' && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {vmodules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-bold transition',
                    activeModule === m.id ? 'bg-violet-500 text-zinc-950' : 'border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                  )}
                >
                  {m.icon} M{m.num} · {m.title}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
              <p className="text-xs font-black uppercase tracking-widest text-violet-500">Module {mod.num} / 14</p>
              <h2 className="mt-1 text-2xl font-black sm:text-3xl">{mod.icon} {mod.title}</h2>
              <p className="mt-1 text-zinc-400">{mod.subtitle}</p>
              <p className="mt-2 text-xs text-zinc-600">📄 Source : {mod.source}</p>
            </div>

            <nav className="flex flex-wrap gap-2" aria-label="Sections du module">
              {mod.sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-violet-700 hover:text-violet-400"
                >
                  {i + 1}. {s.title}
                </a>
              ))}
            </nav>

            <div className="space-y-6">
              {mod.sections.map((s, i) => {
                const isRead = readSections.includes(s.id)
                return (
                  <article key={s.id} id={s.id} className="scroll-mt-28 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-black text-zinc-100 sm:text-xl">
                        <span className="mr-2 rounded-lg bg-violet-500/15 px-2 py-0.5 text-sm text-violet-400">{mod.num}.{i + 1}</span>
                        {s.title}
                      </h3>
                      <button
                        onClick={() => toggleRead(s.id)}
                        aria-pressed={isRead}
                        className={cn(
                          'shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition',
                          isRead ? 'bg-emerald-500/20 text-emerald-400' : 'border border-zinc-700 text-zinc-500 hover:text-zinc-300'
                        )}
                      >
                        {isRead ? '✓ Lu' : 'Marquer lu'}
                      </button>
                    </div>
                    <div className="mt-3">
                      {s.blocks.map((b, j) => <BlockRenderer key={j} block={b} diagrams={vcloudDiagramRegistry} />)}
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-zinc-100">Progression de lecture</p>
                  <p className="text-xs text-zinc-500">{readSections.length} / {allSections.length} sections marquées comme lues</p>
                </div>
                <span className="text-2xl font-black text-violet-400">{readPct}%</span>
              </div>
              <Progress value={readPct} className="mt-3 h-2" />
              {readPct === 100 && (
                <Button onClick={() => setTab('quiz')} className="mt-4 w-full bg-emerald-500 font-bold text-zinc-950 hover:bg-emerald-400">
                  🎯 100% lu ! Lance maintenant le quiz jusqu'au sans-faute
                </Button>
              )}
            </div>
          </div>
        )}

        {/* ═══════════ COMMANDS ═══════════ */}
        {tab === 'commands' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h2 className="text-2xl font-black">⌨️ Référence des commandes</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Toutes les commandes du cours : Docker (base, volumes, réseau, Dockerfile, Compose, Registry, cgroups),
                Docker Swarm (cluster, services, scaling, update/rollback, drain) et Kubernetes (kubectl + minikube, démo complète).
              </p>
            </div>

            <section className="rounded-2xl border border-violet-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-violet-300">Docker — commandes de base</h3>
              <div className="mt-4 grid gap-2">
                {[
                  ['docker run image_name', 'Créer et démarrer un conteneur (télécharge l\u2019image si absente)'],
                  ['docker run -d image_name', 'Démarrer le conteneur comme service de fond'],
                  ['docker run image_name:tag', 'Spécifier la version (défaut : latest) — ex. docker run redis:4.0'],
                  ['docker ps', 'Lister les conteneurs en cours d\u2019exécution'],
                  ['docker ps -a', 'Lister TOUS les conteneurs avec leur statut (Up, Exited, Created)'],
                  ['docker run -d -p 8082:80 nginx', 'Mapper port externe:port interne (accès externe)'],
                  ['docker images', 'Lister les images présentes dans le host docker'],
                  ['docker rmi <nom-image>', 'Supprimer une image (stopper/supprimer ses conteneurs d\u2019abord)'],
                  ['docker stop <containerID|name>', 'Stopper un conteneur'],
                  ['docker rm <containerID|name>', 'Supprimer un conteneur de manière permanente'],
                  ['docker exec -it my2 mysql --password', 'Exécuter une commande dans un conteneur DÉMARRÉ (mode interactif)'],
                  ['docker attach containerID', 'Attacher la console du terminal au conteneur de fond'],
                  ['docker inspect <name|id>', 'Détails du conteneur au format JSON'],
                  ['docker run -v /opt/dataDir:/var/lib/mysql mysql', 'Mapper un volume (persistance des données)'],
                  ['docker logs container_ID', 'Afficher le fichier log d\u2019un conteneur'],
                ].map(([cmd, role]) => (
                  <div key={cmd} className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <code className="font-mono text-[13px] text-emerald-300">{cmd}</code>
                    <span className="text-xs text-zinc-500">{role}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-teal-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-teal-300">Dockerfile — les 12 instructions</h3>
              <div className="mt-4 grid gap-2">
                {[
                  ['FROM', 'Définir l\u2019image de base du build'],
                  ['MAINTAINER / LABEL', 'Nom complet + email du créateur de l\u2019image'],
                  ['ENV', 'Définir des variables d\u2019environnement'],
                  ['RUN', 'Directive d\u2019exécution centrale (au build)'],
                  ['CMD', 'Exécuter une commande spécifique dans le conteneur'],
                  ['ENTRYPOINT', 'Programme/script TOUJOURS exécuté au démarrage (+ arguments)'],
                  ['COPY', 'Copier fichiers/dossiers locaux (contexte de build) vers l\u2019image'],
                  ['ADD', 'Comme COPY + extraction d\u2019archives + téléchargement URL'],
                  ['EXPOSE', 'Exposer un port (mise en réseau avec l\u2019extérieur)'],
                  ['USER', 'Définir l\u2019UID qui exécutera le conteneur'],
                  ['VOLUME', 'Déclarer un dossier stocké de façon persistante'],
                  ['WORKDIR', 'Définir le chemin où la commande CMD est exécutée'],
                ].map(([cmd, role]) => (
                  <div key={cmd} className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <code className="font-mono text-[13px] text-emerald-300">{cmd}</code>
                    <span className="text-xs text-zinc-500">{role}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm font-bold text-amber-400">Exemple complet du cours (webApp)</p>
                <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`FROM nginx
COPY index.html /usr/share/nginx/html
EXPOSE 80

# build + run :
docker build -t myapp .
docker run -d -p 8089:80 myapp`}</pre>
              </div>
            </section>

            <section className="rounded-2xl border border-sky-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-sky-300">Docker — réseau &amp; stockage</h3>
              <div className="mt-4 grid gap-2">
                {[
                  ['docker run nginx', 'Mode réseau bridge (par défaut) — 172.17.0.x'],
                  ['docker run --network=host nginx', 'Mode host : ports partagés directement avec le host'],
                  ['docker run --network=none nginx', 'Mode none : aucun réseau'],
                  ['docker network create --driver bridge --subnet 182.18.0.0/16 custom-isolated-net', 'Créer un réseau bridge personnalisé'],
                  ['docker network ls', 'Lister les réseaux (bridge, host, none)'],
                  ['docker inspect <container_id|name>', 'Consulter la configuration réseau d\u2019un conteneur'],
                  ['docker run --network=myNet nginx', 'Démarrer sur un réseau personnalisé (IP ex. 172.19.0.2)'],
                ].map(([cmd, role]) => (
                  <div key={cmd} className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <code className="font-mono text-[13px] text-emerald-300">{cmd}</code>
                    <span className="text-xs text-zinc-500">{role}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-amber-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-amber-300">Docker Compose, Registry &amp; cgroups</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-amber-400">docker-compose.yml (version "2" — voting-app)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`version: "2"
services:
  vote:
    image: eesprit/voting-app-vote
    ports: ["5000:80"]
    links: [redis]
  redis:
    image: redis:alpine
  worker:
    image: eesprit/voting-app-worker
    links: [redis, db]
  db:
    image: postgres:9.4
  result:
    image: eesprit/voting-app-result
    links: [db]
    ports: ["5001:80"]

# links non obligatoire en v2 : liens automatiques entre services
$ docker-compose up`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-amber-400">Démarrage manuel (avec --link) vs compose</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`$ docker run -d --name=redis redis
$ docker run -d --name=db postgres:9.4
$ docker run -d --name=vote -p 5000:80 --link=redis:redis eesprit/voting-app-vote
$ docker run -d --name=result -p 5001:80 --link=db:db result-app
$ docker run -d --name=worker --link=redis:redis --link=db:db worker`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-amber-400">Registry privé &amp; limites de ressources</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`$ docker run -d -p 5000:5000 --name my-registry registry:2
$ docker image tag my-image localhost:5000/my-image
$ docker push localhost:5000/my-image
$ docker pull localhost:5000/my-image
$ docker login private-registry.io        # registre d'organisation
$ docker run private-registry.io/apps/internal-app

$ docker run --cpus=0.5 nginx             # limite CPU (cgroups)
$ docker run --memory=100m mysql          # limite mémoire`}</pre>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-emerald-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-emerald-300">Docker Swarm — le cluster complet du cours</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-emerald-400">1. Initialiser le cluster (Host 1 : 192.168.57.3)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`$ sudo docker swarm init --advertise-addr 192.168.57.3 --listen-addr 192.168.57.3
# → token : SWMTKN-1-…  port par défaut de Swarm : 2377

# 2. Ajouter les workers (Host 2 et Host 3) :
$ sudo docker swarm join --token SWMTKN-1-… 192.168.57.3:2377
This node joined a swarm as a worker.

# 3. Lister les nœuds :
$ sudo docker node ls
# ID · HOSTNAME · STATUS(Ready) · AVAILABILITY(Active) · MANAGER STATUS(Leader) · ENGINE VERSION`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-emerald-400">2. Services : créer, lister, inspecter, logs, supprimer</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`$ sudo docker service create --name foo alpine ping 8.8.8.8
$ sudo docker service ls              # MODE replicated · REPLICAS 1/1 · IMAGE
$ sudo docker service ps foo          # NAME foo.1 · NODE host1 · DESIRED/CURRENT STATE
$ sudo docker service logs foo
$ sudo docker service create --name web -p 80:80 emilevauge/whoami
$ sudo docker service rm web`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-emerald-400">3. Application 3 services sur réseau overlay chiffré</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`$ sudo docker network create --driver overlay --opt encrypted exquisite
$ sudo docker service create --name back --network exquisite --limit-memory 64M \\
    --reserve-memory 64M vdemeeester/exquisite-words-java:v1
$ sudo docker service create --name mongo --network exquisite mongo:3.3.8
$ sudo docker service create --name front --network exquisite -p 808:80 \\
    vdemeeester/exquisite-web:v1`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-emerald-400">4. Scaling, mise à jour, rollback, drain, contraintes</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`$ sudo docker service scale back=15        # mise à l'échelle
$ sudo docker service scale front=2

$ sudo docker service update --update-parallelism 2 --update-delay 10s back
$ sudo docker service update --image vdemeeester/exquisite-web:v2 front
$ sudo docker service update --rollback front        # rollback demandé

$ sudo docker node update --availability drain host3 # les instances migrent
$ sudo docker service create --name svc1 --constraint engine.label==ssd nginx
$ sudo docker service create --mode global alpine ping 8.8.8.8`}</pre>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-indigo-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-indigo-300">Kubernetes — kubectl &amp; minikube (démo Hello World)</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-indigo-400">1. Installer &amp; démarrer minikube</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`> choco install minikube kubernetes-cli   # Chocolatey (admin, Windows)
> systeminfo                              # vérifier le support Hyper-V
C:\\Users\\med> minikube start
# → Preparing Kubernetes v1.15.2 on Docker 18.09.8 ...
# → Done! kubectl is now configured to use "minikube"

# Hyperviseurs : macOS → VirtualBox/VMware Fusion/HyperKit
#               Linux → VirtualBox/KVM · Windows → VirtualBox/Hyper-V`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-indigo-400">2. Connecter le client docker au daemon de minikube</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`$ echo $(minikube docker-env)
# export DOCKER_TLS_VERIFY="1" export DOCKER_HOST="tcp://192.168.99.100:2376"
# export DOCKER_CERT_PATH="...\\.minikube\\certs"
$ eval $(minikube docker-env)
$ echo $DOCKER_HOST        # tcp://192.168.99.100:2376`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-indigo-400">3. Build, déploiement, exposition (démo complète)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`$ docker build . -t app-test:v1        # FROM node:6.14.2 · EXPOSE 8080 …

$ kubectl create deployment app-test --image=app-test:v1
deployment.apps/app-test created
$ kubectl get deployments
$ kubectl get pods

$ kubectl expose deployment app-test --type=NodePort --port=8080
service/app-test exposed
$ kubectl describe service app-test
# Type: NodePort · IP: 10.108.16.123 · Port: 8080/TCP · NodePort: 31708/TCP

$ minikube service app-test            # http://192.168.99.100:31708
$ winpty kubectl exec -ti app-test-5f78dcf7f8-2ts2w bash
# curl http://localhost:8080 → Hello World!`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-indigo-400">4. Pods par fichier &amp; nettoyage</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`$ kubectl create -f mypod.yml          # créer un pod
$ kubectl get pods                     # lister tous les pods
$ kubectl delete Pod_ID                # supprimer un pod
$ kubectl create -f myDeployment.yaml  # deployment nginx:1.7.9 × 3

# Nettoyage :
$ kubectl delete service app-test      # service "app-test" deleted
$ minikube stop                        # "minikube" stopped
$ minikube delete                      # cluster supprimé`}</pre>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ═══════════ GLOSSARY ═══════════ */}
        {tab === 'glossary' && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h2 className="text-2xl font-black">📖 Glossaire — {vglossary.length} termes</h2>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un terme (ex. hyperviseur, overlay, kubelet, RAID 5…)"
                aria-label="Rechercher dans le glossaire"
                className="mt-4 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-violet-600 focus:outline-none"
              />
            </div>
            <div className="grid gap-2.5 md:grid-cols-2">
              {filteredGlossary.map((g) => {
                const m = vmodules.find((x) => x.id === g.module)
                return (
                  <div key={g.term} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-violet-400">{g.term}</p>
                      {m && <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">{m.icon} M{m.num}</span>}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">{g.def}</p>
                  </div>
                )
              })}
              {filteredGlossary.length === 0 && (
                <p className="col-span-2 py-10 text-center text-zinc-500">Aucun terme trouvé pour « {search} »</p>
              )}
            </div>
          </div>
        )}

        {/* ═══════════ QUIZ ═══════════ */}
        {tab === 'quiz' && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h2 className="text-2xl font-black">🎯 Quiz — jusqu'au ZÉRO erreur</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Le moteur de maîtrise : chaque erreur est remise dans la file. Continue jusqu'à ce que chaque question soit marquée MAÎTRISÉE.
              </p>
            </div>
            <QuizEngine questions={vquestions} modules={vmodules} storageKey="vcloud-quiz-state-v1" />
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h3 className="mb-3 font-bold text-zinc-100">Besoin de réviser avant ?</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setTab('modules')} className="border-zinc-700 text-zinc-300">📚 Relire les modules</Button>
                <Button variant="outline" size="sm" onClick={() => setTab('commands')} className="border-zinc-700 text-zinc-300">⌨️ Revoir les commandes</Button>
                <Button variant="outline" size="sm" onClick={() => setTab('glossary')} className="border-zinc-700 text-zinc-300">📖 Glossaire</Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs leading-relaxed text-zinc-600">
          <p>
            Site de révision — <b className="text-zinc-400">Virtualisation &amp; Cloud</b> (Licence LGLSI3 · Leila GHORBEL · 2025-2026) ·
            Contenu intégral : Partie 1 · Partie 2 · Partie 4 (Docker) · Partie 5 (Swarm) · Partie 6 (Kubernetes) + module Cloud complémentaire
          </p>
          <p className="mt-1">Bon courage pour l’examen ! 💪</p>
        </div>
      </footer>
    </div>
  )
}
