'use client';

// Diagrammes SVG — utilisateurs, paquets, réseau

export function Permissions() {
  return (
    <svg viewBox="0 0 760 300" className="w-full h-auto" role="img" aria-label="Permissions Linux" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="300" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Lire et modifier les permissions (ls -l → chmod)</text>
      {/* String breakdown */}
      <text x="380" y="72" textAnchor="middle" fontSize="24" fontWeight="800" fill="#18181b" letterSpacing="2">- rw- r-- r--</text>
      <rect x="294" y="40" width="24" height="42" rx="5" fill="none" stroke="#78716c" strokeWidth="2" />
      {[
        { x: 318, w: 52, t: 'rw-', who: 'Propriétaire (u)', c: '#059669' },
        { x: 370, w: 52, t: 'r--', who: 'Groupe (g)', c: '#d97706' },
        { x: 422, w: 52, t: 'r--', who: 'Autres (o)', c: '#dc2626' },
      ].map((g) => (
        <rect key={g.who} x={g.x} y="40" width={g.w} height="42" rx="5" fill="none" stroke={g.c} strokeWidth="2" />
      ))}
      {/* who labels */}
      {[
        { x: 344, who: 'Propriétaire (u)', c: '#059669', ex: 'alice' },
        { x: 396, who: 'Groupe (g)', c: '#d97706', ex: 'dev' },
        { x: 448, who: 'Autres (o)', c: '#dc2626', ex: 'le reste du monde' },
      ].map((g, i) => (
        <g key={g.who}>
          <line x1={g.x} y1="86" x2={g.x} y2="120" stroke={g.c} strokeWidth="1.5" strokeDasharray="3 2" />
          <text x={g.x} y={136 + i * 0} textAnchor="middle" fontSize="12" fontWeight="700" fill={g.c}>{g.who}</text>
          <text x={g.x} y="153" textAnchor="middle" fontSize="10.5" fill="#57534e">{g.ex}</text>
        </g>
      ))}
      <text x="298" y="112" fontSize="10.5" fill="#78716c" textAnchor="middle">type</text>
      <text x="298" y="126" fontSize="10.5" fill="#78716c" textAnchor="middle">- fichier · d dossier</text>
      {/* rwx legend */}
      <rect x="60" y="175" width="640" height="52" rx="8" fill="#fff" stroke="#a8a29e" />
      <text x="380" y="196" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#292524">r (4) = lire · w (2) = écrire · x (1) = exécuter</text>
      <text x="380" y="216" textAnchor="middle" fontSize="11.5" fill="#57534e">chmod 755 → rwxr-xr-x (owner rwx=7, groupe r-x=5, autres r-x=5)</text>
      {/* bonnes pratiques */}
      <rect x="60" y="240" width="640" height="44" rx="8" fill="#ecfdf5" stroke="#10b981" strokeDasharray="5 3" />
      <text x="380" y="259" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#047857">Bonnes pratiques : fichiers personnels → 600 · dossiers partagés → 770 ou 775</text>
      <text x="380" y="276" textAnchor="middle" fontSize="11" fill="#047857">chmod u+x (ajoute exécution owner) · chmod g-w (retire écriture groupe) · chown alice:dev (owner+groupe)</text>
    </svg>
  );
}

