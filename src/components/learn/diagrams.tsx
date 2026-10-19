"use client";

// ═══════════════════════════════════════════════════════════════════════════
// SVG explanatory diagrams used across the knowledge base
// ═══════════════════════════════════════════════════════════════════════════

import { useId } from "react";

const BOX = "fill-white dark:fill-zinc-900";
const STROKE = "stroke-zinc-400 dark:stroke-zinc-600";
const TXT = "fill-zinc-700 dark:fill-zinc-200";

function Svg({ children, viewBox = "0 0 760 300" }: { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} className="w-full h-auto max-w-3xl mx-auto" role="img">
      {children}
    </svg>
  );
}

function Node({
  x, y, w, h, fill, label, small,
}: { x: number; y: number; w: number; h: number; fill: string; label: string; small?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} className={BOX} style={{ stroke: fill, strokeWidth: 2 }} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" className={TXT} fontSize={small ? 10 : 12} fontWeight={600}>
        {label}
      </text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, dashed }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} className={STROKE} strokeWidth={1.5}
      strokeDasharray={dashed ? "5 4" : undefined} markerEnd="url(#arr)" />
  );
}

function Defs() {
  const id = useId();
  return (
    <defs>
      <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 z" className="fill-zinc-500 dark:fill-zinc-400" />
      </marker>
      <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f4f4f5" />
        <stop offset="100%" stopColor="#e4e4e7" />
      </linearGradient>
    </defs>
  );
}

// ── OSI vs TCP/IP ────────────────────────────────────────────────────────────
export function OsiTcpip() {
  const osi = ["7. Application", "6. Présentation", "5. Session", "4. Transport", "3. Réseau", "2. Liaison de données", "1. Physique"];
  const tcp = [{ n: "4. Application", p: "HTTP · HTTPS · DNS · SMTP · FTP" }, { n: "3. Transport", p: "TCP · UDP" }, { n: "2. Internet", p: "IP · ICMP" }, { n: "1. Accès au réseau", p: "Ethernet · Wi-Fi · MAC" }];
  const h = 30;
  return (
    <Svg viewBox="0 0 760 260">
      <Defs />
      {osi.map((l, i) => (
        <g key={l}>
          <rect x={80} y={20 + i * h} width={230} height={h - 4} rx={5} className={BOX} style={{ stroke: "#8b5cf6", strokeWidth: 1.5 }} />
          <text x={195} y={20 + i * h + 18} textAnchor="middle" className={TXT} fontSize={11} fontWeight={600}>{l}</text>
        </g>
      ))}
      {tcp.map((l, i) => {
        const h2 = i === 0 ? 3 * h - 4 : h - 4;
        const y = i === 0 ? 20 : 20 + 3 * h + (i - 1) * h;
        return (
          <g key={l.n}>
            <rect x={440} y={y} width={230} height={h2} rx={5} className={BOX} style={{ stroke: "#06b6d4", strokeWidth: 1.5 }} />
            <text x={555} y={y + 17} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>{l.n}</text>
            <text x={555} y={y + h2 - 7} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>{l.p}</text>
          </g>
        );
      })}
      <text x={195} y={12} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Modèle OSI (7 couches)</text>
      <text x={555} y={12} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Modèle TCP/IP (4 couches)</text>
    </Svg>
  );
}

// ── Linux FHS ────────────────────────────────────────────────────────────────
export function LinuxFsh() {
  const dirs: [string, string][] = [
    ["/", "racine"],
    ["/etc", "configurations"],
    ["/usr", "programmes"],
    ["/opt", "logiciels tiers"],
    ["/tmp", "temporaires"],
    ["/var", "logs, données"],
    ["/mnt /media", "montages"],
    ["/proc /sys", "FS virtuels"],
    ["/root", "admin"],
  ];
  return (
    <Svg viewBox="0 0 760 210">
      <Defs />
      <Node x={330} y={20} w={100} h={38} fill="#10b981" label="/" />
      {dirs.slice(1).map(([d, cap], i) => {
        const x = 20 + i * 85;
        return (
          <g key={d}>
            <line x1={380} y1={58} x2={x + 40} y2={110} className={STROKE} />
            <Node x={x} y={110} w={80} h={30} fill="#10b981" label={d} small />
            <text x={x + 40} y={158} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>{cap}</text>
          </g>
        );
      })}
      <text x={380} y={195} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Arborescence unique : tout part de la racine / (Filesystem Hierarchy Standard)
      </text>
    </Svg>
  );
}

// ── Linux VFS ────────────────────────────────────────────────────────────────
export function LinuxVfs() {
  return (
    <Svg viewBox="0 0 760 150">
      <Defs />
      <Node x={60} y={55} w={140} h={40} fill="#f43f5e" label="Applications" />
      <Node x={250} y={55} w={120} h={40} fill="#f97316" label="Kernel" />
      <Node x={420} y={55} w={120} h={40} fill="#8b5cf6" label="VFS" />
      {["ext3", "ext4", "VFAT", "HPFS", "UFS"].map((fs, i) => (
        <g key={fs}>
          <Node x={580 + (i % 3) * 62} y={20 + Math.floor(i / 3) * 52} w={56} h={32} fill="#10b981" label={fs} small />
          <line x1={540} y1={75} x2={608 + (i % 3) * 62} y2={36 + Math.floor(i / 3) * 52} className={STROKE} />
        </g>
      ))}
      <Arrow x1={200} y1={75} x2={250} y2={75} />
      <Arrow x1={370} y1={75} x2={420} y2={75} />
    </Svg>
  );
}

// ── Hypervisor types ─────────────────────────────────────────────────────────
export function HypervisorTypes() {
  return (
    <Svg viewBox="0 0 760 330">
      <Defs />
      {/* Type 1 */}
      <text x={195} y={20} textAnchor="middle" className={TXT} fontSize={13} fontWeight={700}>Type 1 — Bare metal</text>
      {["VM 1", "VM 2", "VM 3"].map((v, i) => <Node key={v} x={45 + i * 105} y={35} w={95} h={34} fill="#06b6d4" label={v} />)}
      <Node x={45} y={85} w={305} h={34} fill="#f43f5e" label="Hyperviseur (XEN, Hyper-V, ESXi…)" />
      <Node x={45} y={135} w={305} h={34} fill="#84cc16" label="Matériel (CPU · RAM · disque · réseau)" />
      <text x={195} y={192} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>Directement sur le matériel · plus répandu en entreprise</text>
      {/* Type 2 */}
      <text x={565} y={20} textAnchor="middle" className={TXT} fontSize={13} fontWeight={700}>Type 2 — Host metal</text>
      {["VM 1", "VM 2"].map((v, i) => <Node key={v} x={435 + i * 120} y={35} w={110} h={34} fill="#06b6d4" label={v} />)}
      <Node x={435} y={85} w={230} h={34} fill="#f43f5e" label="Hyperviseur (VirtualBox, QEMU…)" />
      <Node x={435} y={135} w={230} h={34} fill="#8b5cf6" label="OS hôte (Windows, Linux, macOS)" />
      <Node x={435} y={185} w={230} h={34} fill="#84cc16" label="Matériel" />
      <text x={550} y={240} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>À l'intérieur d'un OS hôte · laptops/desktops</text>
      <text x={380} y={300} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Type 1 : instructions AMD-V / Intel VT → l'OS invité n'a plus besoin d'être modifié
      </text>
    </Svg>
  );
}

// ── VM vs Container ──────────────────────────────────────────────────────────
export function VmVsContainer() {
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      <text x={195} y={20} textAnchor="middle" className={TXT} fontSize={13} fontWeight={700}>Machine Virtuelle</text>
      {["VM 1 (OS invité)", "VM 2 (OS invité)"].map((v, i) => (
        <g key={v}>
          <rect x={50 + i * 160} y={35} width={140} height={90} rx={8} className={BOX} style={{ stroke: "#8b5cf6", strokeWidth: 2 }} />
          <text x={120 + i * 160} y={55} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>App {i + 1}</text>
          <rect x={70 + i * 160} y={68} width={100} height={30} rx={5} fill="#ede9fe" className="dark:fill-violet-950" />
          <text x={120 + i * 160} y={87} textAnchor="middle" className={TXT} fontSize={10}>OS invité {i + 1}</text>
        </g>
      ))}
      <Node x={50} y={145} w={300} h={30} fill="#f43f5e" label="Hyperviseur" />
      <Node x={50} y={185} w={300} h={30} fill="#84cc16" label="Matériel" />
      <text x={200} y={245} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>OS complet par VM · boot en minutes · beaucoup de ressources</text>

      <text x={565} y={20} textAnchor="middle" className={TXT} fontSize={13} fontWeight={700}>Conteneur (Docker)</text>
      {["Conteneur 1", "Conteneur 2", "Conteneur 3"].map((c, i) => (
        <g key={c}>
          <rect x={410 + i * 108} y={35} width={98} height={90} rx={8} className={BOX} style={{ stroke: "#06b6d4", strokeWidth: 2 }} />
          <text x={459 + i * 108} y={55} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>App {i + 1}</text>
          <rect x={424 + i * 108} y={68} width={70} height={24} rx={5} fill="#e0f2fe" className="dark:fill-cyan-950" />
          <text x={459 + i * 108} y={84} textAnchor="middle" className={TXT} fontSize={9}>Bins/Libs</text>
        </g>
      ))}
      <Node x={410} y={145} w={320} h={30} fill="#f97316" label="Container Engine (Docker daemon)" />
      <Node x={410} y={185} w={320} h={30} fill="#8b5cf6" label="OS hôte (kernel partagé)" />
      <Node x={410} y={225} w={320} h={30} fill="#84cc16" label="Matériel" />
      <text x={570} y={280} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>Kernel partagé · boot en secondes · léger et portable</text>
    </Svg>
  );
}

// ── Kubernetes architecture ──────────────────────────────────────────────────
export function K8sArch() {
  return (
    <Svg viewBox="0 0 760 330">
      <Defs />
      <text x={200} y={20} textAnchor="middle" className={TXT} fontSize={13} fontWeight={700}>Kubernetes Master (plan de contrôle)</text>
      <rect x={40} y={30} width={320} height={130} rx={10} className={BOX} style={{ stroke: "#06b6d4", strokeWidth: 2 }} />
      <Node x={55} y={45} w={140} h={30} fill="#0891b2" label="API Server (REST)" small />
      <Node x={205} y={45} w={140} h={30} fill="#0891b2" label="etcd (stockage)" small />
      <Node x={55} y={85} w={140} h={30} fill="#0891b2" label="Scheduler" small />
      <Node x={205} y={85} w={140} h={30} fill="#0891b2" label="Controller Manager" small />
      <text x={200} y={140} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>DaemonSet Controller · Replication Controller</text>
      <text x={200} y={180} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>Gère la charge de travail et dirige les communications</text>

      {["Worker Node 1", "Worker Node 2"].map((n, i) => (
        <g key={n}>
          <rect x={410 + i * 175} y={30} width={160} height={180} rx={10} className={BOX} style={{ stroke: "#84cc16", strokeWidth: 2 }} />
          <text x={490 + i * 175} y={50} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>{n}</text>
          <Node x={425 + i * 175} y={60} w={130} h={26} fill="#65a30d" label="kubelet" small />
          <Node x={425 + i * 175} y={92} w={130} h={26} fill="#65a30d" label="kube-proxy" small />
          <Node x={425 + i * 175} y={124} w={130} h={26} fill="#65a30d" label="cAdvisor" small />
          <Node x={425 + i * 175} y={158} w={130} h={34} fill="#06b6d4" label="Pod (containers)" small />
        </g>
      ))}
      <Arrow x1={360} y1={95} x2={410} y2={95} />
      <Arrow x1={360} y1={120} x2={585} y2={120} />
      <text x={380} y={250} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Architecture maître/esclave · chaque Node exécute un Container Engine (Docker)
      </text>
      <text x={380} y={275} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Pod = groupe de containers partageant Network, Namespace, IP et Ports
      </text>
      <text x={380} y={300} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Services : ClusterIP (interne) · NodePort (port sur chaque nœud) · LoadBalancer (externe)
      </text>
    </Svg>
  );
}

