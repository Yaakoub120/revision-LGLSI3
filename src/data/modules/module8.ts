import type { CourseModule } from '@/types/course';

export const module8: CourseModule = {
  id: 9,
  slug: 'configuration-reseaux',
  title: 'Configuration réseaux',
  subtitle: 'IP, CIDR, passerelle, DNS, MAC, modèle OSI, DHCP/statique, iproute2, Netplan, ifcfg, résolution DNS',
  icon: 'Network',
  accent: 'sky',
  sections: [
    {
      id: 'm8-concepts',
      title: '1. Concepts fondamentaux du réseau',
      blocks: [
        {
          kind: 'def',
          term: 'Adresse IP',
          text: 'Identifie une **machine** sur un réseau. Deux versions : **IPv4** — format 192.168.1.10 (**32 bits**) · **IPv6** — format 2001:db8::1:1 (**128 bits**). Elle permet aux équipements de communiquer entre eux.',
        },
        {
          kind: 'list',
          items: [
            '**Rôle 1 :** identifier un hôte',
            '**Rôle 2 :** permettre l’acheminement des paquets',
            '**Rôle 3 :** définir le réseau auquel appartient la machine',
          ],
        },
        {
          kind: 'def',
          term: 'Masque de réseau (CIDR)',
          text: 'Détermine la partie **« réseau »** et la partie **« hôte »** d’une adresse IP. **Fonction :** définir la taille du réseau et séparer les sous-réseaux.',
        },
        {
          kind: 'table',
          headers: ['CIDR', 'Masque décimal', 'Taille'],
          rows: [
            ['/24', '255.255.255.0', '**256 adresses**'],
            ['/16', '255.255.0.0', '65 536 adresses'],
            ['/32', '—', '**une seule adresse** (host unique)'],
          ],
        },
        {
          kind: 'def',
          term: 'Passerelle (Gateway)',
          text: "Adresse du **routeur** permettant de **sortir du réseau local**. Exemple : 192.168.1.1. **Rôles :** acheminer le trafic vers les réseaux externes ; nécessaire pour accéder à Internet. **Sans gateway → communication uniquement dans le réseau local.**",
        },
        {
          kind: 'def',
          term: 'DNS (Domain Name System)',
          text: 'Système de **traduction** entre nom de domaine (ex : google.com) et adresse IP (ex : 142.250.184.238). Fonctionne comme un **« annuaire d’internet »**. **Serveurs DNS courants :** 8.8.8.8 (Google), 1.1.1.1 (Cloudflare), DNS du FAI.',
        },
        {
          kind: 'def',
          term: 'Adresse MAC',
          text: 'Identifiant **physique unique** d’une carte réseau. Format : **AA:BB:CC:DD:EE:FF**. Gravée par le **constructeur**, identifie une interface au **niveau 2** (Ethernet), utilisée par **ARP** pour associer IP↔MAC.',
        },
        {
          kind: 'def',
          term: 'Interface réseau',
          text: 'Composant (**physique ou virtuel**) qui permet à une machine de communiquer. **Types :** eth0, eth1 → Ethernet · wlan0 → Wi-Fi · **lo** → loopback (127.0.0.1) · ens33 / enp0s3 → nouvelles conventions **systemd**. **Rôle :** assurer l’envoi et la réception de paquets.',
        },
      ],
    },
    {
      id: 'm8-osi',
      title: '2. Modèle OSI (version simplifiée)',
      blocks: [
        {
          kind: 'p',
          text: "Le modèle OSI complet comporte **7 couches**, mais en administration système Linux on utilise surtout **3 niveaux essentiels** :",
        },
        { kind: 'diagram', id: 'osi', caption: 'Modèle OSI simplifié : niveaux 2 (liaison), 3 (réseau) et 4 (transport)' },
        { kind: 'h3', text: 'Niveau 2 — Liaison (Data Link)' },
        {
          kind: 'list',
          items: [
            '**Adresse MAC** → identifiant physique de l’interface réseau',
            '**ARP (Address Resolution Protocol)** → traduit IP ↔ MAC',
            '**Switches** et communication locale',
            '**Rôle :** assurer la communication locale dans le même réseau via Ethernet ou Wi-Fi',
            '**Fonctions :** détection d’erreurs, encapsulation des trames, transmission physique via une interface (eth0, wlan0…)',
          ],
        },
        { kind: 'h3', text: 'Niveau 3 — Réseau (Network)' },
        {
          kind: 'list',
          items: [
            '**Éléments clés :** adresse IP, routage, passerelle (gateway), **ICMP** (ping, traceroute)',
            '**Rôle :** acheminer les paquets **d’un réseau à un autre**',
            '**Fonctions :** choix du meilleur chemin, découpage en sous-réseaux (CIDR), passage par un **routeur** pour sortir du LAN',
            '**Exemple :** `ip route show`',
          ],
        },
        { kind: 'h3', text: 'Niveau 4 — Transport' },
        {
          kind: 'list',
          items: [
            '**TCP** → fiable, **orienté connexion** : contrôle d’erreur, réémission, ordre des paquets, **handshake (SYN, SYN/ACK, ACK)**',
            '**UDP** → rapide, **sans garantie** : utilisé pour **DNS, VOIP, Streaming**',
            '**Rôle :** gérer la communication application ↔ réseau',
          ],
        },
      ],
    },
    {
      id: 'm8-adressage',
      title: '3. Types d’adressage réseau',
      blocks: [
        { kind: 'h3', text: 'IPv4 vs IPv6' },
        {
          kind: 'table',
          headers: ['Critère', 'IPv4', 'IPv6'],
          rows: [
            ['Format', '192.168.1.10', '2001:db8::1'],
            ['Taille', '32 bits → environ **4,3 milliards** d’adresses', '128 bits → nombre **quasi illimité**'],
            ['Usage', 'Utilisé massivement dans tous les réseaux', '—'],
            ['Sécurité', '—', 'Intègre nativement la sécurité (**IPsec**)'],
            ['Autres', 'Notation CIDR : /24, /16…', 'Meilleure gestion du **multicast**, simplifie l’auto-configuration'],
          ],
        },
        { kind: 'h3', text: 'DHCP vs IP statique' },
        {
          kind: 'table',
          headers: ['Mode', 'Caractéristiques', 'Utilisé pour'],
          rows: [
            ['**DHCP** (Dynamic Host Configuration Protocol)', 'Attribution **automatique** : adresse IP, masque, passerelle, DNS. Simplifie l’administration des postes. Commandes utiles : dhclient, logs DHCP…', 'Majorité des **postes utilisateurs**'],
            ['**Statique**', 'Définie **manuellement** dans /etc/network/interfaces, **Netplan** (utilitaire de config réseau) ou **ifcfg** (fichiers RHEL). Stable et **prévisible** → indispensable pour les services', '**Serveurs, routeurs/firewalls, équipements critiques**'],
          ],
        },
        { kind: 'h3', text: 'Réseaux privés vs publics' },
        {
          kind: 'table',
          headers: ['Type', 'Plages', 'Caractéristiques'],
          rows: [
            ['**Privés** (non routés sur Internet)', '10.0.0.0/8 · 172.16.0.0/12 · 192.168.0.0/16', 'Utilisés dans les **LAN**, nécessitent une **NAT** pour sortir vers Internet, sécurisés et isolés'],
            ['**Publics**', 'Ex : 154.12.87.50', 'Routés **directement** sur Internet, fournis par les FAI ou hébergeurs (OVH, AWS, GCP…)'],
          ],
        },
        { kind: 'diagram', id: 'network-lan', caption: 'Architecture : LAN privé → NAT → passerelle → Internet, avec le rôle du DNS' },
      ],
    },
    {
      id: 'm8-iproute2',
      title: '4. Configuration moderne avec iproute2',
      blocks: [
        {
          kind: 'p',
          text: "L'outil **iproute2** **remplace** les anciennes commandes (ifconfig, route, arp) et fournit une gestion moderne, complète et plus puissante du réseau sous Linux.",
        },
        {
          kind: 'table',
          headers: ['Outil', 'Rôle'],
          rows: [
            ['ip addr', 'Gestion des **adresses IP**'],
            ['ip link', 'Gestion des **interfaces**'],
            ['ip route', '**Routage**'],
            ['ip neigh', 'Table **ARP** (voisinage)'],
          ],
        },
        { kind: 'h3', text: 'Gestion des interfaces' },
        {
          kind: 'cmd',
          code: 'ip link',
          note: 'Lister les interfaces',
        },
        {
          kind: 'cmd',
          code: 'ip link set eth0 up',
          note: 'Activer une interface (down pour désactiver)',
        },
        {
          kind: 'cmd',
          code: 'ip addr add 192.168.1.10/24 dev eth0',
          note: 'Ajouter une adresse IP',
        },
        {
          kind: 'cmd',
          code: 'ip addr del 192.168.1.10/24 dev eth0',
          note: 'Supprimer une adresse IP',
        },
        {
          kind: 'cmd',
          code: 'ip addr',
          note: 'Voir toutes les adresses IP',
        },
        { kind: 'h3', text: 'Routage' },
        {
          kind: 'cmd',
          code: 'ip route show',
          note: 'Afficher la table de routage',
        },
        {
          kind: 'cmd',
          code: 'ip route add 10.0.0.0/24 via 192.168.1.1',
          note: 'Ajouter une route statique',
        },
        {
          kind: 'cmd',
          code: 'ip route add default via 192.168.1.1',
          note: 'Ajouter la passerelle par défaut',
        },
        {
          kind: 'cmd',
          code: 'ip route del 10.0.0.0/24',
          note: 'Supprimer une route',
        },
        { kind: 'h3', text: 'Voisinage (ARP)' },
        {
          kind: 'cmd',
          code: 'ip neigh',
          note: 'Afficher la table ARP',
        },
        {
          kind: 'cmd',
          code: 'ip neigh flush all',
          note: 'Vider / nettoyer la table ARP',
        },
        {
          kind: 'cmd',
          code: 'ip neigh add 192.168.1.20 lladdr AA:BB:CC:DD:EE:FF dev eth0',
          note: 'Ajouter une entrée ARP manuelle (optionnel, réseaux avancés)',
        },
      ],
    },
    {
      id: 'm8-persistant',
      title: '5. Configuration persistante du réseau',
      blocks: [
        {
          kind: 'p',
          text: "Contrairement aux commandes `ip` (**temporaires**), ces méthodes permettent une configuration **permanente**, appliquée à chaque redémarrage.",
        },
        { kind: 'h3', text: 'Debian / Ubuntu (méthode classique)' },
        {
          kind: 'code',
          title: 'Fichier : /etc/network/interfaces — configuration statique',
          code: `iface eth0 inet static
  address 192.168.1.10
  netmask 255.255.255.0
  gateway 192.168.1.1`,
        },
        {
          kind: 'cmd',
          code: 'sudo ifup eth0',
          note: 'Activer une interface (ifdown pour désactiver)',
        },
        { kind: 'h3', text: 'Ubuntu modernes (Netplan) — depuis Ubuntu 17.10' },
        {
          kind: 'code',
          title: 'Fichier : /etc/netplan/*.yaml',
          lang: 'yaml',
          code: `network:
  ethernets:
    eth0:
      dhcp4: no
      addresses: [192.168.1.10/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
  version: 2`,
        },
        {
          kind: 'cmd',
          code: 'sudo netplan apply',
          note: 'Appliquer la configuration Netplan',
        },
        { kind: 'h3', text: 'RHEL / CentOS / Rocky / AlmaLinux (ifcfg)' },
        {
          kind: 'code',
          title: 'Fichier : /etc/sysconfig/network-scripts/ifcfg-eth0',
          code: `DEVICE=eth0
BOOTPROTO=none
ONBOOT=yes
IPADDR=192.168.1.10
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS1=8.8.8.8`,
        },
        {
          kind: 'cmd',
          code: 'sudo systemctl restart network',
          note: 'Redémarrer le service réseau',
        },
      ],
    },
    {
      id: 'm8-dns',
      title: '6. Résolution DNS',
      blocks: [
        { kind: 'h3', text: 'Le fichier /etc/resolv.conf' },
        {
          kind: 'p',
          text: 'Contient les **serveurs DNS** à utiliser :',
        },
        {
          kind: 'code',
          code: `nameserver 8.8.8.8
nameserver 1.1.1.1`,
        },
        { kind: 'h3', text: 'Le fichier /etc/hosts' },
        {
          kind: 'code',
          code: `127.0.0.1    localhost
192.168.1.10 serveur-web`,
        },
        {
          kind: 'note',
          variant: 'info',
          text: '⚡ **Priorité : /etc/hosts est consulté AVANT les DNS.**',
        },
        { kind: 'diagram', id: 'ip-anatomy', caption: 'Anatomie d’une adresse IPv4 : partie réseau + partie hôte selon le CIDR' },
      ],
    },
  ],
};