export function PasswdAnatomy() {
  const fields = [
    { t: 'etudiant', d: 'nom d’utilisateur', c: '#059669' },
    { t: 'x', d: 'mot de passe → /etc/shadow', c: '#dc2626' },
    { t: '1001', d: 'UID (User ID)', c: '#d97706' },
    { t: '1001', d: 'GID (Group ID)', c: '#0891b2' },
    { t: 'Etudiant', d: 'info complémentaire (GECOS)', c: '#7c3aed' },
    { t: '/home/etudiant', d: 'répertoire personnel', c: '#0d9488' },
    { t: '/bin/bash', d: 'shell', c: '#db2777' },
  ];
  let x = 30;
  const widths = [88, 40, 62, 62, 92, 148, 96];
  return (
    <svg viewBox="0 0 760 250" className="w-full h-auto" role="img" aria-label="Anatomie /etc/passwd" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="250" rx="12" fill="#fafafa" />
      <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Anatomie d’une ligne de /etc/passwd (7 champs séparés par « : »)</text>
      {fields.map((fl, i) => {
        const w = widths[i];
        const el = (
          <g key={fl.d}>
            <rect x={x} y="60" width={w} height="40" rx="6" fill="#fff" stroke={fl.c} strokeWidth="2.5" />
            <text x={x + w / 2} y="85" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={fl.c}>{fl.t}</text>
            {i < fields.length - 1 && <text x={x + w + 6} y="86" fontSize="18" fontWeight="800" fill="#a8a29e">:</text>}
          </g>
        );
        x += w + 20;
        return el;
      })}
      {fields.map((fl, i) => {
        const w = widths[i];
        const cx = widths.slice(0, i).reduce((a, b) => a + b + 20, 30) + w / 2;
        const y = 130 + (i % 2) * 52;
        return (
          <g key={fl.d + 'l'}>
            <line x1={cx} y1="102" x2={cx} y2={y - 6} stroke={fl.c} strokeWidth="1.5" strokeDasharray="3 2" />
            <text x={Math.min(Math.max(cx, 80), 690)} y={y} textAnchor="middle" fontSize="11" fontWeight="600" fill={fl.c}>{fl.d}</text>
          </g>
        );
      })}
      <rect x="30" y="205" width="700" height="30" rx="7" fill="#fef2f2" stroke="#dc2626" strokeDasharray="4 3" />
      <text x="380" y="225" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#991b1b">⚠ /etc/passwd est PUBLIC · les mots de passe chiffrés sont dans /etc/shadow (root uniquement)</text>
    </svg>
  );
}

export function UserGroup() {
  return (
    <svg viewBox="0 0 760 280" className="w-full h-auto" role="img" aria-label="Utilisateurs et groupes" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="280" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Utilisateurs → Groupes → Ressources (droits partagés)</text>
      {/* Users */}
      {[
        { n: 'alice (UID 1001)', x: 60, c: '#059669' },
        { n: 'bob (UID 1002)', x: 60, c: '#d97706' },
        { n: 'carol (UID 1003)', x: 60, c: '#dc2626' },
      ].map((u, i) => (
        <g key={u.n}>
          <rect x={u.x} y={70 + i * 62} width="180" height="42" rx="8" fill="#fff" stroke={u.c} strokeWidth="2" />
          <circle cx={u.x + 22} cy={91 + i * 62} r="10" fill={u.c + '33'} stroke={u.c} strokeWidth="2" />
          <text x={u.x + 42} y={96 + i * 62} fontSize="12" fontWeight="700" fill="#292524">{u.n}</text>
        </g>
      ))}
      {/* Arrows to group */}
      <path d="M240,91 C300,91 300,145 340,145" fill="none" stroke="#059669" strokeWidth="2" />
      <path d="M240,153 L340,153" fill="none" stroke="#d97706" strokeWidth="2" />
      <path d="M240,215 C300,215 300,165 340,160" fill="none" stroke="#dc2626" strokeWidth="2" />
      {/* Group */}
      <rect x="340" y="118" width="200" height="60" rx="10" fill="#0891b2" />
      <text x="440" y="143" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">Groupe projetA</text>
      <text x="440" y="163" textAnchor="middle" fontSize="10.5" fill="#cffafe">GID 2001 · droits communs</text>
      {/* Arrow to resource */}
      <path d="M540,148 C590,148 590,148 625,148" fill="none" stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#ugA)" />
      {/* Resource */}
      <rect x="630" y="115" width="100" height="66" rx="9" fill="#fff" stroke="#7c3aed" strokeWidth="2.5" />
      <text x="680" y="141" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#7c3aed">/srv/projetA</text>
      <text x="680" y="161" textAnchor="middle" fontSize="11" fontWeight="700" fill="#52525b">chmod 770</text>
      {/* Commands */}
      <rect x="60" y="218" width="670" height="44" rx="8" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="236" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#44403c">groupadd projetA · usermod -aG projetA alice · chown :projetA /srv/projetA · chmod 770 /srv/projetA</text>
      <text x="380" y="254" textAnchor="middle" fontSize="11" fill="#57534e">Bonnes pratiques : groupes logiques (web, dev, admin) · éviter trop de groupes par utilisateur</text>
      <defs>
        <marker id="ugA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#7c3aed" /></marker>
      </defs>
    </svg>
  );
}