// ── HDFS architecture ────────────────────────────────────────────────────────
export function HdfsArch() {
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      <Node x={70} y={30} w={150} h={36} fill="#f43f5e" label="Client Hadoop" />
      <Node x={400} y={30} w={150} h={36} fill="#8b5cf6" label="NameNode (métadonnées)" />
      <Arrow x1={220} y1={48} x2={400} y2={48} />
      <Arrow x1={400} y1={60} x2={220} y2={60} />
      <text x={310} y={85} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>« Je veux écrire data.txt (3 blocs) » / « OK, envoie aux DataNodes 1, 3 et 5 »</text>
      {["DataNode 1\nBloc 1", "DataNode 3\nBloc 2", "DataNode 5\nBloc 3"].map((d, i) => (
        <g key={d}>
          <Node x={100 + i * 200} y={130} w={140} h={44} fill="#06b6d4" label={d.replace("\n", " · ")} small />
          <Arrow x1={145 + i * 200} y1={66} x2={170 + i * 200} y2={130} />
        </g>
      ))}
      <text x={380} y={205} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Blocs de 128 Mo par défaut · réplication ×3 pour tolérer la panne d'une machine
      </text>
      <text x={380} y={230} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Lecture : le NameNode fournit la liste des DataNodes de chaque bloc (ex. Bloc 1 : DN 1, 2, 5)
      </text>
      <text x={380} y={262} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Hadoop 2 : 2 NameNodes/cluster · Hadoop 3 : 3 NameNodes/cluster · 1 DataNode par machine
      </text>
    </Svg>
  );
}

// ── MapReduce flow ───────────────────────────────────────────────────────────
export function MapReduceFlow() {
  const stages = ["Splitting\n(fragmentation)", "MAP\n(mot ; 1)", "Shuffling\n(mélange/tri)", "REDUCE\n(somme)", "Résultat final"];
  return (
    <Svg viewBox="0 0 760 220">
      <Defs />
      {stages.map((s, i) => (
        <g key={s}>
          <rect x={15 + i * 150} y={60} width={120} height={70} rx={10} className={BOX}
            style={{ stroke: i === 1 || i === 3 ? "#f43f5e" : "#06b6d4", strokeWidth: 2 }} />
          {s.split("\n").map((t, j) => (
            <text key={t} x={75 + i * 150} y={88 + j * 16} textAnchor="middle" className={TXT} fontSize={11} fontWeight={600}>{t}</text>
          ))}
          {i < 4 && <Arrow x1={135 + i * 150} y1={95} x2={165 + i * 150} y2={95} />}
        </g>
      ))}
      <text x={75} y={40} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>« celui qui croyait »</text>
      <text x={225} y={40} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>(celui;1)(qui;1)(croyait;1)…</text>
      <text x={375} y={40} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>(celui;1)(celui;1) → même clef</text>
      <text x={525} y={40} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>TOTAL = TOTAL + 1</text>
      <text x={675} y={40} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>celui : 2 · croyait : 2</text>
      <text x={380} y={175} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Diviser pour régner : découper le problème en sous-tâches exécutées sur différentes machines
      </text>
      <text x={380} y={200} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Exemples : Word Count · statistiques web (logs) · longueur moyenne des mots · voyelles/consonnes
      </text>
    </Svg>
  );
}

// ── Mongo ReplicaSet ─────────────────────────────────────────────────────────
export function MongoReplicaSet() {
  return (
    <Svg viewBox="0 0 760 240">
      <Defs />
      <Node x={70} y={30} w={160} h={40} fill="#f43f5e" label="ClientApplication (Driver)" small />
      <Node x={300} y={110} w={140} h={40} fill="#06b6d4" label="Primary" />
      <Node x={130} y={190} w={130} h={36} fill="#84cc16" label="Secondary" />
      <Node x={480} y={190} w={130} h={36} fill="#84cc16" label="Secondary" />
      <Arrow x1={150} y1={70} x2={330} y2={110} />
      <text x={205} y={95} className={TXT} fontSize={10} fontWeight={600}>Writes</text>
      <Arrow x1={345} y1={110} x2={195} y2={70} />
      <text x={295} y={85} className={TXT} fontSize={10} fontWeight={600}>Reads</text>
      <Arrow x1={310} y1={150} x2={210} y2={190} />
      <Arrow x1={430} y1={150} x2={520} y2={190} />
      <text x={260} y={172} className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>Réplication</text>
      <text x={480} y={172} className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>Réplication</text>
      <text x={380} y={120} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Un seul nœud PRINCIPAL (toutes les requêtes lecture/écriture) ·
      </text>
      <text x={380} y={140} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        les SECONDAIRES répliquent les données lors d'une mise à jour
      </text>
    </Svg>
  );
}

// ── IoT 5 layers ─────────────────────────────────────────────────────────────
export function IotLayers() {
  const layers: [string, string, string][] = [
    ["5. Business (Analyse)", "Big Data (Hadoop, Spark) · IA/ML · KPIs · décision", "#f43f5e"],
    ["4. Application (Services)", "Dashboards (Grafana, ThingsBoard) · alertes · automatisation", "#f97316"],
    ["3. Middleware (Traitement)", "Edge (NVIDIA Jetson) · Cloud (AWS/Azure IoT) · BDD (MongoDB, InfluxDB)", "#8b5cf6"],
    ["2. Réseau (Transport)", "BLE · Zigbee · LoRa · LoRaWAN · NB-IoT · 5G · passerelles", "#06b6d4"],
    ["1. Perception (Physique)", "Capteurs (DHT22, CO₂) · Actionneurs (moteurs, LED) · RFID/NFC", "#10b981"],
  ];
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      {layers.map(([t, d, c], i) => (
        <g key={t}>
          <rect x={80} y={20 + i * 52} width={600} height={44} rx={8} className={BOX} style={{ stroke: c, strokeWidth: 2 }} />
          <text x={95} y={40 + i * 52} className={TXT} fontSize={12} fontWeight={700}>{t}</text>
          <text x={95} y={57 + i * 52} className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>{d}</text>
        </g>
      ))}
      <text x={380} y={290} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Le monde physique (couche 1) est transposé vers le monde de l'information (mapping ITU Y.2060)
      </text>
    </Svg>
  );
}

// ── Android View tree ────────────────────────────────────────────────────────
export function AndroidViewTree() {
  const layouts = ["FrameLayout", "LinearLayout", "RelativeLayout", "TableLayout", "GridLayout"];
  const widgets = ["TextView → EditText, Button, CheckBox…", "ImageView → ImageButton", "ProgressBar → SeekBar, RatingBar", "ListView, GridView, Spinner"];
  return (
    <Svg viewBox="0 0 760 240">
      <Defs />
      <Node x={330} y={20} w={100} h={36} fill="#84cc16" label="View" />
      <Arrow x1={380} y1={56} x2={200} y2={100} />
      <Arrow x1={380} y1={56} x2={560} y2={100} />
      <Node x={100} y={100} w={200} h={36} fill="#06b6d4" label="ViewGroup (layouts)" />
      <Node x={460} y={100} w={200} h={36} fill="#f43f5e" label="Widgets (contrôles)" />
      {layouts.map((l, i) => (
        <g key={l}>
          <line x1={200} y1={136} x2={70 + i * 150} y2={170} className={STROKE} />
          <Node x={20 + i * 150} y={170} w={140} h={30} fill="#06b6d4" label={l} small />
        </g>
      ))}
      {widgets.map((w, i) => (
        <text key={w} x={460} y={165 + i * 20} className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>• {w}</text>
      ))}
    </Svg>
  );
}

// ── Big Data 5V ──────────────────────────────────────────────────────────────
export function BigData5V() {
  const vs: [string, string, string][] = [
    ["Volume", "→ stockage (Zettaoctets)", "#f43f5e"],
    ["Vélocité", "→ traitement (temps réel)", "#f97316"],
    ["Variété", "→ collecte (80% non structuré)", "#8b5cf6"],
    ["Véracité", "→ fiabilité, qualité", "#06b6d4"],
    ["Valeur", "→ LE plus important", "#10b981"],
  ];
  return (
    <Svg viewBox="0 0 760 230">
      <Defs />
      <circle cx={380} cy={105} r={58} className={BOX} style={{ stroke: "#f43f5e", strokeWidth: 3 }} />
      <text x={380} y={100} textAnchor="middle" className={TXT} fontSize={16} fontWeight={800}>BIG</text>
      <text x={380} y={125} textAnchor="middle" className={TXT} fontSize={16} fontWeight={800}>DATA</text>
      {vs.map(([v, d, c], i) => {
        const angle = (i * 2 * Math.PI) / vs.length - Math.PI / 2;
        const cx = 380 + 150 * Math.cos(angle);
        const cy = 105 + 62 * Math.sin(angle);
        return (
          <g key={v}>
            <line x1={380 + 58 * Math.cos(angle)} y1={105 + 58 * Math.sin(angle)} x2={cx - 40 * Math.cos(angle)} y2={cy - 25 * Math.sin(angle)} className={STROKE} />
            <circle cx={cx} cy={cy} r={34} className={BOX} style={{ stroke: c, strokeWidth: 2 }} />
            <text x={cx} y={cy - 2} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>{v}</text>
            <text x={cx} y={cy + 12} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={7}>{d.split("→")[1]}</text>
          </g>
        );
      })}
      <text x={380} y={215} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        3V (Gartner 2001) → 4V (IBM 2012 : + Véracité) → 5V (2015 : + Valeur) → 7V → 10V…
      </text>
    </Svg>
  );
}

// ── ML : K-Means loop ────────────────────────────────────────────────────────
export function KmeansLoop() {
  const steps = ["1. Choisir K", "2. Initialiser les\ncentroïdes", "3. Assigner chaque\npoint au plus proche", "4. Recalculer les\ncentroïdes (moyenne)"];
  return (
    <Svg viewBox="0 0 760 250">
      <Defs />
      {steps.map((s, i) => (
        <g key={s}>
          <rect x={15 + i * 190} y={40} width={165} height={64} rx={10} className={BOX}
            style={{ stroke: i === 0 ? "#a855f7" : "#8b5cf6", strokeWidth: 2 }} />
          {s.split("\n").map((t, j) => (
            <text key={t} x={97.5 + i * 190} y={66 + j * 16} textAnchor="middle" className={TXT} fontSize={11} fontWeight={600}>{t}</text>
          ))}
          {i < 3 && <Arrow x1={180 + i * 190} y1={72} x2={205 + i * 190} y2={72} />}
        </g>
      ))}
      <Arrow x1={715} y1={104} x2={715} y2={150} />
      <line x1={715} y1={150} x2={97} y2={150} className={STROKE} strokeWidth={1.5} strokeDasharray="5 4" markerEnd="url(#arr)" />
      <line x1={97} y1={150} x2={97} y2={112} className={STROKE} strokeWidth={1.5} markerEnd="url(#arr)" />
      <text x={400} y={170} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>
        Non convergé → répéter 3–4
      </text>
      <rect x={300} y={195} width={160} height={34} rx={8} className={BOX} style={{ stroke: "#10b981", strokeWidth: 2 }} />
      <text x={380} y={216} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>Convergé → clusters finaux</text>
      <text x={380} y={245} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        Convergence : les centroïdes ne bougent plus significativement (ou max d&apos;itérations atteint)
      </text>
    </Svg>
  );
}

// ── ML : Elbow method ────────────────────────────────────────────────────────
export function KmeansElbow() {
  const pts: [number, number][] = [[80, 40], [170, 85], [260, 118], [350, 136], [440, 146], [530, 152], [620, 155], [700, 157]];
  const labels = ["K=1", "K=2", "K=3", "K=4", "K=5", "K=6", "K=7", "K=8"];
  return (
    <Svg viewBox="0 0 760 280">
      <Defs />
      <line x1={60} y1={220} x2={730} y2={220} className={STROKE} strokeWidth={1.5} />
      <line x1={60} y1={20} x2={60} y2={220} className={STROKE} strokeWidth={1.5} />
      <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke="#a855f7" strokeWidth={2.5} />
      {pts.map(([x, y], i) => (
        <g key={x}>
          <circle cx={x} cy={y} r={4} className="fill-white" style={{ stroke: "#a855f7", strokeWidth: 2 }} />
          <text x={x} y={238} textAnchor="middle" className={TXT} fontSize={10}>{labels[i]}</text>
        </g>
      ))}
      <circle cx={260} cy={118} r={16} fill="none" stroke="#f43f5e" strokeWidth={2.5} strokeDasharray="4 3" />
      <text x={260} y={90} textAnchor="middle" className="fill-rose-500 dark:fill-rose-400" fontSize={11} fontWeight={700}>Elbow point</text>
      <text x={310} y={105} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>K = 3 bon choix (K = 4 acceptable)</text>
      <text x={400} y={262} textAnchor="middle" className={TXT} fontSize={11}>Nombre de clusters K</text>
      <text x={28} y={120} textAnchor="middle" className={TXT} fontSize={11} transform="rotate(-90 28 120)">Coût J (WCSS)</text>
      <text x={400} y={30} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        J diminue quand K augmente — le « coude » marque le meilleur compromis
      </text>
    </Svg>
  );
}

