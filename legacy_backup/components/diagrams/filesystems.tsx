'use client';

// Diagrammes SVG explicatifs — Systèmes de fichiers
// Palette : emerald / teal / amber / rose / violet / zinc (pas de bleu)

const f = { fontFamily: 'ui-sans-serif, system-ui, sans-serif' };

export function FhsTree() {
  const dirs: { path: string; desc: string; color: string }[] = [
    { path: '/', desc: 'Racine — arborescence UNIQUE', color: '#0f766e' },
    { path: '/etc', desc: 'Fichiers de configuration', color: '#d97706' },
    { path: '/home', desc: 'Dossiers personnels des utilisateurs', color: '#059669' },
    { path: '/root', desc: 'Home de l’administrateur', color: '#dc2626' },
    { path: '/usr', desc: 'Programmes utilisateurs (bin, lib)', color: '#7c3aed' },
    { path: '/var', desc: 'Données variables : logs, www, mysql', color: '#db2777' },
    { path: '/opt', desc: 'Logiciels tiers (VMware, Chrome…)', color: '#0891b2' },
    { path: '/tmp', desc: 'Temporaire — effacé au redémarrage', color: '#ca8a04' },
    { path: '/mnt', desc: 'Montages manuels (admin)', color: '#4f46e5' },
    { path: '/media', desc: 'Montages automatiques USB/CD', color: '#16a34a' },
    { path: '/proc · /sys', desc: 'FS virtuels : noyau & processus', color: '#52525b' },
    { path: '/bin, /sbin', desc: 'Binaires essentiels & système', color: '#65a30d' },
  ];
  return (
    <svg viewBox="0 0 760 560" className="w-full h-auto" role="img" aria-label="Arborescence Linux" style={f}>
      <rect x="0" y="0" width="760" height="560" rx="12" fill="#fafafa" />
      <rect x="20" y="18" width="720" height="34" rx="8" fill="#0f766e" />
      <text x="380" y="41" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">
        Linux : une seule racine « / » — tout part d’ici (FHS)
      </text>
      {dirs.map((d, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 30 : 385;
        const y = 70 + row * 40;
        return (
          <g key={d.path}>
            <rect x={x} y={y} width="345" height="32" rx="7" fill="#fff" stroke={d.color} strokeWidth="1.5" />
            <rect x={x} y={y} width="6" height="32" rx="3" fill={d.color} />
            <text x={x + 16} y={y + 21} fontSize="13.5" fontWeight="700" fill="#18181b">{d.path}</text>
            <text x={x + 130} y={y + 21} fontSize="11.5" fill="#52525b">{d.desc}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function FsArchitecture() {
  return (
    <svg viewBox="0 0 760 300" className="w-full h-auto" role="img" aria-label="Architecture VFS" style={f}>
      <rect x="0" y="0" width="760" height="300" rx="12" fill="#fafafa" />
      {/* Applications */}
      <rect x="40" y="30" width="680" height="46" rx="9" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="50" textAnchor="middle" fontSize="14" fontWeight="700" fill="#292524">Applications utilisateur</text>
      <text x="380" y="68" textAnchor="middle" fontSize="11" fill="#57534e">ls · cp · nginx · mysql · firefox …</text>
      {/* VFS */}
      <rect x="140" y="106" width="480" height="52" rx="9" fill="#0d9488" />
      <text x="380" y="128" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">VFS — Virtual File System</text>
      <text x="380" y="147" textAnchor="middle" fontSize="11.5" fill="#ccfbf1">Couche d’abstraction du noyau : une seule API pour tous les FS</text>
      <line x1="380" y1="76" x2="380" y2="106" stroke="#78716c" strokeWidth="2" markerEnd="url(#arrow)" />
      {/* Pilotes */}
      {[
        { t: 'ext4', x: 40, c: '#059669' },
        { t: 'XFS', x: 165, c: '#d97706' },
        { t: 'Btrfs', x: 290, c: '#7c3aed' },
        { t: 'NTFS', x: 415, c: '#dc2626' },
        { t: 'vfat', x: 540, c: '#0891b2' },
        { t: '…', x: 665, c: '#78716c' },
      ].map((p) => (
        <g key={p.t}>
          <rect x={p.x} y="196" width="105" height="40" rx="8" fill="#fff" stroke={p.c} strokeWidth="2" />
          <text x={p.x + 52} y="221" textAnchor="middle" fontSize="13" fontWeight="700" fill={p.c}>{p.t}</text>
          <line x1={p.x + 52} y1="158" x2={p.x + 52} y2="196" stroke="#a8a29e" strokeWidth="1.5" />
        </g>
      ))}
      {/* Disque */}
      <rect x="140" y="258" width="480" height="30" rx="8" fill="#292524" />
      <text x="380" y="278" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#fafaf9">MATERIEL — disque / SSD / clé USB</text>
      <line x1="380" y1="236" x2="380" y2="258" stroke="#78716c" strokeWidth="2" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#78716c" />
        </marker>
      </defs>
    </svg>
  );
}

export function Mounting() {
  return (
    <svg viewBox="0 0 760 240" className="w-full h-auto" role="img" aria-label="Principe du montage" style={f}>
      <rect x="0" y="0" width="760" height="240" rx="12" fill="#fafafa" />
      <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Le montage connecte une partition à un répertoire</text>
      {/* Partition */}
      <rect x="50" y="70" width="200" height="110" rx="10" fill="#fff" stroke="#059669" strokeWidth="2.5" />
      <text x="150" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">Partition physique</text>
      <rect x="70" y="110" width="160" height="24" rx="5" fill="#d1fae5" />
      <text x="150" y="126" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">/dev/sdb1</text>
      <rect x="70" y="142" width="160" height="24" rx="5" fill="#d1fae5" />
      <text x="150" y="158" textAnchor="middle" fontSize="12" fill="#065f46">Données non accessibles</text>
      {/* Flèche */}
      <line x1="255" y1="125" x2="335" y2="125" stroke="#d97706" strokeWidth="3" markerEnd="url(#arrowA)" />
      <rect x="272" y="88" width="46" height="22" rx="11" fill="#fef3c7" />
      <text x="295" y="103" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">mount</text>
      {/* Arborescence */}
      <rect x="340" y="70" width="200" height="110" rx="10" fill="#fff" stroke="#0d9488" strokeWidth="2.5" />
      <text x="440" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0d9488">Arborescence Linux</text>
      <text x="365" y="130" fontSize="13" fontWeight="700" fill="#18181b">/</text>
      <line x1="372" y1="126" x2="400" y2="148" stroke="#a8a29e" strokeWidth="1.5" />
      <text x="405" y="152" fontSize="13" fill="#18181b">mnt</text>
      <rect x="358" y="162" width="164" height="24" rx="5" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
      <text x="440" y="178" textAnchor="middle" fontSize="12" fontWeight="700" fill="#134e4a">usb ← point de montage</text>
      {/* Résultat */}
      <rect x="570" y="70" width="150" height="110" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" strokeDasharray="5 4" />
      <text x="645" y="105" textAnchor="middle" fontSize="13" fontWeight="700" fill="#047857">✅ Résultat</text>
      <text x="645" y="130" textAnchor="middle" fontSize="11.5" fill="#047857">Fichiers accessibles</text>
      <text x="645" y="150" textAnchor="middle" fontSize="11.5" fill="#047857">dans /mnt/usb</text>
      <line x1="540" y1="125" x2="566" y2="125" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowB)" />
      <defs>
        <marker id="arrowA" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#d97706" />
        </marker>
        <marker id="arrowB" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#10b981" />
        </marker>
      </defs>
      <text x="380" y="215" textAnchor="middle" fontSize="12.5" fill="#57534e">Commande : sudo mount /dev/sdb1 /mnt/usb — vérifier avec df -h — démonter avec umount</text>
    </svg>
  );
}

export function DeviceNaming() {
  return (
    <svg viewBox="0 0 760 330" className="w-full h-auto" role="img" aria-label="Nommage des périphériques" style={f}>
      <rect x="0" y="0" width="760" height="330" rx="12" fill="#fafafa" />
      <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Convention de nommage des périphériques dans /dev</text>
      {/* SATA */}
      <rect x="30" y="55" width="700" height="72" rx="9" fill="#fff" stroke="#059669" strokeWidth="2" />
      <text x="50" y="82" fontSize="13.5" fontWeight="800" fill="#059669">SATA / SCSI / USB</text>
      <text x="240" y="82" fontSize="20" fontWeight="800" fill="#52525b">/dev/</text>
      <text x="300" y="82" fontSize="20" fontWeight="800" fill="#059669">sd</text>
      <text x="334" y="82" fontSize="20" fontWeight="800" fill="#d97706">b</text>
      <text x="352" y="82" fontSize="20" fontWeight="800" fill="#dc2626">1</text>
      <text x="410" y="80" fontSize="11.5" fill="#374151">sd = disque SATA/SCSI · b = 2ᵉ disque (a, b, c…) · 1 = 1ʳᵉ partition</text>
      <text x="240" y="112" fontSize="11.5" fill="#57534e">Exemples : /dev/sda = 1er disque · /dev/sdb1 · /dev/sdc = 3e disque (souvent USB)</text>
      {/* NVMe */}
      <rect x="30" y="140" width="700" height="72" rx="9" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
      <text x="50" y="167" fontSize="13.5" fontWeight="800" fill="#7c3aed">NVMe (SSD modernes)</text>
      <text x="240" y="167" fontSize="20" fontWeight="800" fill="#52525b">/dev/</text>
      <text x="300" y="167" fontSize="20" fontWeight="800" fill="#7c3aed">nvme0n1</text>
      <text x="412" y="167" fontSize="20" fontWeight="800" fill="#dc2626">p1</text>
      <text x="470" y="165" fontSize="11.5" fill="#374151">nvme0 = 1er contrôleur NVMe · n1 = namespace · p1 = 1ʳᵉ partition</text>
      <text x="240" y="197" fontSize="11.5" fill="#57534e">Exemple complet : /dev/nvme0n1p1</text>
      {/* SD */}
      <rect x="30" y="225" width="700" height="72" rx="9" fill="#fff" stroke="#d97706" strokeWidth="2" />
      <text x="50" y="252" fontSize="13.5" fontWeight="800" fill="#d97706">Carte SD</text>
      <text x="240" y="252" fontSize="20" fontWeight="800" fill="#52525b">/dev/</text>
      <text x="300" y="252" fontSize="20" fontWeight="800" fill="#d97706">mmcblk0</text>
      <text x="404" y="252" fontSize="20" fontWeight="800" fill="#dc2626">p1</text>
      <text x="470" y="250" fontSize="11.5" fill="#374151">mmcblk0 = 1ʳᵉ carte SD détectée · pX = numéro de partition</text>
      <text x="240" y="282" fontSize="11.5" fill="#57534e">Exemple complet : /dev/mmcblk0p1</text>
    </svg>
  );
}

export function Partitions() {
  return (
    <svg viewBox="0 0 760 360" className="w-full h-auto" role="img" aria-label="MBR vs GPT" style={f}>
      <rect x="0" y="0" width="760" height="360" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Tables de partition : MBR vs GPT</text>
      {/* MBR */}
      <rect x="35" y="50" width="330" height="230" rx="10" fill="#fff" stroke="#d97706" strokeWidth="2" />
      <text x="200" y="78" textAnchor="middle" fontSize="14" fontWeight="800" fill="#d97706">MBR (ancien)</text>
      <text x="200" y="97" textAnchor="middle" fontSize="11.5" fill="#92400e">Max 4 primaires · disque ≤ 2 To · BIOS</text>
      <rect x="60" y="110" width="140" height="42" rx="6" fill="#fef3c7" stroke="#d97706" />
      <text x="130" y="136" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Primaire sda1</text>
      <rect x="210" y="110" width="140" height="42" rx="6" fill="#fef3c7" stroke="#d97706" />
      <text x="280" y="136" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Primaire sda2</text>
      <rect x="60" y="160" width="140" height="42" rx="6" fill="#fef3c7" stroke="#d97706" />
      <text x="130" y="186" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Primaire sda3</text>
      <rect x="210" y="160" width="140" height="100" rx="6" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
      <text x="280" y="182" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9a3412">Étendue sda4</text>
      <rect x="222" y="192" width="56" height="26" rx="4" fill="#fff" stroke="#ea580c" />
      <text x="250" y="209" textAnchor="middle" fontSize="10.5" fill="#9a3412">sda5</text>
      <rect x="282" y="192" width="56" height="26" rx="4" fill="#fff" stroke="#ea580c" />
      <text x="310" y="209" textAnchor="middle" fontSize="10.5" fill="#9a3412">sda6</text>
      <rect x="222" y="222" width="116" height="26" rx="4" fill="#fff" stroke="#ea580c" />
      <text x="280" y="239" textAnchor="middle" fontSize="10.5" fill="#9a3412">sda7 … (logiques)</text>
      {/* GPT */}
      <rect x="395" y="50" width="330" height="230" rx="10" fill="#fff" stroke="#0d9488" strokeWidth="2" />
      <text x="560" y="78" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0d9488">GPT (moderne)</text>
      <text x="560" y="97" textAnchor="middle" fontSize="11.5" fill="#115e59">Jusqu’à 128 partitions · &gt; 2 To · UEFI recommandé</text>
      {['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'].map((t, i) => (
        <g key={t}>
          <rect x={425 + (i % 4) * 72} y={115 + Math.floor(i / 4) * 46} width="62" height="38" rx="5" fill="#ccfbf1" stroke="#0d9488" />
          <text x={456 + (i % 4) * 72} y={138 + Math.floor(i / 4) * 46} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#134e4a">{t}</text>
        </g>
      ))}
      <text x="560" y="245" textAnchor="middle" fontSize="11" fill="#57534e">… jusqu’à 128 partitions, toutes « primaires »</text>
      <text x="560" y="263" textAnchor="middle" fontSize="11" fill="#57534e">Pas besoin d’étendue / logique</text>
      {/* Note bas */}
      <rect x="35" y="295" width="690" height="46" rx="8" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="315" textAnchor="middle" fontSize="12" fontWeight="700" fill="#292524">UEFI : remplaçant moderne du BIOS — interface entre le matériel et l’OS</text>
      <text x="380" y="332" textAnchor="middle" fontSize="11" fill="#57534e">Outils : fdisk (simple, MBR) · parted (puissant, GPT &gt; 2 To) · GParted (graphique)</text>
    </svg>
  );
}

export function ExtEvolution() {
  return (
    <svg viewBox="0 0 760 250" className="w-full h-auto" role="img" aria-label="Évolution ext2 ext3 ext4" style={f}>
      <rect x="0" y="0" width="760" height="250" rx="12" fill="#fafafa" />
      <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Évolution de la famille ext</text>
      <line x1="80" y1="115" x2="680" y2="115" stroke="#a8a29e" strokeWidth="3" markerEnd="url(#arrE)" />
      {[
        { x: 60, t: 'ext2', pts: ['Simple, rapide', '⚠ Pas de journal'], c: '#78716c' },
        { x: 290, t: 'ext3', pts: ['✓ Journal (journaling)', 'Perf moyenne gros volumes'], c: '#d97706' },
        { x: 520, t: 'ext4', pts: ['✓ Gros disques', '✗ Pas de snapshots ni checksum'], c: '#059669' },
      ].map((b) => (
        <g key={b.t}>
          <rect x={b.x} y="55" width="180" height="105" rx="10" fill="#fff" stroke={b.c} strokeWidth="2.5" />
          <rect x={b.x} y="55" width="180" height="30" rx="9" fill={b.c} />
          <text x={b.x + 90} y="76" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">{b.t}</text>
          <text x={b.x + 12} y="107" fontSize="11" fill="#292524">{b.pts[0]}</text>
          <text x={b.x + 12} y="127" fontSize="11" fill="#292524">{b.pts[1]}</text>
          <text x={b.x + 12} y="147" fontSize="10.5" fill="#78716c">{b.t === 'ext4' ? '→ Btrfs/ZFS pour snapshots' : b.t === 'ext3' ? '→ restauration facile' : '→ risque après crash'}</text>
        </g>
      ))}
      <text x="380" y="205" textAnchor="middle" fontSize="12" fill="#57534e">Besoin moderne (cloud, conteneurs, SSD) → XFS, Btrfs, ZFS : snapshots, compression, intégrité</text>
      <defs>
        <marker id="arrE" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#a8a29e" />
        </marker>
      </defs>
    </svg>
  );
}
