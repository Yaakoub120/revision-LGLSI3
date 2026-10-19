'use client'

import { useEffect, useMemo, useState } from 'react'
import { modules, glossary } from '@/data/modules'
import { questions } from '@/data/quiz'
import { BlockRenderer } from '@/components/BlockRenderer'
import { QuizEngine } from '@/components/quiz/QuizEngine'
import { Diagram } from '@/components/diagrams'
import { HistoryTimeline, StoragePyramid } from '@/components/diagrams/mongo'
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

const READ_KEY = 'bigdata-read-sections-v1'

export default function BigDataSite() {
  const [tab, setTab] = useState<TabId>('home')
  const [activeModule, setActiveModule] = useState<string>('m1')
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

  const mod = modules.find((m) => m.id === activeModule)!
  const allSections = modules.flatMap((m) => m.sections)
  const readPct = Math.round((readSections.length / allSections.length) * 100)

  const filteredGlossary = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return glossary
    return glossary.filter((g) => g.term.toLowerCase().includes(s) || g.def.toLowerCase().includes(s))
  }, [search])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-lg">📊</span>
            <div>
              <h1 className="text-sm font-black leading-tight tracking-tight sm:text-base">
                Big Data <span className="text-amber-400">— Traitement de Big Data Avancé</span>
              </h1>
              <p className="text-[11px] text-zinc-500">Base de connaissance complète · Hadoop · HDFS · MapReduce · NoSQL · MongoDB</p>
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
                  tab === t.id ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
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
            <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 p-8 sm:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">Cours 2025-2026 · Dr. Souheyl Mallat</p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Tout le cours Big Data.<br />
                <span className="text-amber-400">Zéro information oubliée.</span>
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
                Chaque définition, chaque chiffre, chaque commande et chaque schéma des 5 documents de cours
                (Partie 1, Partie 2, HDFS-MapReduce, BD NoSQL, MongoDB Sharding) — condensés en 5 modules,
                avec des schémas interactifs et un quiz en boucle de maîtrise : tu répètes jusqu'au sans-faute.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => setTab('modules')} className="bg-amber-500 font-bold text-zinc-950 hover:bg-amber-400">
                  📚 Commencer la révision
                </Button>
                <Button onClick={() => setTab('quiz')} variant="outline" className="border-amber-700 font-bold text-amber-400 hover:bg-amber-500/10">
                  🎯 Tester mes connaissances
                </Button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-4">
                {[
                  { v: '5', l: 'modules complets' },
                  { v: `${allSections.length}`, l: 'sections de cours' },
                  { v: `${questions.length}`, l: 'questions de quiz' },
                  { v: `${glossary.length}`, l: 'termes de glossaire' },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-center">
                    <p className="text-3xl font-black text-amber-400">{s.v}</p>
                    <p className="text-xs text-zinc-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Modules overview */}
            <section>
              <h3 className="mb-4 text-lg font-black">Les 5 modules</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {modules.map((m) => {
                  const done = m.sections.filter((s) => readSections.includes(s.id)).length
                  return (
                    <button
                      key={m.id}
                      onClick={() => { setActiveModule(m.id); setTab('modules') }}
                      className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-left transition hover:border-amber-600/60 hover:bg-zinc-900"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{m.icon}</span>
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-500">Module {m.num}</p>
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
                  { n: '1', t: 'Lis chaque module', d: 'Section par section, coche « lu » pour suivre ta progression.' },
                  { n: '2', t: 'Mémorise les définitions', d: 'Les cartes 📌 et citations du prof sont exactement ce qu\'il faut restituer.' },
                  { n: '3', t: 'Boucle de maîtrise', d: 'Le quiz renvoie tes erreurs jusqu\'à ce que TOUTES les questions soient réussies.' },
                ].map((x) => (
                  <div key={x.n} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-sm font-black text-amber-400">{x.n}</span>
                    <p className="mt-2 font-bold text-zinc-100">{x.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{x.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h3 className="mb-4 text-lg font-black">Aperçu : la chronologie du Big Data</h3>
              <HistoryTimeline />
            </section>
          </div>
        )}

        {/* ═══════════ MODULES ═══════════ */}
        {tab === 'modules' && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-bold transition',
                    activeModule === m.id ? 'bg-amber-500 text-zinc-950' : 'border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                  )}
                >
                  {m.icon} M{m.num} · {m.title}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
              <p className="text-xs font-black uppercase tracking-widest text-amber-500">Module {mod.num} / 5</p>
              <h2 className="mt-1 text-2xl font-black sm:text-3xl">{mod.icon} {mod.title}</h2>
              <p className="mt-1 text-zinc-400">{mod.subtitle}</p>
              <p className="mt-2 text-xs text-zinc-600">📄 Source : {mod.source}</p>
            </div>

            <nav className="flex flex-wrap gap-2" aria-label="Sections du module">
              {mod.sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-amber-700 hover:text-amber-400"
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
                        <span className="mr-2 rounded-lg bg-amber-500/15 px-2 py-0.5 text-sm text-amber-400">{mod.num}.{i + 1}</span>
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
                      {s.blocks.map((b, j) => <BlockRenderer key={j} block={b} />)}
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
                <span className="text-2xl font-black text-amber-400">{readPct}%</span>
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
                Toutes les commandes du cours en un coup d'œil : HDFS (10 commandes) et la configuration MongoDB Sharding complète (4 étapes), plus les pseudo-codes MapReduce.
              </p>
            </div>

            <section className="rounded-2xl border border-teal-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-teal-300">HDFS — hdfs dfs</h3>
              <div className="mt-4 grid gap-2">
                {[
                  ['hdfs dfs -ls /user', 'Lister le contenu du répertoire /user'],
                  ['hdfs dfs -mkdir nom_dossier_hdfs', 'Créer un dossier sur HDFS'],
                  ['hdfs dfs -put fichier_en_local destination_sur_hdfs', 'Envoyer un fichier local → HDFS'],
                  ['hdfs dfs -copyToLocal fichier_hdfs destination_en_local', 'Récupérer un fichier HDFS → local'],
                  ['hdfs dfs -cat fichier_sur_hdfs', 'Afficher le contenu d\'un fichier HDFS'],
                  ['hdfs dfs -cp fichier_sur_hdfs destination_sur_hdfs', 'Copier dans HDFS'],
                  ['hdfs dfs -mv fichier_sur_hdfs destination_sur_hdfs', 'Déplacer dans HDFS'],
                  ['hdfs dfs -rm fichier_sur_hdfs', 'Supprimer un fichier HDFS'],
                  ['hdfs dfs -du -h dossier_sur_hdfs', 'Taille d\'un dossier (format lisible)'],
                  ['hdfs dfs -setrep -R -w 3 fichier_sur_hdfs', 'Fixer la réplication à 3 (récursif + attente)'],
                ].map(([cmd, role]) => (
                  <div key={cmd} className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <code className="font-mono text-[13px] text-emerald-300">{cmd}</code>
                    <span className="text-xs text-zinc-500">{role}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-green-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-green-300">MongoDB — Configurer le Sharding étape par étape</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-amber-400">Étape 1 — Config servers (--configsvr, ReplicaSet configReplSet)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`mongod --configsvr --replSet configReplSet --port 27019 --dbpath /data/conf1
mongod --configsvr --replSet configReplSet --port 27020 --dbpath /data/conf2

# console distincte :
mongo --port 27019
rs.initiate();
rs.add("local:27020");`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-amber-400">Étape 2 — Création des shards (--shardsvr)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`mongod --shardsvr --replSet sh1 --port 27031 --dbpath /data/sh1
mongod --shardsvr --replSet sh2 --port 27032 --dbpath /data/sh2

mongo --port 27031 --eval "rs.initiate()"
mongo --port 27032 --eval "rs.initiate()"`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-amber-400">Étape 3 — Lancement du mongos + connexion des shards</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`mongos --configdb configReplSet/localhost:27019 --port 27017

mongo --port 27017
sh.addShard("sh1/localhost:27031");
sh.addShard("sh2/localhost:27032");`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-amber-400">Étape 4 — Distribution de la base de données</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`use testDB;
sh.enableSharding("testDB");
db.createCollection("test");
db.test.createIndex({"_id": 1});
sh.shardCollection("testDB.test", {"_id": 1});

# vérifier l'état du sharding :
mongo --port 27017 --eval "sh.status()"`}</pre>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-amber-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-amber-300">MapReduce — pseudo-codes du cours</h3>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-sky-300">MAP (Word Count)</p>
                  <pre className="mt-2 font-mono text-[13px] text-emerald-200">{`POUR MOT dans LIGNE, FAIRE :
  GENERER COUPLE (MOT ; 1)`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-purple-300">REDUCE (Word Count)</p>
                  <pre className="mt-2 font-mono text-[13px] text-emerald-200">{`TOTAL=0
POUR COUPLE dans GROUPE, FAIRE :
  TOTAL=TOTAL+1
RENVOYER TOTAL`}</pre>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
              <h3 className="mb-4 text-lg font-black">Visual : la pyramide des préfixes</h3>
              <StoragePyramid />
            </section>
          </div>
        )}

        {/* ═══════════ GLOSSARY ═══════════ */}
        {tab === 'glossary' && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h2 className="text-2xl font-black">📖 Glossaire — {glossary.length} termes</h2>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un terme (ex. NameNode, chunk, vélocité…)"
                aria-label="Rechercher dans le glossaire"
                className="mt-4 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-600 focus:outline-none"
              />
            </div>
            <div className="grid gap-2.5 md:grid-cols-2">
              {filteredGlossary.map((g) => {
                const m = modules.find((x) => x.id === g.module)
                return (
                  <div key={g.term} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-amber-400">{g.term}</p>
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
            <QuizEngine />
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
            Site de révision — <b className="text-zinc-400">Traitement de Big Data Avancé</b> (Dr. Souheyl Mallat, 2025-2026) ·
            Contenu intégral : Partie 1 · Partie 2 · HDFS &amp; MapReduce · BD NoSQL · MongoDB Sharding
          </p>
          <p className="mt-1">« Ce document doit être complété par les notes du cours » — bon courage pour l'examen ! 💪</p>
        </div>
      </footer>
    </div>
  )
}