// ── ML : KNN majority vote ───────────────────────────────────────────────────
export function KnnVote() {
  return (
    <Svg viewBox="0 0 760 250">
      <Defs />
      <circle cx={380} cy={110} r={92} fill="none" stroke="#a855f7" strokeWidth={2} strokeDasharray="6 4" />
      <circle cx={310} cy={80} r={22} className={BOX} style={{ stroke: "#06b6d4", strokeWidth: 2 }} />
      <text x={310} y={85} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>Phoque</text>
      <circle cx={455} cy={95} r={22} className={BOX} style={{ stroke: "#06b6d4", strokeWidth: 2 }} />
      <text x={455} y={100} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>Phoque</text>
      <circle cx={375} cy={165} r={22} className={BOX} style={{ stroke: "#f59e0b", strokeWidth: 2 }} />
      <text x={375} y={170} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>Ours</text>
      <circle cx={380} cy={112} r={13} className={BOX} style={{ stroke: "#a855f7", strokeWidth: 3 }} />
      <text x={380} y={116} textAnchor="middle" className={TXT} fontSize={11} fontWeight={800}>?</text>
      <text x={380} y={35} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>Nouvel animal inconnu + K = 3 voisins</text>
      <Arrow x1={500} y1={110} x2={560} y2={110} />
      <rect x={565} y={70} width={170} height={80} rx={10} className={BOX} style={{ stroke: "#06b6d4", strokeWidth: 2.5 }} />
      <text x={650} y={98} textAnchor="middle" className={TXT} fontSize={12} fontWeight={800}>Classe : PHOQUE</text>
      <text x={650} y={118} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>2 voix / 3 (vote majoritaire)</text>
      <text x={380} y={232} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={11}>
        Étape 1 : choisir K → Étape 2 : calculer les distances → Étape 3 : classe la plus fréquente parmi les K voisins
      </text>
    </Svg>
  );
}

// ── ML : SVM margin ──────────────────────────────────────────────────────────
export function SvmMargin() {
  const setosa: [number, number][] = [[110, 200], [145, 185], [130, 165], [170, 205], [155, 150]];
  const versi: [number, number][] = [[520, 90], [560, 75], [545, 55], [600, 95], [585, 120]];
  return (
    <Svg viewBox="0 0 760 260">
      <Defs />
      <line x1={50} y1={230} x2={730} y2={230} className={STROKE} />
      <line x1={60} y1={20} x2={60} y2={240} className={STROKE} />
      <line x1={200} y1={245} x2={620} y2={15} stroke="#10b981" strokeWidth={2.5} />
      <line x1={155} y1={245} x2={575} y2={15} stroke="#10b981" strokeWidth={1.5} strokeDasharray="6 4" />
      <line x1={245} y1={245} x2={665} y2={15} stroke="#10b981" strokeWidth={1.5} strokeDasharray="6 4" />
      {setosa.map(([x, y], i) => (
        <circle key={`s${i}`} cx={x} cy={y} r={7} fill="#3b82f6" opacity={0.85} />
      ))}
      {versi.map(([x, y], i) => (
        <circle key={`v${i}`} cx={x} cy={y} r={7} fill="#f43f5e" opacity={0.85} />
      ))}
      <circle cx={170} cy={205} r={12} fill="none" stroke="#1d4ed8" strokeWidth={2.5} />
      <circle cx={155} cy={150} r={12} fill="none" stroke="#1d4ed8" strokeWidth={2.5} />
      <circle cx={520} cy={90} r={12} fill="none" stroke="#be123c" strokeWidth={2.5} />
      <circle cx={545} cy={55} r={12} fill="none" stroke="#be123c" strokeWidth={2.5} />
      <text x={110} y={135} className={TXT} fontSize={11} fontWeight={700}>Classe 0 (Setosa)</text>
      <text x={560} y={160} className={TXT} fontSize={11} fontWeight={700}>Classe 1 (Versicolor)</text>
      <text x={430} y={140} className="fill-emerald-600 dark:fill-emerald-400" fontSize={11} fontWeight={700} transform="rotate(-29 430 140)">f(x) = w·x + b = 0</text>
      <line x1={382} y1={130} x2={428} y2={104} className={STROKE} strokeWidth={1.5} markerEnd="url(#arr)" markerStart="url(#arr)" />
      <text x={392} y={98} className={TXT} fontSize={10} fontWeight={700}>marge = 2/‖w‖</text>
      <text x={70} y={40} className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>○ = vecteurs de support (αi &gt; 0)</text>
      <text x={400} y={254} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        L&apos;hyperplan optimal maximise la marge — seuls les points sur les frontières (pointillés) comptent
      </text>
    </Svg>
  );
}

// ── ML : Kernel trick ────────────────────────────────────────────────────────
export function SvmKernel() {
  const ring: [number, number][] = [[70, 60], [110, 55], [135, 90], [110, 130], [70, 135], [45, 95]];
  const inner: [number, number][] = [[80, 85], [98, 105], [78, 108]];
  return (
    <Svg viewBox="0 0 760 260">
      <Defs />
      <text x={115} y={25} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>Espace d&apos;origine — NON séparable</text>
      {ring.map(([x, y], i) => (
        <circle key={`r${i}`} cx={x} cy={y} r={8} fill="#f43f5e" opacity={0.85} />
      ))}
      {inner.map(([x, y], i) => (
        <circle key={`i${i}`} cx={x} cy={y} r={8} fill="#3b82f6" opacity={0.85} />
      ))}
      <text x={115} y={165} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>rouge (anneau) vs bleu (centre)</text>
      <text x={115} y={185} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>aucune droite ne sépare les classes</text>
      <Arrow x1={235} y1={95} x2={330} y2={95} />
      <text x={282} y={75} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>k(xi, xj)</text>
      <text x={282} y={120} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>transformation φ</text>
      <text x={282} y={136} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>« plier la feuille »</text>
      <text x={500} y={25} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>Dimension supérieure — séparable</text>
      <ellipse cx={500} cy={105} rx={95} ry={70} fill="none" className={STROKE} strokeDasharray="4 3" />
      <circle cx={470} cy={85} r={8} fill="#3b82f6" />
      <circle cx={500} cy={105} r={8} fill="#3b82f6" />
      <circle cx={480} cy={120} r={8} fill="#3b82f6" />
      <circle cx={455} cy={55} r={8} fill="#f43f5e" />
      <circle cx={545} cy={50} r={8} fill="#f43f5e" />
      <circle cx={565} cy={80} r={8} fill="#f43f5e" />
      <circle cx={540} cy={135} r={8} fill="#f43f5e" />
      <line x1={420} y1={130} x2={580} y2={45} stroke="#10b981" strokeWidth={2.5} />
      <text x={500} y={192} textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400" fontSize={10} fontWeight={700}>hyperplan séparateur</text>
      <text x={380} y={235} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        Linéaire · Polynomial (γ·⟨xi,xj⟩+r)^d · RBF exp(−γ‖xi−xj‖²) — le dual utilise k(xi,xj) sans calculer l&apos;espace transformé
      </text>
    </Svg>
  );
}

// ── Android : cycle de vie d'une activité ────────────────────────────────────
export function AndroidLifecycle() {
  const cb = (x: number, y: number, label: string, w = 120) => (
    <g>
      <rect x={x} y={y} width={w} height={26} rx={13} className={BOX} style={{ stroke: "#84cc16", strokeWidth: 1.8 }} />
      <text x={x + w / 2} y={y + 17} textAnchor="middle" className={TXT} fontSize={11} fontWeight={600}>{label}</text>
    </g>
  );
  const state = (x: number, y: number, label: string, fill: string) => (
    <g>
      <rect x={x} y={y} width={110} height={28} rx={8} fill={fill} opacity={0.9} />
      <text x={x + 55} y={y + 18} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700}>{label}</text>
    </g>
  );
  const flow = (x1: number, y1: number, x2: number, y2: number) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} className={STROKE} strokeWidth={1.5} markerEnd="url(#arr)" />
  );
  return (
    <Svg viewBox="0 0 760 430">
      <Defs />
      {state(300, 14, "Activity launched", "#3b82f6")}
      {cb(305, 66, "onCreate()")}
      {cb(305, 112, "onStart()")}
      {cb(560, 112, "onRestart()", 120)}
      {cb(305, 158, "onResume()")}
      {state(300, 210, "Activity running", "#84cc16")}
      {cb(305, 268, "onPause()")}
      {cb(305, 324, "onStop()")}
      {cb(305, 380, "onDestroy()")}
      {state(80, 240, "App process killed", "#f43f5e")}
      {state(570, 380, "Activity shut down", "#f97316")}
      {flow(360, 42, 360, 64)}
      {flow(360, 92, 360, 110)}
      {flow(360, 138, 360, 156)}
      {flow(360, 184, 360, 208)}
      <text x={430} y={228} className={TXT} fontSize={9}>l&apos;utilisateur interagit</text>
      {flow(380, 238, 380, 264)}
      <text x={430} y={252} className={TXT} fontSize={9}>autre activité au premier plan</text>
      {flow(360, 294, 360, 322)}
      <text x={430} y={310} className={TXT} fontSize={9}>l&apos;activité n&apos;est plus visible</text>
      {flow(360, 350, 360, 378)}
      <text x={430} y={368} className={TXT} fontSize={9}>finishing ou détruite par le système</text>
      {flow(418, 393, 568, 393)}
      {/* boucle de reprise */}
      <path d="M 425 125 C 500 125 560 130 560 148" fill="none" className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
      <text x={640} y={128} className={TXT} fontSize={9}>l&apos;utilisateur revient</text>
      <path d="M 620 138 C 700 150 700 175 428 172" fill="none" className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
      {/* onPause -> onResume reprise */}
      <path d="M 303 278 C 230 270 230 200 298 200" fill="none" stroke="#10b981" strokeWidth={1.6} markerEnd="url(#arr)" />
      <text x={150} y={205} className="fill-emerald-600 dark:fill-emerald-400" fontSize={9} fontWeight={600}>l&apos;utilisateur revient</text>
      {/* onStop -> onRestart */}
      <path d="M 428 334 C 520 320 560 250 590 140" fill="none" stroke="#0ea5e9" strokeWidth={1.6} markerEnd="url(#arr)" />
      <text x={600} y={250} className="fill-sky-600 dark:fill-sky-400" fontSize={9} fontWeight={600}>onRestart()</text>
      {/* kill */}
      <path d="M 300 282 C 200 280 150 270 135 272" fill="none" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="5 4" markerEnd="url(#arr)" />
      <text x={90} y={296} className="fill-rose-600 dark:fill-rose-400" fontSize={9}>mémoire requise</text>
    </Svg>
  );
}

// ── Android : pile d'activités ───────────────────────────────────────────────
export function AndroidStack() {
  const levels: [string, string][] = [
    ["Nouvelle Activité (en exécution)", "#84cc16"],
    ["Dernière Activité Exécutée", "#3b82f6"],
    ["Activité n-1", "#3b82f6"],
    ["Activité n-2", "#3b82f6"],
    ["Activité 2", "#3b82f6"],
    ["Activité 1", "#3b82f6"],
  ];
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      {levels.map(([label, color], i) => (
        <g key={`s${i}`}>
          <rect x={250} y={28 + i * 38} width={280} height={32} rx={6} fill={color} opacity={0.88} />
          <text x={390} y={48 + i * 38} textAnchor="middle" fill="#fff" fontSize={11.5} fontWeight={600}>{label}</text>
        </g>
      ))}
      <Arrow x1={110} y1={44} x2={244} y2={44} />
      <text x={120} y={30} className={TXT} fontSize={10.5} fontWeight={600}>nouvelle activité démarrée</text>
      <text x={120} y={62} className={TXT} fontSize={9}>placée en HAUT de la pile</text>
      <path d="M 120 150 C 190 150 210 130 244 112" fill="none" className={STROKE} strokeWidth={1.5} strokeDasharray="5 4" markerEnd="url(#arr)" />
      <text x={80} y={140} className={TXT} fontSize={10.5} fontWeight={600}>bouton Retour ↺</text>
      <text x={80} y={172} className={TXT} fontSize={9}>ou activité fermée :</text>
      <text x={80} y={186} className={TXT} fontSize={9}>l&apos;activité précédente</text>
      <text x={80} y={200} className={TXT} fontSize={9}>devient active</text>
      <Arrow x1={640} y1={230} x2={536} y2={230} />
      <text x={650} y={222} className="fill-rose-600 dark:fill-rose-400" fontSize={10.5} fontWeight={600}>supprimer</text>
      <text x={650} y={238} className="fill-rose-600 dark:fill-rose-400" fontSize={9}>pour libérer</text>
      <text x={650} y={252} className="fill-rose-600 dark:fill-rose-400" fontSize={9}>des ressources</text>
      <text x={380} y={280} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        Les activités sont gérées sous forme de pile (LIFO) — seule l&apos;activité du haut interagit avec l&apos;utilisateur
      </text>
    </Svg>
  );
}

