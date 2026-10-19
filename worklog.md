# Worklog

---
Task ID: 1
Agent: main (Z.ai)
Task: Build the complete multi-subject revision platform ("Ma Bibliothèque de Révision") covering ALL uploaded course PDFs with full knowledge base + mastery-loop quizzes + diagrams.

Work Log:
- Located and parsed all 28 uploaded PDFs in /home/z/my-project/upload/ (PyMuPDF text extraction + visual page rendering for image-based slides: Cours Partie 3, hdfs-mapreduce-1, BD-Nosql, Mongodb-sharding, Big Data Partie 1/2).
- Identified 6 subjects: Administration des Systèmes Linux (Modules 1–8, Hédi NSIBI), Développement d'applications réparties (Chapitres 1–4, Mouna KARAJA), Virtualisation & Cloud (Parties 1/2/4/5/6, Leila GHORBEL), Programmation Mobile Android (Interfaces graphiques, Soufen GDAIM), IoT (3 parties, Samir Belaid), Big Data & NoSQL (Souheyl MALLAT + HDFS/MapReduce + BD-NoSQL + MongoDB sharding).
- Initialized Next.js 16 fullstack environment (fullstack-dev skill init script).
- Built content data layer: src/lib/learn-types.ts + 6 subject data files in src/data/subjects/ covering every definition, command table, code sample, case study, protocol table and concept from the PDFs (25 chapters, 127 sections).
- Wrote 274 mastery-loop quiz questions with explanations (52 admin + 52 réparties + 60 virtualisation + 25 android + 45 IoT + 40 bigdata).
- Built 12 explanatory SVG diagrams (src/components/learn/diagrams.tsx): OSI/TCP-IP, Linux FHS, VFS, hypervisor types 1/2, VM vs container, Kubernetes arch, HDFS arch, MapReduce flow, MongoDB replica set, IoT 5 layers, Android view tree, Big Data 5V.
- Built content renderer (tables, command cards, callouts, code blocks, diagrams, kv cards) and the mastery-loop quiz engine: wrong answers are re-queued at the end of the queue until every question is answered correctly (zero errors); per-question attempt stats, weak-point report on completion, localStorage persistence, loop counter.
- Built home hub (hero, search, 6 subject cards, how-it-works) + subject view (cours accordion with chapter filters, quiz tab, per-subject command reference tab).
- Verified with agent-browser: home renders, subject navigation, course accordions, SVG diagrams (4 on Big Data page), quiz answering, correct-answer flow, wrong-answer re-queue ("1 erreur(s) réinjectée(s)"), completion screen "Maîtrise PARFAITE", mobile 390px layout, sticky footer, zero console errors.
- Fixed react-hooks lint error (setState in effect) by refactoring quiz engine to lazy useState initializer; final `bun run lint` clean; dev server 200 OK.

