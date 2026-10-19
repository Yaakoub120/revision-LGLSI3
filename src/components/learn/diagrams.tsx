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
  "bigdata-5v": BigData5V,
};

export function Diagram({ id }: { id: string }) {
  const Comp = diagramRegistry[id];
  if (!Comp) return null;
  return <Comp />;
}