// ── Android : architecture logicielle (Linux Inside) ─────────────────────────
export function AndroidArch() {
  const band = (y: number, h: number, fill: string, label: string) => (
    <g>
      <rect x={60} y={y} width={520} height={h} rx={9} fill={fill} opacity={0.14} />
      <text x={74} y={y + 16} className={TXT} fontSize={10.5} fontWeight={800} fill={fill}>{label}</text>
    </g>
  );
  const chip = (x: number, y: number, w: number, label: string, stroke: string) => (
    <g>
      <rect x={x} y={y} width={w} height={22} rx={5} className={BOX} style={{ stroke, strokeWidth: 1.4 }} />
      <text x={x + w / 2} y={y + 15} textAnchor="middle" className={TXT} fontSize={9.5} fontWeight={600}>{label}</text>
    </g>
  );
  const k = "#3b82f6", f = "#8b5cf6", l = "#10b981", r = "#f97316", n = "#f43f5e";
  return (
    <Svg viewBox="0 0 760 420">
      <Defs />
      {band(12, 64, k, "APPLICATIONS")}
      {["Home", "Contacts", "Phone", "Browser", "…"].map((t, i) => (
        <g key={`android-app-${i}`}>{chip(74 + i * 100, 36, 92, t, k)}</g>
      ))}
      {band(84, 128, f, "APPLICATION FRAMEWORK  (fournit les classes pour créer des applications Android)")}
      {chip(74, 108, 122, "Activity Manager", f)}
      {chip(204, 108, 122, "Window Manager", f)}
      {chip(334, 108, 122, "Content Providers", f)}
      {chip(464, 108, 100, "View System", f)}
      {chip(74, 136, 122, "Package Manager", f)}
      {chip(204, 136, 122, "Telephony Manager", f)}
      {chip(334, 136, 122, "Resource Manager", f)}
      {chip(464, 136, 100, "Location Mgr", f)}
      {chip(74, 164, 122, "Notification Mgr", f)}
      {chip(204, 164, 122, "Intents / Actions", f)}
      <text x={600} y={150} className={TXT} fontSize={9.5}>Activity Manager (Intents,</text>
      <text x={600} y={162} className={TXT} fontSize={9.5}>Actions) · Location Manager</text>
      <text x={600} y={174} className={TXT} fontSize={9.5}>(GPS) · Notification Manager</text>
      <text x={600} y={186} className={TXT} fontSize={9.5}>(vibreur, son, LED) · Telephony</text>
      <text x={600} y={198} className={TXT} fontSize={9.5}>Manager (contacts, SMS…)</text>
      {band(220, 96, l, "LIBRARIES  (via JNI)")}
      {chip(74, 244, 110, "Surface Manager", l)}
      {chip(192, 244, 110, "Media Framework", l)}
      {chip(310, 244, 80, "SQL Lite", l)}
      {chip(398, 244, 80, "OpenGL", l)}
      {chip(486, 244, 80, "WebKit", l)}
      {chip(74, 272, 110, "Audio Manager", l)}
      {chip(192, 272, 110, "SGL", l)}
      {chip(310, 272, 80, "SSL", l)}
      {chip(398, 272, 80, "Libc", l)}
      <rect x={596} y={232} width={150} height={72} rx={9} fill="#f97316" opacity={0.15} />
      <text x={671} y={250} textAnchor="middle" className={TXT} fontSize={10} fontWeight={800} fill={r}>ANDROID RUNTIME</text>
      {chip(612, 260, 118, "Core Libraries", r)}
      {chip(612, 286, 118, "Android Runtime (ART)", r)}
      {band(324, 84, n, "LINUX KERNEL  (v3.4 pour Lollipop 5.1)")}
      {chip(74, 348, 118, "Display Driver", n)}
      {chip(200, 348, 118, "Camera Driver", n)}
      {chip(326, 348, 122, "Flash Memory Driver", n)}
      {chip(456, 348, 108, "Binder (IPC) Driver", n)}
      {chip(74, 376, 118, "Keypad Driver", n)}
      {chip(200, 376, 118, "WiFi Driver", n)}
      {chip(326, 376, 122, "Audio Driver", n)}
      {chip(456, 376, 108, "Power Management", n)}
      <text x={380} y={412} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>
        Linux kernel : hardware drivers, process &amp; memory management, security, network, power — couche d&apos;abstraction HW · ARM (RISC) · FAT32 · TCP/IP, UDP
      </text>
    </Svg>
  );
}

// ── Android : natif / hybride / web mobile ───────────────────────────────────
export function AndroidDevTypes() {
  const phone = (x: number, title: string, color: string, rows: string[]) => (
    <g>
      <rect x={x} y={30} width={190} height={230} rx={16} className={BOX} style={{ stroke: color, strokeWidth: 2.2 }} />
      <rect x={x + 55} y={18} width={80} height={22} rx={8} fill={color} opacity={0.15} />
      <text x={x + 95} y={33} textAnchor="middle" className={TXT} fontSize={11} fontWeight={800} fill={color}>{title}</text>
      {rows.map((label, i) => (
        <g key={`r${i}`}>
          <rect x={x + 20} y={52 + i * 40} width={150} height={32} rx={6} className={BOX} style={{ stroke: color, strokeWidth: 1.4 }} />
          <text x={x + 95} y={72 + i * 40} textAnchor="middle" className={TXT} fontSize={10} fontWeight={600}>{label}</text>
        </g>
      ))}
    </g>
  );
  const backend = (x: number, links: [string, string][]) => (
    <g>
      {links.map(([t, _], i) => (
        <text key={`l${i}`} x={x + 95} y={290 + i * 13} textAnchor="middle" className="fill-sky-600 dark:fill-sky-400" fontSize={9.5} fontWeight={700}>{t}</text>
      ))}
      <ellipse cx={x + 95} cy={266} rx={40} ry={12} className={BOX} style={{ stroke: "#3b82f6", strokeWidth: 1.6 }} />
      <text x={x + 95} y={270} textAnchor="middle" className={TXT} fontSize={9} fontWeight={700}>Backend</text>
    </g>
  );
  return (
    <Svg viewBox="0 0 760 320">
      <Defs />
      {phone(40, "Natif", "#84cc16", ["Application Natif", "Device APIs"])}
      {phone(285, "Hybride", "#8b5cf6", ["Container Natif", "web Code", "Plugins", "Device APIs"])}
      {phone(530, "WEB MOBILE", "#f97316", ["Mobile browser", "Web Page", "web Code"])}
      {backend(40, [["SOAP/XML", "REST"]])}
      {backend(285, [["HTML", "REST"]])}
      {backend(530, [["HTML", "REST"]])}
      <text x={135} y={310} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>langage de la plateforme (Java/Kotlin…)</text>
      <text x={380} y={310} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>80% web (HTML/CSS/JS) + 20% surcouche native</text>
      <text x={625} y={310} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>exécutée dans un navigateur (HTML5, CSS3, js)</text>
    </Svg>
  );
}

// ── Android : intents explicites avec résultat (aller-retour) ────────────────
export function AndroidIntentFlow() {
  const box = (x: number, y: number, w: number, h: number, title: string, lines: string[], stroke: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} className={BOX} style={{ stroke, strokeWidth: 2 }} />
      <text x={x + w / 2} y={y + 20} textAnchor="middle" className={TXT} fontSize={11.5} fontWeight={800} fill={stroke}>{title}</text>
      {lines.map((l, i) => (
        <text key={`b${i}`} x={x + 12} y={y + 40 + i * 15} className={TXT} fontSize={9.5}>{l}</text>
      ))}
    </g>
  );
  return (
    <Svg viewBox="0 0 760 330">
      <Defs />
      {box(40, 40, 250, 132, "Activité Parent (appelante)", [
        "① Création de l&apos;Intent + Bundle aller",
        "    myIntent.putExtra(\"lName\", …)",
        "② Lancement de l&apos;activité fille :",
        "    startActivityForResult(myIntent,",
        "        ID_Request_Age);",
        "④ Gestionnaire du résultat retour :",
        "    onActivityResult(requestCode,",
        "        resultCode, data)",
      ], "#3b82f6")}
      {box(470, 40, 250, 132, "Activité Fille (appelée)", [
        "③ Récupération de l&apos;Intent : getIntent()",
        "    + extraction Bundle aller : getExtras()",
        "    Traitement…",
        "⑤ Création Bundle retour + setResult(",
        "    RESULT_OK / RESULT_CANCELED)",
        "⑥ finish() → renvoie le Bundle au parent",
      ], "#8b5cf6")}
      <path d="M 292 70 C 380 40 420 50 462 62" fill="none" stroke="#3b82f6" strokeWidth={2} markerEnd="url(#arr)" />
      <text x={378} y={40} textAnchor="middle" className="fill-sky-600 dark:fill-sky-400" fontSize={10} fontWeight={700}>① Intent (aller)</text>
      <path d="M 462 150 C 400 185 360 185 296 160" fill="none" stroke="#8b5cf6" strokeWidth={2} markerEnd="url(#arr)" />
      <text x={378} y={196} textAnchor="middle" className="fill-violet-600 dark:fill-violet-400" fontSize={10} fontWeight={700}>⑤⑥ Résultat (retour, optionnel)</text>
      <text x={378} y={226} textAnchor="middle" className={TXT} fontSize={9.5}>requestCode : identifie quelle sous-activité est attendue (valeur passée au lancement)</text>
      <text x={378} y={242} textAnchor="middle" className={TXT} fontSize={9.5}>resultCode : état renvoyé par la sous-activité (RESULT_OK, RESULT_CANCELED…)</text>
      <text x={378} y={258} textAnchor="middle" className={TXT} fontSize={9.5}>data : l&apos;Intent retourné, lu avec data.getStringExtra(&quot;result&quot;)</text>
      <text x={378} y={286} textAnchor="middle" className="fill-rose-600 dark:fill-rose-400" fontSize={9.5} fontWeight={700}>
        ⚠ erreur ActivityNotFoundException → déclarer l&apos;activité dans AndroidManifest.xml
      </text>
      <text x={378} y={308} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>
        Intents implicites : ACTION_DIAL (tel) · ACTION_VIEW (web, geo) · ACTION_PICK (contacts) · ACTION_SENDTO (mail)
      </text>
    </Svg>
  );
}