Stage Summary:
- Deliverable: single Next.js app at route "/" — 6 subjects, complete course content, 274-question mastery-loop quiz engine with localStorage persistence, 12 SVG diagrams, command references.
- Key files: src/app/page.tsx, src/components/learn/{diagrams,content-renderer,quiz-engine,subject-view}.tsx, src/data/subjects/*.ts, src/lib/learn-types.ts.
- Extraction artifacts kept in /home/z/my-project/scripts/ (extract_pdfs.py, render_pages.py, extracted/, pdf_images/).

---
Task ID: 2
Agent: main (Z.ai)
Task: User praised the platform ("i loved what u did keep it like that") and announced more subjects will be dropped. Check for new uploaded materials; verify platform health and readiness.

Work Log:
- Re-listed /home/z/my-project/upload/: 28 PDFs, newest = InternetDesObjets-1/2/3.pdf (Oct 18 23:05) — all already integrated into the 6 subjects. No new files arrived.
- Verified platform health: dev server running, GET / → HTTP 200 in 0.03s, recent dev.log shows consistent 200s.
- No code changes made (user explicitly asked to keep the platform as-is).

Stage Summary:
- Platform state: READY for new subjects. Waiting on user to drop next subject files.
- Integration recipe for each new subject (unchanged): extract all PDFs (PyMuPDF text + page rendering for image-based slides) → build complete subject data file (every definition/command/concept, zero omission) → mastery-loop quiz questions with explanations → add SVG diagrams as needed → register in src/data/subjects/index.ts → verify with browser + lint.

---
Task ID: 3
Agent: main (Z.ai)
Task: User dropped 3 new Machine Learning PDFs ("add these"): K-MEANS.pdf (Khlif & Lajmi, English), KNN.pdf (Ben Yahya/Chaabane/Bahia, French), SVM.pdf (French) — all FSM LGLSI3 2025-2026. Integrate as 7th subject with the same recipe.

Work Log:
- Parsed the 3 PDFs (full extracted content delivered with the message; originals in /home/z/my-project/upload/).
- Created src/data/subjects/machine-learning.ts: 3 chapters (kmeans 8 sections, knn 7 sections, svm 9 sections = 24 sections) covering EVERY piece of the 3 supports: definitions, 8-step algorithm, centroid/WCSS math, elbow method + GDP example + remark, initialization practice, 4 advantages + 4 limits, full worked exercise (7 points, 3 iterations with all distance tables), KNN rappel (5 learning types, classification vs régression), 3-step fonctionnement (ours/phoque), distances (euclidienne 2√13, Manhattan 7, Minkowski/Hamming), overfitting/underfitting + validation croisée, avantages/inconvénients, 2 corrected exercises (étudiants + CNAM), SVM Vapnik 1990, f(x)=w·x+b, y·f(x)≥1, primal/dual & Lagrange αi, marge souple ξi + C, kernel trick (linéaire/polynomial/RBF), 6 étapes, and the full Setosa/Versicolor exercise (4 parties + matrice de confusion, Précision=Exactitude=2/3≈67%).
- Wrote 59 mastery-loop quiz questions (20 kmeans + 19 knn + 20 svm): all QCMs from the PDFs verbatim + coverage of every concept and both corrected exercises. All explanations included.
- Added 5 new SVG diagrams to src/components/learn/diagrams.tsx: kmeans-loop, kmeans-elbow, knn-vote, svm-margin, svm-kernel (17 total diagrams now).
- Registered subject in src/data/subjects/index.ts; added BrainCircuit icon to page.tsx ICONS; updated hero (7 sujets), progress (/7), layout.tsx metadata (title/keywords).
- Fixed 2 parsing bugs (missing sections/chapter closers at chapter transitions → 4 unbalanced brackets).
- Verified with agent-browser: home shows 7 subjects incl. ML card (3 chapitres · 59 questions · 24 sections), ML subject page renders all tabs (Cours / Boucle de maîtrise / Commandes (18) — formula cards), all 5 ML SVGs render, quiz answering + wrong-answer requeue ("Réessayer plus tard") + localStorage persistence work, mobile 390px OK, zero console errors.
- bun run lint clean; dev server HTTP 200.

Stage Summary:
- Platform now: 7 subjects · 28 chapters · 333 quiz questions · 17 SVG diagrams.
- Key files changed: src/data/subjects/machine-learning.ts (new, ~1400 lines), src/data/subjects/index.ts, src/components/learn/diagrams.tsx, src/app/page.tsx, src/app/layout.tsx.
- Verification screenshots: scripts/check-ml-{quiz,mobile,course,cmds}.png.

---
Task ID: 4
Agent: main (Z.ai)
Task: User dropped the COMPLETE "Programmation Mobile Android" course ("add this subject") — 9 new PDFs (Partie 1–5, QCM-DS_EXAM-Mobile, TP1–TP3, Soufien GDAIM, FSM LGLSI3 2025/2026). Expand the existing Android subject (which only covered old "Cours - Partie 3" = Interfaces graphiques) with every new piece of content, zero omission, same recipe.

Work Log:
- Scanned upload/: 9 new PDFs (Oct 21). Wrote scripts/extract_android.py (PyMuPDF, distinct android_* names — the new files reuse old "Partie 1/2.pdf" names of the Big Data course) + scripts/render_android.py (150 dpi).
- Partie 1/3/4/5 are image-based scans (4-up handouts) → read all 46 pages visually; Partie 2/QCM/TPs read via text extraction. Full coverage: slides 1–224.
- Verified Partie 3.pdf (slides 78–145) matches the existing android.ts content; old course had slides up to 150 (ListView/advanced widgets — already integrated). Found gaps in old file: RelativeLayout detailed attributes + layout XML examples → added section "RelativeLayout et exemples XML des layouts".
- Expanded src/data/subjects/android.ts from 2 → 9 chapters (50 sections): intro (OS mobiles, concurrents + parts de marché, natif/hybride/web avec BUILD/DEPLOY/technologies, synthèse comparative, meilleur choix, historique Android 2007 + versions Apple pie→Vanilla Ice Cream table, architecture Linux Inside, 6 composants), env (Eclipse+ADT obsolète vs Android Studio, installation, SDK/AVD Manager, architecture projet, AndroidManifest.xml nœuds + exemple, MainActivity/layout), cycle (définition, pile, 3 états + états stables TP2, 7 méthodes de transition, appel téléphonique, onSave/RestoreInstanceState), styles/thèmes/menus/Toasts/boîtes de dialogues (style.xml, Theme.Custom, 3 types de menus + onCreateOptionsMenu/MenuInflater, Toast durées 2s/5s + setGravity, AlertDialog.Builder 5 étapes), intents (explicites/implicites, putExtra/getXXXExtra, startActivityForResult/onActivityResult, requestCode/resultCode, ActivityNotFoundException, intent filter + 3 niveaux, URI/URL/Uri.parse, 5 exemples, tables des actions + caméra), services (Local/Remote, cycle de vie, getSystemService, exemple géolocalisation complet + permissions), TP (TP1 installation/première app/AVD/écouteurs, TP2 callbacks/multi-widgets/values/colors/dimensions/3 dictionnaires, TP3 moyenne + mentions + erreurs).
- Quiz: 25 → 111 questions (86 new with explanations, incl. the QCM-DS/EXAM bank verbatim: gravity, wrap_content, XML, layouts, findViewById, classe R, manifeste, composants, RGB bleu, AVD multi-devices…).
- Commands tab: added 4 cmd blocks (46 command entries: méthodes du cycle de vie, API Intents, API Services, Toasts/menus/AlertDialog) — previously 0.
- Added 7 SVG diagrams to diagrams.tsx (24 total): android-lifecycle, android-stack, android-arch (Linux Inside layers), android-dev-types, android-intent-flow (aller-retour parent/fille), android-service-lifecycle, android-dialog-tree; registered in diagramRegistry.
- Fixed: [string,number]→[string,string] tuple type in AndroidStack; missing React key warning in AndroidArch; restored accidentally-consumed quiz entries an25/an64; misplaced cmd block moved to styles chapter (scripts/fix_android_cmd_block.py).
- Verified: tsc clean (app), bun run lint clean, browser: home card "9 chapitres 111 questions 50 sections", all 9 chapter pills, 31 SVGs on course page (lifecycle + stack diagrams confirmed), Commandes (46), quiz answer → "Correct", mobile 390px OK, zero console errors. Screenshots: scripts/check-android-{cours,quiz,mobile}.png.

Stage Summary:
- Platform now: 7 subjects · 35 chapters · 419 quiz questions · 193 sections · 24 SVG diagrams · 46 Android command entries.
- The Android subject now covers the FULL course (Partie 1→5, slides 1–224) + QCM-DS/EXAM + TP1/TP2/TP3. Note: course sections 6 (Persistance), 7 (Capteurs), 8 (Programmation Concurrente) are listed in the plan slide but NOT present in any provided PDF — if the user drops them later, extend the same way.
- Key files changed: src/data/subjects/android.ts (~1400 lines), src/components/learn/diagrams.tsx (+7 SVGs), scripts/extract_android.py, scripts/render_android.py, scripts/fix_android_cmd_block.py.

---
Task ID: 5
Agent: main (Z.ai)
Task: User dropped "add these" with 3 new PDFs — "Chapitre 1.pdf", "Chapitre 2.pdf", "Chapitre 3.pdf" (Oct 21 11:39). Integrated as the 8th subject "Sécurité Informatique" with the same recipe (zero omission).

Work Log:
- Scanned upload/: 3 new files (Chapitre 1/2/3.pdf). NOTE: the new "Chapitre 1/3.pdf" share names with 2 of the original réparties PDFs (already extracted in scripts/extracted/Chapitre_1.txt & Chapitre_3.txt, so nothing lost) — extracted fresh copies under distinct names (scripts/extract_chapnouveau.py, render_chapnouveau.py, 150 dpi zooms via zoom_chapnouveau.py/zoom2.py).
- All 18 pages are IMAGE-BASED scans (2-up handouts, zero text layer) → read all pages visually (7+3+8): course = "Sécurité Informatique" (plan: 6 chapitres, only 1-3 provided).
- Created src/data/subjects/securite-informatique.ts: 3 chapters (sec-principes 17 sections, sec-crypto-classique 13 sections, sec-crypto-moderne 21 sections = 50 sections) covering EVERY piece: objectif + plan, vocabulaire (menaces/vulnérabilités/attaques + exemples), attaques passives (lecture + analyse du trafic + remarque) et actives (usurpation, rejeu 2 phases, modification, déni de service + remarque), outils d'attaque (Wireshark/nmap, virus/ver/Trojan), exemples (DoS, DDoS, DHCP starvation, ARP spoofing, injections SQL avec code PHP + ali'-- example, phishing), outils de protection (antivirus/anti-malware/IDS Snort/firewall ACCEPT-DROP-REJECT + politique par défaut + Exemples 1&2 de listes), zones (externe/privé/DMZ), stateless vs stateful (NEW/ESTABLISHED/RELATED/INVALID), Netfilter+iptables (3 chaînes, table FILTER, 3 actions, 2 politiques), TOUTES les commandes iptables (-F/-X/-nL/-P/-A/-I/-p/-s/-d/--sport/--dport/-j + man), Exemple 1 (ping/ICMP vers 8.8.8.8), Exercice 2 (HTTP 80/HTTPS 443/DNS 53), 6 services + 3 mécanismes; modèle symétrique (E(K,X)/D(K,Y), 2 types d'échange), cryptanalyse vs force brute, César (décalage 3, clés 1-25, exemples 1/2/3 avec table de force brute → clé=5 "message confidentiel"), mono-alphabétique (26! clés, cryptanalyse fréquentielle), Playfair (matrice 5×5 clé informatique, 4 règles + vérification, exercice clé « sécurité » avec matrice + corrigé indicatif complet TMHM SQBA... + déchiffrement "FACULTExDESxSCIENCES"), Rail Fence (chiffrement P=4 "MAODI EGNEE SFNNL SCITX", déchiffrement C=N/P + exemple 2 P=3, force brute sur P, renforcement par ordre des lignes clé 7423615); diffusion/confusion (Shannon 1949), DES (NIST 1977, notations C/P/K/E/D, bloc 64, clé 56=7×8, 16 rounds, Ki 48 bits, 3 phases, table IP complète + exercice permutation simplifiée P=[14,10,6,2/16,12,8,4/13,9,5,1/15,11,7,3] avec corrigés a-e dont IP⁻¹ ligne 1 = 40,8,48,16,56,24,64,32, Li=Ri-1 / Ri=Li-1⊕F, fonction F complète: table expansion 32→48, 8 S-boxes 6→4 avec tables S1/S2 intégrales + exemple 011001→S1=9/S2=6, table permutation P), PC1 (C0/D0) + table rotations (1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1) + PC2, fiabilité (2^56≈7,2×10^16 + corrigé indicatif des 3 vitesses), Double DES (E_K2(E_K1(P)), meet-in-the-middle 2^56+2^56=2^57), AES (NIST 1997, 15 candidats, 5 finalistes MARS/RC6/Rijndael/SERPENT/TWOFISH, 2001, bloc 128, clés 128/192/256, rounds 10/12/14, 3 types de clés, table paramètres 1408/1664/1920 bits), 5 modes (ECB + 2 inconvénients, CBC + IV + remarque, CFB, OFB, CTR + compteur).
- Quiz: 130 questions avec explications (53 ch1 + 27 ch2 + 50 ch3), préfixes sec1-/sec2-/sec3-, ids "chapter" mappés.
- Added 9 SVG diagrams to src/components/learn/diagrams.tsx (33 total): sec-attacks, sec-arp-spoofing, firewall-zones, sec-services, des-phases, des-fonction-f, des-cles, aes-keys, modes-cbc; registered in diagramRegistry.
- Registered in src/data/subjects/index.ts; added ShieldCheck to page.tsx ICONS; counters 8 sujets · 38 chapitres · 549 questions · 8/8; layout.tsx metadata "8 sujets".
- Fixed 2 bugs along the way: (1) unbalanced brackets at the chapter-1 → chapter-2 boundary of the new data file (tsc caught it); (2) PRE-EXISTING React duplicate-key warnings from table headers key={h} → key={hi} in content-renderer.tsx (triggered by repeated empty headers).
- Fixed PRE-EXISTING mobile horizontal overflow (390px) on every subject's tabs: subject-view.tsx tab buttons lacked min-w-0 so truncate couldn't shrink them (body scrollWidth was 513px, incl. Android quiz) → added min-w-0, now exactly 390.
- Verified: tsc scoped clean, bun run lint clean; agent-browser: home 8 sujets (38 chapitres · 549 questions), Sécurité Info card (3 chapitres · 130 questions · 50 sections), 3 chapter pills, 9 SVGs render, Commandes (23) with all iptables commands, quiz answer correct → green + explanation, wrong answer → "1 erreur(s) réinjectée(s)" + "Réessayer plus tard", mobile 390px no overflow (quiz + commandes), zero console errors. Screenshots: scripts/check-sec-{home,cours,quiz,mobile}.png.

Stage Summary:
- Platform now: 8 subjects · 38 chapters · 549 quiz questions · 243 sections · 33 SVG diagrams · 23 new Sécurité command entries (69 total command entries platform-wide).
- Sécurité Informatique covers Chapitres 1-3 (36 pages scannées). Chapitres 4 (Crypto Asymétrique), 5 (Hachage et Signature Numérique), 6 (Sécurité des Applications Web) sont dans le plan du cours mais PAS fournis — si l'utilisateur les drop plus tard, étendre le même fichier.
- Key files changed: src/data/subjects/securite-informatique.ts (new, ~2470 lines), src/components/learn/diagrams.tsx (+9 SVGs), src/components/learn/content-renderer.tsx (key fix), src/components/learn/subject-view.tsx (min-w-0 fix), src/data/subjects/index.ts, src/app/page.tsx, src/app/layout.tsx; scripts/{extract_chapnouveau,render_chapnouveau,zoom_chapnouveau,zoom2}.py + scripts/chapnouveau_images/.

---
Task ID: 6
Agent: main (Z.ai)
Task: User confirmed "u still have access to all pdf files i gave". Full audit of every uploaded PDF vs integration status + fix HTTP 500 found on the dev server after the Oct 28 session restart.

Work Log:
- Audited /home/z/my-project/upload/: 39 PDFs, ZERO non-PDF files. Complete mapping confirmed — every PDF is integrated: 9× Module → Admin Linux; Chapitre 2-P1/P2 + Chapitre 4 → App. Réparties; Cours Partie 1/2/4/5/6 → Virtualisation; Cours Partie 3 + Partie 1-5 + TP1-3 + QCM-DS_EXAM-Mobile (Oct 21) → Android; IoT 1/2/3 → IoT; hdfs-mapreduce + BD-Nosql + Mongodb-sharding → Big Data; K-MEANS + KNN + SVM (Oct 19) → Machine Learning; Chapitre 1/2/3 (Oct 21 11:39) → Sécurité Informatique. Nothing missing, nothing unprocessed.
- Found dev server returning HTTP 500: stale legacy file src/data/subjects.ts (Oct 17 iteration, exports subjects/getSubject/brandClasses, NO totalQuizQuestions) shadowed the live src/data/subjects/ directory in module resolution (@/data/subjects → file wins over directory index). Warm Turbopack cache had masked it since Oct 19; the Oct 28 restart recompiled and the stale file won.
- Quarantined ALL dead Oct 17-18 iteration code into legacy_backup/ (reversible moves, script scripts/quarantine_legacy.sh): src/data/{subjects.ts, bigdata/, dar/, iot/, modules/, quiz/, vcloud/, commands.ts, glossary.ts, module1-5.ts, modules.ts, quiz.ts, types.ts}, src/components/{BlockRenderer.tsx, bigdata/, course/, dar/, diagrams/, iot/, quiz/, vcloud/}, src/types/course.ts. Live tree now: src/components/{learn,ui} + src/data/subjects + src/lib + src/hooks + src/app.
- Updated tsconfig.json excludes (+legacy_backup, +examples, +skills — pre-existing scaffold type errors, none are project code).
- Verification: bunx tsc --noEmit CLEAN, bun run lint CLEAN, GET / → HTTP 200 (0.04s); agent-browser: title "Ma Bibliothèque de Révision — 8 sujets", all 8 subject cards with correct stats (52+52+60+111+45+40+59+130 = 549 questions ✓), Sécurité Informatique opens (Cours/Boucle de maîtrise/Commandes (23)), quiz question answered → buttons disabled + "Continuer", zero console errors. Screenshots: scripts/check-recovery-{home,quiz}.png.

Stage Summary:
- Fixed: post-restart HTTP 500 (module shadowing). Root cause eliminated permanently — the shadowing file no longer exists in src/.
- Platform state: 8 subjects · 38 chapters · 549 questions · 243 sections · 33 SVG diagrams · 69 command entries. All 39 uploaded PDFs integrated, confirmed by audit.
- legacy_backup/ kept for reference only; nothing in src/ references it.

---
Task ID: 7
Agent: main (Z.ai)
Task: User dropped the FINAL subject "here is the last subject add it" — Cours.pdf (8.2 MB, 279 slides), "Architecture SOA et Services Web", Dr. Ghada Feki, FSM LGLSI3. Integrated as the 9th subject with the same recipe (zero omission).

Work Log:
- Extracted all 279 pages via scripts/extract_soa.py (PyMuPDF → scripts/extracted/soa_Cours.txt, 127K chars) + rendered 44 image-based pages visually via scripts/render_soa.py (scripts/soa_images/) — read ALL of them: SOAP examples (GetLastTradePrice, SoapUI addition 6+2=8, PayPal eBL, encodage tableau, header User/Session/Language analysis, Fault 1.1 + VersionMismatch, Manifest XLink), technologies diagram, abstraction levels, approches Bottom-Up/TOP_down, WSDL structure table, WADL Jersey example, composant de service, bus ESB, du service au processus (3 SI + moteur), orchestration vs chorégraphie schema.
- Course structure: plan annonce 5 chapitres mais les slides incluent Web Services gRPC (numéroté « Chapitre 4 ») + bilans SOAP/REST/gRPC → 6 chapitres intégrés : 1 Introduction (problématique spaghetti/EAI, définitions, avantages/inconvénients, top business + PayPal/FedEx/Bluehost, acteurs, fonctionnement, SOA vs POO/distribuée, abstraction, Bottom-Up/Top-down, bilan) · 2 Les Services (8 aspects complets : contrat 3 volets + WSDL/policies/XSD, couplage lâche technique/fonctionnel + 4 dépendances + contract-first/last, abstraction/prédictibilité, réutilisabilité 3 freins + Push/Pull/Top-down, autonomie 2 niveaux, stateless 3 problèmes, découvrabilité repository, composabilité granularité ; B2B 5 exemples, B2C 5 exemples, Google+/Twitter/WordPress/Viadeo-LinkedIn/Facebook-Myspace, types SOAP/REST/gRPC + QCM 20 questions + 3 vidéos) · 3 SOAP (technologies WSDL/SOAP/UDDI/ESB, pile protocolaire, couche HTTP complète verbes/entités/requête-réponse/Content-Length, XML complet XSD/XSLT/XPath/espaces de noms/grammaires/validité/avantages, SOAP 9 principes détaillés (nœuds+rôles, encodage, RPC 6 étapes, messages, acheminement 7 étapes, intermédiaire actif, types simples/composés, transport RPC/messagerie, sécurité 3 risques), Envelope 1.1/1.2, Header 4 attributs + 3 valeurs role + tableau réacheminement 9 lignes, Body, Fault structure 1.2/1.1 + 5 codes d'erreurs, MIME attachements + Manifest Header XLink, SOAP en 2026 + WS-* 4 normes + microservices + cloud AWS/Azure + 4 bibliothèques, WSDL abstrait/concret + table 1.1 vs 2.0, UDDI moderne (banque, 4 entrées, jUDDI), exemples GetLastTradePrice/SoapUI/PayPal) · 4 REST (Fielding 2000, ROA/DOA, RESTful, 6 propriétés + 6 caractéristiques, ressources/URI/CRUD, JSON, WADL, JAX-RS JSR 339 + 4 implémentations, @Path/@GET-POST-PUT-DELETE/@Produces-@Consumes/@PathParam-FormParam-QueryParam-HeaderParam-CookieParam avec tous les codes, JAXB, plateformes API (table UDDI→moderne + Apigee/AWS/Azure/Kong), exemple Spring Boot complet 7 étapes avec tout le code) · 5 gRPC & bilans (Google/HTTP2/protobuf/IDL, workflow 4 étapes, avantages, 4 modèles communication, Istio control/data plane, table évolution registres 4 époques, exemple Spring Boot complet student.proto + StudentGrpcService + port 9090, bilans SOAP/REST/gRPC, comment choisir) · 6 Orchestration & Chorégraphie (composant de service, ESB, données TDE/persistantes, service composite/mashup, 80% exceptions, orchestration définition/moteur/BPMN/BPEL activités, limites, chorégraphie WS-CDL/4 savoirs/décentralisée/composition dynamique, limites, synthèse comparative).
- Created src/data/subjects/soa-services-web.ts (~1560 lines): 6 chapters, 96 sections, tout le contenu + exemples de code (XML SOAP, Java JAX-RS, Spring Boot, protobuf, properties).
- Quiz: 139 questions avec explications (20+18+46+26+12+17), préfixes soa1-…soa6-, ids mappés aux chapitres; scripts/rotate_soa_quiz.py a réparti les indices corrects (33/37/36/33 — le moteur ne mélange pas les options).
- Added 3 blocs « Référence rapide » (cmd) : SOAP/HTTP/WSDL/UDDI (19), JAX-RS/Spring Boot (18), gRPC/.proto/services (16) = 53 commandes.
- Added 7 SVG diagrams to diagrams.tsx (40 total) : soa-triangle, soa-abstraction, soap-stack, soap-message, rest-crud, grpc-arch, orch-vs-choreo — registered in diagramRegistry.
- Registered in src/data/subjects/index.ts; added Workflow icon (import + ICONS) in page.tsx; hero "9 sujets", counter /9; layout.tsx metadata "9 sujets".
- Fixed NEW mobile overflow (390px → 517px) : token insécable de 55 chars (@PathParam/@FormParam/…) dans le summary du chapitre 4 → subject-view.tsx accordion trigger + summary : min-w-0 + break-words + [overflow-wrap:anywhere] → 390px exact (bénéficie à tous les sujets).
- Verified: tsc clean, bun run lint clean, GET / HTTP 200 (0.04s); agent-browser: home "9 sujets", carte SOA (6 chapitres · 139 questions · 96 sections), 6 chapitres rendus, 8 SVGs sur la page cours, Commandes (53), quiz: réponse correcte → Continuer, réponse fausse → "Réessayer plus tard" + réinjection, mobile 390px exact, zero console errors. Screenshots: scripts/check-soa-{quiz,wrong,mobile}.png.

Stage Summary:
- Platform now: 9 subjects · 44 chapters · 688 quiz questions · 339 sections · 40 SVG diagrams · 122 command entries platform-wide.
- SOA & Services Web couvre les 279 diapositives intégrales de Cours.pdf (Dr. Ghada Feki) — dernier sujet demandé. Les 9 sujets sont maintenant complets.
- Key files changed: src/data/subjects/soa-services-web.ts (new), src/data/subjects/index.ts, src/components/learn/diagrams.tsx (+7 SVGs), src/components/learn/subject-view.tsx (overflow fix), src/app/page.tsx, src/app/layout.tsx; scripts/{extract_soa,render_soa,rotate_soa_quiz}.py + scripts/soa_images/.

---
Task ID: 8
Agent: main (Z.ai)
Task: User reported "fix the error the web page didn't load" — HTTP 500 on GET / after a fresh sandbox boot.

Work Log:
- dev.log: "Export totalQuizQuestions doesn't exist in target module ... Did you mean to import brandClasses?" — the Oct 17 legacy src/data/subjects.ts was shadowing src/data/subjects/ again. The Task 6 fix used mv (files moved to legacy_backup/), but the sandbox snapshot restore resurrected the Oct 17-18 legacy files back into src/ (verified byte-identical to the legacy_backup/ copies via diff -q / diff -rq on every file and dir). Active tree confirmed clean: zero imports of any legacy path (rg over src/app, src/components/{learn,ui}, src/data/subjects, src/lib, src/hooks).
- Permanent fix: scripts/fix_shadowing.sh — HARD DELETE (rm, not mv) of all legacy paths from src/: src/data/{subjects.ts, bigdata/, dar/, iot/, modules/, quiz/, vcloud/, commands.ts, glossary.ts, module1-5.ts, modules.ts, quiz.ts, types.ts}, src/components/{BlockRenderer.tsx, bigdata/, course/, dar/, diagrams/, iot/, quiz/, vcloud/}, src/types/. Reference copies remain in legacy_backup/. Re-runnable guard: if the 500 ever recurs (another snapshot restore), run this script and restart.
- Cold rebuild: killed dev server, rm -rf .next, ran fix script, fresh boot → GET / HTTP 200 in 4.2s (the exact condition that exposed the bug both times: cold Turbopack compile).
- Note: processes spawned within tool calls die between tool calls in this sandbox (nohup/setsid both reaped) — the persistent dev server is started by the platform driver at each session boot, which now compiles the fixed tree.
- Verification: bunx tsc --noEmit CLEAN; bun run lint CLEAN; agent-browser E2E: title "Ma Bibliothèque de Révision — 9 sujets", all 9 subject cards with correct stats, SOA subject opens with tabs Cours complet / Boucle de maîtrise / Commandes (53), quiz question renders with 4 options, wrong answer (B ESB) → red ✗ + explanation panel "Incorrect — cette question reviendra dans la boucle" + "1 erreur(s) réinjectée(s)" (mastery loop functional), zero console/page errors. Screenshots: scripts/check-fix-home.png, scripts/check-fix-quiz.png.

Stage Summary:
- Fixed: recurring HTTP 500 (legacy file shadowing resurrected by sandbox snapshot restore). Root-cause class eliminated: shadowing files are hard-deleted from src/, not just moved.
- Platform state unchanged and healthy: 9 subjects · 44 chapters · 688 questions · 339 sections · 40 SVG diagrams · 122 command entries. All Task 7 SOA content intact (verified: soa-triangle in diagrams.tsx, "9 sujets" in page.tsx/layout.tsx, Commandes (53) tab, 139-question SOA quiz loop).
