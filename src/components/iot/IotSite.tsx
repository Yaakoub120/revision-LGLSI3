'use client'

// ─── Site de révision — Internet des Objets (LSI3, Mr Samir Belaid) ───
import { useEffect, useMemo, useState } from 'react'
import { imodules, iglossary } from '@/data/iot'
import { iquestions } from '@/data/iot/quiz'
import { iotDiagramRegistry, FiveLayers } from '@/components/iot/diagrams'
import { BlockRenderer } from '@/components/BlockRenderer'
import { QuizEngine } from '@/components/quiz/QuizEngine'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'home', label: 'Accueil', icon: '🏠' },
  { id: 'modules', label: 'Modules', icon: '📚' },
  { id: 'code', label: 'Commandes', icon: '💻' },
  { id: 'glossary', label: 'Glossaire', icon: '📖' },
  { id: 'quiz', label: 'Quiz', icon: '🎯' },
] as const

type TabId = (typeof TABS)[number]['id']

const READ_KEY = 'iot-read-sections-v1'

const PARTS = [
  { from: 'i1', to: 'i11', label: 'Partie 1 — Introduction, architecture & protocoles', hint: 'IoT · IoMT · architecture 5 couches · protocoles · topologies · série · bracelet médical' },
  { from: 'i12', to: 'i21', label: 'Partie 2 — Matériel, logiciel & Arduino/ESP', hint: 'capteurs · microcontrôleurs · projet tutoré · Arduino Uno · LM35 · RFID · GSM · ESP8266 · ThingSpeak · ESP32 · MQTT' },
  { from: 'i22', to: 'i27', label: 'Partie 3 — Applications IoT via Raspberry Pi', hint: 'OS · GPIO · DS18B20 · HC-SR04 · Arduino↔Pi · Node-RED · caméra & streaming · Apache · Mosquitto' },
]