// ── Android : cycle de vie d'un service ──────────────────────────────────────
export function AndroidServiceLifecycle() {
  const step = (x: number, y: number, w: number, label: string, stroke: string, fill?: string) => (
    <g>
      <rect x={x} y={y} width={w} height={34} rx={9} fill={fill ?? "none"} className={fill ? undefined : BOX} style={{ stroke, strokeWidth: 1.8 }} />
      <text x={x + w / 2} y={y + 21} textAnchor="middle" className={TXT} fontSize={10.5} fontWeight={700}>{label}</text>
    </g>
  );
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      {step(60, 24, 170, "Call to startService()", "#3b82f6")}
      {step(90, 84, 110, "onCreate()", "#84cc16")}
      {step(60, 144, 170, "onStartCommand()", "#84cc16")}
      {step(300, 144, 170, "Service running", "#10b981", "#10b98122")}
      {step(540, 144, 180, "arrêté par le client / tâche", "#f43f5e")}
      {step(90, 204, 110, "onDestroy()", "#f97316")}
      {step(60, 264, 170, "Service shut down", "#f43f5e")}
      <Arrow x1={145} y1={58} x2={145} y2={82} />
      <Arrow x1={145} y1={118} x2={145} y2={142} />
      <Arrow x1={232} y1={161} x2={298} y2={161} />
      <Arrow x1={472} y1={161} x2={538} y2={161} />
      <path d="M 630 144 C 630 110 300 100 240 208 C 220 232 205 216 202 218" fill="none" className={STROKE} strokeWidth={1.5} markerEnd="url(#arr)" />
      <Arrow x1={145} y1={238} x2={145} y2={262} />
      <text x={400} y={86} className={TXT} fontSize={10} fontWeight={700}>Méthodes du service :</text>
      <text x={400} y={104} className={TXT} fontSize={9.5}>• onCreate() : création, initialisation</text>
      <text x={400} y={120} className={TXT} fontSize={9.5}>• onStartCommand(i, flags, startId) : démarrage (SDK &gt; 2.0)</text>
      <text x={400} y={136} className={TXT} fontSize={9.5}>• onDestroy() : fermeture du service</text>
      <text x={400} y={158} className={TXT} fontSize={9.5}>• onBind() : communication avec un autre service / activité</text>
      <text x={400} y={186} className={TXT} fontSize={10} fontWeight={700}>Utilisation :</text>
      <text x={400} y={204} className={TXT} fontSize={9.5}>• class MonService extends Service</text>
      <text x={400} y={220} className={TXT} fontSize={9.5}>• startService(intent) / stopService()</text>
      <text x={400} y={236} className={TXT} fontSize={9.5}>• getSystemService() pour les services prédéfinis</text>
      <text x={400} y={252} className={TXT} fontSize={9.5}>• déclaration : &lt;service android:name=&quot;.MyService&quot;/&gt;</text>
      <text x={380} y={288} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>
        LocalService (même processus, accessible par l&apos;application) vs RemoteService (processus différent, sollicitable par plusieurs applications)
      </text>
    </Svg>
  );
}

// ── Android : hiérarchie des boîtes de dialogue ──────────────────────────────
export function AndroidDialogTree() {
  const node = (x: number, y: number, w: number, label: string, stroke: string, dashed?: boolean) => (
    <g>
      <rect x={x} y={y} width={w} height={30} rx={7} className={BOX} style={{ stroke, strokeWidth: 1.8, strokeDasharray: dashed ? "5 4" : undefined }} />
      <text x={x + w / 2} y={y + 19} textAnchor="middle" className={TXT} fontSize={10.5} fontWeight={700}>{label}</text>
    </g>
  );
  return (
    <Svg viewBox="0 0 760 260">
      <Defs />
      {node(300, 20, 160, "android.app.Dialog", "#f43f5e")}
      {node(120, 92, 180, "AlertDialog", "#3b82f6")}
      {node(560, 92, 170, "CharacterPickerDialog", "#8b5cf6")}
      {node(40, 180, 170, "ProgressDialog", "#10b981")}
      {node(250, 180, 170, "DatePickerDialog", "#0ea5e9")}
      {node(460, 180, 170, "TimePickerDialog", "#f97316")}
      {node(300, 236, 320, "… extends Dialog : boîte personnalisée", "#84cc16", true)}
      <line x1={380} y1={50} x2={210} y2={90} className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
      <line x1={380} y1={50} x2={645} y2={90} className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
      <line x1={210} y1={122} x2={125} y2={178} className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
      <line x1={210} y1={122} x2={335} y2={178} className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
      <line x1={210} y1={122} x2={545} y2={178} className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
      <line x1={380} y1={252} x2={380} y2={234} className={STROKE} strokeWidth={1.4} />
      <text x={640} y={200} className={TXT} fontSize={9.5}>AlertDialog : zone d&apos;en-tête, zone de</text>
      <text x={640} y={214} className={TXT} fontSize={9.5}>contenu et 1, 2 ou 3 boutons (positif,</text>
      <text x={640} y={228} className={TXT} fontSize={9.5}>négatif, neutre) — via AlertDialog.Builder</text>
      <text x={60} y={40} className={TXT} fontSize={10} fontWeight={700}>Boîtes de dialogue :</text>
      <text x={60} y={56} className={TXT} fontSize={9.5}>affichage d&apos;informations en mode</text>
      <text x={60} y={70} className={TXT} fontSize={9.5}>modal avec boutons configurables</text>
    </Svg>
  );
}

// ── Sécurité : classification des attaques ───────────────────────────────────
export function SecAttacks() {
  const passive = ["Lecture des messages\n(→ chiffrement)", "Analyse du trafic\n(adresses IP)"];
  const active = ["Usurpation d'identité\n(origine des attaques)", "Rejeu (replay)\n2 phases", "Modification\ndes messages", "Déni de service\n(DoS / DDoS)"];
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      <rect x={300} y={14} width={160} height={34} rx={8} className={BOX} style={{ stroke: "#ef4444", strokeWidth: 2 }} />
      <text x={380} y={36} textAnchor="middle" className={TXT} fontSize={13} fontWeight={700}>Attaques</text>
      <line x1={380} y1={48} x2={190} y2={86} className={STROKE} strokeWidth={1.5} markerEnd="url(#arr)" />
      <line x1={380} y1={48} x2={570} y2={86} className={STROKE} strokeWidth={1.5} markerEnd="url(#arr)" />
      <rect x={90} y={88} width={200} height={30} rx={8} className={BOX} style={{ stroke: "#0ea5e9", strokeWidth: 2 }} />
      <text x={190} y={108} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Passives (espionner)</text>
      <rect x={470} y={88} width={200} height={30} rx={8} className={BOX} style={{ stroke: "#f97316", strokeWidth: 2 }} />
      <text x={570} y={108} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Actives (modifier)</text>
      <text x={190} y={132} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>ne modifient pas les données · difficiles à détecter</text>
      <text x={570} y={132} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>modifient les ressources ou génèrent des faux messages</text>
      {passive.map((t, i) => (
        <g key={i}>
          <line x1={190} y1={118} x2={105 + i * 170} y2={158} className={STROKE} strokeWidth={1.2} markerEnd="url(#arr)" />
          <rect x={35 + i * 170} y={160} width={140} height={44} rx={7} className={BOX} style={{ stroke: "#0ea5e9", strokeWidth: 1.5 }} />
          {t.split("\n").map((line, j) => (
            <text key={j} x={105 + i * 170} y={178 + j * 14} textAnchor="middle" className={TXT} fontSize={10} fontWeight={600}>{line}</text>
          ))}
        </g>
      ))}
      {active.map((t, i) => (
        <g key={i}>
          <line x1={570} y1={118} x2={100 + i * 156 + 70} y2={218} className={STROKE} strokeWidth={1.2} markerEnd="url(#arr)" />
          <rect x={100 + i * 156} y={220} width={140} height={54} rx={7} className={BOX} style={{ stroke: "#f97316", strokeWidth: 1.5 }} />
          {t.split("\n").map((line, j) => (
            <text key={j} x={100 + i * 156 + 70} y={238 + j * 14} textAnchor="middle" className={TXT} fontSize={9.5} fontWeight={600}>{line}</text>
          ))}
        </g>
      ))}
      <text x={380} y={292} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        Protection absolue contre les actives impossible (vulnérabilités hardware, logiciel, protocolaire) → détecter + se remettre
      </text>
    </Svg>
  );
}

// ── Sécurité : ARP Spoofing ─────────────────────────────────────────────────
export function SecArpSpoofing() {
  return (
    <Svg viewBox="0 0 760 280">
      <Defs />
      {/* Pirate */}
      <rect x={310} y={22} width={140} height={48} rx={8} className={BOX} style={{ stroke: "#ef4444", strokeWidth: 2 }} />
      <text x={380} y={42} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Pirate P</text>
      <text x={380} y={58} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>IP_P ↔ MAC_P</text>
      {/* Machines A et B */}
      <rect x={60} y={190} width={150} height={48} rx={8} className={BOX} style={{ stroke: "#3b82f6", strokeWidth: 2 }} />
      <text x={135} y={210} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Machine A</text>
      <text x={135} y={226} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>IP_A ↔ MAC_A</text>
      <rect x={550} y={190} width={150} height={48} rx={8} className={BOX} style={{ stroke: "#3b82f6", strokeWidth: 2 }} />
      <text x={625} y={210} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Machine B</text>
      <text x={625} y={226} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>IP_B ↔ MAC_B</text>
      {/* faux ARP messages */}
      <line x1={330} y1={70} x2={165} y2={185} stroke="#ef4444" strokeWidth={1.6} strokeDasharray="6 4" markerEnd="url(#arr)" />
      <line x1={430} y1={70} x2={595} y2={185} stroke="#ef4444" strokeWidth={1.6} strokeDasharray="6 4" markerEnd="url(#arr)" />
      <text x={120} y={120} className="fill-red-600 dark:fill-red-400" fontSize={10.5} fontWeight={700}>« IP_B ↔ MAC_P »</text>
      <text x={475} y={120} className="fill-red-600 dark:fill-red-400" fontSize={10.5} fontWeight={700}>« IP_A ↔ MAC_P »</text>
      {/* tables ARP empoisonnées */}
      <text x={255} y={247} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>Table ARP de A : IP_B ↔ MAC_P</text>
      <text x={505} y={247} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>Table ARP de B : IP_A ↔ MAC_P</text>
      {/* traffic flows through pirate */}
      <path d="M 210 205 C 300 155, 460 155, 550 205" fill="none" stroke="#ef4444" strokeWidth={1.8} markerEnd="url(#arr)" />
      <text x={380} y={166} textAnchor="middle" className="fill-red-600 dark:fill-red-400" fontSize={10.5} fontWeight={700}>le trafic A ↔ B passe par le pirate</text>
      <text x={380} y={272} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        ARP Spoofing : une fausse correspondance « Adresse IP ↔ Adresse MAC » est communiquée à la machine victime
      </text>
    </Svg>
  );
}

// ── Sécurité : zones de sécurité réseau (DMZ) ───────────────────────────────
export function FirewallZones() {
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      {/* Réseau privé */}
      <ellipse cx={130} cy={150} rx={105} ry={110} fill="none" stroke="#3b82f6" strokeWidth={2} strokeDasharray="7 5" />
      <text x={130} y={62} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Réseau privé</text>
      <text x={130} y={78} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>(LAN non accessible</text>
      <text x={130} y={90} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>depuis l&apos;Internet public)</text>
      {[100, 160].map((y, i) => (
        <g key={i}>
          <rect x={85} y={y} width={90} height={30} rx={6} className={BOX} style={{ stroke: "#3b82f6", strokeWidth: 1.5 }} />
          <text x={130} y={y + 19} textAnchor="middle" className={TXT} fontSize={10} fontWeight={600}>Poste {i + 1}</text>
        </g>
      ))}
      {/* DMZ */}
      <ellipse cx={390} cy={150} rx={100} ry={95} fill="none" stroke="#f59e0b" strokeWidth={2} strokeDasharray="7 5" />
      <text x={390} y={72} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>DMZ</text>
      <text x={390} y={87} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>(zone démilitarisée)</text>
      {[
        { y: 100, label: "Serveur Web" },
        { y: 138, label: "Serveur DNS" },
        { y: 176, label: "Messagerie" },
      ].map((s) => (
        <g key={s.label}>
          <rect x={330} y={s.y} width={120} height={30} rx={6} className={BOX} style={{ stroke: "#f59e0b", strokeWidth: 1.5 }} />
          <text x={390} y={s.y + 19} textAnchor="middle" className={TXT} fontSize={10} fontWeight={600}>{s.label}</text>
        </g>
      ))}
      {/* Firewall between private and DMZ */}
      <rect x={252} y={196} width={76} height={44} rx={8} className={BOX} style={{ stroke: "#ef4444", strokeWidth: 2 }} />
      <text x={290} y={215} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>Firewall</text>
      <text x={290} y={229} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={8.5}>filtrage</text>
      {/* Internet */}
      <ellipse cx={645} cy={150} rx={95} ry={95} fill="none" stroke="#10b981" strokeWidth={2} strokeDasharray="7 5" />
      <text x={645} y={118} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Réseau externe</text>
      <text x={645} y={134} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>(Internet)</text>
      {[70, 105, 140].map((x, i) => (
        <circle key={i} cx={620 + i * 26} cy={168} r={9} fill="none" stroke="#10b981" strokeWidth={1.5} />
      ))}
      {/* links */}
      <line x1={237} y1={150} x2={290} y2={150} className={STROKE} strokeWidth={1.8} markerEnd="url(#arr)" markerStart="url(#arr)" />
      <line x1={290} y1={150} x2={288} y2={150} className={STROKE} />
      <line x1={330} y1={150} x2={290} y2={150} className={STROKE} strokeWidth={1.8} markerEnd="url(#arr)" />
      <line x1={490} y1={150} x2={550} y2={150} className={STROKE} strokeWidth={1.8} markerEnd="url(#arr)" markerStart="url(#arr)" />
      <text x={380} y={286} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        La DMZ héberge les services accessibles à l&apos;Internet public (Web, DNS, messagerie) — le réseau privé reste inaccessible
      </text>
    </Svg>
  );
}

