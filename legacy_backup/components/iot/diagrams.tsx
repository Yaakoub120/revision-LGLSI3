'use client'

// ─── Diagrammes interactifs — Internet des Objets (FSM LSI3) ───
import { useState } from 'react'
import { cn } from '@/lib/utils'

function Frame({ title, children, hint }: { title: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 bg-zinc-900/70 px-4 py-2.5">
        <p className="text-sm font-black tracking-wide text-emerald-300">📊 {title}</p>
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
            active === o.id ? 'bg-emerald-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
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

// 1 ─── Historique de l'IoT (frise interactive)
export function IotHistory() {
  const eras = [
    { id: '1999', label: '1999', title: 'Kevin Ashton (MIT)', text: "Invente le terme « Internet of Things » pour décrire la gestion de la chaîne logistique via RFID.", color: 'emerald' },
    { id: '2000', label: 'Années 2000', title: 'RFID et capteurs simples', text: "Les fondations : identification radio et premiers capteurs.", color: 'teal' },
    { id: '2008', label: '2008', title: "Premier pic : 12 milliards d'objets", text: "Les objets connectés dépassent la population mondiale.", color: 'cyan' },
    { id: '2020', label: '2020s', title: 'Explosion des applications', text: "Santé, smart cities, industrie 4.0.", color: 'sky' },
    { id: 'now', label: "Aujourd'hui", title: '50+ milliards d\u2019objets connectés', text: "Marché IoT : 1 600 Md$ fin 2026 (McKinsey) · IoMT : 187 Md$ en 2030 (Deloitte) · 60 % des établissements de santé utilisent l'IoT (HIMSS).", color: 'amber' },
  ]
  const [active, setActive] = useState('now')
  const cur = eras.find((e) => e.id === active)!
  return (
    <Frame title="Frise historique de l'IoT" hint="Clique sur une époque">
      <div className="flex flex-wrap gap-1.5">
        {eras.map((e) => (
          <button key={e.id} onClick={() => setActive(e.id)} className={cn('rounded-full px-3 py-1.5 text-xs font-bold', active === e.id ? 'bg-emerald-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400')}>
            {e.label}
          </button>
        ))}
      </div>
      <Box className={cn('mt-3 text-left', cur.color === 'amber' ? 'border-amber-600 bg-amber-500/10 text-amber-100' : 'border-emerald-600 bg-emerald-500/10')}>
        <p className="text-sm font-black">{cur.title}</p>
        <p className="mt-1 font-normal text-zinc-300">{cur.text}</p>
      </Box>
    </Frame>
  )
}

// 2 ─── Exemples IoMT : 7 familles
export function IomtExamples() {
  const familles = [
    { id: 'w', label: 'Wearables', items: ['Apple Watch Series 10 : ECG + SpO₂', 'Fitbit Sense : stress via variabilité du rythme cardiaque', 'FreeStyle Libre : glucose en continu, sans piqûre', 'BioSticker : signes vitaux pendant 30 jours'] },
    { id: 'i', label: 'Implants', items: ['Medtronic MyCareLink : pacemaker → médecin via Bluetooth', 'Tandem t:slim X2 : pompe à insuline auto (capteurs Dexcom)', 'StimWave : douleur chronique via app mobile'] },
    { id: 's', label: 'Surveillance à distance', items: ['Philips eCareCoordinator : BPCO / insuffisance cardiaque', 'BioTelemetry (GE Healthcare) : ECG portables', 'CarePredict : chutes + comportement (IA)'] },
    { id: 't', label: 'Télémédecine', items: ['TytoCare : stéthoscope + otoscope + thermomètre connectés', 'Teladoc : vidéo + partage de données IoMT (tension)'] },
    { id: 'h', label: 'Hôpitaux', items: ['EarlySense : capteurs sous le matelas', 'Siemens Healthineers : stocks de sang / vaccins', 'Xenex LightStrike : désinfection UV'] },
    { id: 'u', label: 'Urgence', items: ['Embrace2 : crises d\u2019épilepsie (mouvement + transpiration)', 'HeartHero : défibrillateur guidé par app'] },
    { id: 'p', label: 'Santé mentale', items: ['Muse 2 : neurofeedback / méditation', 'AppliedVR : douleur chronique + anxiété en VR'] },
  ]
  const [f, setF] = useState('w')
  const cur = familles.find((x) => x.id === f)!
  return (
    <Frame title="Les 7 familles d'applications IoMT" hint="Clique sur une famille pour voir les dispositifs du cours">
      <Tabs options={familles.map((x) => ({ id: x.id, label: x.label }))} active={f} onPick={setF} />
      <div className="space-y-1.5">
        {cur.items.map((it, i) => <Box key={i} className="border-emerald-700/60 bg-emerald-500/10 text-left text-emerald-100">{it}</Box>)}
      </div>
    </Frame>
  )
}

// 3 ─── IoE : 3 communications
export function IoeComm() {
  const modes = [
    { id: 'lieu', label: '📍 Tout LIEU', items: ['en extérieur (outdoor)', 'en intérieur (indoor)'] },
    { id: 'moment', label: '🕒 Tout MOMENT', items: ['en déplacement', 'la nuit', 'le jour'] },
    { id: 'objet', label: '🔌 Tout OBJET', items: ['entre ordinateurs', 'entre personnes, sans ordinateur', 'entre objets'] },
  ]
  const [m, setM] = useState('objet')
  const cur = modes.find((x) => x.id === m)!
  return (
    <Frame title="IoE — Internet of Everything (UIT / Cisco)" hint="« Un Objet de Any thing vers l'Internet de Everything »">
      <Tabs options={modes.map((x) => ({ id: x.id, label: x.label }))} active={m} onPick={setM} />
      <div className="space-y-1.5">
        {cur.items.map((it, i) => <Box key={i} className="border-emerald-600 bg-emerald-500/10 text-emerald-100">{it}</Box>)}
      </div>
      <p className="mt-3 text-center text-[11px] text-zinc-500">La communication est possible en tout LIEU et à tout MOMENT, mais aussi avec n&apos;importe quel OBJET (IoE)</p>
    </Frame>
  )
}

// 4 ─── Mapping : monde physique ↔ monde de l'information
export function MappingWorlds() {
  return (
    <Frame title="Mapping — Y.2060(12)_F02" hint="Identifier un objet physique dans le monde du système d'informations (objet virtuel)">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2 rounded-xl border border-zinc-700 bg-zinc-900/60 p-3">
          <p className="text-center text-xs font-black uppercase tracking-widest text-emerald-400">Monde physique</p>
          <Box>■ Dispositif (capteur / objet)</Box>
          <Box>□ Passerelle (gateway)</Box>
          <Box>● Objet physique</Box>
        </div>
        <div className="space-y-2 rounded-xl border border-zinc-700 bg-zinc-900/60 p-3">
          <p className="text-center text-xs font-black uppercase tracking-widest text-sky-400">Monde de l&apos;information</p>
          <Box className="border-sky-700 bg-sky-500/10 text-sky-100">◎ Objet virtuel</Box>
          <Box className="border-sky-700 bg-sky-500/10 text-sky-100">Site web · Blogues · Réseaux sociaux · Cloud</Box>
        </div>
      </div>
      <div className="mt-3 grid gap-1.5 text-center text-[11px] text-zinc-400 sm:grid-cols-3">
        <Box className="text-[11px]">a — Communication via une passerelle</Box>
        <Box className="text-[11px]">b — Communication sans passerelle</Box>
        <Box className="text-[11px]">c — Communication directe</Box>
      </div>
    </Frame>
  )
}

// 5 ─── Écosystème TIC : M2M / M2P / P2P
export function TicEcosystem() {
  const [sel, setSel] = useState<string | null>('iot')
  const blocks = [
    { id: 'm2m', label: 'M2M (D2D)', def: 'Machines ↔ Machines, sans intervention humaine.' },
    { id: 'm2p', label: 'M2P', def: 'Machine ↔ People : connexion machine ↔ personne.' },
    { id: 'p2p', label: 'P2P', def: 'Pair à pair : chaque entité est à la fois client et serveur.' },
  ]
  return (
    <Frame title="Écosystème TIC de l'IoT" hint="IoT = M2M + M2P (application, connectivité backend…)">
      <div className="grid gap-2 sm:grid-cols-3">
        {blocks.map((b) => (
          <button key={b.id} onClick={() => setSel(b.id)} className={cn('rounded-xl border p-3 text-center text-xs font-bold transition', sel === b.id ? 'border-emerald-500 bg-emerald-500/15 text-emerald-200' : 'border-zinc-700 bg-zinc-900 text-zinc-300')}>
            {b.label}
            <span className="mt-1 block text-[11px] font-normal text-zinc-500">{b.def}</span>
          </button>
        ))}
      </div>
      <Box className={cn('mt-3', sel === 'iot' ? 'border-amber-500 bg-amber-500/15 text-amber-100' : '')}>
        <button onClick={() => setSel('iot')} className="font-black text-amber-300">🌐 IoT = M2M + M2P</button>
        <p className="mt-1 font-normal text-zinc-300">Comprend l&apos;application, la connectivité backend, etc. — le P2P est un modèle d&apos;échange général, pas la définition de l&apos;IoT.</p>
      </Box>
    </Frame>
  )
}

// 6 ─── Les 4 sous-parties + empilement technologique
export function IotStack() {
  const steps = [
    { t: '1. Appareil électronique (device)', d: 'Capteurs et actionneurs, traitement, sauvegarde' },
    { t: '2. Internet', d: 'Transaction des données : réseau réception, passerelle (gateway), serveur' },
    { t: '3. Cloud', d: 'Là où on reçoit les données : réception, traitement, stockage' },
    { t: '4. Application', d: 'Le tableau de bord (dashboard) : affichage des données, prise de contrôle' },
  ]
  const [i, setI] = useState(0)
  const layers = ['Physical Thing — capacités & compromis', 'Communication Channels — protocoles & connectivité', 'Software — traite, stocke, analyse, visualise', 'Operations — déploiement & maintenance (DevOps)', 'Data — un sous-produit du système IoT']
  return (
    <Frame title="Connecter un objet : 4 maillons + empilement technologique" hint="Clique sur les maillons ; l'empilement ajoute de la profondeur">
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {steps.map((s, k) => (
          <button key={k} onClick={() => setI(k)} className={cn('rounded-xl border p-2.5 text-left text-[11px] font-bold transition', i === k ? 'border-emerald-500 bg-emerald-500/15 text-emerald-200' : 'border-zinc-700 bg-zinc-900 text-zinc-300')}>
            {s.t}
          </button>
        ))}
      </div>
      <Box className="mt-2 text-left text-emerald-100">{steps[i].d}</Box>
      <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-widest text-zinc-500">Empilement technologique (+ de profondeur) · Cloud+Application au sommet</p>
      <div className="mt-2 space-y-1.5">
        {layers.map((l, k) => (
          <div key={k} className={cn('rounded-lg border px-3 py-1.5 text-xs', k === 0 ? 'border-emerald-700 bg-emerald-500/10 text-emerald-100' : 'border-zinc-700 bg-zinc-900 text-zinc-300')}>
            <b className="mr-1 text-emerald-400">{k + 1}.</b>{l}
          </div>
        ))}
      </div>
    </Frame>
  )
}

// 7 ─── Composition d'un objet physique embarqué
export function IotDeviceAnatomy() {
  const parts = [
    { id: 'power', label: 'Power unit', d: 'management · battery (batterie) · harvester (récupération d\u2019énergie)' },
    { id: 'proc', label: 'Processing Unit', d: 'Accélérateurs · DSPs · MCU (microcontrôleur)' },
    { id: 'rf', label: 'RF (radio sans fil)', d: 'BLE · LTE · WiFi · ZigBee · RFID' },
    { id: 'onchip', label: 'On-chip sensors', d: 'motion · gyro · GPS …' },
    { id: 'afe', label: 'AFE (Analogue Front End)', d: 'ADC / DAC : interface analogique ↔ numérique' },
    { id: 'mem', label: 'Nonvolatile memory + Off-chip sensors & actuators', d: 'Mémoire non volatile et capteurs/actionneurs hors puce' },
  ]
  const [p, setP] = useState('proc')
  const cur = parts.find((x) => x.id === p)!
  return (
    <Frame title="IoT Device — composition d'un objet embarqué" hint="Clique sur un bloc du schéma du cours">
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {parts.map((x) => (
          <button key={x.id} onClick={() => setP(x.id)} className={cn('rounded-xl border p-2.5 text-[11px] font-bold transition', p === x.id ? 'border-emerald-500 bg-emerald-500/15 text-emerald-200' : 'border-zinc-700 bg-zinc-900 text-zinc-300')}>
            {x.label}
          </button>
        ))}
      </div>
      <Box className="mt-2 border-emerald-700 bg-emerald-500/10 text-left text-emerald-100">{cur.d}</Box>
      <p className="mt-2 text-center text-[11px] text-zinc-500">Un objet IoT embarqué = (i) processeur intégré + (ii) capteurs/acquisition + (iii) radio sans fil (ex : Bluetooth)</p>
    </Frame>
  )
}

// 8 ─── Architecture 5 couches (interactive)
export function FiveLayers() {
  const layers = [
    { n: 5, name: 'Business (Analyse)', role: 'Analyse avancée et prise de décision — gère applications, modèles commerciaux/profit, confidentialité.', det: 'Outils : Big Data (Hadoop, Spark) · IA/ML (maintenance prédictive). KPIs : réduction des coûts, amélioration de l\u2019efficacité.', color: 'border-fuchsia-600 bg-fuchsia-500/10 text-fuchsia-100' },
    { n: 4, name: 'Application (Services)', role: 'Fournir des services métiers aux utilisateurs.', det: 'Dashboard de surveillance (Grafana, ThingsBoard) · alertes temps réel (SMS incendie) · automatisation (irrigation intelligente).', color: 'border-rose-600 bg-rose-500/10 text-rose-100' },
    { n: 3, name: 'Middleware (Traitement)', role: 'Stockage, traitement et préparation des données — services aux couches inférieures.', det: 'Edge Computing (NVIDIA Jetson) · Cloud (AWS IoT, Azure IoT Hub) · BDD (MongoDB, InfluxDB). Fonctions : filtrage, agrégation, chiffrement.', color: 'border-amber-600 bg-amber-500/10 text-amber-100' },
    { n: 2, name: 'Réseau (Transport)', role: 'Transmettre les données vers le cloud ou l\u2019edge.', det: 'Courtes distances : BLE, Zigbee, LoRa. Longues distances : LoRaWAN, NB-IoT, 5G. Passerelles : agrégation (ex : Raspberry Pi gateway).', color: 'border-sky-600 bg-sky-500/10 text-sky-100' },
    { n: 1, name: 'Perception (Physical Layer)', role: 'Collecter des données physiques (température, mouvement…).', det: 'Capteurs (DHT22, CO₂) · actionneurs (moteurs, LED) · RFID/NFC. Exemple : capteur de température envoyant via Bluetooth.', color: 'border-emerald-600 bg-emerald-500/10 text-emerald-100' },
  ]
  const [sel, setSel] = useState(1)
  const cur = layers.find((l) => l.n === sel)!
  return (
    <Frame title="Architecture IoT à 5 couches" hint="Clique sur une couche pour son rôle, ses composants et ses outils">
      <div className="space-y-1.5">
        {layers.map((l) => (
          <button key={l.n} onClick={() => setSel(l.n)} className={cn('w-full rounded-xl border px-4 py-2.5 text-left transition', sel === l.n ? cn(l.color, 'font-black') : 'border-zinc-700 bg-zinc-900 text-zinc-300')}>
            <span className="mr-2 text-[11px] text-zinc-500">Couche {l.n}</span>{l.name}
          </button>
        ))}
      </div>
      <Box className="mt-3 text-left"><b className="text-emerald-300">Rôle :</b> {cur.role}</Box>
      <Box className="mt-1.5 text-left text-zinc-300">{cur.det}</Box>
    </Frame>
  )
}

// 9 ─── Pyramide analytique + funnel santé
export function AnalyticsPyramid() {
  const lv = [
    { id: 'p', label: 'Prescriptif', q: '« Comment réagir à ces événements futurs potentiels ? »' },
    { id: 'd2', label: 'Prédictif', q: '« Que va-t-il se produire ? »' },
    { id: 'd1', label: 'Diagnostique', q: '« Pourquoi est-ce arrivé ? »' },
    { id: 'd0', label: 'Descriptif', q: '« Où est-on arrivé ? »' },
  ]
  const funnel = ['Surveillance améliorée des patients', 'Santé prédictive', 'Gestion des médicaments intelligents', 'Télémédecine et consultations à distance', 'Opérations hospitalières et gestion des actifs', 'Essais cliniques et recherche médicale', 'Sécurité des données sur les soins de santé']
  return (
    <Frame title="De l'INFORMATION à l'OPTIMISATION" hint="Escalade de l'analytique + IoT et technologie médicale (funnel du cours)">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          {lv.map((x, i) => (
            <div key={x.id} className={cn('mx-auto rounded-lg border px-3 py-2 text-center text-xs', i === 0 ? 'w-full border-fuchsia-600 bg-fuchsia-500/10 text-fuchsia-100' : i === 1 ? 'w-5/6 border-rose-600 bg-rose-500/10 text-rose-100' : i === 2 ? 'w-4/6 border-amber-600 bg-amber-500/10 text-amber-100' : 'w-3/6 border-emerald-600 bg-emerald-500/10 text-emerald-100')}>
              <b>{x.label}</b><span className="block text-[10px] text-zinc-400">{x.q}</span>
            </div>
          ))}
          <p className="text-center text-[10px] uppercase tracking-widest text-zinc-500">Valeur ↑ · Information → Optimisation</p>
        </div>
        <div className="space-y-1">
          <p className="mb-1 text-center text-[11px] font-black uppercase tracking-widest text-sky-400">IoT et technologie médicale</p>
          {funnel.map((f, i) => (
            <div key={i} className="rounded bg-zinc-900 px-2 py-1 text-[11px] text-zinc-300"><b className="mr-1 text-sky-400">{i + 1}.</b>{f}</div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

// 10 ─── Architecture de référence CISCO (7 niveaux)
export function CiscoRef() {
  const lv = [
    { n: 7, t: 'Collaboration and Processes', d: 'Involving People and Business Processes — CENTER' },
    { n: 6, t: 'Application', d: 'Reporting, Analytics, Control' },
    { n: 5, t: 'Data Abstraction', d: 'Aggregation and Access' },
    { n: 4, t: 'Data Accumulation', d: 'Storage' },
    { n: 3, t: 'Edge Computing', d: 'Data Element Analysis and Transformation' },
    { n: 2, t: 'Connectivity', d: 'Communication and Processing Units' },
    { n: 1, t: 'Physical Devices and Controllers', d: '« The Things » in IoT — EDGE : capteurs, devices, machines, nœuds intelligents' },
  ]
  return (
    <Frame title="Architecture de référence (schéma global — IoT World Forum / CISCO)" hint="Du EDGE (les Things) au CENTER (collaboration & processus métiers)">
      <div className="space-y-1">
        {lv.map((l) => (
          <div key={l.n} className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300">
            <b className="mr-1.5 text-emerald-400">{l.n}.</b>{l.t} <span className="text-zinc-500">— {l.d}</span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

// 11 ─── Chaîne d'une plateforme IoT
export function PlatformChain() {
  const chain = ['Monde physique', 'Interaction (Capteur · Actionneur · Traitement local · Énergie)', 'Protocole / Communication', 'Transmission', 'Réseau informatique']
  return (
    <Frame title="Caractéristiques générales d'une plateforme pour l'IoT" hint="La chaîne complète du schéma du cours">
      <div className="space-y-1.5">
        {chain.map((c, i) => (
          <div key={i}>
            <Box className={cn(i === 1 && 'border-emerald-600 bg-emerald-500/10 text-emerald-100')}>{c}</Box>
            {i < chain.length - 1 && <div className="py-0.5 text-center text-emerald-400">↕</div>}
          </div>
        ))}
      </div>
    </Frame>
  )
}

// 12 ─── Deux approches matérielles
export function TwoApproaches() {
  const [s, setS] = useState('os')
  return (
    <Frame title="Deux approches matérielles majeures" hint="Systèmes à OS embarqué vs systèmes dédiés compacts">
      <Tabs options={[{ id: 'os', label: '🖥️ OS embarqué' }, { id: 'ded', label: '⚙️ Dédiés compacts' }]} active={s} onPick={setS} />
      {s === 'os' ? (
        <div className="space-y-2">
          <Box className="border-sky-700 bg-sky-500/10 text-left text-sky-100">RASPBERRY PI · BEAGLEBONE et plateformes similaires</Box>
          <Box className="border-emerald-700 bg-emerald-500/10 text-left text-emerald-100">✓ Ouverts · puissants · langages de programmation multiples</Box>
          <Box className="border-rose-700 bg-rose-500/10 text-left text-rose-100">✗ Complexes à mettre en œuvre · prise en main longue · réactivité moyenne · coût relativement élevé · interfaçage plus difficile</Box>
        </div>
      ) : (
        <div className="space-y-2">
          <Box className="border-amber-700 bg-amber-500/10 text-left text-amber-100">ARDUINO · GENUINO · INTEL GALILEO · ESP8266 etc.</Box>
          <Box className="border-emerald-700 bg-emerald-500/10 text-left text-emerald-100">✓ Très réactifs · faible coût · robustes (pas de couches logicielles) · interfaçage aisé · prise en main très rapide</Box>
          <Box className="border-rose-700 bg-rose-500/10 text-left text-rose-100">✗ Moins puissants · langages plus limités · moins flexibles sur le plan logiciel</Box>
        </div>
      )}
    </Frame>
  )
}

// 13 ─── Protocoles applicatifs
export function AppProtocols() {
  const ps = [
    { id: 'mqtt', label: 'MQTT', fonc: 'Publish/subscribe avec un broker central ; TCP/IP fiable.', cas: 'Surveillance médicale, industrielle, domotique, connexions intermittentes.', av: "Léger, idéal faible bande passante, appareils embarqués.", inc: 'Dépendance au broker (point unique de défaillance).' },
    { id: 'coap', label: 'CoAP', fonc: 'Inspiré de HTTP, optimisé appareils contraints ; UDP.', cas: 'Capteurs à ressources limitées (smart lighting, agriculture).', av: 'Léger, compatible RESTful, supporte le multicast.', inc: 'Moins fiable que MQTT (pas de garantie de livraison).' },
    { id: 'http', label: 'HTTP/HTTPS', fonc: 'Standard web client-serveur ; TCP/IP ou TLS (HTTPS).', cas: 'IoT grand public (apps mobiles connectées aux objets).', av: 'Universel, facile à intégrer aux infrastructures existantes.', inc: 'Lourd en consommation de ressources.' },
  ]
  const [p, setP] = useState('mqtt')
  const cur = ps.find((x) => x.id === p)!
  return (
    <Frame title="Protocoles de couche application" hint="Fonctionnement · cas d'usage · avantages · inconvénients">
      <Tabs options={ps.map((x) => ({ id: x.id, label: x.label }))} active={p} onPick={setP} />
      <div className="space-y-1.5">
        <Box className="border-sky-700 bg-sky-500/10 text-left text-sky-100"><b>Fonctionnement :</b> {cur.fonc}</Box>
        <Box className="border-zinc-700 text-left"><b>Cas d&apos;usage :</b> {cur.cas}</Box>
        <Box className="border-emerald-700 bg-emerald-500/10 text-left text-emerald-100"><b>✓ Avantages :</b> {cur.av}</Box>
        <Box className="border-rose-700 bg-rose-500/10 text-left text-rose-100"><b>✗ Inconvénients :</b> {cur.inc}</Box>
      </div>
      <p className="mt-2 text-center text-[11px] text-zinc-500">La liste complète du cours inclut aussi AMQP en couche application.</p>
    </Frame>
  )
}

// 14 ─── MQTT pub/sub + QoS
export function MqttFlow() {
  const [qos, setQos] = useState(0)
  const qosTxt = ['Néant : le message est publié sans garantie de sa bonne réception.', 'Niveau intermédiaire : accusé de réception.', 'Service garanti : publication en deux parties, message correctement délivré de façon unique.']
  return (
    <Frame title="MQTT — Publisher → Broker → Subscriber (+ QoS)" hint="Le broker gère les échanges ; la QoS se règle par niveau">
      <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <Box className="border-emerald-600 bg-emerald-500/10 text-emerald-100">📤 Publisher<br /><span className="text-[10px] text-zinc-400">envoie des messages</span></Box>
        <div className="text-center text-emerald-400">→</div>
        <Box className="border-amber-600 bg-amber-500/15 text-amber-100">🗄️ Broker MQTT<br /><span className="text-[10px] text-zinc-400">gère les échanges (topics)</span></Box>
        <div className="text-center text-emerald-400">→</div>
        <Box className="border-sky-600 bg-sky-500/10 text-sky-100">📥 Subscriber<br /><span className="text-[10px] text-zinc-400">lit les messages</span></Box>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[0, 1, 2].map((q) => (
          <button key={q} onClick={() => setQos(q)} className={cn('rounded-full px-3 py-1.5 text-xs font-bold', qos === q ? 'bg-emerald-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400')}>QoS {q}</button>
        ))}
      </div>
      <Box className="mt-2 text-left text-zinc-300">{qosTxt[qos]}</Box>
      <p className="mt-1.5 text-center text-[11px] text-zinc-500">Plus on monte en niveau de QoS, plus on charge les trames.</p>
    </Frame>
  )
}

// 15 ─── Protocoles réseau (LoRaWAN / Zigbee / BLE)
export function NetProtocols() {
  const ps = [
    { id: 'lo', label: 'LoRaWAN', portee: '15 km', deb: '0.3-50 kbps', conso: 'Très faible', bar: 'w-11/12', cas: 'Smart cities, suivi de flottes, agriculture', det: 'Ondes radio sub-GHz, architecture en étoile avec passerelles ; idéal pour les déploiements massifs.' },
    { id: 'zb', label: 'Zigbee', portee: '10-100 m', deb: '250 kbps', conso: 'Faible', bar: 'w-1/6', cas: 'Domotique, automatisation industrielle', det: 'IEEE 802.15.4, réseau maillé auto-organisé ; faible latence, redondance via le mesh.' },
    { id: 'ble', label: 'BLE', portee: '10-100 m', deb: '1-2 Mbps', conso: 'Très faible', bar: 'w-1/6', cas: 'Wearables, santé connectée, beacons', det: 'Consommation ultra-faible ; peer-to-peer ou étoile ; compatible smartphones.' },
  ]
  const [p, setP] = useState('lo')
  const cur = ps.find((x) => x.id === p)!
  return (
    <Frame title="Protocoles de couche réseau — portée en visuel" hint="Clique sur un protocole">
      <Tabs options={ps.map((x) => ({ id: x.id, label: x.label }))} active={p} onPick={setP} />
      <Box className="text-left text-zinc-300">{cur.det}</Box>
      <div className="mt-3 space-y-2">
        <div>
          <p className="text-[11px] text-zinc-500">Portée : <b className="text-emerald-400">{cur.portee}</b></p>
          <div className="h-3 rounded-full bg-zinc-800"><div className={cn('h-3 rounded-full bg-emerald-500', cur.bar)} /></div>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <Box>Débit : {cur.deb}</Box>
          <Box>Consommation : {cur.conso}</Box>
        </div>
        <Box className="border-sky-700 bg-sky-500/10 text-sky-100">Cas d&apos;usage : {cur.cas}</Box>
      </div>
    </Frame>
  )
}

// 16 ─── Topologies IoMT
export function Topologies() {
  const tops = [
    { id: 'star', label: '⭐ Étoile', desc: 'Tous les dispositifs → un nœud central (passerelle, serveur hospitalier).', av: 'Simplicité de gestion · faible latence (transmission directe).', inc: 'Dépendance à la passerelle centrale (panne critique).', pro: 'BLE (wearables) · Wi-Fi (équipements fixes).', cas: 'Surveillance centralisée d\u2019une chambre · glucomètre → smartphone.' },
    { id: 'mesh', label: '🕸️ Maillage', desc: 'Les dispositifs communiquent entre eux pour assurer la redondance.', av: 'Tolérance aux pannes (pas de point unique) · couverture étendue.', inc: 'Consommation énergétique élevée (problématique pour les implants).', pro: 'Zigbee ou Thread (réseaux corporels) · WirelessHART (industrie médicale).', cas: 'Bloc opératoire intelligent · réseaux de capteurs corporels (BAN).' },
    { id: 'hyb', label: '🔀 Hybride', desc: 'Sous-réseaux en étoile (salles) + dorsale maillée.', av: 'Équilibre entre simplicité et redondance.', inc: 'Complexité de configuration et de gestion · maintenance difficile · coût élevé · consommation accrue · latence variable.', pro: 'LoRaWAN (dorsale longue portée) · MQTT (vers le cloud).', cas: 'Hôpital intelligent · télémédecine rurale (étoile village → relais maillés).' },
    { id: 'bus', label: '🚌 Bus', desc: 'Dispositifs connectés sur un bus de communication partagé (Modbus/CAN).', av: 'Câblage simplifié.', inc: 'Risque de collision de données (inadapté aux applications critiques).', pro: 'Modbus / CAN.', cas: 'Analyseurs de sang en laboratoire · ambulances intelligentes (réseau CAN).' },
  ]
  const [t, setT] = useState('star')
  const cur = tops.find((x) => x.id === t)!
  return (
    <Frame title="Topologies de réseaux IoMT" hint="Clique sur une topologie">
      <Tabs options={tops.map((x) => ({ id: x.id, label: x.label }))} active={t} onPick={setT} />
      <Box className="text-left text-zinc-200">{cur.desc}</Box>
      <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
        <Box className="border-emerald-700 bg-emerald-500/10 text-left text-emerald-100">✓ {cur.av}</Box>
        <Box className="border-rose-700 bg-rose-500/10 text-left text-rose-100">✗ {cur.inc}</Box>
      </div>
      <div className="mt-1.5 grid gap-1.5 sm:grid-cols-2">
        <Box className="text-left text-[11px]">🔌 Protocoles : {cur.pro}</Box>
        <Box className="text-left text-[11px]">🏥 Cas : {cur.cas}</Box>
      </div>
    </Frame>
  )
}

// 17 ─── Trame UART
export function UartFrame() {
  return (
    <Frame title="Trame UART (asynchrone, sans horloge)" hint="start · données 5-9 bits · parité optionnelle · stop">
      <div className="flex flex-wrap items-stretch justify-center gap-1 text-center font-mono text-[11px]">
        <div className="w-14 rounded bg-rose-500/20 p-2 text-rose-200">START<br />(0)</div>
        <div className="w-40 rounded bg-emerald-500/20 p-2 text-emerald-200">DONNÉES<br />(5 à 9 bits)</div>
        <div className="w-16 rounded bg-amber-500/20 p-2 text-amber-200">PARITÉ<br />(optionnel)</div>
        <div className="w-14 rounded bg-sky-500/20 p-2 text-sky-200">STOP<br />(1)</div>
      </div>
      <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
        <Box className="text-left text-[11px]">⏱️ Baud rate : vitesse de transmission (ex : 9600, 115200 bauds)</Box>
        <Box className="text-left text-[11px]">🔌 RS-232 : ±3 à ±15 V · RS-485 : différentielle jusqu&apos;à 1200 m</Box>
      </div>
      <Box className="mt-1.5 text-left text-[11px]">✓ Simple, universel · ✗ Pas de détection d&apos;erreur (sans parité), distance limitée — microcontrôleurs, GPS, Bluetooth</Box>
    </Frame>
  )
}

// 18 ─── Câblage SPI vs I2C
export function SpiI2cWiring() {
  const [m, setM] = useState('spi')
  return (
    <Frame title="SPI vs I2C — fils et topologie" hint="Clique sur un protocole">
      <Tabs options={[{ id: 'spi', label: 'SPI (4+ fils)' }, { id: 'i2c', label: 'I2C (2 fils)' }]} active={m} onPick={setM} />
      {m === 'spi' ? (
        <div className="space-y-1.5">
          <Box className="border-amber-600 bg-amber-500/10 text-amber-100">SCK — horloge partagée (synchrone)</Box>
          <Box className="border-emerald-600 bg-emerald-500/10 text-emerald-100">MOSI — Master Out Slave In</Box>
          <Box className="border-sky-600 bg-sky-500/10 text-sky-100">MISO — Master In Slave Out</Box>
          <Box className="border-rose-600 bg-rose-500/10 text-rose-100">SS — Slave Select (maître/esclave, full-duplex)</Box>
          <p className="text-center text-[11px] text-zinc-500">Jusqu&apos;à 100 Mbps · 4 fils minimum · pas de gestion native des erreurs · mémoires (EEPROM, Flash), écrans LCD, capteurs haute vitesse</p>
        </div>
      ) : (
        <div className="space-y-1.5">
          <Box className="border-amber-600 bg-amber-500/10 text-amber-100">SCL — horloge partagée</Box>
          <Box className="border-emerald-600 bg-emerald-500/10 text-emerald-100">SDA — données bidirectionnelles</Box>
          <Box className="border-sky-600 bg-sky-500/10 text-sky-100">Adressage 7 ou 10 bits : Start → adresse esclave → données → Stop</Box>
          <p className="text-center text-[11px] text-zinc-500">2 fils, multi-esclaves · 400 kHz standard, 5 MHz Ultra Fast Mode · résistances : améliorent l&apos;impédance et la longueur de ligne · capteurs, RTC</p>
        </div>
      )}
    </Frame>
  )
}

// 19 ─── Comparatif des 5 protocoles série
export function SerialCompare() {
  const rows = [
    { id: 'uart', p: 'UART', v: '9600 – 4 Mbps', f: '2 (TX/RX)', t: 'Point-à-point', a: 'Modules sans fil' },
    { id: 'spi', p: 'SPI', v: '1 – 100 Mbps', f: '4+', t: 'Maître/esclave', a: 'Mémoires, écrans' },
    { id: 'i2c', p: 'I2C', v: '1 – 10 Mbps', f: '2', t: 'Bus', a: 'Capteurs, RTC' },
    { id: 'ow', p: '1-Wire', v: '15 kbps', f: '1', t: 'Bus', a: 'Capteurs Dallas' },
    { id: 'can', p: 'CAN', v: '1 Mbps', f: '2', t: 'Bus', a: 'Automobile, industrie' },
  ]
  const [sel, setSel] = useState<string | null>(null)
  return (
    <Frame title="Tableau comparatif des protocoles série" hint="Clique sur une ligne pour la mettre en évidence">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-xs">
          <thead><tr className="bg-zinc-900 text-emerald-400">
            <th className="px-3 py-2">Protocole</th><th className="px-3 py-2">Vitesse</th><th className="px-3 py-2">Fils</th><th className="px-3 py-2">Topologie</th><th className="px-3 py-2">Applications</th>
          </tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} onClick={() => setSel(r.id === sel ? null : r.id)} className={cn('cursor-pointer border-b border-zinc-900', sel === r.id ? 'bg-emerald-500/15 text-emerald-100' : 'text-zinc-300 hover:bg-zinc-900/60')}>
                <td className="px-3 py-2 font-bold">{r.p}</td><td className="px-3 py-2">{r.v}</td><td className="px-3 py-2">{r.f}</td><td className="px-3 py-2">{r.t}</td><td className="px-3 py-2">{r.a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-center text-[11px] text-zinc-500">Le choix du protocole dépend du débit, du nombre de périphériques et de l&apos;environnement.</p>
    </Frame>
  )
}

// 20 ─── Servo PWM interactif
export function ServoPwm() {
  const pulses = [
    { ms: '1 ms', deg: 0, d: 'impulsion de 1 milliseconde' },
    { ms: '1,5 ms', deg: 90, d: 'impulsion intermédiaire' },
    { ms: '2 ms', deg: 180, d: 'impulsion de 2 millisecondes' },
  ]
  const [i, setI] = useState(1)
  const cur = pulses[i]
  return (
    <Frame title="Servomoteur — consigne PWM (toutes les 20 ms, 50 Hz)" hint="Clique sur la durée d'impulsion">
      <Tabs options={pulses.map((p, k) => ({ id: String(k), label: p.ms }))} active={String(i)} onPick={(v) => setI(Number(v))} />
      <div className="mx-auto max-w-sm">
        <div className="relative h-4 rounded-full bg-zinc-800">
          <div className="absolute left-1/2 top-1/2 h-6 w-1 -translate-x-1/2 -translate-y-1/2 rounded bg-zinc-500" style={{ transform: `translate(-50%, -50%) rotate(${cur.deg - 90}deg)`, transformOrigin: 'center' }} />
          <div className="absolute -bottom-1 h-6 w-1.5 rounded bg-emerald-500 transition-all" style={{ left: `calc(${(cur.deg / 180) * 100}% - 3px)` }} />
        </div>
        <p className="mt-6 text-center text-lg font-black text-emerald-400">{cur.deg}°</p>
        <p className="text-center text-[11px] text-zinc-500">{cur.d} — le circuit électronique ajuste le moteur (potentiomètre intégré) pour rester à la consigne.</p>
      </div>
      <p className="mt-2 text-center text-[11px] text-rose-300">⚠️ Câbler les servomoteurs à une alimentation 5 V dédiée (consommation électrique)</p>
    </Frame>
  )
}

// 21 ─── Contrôle d'accès RFID
export function RfidAccess() {
  const [card, setCard] = useState<string | null>(null)
  const cards = [
    { id: 'ok', label: 'Badge autorisé', uid: 'D8 4B 12 22', res: 'ok' },
    { id: 'ko', label: 'Badge refusé', uid: '87 4B DC 8A', res: 'ko' },
  ]
  return (
    <Frame title="Contrôle d'accès RFID (RC522 + microservo 9G + 2 LEDs)" hint="Présente un badge pour voir la réaction du système">
      <div className="flex flex-wrap justify-center gap-2">
        {cards.map((c) => (
          <button key={c.id} onClick={() => setCard(c.id)} className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-xs font-bold text-zinc-200 transition hover:border-emerald-600">
            💳 {c.label}<span className="mt-1 block font-mono text-[10px] text-zinc-500">UID : {c.uid}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        <Box className="text-left text-[11px]">1. mfrc522.PICC_IsNewCardPresent() → 2. PICC_ReadCardSerial() → 3. UID en HEX → toUpperCase()</Box>
        {card === 'ok' && <Box className="border-emerald-500 bg-emerald-500/15 text-emerald-100">✅ Carte 1 — Accès débloqué ! Servo → -90°, LED verte (broche 5) HIGH 3 s, puis retour à 90°</Box>}
        {card === 'ko' && <Box className="border-rose-500 bg-rose-500/15 text-rose-100">⛔ Carte 2 — Accès refusé !! LED rouge (broche 6) clignote 4 fois (200 ms)</Box>}
      </div>
    </Frame>
  )
}

// 22 ─── Choix des capteurs
export function SensorPicker() {
  const sensors = [
    { id: 'dht11', n: 'DHT11', prix: '15 DT', ten: '3.3 à 6 V', prec: '± 5 %', pro: 'OneWire' },
    { id: 'dht22', n: 'DHT22', prix: '28 DT', ten: '3.3 à 6 V', prec: '± 2 %', pro: 'OneWire' },
    { id: 'hih', n: 'HIH-4030', prix: '45 DT', ten: '4 à 5.8 V', prec: '± 3.5 %', pro: 'Analogique' },
    { id: 'si', n: 'Si7021', prix: '24 DT', ten: '1.9 à 3.6 V', prec: '± 3 %', pro: 'i2C' },
  ]
  const motors = [
    { id: 'dg', n: 'DG01D:48:1 motoréducteur', prix: '15 DT', ten: '4.5 V / 250 mA', vit: '140 RPM', m: '30 g', pro: 'Digital control / normal' },
    { id: 'sm', n: 'SM-428YG011-25 pas à pas', prix: '30 DT', ten: '12 V / 330 mA', vit: '9 RPM', m: '20 g', pro: 'Digital control / normal' },
    { id: 'pa', n: 'Parallax continuous Servo', prix: '60 DT', ten: '4-6 V / 140 mA', vit: '50 RPM', m: '42.5 g', pro: 'Digital control / PWM' },
  ]
  const [tab, setTab] = useState<'s' | 'm'>('s')
  const [sel, setSel] = useState<string>('dht11')
  const list = tab === 's' ? sensors : motors
  const cur = list.find((x) => x.id === sel)
  return (
    <Frame title="Choisir son capteur / actionneur" hint="Le choix est guidé par le cahier des charges (tension, précision, protocole, prix…)">
      <Tabs options={[{ id: 's', label: "Capteurs d'humidité" }, { id: 'm', label: 'Moteurs (robot 4 roues)' }]} active={tab} onPick={(v) => { setTab(v as 's' | 'm'); setSel(v === 's' ? 'dht11' : 'dg') }} />
      <div className="flex flex-wrap gap-1.5">
        {list.map((x) => (
          <button key={x.id} onClick={() => setSel(x.id)} className={cn('rounded-lg border px-2.5 py-1.5 text-[11px] font-bold', sel === x.id ? 'border-emerald-500 bg-emerald-500/15 text-emerald-200' : 'border-zinc-700 bg-zinc-900 text-zinc-300')}>{x.n}</button>
        ))}
      </div>
      {cur && (
        <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          <Box>Prix : {cur.prix}</Box>
          <Box>Tension/courant : {cur.ten}</Box>
          {tab === 's' ? <Box>Précision : {(cur as typeof sensors[number]).prec}</Box> : <><Box>Vitesse : {(cur as typeof motors[number]).vit}</Box><Box>Masse : {(cur as typeof motors[number]).m}</Box></>}
          <Box>Protocole : {cur.pro}</Box>
        </div>
      )}
      {tab === 's' && sel === 'dht22' && <Box className="mt-1.5 border-emerald-600 bg-emerald-500/10 text-emerald-100">Le plus précis (±2 %) — à choisir pour la production de masse et en santé (la précision prime devant le prix)</Box>}
      {tab === 's' && sel === 'dht11' && <Box className="mt-1.5 border-amber-600 bg-amber-500/10 text-amber-100">Le moins cher (15 DT) — si on préfère le bas prix</Box>}
      {tab === 'm' && sel === 'dg' && <Box className="mt-1.5 border-emerald-600 bg-emerald-500/10 text-emerald-100">Le mieux adapté au robot : vitesse élevée (140 RPM), bas prix, 5 V, faible masse</Box>}
    </Frame>
  )
}

// 23 ─── Écosystème logiciel
export function SoftwareStack() {
  const cats = [
    { id: 'dev', label: 'Device (langages)', d: 'Arduino (C/C++) · micropython · java · javascript — attention : les librairies peuvent manquer.' },
    { id: 'ide', label: 'IDE', d: 'Arduino IDE · Eclipse · Codeblock · PlatformIO (Atom, VSCode, VSCodium) · simulation : Wokwi.' },
    { id: 'gw', label: 'Passerelle (OS)', d: 'Raspbian · Ubuntu Core · Ubuntu Server · Windows IoT Core · RaspBSD · Domoticz · Arch Linux ARM.' },
    { id: 'cloud', label: 'Cloud', d: 'Node-red · blynk · Mozilla webthings · iobroker — ou services : AWS, Azure, IBM Cloud, Thingspeak. Raspberry en serveur : HTML, CSS, JS, Python/Django, MySQL, MongoDB, PHP, Apache.' },
    { id: 'app', label: 'Application', d: 'Web : HTML, CSS, JS, PHP, Apache. Mobile : Java, Flutter, Swift, AppInventor (débutants). Prêtes à l\u2019emploi : Thingspeak, MQTT Dash.' },
  ]
  const [c, setC] = useState('cloud')
  const cur = cats.find((x) => x.id === c)!
  return (
    <Frame title="Écosystème logiciel de l'IoT (4 parties)" hint="Clique sur une brique — technologies faciles à maintenir, selon le cahier des charges">
      <div className="flex flex-wrap gap-1.5">
        {cats.map((x) => (
          <button key={x.id} onClick={() => setC(x.id)} className={cn('rounded-full px-3 py-1.5 text-xs font-bold', c === x.id ? 'bg-emerald-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400')}>{x.label}</button>
        ))}
      </div>
      <Box className="mt-2 text-left text-zinc-300">{cur.d}</Box>
    </Frame>
  )
}

// 24 ─── Projet micro-jardinage
export function GardenProject() {
  const chain = [
    { t: 'Capteurs', d: 'DHT11 (air, OneWire, 5 V) · Capacitive Soil Moisture (sol, analogique) · Photorésistance (luminosité, analogique)' },
    { t: 'Actionneur', d: 'Pompe (arrosage, 5 V) pilotée par un Relais (digital, 5 V) — 4 ports nécessaires' },
    { t: 'Microcontrôleur', d: 'ESP32 : 2 ports analogiques (le NodeMcu n\u2019en avait qu\u2019un), WiFi intégré (pas de shield), 3.3-5 V' },
    { t: 'Passerelle', d: 'Raspberry Pi Zero W : bonnes performances, Linux, peu d\u2019énergie, pas cher — double rôle gateway + serveur local' },
    { t: 'Cloud (serveur)', d: 'Node-red · Mosquitto (MQTT) · MongoDB' },
    { t: 'Application', d: 'Node-red dashboard (graphes/jauges navigateur) · MQTT Dash (mobile : décisions comme déclencher l\u2019arrosage)' },
  ]
  return (
    <Frame title="Projet tutoré — table de micro-jardinage automatisée" hint="Du cahier des charges au système complet (3.3-5 V, panneau solaire, terrasse, WI-FI)">
      <div className="space-y-1.5">
        {chain.map((c, i) => (
          <div key={i} className="flex items-stretch gap-2">
            <div className="w-28 shrink-0 rounded-lg border border-emerald-700 bg-emerald-500/10 p-2 text-[11px] font-black text-emerald-300">{c.t}</div>
            <div className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-[11px] leading-relaxed text-zinc-300">{c.d}</div>
          </div>
        ))}
      </div>
    </Frame>
  )
}

// 25 ─── Broches Arduino Uno
export function ArduinoPins() {
  const groups = [
    { id: 'dig', label: 'E/S numériques (0-13)', d: 'Digital PWM~ · LED de test sur broche 13 · UART TX/RX (0, 1)' },
    { id: 'spi', label: 'Bus SPI', d: 'MOSI 11 · MISO 12 · SCK 13 · SS 10 — Serial Peripheral Interface' },
    { id: 'i2c', label: 'Bus I²C', d: 'A4 (SDA) · A5 (SCL) — Inter-Integrated Circuit' },
    { id: 'ana', label: 'Entrées analogiques', d: 'A0 à A5 — lecture 0-5 V codée 0 à 1023' },
    { id: 'pwr', label: 'Alimentation', d: '5V · 3.3V · GND · Vin (7-12 V) · prise jack · port USB' },
    { id: 'misc', label: 'Autres', d: 'Bouton RESET manuel · ICSP · LED Tx/Rx · microcontrôleur Atmega 328' },
  ]
  const [g, setG] = useState('dig')
  const cur = groups.find((x) => x.id === g)!
  return (
    <Frame title="Arduino Uno — la carte et son vocabulaire" hint="Clique sur un groupe de broches">
      <div className="flex flex-wrap gap-1.5">
        {groups.map((x) => (
          <button key={x.id} onClick={() => setG(x.id)} className={cn('rounded-full px-3 py-1.5 text-xs font-bold', g === x.id ? 'bg-emerald-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400')}>{x.label}</button>
        ))}
      </div>
      <Box className="mt-2 text-left text-zinc-300">{cur.d}</Box>
      <p className="mt-2 text-center text-[11px] text-zinc-500">GPIO : General Purpose Input/Output · PWM : modulation de largeur d&apos;impulsion · ICSP : In Circuit Serial Programming · MISO : Master In/Slave Out · SS : Slave Select</p>
    </Frame>
  )
}

// 26 ─── Simulateur LM35
export function Lm35Sim() {
  const [volt, setVolt] = useState(0.5)
  const temp = volt * (5.0 / 1023.0) * 100.0
  return (
    <Frame title="Simulateur LM35 — Temp = Volt × (5/1023) × 100" hint="Fais glisser la valeur lue par analogRead (0 à 1023)">
      <input type="range" min={0} max={1023} value={volt} onChange={(e) => setVolt(Number(e.target.value))} className="w-full accent-emerald-500" />
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <Box>Valeur analogRead : {Math.round(volt)}</Box>
        <Box className="border-emerald-600 bg-emerald-500/10 text-emerald-100">Température : {temp.toFixed(1)} °C</Box>
      </div>
      <p className="mt-2 text-center text-[11px] text-zinc-500">Sensibilité : 10 mV ↔ 1 °C · plage : -55 °C à +150 °C · patte centrale → entrée analogique (A0)</p>
    </Frame>
  )
}

// 27 ─── Modes ESP8266
export function Esp8266Modes() {
  const modes = [
    { id: 'sta', label: 'Station (STA)', d: 'Se connecte à un réseau WiFi via un AP (concentrateur) relié au réseau câblé (+ routeur). SSID = nom du réseau. Reconnexion auto au dernier AP (mémoire flash).' },
    { id: 'ap', label: 'soft-AP', d: 'Établit son propre réseau WiFi et connecte d\u2019autres stations — max 4 stations par défaut (réglable de 0 à 8).' },
    { id: 'both', label: 'STA + soft-AP', d: 'À la fois station et point d\u2019accès logiciel : permet de construire des réseaux maillés.' },
    { id: 'cli', label: 'Client', d: 'La classe Client crée des clients qui accèdent aux services des serveurs : envoyer, recevoir, traiter des données.' },
    { id: 'srv', label: 'Serveur', d: 'La classe serveur fournit des fonctionnalités à d\u2019autres programmes ou périphériques, appelés clients — connexion entre modules ESP8266 = solution pour l\u2019IoT.' },
  ]
  const [m, setM] = useState('sta')
  const cur = modes.find((x) => x.id === m)!
  return (
    <Frame title="ESP8266 — diagrammes fonctionnels" hint="Clique sur un mode de fonctionnement">
      <Tabs options={modes.map((x) => ({ id: x.id, label: x.label }))} active={m} onPick={setM} />
      <Box className="text-left text-zinc-300">{cur.d}</Box>
      <p className="mt-2 text-center text-[11px] text-rose-300">⚠️ Alimentation : 3,3 V strictement — et méfiez-vous des informations périmées ou fausses sur le web</p>
    </Frame>
  )
}

// 28 ─── Flux ThingSpeak
export function ThingspeakFlow() {
  const steps = [
    { t: 'Arduino + DHT11 (GPIO 12) + ESP8266 (Tx/Rx → GPIO 2 et 3, SoftwareSerial)', d: 'Lecture de l\u2019humidité puis de la température' },
    { t: '1. New Channel', d: 'Créer un compte ThingSpeak.com → menu Channels → New Channel' },
    { t: '2. Fields + Make public', d: 'Cocher Field 1 et 2, remplir « Humidity » et « Temperature », cocher « Rendre public »' },
    { t: '3. Clé API d\u2019écriture', d: 'Onglet API Key → copier la clé dans char * api_key' },
    { t: '4. URL de mise à jour', d: 'Data Import/Export → https://api.thingspeak.com/update?api_key=XXXXX&field1=0' },
    { t: '5. http Get + postUrl', d: 'Envoyer les données via la requête GET au serveur' },
    { t: '6. Tester au navigateur', d: 'update?api_key=XXXXX&field1=31 → la valeur 31 apparaît dans Private View' },
    { t: '7. Smartphone', d: 'Application Virtuino (Google Play) : graphiques sur mobile' },
  ]
  return (
    <Frame title="Station météo à distance — flux ThingSpeak complet" hint="Les 7 étapes du cours, dans l'ordre">
      <div className="space-y-1">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-[11px]">
            <span className="font-black text-emerald-400">{i + 1}</span>
            <span className="text-zinc-300"><b className="text-zinc-100">{s.t}</b> — {s.d}</span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

// 29 ─── Topologie smart farming
export function SmartFarming() {
  const [zone, setZone] = useState(1)
  return (
    <Frame title="Smart farming — réseau WiFi ESP8266 hybride (étoile-maillé)" hint="Champ de 5 km² · 4 zones · 9 ESP8266 par zone · boîtier central au centre">
      <div className="mx-auto max-w-lg rounded-2xl border border-amber-600/60 bg-amber-500/10 p-4 text-center">
        <Box className="mx-auto max-w-xs border-amber-500 bg-amber-500/20 text-amber-100">🏢 CENTRAL BOX — 1 ESP8266 + 1 Arduino Uno + 1 module GPRS<br /><span className="text-[10px] text-zinc-300">→ MySQL (JSON/XML) 1×/jour · CSV sur carte SD (horaire)</span></Box>
        <div className="my-2 text-xs text-amber-400">▲ maillage des middleman (AP↔ST, serveur web, PING de découverte) ▲</div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {[1, 2, 3, 4].map((z) => (
            <button key={z} onClick={() => setZone(z)} className={cn('rounded-lg border px-3 py-2 text-[11px] font-bold', zone === z ? 'border-emerald-500 bg-emerald-500/15 text-emerald-200' : 'border-zinc-700 bg-zinc-900 text-zinc-300')}>Zone {z}</button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-zinc-300">Zone {zone} (sous-réseau de 9 ESP8266) :</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1.5">
          <Box className="border-sky-600 bg-sky-500/10 text-[10px] text-sky-100">Middleman ×3<br />AP + ST + serveur web</Box>
          <Box className="border-emerald-600 bg-emerald-500/10 text-[10px] text-emerald-100">Workers ×6<br />DEEP_SLEEP → réveil 1 h → lecture capteurs (1 fil) → HTTP vers l&apos;AP le plus proche</Box>
        </div>
      </div>
      <div className="mt-2 grid gap-1.5 text-[11px] sm:grid-cols-2">
        <Box className="text-left">🔋 Workers : 4 piles Li-Ion 3,3 V en parallèle + panneaux solaires 15 V</Box>
        <Box className="text-left">💾 Si l&apos;AP est absent : jusqu&apos;à 10 lectures conservées en mémoire interne · IP statiques = connexion plus rapide</Box>
      </div>
    </Frame>
  )
}

// 30 ─── Câblage bracelet médical
export function MedicalBracelet() {
  const wires = [
    ['ESP32 D22', 'MAX30100 SCL'], ['ESP32 D21', 'MAX30100 SDA'], ['ESP32 GND', 'MAX30100 GND'], ['ESP32 3.3V', 'MAX30100 VIN'],
    ['OLED VDD', 'ESP32 3.3V'], ['OLED GND', 'ESP32 GND'], ['OLED SCL', 'ESP32 D22'], ['OLED SDA', 'ESP32 D21'],
  ]
  return (
    <Frame title="Bracelet médical connecté — ESP32 + MAX30100 + OLED SSD 1306" hint="Tout passe par le bus I2C : SCL = D22, SDA = D21">
      <div className="grid grid-cols-3 gap-1.5 text-center text-[11px]">
        <Box className="border-emerald-600 bg-emerald-500/10 font-black text-emerald-200">ESP32 DEVKIT V1<br />36 GPIOs</Box>
        <div className="flex items-center justify-center text-emerald-400">⇄ I2C ⇄</div>
        <Box className="border-sky-600 bg-sky-500/10 font-black text-sky-200">MAX30100 ( cardio + SpO₂ )<br />OLED SSD 1306</Box>
      </div>
      <div className="mt-3 grid gap-1 sm:grid-cols-2">
        {wires.map(([a, b], i) => (
          <div key={i} className="flex items-center justify-between rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 font-mono text-[11px] text-zinc-300">
            <span className="text-emerald-300">{a}</span><span className="text-zinc-600">──▶</span><span className="text-sky-300">{b}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] text-zinc-500">Source du cours : instructables — Heart Rate and Blood Oxygen Level With Arduino IDE</p>
    </Frame>
  )
}

// 31 ─── Mise en route Raspberry Pi
export function PiSetup() {
  const tools = [
    { id: 'ssh', label: 'SSH', d: 'Accéder à distance au Raspberry Pi via un réseau local.' },
    { id: 'scp', label: 'SCP', d: 'Copier via SSH des photos prises par le Pi vers un ordinateur principal.' },
    { id: 'rsync', label: 'rsync', d: 'Synchroniser les dossiers de photos entre Pi et ordinateur.' },
    { id: 'cron', label: 'cron', d: "Planifier une prise de photo à intervalle donné (chaque minute pour un timelapse)." },
    { id: 'rdp', label: 'Bureau à distance', d: 'xrdp + tightvncserver côté Pi ; Connexion Bureau à distance côté Windows (IP via ifconfig ; identifiants pi / raspberry).' },
  ]
  const [t, setT] = useState('rdp')
  const cur = tools.find((x) => x.id === t)!
  return (
    <Frame title="Raspberry Pi — installation et accès" hint="OS sur carte micro SD (Balena Etcher, FAT32) · OS with desktop ou OS Lite">
      <div className="flex flex-wrap gap-1.5">
        {tools.map((x) => (
          <button key={x.id} onClick={() => setT(x.id)} className={cn('rounded-full px-3 py-1.5 text-xs font-bold', t === x.id ? 'bg-rose-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400')}>{x.label}</button>
        ))}
      </div>
      <Box className="mt-2 text-left text-zinc-300">{cur.d}</Box>
      <p className="mt-2 text-center text-[11px] text-zinc-500">Premier démarrage : écran HDMI + clavier + souris → le bureau apparaît après quelques secondes.</p>
    </Frame>
  )
}

// 32 ─── Circuit LED GPIO Raspberry
export function PiGpioLed() {
  const [on, setOn] = useState(true)
  return (
    <Frame title="Raspberry Pi — LED sur GPIO18 (résistance 100 Ω)" hint="Clique pour allumer / éteindre (GPIO.output(18, True/False))">
      <div className="mx-auto flex max-w-xs items-center justify-center gap-2 py-2">
        <Box className={cn('w-24', on ? 'border-rose-500 bg-rose-500/20 text-rose-200' : 'border-zinc-600')}>{on ? '💡 LED allumée' : '⬤ LED éteinte'}</Box>
        <span className="text-xs text-zinc-500">— [ 100 Ω ] —</span>
        <Box className="border-zinc-600">{on ? 'GPIO18 (+5V)' : 'GPIO18 (0V)'}</Box>
      </div>
      <button onClick={() => setOn(!on)} className="mx-auto block rounded-full bg-rose-500 px-4 py-1.5 text-xs font-bold text-zinc-950">GPIO.output(18, {on ? 'False' : 'True'})</button>
      <p className="mt-2 text-center text-[11px] text-zinc-500">sudo python led.py · GPIO.setmode(GPIO.BCM) · GPIO.setup(18, GPIO.OUT) · GPIO.cleanup() à la fin</p>
    </Frame>
  )
}

// 33 ─── Simulateur HC-SR04
export function Hcsr04Sim() {
  const [time, setTime] = useState(0.01)
  const dist = Math.round(time * 340 * 100 / 2 * 10) / 10
  return (
    <Frame title="HC-SR04 — distance = temps × 340 × 100 / 2" hint="Fais glisser la durée de l'écho (aller-retour, en secondes) — Trig=GPIO23, Echo=GPIO24">
      <input type="range" min={1} max={250} value={time * 10000} onChange={(e) => setTime(Number(e.target.value) / 10000)} className="w-full accent-rose-500" />
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <Box>Écho : {(time * 1000).toFixed(2)} ms</Box>
        <Box className={cn(dist < 2 || dist > 400 ? 'border-rose-600 bg-rose-500/10 text-rose-200' : 'border-rose-600 bg-rose-500/10 text-rose-100')}>Distance : {dist} cm</Box>
      </div>
      <p className="mt-2 text-center text-[11px] text-zinc-500">Portée mesurable : 2 à 400 cm · signaux sonores à 40 kHz · division par 2 : l&apos;ultrason fait un aller-retour · résistances 1 KΩ + 2 KΩ</p>
    </Frame>
  )
}

// 34 ─── Communications USB Arduino ↔ Pi
export function ArduinoPiComm() {
  const modes = [
    { id: 'a2p', label: 'Arduino → Pi', d: 'Arduino : Serial.println("Message #i") toutes les 2 s. Pi : ls /dev/tty* → /dev/ttyACM0 → serial.Serial("/dev/ttyXXXX", 9600) → readline().' },
    { id: 'p2a', label: 'Pi → Arduino', d: 'LEDs Rouge A0 / Vert A1 / Bleu A2. Pi envoie 1/2/3 (allumer) ou led+3 (éteindre 4/5/6). Arduino : Serial.read() - "0" → digitalWrite.' },
    { id: 'bi', label: 'Bidirectionnelle', d: 'Mélange des deux : envoyer ET recevoir des données sur le même port série USB (9600 bauds).' },
  ]
  const [m, setM] = useState('a2p')
  const cur = modes.find((x) => x.id === m)!
  return (
    <Frame title="Communication USB Arduino UNO ↔ Raspberry Pi (3 types)" hint="Clique sur un mode">
      <Tabs options={modes.map((x) => ({ id: x.id, label: x.label }))} active={m} onPick={setM} />
      <div className="flex items-center justify-center gap-2 py-1">
        <Box className={cn('w-28', m === 'a2p' && 'border-emerald-600 bg-emerald-500/10')}>🤖 Arduino</Box>
        <div className="text-center text-xs text-zinc-400">
          {m === 'a2p' ? '──▶ série USB' : m === 'p2a' ? '◀── série USB' : '◀──▶ série USB'}
        </div>
        <Box className={cn('w-28', m === 'p2a' && 'border-rose-600 bg-rose-500/10')}>🍓 Raspberry Pi</Box>
      </div>
      <Box className="mt-1 text-left text-[11px] text-zinc-300">{cur.d}</Box>
    </Frame>
  )
}

// 35 ─── Flow Node-RED
export function NodeRedFlow() {
  const nodes = [
    { t: 'inject', d: '« chaque seconde » — envoie une pulsation (payloadType date, repeat 1 s)' },
    { t: 'function', d: '« Inverse état Led » : context.state = context.state || 0 → bascule 0 ↔ 1 → msg.payload = context.state' },
    { t: 'rpi-gpio out', d: '« Led sur GPIO23 » — broche 16 (GPIO23) du Raspberry Pi' },
    { t: 'debug', d: 'Affiche l\u2019état dans l\u2019onglet debug' },
  ]
  return (
    <Frame title="Node-RED — flow de clignotement LED" hint="Import du code JSON via Menu → Import → Clipboard · Deploy (bouton rouge, coin supérieur droit)">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {nodes.map((n, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <Box className={cn('min-w-[120px]', i === 2 ? 'border-rose-600 bg-rose-500/10 text-rose-100' : 'border-emerald-600 bg-emerald-500/10 text-emerald-100')}>{n.t}<span className="mt-0.5 block text-[10px] font-normal text-zinc-400">{n.d}</span></Box>
            {i < nodes.length - 1 && <span className="text-emerald-400">→</span>}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] text-zinc-500">Éditeur sur le port 1880 · sudo node-red-start / stop · npm pour les modules (ex : node-red-node-openweathermap : clé API + ville/GPS → nœud debug)</p>
    </Frame>
  )
}

// 36 ─── 5 méthodes de streaming
export function CameraStreaming() {
  const methods = [
    { id: 'nc', label: '1. Netcat + Mplayer', d: 'PC : nc -l -p 5001 | /usr/bin/mplayer -fps 10 -cache 1024 -  ·  Pi : raspivid -t 0 -w 1280 -h 720 -o - | nc IP_PC 5001  ·  enregistrement : -demuxer h264es -dumpstream -dumpfile' },
    { id: 'vlc', label: '2. VLC', d: 'Pi : raspivid -t 0 -n --width 1280 --height 720 -o - | cvlc stream:///dev/stdin --sout \u0027#standard{access=http,mux=ts,dst=:8090}\u0027 :demux=h264  ·  Client (plusieurs postes) : cvlc http://IP_pi:8090' },
    { id: 'omx', label: '3. Pi à Pi (OMXplayer)', d: "Capturer le flux depuis un Pi pour l'observer depuis un autre Pi branché à un écran — lecteur OMXplayer." },
    { id: 'mjpg', label: '4. mjpg-streamer', d: 'Transmet une suite de photos (mjpeg) les unes après les autres — résultat beaucoup moins fluide.' },
    { id: 'web', label: '5. Serveur Web (Python)', d: 'MJPEG via http.server : StreamingOutput + StreamingHandler + StreamingServer — 640x480 à 24 fps, port 8000, page <img src="stream.mjpg">' },
  ]
  const [m, setM] = useState('nc')
  const cur = methods.find((x) => x.id === m)!
  return (
    <Frame title="Caméra Raspberry Pi — 5 façons de faire du streaming" hint="Vidéosurveillance ou pilotage d'un robot à distance">
      <Tabs options={methods.map((x) => ({ id: x.id, label: x.label }))} active={m} onPick={setM} />
      <Box className="text-left font-mono text-[11px] leading-relaxed text-zinc-300">{cur.d}</Box>
    </Frame>
  )
}

// 37 ─── Démo Mosquitto
export function MosquittoDemo() {
  const [step, setStep] = useState(0)
  const lines = [
    '$ sudo apt-get install mosquitto          # broker local (un Pi existant suffit)',
    '$ systemctl status mosquitto              # vérifier que tout est opérationnel',
    '$ sudo apt-get install mosquitto-clients  # mosquitto_sub · mosquitto_pub · mosquitto_passw',
    '# Terminal 1 — Subscriber :',
    '$ mosquitto_sub -h localhost -t "sensor/temperature"',
    '# Terminal 2 — Publisher (-h serveur, -t topic, -m message) :',
    '$ mosquitto_pub -h localhost -t sensor/temperature -m 24.9',
    '> 24.9        ← le subscriber reçoit le message',
  ]
  return (
    <Frame title="Broker MQTT Mosquitto sur Raspberry Pi" hint="Clique pour avancer dans la démo terminal">
      <div className="rounded-xl bg-zinc-950 p-3 font-mono text-[11px] leading-relaxed text-emerald-200">
        {lines.slice(0, step + 1).map((l, i) => <p key={i} className={l.startsWith('#') ? 'text-zinc-500' : l.startsWith('>') ? 'text-sky-300' : ''}>{l}</p>)}
      </div>
      {step < lines.length - 1 && (
        <button onClick={() => setStep(step + 1)} className="mx-auto mt-2 block rounded-full bg-rose-500 px-4 py-1.5 text-xs font-bold text-zinc-950">Étape suivante →</button>
      )}
      <p className="mt-2 text-center text-[11px] text-zinc-500">MQTT : 11× moins d&apos;énergie à l&apos;envoi, 170× moins à la réception, 93× plus rapide que HTTP · QoS 0 → 2 · SSL/TLS avec certificat · Node-RED : nœud mqtt input → localhost:1883</p>
    </Frame>
  )
}

// ─── Registre des diagrammes IoT ───
export const iotDiagramRegistry: Record<string, React.ComponentType> = {
  IotHistory,
  IomtExamples,
  IoeComm,
  MappingWorlds,
  TicEcosystem,
  IotStack,
  IotDeviceAnatomy,
  FiveLayers,
  AnalyticsPyramid,
  CiscoRef,
  PlatformChain,
  TwoApproaches,
  AppProtocols,
  MqttFlow,
  NetProtocols,
  Topologies,
  UartFrame,
  SpiI2cWiring,
  SerialCompare,
  ServoPwm,
  RfidAccess,
  SensorPicker,
  SoftwareStack,
  GardenProject,
  ArduinoPins,
  Lm35Sim,
  Esp8266Modes,
  ThingspeakFlow,
  SmartFarming,
  MedicalBracelet,
  PiSetup,
  PiGpioLed,
  Hcsr04Sim,
  ArduinoPiComm,
  NodeRedFlow,
  CameraStreaming,
  MosquittoDemo,
}