export default function IotSite() {
  const [tab, setTab] = useState<TabId>('home')
  const [activeModule, setActiveModule] = useState<string>('i1')
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

  const mod = imodules.find((m) => m.id === activeModule) ?? imodules[0]
  const allSections = imodules.flatMap((m) => m.sections)
  const readPct = Math.round((readSections.length / allSections.length) * 100)

  const filteredGlossary = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return iglossary
    return iglossary.filter((g) => g.term.toLowerCase().includes(s) || g.def.toLowerCase().includes(s))
  }, [search])

  const modPart = PARTS.find((p) => {
    const from = imodules.findIndex((m) => m.id === p.from)
    const to = imodules.findIndex((m) => m.id === p.to)
    const i = imodules.findIndex((m) => m.id === mod.id)
    return i >= from && i <= to
  })

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ── Header ── */}
      <header className="sticky top-12 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-lg">📡</span>
            <div>
              <h1 className="text-sm font-black leading-tight tracking-tight sm:text-base">
                Internet des Objets <span className="text-emerald-400">— LSI3</span>
              </h1>
              <p className="text-[11px] text-zinc-500">Architecture · Protocoles · Arduino & ESP32 · Raspberry Pi · Node-RED · MQTT</p>
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
                  tab === t.id ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
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
            <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-zinc-950 p-8 sm:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Licence LSI3 · Faculté des sciences de Monastir · 2025-2026 · Mr Samir Belaid</p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Tout le cours Internet des Objets.<br />
                <span className="text-emerald-400">Zéro information oubliée.</span>
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
                Chaque définition, chaque protocole, chaque câblage et chaque ligne de code des 3 documents du cours
                — des définitions IoT/IoMT au broker Mosquitto en passant par Arduino, ESP8266/ESP32 et Raspberry Pi —
                condensés en 27 modules, avec 37 schémas interactifs, la référence complète des commandes (terminal Pi,
                commandes AT, mosquitto, raspistill…) et un quiz en boucle de maîtrise : tu répètes jusqu&apos;au sans-faute.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => setTab('modules')} className="bg-emerald-500 font-bold text-zinc-950 hover:bg-emerald-400">
                  📚 Commencer la révision
                </Button>
                <Button onClick={() => setTab('quiz')} variant="outline" className="border-emerald-700 font-bold text-emerald-400 hover:bg-emerald-500/10">
                  🎯 Tester mes connaissances
                </Button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-4">
                {[
                  { v: '27', l: 'modules complets' },
                  { v: `${allSections.length}`, l: 'sections de cours' },
                  { v: `${iquestions.length}`, l: 'questions de quiz' },
                  { v: `${iglossary.length}`, l: 'termes de glossaire' },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-center">
                    <p className="text-3xl font-black text-emerald-400">{s.v}</p>
                    <p className="text-xs text-zinc-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Modules overview — par partie */}
            {PARTS.map((part) => (
              <section key={part.from}>
                <h3 className="mb-1 text-lg font-black">{part.label}</h3>
                <p className="mb-4 text-xs text-zinc-500">{part.hint}</p>
                <div className="grid gap-3 md:grid-cols-2">
                  {imodules
                    .filter((m) => {
                      const i = imodules.findIndex((x) => x.id === m.id)
                      const from = imodules.findIndex((x) => x.id === part.from)
                      const to = imodules.findIndex((x) => x.id === part.to)
                      return i >= from && i <= to
                    })
                    .map((m) => {
                      const done = m.sections.filter((s) => readSections.includes(s.id)).length
                      return (
                        <button
                          key={m.id}
                          onClick={() => { setActiveModule(m.id); setTab('modules') }}
                          className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-left transition hover:border-emerald-600/60 hover:bg-zinc-900"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{m.icon}</span>
                              <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-500">Module {m.num}</p>
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
            ))}

            {/* How to use */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h3 className="text-lg font-black">Comment réviser efficacement ?</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { n: '1', t: 'Lis chaque module', d: 'Section par section, coche « lu » pour suivre ta progression. Les cartes 📌 sont les définitions exactes à restituer, les tableaux (protocoles, capteurs, câblages) sont à connaître par cœur.' },
                  { n: '2', t: 'Joue avec les schémas', d: '37 diagrammes interactifs : les 5 couches, MQTT pub/sub + QoS, topologies IoMT, trame UART, PWM du servomoteur, simulateurs LM35 et HC-SR04, topologie smart farming… manipule-les pour ancrer les concepts.' },
                  { n: '3', t: 'Boucle de maîtrise', d: 'Le quiz renvoie tes erreurs jusqu\u2019à ce que TOUTES les questions soient réussies : objectif zéro erreur.' },
                ].map((x) => (
                  <div key={x.n} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-black text-emerald-400">{x.n}</span>
                    <p className="mt-2 font-bold text-zinc-100">{x.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{x.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h3 className="mb-4 text-lg font-black">Aperçu interactif : l&apos;architecture IoT à 5 couches</h3>
              <FiveLayers />
            </section>
          </div>
        )}

        {/* ═══════════ MODULES ═══════════ */}
        {tab === 'modules' && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {imodules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={cn(
                    'rounded-full px-3 py-2 text-xs font-bold transition sm:text-sm',
                    activeModule === m.id ? 'bg-emerald-500 text-zinc-950' : 'border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                  )}
                >
                  {m.icon} M{m.num} · {m.title}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-500">Module {mod.num} / 27 · {modPart?.label.split('—')[0].trim()}</p>
              <h2 className="mt-1 text-2xl font-black sm:text-3xl">{mod.icon} {mod.title}</h2>
              <p className="mt-1 text-zinc-400">{mod.subtitle}</p>
              <p className="mt-2 text-xs text-zinc-600">📄 Source : {mod.source}</p>
            </div>

            <nav className="flex flex-wrap gap-2" aria-label="Sections du module">
              {mod.sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-emerald-700 hover:text-emerald-400"
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
                        <span className="mr-2 rounded-lg bg-emerald-500/15 px-2 py-0.5 text-sm text-emerald-400">{mod.num}.{i + 1}</span>
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
                      {s.blocks.map((b, j) => <BlockRenderer key={j} block={b} diagrams={iotDiagramRegistry} />)}
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
                <span className="text-2xl font-black text-emerald-400">{readPct}%</span>
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

        {/* ═══════════ COMMANDES ═══════════ */}
        {tab === 'code' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h2 className="text-2xl font-black">💻 Référence des commandes & câblages</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Tout le pratique du cours : terminal Raspberry Pi, sonde 1-Wire, caméra et streaming, motion, Apache,
                Mosquitto, commandes AT de l&apos;ESP8266 et les tables de câblage (RFID, bracelet médical, HC-SR04).
              </p>
            </div>

            <section className="rounded-2xl border border-rose-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-rose-300">🍓 Raspberry Pi — installation & accès</h3>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[13px] leading-relaxed text-emerald-200">{`# Bureau à distance (côté Raspberry)
sudo apt-get install tightvncserver
sudo apt-get install xrdp
# Côté Windows : Connexion Bureau à distance → IP du Pi (via ifconfig) → pi / raspberry

# Autres outils utiles : SSH (accès distant) · SCP (copier via SSH) ·
# rsync (synchroniser) · cron (planifier des photos)

# Créer et exécuter le programme LED
sudo nano led.py          # crée le fichier dans /home/pi et l'ouvre
sudo python led.py        # exécution

# Préparation de l'OS : carte micro SD en FAT32 (Balena Etcher)
# Raspberry Pi OS → "See all download options" → OS with desktop ou OS Lite`}</pre>
            </section>

            <section className="rounded-2xl border border-amber-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-amber-300">🌡️ Sonde DS18B20 (1-Wire) — lecture & dépannage</h3>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[13px] leading-relaxed text-emerald-200">{`# Lecture en ligne de commande (remplacer les 'x' par le numéro donné)
sudo modprobe w1-gpio
sudo modprobe w1-therm
cd /sys/bus/w1/devices/
ls
cd 28-xxxxxxxxxx
cat w1_slave

# Sonde non détectée ? Modifier deux fichiers système :
# 1) /etc/modules        →  w1-therm
#                            w1-gpio pullup=1
# 2) /boot/config.txt    →  dtoverlay=w1-gpio
# puis redémarrer le Raspberry Pi.`}</pre>
            </section>

            <section className="rounded-2xl border border-sky-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-sky-300">📷 Caméra — photos, vidéos & détection</h3>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[13px] leading-relaxed text-emerald-200">{`# Activation + détection
sudo raspi-config          # Interfacing Options → Camera → Yes → redémarrer
vcgencmd get_camera        # doit afficher : supported=1 detected=1
# si detected=0 : vérifier branchement/interface, redémarrer,
# sudo apt-get update && sudo apt-get upgrade

# Photos (terminal)
cd && mkdir Camera
raspistill -o ~/Camera/image.jpg -q 100
# options : -o sortie · -q qualité (0-100) · -w/-h dimensions ·
#           -t timeout (retardateur) · -vf / -hf retournements

# Python : sudo apt-get install python3-picamera
#   camera.resolution = (2592,1944) pour 5 MP · (3280,2464) pour 8 MP
#   camera.hflip = True ; camera.vflip = True si photo à l'envers

# Vidéos
raspivid -o video.h264 -t 10000        # 10 s
sudo apt-get install -y gpac           # MP4Box
MP4Box -add video.h264 video.mp4       # conversion lisible partout
# LED caméra éteinte : /boot/config.txt → disable_camera_led=1`}</pre>
            </section>

            <section className="rounded-2xl border border-violet-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-violet-300">📡 Streaming — les 5 méthodes en commandes</h3>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[13px] leading-relaxed text-emerald-200">{`# 1) Netcat + Mplayer
nc -l -p 5001 | /usr/bin/mplayer -fps 10 -cache 1024 -
raspivid -t 0 -w 1280 -h 720 -o - | nc adresse_ip_du_pc_client 5001
# enregistrer : ... -demuxer h264es -dumpstream -dumpfile ./Bureau/ma_video.h264 -

# 2) VLC (plusieurs postes clients)
apt-get install vlc
raspivid -t 0 -n --width 1280 --height 720 -o - | cvlc stream:///dev/stdin \
  --sout '#standard{access=http,mux=ts,dst=:8090}' :demux=h264
cvlc http://adresse_ip_du_pi:8090            # côté client
# enregistrer : cvlc http://IP:8090 --sout file/ts:./Bureau/ma_video.h264

# 3) Pi à Pi : lecteur OMXplayer
# 4) mjpg-streamer : suite de photos (mjpeg), moins fluide
# 5) Serveur web Python : module http.server, stream.mjpg sur le port 8000`}</pre>
            </section>

            <section className="rounded-2xl border border-teal-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-teal-300">🎥 Webcam USB, motion & serveur web</h3>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[13px] leading-relaxed text-emerald-200">{`# Webcam — méthode 1 : fswebcam
sudo apt install fswebcam
sudo usermod -a -G video <username>   # sinon erreurs « autorisation refusée »
groups                                 # vérifier l'ajout au groupe
fswebcam image.jpg

# Webcam — méthode 2 : motion (via Putty)
sudo apt-get update -y
lsusb                                  # vérifier la connexion de la caméra
sudo apt-get install motion
sudo nano /etc/motion/motion.conf      # daemon on, width 640, height 480,
                                       # framerate 10, quality 100, pre_capture 2,
                                       # post_capture 5, stream_port 8081,
                                       # stream_quality 100, stream_motion off,
                                       # webcontrol_localhost off
sudo nano /etc/default/motion          # start_motion_daemon=yes
sudo reboot                            # puis navigateur : Adresse-IP:8081

# Serveur web + flux vidéo
sudo apt install apache2 -y                       # /var/www/html/index.html
sudo apt install php libapache2-mod-php -y        # + créer index.php
# Les flux webcam générés par motion sont diffusés sur les ports 8081 et 8082`}</pre>
            </section>

            <section className="rounded-2xl border border-rose-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-rose-300">📨 MQTT — broker Mosquitto & clients</h3>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[13px] leading-relaxed text-emerald-200">{`sudo apt-get install mosquitto              # installer le broker
systemctl status mosquitto                  # vérifier
sudo apt-get install mosquitto-clients      # mosquitto_sub · mosquitto_pub · mosquitto_passw

# Terminal 1 (Subscriber)
mosquitto_sub -h localhost -t "sensor/temperature"
# Terminal 2 (Publisher) — -h serveur · -t topic · -m message
mosquitto_pub -h localhost -t sensor/temperature -m 24.9

# QoS : 0 = néant (sans garantie) → 2 = service garanti (délivré une fois,
# publication en deux parties). Plus on monte, plus on charge les trames.
# MQTT vs HTTP : 11× moins d'énergie à l'envoi, 170× moins à la réception,
# 93× plus rapide. Sécurité : SSL/TLS avec certificat (pas de mécanisme natif).

# Node-RED : nœud mqtt (input) → crayon → nouvelle connexion → localhost:1883`}</pre>
            </section>

            <section className="rounded-2xl border border-sky-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-sky-300">⌨️ Commandes AT du module ESP8266 — table complète</h3>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  ['AT+RST', 'Restart module — basic'],
                  ['AT+CWMODE', 'Wifi mode (3 : Client/Serveur, 2 : AP) — wifi'],
                  ['AT+CWJAP', 'Join AP wifi — wifi'],
                  ['AT+CWLAP', 'List AP wifi — wifi'],
                  ['AT+CWQAP', 'Quit AP wifi — wifi'],
                  ['AT+CIPSTATUS', 'Get status — TCP/IP'],
                  ['AT+CIPSTART', 'Set up TCP or UDP — TCP/IP'],
                  ['AT+CIPSEND', 'Send data — TCP/IP'],
                  ['AT+CIPCLOSE', 'Close TCP or UDP — TCP/IP'],
                  ['AT+CIFSR', 'Get IP — TCP/IP'],
                  ['AT+CIPMUX', 'Set multiple connections — TCP/IP'],
                  ['AT+CIPSERVER', 'Set as server — TCP/IP'],
                ].map(([cmd, role]) => (
                  <div key={cmd} className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <code className="font-mono text-[13px] text-sky-300">{cmd}</code>
                    <span className="text-xs text-zinc-500">{role}</span>
                  </div>
                ))}
              </div>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[13px] leading-relaxed text-emerald-200">{`# Terminal réglé sur CR+LF, 115200 bauds
AT+RST                                   // remise à zéro
AT+CWMODE=3                              // 3 : Client/Serveur, 2 : AP
AT+CWLAP                                 // lister les points d'accès
AT+CWJAP="nom du réseau", "mot de passe" // connecter au wifi
AT+CIFSR                                 // connaître l'adresse IP de l'ESP`}</pre>
            </section>

            <section className="rounded-2xl border border-emerald-900/60 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-emerald-300">🔌 Tables de câblage & broches clés</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-emerald-400">RFID-RC522 → Arduino</p>
                  <pre className="mt-2 font-mono text-[11px] leading-relaxed text-zinc-300">{`VCC  → 3.3V
RST  → 9
GND  → GND
MISO → 12
MOSI → 11
SCK  → 13
NSS  → 10`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-emerald-400">Bracelet (ESP32 + MAX30100 + OLED)</p>
                  <pre className="mt-2 font-mono text-[11px] leading-relaxed text-zinc-300">{`ESP32 D22 → MAX30100 SCL
ESP32 D21 → MAX30100 SDA
ESP32 GND → MAX30100 GND
ESP32 3.3V → MAX30100 VIN
OLED VDD → ESP32 3.3V
OLED GND → ESP32 GND
OLED SCL → ESP32 D22
OLED SDA → ESP32 D21`}</pre>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm font-bold text-emerald-400">Autres broches à connaître</p>
                  <pre className="mt-2 font-mono text-[11px] leading-relaxed text-zinc-300">{`ESP32 : SCL = D22 · SDA = D21
ESP32 tactile : GPIO 0,2,4,12,13,
  14,15,27,32,33 → touchRead(32)
  = touchRead(T9)
HC-SR04 : Trig=GPIO23, Echo=GPIO24
  (résistances 1KΩ + 2KΩ)
Pi LED : GPIO18 + résistance 100Ω
Arduino Uno : LM35 → A0
Station météo : DHT11 → GPIO 12,
  ESP8266 Tx/Rx → GPIO 2 et 3
ESP32 Blink : Led = pin 1
ESP32 web : WebServer server(80)
Node-RED LED : GPIO23 (pin 16)`}</pre>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-black text-zinc-100">📚 Où trouver chaque code complet ?</h3>
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                {[
                  ['Blink + liaison série Arduino', 'Module 15'],
                  ['LM35 (analogRead) & BME280 (I2C)', 'Modules 16 & 10'],
                  ['Lecture RFID (MFRC522)', 'Module 16'],
                  ['Servo + contrôle d\u2019accès complet', 'Module 17'],
                  ['SMS GSM SIM900', 'Module 17'],
                  ['ESP8266 (AT + SoftwareSerial)', 'Module 18'],
                  ['ESP32 Blink · WifiScan · WiFi connect', 'Module 20'],
                  ['Serveur web ESP32 (WebServer)', 'Module 20'],
                  ['MQTT PubSubClient (publish)', 'Module 21'],
                  ['led.py (GPIO18)', 'Module 23'],
                  ['DS18B20 (lecture + sauvegarde)', 'Module 24'],
                  ['HC-SR04 (distance)', 'Module 24'],
                  ['Arduino ↔ Pi (3 programmes × 2)', 'Module 25'],
                  ['picamera photo + vidéo + streaming', 'Module 27'],
                ].map(([what, where]) => (
                  <div key={what} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">
                    <span className="text-zinc-300">{what}</span>
                    <span className="shrink-0 text-xs font-bold text-emerald-400">{where}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ═══════════ GLOSSAIRE ═══════════ */}
        {tab === 'glossary' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h2 className="text-2xl font-black">📖 Glossaire — {iglossary.length} termes</h2>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un terme… (ex. : MQTT, LoRaWAN, UART, Mosquitto, deep sleep)"
                className="mt-4 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-emerald-600"
              />
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {filteredGlossary.map((g) => (
                <div key={g.term} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                  <p className="font-bold text-emerald-300">{g.term}</p>
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
          <QuizEngine questions={iquestions} modules={imodules} storageKey="iot-quiz-state-v1" />
        )}
      </main>

      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600">
        Site de révision — Internet des Objets · Mr Samir Belaid · FSM LSI3 · 2025-2026
      </footer>
    </div>
  )
}