// ── Sécurité : les 6 services de sécurité ───────────────────────────────────
export function SecServices() {
  const services = [
    { t: "Authentification", d: "vérifie l'identité (mot de passe,\nempreinte, certificat numérique)" },
    { t: "Confidentialité", d: "interdit l'interception / l'accès\naux données — assurée par le chiffrement" },
    { t: "Intégrité", d: "empêche la modification\ndes données lors de l'envoi" },
    { t: "Non-répudiation", d: "empêche émetteur et récepteur\nde nier l'envoi d'un message" },
    { t: "Contrôle d'accès", d: "vérifie l'habilitation et définit\nles droits (après authentification)" },
    { t: "Disponibilité", d: "système accessible et utilisable\npar les personnes autorisées" },
  ];
  return (
    <Svg viewBox="0 0 760 320">
      <Defs />
      <rect x={280} y={14} width={200} height={36} rx={8} className={BOX} style={{ stroke: "#ef4444", strokeWidth: 2 }} />
      <text x={380} y={30} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Services de sécurité</text>
      <text x={380} y={44} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>utilisent les mécanismes de sécurité</text>
      {services.map((s, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = 60 + col * 340, y = 78 + row * 82;
        return (
          <g key={s.t}>
            <line x1={380} y1={50} x2={x + 150} y2={y} className={STROKE} strokeWidth={1.2} markerEnd="url(#arr)" />
            <rect x={x} y={y} width={300} height={68} rx={8} className={BOX} style={{ stroke: ["#8b5cf6", "#0ea5e9", "#10b981", "#f59e0b", "#f97316", "#ef4444"][i], strokeWidth: 1.8 }} />
            <text x={x + 150} y={y + 22} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>{s.t}</text>
            {s.d.split("\n").map((line, j) => (
              <text key={j} x={x + 150} y={y + 40 + j * 13} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>{line}</text>
            ))}
          </g>
        );
      })}
      <text x={380} y={310} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        Mécanismes : chiffrement (données illisibles) · signature numérique (origine + intégrité) · certificat numérique (identité, clé publique)
      </text>
    </Svg>
  );
}

// ── DES : les 3 phases ──────────────────────────────────────────────────────
export function DesPhases() {
  const phases = [
    { t: "Phase 1", d: "Permutation initiale IP", n: "64 bits → 64 bits" },
    { t: "Phase 2", d: "16 rounds (substitution +\npermutation, clé Ki de 48 bits)", n: "input/output de 64 bits" },
    { t: "Phase 3", d: "Permutation inverse IP⁻¹", n: "64 bits → 64 bits" },
  ];
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      {/* main flow */}
      <rect x={30} y={30} width={110} height={34} rx={7} className={BOX} style={{ stroke: "#0ea5e9", strokeWidth: 1.8 }} />
      <text x={85} y={52} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>Bloc clair 64 bits</text>
      {phases.map((p, i) => (
        <g key={p.t}>
          <line x1={140 + i * 190} y1={47} x2={170 + i * 190} y2={47} className={STROKE} strokeWidth={1.5} markerEnd="url(#arr)" />
          <rect x={172 + i * 190} y={18} width={168} height={58} rx={8} className={BOX} style={{ stroke: "#ef4444", strokeWidth: 2 }} />
          <text x={256 + i * 190} y={36} textAnchor="middle" className={TXT} fontSize={11.5} fontWeight={700}>{p.t} — {p.d.split("\n")[0]}</text>
          {p.d.split("\n").slice(1).map((line, j) => (
            <text key={j} x={256 + i * 190} y={50 + j * 12} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>{line}</text>
          ))}
          <text x={256 + i * 190} y={70} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={8.5}>{p.n}</text>
        </g>
      ))}
      <line x1={620 + 0} y1={47} x2={655} y2={47} className={STROKE} strokeWidth={1.5} markerEnd="url(#arr)" />
      <rect x={658} y={30} width={80} height={34} rx={7} className={BOX} style={{ stroke: "#0ea5e9", strokeWidth: 1.8 }} />
      <text x={698} y={52} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>Chiffré 64</text>
      {/* round detail */}
      <rect x={172 + 190} y={110} width={168} height={40} rx={7} className={BOX} style={{ stroke: "#f97316", strokeWidth: 1.6 }} />
      <text x={446} y={127} textAnchor="middle" className={TXT} fontSize={10.5} fontWeight={700}>Round i :</text>
      <text x={446} y={141} textAnchor="middle" className={TXT} fontSize={9.5}>L_i = R_(i-1) · R_i = L_(i-1) ⊕ F(R_(i-1), K_i)</text>
      <rect x={172 + 190} y={158} width={168} height={34} rx={7} className={BOX} style={{ stroke: "#f97316", strokeWidth: 1.6 }} />
      <text x={446} y={179} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>32-bit swap (après round 16)</text>
      {/* key schedule */}
      <rect x={30} y={216} width={100} height={34} rx={7} className={BOX} style={{ stroke: "#8b5cf6", strokeWidth: 1.8 }} />
      <text x={80} y={238} textAnchor="middle" className={TXT} fontSize={10.5} fontWeight={700}>Clé 64 bits</text>
      <line x1={130} y1={233} x2={162} y2={233} className={STROKE} strokeWidth={1.5} markerEnd="url(#arr)" />
      <rect x={164} y={216} width={110} height={34} rx={7} className={BOX} style={{ stroke: "#8b5cf6", strokeWidth: 1.6 }} />
      <text x={219} y={231} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>Permuted choice 1</text>
      <text x={219} y={244} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={8.5}>→ 56 bits (C0, D0)</text>
      <line x1={274} y1={233} x2={306} y2={233} className={STROKE} strokeWidth={1.5} markerEnd="url(#arr)" />
      <rect x={308} y={216} width={110} height={34} rx={7} className={BOX} style={{ stroke: "#8b5cf6", strokeWidth: 1.6 }} />
      <text x={363} y={231} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>Rotations à gauche</text>
      <text x={363} y={244} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={8.5}>1 ou 2 bits / round</text>
      <line x1={418} y1={233} x2={450} y2={233} className={STROKE} strokeWidth={1.5} markerEnd="url(#arr)" />
      <rect x={452} y={216} width={110} height={34} rx={7} className={BOX} style={{ stroke: "#8b5cf6", strokeWidth: 1.6 }} />
      <text x={507} y={231} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>Permuted choice 2</text>
      <text x={507} y={244} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={8.5}>→ Ki de 48 bits</text>
      <line x1={562} y1={233} x2={594} y2={233} className={STROKE} strokeWidth={1.5} markerEnd="url(#arr)" />
      <rect x={596} y={216} width={140} height={34} rx={7} className={BOX} style={{ stroke: "#ef4444", strokeWidth: 1.8 }} />
      <text x={666} y={231} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>K1 … K16</text>
      <text x={666} y={244} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={8.5}>une clé par round</text>
      <text x={380} y={284} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        Bloc de 64 bits → IP → 16 rounds → swap des moitiés → IP⁻¹ — chaque round applique une clé intermédiaire Ki de 48 bits
      </text>
    </Svg>
  );
}

// ── DES : la fonction F ─────────────────────────────────────────────────────
export function DesFonctionF() {
  const steps = [
    { t: "R (32 bits)", d: "moitié droite" },
    { t: "Expansion E", d: "32 → 48 bits\n(duplique 16 bits)" },
    { t: "⊕ Ki", d: "XOR avec la clé\nde round (48 bits)" },
    { t: "8 S-boxes", d: "6 bits → 4 bits\n(première+der. bit = ligne,\n4 bits du milieu = colonne)" },
    { t: "Permutation P", d: "32 bits permutés" },
  ];
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      {steps.map((s, i) => {
        const x = 20 + i * 148;
        return (
          <g key={s.t}>
            {i > 0 && <line x1={x - 26} y1={72} x2={x} y2={72} className={STROKE} strokeWidth={1.6} markerEnd="url(#arr)" />}
            <rect x={x} y={40} width={128} height={64} rx={8} className={BOX} style={{ stroke: ["#0ea5e9", "#8b5cf6", "#f97316", "#ef4444", "#10b981"][i], strokeWidth: 2 }} />
            <text x={x + 64} y={62} textAnchor="middle" className={TXT} fontSize={11.5} fontWeight={700}>{s.t}</text>
            {s.d.split("\n").map((line, j) => (
              <text key={j} x={x + 64} y={78 + j * 11} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={8.5}>{line}</text>
            ))}
          </g>
        );
      })}
      {/* S-box zoom */}
      <rect x={90} y={140} width={230} height={110} rx={8} className={BOX} style={{ stroke: "#ef4444", strokeWidth: 1.6 }} />
      <text x={205} y={162} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>Zoom S-box (ex. cours)</text>
      <text x={205} y={182} textAnchor="middle" className={TXT} fontSize={10}>entrée 011001</text>
      <text x={205} y={200} textAnchor="middle" className="fill-red-600 dark:fill-red-400" fontSize={10}>0 [1100] 1</text>
      <text x={205} y={218} textAnchor="middle" className={TXT} fontSize={9.5}>ligne = 01 (bits extrêmes)</text>
      <text x={205} y={234} textAnchor="middle" className={TXT} fontSize={9.5}>colonne = 1100 = 12</text>
      <text x={205} y={244} textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400" fontSize={9.5} fontWeight={700}>S1 → 9 · S2 → 6</text>
      {/* flow note */}
      <rect x={370} y={140} width={370} height={110} rx={8} className={BOX} style={{ stroke: "#0ea5e9", strokeWidth: 1.6 }} />
      <text x={555} y={162} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>Dimensions</text>
      <text x={555} y={182} textAnchor="middle" className={TXT} fontSize={10}>R : 32 bits → expansion : 48 bits</text>
      <text x={555} y={198} textAnchor="middle" className={TXT} fontSize={10}>XOR avec Ki (48 bits) → 8 × 6 bits</text>
      <text x={555} y={214} textAnchor="middle" className={TXT} fontSize={10}>8 S-boxes → 8 × 4 = 32 bits</text>
      <text x={555} y={230} textAnchor="middle" className={TXT} fontSize={10}>permutation P → 32 bits</text>
      <text x={555} y={244} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={8.5}>F(R_(i-1), K_i) est XORée avec L_(i-1) pour donner R_i</text>
      <text x={380} y={282} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        La fonction F (« mangler function ») : expansion → XOR avec Ki → substitution (8 S-boxes) → permutation
      </text>
    </Svg>
  );
}

// ── DES : génération des clés ───────────────────────────────────────────────
export function DesCles() {
  const rows = [
    { t: "Clé initiale", d: "64 bits", s: "#0ea5e9" },
    { t: "PC1 (Permuted Choice 1)", d: "56 bits organisés en C0 (28) et D0 (28)", s: "#8b5cf6" },
    { t: "Rotations circulaires à gauche", d: "1 ou 2 bits selon le round (table : 1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1)", s: "#f97316" },
    { t: "PC2 (Permuted Choice 2)", d: "sélectionne 48 bits parmi 56", s: "#f59e0b" },
    { t: "Ki", d: "clé intermédiaire de 48 bits du round i (16 clés au total)", s: "#ef4444" },
  ];
  return (
    <Svg viewBox="0 0 760 330">
      <Defs />
      {rows.map((r, i) => {
        const y = 20 + i * 60;
        return (
          <g key={r.t}>
            {i > 0 && <line x1={380} y1={y - 26} x2={380} y2={y} className={STROKE} strokeWidth={1.6} markerEnd="url(#arr)" />}
            <rect x={170} y={y} width={420} height={46} rx={8} className={BOX} style={{ stroke: r.s, strokeWidth: 2 }} />
            <text x={380} y={y + 19} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>{r.t}</text>
            <text x={380} y={y + 36} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>{r.d}</text>
          </g>
        );
      })}
      <text x={110} y={100} className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>8ème bit de chaque</text>
      <text x={110} y={113} className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>octet ignoré :</text>
      <text x={110} y={129} className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>7 × 8 = 56 bits</text>
      <text x={110} y={230} className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>clé différente</text>
      <text x={110} y={243} className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>à chaque round</text>
      <text x={110} y={259} className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>(grâce au décalage)</text>
      <text x={380} y={320} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        La clé de 64 bits (56 utiles) génère les 16 clés de round de 48 bits : PC1 → rotations → PC2
      </text>
    </Svg>
  );
}