export function PackageLevels() {
  return (
    <svg viewBox="0 0 760 300" className="w-full h-auto" role="img" aria-label="Gestion bas-niveau vs haut-niveau" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="300" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Gestion bas-niveau vs haut-niveau</text>
      {/* Low level */}
      <rect x="40" y="55" width="320" height="170" rx="10" fill="#fff" stroke="#d97706" strokeWidth="2.5" />
      <text x="200" y="82" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#d97706">BAS-NIVEAU — dpkg · rpm</text>
      <text x="200" y="104" textAnchor="middle" fontSize="11" fill="#92400e">Paquets individuels, un par un</text>
      <text x="200" y="126" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">⚠ Ne gère PAS les dépendances</text>
      <text x="200" y="152" textAnchor="middle" fontSize="12" fontWeight="600" fill="#292524">dpkg -i package.deb</text>
      <text x="200" y="176" textAnchor="middle" fontSize="12" fontWeight="600" fill="#292524">rpm -i package.rpm</text>
      <text x="200" y="204" textAnchor="middle" fontSize="10.5" fill="#78716c">Debian/Ubuntu · RedHat/Fedora</text>
      {/* High level */}
      <rect x="400" y="55" width="320" height="170" rx="10" fill="#fff" stroke="#059669" strokeWidth="2.5" />
      <text x="560" y="82" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#059669">HAUT-NIVEAU — apt · dnf/yum</text>
      <text x="560" y="104" textAnchor="middle" fontSize="11" fill="#065f46">Automatique : install, update, remove…</text>
      <text x="560" y="126" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">✓ Résout TOUTES les dépendances</text>
      <text x="560" y="152" textAnchor="middle" fontSize="12" fontWeight="600" fill="#292524">apt install nginx</text>
      <text x="560" y="176" textAnchor="middle" fontSize="12" fontWeight="600" fill="#292524">dnf install httpd</text>
      <text x="560" y="204" textAnchor="middle" fontSize="10.5" fill="#78716c">Télécharge depuis les dépôts officiels</text>
      {/* Flow */}
      <line x1="360" y1="140" x2="396" y2="140" stroke="#78716c" strokeWidth="2.5" markerEnd="url(#pkgA)" />
      <text x="378" y="130" textAnchor="middle" fontSize="9.5" fill="#78716c">dépend</text>
      {/* Bottom */}
      <rect x="40" y="243" width="680" height="40" rx="8" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="262" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#44403c">Formats NON interchangeables : .deb → dpkg/apt · .rpm → rpm/dnf/yum · Zypper (openSUSE) · Pacman (Arch)</text>
      <text x="380" y="278" textAnchor="middle" fontSize="11" fill="#57534e">Cycle de vie : téléchargement → installation → mise à jour → suppression/purge</text>
      <defs>
        <marker id="pkgA" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#78716c" /></marker>
      </defs>
    </svg>
  );
}

export function Quota() {
  return (
    <svg viewBox="0 0 760 240" className="w-full h-auto" role="img" aria-label="Quotas disque" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="240" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Quota disque : soft limit vs hard limit (exemple etudiant)</text>
      {/* Bar */}
      <rect x="80" y="70" width="600" height="40" rx="8" fill="#e7e5e4" />
      <rect x="80" y="70" width="545" height="40" rx="8" fill="#d97706" opacity="0.75" />
      <rect x="80" y="70" width="600" height="40" rx="8" fill="none" stroke="#78716c" strokeWidth="2" />
      {/* markers */}
      <line x1="500" y1="55" x2="500" y2="125" stroke="#d97706" strokeWidth="3" />
      <text x="500" y="48" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#d97706">SOFT 500M</text>
      <line x1="680" y1="55" x2="680" y2="125" stroke="#dc2626" strokeWidth="3" />
      <text x="655" y="48" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#dc2626">HARD 550M</text>
      <text x="290" y="95" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#92400e">zone d’avertissement (grace)</text>
      {[
        { x: 500, t: 'Avertissement au-delà de la soft limit', c: '#d97706', y: 150 },
        { x: 680, t: 'BLOCAGE STRICT à la hard limit — écriture impossible', c: '#dc2626', y: 172 },
      ].map((p) => (
        <g key={p.t}>
          <circle cx={p.x - 12} cy={p.y - 4} r="4" fill={p.c} />
          <text x={p.x} y={p.y} fontSize="11.5" fill={p.c} fontWeight="600">{p.t}</text>
        </g>
      ))}
      <rect x="60" y="196" width="640" height="32" rx="7" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="217" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#44403c">quotacheck -cum /home → quotaon /home → edquota etudiant → vérifier : repquota /home, quota -u etudiant</text>
    </svg>
  );
}

