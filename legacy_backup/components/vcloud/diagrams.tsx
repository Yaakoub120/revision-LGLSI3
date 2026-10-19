'use client'

// ─── Diagrammes interactifs — Virtualisation & Cloud ───
import { useState } from 'react'
import { cn } from '@/lib/utils'

const V = 'violet'

function Frame({ title, children, hint }: { title: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 bg-zinc-900/70 px-4 py-2.5">
        <p className="text-sm font-black tracking-wide text-violet-300">📊 {title}</p>
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
            active === o.id ? 'bg-violet-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
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

// 1 ─── Hyperviseurs type 1 vs type 2
export function HypervisorTypes() {
  const [t, setT] = useState<'t1' | 't2'>('t1')
  return (
    <Frame title="Hyperviseur Type 1 (Bare metal) vs Type 2 (Host)" hint="Cliquez pour comparer les piles — le type 1 touche le hardware directement">
      <Tabs options={[{ id: 't1', label: 'Type 1 — Bare metal' }, { id: 't2', label: 'Type 2 — Host' }]} active={t} onPick={(x) => setT(x as 't1' | 't2')} />
      <div className="mx-auto max-w-xs space-y-1.5">
        <Box className="text-zinc-400">Applications</Box>
        <Box>OS invités (guest)</Box>
        <Box className={t === 't1' ? 'border-violet-500 bg-violet-500/20 text-violet-200' : ''}>Hyperviseur {t === 't1' ? 'Type 1 — noyau allégé (XEN, Oracle VM, Hyper-V, ESX)' : 'Type 2 — installé DANS l\u2019OS hôte (VirtualBox, Workstation, QEMU…)'}</Box>
        {t === 't2' && <Box className="border-amber-600 bg-amber-500/15 text-amber-200">OS hôte (Windows, Linux, macOS) — 3ᵉ niveau</Box>}
        <Box className="border-emerald-700 bg-emerald-500/10 text-emerald-200">Hardware (CPU {t === 't1' ? 'avec AMD-V / Intel VT' : ''}, RAM, disque, réseau)</Box>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">{t === 't1' ? 'Le plus répandu en entreprise · exécute directement sur le matériel' : 'Préféré des postes Laptop / Desktop · s\u2019exécute au-dessus d\u2019un OS'}</p>
    </Frame>
  )
}

// 2 ─── Paravirtualisation : drivers backend / frontend
export function ParaVirt() {
  return (
    <Frame title="Paravirtualisation — redirection des appels système" hint="OS1 détient le driver backend (contrôle du matériel) ; OS2 redirige via son driver frontend">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2 rounded-xl border border-violet-800/60 bg-violet-500/5 p-3">
          <p className="text-center text-xs font-black text-violet-300">OS 1 (invité 1)</p>
          <Box className="border-violet-500 bg-violet-500/20 text-violet-200">Driver BACKEND — contrôle du matériel</Box>
          <div className="text-center text-lg text-violet-400">↓</div>
          <Box className="border-emerald-700 bg-emerald-500/10 text-emerald-200">Hardware (disque dur, interface réseau…)</Box>
        </div>
        <div className="space-y-2 rounded-xl border border-zinc-700 bg-zinc-900/40 p-3">
          <p className="text-center text-xs font-black text-zinc-300">OS 2 (invité 2)</p>
          <Box>Driver FRONTEND</Box>
          <div className="text-center text-lg text-amber-400">→ redirection des appels système (plus rapide que la traduction) → vers OS 1</div>
        </div>
      </div>
      <p className="mt-3 rounded-lg border border-rose-800/60 bg-rose-500/10 p-2 text-xs text-rose-200">⚠️ Dépendance : si l\u2019OS 1 tombe en panne, l\u2019OS 2 ne peut plus accéder au matériel.</p>
    </Frame>
  )
}

// 3 ─── DAS / NAS / SAN
export function StorageArchs() {
  const [a, setA] = useState<'das' | 'nas' | 'san'>('nas')
  return (
    <Frame title="Architectures de stockage : DAS / NAS / SAN" hint="NAS = partage de fichiers · SAN = partage de disques (mode bloc)">
      <Tabs options={[{ id: 'das', label: 'DAS' }, { id: 'nas', label: 'NAS' }, { id: 'san', label: 'SAN' }]} active={a} onPick={(x) => setA(x as 'das' | 'nas' | 'san')} />
      {a === 'das' && (
        <div className="mx-auto max-w-sm space-y-1.5">
          <Box>Serveur</Box>
          <div className="text-center text-zinc-500">↓ câble direct (SCSI / SATA / SAS)</div>
          <Box className="border-emerald-700 bg-emerald-500/10 text-emerald-200">Disques connectés DIRECTEMENT (pas de réseau)</Box>
          <p className="pt-1 text-center text-xs text-zinc-500">✔ économique, simple, rapide · ✘ non dynamique, pas de HA/VMotion, pas de gestion centralisée</p>
        </div>
      )}
      {a === 'nas' && (
        <div className="mx-auto max-w-sm space-y-1.5">
          <div className="grid grid-cols-3 gap-1.5">
            <Box>PC</Box><Box>PC</Box><Box>VM ESXi</Box>
          </div>
          <div className="text-center text-zinc-500">↓ LAN Ethernet (protocoles CIFS/SMB · NFS · AFP)</div>
          <Box className="border-violet-500 bg-violet-500/20 text-violet-200">NAS — boîtier de disques, IP propre, interface web</Box>
          <p className="pt-1 text-center text-xs text-zinc-500">Partage de FICHIERS entre plusieurs utilisateurs / machines (« disque dur en réseau »)</p>
        </div>
      )}
      {a === 'san' && (
        <div className="mx-auto max-w-sm space-y-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            <Box>Serveur 1</Box><Box>Serveur 2</Box>
          </div>
          <div className="text-center text-zinc-500">↓ réseau DÉDIÉ (Fibre Channel ou iSCSI) via switchs SAN</div>
          <Box className="border-amber-600 bg-amber-500/15 text-amber-200">Baie de stockage SAN — accès en MODE BLOC (secteurs)</Box>
          <p className="pt-1 text-center text-xs text-zinc-500">Les VMs vivent sur la baie : si un serveur tombe, un autre les remet en production · rapide (BDD, VMs)</p>
        </div>
      )}
    </Frame>
  )
}

// 4 ─── RAID 0 / 1 / 5 / 10
type Disk = string[]
function RaidDisks({ disks, labels }: { disks: Disk[]; labels?: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {disks.map((d, i) => (
        <div key={i} className="overflow-hidden rounded-lg border border-zinc-600">
          <div className="bg-zinc-800 px-2 py-1 text-center text-[10px] font-bold text-zinc-300">{labels?.[i] ?? `Disque ${i + 1}`}</div>
          {d.map((c, j) => (
            <div key={j} className={cn('px-3 py-1 text-center text-xs font-mono', c === 'P' ? 'bg-amber-500/30 font-black text-amber-200' : 'bg-zinc-900 text-zinc-300')}>{c}</div>
          ))}
        </div>
      ))}
    </div>
  )
}
export function RaidViz() {
  const [lv, setLv] = useState<'0' | '1' | '5' | '10'>('5')
  const d = (arr: string[]): Disk => arr
  return (
    <Frame title="Visualiseur RAID 0 / 1 / 5 / 10" hint="Répartition (strips), duplication (miroir) et parité répartie (P)">
      <Tabs options={[{ id: '0', label: 'RAID 0 — Striping' }, { id: '1', label: 'RAID 1 — Mirroring' }, { id: '5', label: 'RAID 5 — Parité' }, { id: '10', label: 'RAID 10' }]} active={lv} onPick={(x) => setLv(x as '0' | '1' | '5' | '10')} />
      {lv === '0' && (
        <>
          <RaidDisks disks={[d(['A1', 'A3', 'A5']), d(['A2', 'A4', 'A6'])]} />
          <p className="mt-3 text-center text-xs text-rose-300">Performant ✚ · AUCUNE redondance (« AID ») : 1 disque HS = tout perdu</p>
        </>
      )}
      {lv === '1' && (
        <>
          <RaidDisks disks={[d(['A1', 'A2', 'A3']), d(['A1', 'A2', 'A3'])]} labels={['Disque 1', 'Miroir (copie)']} />
          <p className="mt-3 text-center text-xs text-emerald-300">Tolérant aux pannes : le miroir prend le relais · lectures réparties, écritures limitées par le disque le plus lent</p>
        </>
      )}
      {lv === '5' && (
        <>
          <RaidDisks disks={[d(['A1', 'A4', 'P']), d(['A2', 'P', 'A5']), d(['P', 'A3', 'A6'])]} />
          <p className="mt-3 text-center text-xs text-emerald-300">Parité répartie : reconstruction si 1 disque tombe · lectures rapides, écritures un peu plus lentes (calcul de parité) · moins de disques que RAID 1 (bas coût)</p>
        </>
      )}
      {lv === '10' && (
        <>
          <RaidDisks disks={[d(['A1', 'A3']), d(['A1', 'A3']), d(['A2', 'A4']), d(['A2', 'A4'])]} labels={['Strip 1', 'Miroir 1', 'Strip 2', 'Miroir 2']} />
          <p className="mt-3 text-center text-xs text-emerald-300">RAID 10 / 0+1 : combine RAID 1 (sécurité) + RAID 0 (vitesse)</p>
        </>
      )}
    </Frame>
  )
}

// 5 ─── Modes réseau VirtualBox
export function VboxNet() {
  const [m, setM] = useState<'nat' | 'bridge' | 'host'>('nat')
  return (
    <Frame title="VirtualBox : NAT / Bridgé / Host-Only" hint="Le mode par défaut est NAT">
      <Tabs options={[{ id: 'nat', label: 'NAT (défaut)' }, { id: 'bridge', label: 'Bridgé' }, { id: 'host', label: 'Host-Only' }]} active={m} onPick={(x) => setM(x as 'nat' | 'bridge' | 'host')} />
      <div className="mx-auto max-w-md space-y-1.5 text-center">
        <div className="grid grid-cols-2 gap-1.5">
          <Box>VM</Box><Box>VM</Box>
        </div>
        <div className="text-xs text-zinc-500">↓</div>
        {m === 'nat' && <Box className="border-violet-500 bg-violet-500/20 text-violet-200">Routeur NAT du moteur réseau VirtualBox (entre chaque VM et l\u2019hôte)</Box>}
        {m === 'bridge' && <Box className="border-violet-500 bg-violet-500/20 text-violet-200">Interface logicielle bridgée → réseau physique</Box>}
        {m === 'host' && <Box className="border-violet-500 bg-violet-500/20 text-violet-200">Réseau privé hôte uniquement</Box>}
        <div className="text-xs text-zinc-500">↓</div>
        {m === 'nat' && <Box className="border-zinc-600">Hôte</Box>}
        {m === 'bridge' && <Box className="border-emerald-700 bg-emerald-500/10 text-emerald-200">Réseau physique (hôte + extérieur) — la VM est comme câblée</Box>}
        {m === 'host' && <Box className="border-emerald-700 bg-emerald-500/10 text-emerald-200">Hôte uniquement</Box>}
        {m === 'nat' && <Box className={cn('ml-auto w-1/2', 'border-zinc-600')}>Internet</Box>}
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">
        {m === 'nat' && 'Sécurité maximale : les VMs ne peuvent pas se parler ni être contactées de l\u2019extérieur · aucune configuration requise'}
        {m === 'bridge' && 'La VM est contactable par l\u2019hôte et l\u2019extérieur, et peut contacter l\u2019hôte et l\u2019extérieur'}
        {m === 'host' && 'VMs ↔ VMs et VMs ↔ hôte uniquement : pas d\u2019accès au réseau externe ni à Internet'}
      </p>
    </Frame>
  )
}

// 6 ─── VM vs Conteneur
export function VmContainer() {
  const vm = ['Infrastructure', 'Hyperviseur', 'OS invité (BINS/LIBS par VM)', 'BINS / LIBS', 'App 1', 'App 2']
  const ct = ['Infrastructure', 'OS hôte (kernel partagé)', 'Container Engine (Docker)', 'BINS / LIBS', 'App 1', 'App 2']
  return (
    <Frame title="Machine Virtuelle vs Conteneur" hint="VM : un OS par machine · Conteneur : même kernel, démarrage en secondes">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-center text-xs font-black text-amber-300">Machine Virtuelle</p>
          {vm.map((x, i) => (
            <Box key={i} className={i === 0 ? 'border-emerald-700 bg-emerald-500/10' : i === 1 ? 'border-violet-600 bg-violet-500/15 text-violet-200' : i === 2 ? 'border-amber-600 bg-amber-500/10 text-amber-200' : ''}>{x}</Box>
          ))}
        </div>
        <div className="space-y-1">
          <p className="text-center text-xs font-black text-violet-300">Conteneur (Docker)</p>
          {ct.map((x, i) => (
            <Box key={i} className={i === 0 ? 'border-emerald-700 bg-emerald-500/10' : i === 1 ? 'border-sky-700 bg-sky-500/10' : i === 2 ? 'border-violet-500 bg-violet-500/20 text-violet-200' : ''}>{x}</Box>
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[11px]">
        <p className="rounded-lg bg-amber-500/10 p-2 text-amber-200">VM : boot qq minutes · beaucoup de ressources (CPU, stockage) · OS propre</p>
        <p className="rounded-lg bg-violet-500/10 p-2 text-violet-200">Conteneur : boot qq secondes · peu de ressources · même kernel (Linux)</p>
      </div>
    </Frame>
  )
}

// 7 ─── Flux Docker : Dockerfile → build → image → registry → run
export function DockerFlow() {
  const [step, setStep] = useState(0)
  const steps = [
    { t: 'Dockerfile', c: 'Le développeur écrit le fichier de commandes (FROM, COPY, RUN…)', cmd: '# Dockerfile' },
    { t: 'docker build', c: 'Docker exécute les commandes et construit une image contenant tout ce dont l\u2019app a besoin', cmd: '$ docker build -t myapp .' },
    { t: 'Image', c: 'Fichier package = TEMPLATE des conteneurs (app + dépendances)', cmd: '$ docker images' },
    { t: 'Registry (push/pull)', c: 'Publication dans Docker Hub (public) ou registre privé', cmd: '$ docker push user/app\n$ docker pull user/app' },
    { t: 'docker run', c: 'Instanciation et exécution du conteneur (télécharge l\u2019image si absente)', cmd: '$ docker run -d -p 8089:80 myapp' },
    { t: 'Conteneur', c: 'Instance de l\u2019image, exécutée par le Docker Host dans un environnement isolé', cmd: '$ docker ps' },
  ]
  const s = steps[step]
  return (
    <Frame title="Architecture globale de Docker" hint="Du Dockerfile au conteneur — cliquez sur les étapes">
      <div className="mb-3 flex flex-wrap gap-1.5">
        {steps.map((x, i) => (
          <button key={i} onClick={() => setStep(i)} className={cn('rounded-full px-2.5 py-1 text-[11px] font-bold transition', i === step ? 'bg-violet-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200')}>{i + 1}. {x.t}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-sm font-black text-violet-300">{s.t}</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-300">{s.c}</p>
        </div>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-[12px] leading-relaxed text-emerald-200">{s.cmd}</pre>
      </div>
      <p className="mt-2 text-center text-xs text-zinc-500">Docker Engine (daemon) crée le Host Docker sur Linux · Client Docker relié par socket / REST API · Docker Hub = registre</p>
    </Frame>
  )
}

// 8 ─── Réseaux Docker : bridge / host / none
export function DockerNet() {
  const [m, setM] = useState<'bridge' | 'host' | 'none'>('bridge')
  return (
    <Frame title="Networking dans Docker : bridge / host / none" hint="Adresses bridge typiques : 172.17.0.x — passerelle 172.17.0.1">
      <Tabs options={[{ id: 'bridge', label: 'Bridge (défaut)' }, { id: 'host', label: 'Host' }, { id: 'none', label: 'none' }]} active={m} onPick={(x) => setM(x as 'bridge' | 'host' | 'none')} />
      <div className="space-y-2">
        {m === 'bridge' && (
          <>
            <div className="grid grid-cols-4 gap-1.5">
              <Box>web<br /><span className="text-[10px] text-zinc-500">172.17.0.2</span></Box>
              <Box>mysql<br /><span className="text-[10px] text-zinc-500">172.17.0.3</span></Box>
              <Box>activemq<br /><span className="text-[10px] text-zinc-500">172.17.0.4</span></Box>
              <Box>hazelcast<br /><span className="text-[10px] text-zinc-500">172.17.0.5</span></Box>
            </div>
            <Box className="border-violet-500 bg-violet-500/20 text-violet-200">Réseau bridge privé (gateway 172.17.0.1) — conteneurs joignables par IP et par NOM (DNS)</Box>
            <Box>Docker Host — accès extérieur par mapping de ports (-p externe:interne)</Box>
            <p className="pt-1 text-center text-xs text-zinc-500">✔ plusieurs instances possibles · accès conteneur↔conteneur direct</p>
          </>
        )}
        {m === 'host' && (
          <>
            <div className="grid grid-cols-2 gap-1.5">
              <Box>Conteneur 1<br /><span className="text-[10px] text-zinc-500">port 5000 → port 5000 host</span></Box>
              <Box>Conteneur 2<br /><span className="text-[10px] text-zinc-500">port 5500 → port 5500 host</span></Box>
            </div>
            <Box className="border-amber-600 bg-amber-500/15 text-amber-200">Ports partagés directement avec le host (--network=host) — pas de mapping manuel</Box>
            <p className="pt-1 text-center text-xs text-rose-300">✘ impossible de lancer plusieurs instances du même conteneur (même port)</p>
          </>
        )}
        {m === 'none' && (
          <>
            <Box className="border-rose-700 bg-rose-500/10 text-rose-200">Conteneur isolé (--network=none)</Box>
            <p className="pt-1 text-center text-xs text-zinc-500">Aucun réseau attaché : inaccessible ni localement ni de l\u2019extérieur</p>
          </>
        )}
      </div>
    </Frame>
  )
}

// 9 ─── Volumes Docker
export function DockerVolumes() {
  return (
    <Frame title="Mapping des volumes : persistance des données" hint="docker run -v /opt/dataDir:/var/lib/mysql mysql">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="space-y-1.5">
          <Box className="border-emerald-700 bg-emerald-500/10 text-emerald-200">Hôte (VM Docker Host)<br /><span className="font-mono text-[11px]">/opt/dataDir</span></Box>
          <p className="text-center text-[11px] text-zinc-500">Les données SURVIVENT à la suppression du conteneur</p>
        </div>
        <div className="text-2xl text-violet-400">⟷</div>
        <div className="space-y-1.5">
          <Box className="border-violet-500 bg-violet-500/20 text-violet-200">Conteneur MySQL<br /><span className="font-mono text-[11px]">/var/lib/mysql</span></Box>
          <p className="text-center text-[11px] text-zinc-500">Sans volume : conteneur supprimé = BDD détruites</p>
        </div>
      </div>
    </Frame>
  )
}

// 10 ─── Architecture en couches (build cache)
export function DockerLayers() {
  const layers = [
    { n: 'Layer 1 : Base ubuntu', mb: '120 MB' },
    { n: 'Layer 2 : Changes in apt packages', mb: '306 MB' },
    { n: 'Layer 3 : Changes in pip packages', mb: '6.3 MB' },
    { n: 'Layer 4 : Source code', mb: '229 B' },
    { n: 'Layer 5 : Update Entrypoint', mb: '0 MB' },
  ]
  const [rebuild, setRebuild] = useState(false)
  return (
    <Frame title="Architecture en couches d\u2019une image Docker" hint="Chaque instruction crée une couche — les couches inchangées sont réutilisées (cache)">
      <Tabs options={[{ id: 'a', label: '1er build (imageapp)' }, { id: 'b', label: '2e build (imageapp2)' }]} active={rebuild ? 'b' : 'a'} onPick={(x) => setRebuild(x === 'b')} />
      <div className="mx-auto max-w-md space-y-1.5">
        {layers.map((l, i) => {
          const cached = rebuild && i <= 2
          return (
            <div key={i} className="flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-semibold">
              <span className={cached ? 'text-zinc-500 line-through' : 'text-zinc-200'}>{l.n}</span>
              <span className={cn('rounded px-2 py-0.5 font-mono', cached ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-800 text-zinc-300')}>{cached ? '0 MB (cache)' : l.mb}</span>
            </div>
          )
        })}
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">{rebuild ? 'Dockerfile2 ne change que la source (COPY app2.py) : seuls 229 B sont reconstruits' : 'Dockerfile1 : FROM ubuntu · RUN apt-get python · RUN pip flusk flusk-mysql · COPY . /opt/source-code · ENTRYPOINT flusk run'}</p>
    </Frame>
  )
}

// 11 ─── Voting app (compose)
export function ComposeVoting() {
  const nodes = [
    { id: 'vote', x: '5%', y: '10%', c: 'border-violet-500 bg-violet-500/20 text-violet-200', label: 'voting-app (Python) :5000' },
    { id: 'redis', x: '40%', y: '2%', c: 'border-rose-600 bg-rose-500/15', label: 'redis (cache)' },
    { id: 'worker', x: '55%', y: '38%', c: 'border-amber-600 bg-amber-500/15', label: 'worker (Java)' },
    { id: 'db', x: '78%', y: '20%', c: 'border-sky-700 bg-sky-500/10', label: 'postgres:9.4' },
    { id: 'result', x: '25%', y: '72%', c: 'border-emerald-700 bg-emerald-500/15', label: 'result-app :5001' },
  ]
  return (
    <Frame title="Voting-app : 5 services (exemple Docker Compose)" hint="front-end net : voting-app ↔ result-app · back-end net : redis, db, worker">
      <div className="relative h-64 rounded-xl border border-zinc-800 bg-zinc-900/40">
        {nodes.map((n) => (
          <div key={n.id} className={cn('absolute rounded-xl border px-2 py-1.5 text-[10px] font-bold sm:text-xs', n.c)} style={{ left: n.x, top: n.y, maxWidth: '44%' }}>{n.label}</div>
        ))}
        <svg className="absolute inset-0 h-full w-full" style={{ zIndex: -0 }}>
          <line x1="20%" y1="22%" x2="45%" y2="10%" stroke="#52525b" strokeWidth="1.5" />
          <line x1="52%" y1="10%" x2="62%" y2="45%" stroke="#52525b" strokeWidth="1.5" />
          <line x1="70%" y1="45%" x2="82%" y2="32%" stroke="#52525b" strokeWidth="1.5" />
          <line x1="38%" y1="52%" x2="35%" y2="78%" stroke="#52525b" strokeWidth="1.5" />
          <line x1="38%" y1="80%" x2="80%" y2="34%" stroke="#52525b" strokeWidth="1.5" />
        </svg>
      </div>
      <p className="mt-2 text-center text-xs text-zinc-500">Flux : /vote?act=cat → setData (redis) → worker lit vote=cat → Vote (db) → /results affiche CATS / DOGS · Version 2 de compose : links automatiques entre services</p>
    </Frame>
  )
}

// 12 ─── Cluster Swarm (scaling)
export function SwarmCluster() {
  const [scale, setScale] = useState(6)
  const hosts = ['Host 1 (manager)', 'Host 2', 'Host 3']
  const perHost = (n: number) => {
    const base = Math.floor(n / 3)
    const rest = n % 3
    return [base + (rest > 0 ? 1 : 0), base + (rest > 1 ? 1 : 0), base]
  }
  const counts = perHost(scale)
  return (
    <Frame title="Cluster Docker Swarm : manager + workers" hint="docker service scale back=15 — les instances se répartissent sur les nœuds">
      <div className="mb-4 rounded-xl border border-violet-800/60 bg-violet-500/5 p-3 text-center text-sm font-black text-violet-300">Docker Swarm (port 2377)</div>
      <div className="grid grid-cols-3 gap-2">
        {hosts.map((h, i) => (
          <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5">
            <p className="mb-2 text-center text-[10px] font-black text-zinc-400 sm:text-xs">{h}</p>
            <div className="flex flex-wrap justify-center gap-1">
              {Array.from({ length: Math.max(counts[i], i === 0 ? 1 : 0) }).map((_, j) => (
                <span key={j} className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-[11px] font-black text-emerald-300">B</span>
              ))}
            </div>
            {i === 0 && <p className="mt-2 text-center text-[10px] text-violet-300">swarm init · Leader</p>}
            {i > 0 && <p className="mt-2 text-center text-[10px] text-zinc-500">swarm join --token …:2377</p>}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input type="range" min={0} max={15} value={scale} onChange={(e) => setScale(Number(e.target.value))} className="w-full accent-violet-500" aria-label="Nombre d'instances" />
        <p className="text-center text-xs text-zinc-400">{scale} instance(s) du service « back » · <span className="font-mono">docker service scale back={scale}</span></p>
      </div>
      <p className="mt-2 text-center text-[11px] text-zinc-500">Overlay network chiffré (--opt encrypted) : communication entre conteneurs de différents hôtes · drain host3 → les instances migrent</p>
    </Frame>
  )
}

// 13 ─── Architecture Kubernetes
export function K8sArch() {
  const [side, setSide] = useState<'master' | 'node'>('master')
  const master = [
    ['Etcd', 'Stockage distribué persistant et léger : configuration, état du cluster, événements'],
    ['API Server', 'API REST de communication avec les composants internes et externes'],
    ['Scheduler', 'Ordonnanceur : choisit quel Node fait tourner un Pod (mémoire, disque, CPU en temps réel)'],
    ['Controller Manager', 'Exécute les contrôleurs : DaemonSet Controller, Replication Controller'],
  ]
  const node = [
    ['Kubelet', 'État d\u2019exécution du nœud : conteneurs en bonne santé, organisés en Pods'],
    ['Kube-proxy', 'Routage du trafic vers le bon conteneur selon IP + port de la requête'],
    ['cAdvisor', 'Surveillance des ressources et performances (CPU, mémoire, disque, réseau)'],
    ['Docker Engine', 'Le programme de conteneurisation obligatoire sur chaque Node'],
  ]
  const items = side === 'master' ? master : node
  return (
    <Frame title="Architecture Kubernetes (maître / esclave)" hint="Cliquez pour voir le plan de contrôle (Master) ou un nœud Worker">
      <Tabs options={[{ id: 'master', label: 'Kubernetes Master (plan de contrôle)' }, { id: 'node', label: 'Kubernetes Node (Worker)' }]} active={side} onPick={(x) => setSide(x as 'master' | 'node')} />
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map(([k, v]) => (
          <div key={k} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
            <p className="text-sm font-black text-violet-300">{k}</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-zinc-500">Kubectl (CLI) → API Server · Plugin réseau entre les nœuds (Flannel, Weavenet, etc.)</p>
    </Frame>
  )
}

// 14 ─── Pod : conteneurs partageant IP / volumes
export function K8sPod() {
  return (
    <Frame title="Le Pod : groupe de containers déployés ensemble" hint="Démarrés/arrêtés/répliqués en GROUPE — entité de base répliquée sur les nœuds">
      <div className="mx-auto max-w-md rounded-2xl border-2 border-violet-600/70 bg-violet-500/5 p-4">
        <p className="mb-3 text-center text-xs font-black text-violet-300">POD — même Network · Namespace · IP · Ports</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-center">
            <p className="text-xs font-bold text-zinc-200">Conteneur A</p>
            <p className="mt-1 text-[10px] text-zinc-500">app principale</p>
          </div>
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-center">
            <p className="text-xs font-bold text-zinc-200">Conteneur B</p>
            <p className="mt-1 text-[10px] text-zinc-500">sidecar</p>
          </div>
        </div>
        <div className="mt-3 rounded-lg border border-emerald-800/60 bg-emerald-500/10 p-2 text-center text-[11px] text-emerald-200">Shared volume — même répertoire partagé</div>
        <p className="mt-2 text-center text-[11px] text-zinc-400">A ↔ B via <span className="font-mono">localhost</span></p>
      </div>
    </Frame>
  )
}

// 15 ─── Déploiement K8s : réconciliation de l'état désiré
export function K8sReconcile() {
  const [step, setStep] = useState(0)
  const steps = [
    { t: 'État désiré déclaré', d: 'myDeployment.yaml : replicas: 3, image nginx:1.7.9, port 80', cmd: 'kubectl create -f myDeployment.yaml' },
    { t: 'Le contrôleur crée les pods', d: '3 pods libellés app:nginx tournent et sont dans le load balancer', cmd: 'kubectl get pods → 3 × Running' },
    { t: 'Un Pod plante 💥', d: 'Le déploiement détecte le pod défaillant, le désactive et l\u2019enlève du load balancer', cmd: '2/3 Running' },
    { t: 'Réconciliation automatique', d: 'Le contrôleur crée un nouveau pod sur un autre nœud : le service continue dans les mêmes conditions que le descripteur', cmd: '3/3 Running ✓' },
  ]
  const s = steps[step]
  return (
    <Frame title="Deployment : l\u2019architecture cible est MAINTENUE par le contrôleur" hint="Cliquez sur les étapes de la réconciliation">
      <div className="mb-3 flex flex-wrap gap-1.5">
        {steps.map((_, i) => (
          <button key={i} onClick={() => setStep(i)} className={cn('h-8 w-8 rounded-full text-xs font-black transition', i === step ? 'bg-violet-500 text-zinc-950' : 'border border-zinc-700 bg-zinc-900 text-zinc-400')}>{i + 1}</button>
        ))}
      </div>
      <div className="mb-3 flex justify-center gap-3">
        {[0, 1, 2].map((p) => (
          <div key={p} className={cn('flex h-16 w-16 items-center justify-center rounded-2xl border-2 text-xs font-black', step === 2 && p === 2 ? 'border-rose-600 bg-rose-500/15 text-rose-300' : step === 3 && p === 2 ? 'border-emerald-600 bg-emerald-500/15 text-emerald-300' : 'border-violet-600 bg-violet-500/10 text-violet-300')}>
            {step === 2 && p === 2 ? '💥' : 'POD'}
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <p className="text-sm font-black text-violet-300">{s.t}</p>
        <p className="mt-1 text-sm text-zinc-300">{s.d}</p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-950 p-3 font-mono text-[12px] text-emerald-200">{s.cmd}</pre>
      </div>
    </Frame>
  )
}

export const vcloudDiagramRegistry: Record<string, React.ComponentType> = {
  'v-hypervisor-types': HypervisorTypes,
  'v-paravirt': ParaVirt,
  'v-storage-archs': StorageArchs,
  'v-raid': RaidViz,
  'v-vbox-net': VboxNet,
  'v-vm-container': VmContainer,
  'v-docker-flow': DockerFlow,
  'v-docker-net': DockerNet,
  'v-docker-volumes': DockerVolumes,
  'v-docker-layers': DockerLayers,
  'v-compose-voting': ComposeVoting,
  'v-swarm-cluster': SwarmCluster,
  'v-k8s-arch': K8sArch,
  'v-k8s-pod': K8sPod,
  'v-k8s-reconcile': K8sReconcile,
}
