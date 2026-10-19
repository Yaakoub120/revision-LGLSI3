'use client';

// Diagrammes SVG — LVM, sauvegarde, mémoire, systemd

export function Lvm() {
  return (
    <svg viewBox="0 0 760 340" className="w-full h-auto" role="img" aria-label="Architecture LVM" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="340" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">LVM : couche intermédiaire flexible entre le FS et le matériel</text>
      {/* LV */}
      <rect x="60" y="55" width="640" height="56" rx="9" fill="#7c3aed" />
      <text x="380" y="78" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#fff">Logical Volumes (LV) — disques virtuels montés</text>
      <text x="380" y="98" textAnchor="middle" fontSize="11.5" fill="#ddd6fe">lv_data (50G) · lv_web (20G) · redimensionnables à chaud, snapshots</text>
      {/* VG */}
      <rect x="60" y="145" width="640" height="56" rx="9" fill="#0891b2" />
      <text x="380" y="168" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#fff">Volume Group (VG) — un seul grand espace de stockage</text>
      <text x="380" y="188" textAnchor="middle" fontSize="11.5" fill="#cffafe">ex : data_vg = regroupe tous les PV</text>
      <line x1="380" y1="111" x2="380" y2="145" stroke="#78716c" strokeWidth="2.5" markerEnd="url(#lvArrow)" />
      <line x1="380" y1="201" x2="380" y2="235" stroke="#78716c" strokeWidth="2.5" markerEnd="url(#lvArrow)" />
      {/* PV */}
      <rect x="60" y="235" width="640" height="56" rx="9" fill="#059669" />
      <text x="380" y="258" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#fff">Physical Volumes (PV) — disques ou partitions physiques</text>
      <text x="380" y="278" textAnchor="middle" fontSize="11.5" fill="#d1fae5">/dev/sdb1 · /dev/sdc1 · /dev/sdd1</text>
      {/* Commandes */}
      <rect x="60" y="304" width="640" height="26" rx="6" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="322" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#44403c">pvcreate → vgcreate → lvcreate · affichage : pvs, vgs, lvs</text>
      <defs>
        <marker id="lvArrow" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#78716c" />
        </marker>
      </defs>
    </svg>
  );
}

