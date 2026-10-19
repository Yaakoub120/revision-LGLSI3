'use client'

// ─── Site de révision — Développement d'applications réparties (GLSI3, Dr. Mouna KARAJA) ───
import { useEffect, useMemo, useState } from 'react'
import { dmodules, dglossary } from '@/data/dar'
import { dquestions } from '@/data/dar/quiz'
import { darDiagramRegistry, PacketJourney } from '@/components/dar/diagrams'
import { BlockRenderer } from '@/components/BlockRenderer'
import { QuizEngine } from '@/components/quiz/QuizEngine'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'home', label: 'Accueil', icon: '🏠' },
  { id: 'modules', label: 'Modules', icon: '📚' },
  { id: 'code', label: 'Code', icon: '💻' },
  { id: 'glossary', label: 'Glossaire', icon: '📖' },
  { id: 'quiz', label: 'Quiz', icon: '🎯' },
] as const

type TabId = (typeof TABS)[number]['id']

const READ_KEY = 'dar-read-sections-v1'

export default function DarSite() {
  const [tab, setTab] = useState<TabId>('home')
  const [activeModule, setActiveModule] = useState<string>('d1')
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

  const mod = dmodules.find((m) => m.id === activeModule) ?? dmodules[0]
  const allSections = dmodules.flatMap((m) => m.sections)
  const readPct = Math.round((readSections.length / allSections.length) * 100)

  const filteredGlossary = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return dglossary
    return dglossary.filter((g) => g.term.toLowerCase().includes(s) || g.def.toLowerCase().includes(s))
  }, [search])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ── Header ── */}
      <header className="sticky top-12 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/15 text-lg">🌐</span>
            <div>
              <h1 className="text-sm font-black leading-tight tracking-tight sm:text-base">
                Développement d’applications réparties <span className="text-sky-400">— GLSI3</span>
              </h1>
              <p className="text-[11px] text-zinc-500">Communication · Sockets · RPC · RMI · Architectures · Asynchronisme</p>
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
                  tab === t.id ? 'bg-sky-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
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
            <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-sky-500/10 via-zinc-900 to-zinc-950 p-8 sm:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">Licence GLSI3 · Informatique · 2025-2026 · Dr. Mouna KARAJA</p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Tout le cours Applications Réparties.<br />
                <span className="text-sky-400">Zéro information oubliée.</span>
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
                Chaque définition, chaque port, chaque schéma et chaque ligne de code des 5 documents du cours
                — du contexte des systèmes répartis à la communication asynchrone — condensés en 14 modules,
                avec 22 schémas interactifs, la référence complète du code (sockets TCP/UDP, RMI, RPC)
                et un quiz en boucle de maîtrise : tu répètes jusqu’au sans-faute.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => setTab('modules')} className="bg-sky-500 font-bold text-zinc-950 hover:bg-sky-400">
                  📚 Commencer la révision
                </Button>
                <Button onClick={() => setTab('quiz')} variant="outline" className="border-sky-700 font-bold text-sky-400 hover:bg-sky-500/10">
                  🎯 Tester mes connaissances
                </Button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-4">
                {[
                  { v: '14', l: 'modules complets' },
                  { v: `${allSections.length}`, l: 'sections de cours' },
                  { v: `${dquestions.length}`, l: 'questions de quiz' },
                  { v: `${dglossary.length}`, l: 'termes de glossaire' },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-center">
                    <p className="text-3xl font-black text-sky-400">{s.v}</p>
                    <p className="text-xs text-zinc-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Modules overview */}
            <section>
              <h3 className="mb-4 text-lg font-black">Les 14 modules</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {dmodules.map((m) => {
                  const done = m.sections.filter((s) => readSections.includes(s.id)).length
                  return (
                    <button
                      key={m.id}
                      onClick={() => { setActiveModule(m.id); setTab('modules') }}
                      className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-left transition hover:border-sky-600/60 hover:bg-zinc-900"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{m.icon}</span>
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-sky-500">Module {m.num}</p>
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
                  { n: '1', t: 'Lis chaque module', d: 'Section par section, coche « lu » pour suivre ta progression. Les cartes 📌 sont les définitions exactes à restituer, les tableaux sont à connaître par cœur (ports !).' },
                  { n: '2', t: 'Joue avec les schémas', d: '22 diagrammes interactifs : le voyage d\u2019une requête HTTP (NAT, MAC), le handshake TCP, l\u2019architecture RMI, les modèles asynchrones… manipule-les pour ancrer les concepts.' },
                  { n: '3', t: 'Boucle de maîtrise', d: 'Le quiz renvoie tes erreurs jusqu\u2019à ce que TOUTES les questions soient réussies : objectif zéro erreur.' },
                ].map((x) => (
                  <div key={x.n} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/20 text-sm font-black text-sky-400">{x.n}</span>
                    <p className="mt-2 font-bold text-zinc-100">{x.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{x.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h3 className="mb-4 text-lg font-black">Aperçu interactif : le voyage d’une requête HTTP (schéma illustratif du cours)</h3>
              <PacketJourney />
            </section>
          </div>
        )}

        {/* ═══════════ MODULES ═══════════ */}
        {tab === 'modules' && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {dmodules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-bold transition',
                    activeModule === m.id ? 'bg-sky-500 text-zinc-950' : 'border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                  )}
                >
                  {m.icon} M{m.num} · {m.title}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
              <p className="text-xs font-black uppercase tracking-widest text-sky-500">Module {mod.num} / 14</p>
              <h2 className="mt-1 text-2xl font-black sm:text-3xl">{mod.icon} {mod.title}</h2>
              <p className="mt-1 text-zinc-400">{mod.subtitle}</p>
              <p className="mt-2 text-xs text-zinc-600">📄 Source : {mod.source}</p>
            </div>

            <nav className="flex flex-wrap gap-2" aria-label="Sections du module">
              {mod.sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-sky-700 hover:text-sky-400"
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
                        <span className="mr-2 rounded-lg bg-sky-500/15 px-2 py-0.5 text-sm text-sky-400">{mod.num}.{i + 1}</span>
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
                      {s.blocks.map((b, j) => <BlockRenderer key={j} block={b} diagrams={darDiagramRegistry} />)}
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
                <span className="text-2xl font-black text-sky-400">{readPct}%</span>
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

        {/* ═══════════ CODE ═══════════ */}
        {tab === 'code' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h2 className="text-2xl font-black">💻 Référence du code</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Tout le code pratique du cours : le tableau des ports, les sockets TCP et UDP en Java,
                le pseudocode RPC complet (IDL, skeleton, stub, runtime) et les 5 étapes RMI prêtes à exécuter.
              </p>
            </div>

            <section className="rounded-2xl border border-amber-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-amber-300">Tableau des ports — à connaître par cœur</h3>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  ['HTTP / HTTPS — 80 / 443', 'Transfert de pages web'],
                  ['FTP — 21', 'Envoyer / recevoir des fichiers'],
                  ['SMTP — 25', 'Envoi de mails'],
                  ['POP3 / IMAP — 110 / 143', 'Récupérer les mails'],
                  ['DNS — 53', 'Convertir un nom de domaine en adresse IP'],
                  ['DHCP — 67-68', 'Donner dynamiquement une IP à un poste'],
                  ['SSH / Telnet — 22 / 23', 'Accès distant (avec / sans chiffrement)'],
                  ['SNMP — 161', 'Supervision du réseau (routeurs, commutateurs…)'],
                ].map(([cmd, role]) => (
                  <div key={cmd} className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <code className="font-mono text-[13px] text-amber-300">{cmd}</code>
                    <span className="text-xs text-zinc-500">{role}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-sky-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-sky-300">Sockets TCP en Java — les classes du cours</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-sky-400">Séquence complète (diagramme du cours)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`# CÔTÉ SERVEUR — "Open Listen"
ServerSocket server = new ServerSocket(80);   // socket → bind → listen
Socket conn = server.accept();                // attend la connection request du client
                                              // → puis revient ici après chaque close
# CÔTÉ CLIENT — "Open Client"
Socket client = new Socket("serveur", 80);    // socket → connect (connection request)

# SESSION Client/Serveur — échange par flux
InputStream  in  = conn.getInputStream();     // lire les données
OutputStream out = conn.getOutputStream();    // écrire les données
# write() ↔ read() ... puis :
client.close();                               // End Of File → le serveur lit, ferme, et retourne à accept()`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-sky-400">Fonctionnement (4 étapes)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`1. Le serveur crée un ServerSocket et se met en attente sur un port précis.
2. Le client crée un Socket et tente de se connecter à ce port.
3. Connexion acceptée → échange de données via des flux (InputStream / OutputStream).
4. À la fin, les sockets sont fermées.`}</pre>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-violet-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-violet-300">Sockets UDP en Java — les classes du cours</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-violet-400">Séquence complète (diagramme du cours)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`# SERVEUR                          # CLIENT
DatagramSocket server =            DatagramSocket client =
  new DatagramSocket(port);          new DatagramSocket();
# create a socket                  # create a socket
                                   # (bind implicite)
// receive request                 // send the request (data request)
byte[] buf = new byte[256];        byte[] buf = data.getBytes();
DatagramPacket req =               DatagramPacket req =
  new DatagramPacket(buf, 256);      new DatagramPacket(buf, len,
server.receive(req);                  serverIP, serverPort);
                                   client.send(req);
// send response (data reply)
DatagramPacket resp = new DatagramPacket(buf, len, req.getAddress(), req.getPort());
server.send(resp);                 // receive response (data reply)`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-violet-400">Fonctionnement (4 étapes)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`1. Le serveur UDP crée un DatagramSocket et attend la réception d'un paquet.
2. Le client UDP crée aussi un DatagramSocket et envoie un DatagramPacket
   vers l'adresse et le port du serveur.
3. Chaque message est indépendant → aucune session ni connexion persistante.
4. Après réception, le serveur peut répondre via un autre datagramme.`}</pre>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-emerald-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-emerald-300">Pseudocode RPC synchrone — vue logique complète</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-emerald-400">1. IDL · 2. Implémentation · 3. Enregistrement</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`service Calculator {
  int add(int a, int b);
  int sub(int a, int b);
}

public class CalculatorImpl implements Calculator {
  public int add(int a, int b) { return a + b; }
  public int sub(int a, int b) { return a - b; }
}

public static void main(String[] args) {
  Calculator service = new CalculatorImpl();
  registerService("Calculator", service); // rendu disponible via RPC
}`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-emerald-400">4. Skeleton côté serveur (reçoit → unmarshal → appelle)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`public String handleRequest(String requestJson) {
  // requestJson = {"method":"add","args":[3,4]}
  JSONObject req = new JSONObject(requestJson);
  String method = req.getString("method");
  JSONArray args = req.getJSONArray("args");
  int result = switch (method) {
    case "add" -> impl.add(args.getInt(0), args.getInt(1));
    case "sub" -> impl.sub(args.getInt(0), args.getInt(1));
    default    -> throw new RuntimeException("Méthode inconnue");
  };
  return "{\\"result\\": " + result + "}";
}`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-emerald-400">5. Stub client + RPC runtime + appel (semble local)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`public class CalculatorClientStub implements Calculator {
  private NetworkChannel channel;
  public int add(int a, int b) {
    String req = "{\\"method\\":\\"add\\",\\"args\\":[" + a + "," + b + "]}";
    String resp = channel.sendRequest(req);   // envoie au serveur
    return new JSONObject(resp).getInt("result");
  }
}

// RPC runtime — retourne le stub
calculator remoteService = getRemoteService("Calculator");
result = remoteService.add(3, 4)  // semble local
print(result)                     // 7

// En coulisse : marshall(3,4) → send → skeleton.unmarshal → add(3,4)=7
//               → marshall(7) → send → stub.unmarshal → 7`}</pre>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-teal-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-teal-300">RMI — les 5 étapes prêtes à exécuter</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-teal-400">Étape 1 — Hello.java (interface distante)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`import java.rmi.Remote;
import java.rmi.RemoteException;

public interface Hello extends Remote {
  String direBonjour(String nom) throws RemoteException;
}`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-teal-400">Étape 2 — HelloImpl.java (implémentation)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`import java.rmi.server.UnicastRemoteObject;
import java.rmi.RemoteException;

public class HelloImpl extends UnicastRemoteObject implements Hello {
  public HelloImpl() throws RemoteException { super(); }

  @Override
  public String direBonjour(String nom) throws RemoteException {
    return "Bonjour, " + nom + " !";
  }
}`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-teal-400">Étape 3 — ServeurRMI.java (registre + rebind)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;

public class ServeurRMI {
  public static void main(String[] args) {
    try {
      LocateRegistry.createRegistry(1099);
      HelloImpl obj = new HelloImpl();
      Naming.rebind("rmi://localhost/HelloService", obj);
      System.out.println("Serveur RMI prêt et en attente des requêtes...");
    } catch (Exception e) { e.printStackTrace(); }
  }
}`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-teal-400">Étape 4 — ClientRMI.java (lookup + invocation)</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`import java.rmi.Naming;

public class ClientRMI {
  public static void main(String[] args) {
    try {
      Hello obj = (Hello) Naming.lookup("rmi://localhost/HelloService");
      String reponse = obj.direBonjour("Mouna");
      System.out.println("Réponse du serveur : " + reponse);
    } catch (Exception e) { e.printStackTrace(); }
  }
}`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-teal-400">Étape 5 — Compilation et exécution</p>
                  <pre className="mt-2 overflow-x-auto font-mono text-[13px] leading-relaxed text-emerald-200">{`$ javac *.java
$ rmiregistry                    # port par défaut 1099 — même répertoire que les classes
$ java ServeurRMI                # → Serveur RMI prêt et en attente des requêtes...
$ java ClientRMI                 # → Réponse du serveur : Bonjour, Mouna !`}</pre>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ═══════════ GLOSSAIRE ═══════════ */}
        {tab === 'glossary' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h2 className="text-2xl font-black">📖 Glossaire — {dglossary.length} termes</h2>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un terme… (ex. : socket, NAT, handshake, idempotent)"
                className="mt-4 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-sky-600"
              />
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {filteredGlossary.map((g) => (
                <div key={g.term} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                  <p className="font-bold text-sky-300">{g.term}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-300">{g.def}</p>
                </div>
              ))}
              {filteredGlossary.length === 0 && (
                <p className="col-span-2 py-8 text-center text-sm text-zinc-500">Aucun terme trouvé pour « {search} »</p>
              )}
            </div>
          </div>
        )}

        {/* ═══════════ QUIZ ═══════════ */}
        {tab === 'quiz' && (
          <QuizEngine questions={dquestions} modules={dmodules} storageKey="dar-quiz-state-v1" />
        )}
      </main>

      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600">
        Site de révision — Développement d’applications réparties · Dr. Mouna KARAJA · GLSI3 · 2025-2026
      </footer>
    </div>
  )
}