export function Osi() {
  return (
    <svg viewBox="0 0 760 330" className="w-full h-auto" role="img" aria-label="Modèle OSI simplifié" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="330" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Modèle OSI simplifié — 3 niveaux essentiels en administration Linux</text>
      {[
        { n: 'Niveau 4 — Transport', items: 'TCP (fiable, handshake SYN → SYN/ACK → ACK) · UDP (rapide, sans garantie : DNS, VOIP, streaming)', c: '#7c3aed', y: 50 },
        { n: 'Niveau 3 — Réseau (Network)', items: 'Adresse IP · routage · passerelle (gateway) · ICMP (ping, traceroute) · CIDR', c: '#0d9488', y: 140 },
        { n: 'Niveau 2 — Liaison (Data Link)', items: 'Adresse MAC · ARP (IP ↔ MAC) · switches · Ethernet/Wi-Fi · trames', c: '#d97706', y: 230 },
      ].map((l) => (
        <g key={l.n}>
          <rect x="50" y={l.y} width="660" height="76" rx="10" fill="#fff" stroke={l.c} strokeWidth="2.5" />
          <rect x="50" y={l.y} width="220" height="76" rx="9" fill={l.c} />
          <text x="160" y={l.y + 34} textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff">{l.n.split('—')[0]}</text>
          <text x="160" y={l.y + 52} textAnchor="middle" fontSize="10.5" fill="#ffffffcc">{l.n.split('—')[1]}</text>
          <text x="285" y={l.y + 33} fontSize="11.5" fontWeight="600" fill="#292524">{l.items.length > 60 ? l.items.slice(0, 60) : l.items}</text>
          <text x="285" y={l.y + 53} fontSize="11.5" fontWeight="600" fill="#292524">{l.items.length > 60 ? l.items.slice(60) : ''}</text>
        </g>
      ))}
      <text x="380" y="322" textAnchor="middle" fontSize="11.5" fill="#57534e">Rôles : L2 = communication locale · L3 = d’un réseau à l’autre (via routeur) · L4 = application ↔ réseau</text>
    </svg>
  );
}

