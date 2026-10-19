'use client'

// ─── Diagrammes interactifs — Développement d'applications réparties ───
import { useState } from 'react'
import { cn } from '@/lib/utils'

function Frame({ title, children, hint }: { title: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 bg-zinc-900/70 px-4 py-2.5">
        <p className="text-sm font-black tracking-wide text-sky-300">📊 {title}</p>
        {hint && <p className="mt-0.5 text-[11px] text-zinc-500">{hint}</p>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function Tabs({ options, active, onPick }: { options: { id: string; label: string }[]; active: string; onPick: (id: string) => void }) {
  return (
    <div className="mb-3 flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onPick(o.id)}
          className={cn(
            'rounded-full px-3 py-1.5 text-xs font-bold transition',
            active === o.id ? 'bg-sky-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Box({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-center text-xs font-semibold text-zinc-200', className)}>{children}</div>
}

function Arrow({ label }: { label?: string }) {
  return <div className="py-1 text-center text-sm text-sky-400">{label ? `${label} ↓` : '↓'}</div>
}

// 1 ─── Cas naïf vs cas réel
export function NaiveVsDistributed() {
  const [t, setT] = useState<'naive' | 'real'>('real')
  return (
    <Frame title="Un serveur ou des serveurs répartis dans le monde ?" hint="Bascule pour comparer les deux scénarios du cours">
      <Tabs options={[{ id: 'naive', label: '❌ Cas naïf' }, { id: 'real', label: '✅ Cas réel' }]} active={t} onPick={(x) => setT(x as 'naive' | 'real')} />
      {t === 'naive' ? (
        <div className="mx-auto max-w-sm space-y-1.5">
          <div className="grid grid-cols-3 gap-1.5">
            <Box>🇹🇳 Tunisie</Box><Box>🇪🇺 Europe</Box><Box>🇦🇸 Asie</Box>
          </div>
          <div className="text-center text-xs text-zinc-500">tous → vers un seul serveur ↓</div>
          <Box className="border-rose-600 bg-rose-500/15 text-rose-200">🖥️ Serveur unique — Amérique 🇺🇸</Box>
          <p className="pt-1 text-center text-xs text-rose-300">✗ lenteur · ✗ surcharge · ✗ panne totale si le serveur tombe</p>
        </div>
      ) : (
        <div className="mx-auto max-w-md space-y-1.5">
          <div className="grid grid-cols-4 gap-1.5">
            <Box>🇹🇳 Tunisie</Box><Box>🇪🇺 Europe</Box><Box>🇦🇸 Asie</Box><Box>🌍 Afrique</Box>
          </div>
          <div className="text-center text-xs text-zinc-500">chaque utilisateur → le serveur le plus proche ↓</div>
          <div className="grid grid-cols-4 gap-1.5">
            <Box className="border-emerald-600 bg-emerald-500/10 text-emerald-200">🖥️ 🇺🇸</Box>
            <Box className="border-emerald-600 bg-emerald-500/10 text-emerald-200">🖥️ 🇪🇺</Box>
            <Box className="border-emerald-600 bg-emerald-500/10 text-emerald-200">🖥️ 🇦🇸</Box>
            <Box className="border-emerald-600 bg-emerald-500/10 text-emerald-200">🖥️ 🌍</Box>
          </div>
          <p className="pt-1 text-center text-xs text-emerald-300">✓ rapidité · ✓ disponibilité · ✓ tolérance aux pannes · ✓ qualité de service</p>
        </div>
      )}
    </Frame>
  )
}

// 2 ─── Composition logique d'un nœud
export function NodeAnatomy() {
  return (
    <Frame title="Composition logique d’un nœud" hint="Tout nœud du système réparti : recevoir → traiter → envoyer">
      <div className="mx-auto max-w-md space-y-2">
        <Box className="border-sky-500 bg-sky-500/15 text-sky-200">🡇 Interface d’entrée — recevoir les messages des autres nœuds</Box>
        <Arrow />
        <Box className="border-amber-600 bg-amber-500/15 text-amber-200">⚙️ Traitement — décider quoi faire du message reçu / quoi produire comme réponse</Box>
        <Arrow />
        <Box className="border-emerald-600 bg-emerald-500/15 text-emerald-200">🡅 Interface de sortie — envoyer les messages ou réponses aux autres nœuds</Box>
      </div>
    </Frame>
  )
}

// 3 ─── Synchrone vs asynchrone (frise temporelle)
export function SyncAsync() {
  const [m, setM] = useState<'sync' | 'async'>('sync')
  return (
    <Frame title="Mode synchrone vs asynchrone" hint="Le comportement temporel de l’échange : bloqué ou libre">
      <Tabs options={[{ id: 'sync', label: 'Synchrone' }, { id: 'async', label: 'Asynchrone' }]} active={m} onPick={(x) => setM(x as 'sync' | 'async')} />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Box className="w-24 shrink-0 border-sky-500 bg-sky-500/10 text-sky-200">Client</Box>
          <div className="flex-1 space-y-1">
            {m === 'sync' ? (
              <>
                <p className="rounded bg-zinc-900 px-2 py-1 text-[11px] text-zinc-300">→ envoie la requête</p>
                <p className="rounded border border-rose-800 bg-rose-500/10 px-2 py-1 text-[11px] text-rose-200">⏳ attend (blocé) tant que la réponse n’arrive pas…</p>
                <p className="rounded bg-zinc-900 px-2 py-1 text-[11px] text-zinc-300">← reçoit la réponse → continue son exécution</p>
              </>
            ) : (
              <>
                <p className="rounded bg-zinc-900 px-2 py-1 text-[11px] text-zinc-300">→ envoie le message</p>
                <p className="rounded border border-emerald-800 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-200">▶️ continue son traitement immédiatement (non bloqué)</p>
                <p className="rounded bg-zinc-900 px-2 py-1 text-[11px] text-zinc-300">← (plus tard) reçoit le retour via callback / message</p>
              </>
            )}
          </div>
        </div>
        <Box className="border-zinc-700">🖥️ Serveur — {m === 'sync' ? 'traite et répond en temps réel' : 'peut répondre plus tard, selon sa disponibilité'}</Box>
        <p className="text-center text-xs text-zinc-500">{m === 'sync' ? '✔ simplicité, échange direct · ✘ dépendance temporelle forte' : '✔ tolérance aux délais et interruptions · ✘ complexité des retours différés'}</p>
      </div>
    </Frame>
  )
}

// 4 ─── Unicast / multicast / broadcast
export function AddressingModes() {
  const [m, setM] = useState<'u' | 'm' | 'b'>('m')
  const nodes = ['A', 'B', 'C', 'D', 'E']
  const targets: Record<string, string[]> = { u: ['B'], m: ['B', 'C', 'D'], b: ['A', 'B', 'C', 'D', 'E'] }
  return (
    <Frame title="Mécanismes d’adressage et de diffusion" hint="Un émetteur E envoie : à 1, à un groupe, ou à tous">
      <Tabs options={[{ id: 'u', label: 'Unicast' }, { id: 'm', label: 'Multicast' }, { id: 'b', label: 'Broadcast' }]} active={m} onPick={(x) => setM(x as 'u' | 'm' | 'b')} />
      <div className="flex items-center justify-center gap-3 py-2">
        <Box className="border-sky-500 bg-sky-500/20 text-sky-200">📡 Émetteur E</Box>
        <div className="text-2xl text-sky-400">➜</div>
        <div className="flex gap-1.5">
          {nodes.map((n) => {
            const hit = targets[m].includes(n)
            return (
              <Box key={n} className={hit ? 'border-emerald-500 bg-emerald-500/15 text-emerald-200' : 'opacity-40'}>🖥️ {n}</Box>
            )
          })}
        </div>
      </div>
      <p className="text-center text-xs text-zinc-500">
        {m === 'u' && 'Un à un — ex. : requête d\u2019un client vers un serveur'}
        {m === 'm' && 'À un groupe spécifique — ex. : visioconférence diffusée uniquement aux participants'}
        {m === 'b' && 'À tous les nœuds du réseau — ex. : message à tous les abonnés du réseau mobile'}
      </p>
    </Frame>
  )
}

// 5 ─── Les 5 modèles de communication
export function CommModels() {
  const models = [
    { id: 'msg', label: '📨 Message', def: 'Échange de messages explicites (envoyer/recevoir) via files de messages, sockets TCP/UDP. Découplage fort · complexité de gestion (ordre, duplication). Ex. : virement bancaire par message.' },
    { id: 'rpc', label: '📞 Appels (RPC)', def: 'Appeler une procédure distante comme si elle était locale — stubs qui cachent le réseau, généralement synchrone. Couplage fort (signature). Ex. : payerFacture().' },
    { id: 'rmi', label: '🧩 Objets distribués (RMI)', def: 'Objets distants exposés via une interface distante, méthodes invoquées transparentément. Middlewares : Java RMI, CORBA. Ex. : Réservation.confirmer() sur l\u2019objet Chambre.' },
    { id: 'stream', label: '🌊 Flux', def: 'Transfert continu en temps réel (audio, vidéo), unidirectionnel ou bidirectionnel. Gestion latence/synchronisation/QoS. Ex. : Netflix, YouTube, Zoom, Teams.' },
    { id: 'event', label: '⚡ Événements', def: 'Modèle pub/sub : publishers publient, subscribers s\u2019abonnent. Couplage faible, scalabilité, asynchrone. Ex. : « commande confirmée » → paiement, logistique, email, fidélité.' },
  ]
  const [m, setM] = useState('msg')
  const cur = models.find((x) => x.id === m)!
  return (
    <Frame title="Les 5 modèles de communication" hint="Clique sur chaque modèle pour voir son principe et son exemple">
      <Tabs options={models} active={m} onPick={setM} />
      <p className="rounded-xl border border-sky-900/60 bg-sky-500/5 p-3 text-sm leading-relaxed text-zinc-200">{cur.def}</p>
    </Frame>
  )
}

// 6 ─── OSI ↔ TCP/IP
const OSI_LAYERS = [
  { n: 7, name: 'Application', detail: 'Interface utilisateur ↔ réseau : SMTP (envoi de mails), HTTP (navigateurs ↔ serveurs Web, requête-réponse), FTP (transfert de fichiers).', tcp: 'Application' },
  { n: 6, name: 'Présentation', detail: 'Format des données : conversion (UTF-8 → ASCII, JPEG → BMP), compression (gain de bande passante), chiffrement/déchiffrement (HTTPS).', tcp: 'Application' },
  { n: 5, name: 'Session', detail: 'Ouvre la session, la maintient active pendant le transfert (continuité, reprise en cas d\u2019interruption), la ferme proprement.', tcp: 'Application' },
  { n: 4, name: 'Transport', detail: 'Transfert fiable et ordonné : découpe en segments avec en-tête (numéro de segment, port), contrôle d\u2019erreur, demande de réémission.', tcp: 'Transport' },
  { n: 3, name: 'Réseau', detail: 'Encapsule en paquets IP (IP source/destination), acheminement entre réseaux, routage (meilleur chemin), fragmentation si > MTU.', tcp: 'Internet' },
  { n: 2, name: 'Liaison de données', detail: 'Paquets → trames ; adresses MAC pour identifier émetteur/destinataire sur le LAN ; transfert fiable au sein du réseau local.', tcp: 'Accès au réseau' },
  { n: 1, name: 'Physique', detail: 'Transmission réelle des bits : signaux électriques (câble cuivre/Ethernet), lumineux (fibre optique), ondes radio (Wi-Fi, Bluetooth).', tcp: 'Accès au réseau' },
]

export function OsiTcpip() {
  const [sel, setSel] = useState(4)
  const layer = OSI_LAYERS.find((l) => l.n === sel)!
  return (
    <Frame title="Modèle OSI (7 couches) ↔ Modèle TCP/IP (4 couches)" hint="Clique sur une couche OSI pour voir son rôle et sa correspondance TCP/IP">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          {OSI_LAYERS.map((l) => (
            <button
              key={l.n}
              onClick={() => setSel(l.n)}
              className={cn(
                'flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-bold transition',
                sel === l.n ? 'border-sky-500 bg-sky-500/20 text-sky-100' : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
              )}
            >
              <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px]">{l.n}</span> {l.name}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <Box className="border-zinc-700 text-[11px] uppercase tracking-widest text-zinc-500">Modèle TCP/IP</Box>
          <Box className={cn(sel <= 5 ? 'border-sky-500 bg-sky-500/10 text-sky-200' : 'opacity-40')}>4. Application (HTTP, HTTPS, DNS, SMTP…)</Box>
          <Box className={cn(sel === 4 ? 'border-sky-500 bg-sky-500/10 text-sky-200' : 'opacity-40')}>3. Transport (TCP ou UDP)</Box>
          <Box className={cn(sel === 3 ? 'border-sky-500 bg-sky-500/10 text-sky-200' : 'opacity-40')}>2. Internet (IP)</Box>
          <Box className={cn(sel <= 2 ? 'border-sky-500 bg-sky-500/10 text-sky-200' : 'opacity-40')}>1. Accès au réseau (MAC, Ethernet, Wi-Fi…)</Box>
        </div>
      </div>
      <p className="mt-3 rounded-xl border border-amber-900/60 bg-amber-500/5 p-3 text-sm leading-relaxed text-zinc-200">
        <b className="text-amber-300">Couche {layer.n} — {layer.name} :</b> {layer.detail}
      </p>
    </Frame>
  )
}

// 7 ─── Encapsulation / désencapsulation
export function EncapsulationFlow() {
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState<'enc' | 'dec'>('enc')
  const units = [
    { name: 'Message', wrap: 'Couche Application — données + en-tête applicatif' },
    { name: 'Segment', wrap: '+ en-tête Transport (ports, numérotation) — TCP' },
    { name: 'Paquet', wrap: '+ en-tête Internet (IP source / destination)' },
    { name: 'Trame', wrap: '+ en-tête Accès réseau (MAC source / destination)' },
    { name: 'Bits', wrap: 'Transmis sur le support physique (câble, fibre, ondes)' },
  ]
  const idx = mode === 'enc' ? step : 4 - step
  const seq = mode === 'enc' ? units : [...units].reverse()
  return (
    <Frame title="Encapsulation ↔ Désencapsulation" hint="Avance pas à pas : chaque couche ajoute (envoi) puis retire (réception) son en-tête">
      <Tabs
        options={[{ id: 'enc', label: 'Envoi ↓ encapsulation' }, { id: 'dec', label: 'Réception ↑ désencapsulation' }]}
        active={mode}
        onPick={(x) => { setMode(x as 'enc' | 'dec'); setStep(0) }}
      />
      <div className="mx-auto max-w-md space-y-1.5">
        {seq.map((u, i) => (
          <div key={u.name}>
            <Box className={cn(i === idx ? 'border-sky-500 bg-sky-500/15 text-sky-100' : 'opacity-60')}>📦 {u.name}</Box>
            {i < seq.length - 1 && <Arrow label={mode === 'dec' ? '↑' : undefined} />}
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-center text-sm text-zinc-200">{units[idx].wrap}</p>
      <div className="mt-3 flex justify-center gap-2">
        <button onClick={() => setStep(Math.max(0, step - 1))} className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-white">← Précédent</button>
        <button onClick={() => setStep(Math.min(4, step + 1))} className="rounded-lg bg-sky-500 px-4 py-1.5 text-xs font-bold text-zinc-950 hover:bg-sky-400">Suivant →</button>
      </div>
    </Frame>
  )
}

// 8 ─── TCP 3-way handshake
export function TcpHandshake() {
  const [step, setStep] = useState(0)
  const steps = [
    { from: 'client', msg: 'SYN — demande de connexion (Synchronize)', note: 'Le client initie la synchronisation' },
    { from: 'server', msg: 'SYN-ACK — le serveur accepte et accuse réception', note: 'Le serveur répond en synchronisant à son tour' },
    { from: 'client', msg: 'ACK — le client confirme', note: 'Connexion établie : les deux parties peuvent échanger des données' },
  ]
  return (
    <Frame title="TCP — le handshake en 3 étapes (3-way handshake)" hint="Avance pour établir la connexion fiable avant tout échange de données">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-2">
        <Box className="border-sky-500 bg-sky-500/10 text-sky-200">💻 Client</Box>
        <div className="flex w-full flex-col items-center gap-2 px-2 sm:w-56">
          {steps.map((s, i) => (
            <div key={i} className={cn('w-full rounded-lg border px-2 py-1.5 text-center text-[11px] font-bold transition', i < step ? (s.from === 'client' ? 'border-emerald-600 bg-emerald-500/10 text-emerald-300' : 'border-violet-600 bg-violet-500/10 text-violet-300') : 'border-zinc-800 text-zinc-700')}>
              {i < step ? (s.from === 'client' ? '→ ' : '← ') + s.msg.split(' — ')[0] : '· · ·'}
            </div>
          ))}
        </div>
        <Box className="border-sky-500 bg-sky-500/10 text-sky-200">🖥️ Serveur</Box>
      </div>
      <p className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-200">
        {step === 0 && <><b className="text-sky-300">Étape 1 :</b> Clique sur « Suivant » — le client envoie SYN.</>}
        {step > 0 && <><b className="text-sky-300">{steps[Math.min(step, 3) - 1].msg.split(' — ')[0]} :</b> {steps[Math.min(step, 3) - 1].msg.split(' — ')[1]} — {steps[Math.min(step, 3) - 1].note}</>}
        {step >= 3 && <span className="ml-1 font-bold text-emerald-400">✔ Connexion établie — transfert fiable : segments numérotés, retransmission si perte, ACK de réception.</span>}
      </p>
      <div className="mt-3 flex justify-center gap-2">
        <button onClick={() => setStep(Math.max(0, step - 1))} className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-white">← Reset</button>
        <button onClick={() => setStep(Math.min(3, step + 1))} className="rounded-lg bg-sky-500 px-4 py-1.5 text-xs font-bold text-zinc-950 hover:bg-sky-400">Suivant →</button>
      </div>
    </Frame>
  )
}

// 9 ─── Le voyage d'une requête HTTP (schéma illustratif complet)
const JOURNEY = [
  { layer: '4. Application', side: 'client', text: 'Le client écrit http://www.exemple.com/index.html → le navigateur traduit en : GET /index.html HTTP/1.1 · Host: www.exemple.com' },
  { layer: '3. Transport', side: 'client', text: 'Segmentation : création du segment TCP — port source 50500 (éphémère), port destination 80, numéro du segment. → Segment TCP' },
  { layer: '2. Internet', side: 'client', text: 'Ajout IP source 192.168.1.10 et IP destination 10.0.0.5 (serveur final). → Paquet IP' },
  { layer: '1. Accès au réseau', side: 'client', text: 'Ajout MAC source AA:AA:AA:AA:AA:AA et MAC destination BB:BB:BB:BB:BB:BB (routeur). → Trame' },
  { layer: '1. Accès au réseau', side: 'router1', text: 'Le routeur émetteur reçoit la trame, la désencapsule pour lire les adresses IP.' },
  { layer: '2. Internet (NAT)', side: 'router1', text: 'NAT : IP source → 102.45.60.10 (publique du routeur), IP destinataire → 165.30.22.5' },
  { layer: '1. Accès au réseau', side: 'router1', text: 'Changement des MAC : source → BB:BB:BB:BB:BB:BB, destination → DD:DD:DD:DD:DD:DD (routeur suivant)' },
  { layer: '1. Accès au réseau', side: 'router2', text: 'Le routeur récepteur reçoit la trame, désencapsule pour lire les IP.' },
  { layer: '2. Internet (NAT inverse)', side: 'router2', text: 'NAT inverse : IP destination → 10.0.0.5 (machine du réseau local)' },
  { layer: '1. Accès au réseau', side: 'router2', text: 'Changement des MAC : source → DD:DD:DD:DD:DD:DD, destination → EE:EE:EE:EE:EE:EE (serveur)' },
  { layer: 'Désencapsulation', side: 'server', text: 'Le serveur remonte les couches : Trame → Paquet → Segment → Message — l\u2019application HTTP lit la requête GET.' },
]

export function PacketJourney() {
  const [step, setStep] = useState(0)
  const s = JOURNEY[step]
  const nodeCls = (who: string) => s.side === who ? 'border-sky-500 bg-sky-500/20 text-sky-100' : 'border-zinc-700 bg-zinc-900 text-zinc-300'
  return (
    <Frame title="Schéma illustratif : le voyage complet d’une requête HTTP" hint="Client → Routeur émetteur (NAT) → Routeur récepteur (NAT inverse) → Serveur — 11 étapes, avance pas à pas">
      <div className="mb-3 grid grid-cols-2 items-start gap-2 sm:grid-cols-4">
        <div className="space-y-1">
          <Box className={nodeCls('client')}>💻 Client<br /><span className="text-[10px] text-zinc-400">IP 192.168.1.10 · MAC AA:AA…</span></Box>
          <p className="text-center text-[10px] text-zinc-600">HTTP port 80 → TCP</p>
        </div>
        <div className="space-y-1">
          <Box className={nodeCls('router1')}>🔀 Routeur émetteur<br /><span className="text-[10px] text-zinc-400">LAN 192.168.1.1 · BB:BB… · WAN 102.45.60.10</span></Box>
        </div>
        <div className="space-y-1">
          <Box className={nodeCls('router2')}>🔀 Routeur récepteur<br /><span className="text-[10px] text-zinc-400">WAN 165.30.22.5 · LAN 10.0.0.1 · DD:DD…</span></Box>
        </div>
        <div className="space-y-1">
          <Box className={nodeCls('server')}>🖥️ Serveur<br /><span className="text-[10px] text-zinc-400">IP 10.0.0.5 · MAC EE:EE…</span></Box>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {JOURNEY.map((_, i) => (
          <button key={i} onClick={() => setStep(i)} className={cn('h-2 w-6 rounded-full', i <= step ? 'bg-sky-500' : 'bg-zinc-800')} aria-label={`Étape ${i + 1}`} />
        ))}
      </div>
      <p className="mt-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm leading-relaxed text-zinc-200">
        <b className="text-sky-300">Étape {step + 1} — {s.layer} :</b> {s.text}
      </p>
      <div className="mt-3 flex justify-center gap-2">
        <button onClick={() => setStep(Math.max(0, step - 1))} className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-white">← Précédent</button>
        <button onClick={() => setStep(Math.min(JOURNEY.length - 1, step + 1))} className="rounded-lg bg-sky-500 px-4 py-1.5 text-xs font-bold text-zinc-950 hover:bg-sky-400">Suivant →</button>
      </div>
    </Frame>
  )
}

// 10 ─── Principe de base des sockets (5 étapes)
export function SocketFlow() {
  const [step, setStep] = useState(0)
  const steps = [
    'L\u2019application (client HTTP) crée une socket et demande au transport d\u2019envoyer — Source : 192.168.1.15:53000 (port éphémère) → Destination : 142.250.185.78:80 (HTTP)',
    'La couche transport encapsule les données dans des segments, ajoute les en-têtes de contrôle et transmet à la couche suivante',
    'Les couches Internet et Accès au réseau acheminent les paquets jusqu\u2019à la machine destinataire',
    'La couche transport du destinataire reçoit le paquet et le redirige vers la socket identifiée par le port 80',
    'La socket transmet les données à l\u2019application (serveur HTTP) → l\u2019application lit les données depuis sa socket',
  ]
  return (
    <Frame title="Principe de base des sockets — 5 étapes" hint="De la création de la socket côté client jusqu’à la lecture côté serveur">
      <div className="space-y-1.5">
        {steps.map((t, i) => (
          <Box key={i} className={cn('text-left text-xs', i === step ? 'border-sky-500 bg-sky-500/15 text-sky-100' : 'opacity-50')}>
            <b>Étape {i + 1} :</b> {t}
          </Box>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <button onClick={() => setStep(Math.max(0, step - 1))} className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-white">← Précédent</button>
        <button onClick={() => setStep(Math.min(4, step + 1))} className="rounded-lg bg-sky-500 px-4 py-1.5 text-xs font-bold text-zinc-950 hover:bg-sky-400">Suivant →</button>
      </div>
    </Frame>
  )
}

// 11 ─── Sockets TCP vs UDP (séquences du cours)
export function TcpUdpSockets() {
  const [m, setM] = useState<'tcp' | 'udp'>('tcp')
  return (
    <Frame title="Les sockets TCP vs UDP — séquences du cours" hint="TCP : Open Listen / accept / session par flux · UDP : create / bind / datagrammes">
      <Tabs options={[{ id: 'tcp', label: 'Sockets TCP (Java : ServerSocket, Socket)' }, { id: 'udp', label: 'Sockets UDP (Java : DatagramSocket, DatagramPacket)' }]} active={m} onPick={(x) => setM(x as 'tcp' | 'udp')} />
      {m === 'tcp' ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5 rounded-xl border border-sky-900/60 bg-sky-500/5 p-3">
            <p className="text-center text-xs font-black text-sky-300">CLIENT — « Open Client »</p>
            <Box>socket()</Box><Arrow />
            <Box>connect() → Connection request ➜</Box><Arrow />
            <Box className="border-amber-600 bg-amber-500/10">write() ↔ read() (session)</Box><Arrow />
            <Box>close() — « End Of File » ➜</Box>
          </div>
          <div className="space-y-1.5 rounded-xl border border-violet-900/60 bg-violet-500/5 p-3">
            <p className="text-center text-xs font-black text-violet-300">SERVEUR — « Open Listen »</p>
            <Box>socket() → bind() → listen()</Box><Arrow />
            <Box>accept() ← connection request</Box><Arrow />
            <Box className="border-amber-600 bg-amber-500/10">read() ↔ write() (session)</Box><Arrow />
            <Box>read() (EOF) → close() → retour à accept()</Box>
          </div>
          <p className="text-center text-xs text-zinc-500 sm:col-span-2">Échange via des flux (InputStream / OutputStream) — connexion fiable, flux continus, ordre garanti.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5 rounded-xl border border-violet-900/60 bg-violet-500/5 p-3">
            <p className="text-center text-xs font-black text-violet-300">SERVEUR</p>
            <Box>Create a socket (DatagramSocket)</Box><Arrow />
            <Box>Bind the socket</Box><Arrow />
            <Box>Receive request ← data (request)</Box><Arrow />
            <Box>Send response — data (reply) ➜</Box>
          </div>
          <div className="space-y-1.5 rounded-xl border border-sky-900/60 bg-sky-500/5 p-3">
            <p className="text-center text-xs font-black text-sky-300">CLIENT</p>
            <Box>Create a socket (DatagramSocket)</Box><Arrow />
            <Box>Bind the socket</Box><Arrow />
            <Box>Send the request — data (request) ➜</Box><Arrow />
            <Box>Receive response ← data (reply)</Box>
          </div>
          <p className="text-center text-xs text-zinc-500 sm:col-span-2">Datagrammes indépendants : aucune session ni connexion persistante — le serveur répond via un autre datagramme.</p>
        </div>
      )}
    </Frame>
  )
}

// 12 ─── RPC : principe et fonctionnement détaillé
export function RpcFlow() {
  const [step, setStep] = useState(0)
  const phases = [
    { t: 'Définition de l\u2019interface', d: 'La signature de la fonction distante (types d\u2019arguments, types de retour) est écrite dans l\u2019IDL.' },
    { t: 'Génération du code', d: 'Les outils lisent l\u2019IDL et génèrent : le stub client (remplace la fonction distante) + le squelette serveur (reçoit la requête, appelle la vraie fonction).' },
    { t: 'Exécution côté serveur', d: 'Le serveur implémente la logique réelle, enregistre son service dans un annuaire (optionnel) ou écoute sur un port connu.' },
    { t: 'Appel côté client', d: 'Le client appelle la fonction sur le stub → marshalling des arguments → envoi via le transport (socket TCP) → le stub attend la réponse (RPC synchrone).' },
    { t: 'Traitement côté serveur', d: 'Le skeleton reçoit le message → unmarshalling → appelle la fonction réelle → récupère le résultat (ou l\u2019exception) → envoie la réponse marshallée.' },
    { t: 'Retour côté client', d: 'Le stub client reçoit la réponse, effectue l\u2019unmarshalling et retourne la valeur au programme appelant.' },
  ]
  return (
    <Frame title="Fonctionnement détaillé du RPC — 6 phases" hint="IDL → génération → serveur → appel → traitement → retour">
      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
        {phases.map((p, i) => (
          <button key={i} onClick={() => setStep(i)} className={cn('rounded-lg border p-2 text-center text-[10px] font-bold transition', i === step ? 'border-sky-500 bg-sky-500/20 text-sky-100' : 'border-zinc-800 bg-zinc-900 text-zinc-500')}>
            {i + 1}. {p.t}
          </button>
        ))}
      </div>
      <p className="mt-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm leading-relaxed text-zinc-200">
        <b className="text-sky-300">{phases[step].t} :</b> {phases[step].d}
      </p>
      <p className="mt-2 text-center text-[11px] text-zinc-500">💡 Outils de génération : ONC RPC → rpcgen · DCE RPC → compilateur idl · CORBA → idl compiler · Microsoft RPC → MIDL</p>
    </Frame>
  )
}

// 13 ─── Architecture générale RMI
export function RmiArch() {
  const [step, setStep] = useState(0)
  const notes = [
    'Le serveur enregistre l\u2019objet distant dans le RMI Registry : Naming.rebind("rmi://localhost/HelloService", obj)',
    'Le client cherche l\u2019objet distant dans le registre : Naming.lookup("rmi://localhost/HelloService")',
    'Le registre renvoie le stub client (la référence distante) au programme client',
    'Data Communication : le Client Stub communique avec le Server Skeleton — l\u2019appel distant circule, transparent pour le développeur',
  ]
  return (
    <Frame title="L’architecture générale RMI" hint="Remote interface = le contrat · RMI Registry = annuaire (port 1099) · 4 étapes numérotées">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1.5 rounded-xl border border-sky-900/60 bg-sky-500/5 p-3">
          <p className="text-center text-xs font-black text-sky-300">Client Host</p>
          <Box className="border-zinc-600 text-[10px]">Remote interface — le contrat (méthodes appelables)</Box>
          <Box>Client Program</Box>
          <Box className={cn(step >= 3 && 'border-sky-500 bg-sky-500/20')}>Client Stub</Box>
        </div>
        <div className="space-y-1.5 rounded-xl border border-violet-900/60 bg-violet-500/5 p-3">
          <p className="text-center text-xs font-black text-violet-300">Server Host</p>
          <Box className="border-zinc-600 text-[10px]">Remote interface — le contrat</Box>
          <Box>Server Skeleton</Box>
          <Box className="border-emerald-700 bg-emerald-500/10 text-emerald-200">Server Object (HelloImpl)</Box>
        </div>
        <div className="space-y-1.5 rounded-xl border border-amber-900/60 bg-amber-500/5 p-3">
          <p className="text-center text-xs font-black text-amber-300">RMI Registry Host</p>
          <Box className="border-amber-600 bg-amber-500/15 text-amber-200">RMI Registry (port 1099) — stocke les références d’objets distants exportés</Box>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5 text-[10px] font-bold">
        <span className={cn('rounded-full px-2 py-1', step === 0 ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-400')}>(1) Register server object</span>
        <span className={cn('rounded-full px-2 py-1', step === 1 ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-400')}>(2) Look for server object</span>
        <span className={cn('rounded-full px-2 py-1', step === 2 ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-400')}>(3) Return Client Stub</span>
        <span className={cn('rounded-full px-2 py-1', step === 3 ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-400')}>(4) Data Communication</span>
      </div>
      <p className="mt-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-200">{notes[step]}</p>
      <div className="mt-3 flex justify-center gap-2">
        <button onClick={() => setStep(Math.max(0, step - 1))} className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-white">← Précédent</button>
        <button onClick={() => setStep(Math.min(3, step + 1))} className="rounded-lg bg-sky-500 px-4 py-1.5 text-xs font-bold text-zinc-950 hover:bg-sky-400">Suivant →</button>
      </div>
    </Frame>
  )
}

// 14 ─── Évolution des architectures
export function ArchEvolution() {
  const eras = [
    { id: '1960', label: '1960', t: 'Centralisée', d: 'Un seul ordinateur puissant partagé par plusieurs utilisateurs.' },
    { id: '1980', label: '1980', t: 'Client-serveur', d: 'Répartition des rôles entre un client et un serveur.' },
    { id: '1990', label: '1990', t: 'Multi-couches', d: 'Apparition des serveurs d\u2019applications et des middleware comme CORBA.' },
    { id: '2000', label: '2000', t: 'SOA', d: 'Architecture orientée services : intégration entre systèmes via les services Web.' },
    { id: '2010', label: '2010+', t: 'Microservices · Événementielle · Serverless', d: 'Les architectures micro-services, événementielles et serverless.' },
  ]
  const [e, setE] = useState('2010')
  const cur = eras.find((x) => x.id === e)!
  return (
    <Frame title="L’évolution des architectures" hint="Clique sur une époque">
      <div className="flex flex-wrap gap-1.5">
        {eras.map((x) => (
          <button key={x.id} onClick={() => setE(x.id)} className={cn('rounded-full px-3 py-1.5 text-xs font-bold', e === x.id ? 'bg-sky-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400')}>{x.label} — {x.t}</button>
        ))}
      </div>
      <p className="mt-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-200"><b className="text-sky-300">{cur.label} :</b> {cur.d}</p>
    </Frame>
  )
}

// 15 ─── Architectures classiques
export function ClassicArchs() {
  const [a, setA] = useState<'cs' | 'layers' | 'p2p'>('cs')
  return (
    <Frame title="Les 3 architectures classiques" hint="Client/Serveur · En couches · Pair-à-Pair">
      <Tabs options={[{ id: 'cs', label: 'Client/Serveur' }, { id: 'layers', label: 'En couches' }, { id: 'p2p', label: 'Pair-à-Pair (P2P)' }]} active={a} onPick={(x) => setA(x as 'cs' | 'layers' | 'p2p')} />
      {a === 'cs' && (
        <div className="mx-auto max-w-md space-y-1.5">
          <Box>🖥️ Client layer — interfaces graphiques</Box>
          <div className="grid grid-cols-2 gap-2 text-center text-[11px] text-zinc-400">
            <p>Send request →</p><p>← Response to request</p>
          </div>
          <Box className="border-emerald-700 bg-emerald-500/10 text-emerald-200">🗄️ Server layer — serveurs</Box>
          <p className="text-center text-xs text-zinc-500">Ressources centralisées via un réseau · Ex. : desktop interrogeant une BDD · ✘ point unique de défaillance</p>
        </div>
      )}
      {a === 'layers' && (
        <div className="mx-auto max-w-sm space-y-1.5">
          <Box>🎨 Couche présentation</Box><Arrow />
          <Box className="border-amber-600 bg-amber-500/10">🧠 Couche logique métier</Box><Arrow />
          <Box className="border-emerald-700 bg-emerald-500/10">🗄️ Couche accès aux données</Box>
          <p className="text-center text-xs text-zinc-500">Modèle conceptuel : chaque couche a sa responsabilité, ne parle qu’aux couches voisines → 3-tiers / n-tiers en déploiement physique</p>
        </div>
      )}
      {a === 'p2p' && (
        <div className="mx-auto max-w-md space-y-1.5">
          <div className="grid grid-cols-4 gap-1.5">
            <Box className="border-sky-500 bg-sky-500/10">🖥️ Pair</Box><Box className="border-sky-500 bg-sky-500/10">🖥️ Pair</Box><Box className="border-sky-500 bg-sky-500/10">🖥️ Pair</Box><Box className="border-sky-500 bg-sky-500/10">🖥️ Pair</Box>
          </div>
          <div className="text-center text-xs text-zinc-500">chacun est client ET serveur — communication directe</div>
          <Box className="border-violet-600 bg-violet-500/10">🔗 Réseau maillé, sans serveur central</Box>
          <p className="text-center text-xs text-zinc-500">Décentralisé, autonome, scalable, robuste (fonctionne même si plusieurs pairs tombent) · ✘ sécurité complexe, cohérence difficile</p>
        </div>
      )}
    </Frame>
  )
}

// 16 ─── 3-tiers vs n-tiers
export function TierArch() {
  const [t, setT] = useState<'3t' | 'nt'>('3t')
  return (
    <Frame title="Implémentation physique de l’architecture en couches" hint="3-tiers : 3 machines · n-tiers : le Web ajoute des tiers (serveur Web)">
      <Tabs options={[{ id: '3t', label: 'Architecture 3-tiers' }, { id: 'nt', label: 'Architecture n-tiers' }]} active={t} onPick={(x) => setT(x as '3t' | 'nt')} />
      <div className="grid grid-cols-3 items-center gap-1.5">
        <div className="space-y-1">
          <Box className="border-sky-500 bg-sky-500/10 text-[10px]">Presentation tier</Box>
          <Box>{t === '3t' ? '💻 User interfaces' : '🌐 Web browsers + INTERNET + Web servers'}</Box>
        </div>
        <div className="space-y-1 text-center text-[10px] text-zinc-500">
          <p>→ User requests / actions</p>
          <p>← Processed Data / Responses</p>
        </div>
        <div className="space-y-1">
          <Box className="border-amber-600 bg-amber-500/10 text-[10px]">Business logic tier</Box>
          <Box>⚙️ Application servers</Box>
        </div>
        <div className="space-y-1 text-center text-[10px] text-zinc-500">
          <p>→ Data Requests / Queries</p>
          <p>← Data Responses / Results</p>
        </div>
        <div className="space-y-1">
          <Box className="border-emerald-700 bg-emerald-500/10 text-[10px]">Data tier</Box>
          <Box>🗄️ Database servers</Box>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-zinc-500">{t === '3t' ? 'Séparation physique : interface utilisateur · logique applicative · données' : 'Déclinaison Web : le tier présentation inclut navigateurs + serveurs Web (tiers supplémentaires)'}</p>
    </Frame>
  )
}

// 17 ─── SOA : publish / find / bind
export function SoaFlow() {
  const [step, setStep] = useState(0)
  const notes = [
    '(1) Le fournisseur publie le service dans le registre.',
    '(2) Le client interroge le registre pour découvrir un service.',
    '(3) Invocation et consommation du service — via l\u2019ESB qui assure routage, transformation et médiation.',
  ]
  return (
    <Frame title="SOA — Registre de services, fournisseur, consommateur et ESB" hint="Le triangle Publish / Find / Bind">
      <div className="mx-auto max-w-md space-y-2">
        <Box className="mx-auto w-40 border-amber-600 bg-amber-500/15 text-amber-200">🗂️ Registre de services</Box>
        <div className="grid grid-cols-2 items-center gap-2">
          <Box className={cn(step === 1 && 'border-sky-500 bg-sky-500/20')}>👤 Consommateur de service</Box>
          <Box className={cn(step === 0 && 'border-sky-500 bg-sky-500/20')}>🏭 Fournisseur de service</Box>
        </div>
        <Box className={cn('mx-auto w-32 border-sky-600 bg-sky-500/10 text-sky-200', step === 2 && 'ring-1 ring-sky-400')}>🚌 ESB</Box>
      </div>
      <p className="mt-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-200">{notes[step]}</p>
      <div className="mt-3 flex justify-center gap-2">
        <button onClick={() => setStep(Math.max(0, step - 1))} className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-white">← Précédent</button>
        <button onClick={() => setStep(Math.min(2, step + 1))} className="rounded-lg bg-sky-500 px-4 py-1.5 text-xs font-bold text-zinc-950 hover:bg-sky-400">Suivant →</button>
      </div>
    </Frame>
  )
}

// 18 ─── Microservices : API Gateway + services + conteneurs
export function MicroservicesArch() {
  const services = [
    { e: '🏠', n: 'Accueil' }, { e: '💬', n: 'Chat' }, { e: '🛒', n: 'Commandes' }, { e: '👤', n: 'Utilisateurs' },
    { e: '🔒', n: 'Auth' }, { e: '💳', n: 'Paiement' }, { e: '🚚', n: 'Livraison' }, { e: '🔍', n: 'Recherche' },
  ]
  const comps = [
    { t: 'API Gateway', d: 'Point d\u2019entrée unique : reçoit les requêtes et les redirige vers les microservices appropriés.' },
    { t: 'Conteneurs (Docker)', d: 'Environnement léger : le microservice + son environnement d\u2019exécution, déployable sur n\u2019importe quelle machine.' },
    { t: 'Orchestrateur (Kubernetes)', d: 'Gère automatiquement les conteneurs : déploiement, redémarrage, scaling, réseau interne.' },
    { t: 'Système de communication', d: 'API REST / gRPC en synchrone, ou messages/événements en asynchrone.' },
  ]
  const [c, setC] = useState(0)
  return (
    <Frame title="Architecture microservices" hint="Clique sur un composant pour voir son rôle">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Box className="border-sky-500 bg-sky-500/20">💻 Interface Utilisateur</Box>
        <div className="text-sky-400">→</div>
        <Box className="border-amber-600 bg-amber-500/15 text-amber-200">🚪 API Gateway</Box>
        <div className="text-sky-400">→</div>
        <div className="grid max-w-sm grid-cols-4 gap-1">
          {services.map((s) => (
            <Box key={s.n} className="px-1 py-1.5 text-[9px]">{s.e}<br />{s.n}</Box>
          ))}
        </div>
      </div>
      <p className="mt-1 text-center text-[10px] text-zinc-600">chaque microservice vit dans son conteneur 📦, avec sa propre base 🗄️ — orchestrés par Kubernetes ⎈</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {comps.map((x, i) => (
          <button key={x.t} onClick={() => setC(i)} className={cn('rounded-full px-3 py-1.5 text-xs font-bold', c === i ? 'bg-sky-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400')}>{x.t}</button>
        ))}
      </div>
      <p className="mt-2 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-200">{comps[c].d}</p>
    </Frame>
  )
}

// 19 ─── EDA : exemple e-commerce du cours
export function EdaFlow() {
  const [ev, setEv] = useState<'order' | 'stock' | 'return'>('order')
  const evs = {
    order: { name: 'New Order 📦', consumers: ['Warehouse Mgmt DB — met à jour l\u2019inventaire et la disponibilité', 'Finance System — met à jour les finances selon la vente', 'Customer Relations — répond à la commande'] },
    stock: { name: 'Question about stock ❓', consumers: ['Warehouse Mgmt DB — vérifie l\u2019inventaire', 'Customer Relations — répond à la demande client'] },
    return: { name: 'Return 🔄', consumers: ['Warehouse Mgmt DB — remet l\u2019article en stock', 'Finance System — met à jour les finances selon le retour'] },
  }
  const cur = evs[ev]
  return (
    <Frame title="Event-Driven Architecture — exemple e-commerce du cours" hint="Les producteurs publient, l’Event Router filtre et pousse vers les bons consommateurs">
      <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="space-y-1.5">
          <p className="text-xs font-black text-sky-300">Event Producers</p>
          <button onClick={() => setEv('order')} className={cn('w-full rounded-xl border px-3 py-2 text-left text-xs font-semibold', ev === 'order' ? 'border-sky-500 bg-sky-500/20 text-sky-100' : 'border-zinc-700 bg-zinc-900 text-zinc-300')}>🖥️ Retail website → New Order</button>
          <button onClick={() => setEv('stock')} className={cn('w-full rounded-xl border px-3 py-2 text-left text-xs font-semibold', ev === 'stock' ? 'border-sky-500 bg-sky-500/20 text-sky-100' : 'border-zinc-700 bg-zinc-900 text-zinc-300')}>📱 Mobile app → Question about stock</button>
          <button onClick={() => setEv('return')} className={cn('w-full rounded-xl border px-3 py-2 text-left text-xs font-semibold', ev === 'return' ? 'border-sky-500 bg-sky-500/20 text-sky-100' : 'border-zinc-700 bg-zinc-900 text-zinc-300')}>🏪 Point-of-sale → Return</button>
        </div>
        <Box className="border-amber-600 bg-amber-500/15 text-amber-200">⚙️ Event Router<br /><span className="text-[10px] font-normal">ingère, filtre et pousse les événements vers les consommateurs appropriés</span></Box>
        <div className="space-y-1.5">
          <p className="text-xs font-black text-violet-300">Event Consumers</p>
          {cur.consumers.map((c) => <Box key={c} className="border-violet-700 bg-violet-500/10 text-left text-[11px] text-violet-100">{c}</Box>)}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">Événement sélectionné : <b className="text-sky-300">{cur.name}</b> — communication découplée et asynchrone (motivations : réactivité, découplage, scalabilité)</p>
    </Frame>
  )
}

// 20 ─── Les 4 modèles asynchrones
export function AsyncModels() {
  const models = [
    { id: 'mp', label: '📨 Message Passing', d: 'Service 1 → message → Service 2, sans attendre. Point-à-point, destinataire unique (couplage spatial). ⚠️ Si le récepteur est indisponible, le message peut être perdu. Tech : RabbitMQ, NATS, Microsoft MSMQ.' },
    { id: 'ps', label: '📢 Publish / Subscribe', d: 'Publisher → Topic (broker) → plusieurs Subscribers. Découplage fort (spatial, temporel, logique), broadcast efficace. Topic-based (topics nommés) ou Content-based (filtres). Tech : Redis Pub/Sub, Google Pub/Sub, Apache Kafka.' },
    { id: 'q', label: '📥 Queue-based', d: 'Producer → Queue (broker) → UN SEUL Consumer par message. La queue = mémoire temporaire (panne) + régulation (pics). Le sender connaît juste le broker et le nom de la queue. Tech : RabbitMQ, Kafka, ActiveMQ.' },
    { id: 'st', label: '🌊 Streaming d\u2019événements', d: 'Événements (logs, transactions, clics, mesures…) capturés, stockés et traités en continu dans un flux ; persistés dans un log append-only distribué ; traitement temps réel ou quasi réel. Tech : Kafka Streams, Apache Pulsar, Amazon Kinesis.' },
  ]
  const [m, setM] = useState('ps')
  const cur = models.find((x) => x.id === m)!
  return (
    <Frame title="Les 4 modèles de la communication asynchrone" hint="Clique sur chaque modèle — technologies majeures incluses">
      <Tabs options={models} active={m} onPick={setM} />
      <p className="rounded-xl border border-sky-900/60 bg-sky-500/5 p-3 text-sm leading-relaxed text-zinc-200">{cur.d}</p>
    </Frame>
  )
}

// 21 ─── ACK / Retry / backoff
export function AckBackoff() {
  const [s, setS] = useState(0)
  const attempts = [1, 2, 4, 8]
  return (
    <Frame title="ACK / NACK et politiques de réessai (retry)" hint="Le consommateur confirme ; le broker retente avec backoff croissant ; échec final → Dead Letter Queue">
      <div className="flex items-center justify-center gap-2">
        <Box>🏭 Producteur</Box><div className="text-sky-400">→</div>
        <Box className="border-amber-600 bg-amber-500/15">🗂️ Broker (queue)</Box><div className="text-sky-400">→</div>
        <Box className={cn(s === 0 && 'border-emerald-600 bg-emerald-500/15')}>👤 Consommateur</Box>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {['✅ ACK — reçu et traité', '❌ NACK — échec de traitement', '🔁 Retry — re-livraison'].map((x, i) => (
          <button key={x} onClick={() => setS(i)} className={cn('rounded-full px-3 py-1.5 text-xs font-bold', s === i ? 'bg-sky-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400')}>{x}</button>
        ))}
      </div>
      {s === 0 && <p className="mt-2 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-200">ACK = accusé de réception envoyé par le consommateur au broker pour confirmer que le message a bien été reçu et traité. Sans ACK, le broker ne sait pas si le message a été consommé et risque de le perdre ou de le supprimer prématurément.</p>}
      {s === 1 && <p className="mt-2 rounded-xl bg-rose-500/10 p-3 text-sm text-rose-200">NACK (negative ACK) = indique un échec de traitement → le broker déclenche une politique de réessai.</p>}
      {s === 2 && (
        <div className="mt-2 rounded-xl bg-zinc-900 p-3 text-sm text-zinc-200">
          Stratégies : <b className="text-sky-300">simple</b> (n tentatives fixes) · <b className="text-sky-300">exponential backoff</b> (attente croissante) · <b className="text-sky-300">jitter</b> (aléa contre les pics synchrones)
          <div className="mt-2 flex items-end gap-1.5">
            {attempts.map((a, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-8 rounded-t bg-sky-500/60" style={{ height: a * 6 }} />
                <span className="text-[10px] text-zinc-500">t{attempts.slice(0, i).reduce((x, y) => x + y, 0) || ''}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-amber-300">➔ Après un nombre maximal d’essais : le message part en Dead Letter Queue.</p>
        </div>
      )}
    </Frame>
  )
}

// 22 ─── Garanties de livraison
export function DeliveryGuarantees() {
  const [g, setG] = useState<'amo' | 'alo' | 'eo'>('alo')
  const data = {
    amo: { t: 'Au-plus-une fois (At-most-once)', c: 'rose', pts: ['Envoi sans mécanisme de réessai', 'Le message peut être perdu…', '…mais il ne sera jamais livré deux fois', '→ Perte tolérable, duplication inacceptable', '📌 Exemple : notification de logs'] },
    alo: { t: 'Au-moins-une fois (At-least-once)', c: 'amber', pts: ['Le message est réémis tant qu\u2019il n\u2019a pas été confirmé (ACK)', 'Livraison garantie…', '…mais il peut être livré plusieurs fois', '→ Le consommateur doit être idempotent', '📌 Exemple : email de confirmation de commande'] },
    eo: { t: 'Exactement-une fois (Exactly-once)', c: 'emerald', pts: ['Chaque message est traité une seule fois', 'Même en cas d\u2019échec ou de redémarrage', '→ La garantie la plus forte…', '…mais aussi la plus coûteuse', '📌 Exemple : paiement, transaction bancaire'] },
  }
  const cur = data[g]
  return (
    <Frame title="Garanties de livraison des messages" hint="Trois niveaux, du moins cher au plus fiable">
      <Tabs options={[{ id: 'amo', label: 'At-most-once' }, { id: 'alo', label: 'At-least-once' }, { id: 'eo', label: 'Exactly-once' }]} active={g} onPick={(x) => setG(x as 'amo' | 'alo' | 'eo')} />
      <div className={cn('rounded-xl border p-4', cur.c === 'rose' ? 'border-rose-800 bg-rose-500/10' : cur.c === 'amber' ? 'border-amber-700 bg-amber-500/10' : 'border-emerald-700 bg-emerald-500/10')}>
        <p className="font-black text-zinc-100">{cur.t}</p>
        <ul className="mt-2 space-y-1 text-sm text-zinc-200">
          {cur.pts.map((p) => <li key={p}>• {p}</li>)}
        </ul>
      </div>
    </Frame>
  )
}

// ─── Registre des diagrammes DAR ───
export const darDiagramRegistry: Record<string, React.ComponentType> = {
  NaiveVsDistributed,
  NodeAnatomy,
  SyncAsync,
  AddressingModes,
  CommModels,
  OsiTcpip,
  EncapsulationFlow,
  TcpHandshake,
  PacketJourney,
  SocketFlow,
  TcpUdpSockets,
  RpcFlow,
  RmiArch,
  ArchEvolution,
  ClassicArchs,
  TierArch,
  SoaFlow,
  MicroservicesArch,
  EdaFlow,
  AsyncModels,
  AckBackoff,
  DeliveryGuarantees,
}