// ── AES : les 3 types de clés ───────────────────────────────────────────────
export function AesKeys() {
  const cells = [
    { k: "K0", d: "Phase 1", s: "#10b981" },
    { k: "K1", d: "Round 1", s: "#0ea5e9" },
    { k: "K2", d: "Round 2", s: "#0ea5e9" },
    { k: "…", d: "…", s: "#94a3b8" },
    { k: "K9", d: "Round 9", s: "#0ea5e9" },
    { k: "K10", d: "Round 10", s: "#0ea5e9" },
  ];
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      {/* clé secrète */}
      <rect x={60} y={26} width={190} height={40} rx={8} className={BOX} style={{ stroke: "#ef4444", strokeWidth: 2 }} />
      <text x={155} y={44} textAnchor="middle" className={TXT} fontSize={11.5} fontWeight={700}>Clé secrète</text>
      <text x={155} y={59} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>128 bits (AES-128)</text>
      <line x1={250} y1={46} x2={300} y2={46} className={STROKE} strokeWidth={1.6} markerEnd="url(#arr)" />
      <text x={275} y={36} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>extension</text>
      {/* clé étendue */}
      <rect x={302} y={26} width={330} height={40} rx={8} className={BOX} style={{ stroke: "#8b5cf6", strokeWidth: 2 }} />
      <text x={467} y={44} textAnchor="middle" className={TXT} fontSize={11.5} fontWeight={700}>Clé étendue</text>
      <text x={467} y={59} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>générée à partir de la clé secrète — (10+1) × 128 = 1408 bits</text>
      <line x1={467} y1={66} x2={467} y2={100} className={STROKE} strokeWidth={1.6} markerEnd="url(#arr)" />
      <text x={500} y={88} className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>découpage en portions de 128 bits</text>
      {/* clés intermédiaires */}
      <text x={380} y={122} textAnchor="middle" className={TXT} fontSize={11.5} fontWeight={700}>Clés intermédiaires (portions de 128 bits)</text>
      {cells.map((c, i) => {
        const x = 60 + i * 110;
        return (
          <g key={c.k}>
            <rect x={x} y={136} width={96} height={52} rx={7} className={BOX} style={{ stroke: c.s, strokeWidth: 1.8 }} />
            <text x={x + 48} y={158} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>{c.k}</text>
            <text x={x + 48} y={176} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>{c.d}</text>
          </g>
        );
      })}
      <line x1={108} y1={188} x2={108} y2={222} className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
      <line x1={702} y1={188} x2={702} y2={222} className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
      <rect x={30} y={224} width={156} height={34} rx={7} className={BOX} style={{ stroke: "#10b981", strokeWidth: 1.6 }} />
      <text x={108} y={245} textAnchor="middle" className={TXT} fontSize={10} fontWeight={600}>transformation initiale</text>
      <rect x={624} y={224} width={156} height={34} rx={7} className={BOX} style={{ stroke: "#0ea5e9", strokeWidth: 1.6 }} />
      <text x={702} y={245} textAnchor="middle" className={TXT} fontSize={10} fontWeight={600}>round 10</text>
      <text x={380} y={288} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        AES-192 : (12+1) × 128 = 1664 bits (12 rounds) · AES-256 : (14+1) × 128 = 1920 bits (14 rounds) · bloc toujours 128 bits
      </text>
    </Svg>
  );
}

// ── Modes : chaînage CBC ────────────────────────────────────────────────────
export function ModesCbc() {
  const blocks = [0, 1, 2];
  return (
    <Svg viewBox="0 0 760 320">
      <Defs />
      {/* IV */}
      <rect x={40} y={54} width={80} height={30} rx={6} className={BOX} style={{ stroke: "#a855f7", strokeWidth: 1.8 }} />
      <text x={80} y={73} textAnchor="middle" className={TXT} fontSize={10.5} fontWeight={700}>IV</text>
      {blocks.map((i) => {
        const x = 170 + i * 200;
        return (
          <g key={`c${i}`}>
            <rect x={x} y={20} width={130} height={28} rx={6} className={BOX} style={{ stroke: "#0ea5e9", strokeWidth: 1.5 }} />
            <text x={x + 65} y={39} textAnchor="middle" className={TXT} fontSize={10} fontWeight={600}>Bloc en clair {i + 1}</text>
          </g>
        );
      })}
      {blocks.map((i) => {
        const x = 170 + i * 200;
        const prevX = i === 0 ? 80 : 170 + (i - 1) * 200 + 65;
        const xorX = x - 22;
        return (
          <g key={`f${i}`}>
            {/* XOR circle */}
            <circle cx={xorX + 65} cy={95} r={11} fill="none" stroke="#f97316" strokeWidth={2} />
            <line x1={xorX + 59} y1={89} x2={xorX + 71} y2={101} stroke="#f97316" strokeWidth={1.6} />
            <line x1={xorX + 59} y1={101} x2={xorX + 71} y2={89} stroke="#f97316" strokeWidth={1.6} />
            {/* plaintext into xor */}
            <line x1={x + 65} y1={48} x2={x + 65} y2={84} className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
            {/* prev cipher / IV into xor */}
            {i === 0 ? (
              <path d={`M 80 84 C 80 95, ${xorX + 30} 95, ${xorX + 53} 95`} fill="none" className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
            ) : (
              <path d={`M ${prevX} 190 C ${prevX} 95, ${xorX + 20} 95, ${xorX + 53} 95`} fill="none" className={STROKE} strokeWidth={1.4} strokeDasharray="5 4" markerEnd="url(#arr)" />
            )}
            {/* xor into encryption */}
            <line x1={x + 65} y1={106} x2={x + 65} y2={128} className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
            {/* encryption box */}
            <rect x={x} y={130} width={130} height={40} rx={7} className={BOX} style={{ stroke: "#ef4444", strokeWidth: 1.8 }} />
            <text x={x + 65} y={147} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>block cipher</text>
            <text x={x + 65} y={161} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>encryption</text>
            {/* key into encryption */}
            <text x={x - 12} y={155} textAnchor="end" className={TXT} fontSize={10} fontWeight={600}>Key</text>
            <line x1={x - 8} y1={151} x2={x} y2={151} className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
            {/* output cipher */}
            <line x1={x + 65} y1={170} x2={x + 65} y2={196} className={STROKE} strokeWidth={1.4} markerEnd="url(#arr)" />
            <rect x={x} y={198} width={130} height={28} rx={6} className={BOX} style={{ stroke: "#10b981", strokeWidth: 1.5 }} />
            <text x={x + 65} y={217} textAnchor="middle" className={TXT} fontSize={10} fontWeight={600}>Bloc chiffré {i + 1}</text>
          </g>
        );
      })}
      <text x={80} y={104} className="fill-zinc-500 dark:fill-zinc-400" fontSize={8.5} textAnchor="middle">Vecteur</text>
      <text x={80} y={114} className="fill-zinc-500 dark:fill-zinc-400" fontSize={8.5} textAnchor="middle">d&apos;Init.</text>
      <text x={380} y={266} textAnchor="middle" className={TXT} fontSize={10.5} fontWeight={700}>
        Chiffrement C_i = E_K(P_i ⊕ C_(i-1)) · déchiffrement P_i = D_K(C_i) ⊕ C_(i-1) (premier bloc : XOR avec IV)
      </text>
      <text x={380} y={288} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        Deux blocs en clair identiques → blocs chiffrés différents · seulement la clé K sur un canal sécurisé · IV différent à chaque message
      </text>
      <text x={380} y={308} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        L&apos;émetteur et le récepteur échangent la clé K, le IV et le message chiffré
      </text>
    </Svg>
  );
}

// ── SOA : les 3 acteurs et le fonctionnement ────────────────────────────────
export function SoaTriangle() {
  return (
    <Svg viewBox="0 0 760 340">
      <Defs />
      <Node x={280} y={30} w={200} h={52} fill="#3b82f6" label="Annuaire / Entrepôt (UDDI)" />
      <text x={380} y={98} textAnchor="middle" className={TXT} fontSize={10}>stocke les Descriptions WSDL</text>
      <Node x={60} y={220} w={190} h={70} fill="#10b981" label="Client (Service Requester)" />
      <text x={155} y={246} textAnchor="middle" className={TXT} fontSize={9}>Application + Proxy</text>
      <text x={155} y={262} textAnchor="middle" className={TXT} fontSize={9}>+ Description WSDL</text>
      <Node x={510} y={220} w={190} h={70} fill="#f43f5e" label="Fournisseur (Service Provider)" />
      <text x={605} y={246} textAnchor="middle" className={TXT} fontSize={9}>Web Service + Application</text>
      <text x={605} y={262} textAnchor="middle" className={TXT} fontSize={9}>+ Description WSDL</text>
      <Arrow x1={455} y1={85} x2={575} y2={215} />
      <text x={560} y={140} className={TXT} fontSize={10} fontWeight={700}>2. Publication (publier)</text>
      <Arrow x1={240} y1={215} x2={330} y2={90} />
      <text x={90} y={140} className={TXT} fontSize={10} fontWeight={700}>3. Découverte (chercher)</text>
      <Arrow x1={255} y1={255} x2={505} y2={255} />
      <Arrow x1={505} y1={275} x2={255} y2={275} />
      <text x={380} y={225} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>4. Invocation (consommer)</text>
      <text x={380} y={296} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>via SOAP + Bus ESB</text>
      <text x={640} y={30} className={TXT} fontSize={10} fontWeight={700}>1. Déploiement</text>
      <Arrow x1={665} y1={36} x2={665} y2={210} dashed />
      <text x={380} y={330} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        Le fournisseur publie sa description WSDL dans l&apos;annuaire ; le client la cherche puis consomme le service
      </text>
    </Svg>
  );
}

// ── SOA : niveau d'abstraction grandissant ──────────────────────────────────
export function SoaAbstraction() {
  const steps = [
    { x: 30, label: "Programmation Procédurale", sub: "fonctions" },
    { x: 210, label: "Programmation Orientée Objets", sub: "encapsulation, méthodes" },
    { x: 395, label: "Programmation Orientée Composants", sub: "boîte noire, distribué" },
    { x: 585, label: "Programmation Orientée Services", sub: "contrat, couplage lâche" },
  ];
  return (
    <Svg viewBox="0 0 760 240">
      <Defs />
      <path d="M30 200 C 250 195 480 120 700 55" fill="none" stroke="#3b82f6" strokeWidth={3} opacity={0.35} markerEnd="url(#arr)" />
      {steps.map((s, i) => (
        <g key={i}>
          <circle cx={s.x + 70} cy={196 - i * 45} r={9 + i * 3} fill="#3b82f6" opacity={0.8} />
          <text x={s.x + 70} y={228} textAnchor="middle" className={TXT} fontSize={10.5} fontWeight={700}>{s.label}</text>
          <text x={s.x + 70} y={214} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>{s.sub}</text>
        </g>
      ))}
      <text x={380} y={26} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Niveau d&apos;abstraction grandissant →</text>
      <text x={380} y={240} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        De la procédurale à l&apos;orientée services : réutilisabilité et couplage lâche croissants
      </text>
    </Svg>
  );
}

// ── Pile protocolaire SOAP WS ───────────────────────────────────────────────
export function SoapStack() {
  const layers = [
    { label: "Découverte / Publication — UDDI", fill: "#3b82f6" },
    { label: "Description — WSDL", fill: "#8b5cf6" },
    { label: "Communication — SOAP", fill: "#10b981" },
    { label: "Transport — HTTP (HTTPS)", fill: "#f59e0b" },
  ];
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      {layers.map((l, i) => (
        <g key={i}>
          <rect x={80} y={40 + i * 55} width={420} height={44} rx={8} className={BOX} style={{ stroke: l.fill, strokeWidth: 2 }} />
          <text x={290} y={40 + i * 55 + 27} textAnchor="middle" className={TXT} fontSize={12.5} fontWeight={700}>{l.label}</text>
        </g>
      ))}
      <rect x={540} y={40} width={190} height={187} rx={8} className={BOX} style={{ stroke: "#f43f5e", strokeWidth: 2, strokeDasharray: "6 4" }} />
      <text x={635} y={70} textAnchor="middle" className={TXT} fontSize={11.5} fontWeight={700}>Mécanismes non</text>
      <text x={635} y={86} textAnchor="middle" className={TXT} fontSize={11.5} fontWeight={700}>fonctionnels</text>
      <text x={635} y={118} textAnchor="middle" className={TXT} fontSize={11}>Sécurité</text>
      <text x={635} y={140} textAnchor="middle" className={TXT} fontSize={11}>Transaction</text>
      <text x={635} y={162} textAnchor="middle" className={TXT} fontSize={11}>…….</text>
      <Arrow x1={540} y1={133} x2={502} y2={133} dashed />
      <text x={380} y={272} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        Chaque couche s&apos;appuie sur la couche inférieure — la sécurité et les transactions traversent toute la pile
      </text>
    </Svg>
  );
}