export function BackupTypes() {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const full = [100, 100, 100, 100, 100, 100, 100];
  const diff = [100, 30, 45, 60, 75, 90, 105];
  const incr = [100, 25, 22, 28, 20, 26, 24];
  const W = 80;
  const scale = (v: number) => Math.round((v / 105) * 70);
  return (
    <svg viewBox="0 0 760 380" className="w-full h-auto" role="img" aria-label="Types de sauvegarde" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="380" rx="12" fill="#fafafa" />
      <text x="380" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Taille des sauvegardes jour après jour (complète = 100)</text>
      {[
        { t: 'COMPLÈTE (Full)', data: full, c: '#0d9488', y: 60, note: 'Tout chaque jour — restauration simple, mais lourd' },
        { t: 'DIFFÉRENTIELLE', data: diff, c: '#d97706', y: 160, note: 'Modifiés depuis la dernière complète → taille croissante' },
        { t: 'INCRÉMENTALE', data: incr, c: '#7c3aed', y: 260, note: 'Modifiés depuis la dernière sauvegarde → très économe' },
      ].map((row) => (
        <g key={row.t}>
          <text x="30" y={row.y + 18} fontSize="12.5" fontWeight="800" fill={row.c}>{row.t}</text>
          {days.map((d, i) => {
            const h = scale(row.data[i]);
            return (
              <g key={d}>
                <rect x={230 + i * W} y={row.y + 90 - h} width={W - 14} height={h} rx="4" fill={i === 0 ? row.c : row.c + '99'} />
                {i === 0 && <text x={230 + i * W + (W - 14) / 2} y={row.y + 84} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#fff">FULL</text>}
                <text x={230 + i * W + (W - 14) / 2} y={row.y + 104} textAnchor="middle" fontSize="10" fill="#57534e">{d}</text>
              </g>
            );
          })}
          <text x="725" y={row.y + 60} textAnchor="end" fontSize="10" fill="#78716c">{row.note}</text>
        </g>
      ))}
      <rect x="230" y="345" width="500" height="24" rx="6" fill="#ecfdf5" stroke="#10b981" />
      <text x="480" y="361" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#047857">💡 Stratégie conseillée : 1 complète/semaine + 6 incrémentales/jour + 1 différentielle/mois</text>
    </svg>
  );
}

export function SwapMemory() {
  return (
    <svg viewBox="0 0 760 260" className="w-full h-auto" role="img" aria-label="Mémoire virtuelle et swap" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="260" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Mémoire virtuelle : la RAM + le swap travaillent ensemble</text>
      {/* RAM */}
      <rect x="70" y="55" width="280" height="150" rx="10" fill="#fff" stroke="#059669" strokeWidth="2.5" />
      <text x="210" y="80" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#059669">RAM physique (rapide)</text>
      <rect x="90" y="95" width="240" height="34" rx="6" fill="#d1fae5" />
      <text x="210" y="116" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#065f46">Processus actifs</text>
      <rect x="90" y="137" width="240" height="30" rx="6" fill="#fef3c7" />
      <text x="210" y="156" textAnchor="middle" fontSize="11.5" fill="#92400e">Pages inactives → déplacées vers le swap</text>
      <text x="210" y="192" textAnchor="middle" fontSize="10.5" fill="#78716c">libère de la RAM pour les processus actifs</text>
      {/* Flèche échange */}
      <line x1="355" y1="130" x2="405" y2="130" stroke="#d97706" strokeWidth="3" markerEnd="url(#swapA)" />
      <line x1="405" y1="150" x2="355" y2="150" stroke="#059669" strokeWidth="3" markerEnd="url(#swapB)" />
      {/* Disque */}
      <rect x="410" y="55" width="280" height="150" rx="10" fill="#fff" stroke="#7c3aed" strokeWidth="2.5" />
      <text x="550" y="80" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#7c3aed">Disque — Swap (lent)</text>
      <rect x="430" y="95" width="240" height="34" rx="6" fill="#ede9fe" />
      <text x="550" y="116" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#5b21b6">Partition swap (/dev/sda5)</text>
      <rect x="430" y="137" width="240" height="30" rx="6" fill="#ede9fe" />
      <text x="550" y="156" textAnchor="middle" fontSize="11.5" fill="#5b21b6">ou fichier swap (/swapfile)</text>
      <text x="550" y="192" textAnchor="middle" fontSize="10.5" fill="#78716c">pages mémoire inactives stockées ici</text>
      {/* Utilités */}
      <rect x="70" y="218" width="620" height="30" rx="7" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="238" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#44403c">Utilités : fonctionne quand la RAM est saturée · veille/hibernation · multitâche · allocation dynamique</text>
      <defs>
        <marker id="swapA" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#d97706" /></marker>
        <marker id="swapB" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#059669" /></marker>
      </defs>
    </svg>
  );
}

export function Swappiness() {
  return (
    <svg viewBox="0 0 760 240" className="w-full h-auto" role="img" aria-label="Swappiness" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="240" rx="12" fill="#fafafa" />
      <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">vm.swappiness — à quel point le noyau utilise le swap</text>
      <line x1="90" y1="110" x2="670" y2="110" stroke="#d6d3d1" strokeWidth="14" strokeLinecap="round" />
      <line x1="90" y1="110" x2="150" y2="110" stroke="#059669" strokeWidth="14" strokeLinecap="round" />
      <line x1="150" y1="110" x2="430" y2="110" stroke="#d97706" strokeWidth="14" />
      <line x1="430" y1="110" x2="670" y2="110" stroke="#dc2626" strokeWidth="14" strokeLinecap="round" />
      {[
        { x: 120, v: '0', t: 'Privilégie la RAM au maximum', c: '#059669' },
        { x: 380, v: '60', t: 'Valeur PAR DÉFAUT — équilibre RAM/swap', c: '#d97706' },
        { x: 640, v: '100', t: 'Swap agressif — pages déplacées tôt', c: '#dc2626' },
      ].map((p) => (
        <g key={p.v}>
          <circle cx={p.x} cy="110" r="20" fill="#fff" stroke={p.c} strokeWidth="3.5" />
          <text x={p.x} y="116" textAnchor="middle" fontSize="14" fontWeight="800" fill={p.c}>{p.v}</text>
          <text x={p.x} y="160" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#292524">{p.t}</text>
        </g>
      ))}
      <rect x="70" y="185" width="620" height="38" rx="8" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="202" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#44403c">Vérifier : cat /proc/sys/vm/swappiness · Temporaire : sudo sysctl vm.swappiness=20</text>
      <text x="380" y="217" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#44403c">Définitif : vm.swappiness=20 dans /etc/sysctl.conf puis sudo sysctl -p</text>
    </svg>
  );
}

export function SystemdArch() {
  return (
    <svg viewBox="0 0 760 330" className="w-full h-auto" role="img" aria-label="Architecture systemd" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="330" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">systemd = un écosystème complet, pas juste un service de boot</text>
      {/* PID 1 */}
      <rect x="200" y="45" width="360" height="54" rx="10" fill="#65a30d" />
      <text x="380" y="68" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">systemd — PID 1 (le cœur)</text>
      <text x="380" y="88" textAnchor="middle" fontSize="11" fill="#ecfccb">Démarre les services · supervise · gère dépendances et targets</text>
      {/* Composants */}
      {[
        { t: 'systemd-journald', d: 'Logs centralisés du noyau et des services → journalctl', x: 40, y: 140, c: '#0d9488' },
        { t: 'systemd-logind', d: 'Sessions : connexions, TTY, alimentation (veille…)', x: 275, y: 140, c: '#d97706' },
        { t: 'systemd-networkd', d: 'Réseau (optionnel) : interfaces, DHCP/statique', x: 510, y: 140, c: '#0891b2' },
        { t: 'cgroups', d: 'Isolation & limites CPU/RAM des services', x: 40, y: 235, c: '#7c3aed' },
        { t: 'systemd-tmpfiles', d: 'Fichiers temporaires (nettoyage auto)', x: 275, y: 235, c: '#db2777' },
        { t: 'timedated · localed · hostnamed', d: 'Heure · langue/clavier · identité machine', x: 510, y: 235, c: '#65a30d' },
      ].map((b) => (
        <g key={b.t}>
          <rect x={b.x} y={b.y} width="210" height="72" rx="9" fill="#fff" stroke={b.c} strokeWidth="2" />
          <rect x={b.x} y={b.y} width="210" height="26" rx="8" fill={b.c} />
          <text x={b.x + 105} y={b.y + 18} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#fff">{b.t}</text>
          <text x={b.x + 10} y={b.y + 44} fontSize="10" fill="#44403c">{b.d.length > 38 ? b.d.slice(0, 38) : b.d}</text>
          <text x={b.x + 10} y={b.y + 58} fontSize="10" fill="#44403c">{b.d.length > 38 ? b.d.slice(38) : ''}</text>
        </g>
      ))}
      {[145, 380, 615].map((x) => (
        <line key={x} x1={x} y1="99" x2={x} y2="140" stroke="#a8a29e" strokeWidth="2" />
      ))}
      <text x="380" y="322" textAnchor="middle" fontSize="11.5" fill="#57534e">Standard : une commande unique systemctl · journaux unifiés · comportement identique sur toutes les distributions</text>
    </svg>
  );
}

export function ServiceLifecycle() {
  return (
    <svg viewBox="0 0 760 220" className="w-full h-auto" role="img" aria-label="Cycle de vie d'un service" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="220" rx="12" fill="#fafafa" />
      <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Cycle de vie d’un service systemd</text>
      <line x1="60" y1="105" x2="700" y2="105" stroke="#a8a29e" strokeWidth="3" markerEnd="url(#cycA)" />
      {[
        { t: 'load', d: 'Lecture du .service', x: 50, c: '#0891b2' },
        { t: 'start', d: 'Lancement', x: 175, c: '#059669' },
        { t: 'supervise', d: 'Surveillance, restart auto', x: 300, c: '#65a30d' },
        { t: 'reload', d: 'Config sans redémarrer', x: 425, c: '#d97706' },
        { t: 'stop', d: 'Arrêt', x: 550, c: '#dc2626' },
        { t: 'disable', d: 'Plus au boot', x: 665, c: '#78716c' },
      ].map((s) => (
        <g key={s.t}>
          <circle cx={s.x + 25} cy="105" r="9" fill={s.c} />
          <text x={s.x + 25} y={s.t === 'supervise' || s.t === 'disable' ? 75 : 145} textAnchor="middle" fontSize="13" fontWeight="800" fill={s.c}>{s.t}</text>
          <text x={s.x + 25} y={s.t === 'supervise' || s.t === 'disable' ? 93 : 163} textAnchor="middle" fontSize="9.5" fill="#57534e">{s.d}</text>
        </g>
      ))}
      <rect x="60" y="180" width="640" height="26" rx="6" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="198" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#44403c">Restart=on-failure / always → relance automatique en cas d’échec (supervision continue)</text>
      <defs>
        <marker id="cycA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#a8a29e" /></marker>
      </defs>
    </svg>
  );
}

export function Targets() {
  return (
    <svg viewBox="0 0 760 330" className="w-full h-auto" role="img" aria-label="Targets systemd" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="330" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Les targets = états prédéfinis du système (ex-runlevels)</text>
      {/* Pyramid */}
      <rect x="230" y="50" width="300" height="52" rx="8" fill="#0d9488" />
      <text x="380" y="72" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">graphical.target</text>
      <text x="380" y="91" textAnchor="middle" fontSize="10.5" fill="#ccfbf1">Serveur graphique + gestionnaire d’affichage</text>
      <rect x="190" y="115" width="380" height="52" rx="8" fill="#059669" />
      <text x="380" y="137" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">multi-user.target</text>
      <text x="380" y="156" textAnchor="middle" fontSize="10.5" fill="#d1fae5">Multi-utilisateur SANS interface graphique (runlevel 3)</text>
      <rect x="150" y="180" width="460" height="52" rx="8" fill="#d97706" />
      <text x="380" y="202" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">rescue.target</text>
      <text x="380" y="221" textAnchor="middle" fontSize="10.5" fill="#fef3c7">Mode maintenance : root shell + services minimum</text>
      <rect x="110" y="245" width="540" height="52" rx="8" fill="#dc2626" />
      <text x="380" y="267" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">emergency.target</text>
      <text x="380" y="286" textAnchor="middle" fontSize="10.5" fill="#fecaca">Shell root ULTRA minimal, aucun service — réparations critiques</text>
      <text x="380" y="322" textAnchor="middle" fontSize="11.5" fill="#57534e">Voir : systemctl get-default · Changer (permanent) : sudo systemctl set-default multi-user.target</text>
    </svg>
  );
}

export function TimerAnatomy() {
  return (
    <svg viewBox="0 0 760 280" className="w-full h-auto" role="img" aria-label="Anatomie d'un timer" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="280" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Un timer = 2 fichiers du MÊME NOM : le .timer déclenche le .service</text>
      {/* .service */}
      <rect x="60" y="60" width="290" height="150" rx="10" fill="#fff" stroke="#059669" strokeWidth="2.5" />
      <rect x="60" y="60" width="290" height="30" rx="9" fill="#059669" />
      <text x="205" y="80" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff">backup.service — QUOI ?</text>
      <text x="80" y="115" fontSize="11.5" fontWeight="700" fill="#065f46">[Service]</text>
      <text x="80" y="135" fontSize="11" fill="#292524">Type=oneshot</text>
      <text x="80" y="155" fontSize="11" fill="#292524">ExecStart=/usr/local/bin/backup.sh</text>
      <text x="80" y="185" fontSize="10.5" fill="#78716c">La logique : le script de sauvegarde</text>
      {/* Arrow */}
      <line x1="355" y1="135" x2="405" y2="135" stroke="#d97706" strokeWidth="3.5" markerEnd="url(#timerA)" />
      <text x="380" y="122" textAnchor="middle" fontSize="11" fontWeight="800" fill="#d97706">déclenche</text>
      {/* .timer */}
      <rect x="410" y="60" width="290" height="150" rx="10" fill="#fff" stroke="#d97706" strokeWidth="2.5" />
      <rect x="410" y="60" width="290" height="30" rx="9" fill="#d97706" />
      <text x="555" y="80" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff">backup.timer — QUAND ?</text>
      <text x="430" y="115" fontSize="11.5" fontWeight="700" fill="#92400e">[Timer]</text>
      <text x="430" y="135" fontSize="11" fill="#292524">OnCalendar=daily</text>
      <text x="430" y="155" fontSize="11" fill="#292524">Persistent=true</text>
      <text x="430" y="185" fontSize="10.5" fill="#78716c">La planification + rattrapage si manquée</text>
      <rect x="60" y="232" width="640" height="30" rx="7" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="251" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#44403c">Activation : systemctl enable --now backup.timer · Vérification : systemctl list-timers</text>
      <defs>
        <marker id="timerA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#d97706" /></marker>
      </defs>
    </svg>
  );
}