export function NetworkLan() {
  return (
    <svg viewBox="0 0 760 300" className="w-full h-auto" role="img" aria-label="Architecture réseau" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="300" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Du LAN à Internet : NAT, passerelle et DNS</text>
      {/* LAN zone */}
      <rect x="30" y="50" width="330" height="200" rx="12" fill="#ecfdf5" stroke="#10b981" strokeDasharray="6 4" />
      <text x="195" y="74" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#047857">LAN privé (192.168.1.0/24)</text>
      {[
        { ip: '192.168.1.10', y: 95 },
        { ip: '192.168.1.20', y: 145 },
        { ip: '192.168.1.30', y: 195 },
      ].map((h) => (
        <g key={h.ip}>
          <rect x="60" y={h.y} width="150" height="34" rx="7" fill="#fff" stroke="#059669" strokeWidth="1.5" />
          <text x="135" y={h.y + 22} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#065f46">{h.ip}</text>
        </g>
      ))}
      {/* Switch */}
      <rect x="240" y="120" width="90" height="42" rx="7" fill="#0d9488" />
      <text x="285" y="138" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#fff">Switch</text>
      <text x="285" y="153" textAnchor="middle" fontSize="9" fill="#ccfbf1">niveau 2 · MAC</text>
      {/* Gateway */}
      <rect x="400" y="105" width="130" height="70" rx="9" fill="#d97706" />
      <text x="465" y="130" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">Passerelle</text>
      <text x="465" y="148" textAnchor="middle" fontSize="10.5" fill="#fef3c7">192.168.1.1</text>
      <text x="465" y="164" textAnchor="middle" fontSize="9.5" fill="#fef3c7">routeur + NAT</text>
      {/* Internet */}
      <ellipse cx="650" cy="140" rx="70" ry="42" fill="#7c3aed" />
      <text x="650" y="136" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">Internet</text>
      <text x="650" y="154" textAnchor="middle" fontSize="9.5" fill="#ddd6fe">IP publique</text>
      {/* Arrows */}
      <path d="M330,140 L396,140" stroke="#059669" strokeWidth="3" markerEnd="url(#netA)" />
      <text x="363" y="130" textAnchor="middle" fontSize="9.5" fill="#047857">sortie</text>
      <path d="M530,140 L574,140" stroke="#d97706" strokeWidth="3" markerEnd="url(#netB)" />
      {/* DNS */}
      <rect x="400" y="220" width="330" height="56" rx="9" fill="#fff" stroke="#0891b2" strokeWidth="2" />
      <text x="565" y="243" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0e7490">DNS — annuaire d’internet</text>
      <text x="565" y="263" textAnchor="middle" fontSize="10.5" fill="#155e75">google.com → 142.250.184.238 · 8.8.8.8 · 1.1.1.1</text>
      <text x="230" y="278" textAnchor="middle" fontSize="11" fill="#57534e">Sans gateway → LAN uniquement · /etc/hosts consulté AVANT les DNS</text>
      <defs>
        <marker id="netA" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#059669" /></marker>
        <marker id="netB" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#d97706" /></marker>
      </defs>
    </svg>
  );
}

export function IpAnatomy() {
  return (
    <svg viewBox="0 0 760 250" className="w-full h-auto" role="img" aria-label="Anatomie d'une adresse IP" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="250" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Anatomie d’une IPv4 : 192.168.1.10/24</text>
      {/* address blocks */}
      <text x="140" y="85" fontSize="28" fontWeight="800" fill="#059669">192</text>
      <text x="196" y="85" fontSize="28" fontWeight="800" fill="#a8a29e">.</text>
      <text x="210" y="85" fontSize="28" fontWeight="800" fill="#059669">168</text>
      <text x="266" y="85" fontSize="28" fontWeight="800" fill="#a8a29e">.</text>
      <text x="280" y="85" fontSize="28" fontWeight="800" fill="#059669">1</text>
      <text x="298" y="85" fontSize="28" fontWeight="800" fill="#a8a29e">.</text>
      <text x="312" y="85" fontSize="28" fontWeight="800" fill="#d97706">10</text>
      {/* overlay brackets */}
      <rect x="130" y="100" width="200" height="8" rx="4" fill="#059669" />
      <rect x="336" y="100" width="52" height="8" rx="4" fill="#d97706" />
      <text x="230" y="132" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#059669">Partie RÉSEAU (fixe — /24)</text>
      <text x="362" y="132" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#d97706">HÔTE</text>
      {/* CIDR table */}
      {[
        { cidr: '/24', mask: '255.255.255.0', size: '256 adresses', x: 90 },
        { cidr: '/16', mask: '255.255.0.0', size: '65 536 adresses', x: 300 },
        { cidr: '/32', mask: '—', size: '1 seule adresse (host)', x: 510 },
      ].map((r) => (
        <g key={r.cidr}>
          <rect x={r.x} y="160" width="180" height="60" rx="8" fill="#fff" stroke="#0d9488" strokeWidth="2" />
          <text x={r.x + 90} y="184" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0d9488">{r.cidr}</text>
          <text x={r.x + 90} y="202" textAnchor="middle" fontSize="10.5" fill="#292524">{r.mask} · {r.size}</text>
        </g>
      ))}
      <text x="380" y="240" textAnchor="middle" fontSize="11" fill="#57534e">Le masque (CIDR) définit la taille du réseau et sépare les sous-réseaux</text>
    </svg>
  );
}