// ── Message SOAP : simple vs avec pièces jointes ────────────────────────────
export function SoapMessage() {
  return (
    <Svg viewBox="0 0 760 320">
      <Defs />
      <rect x={60} y={30} width={280} height={250} rx={10} className={BOX} style={{ stroke: "#3b82f6", strokeWidth: 2.5 }} />
      <text x={200} y={56} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Envelope (obligatoire)</text>
      <rect x={85} y={70} width={230} height={62} rx={8} className={BOX} style={{ stroke: "#8b5cf6", strokeWidth: 2 }} />
      <text x={200} y={95} textAnchor="middle" className={TXT} fontSize={11} fontWeight={600}>Header (optionnel)</text>
      <text x={200} y={112} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>entrées : encodingStyle · role · mustUnderstand · relay</text>
      <rect x={85} y={145} width={230} height={118} rx={8} className={BOX} style={{ stroke: "#10b981", strokeWidth: 2 }} />
      <text x={200} y={170} textAnchor="middle" className={TXT} fontSize={11} fontWeight={600}>Body (obligatoire, unique)</text>
      <text x={200} y={190} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>données applicatives → récepteur final</text>
      <rect x={100} y={205} width={200} height={44} rx={8} style={{ fill: "#fecaca", stroke: "#f43f5e", strokeWidth: 2 }} opacity={0.9} />
      <text x={200} y={224} textAnchor="middle" className="fill-red-800 dark:fill-red-300" fontSize={10.5} fontWeight={700}>Fault (si message d&apos;erreur)</text>
      <text x={200} y={240} textAnchor="middle" className="fill-red-800 dark:fill-red-300" fontSize={9}>Code/Value · Reason · Node · Detail · Role</text>
      <rect x={420} y={30} width={280} height={250} rx={10} className={BOX} style={{ stroke: "#f59e0b", strokeWidth: 2.5 }} />
      <text x={560} y={56} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>MIME envelope (avec pièces jointes)</text>
      <rect x={445} y={70} width={230} height={70} rx={8} className={BOX} style={{ stroke: "#3b82f6", strokeWidth: 2 }} />
      <text x={560} y={98} textAnchor="middle" className={TXT} fontSize={11} fontWeight={600}>Primary MIME part</text>
      <text x={560} y={116} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>message SOAP + Manifest Header</text>
      <rect x={445} y={152} width={230} height={38} rx={8} className={BOX} style={{ stroke: "#f43f5e", strokeWidth: 2 }} />
      <text x={560} y={176} textAnchor="middle" className={TXT} fontSize={11}>Attachment (payload 1)</text>
      <rect x={445} y={200} width={230} height={38} rx={8} className={BOX} style={{ stroke: "#f43f5e", strokeWidth: 2 }} />
      <text x={560} y={224} textAnchor="middle" className={TXT} fontSize={11}>Attachment (payload n) …</text>
      <Arrow x1={560} y1={140} x2={560} y2={148} />
      <text x={380} y={306} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        Les payloads non-XML sont référencés depuis le Manifest Header via XLink (cid:payload-1, …)
      </text>
    </Svg>
  );
}

// ── REST : ressource + CRUD ─────────────────────────────────────────────────
export function RestCrud() {
  const verbs = [
    { v: "GET", crud: "Read", fill: "#10b981", ex: "/api/students/1 → lire" },
    { v: "POST", crud: "Create", fill: "#3b82f6", ex: "/api/students → créer" },
    { v: "PUT", crud: "Update", fill: "#f59e0b", ex: "/api/students/1 → modifier" },
    { v: "DELETE", crud: "Delete", fill: "#f43f5e", ex: "/api/students/1 → supprimer" },
  ];
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      <Node x={280} y={40} w={220} h={64} fill="#3b82f6" label="Ressource" />
      <text x={390} y={122} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>identifiée par une URI unique</text>
      <text x={390} y={140} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>/api/students/1 — entité physique ou virtuelle</text>
      <text x={390} y={166} textAnchor="middle" className={TXT} fontSize={10}>représentation échangée : JSON, XML, XHTML, CSV…</text>
      {verbs.map((vb, i) => (
        <g key={i}>
          <rect x={40 + (i % 2) * 360} y={190 + Math.floor(i / 2) * 55} width={150} height={40} rx={8} className={BOX} style={{ stroke: vb.fill, strokeWidth: 2 }} />
          <text x={115 + (i % 2) * 360} y={207 + Math.floor(i / 2) * 55} textAnchor="middle" className={TXT} fontSize={11.5} fontWeight={700}>{vb.v}</text>
          <text x={115 + (i % 2) * 360} y={222 + Math.floor(i / 2) * 55} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>{vb.crud}</text>
          <Arrow x1={190 + (i % 2) * 360} y1={210 + Math.floor(i / 2) * 55} x2={300 + (i % 2) * 340} y2={130} dashed />
          <text x={475} y={205 + Math.floor(i / 2) * 55} className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>{vb.ex}</text>
        </g>
      ))}
      <text x={380} y={290} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>
        Stateful ? Non : chaque requête contient tout son état — le serveur ne garde aucune session
      </text>
    </Svg>
  );
}

// ── gRPC : architecture et 4 modes ──────────────────────────────────────────
export function GrpcArch() {
  return (
    <Svg viewBox="0 0 760 280">
      <Defs />
      <Node x={40} y={50} w={110} h={50} fill="#3b82f6" label="Client" />
      <Node x={210} y={50} w={150} h={50} fill="#8b5cf6" label="Protobuf" />
      <text x={285} y={42} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>sérialisation</text>
      <rect x={410} y={50} width={110} height={50} rx={8} className={BOX} style={{ stroke: "#10b981", strokeWidth: 2.5 }} />
      <text x={465} y={80} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>HTTP/2</text>
      <Node x={570} y={50} w={150} h={50} fill="#8b5cf6" label="Protobuf" />
      <text x={645} y={42} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>désérialisation</text>
      <Node x={40} y={170} w={110} h={44} fill="#f43f5e" label="Serveur" />
      <Arrow x1={152} y1={75} x2={206} y2={75} />
      <Arrow x1={362} y1={75} x2={406} y2={75} />
      <Arrow x1={522} y1={75} x2={566} y2={75} />
      <Arrow x1={570} y1={100} x2={100} y2={168} />
      <text x={380} y={120} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={10}>fichier .proto = contrat strict (IDL) — code généré multi-langages</text>
      {[
        { x: 40, t: "Unary RPC", d: "requête → réponse" },
        { x: 230, t: "Server Streaming", d: "flux de réponses" },
        { x: 420, t: "Client Streaming", d: "flux de requêtes" },
        { x: 610, t: "Bidirectionnel", d: "temps réel" },
      ].map((m, i) => (
        <g key={i}>
          <rect x={m.x} y={225} width={140} height={40} rx={8} className={BOX} style={{ stroke: "#3b82f6", strokeWidth: 1.5 }} />
          <text x={m.x + 70} y={242} textAnchor="middle" className={TXT} fontSize={10} fontWeight={700}>{m.t}</text>
          <text x={m.x + 70} y={256} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>{m.d}</text>
        </g>
      ))}
    </Svg>
  );
}

// ── Orchestration vs Chorégraphie ───────────────────────────────────────────
export function OrchVsChoreo() {
  const orch = (x0: number, name: string) => (
    <g>
      <rect x={x0} y={20} width={280} height={250} rx={10} className={BOX} style={{ stroke: "#3b82f6", strokeWidth: 2 }} opacity={0.9} />
      <text x={x0 + 140} y={44} textAnchor="middle" className={TXT} fontSize={12} fontWeight={700}>Orchestration — {name}</text>
      <Node x={x0 + 80} y={60} w={120} h={44} fill="#f59e0b" label="Moteur d'orchestration" small />
      <text x={x0 + 140} y={124} textAnchor="middle" className={TXT} fontSize={10}>contrôle central</text>
      <Node x={x0 + 20} y={150} w={105} h={44} fill="#10b981" label="Web service 1" small />
      <Node x={x0 + 155} y={150} w={105} h={44} fill="#10b981" label="Web service 2" small />
      <Arrow x1={x0 + 120} y1={104} x2={x0 + 72} y2={146} />
      <Arrow x1={x0 + 160} y1={104} x2={x0 + 208} y2={146} />
      <text x={x0 + 140} y={225} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>processus métier privé</text>
      <text x={x0 + 140} y={241} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>BPMN (modélisation) + BPEL (exécution)</text>
      <text x={x0 + 140} y={259} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>limite : panne moteur, schéma statique</text>
    </g>
  );
  return (
    <Svg viewBox="0 0 760 300">
      <Defs />
      {orch(30, "1")}
      {orch(450, "2")}
      <Arrow x1={310} y1={90} x2={450} y2={90} />
      <text x={380} y={78} textAnchor="middle" className={TXT} fontSize={9.5} fontWeight={700}>Request purchase order →</text>
      <Arrow x1={450} y1={110} x2={310} y2={110} dashed />
      <text x={380} y={126} textAnchor="middle" className={TXT} fontSize={9.5} fontWeight={700}>← Acknowledge</text>
      <Arrow x1={310} y1={160} x2={450} y2={160} />
      <text x={380} y={148} textAnchor="middle" className={TXT} fontSize={9.5} fontWeight={700}>Accept purchase order →</text>
      <Arrow x1={450} y1={180} x2={310} y2={180} dashed />
      <text x={380} y={196} textAnchor="middle" className={TXT} fontSize={9.5} fontWeight={700}>← Acknowledge</text>
      <text x={380} y={226} textAnchor="middle" className={TXT} fontSize={11} fontWeight={700}>Chorégraphie</text>
      <text x={380} y={244} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>collaboration décentralisée, processus publics</text>
      <text x={380} y={260} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9}>WS-CDL (description, non exécutable)</text>
      <text x={380} y={284} textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize={9.5}>
        Chorégraphie entre orchestrations : chaque participant sait quand exécuter ses opérations et avec qui interagir
      </text>
    </Svg>
  );
}

export const diagramRegistry: Record<string, () => React.JSX.Element> = {
  "osi-tcpip": OsiTcpip,
  "linux-fsh": LinuxFsh,
  "linux-vfs": LinuxVfs,
  "hypervisor-types": HypervisorTypes,
  "vm-vs-conteneur": VmVsContainer,
  "k8s-arch": K8sArch,
  "hdfs-arch": HdfsArch,
  "mapreduce-flow": MapReduceFlow,
  "mongo-replicaset": MongoReplicaSet,
  "iot-layers": IotLayers,
  "android-view-tree": AndroidViewTree,
  "android-lifecycle": AndroidLifecycle,
  "android-stack": AndroidStack,
  "android-arch": AndroidArch,
  "android-dev-types": AndroidDevTypes,
  "android-intent-flow": AndroidIntentFlow,
  "android-service-lifecycle": AndroidServiceLifecycle,
  "android-dialog-tree": AndroidDialogTree,
  "bigdata-5v": BigData5V,
  "kmeans-loop": KmeansLoop,
  "kmeans-elbow": KmeansElbow,
  "knn-vote": KnnVote,
  "svm-margin": SvmMargin,
  "svm-kernel": SvmKernel,
  "sec-attacks": SecAttacks,
  "sec-arp-spoofing": SecArpSpoofing,
  "firewall-zones": FirewallZones,
  "sec-services": SecServices,
  "des-phases": DesPhases,
  "des-fonction-f": DesFonctionF,
  "des-cles": DesCles,
  "aes-keys": AesKeys,
  "modes-cbc": ModesCbc,
  "soa-triangle": SoaTriangle,
  "soa-abstraction": SoaAbstraction,
  "soap-stack": SoapStack,
  "soap-message": SoapMessage,
  "rest-crud": RestCrud,
  "grpc-arch": GrpcArch,
  "orch-vs-choreo": OrchVsChoreo,
};

export function Diagram({ id }: { id: string }) {
  const Comp = diagramRegistry[id];
  if (!Comp) return null;
  return <Comp />;
}
