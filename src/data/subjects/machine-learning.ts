import type { Subject } from "@/lib/learn-types";

// ═══════════════════════════════════════════════════════════════════════════
// SUJET 7 — MACHINE LEARNING (supports FSM · LGLSI3 · 2025-2026)
// 3 supports étudiants : K-MEANS (Med Yassine Khlif & Sedki Lajmi, en anglais),
// KNN (Manar Ben Yahya, Fedia Chaabane, Ikhlas Bahia), SVM (LGLSI3 FSM).
// Contenu intégral : définitions, étapes, formules, exemples, QCM, exercices corrigés.
// ═══════════════════════════════════════════════════════════════════════════

export const machineLearning: Subject = {
  id: "machine-learning",
  name: "Machine Learning — Algorithmes",
  shortName: "Machine Learning",
  teacher: "Supports étudiants — FSM · LGLSI3 (2025-2026)",
  icon: "BrainCircuit",
  gradient: "from-fuchsia-500 via-purple-500 to-violet-600",
  accent: "#a855f7",
  description:
    "Les 3 algorithmes fondamentaux du Machine Learning : K-Means (clustering non supervisé), KNN (classification par les voisins les plus proches) et SVM (marge maximale & astuce du noyau) — définitions, formules, étapes, avantages/limites et exercices corrigés pas à pas.",
  chapters: [
    // ───────────────────────── CHAPITRE 1 : K-MEANS ─────────────────────────
    {
      id: "kmeans",
      title: "K-Means — Clustering non supervisé",
      summary:
        "Clustering = apprentissage non supervisé (sans données étiquetées). K-Means partitionne les données en K clusters distincts et non chevauchants. Étapes, mathématiques et fonction de coût J (WCSS), méthode du coude, initialisation pratique, avantages/limites, exercice complet avec 3 itérations. (Support original en anglais — Khlif & Lajmi, FSM 2025-2026)",
      sections: [
        {
          heading: "Introduction & definition",
          blocks: [
            {
              type: "p",
              text: "In the world of data science and machine learning, clustering is an unsupervised learning technique used to group similar data points. Unlike supervised learning, clustering does not require labeled data. One of the most popular clustering algorithms is K-Means, which organizes data into K distinct, non-overlapping clusters based on the similarity of features. K-Means is an iterative algorithm that partitions a dataset into K clusters, where each data point belongs to the cluster with the nearest mean (centroid).",
            },
            {
              type: "kv",
              items: [
                { k: "K", v: "number of clusters chosen by the user" },
                { k: "Means", v: "refers to the average (mean) of the data points in a cluster, representing its center" },
                { k: "Objective", v: "maximizing similarity within groups — items within each cluster are much more alike than the items in other clusters" },
              ],
            },
            {
              type: "p",
              text: "K-Means clustering is widely used when we want to group similar items without knowing the categories beforehand. Typical applications: detect anomalies in data, group similar songs by tempo and rhythm, segment customers based on buying behavior, or classify images and documents by content.",
            },
            {
              type: "callout",
              variant: "tip",
              title: "Example — music recommendation (Spotify, YouTube Music, Apple Music)",
              text: "Millions of songs are analyzed on numerical features: tempo (how fast the song is), energy level (calm vs. intense), danceability, instrumentation (acoustic vs. electronic), loudness. Each song becomes a data point with those attributes. K-Means groups them into clusters: Cluster 1 = calm, slow, acoustic songs (study/relax playlist); Cluster 2 = high-energy, electronic songs (gym playlist); Cluster 3 = medium-tempo pop songs (party playlist). The algorithm does not know \"genre\" or \"mood\" — it just groups songs mathematically based on the distance between features.",
            },
          ],
        },
        {
          heading: "Steps of the K-Means algorithm",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "Choose the number of clusters (K). Example: K = 3 for three clusters.",
                "Initialize centroids randomly.",
                "Randomly select K points from the dataset as initial cluster centers.",
                "Assign each data point to the nearest centroid.",
                "Compute distance (usually Euclidean) and assign to the closest centroid.",
                "Update the centroids.",
                "Recalculate each centroid as the mean of the points in its cluster.",
                "Repeat steps 3–4 (assign + update) until centroids do not change significantly or a maximum number of iterations is reached.",
              ],
            },
            {
              type: "cmd",
              commands: [
                { cmd: "new centroid x = (x1 + x2 + … + xn) / n", desc: "moyenne des coordonnées X des points du cluster" },
                { cmd: "new centroid y = (y1 + y2 + … + yn) / n", desc: "moyenne des coordonnées Y (x1…xn = coordonnées X, y1…yn = coordonnées Y, n = nombre de points du cluster)" },
              ],
            },
            {
              type: "p",
              text: "Assign each data point to the nearest centroid again, and keep repeating the algorithm. As we can see, the centroids are not moving anymore — they have converged, and we finally have our clusters.",
            },
            { type: "diagram", id: "kmeans-loop", caption: "La boucle K-Means : assigner → mettre à jour → converger" },
          ],
        },
        {
          heading: "Mathematics and the cost function",
          blocks: [
            {
              type: "p",
              text: "Representation: the whole dataset contains n data points x(1), …, x(n) — each x(i) is one data point (a sample) living in a D-dimensional space. Think of both the data points and the centroids as vectors. There are K clusters, so there are K centroids μ1, …, μK.",
            },
            {
              type: "p",
              text: "Distance: instead of using the raw distance, we square the distance — mainly for mathematical convenience. Squaring does not change which centroid is the closest, but it makes the calculations easier because it removes the square roots from the formula, which simplifies the math and the optimization process. After computing the squared distances to all K centroids, we choose the smallest one and assign the data point to that cluster.",
            },
            {
              type: "p",
              text: "Update: once the points are assigned to a cluster, the next step is to update the centroids. For each cluster, we calculate the mean position of all data points assigned to it — that average becomes the new centroid of cluster k at the next iteration (t + 1).",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "J = Σ (k = 1..K) Σ (x(i) ∈ Ck) ‖x(i) − μk‖²", desc: "cost function = Within-Cluster Sum of Squares (WCSS) — double summation" },
                { cmd: "μk(t+1) = (1 / nk) · Σ (x(i) ∈ Ck) x(i)", desc: "nouveau centroïde du cluster k : moyenne des points qui lui sont assignés (nk = nombre de points du cluster)" },
                { cmd: "d(x, μk) = ‖x − μk‖²", desc: "distance euclidienne au carré — assigner au centroïde le plus proche" },
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "What we are actually doing in K-Means",
              text: "We minimize a cost function, usually denoted J. It measures how far each data point is from its assigned centroid. The inner summation represents the distances of the data points within one cluster, and the outer summation repeats this for all K clusters. J is also called the Within-Cluster Sum of Squares (WCSS).",
            },
          ],
        },
        {
          heading: "Choosing K — the Elbow Method",
          blocks: [
            {
              type: "p",
              text: "Now the question is: how do we decide how many clusters we actually need? If we set K = 2, the data splits into two clusters. If we set K = 3, it splits further — as we increase K, the data continues to be divided into smaller and smaller groups. One of the most widely used approaches to find a good value for K is the Elbow Method: run K-Means for multiple values of K, and for each value calculate the cost function J. Then plot K against the cost. The elbow point is a good choice — in the course example, K = 3 appears to be a good choice, although K = 4 is also acceptable.",
            },
            { type: "diagram", id: "kmeans-elbow", caption: "Méthode du coude : J diminue quand K augmente — le « coude » indique un bon K" },
            {
              type: "p",
              text: "Worked example — clustering countries by their GDP relative to their population size. The objective is to identify different groups (small, medium and large economies) and assign each country to a cluster based on its position on a graph where GDP is a function of population. China: very high population, high GDP. Tunisia: medium population, moderate GDP. Djibouti: small population, low GDP. With K = 3 the clusters represent Large / Medium / Small economies. But with K = 5 the grouping becomes more detailed: Rural / Small / Medium / Large / Mega.",
            },
            {
              type: "callout",
              variant: "warn",
              title: "Remark — do not rely only on mathematics",
              text: "The number of clusters also depends on the practical goal of the analysis. K = 3 might represent small, medium and large cities; K = 5 could give rural areas, small cities, medium cities, large cities and megacities. Both interpretations are valid, depending on the purpose of the analysis. Methods like the Elbow Method are helpful, but we should also use common sense and domain knowledge when choosing the number of clusters.",
            },
          ],
        },
        {
          heading: "Initialization in practice",
          blocks: [
            {
              type: "p",
              text: "At the beginning, we placed the centroids anywhere on the screen just to demonstrate the concept. But in practice, we rarely do that. A common approach is to randomly select K data points directly from the dataset and use those as the initial centroids. This way, the centroids start at positions that already lie within the data distribution, which usually leads to faster convergence and more meaningful clusters compared to placing them completely at random.",
            },
            {
              type: "p",
              text: "Example (same GDP-versus-population dataset): suppose we want three clusters. We initialize three centroids by choosing three points from the dataset. Once that is done, the K-Means algorithm starts running as usual.",
            },
          ],
        },
        {
          heading: "Advantages of K-Means",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "Simple and easy to implement — the logic is straightforward: assign → update centroids → repeat.",
                "Fast and scalable — works efficiently with large datasets. Example: segmenting millions of customers into groups based on purchase habits.",
                "Interpretable results — output clusters are easy to understand (centroid + grouped data). Example: grouping students based on grades into high/medium/low performance.",
                "Guaranteed convergence — it always reaches a result after several iterations (may not be the global best). Example: after a few steps, the centroids stabilize and stop moving.",
              ],
            },
          ],
        },
        {
          heading: "Limitations of K-Means",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "Requires predefining K (number of clusters) — you must choose K before running the algorithm. Example: you need to decide whether customers should be divided into 3 or 5 clusters.",
                "Sensitive to initialization — different starting centroids can lead to different results. Example: two runs may produce different clusters depending on the initial random points.",
                "Sensitive to outliers — a single extreme point can pull the centroid far from the actual cluster center. Example: in salary data, one person earning $1,000,000 distorts the cluster.",
                "Only works with numerical data — requires numerical distance calculation (Euclidean distance). Example: it cannot cluster text labels like \"red\", \"blue\", \"green\" unless converted into numbers.",
              ],
            },
            {
              type: "callout",
              variant: "info",
              title: "Conclusion (support original)",
              text: "K-Means is one of the most fundamental clustering algorithms in machine learning. It is efficient, intuitive, and forms the basis for many advanced techniques in data science and AI.",
            },
          ],
        },
        {
          heading: "Worked exercise — clustering 7 points (K = 2)",
          blocks: [
            {
              type: "p",
              text: "Exercise (from the support): 1. Plot the data points (X vs. Y) on a scatter chart to visualize their distribution. 2. Apply the K-Means algorithm to cluster the data into 2 groups (K = 2) with initial centroids C₁ = (3.5, 4.5) and C₂ = (3.5, 5).",
            },
            {
              type: "table",
              headers: ["Point", "X", "Y"],
              rows: [
                ["A", "1", "1"],
                ["B", "1.5", "2"],
                ["C", "2.5", "4"],
                ["D", "5", "7"],
                ["E", "3.5", "5"],
                ["F", "4.5", "5"],
                ["G", "3.5", "4.5"],
              ],
            },
            {
              type: "p",
              text: "Step 1 — choose initial centroids: C₁ = (3.5, 4.5) and C₂ = (3.5, 5). Step 2 — compute distances to the initial centroids (iteration 1) and assign each point to the closest:",
            },
            {
              type: "table",
              headers: ["Point", "d(C₁)", "d(C₂)", "Assigné à"],
              rows: [
                ["A(1, 1)", "4.3", "4.71", "Cluster 1"],
                ["B(1.5, 2)", "3.2", "3.6", "Cluster 1"],
                ["C(2.5, 4)", "1.11", "1.41", "Cluster 1"],
                ["D(5, 7)", "2.91", "2.5", "Cluster 2"],
                ["E(3.5, 5)", "0.5", "0", "Cluster 2"],
                ["F(4.5, 5)", "1.11", "1", "Cluster 2"],
                ["G(3.5, 4.5)", "0", "0.5", "Cluster 1"],
              ],
            },
            {
              type: "p",
              text: "Step 3 — update centroids. Cluster 1 = {A(1,1), B(1.5,2), C(2.5,4), G(3.5,4.5)} → C₁ = (2.12, 2.87). Cluster 2 = {D(5,7), E(3.5,5), F(4.5,5)} → C₂ = (4.3, 5.6).",
            },
            {
              type: "p",
              text: "Step 4 — compute distances to the new centroids (iteration 2):",
            },
            {
              type: "table",
              headers: ["Point", "d(C₁ = 2.12, 2.87)", "d(C₂ = 4.3, 5.6)", "Assigné à"],
              rows: [
                ["A(1, 1)", "2.19", "5.73", "Cluster 1"],
                ["B(1.5, 2)", "1.07", "4.63", "Cluster 1"],
                ["C(2.5, 4)", "1.18", "2.47", "Cluster 1"],
                ["D(5, 7)", "5.01", "1.57", "Cluster 2"],
                ["E(3.5, 5)", "2.58", "1", "Cluster 2"],
                ["F(4.5, 5)", "3.19", "0.63", "Cluster 2"],
                ["G(3.5, 4.5)", "2.13", "1.36", "Cluster 2"],
              ],
            },
            {
              type: "p",
              text: "Step 5 — update centroids. Cluster 1 = {A, B, C} → C₁ = (1.6, 2.3). Cluster 2 = {G, D, E, F} → C₂ = (4.12, 5.37). Note that G moved from Cluster 1 to Cluster 2.",
            },
            {
              type: "p",
              text: "Step 6 — compute distances to the new centroids (iteration 3):",
            },
            {
              type: "table",
              headers: ["Point", "d(C₁ = 1.6, 2.3)", "d(C₂ = 4.12, 5.37)", "Assigné à"],
              rows: [
                ["A(1, 1)", "1.49", "5.37", "Cluster 1"],
                ["B(1.5, 2)", "0.32", "4.28", "Cluster 1"],
                ["C(2.5, 4)", "1.86", "2.13", "Cluster 1"],
                ["D(5, 7)", "5.74", "1.86", "Cluster 2"],
                ["E(3.5, 5)", "3.26", "0.72", "Cluster 2"],
                ["F(4.5, 5)", "3.97", "0.53", "Cluster 2"],
                ["G(3.5, 4.5)", "2.89", "1.07", "Cluster 2"],
              ],
            },
            {
              type: "table",
              headers: ["Itération", "C₁", "C₂"],
              rows: [
                ["1", "(3.5, 4.5)", "(3.5, 5)"],
                ["2", "(2.12, 2.87)", "(4.3, 5.6)"],
                ["3", "(1.6, 2.3)", "(4.12, 5.37)"],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Centroid movement & convergence",
              text: "The movements between iterations are small, meaning the centroids have nearly converged. This indicates that the K-Means algorithm has reached convergence, and Iteration 3 is the final iteration. Final result: Cluster 1 = {A, B, C} autour de (1.6, 2.3) — Cluster 2 = {D, E, F, G} autour de (4.12, 5.37).",
            },
          ],
        },
      ],
    },
    // ───────────────────────── CHAPITRE 2 : KNN ─────────────────────────
    {
      id: "knn",
      title: "KNN — K-Nearest Neighbors",
      summary:
        "Rappel du Machine Learning (5 types d'apprentissage, classification vs régression), définition et caractéristiques du KNN (algorithme paresseux), fonctionnement en 3 étapes (exemple ours/phoque), distances euclidienne et de Manhattan, choix du paramètre K (overfitting/underfitting, validation croisée), avantages/inconvénients et 2 exercices corrigés.",
      sections: [
        {
          heading: "Rappel — le Machine Learning",
          blocks: [
            {
              type: "p",
              text: "Définition : le machine learning (ou « apprentissage automatique ») est une technologie qui permet à des ordinateurs d'apprendre par eux-mêmes à partir d'exemples, sans être explicitement programmés pour chaque tâche.",
            },
            {
              type: "list",
              items: [
                "Apprentissage supervisé",
                "Apprentissage non supervisé",
                "Apprentissage par renforcement",
                "Apprentissage semi-supervisé",
                "Apprentissage par transfert",
              ],
            },
            {
              type: "p",
              text: "L'apprentissage supervisé est un type d'apprentissage automatique où un modèle est entraîné sur des données étiquetées. Il se divise en deux branches selon la nature de la sortie y :",
            },
            {
              type: "table",
              headers: ["", "Classification", "Régression"],
              rows: [
                ["Valeurs de y", "discrètes", "continues"],
                ["Valeurs possibles", "des classes (chien ou chat)", "des nombres réels (des degrés de température)"],
                ["Exemples d'algorithmes", "Arbres de décision, KNN…", "Régression linéaire, régression logistique, KNN…"],
              ],
            },
          ],
        },
        {
          heading: "Définition de KNN",
          blocks: [
            {
              type: "p",
              text: "Le KNN (K-Nearest Neighbors) est un algorithme de Machine Learning supervisé qui classe un nouvel élément en regardant les k voisins les plus proches dans les données déjà connues. Il décide selon la majorité de ses voisins.",
            },
            {
              type: "kv",
              items: [
                { k: "Simple", v: "à comprendre et à utiliser" },
                { k: "Paresseux (« lazy algorithm »)", v: "il ne « construit » pas de modèle — il se contente de mémoriser les données et fait les calculs au moment de la prédiction" },
                { k: "Polyvalent", v: "peut être utilisé pour la classification ou la régression" },
                { k: "Se base sur la similarité", v: "les objets similaires sont proches" },
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "Le principe de KNN",
              text: "« Dis-moi qui sont tes voisins, je te dis qui tu es. »",
            },
          ],
        },
        {
          heading: "Fonctionnement de KNN — 3 étapes (exemple ours / phaque)",
          blocks: [
            {
              type: "p",
              text: "Contexte : notre jeu de données contient des ours et des phoques, chacun est déjà étiqueté « Ours » ou « Phoque ». Un nouvel animal non étiqueté est découvert.",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "Étape 1 — définir la valeur de K : le nombre de voisins que l'algorithme va consulter pour prendre sa décision. Prenons K = 3.",
                "Étape 2 — calculer les distances entre la nouvelle donnée et toutes celles déjà existantes. Utilité : ces distances permettent à l'algorithme de repérer les plus proches voisins de la nouvelle donnée pour faire sa prédiction.",
                "Étape 3 — identifier les K plus proches voisins pour classer la nouvelle donnée : le résultat final est simplement la classe qui apparaît la plus fréquemment parmi les K voisins sélectionnés. Appliqué à notre cas : parmi les K = 3 plus proches voisins (2 phoques et 1 ours), le nouvel animal est classé phoque par majorité.",
              ],
            },
            { type: "diagram", id: "knn-vote", caption: "KNN : le nouvel animal est classé par vote majoritaire de ses K plus proches voisins" },
          ],
        },
        {
          heading: "Les distances utilisées par KNN",
          blocks: [
            {
              type: "cmd",
              commands: [
                { cmd: "d(A,B) = √[(xB − xA)² + (yB − yA)²]", desc: "Distance euclidienne — formule générale" },
                { cmd: "AB = √[(7 − 3)² + (8 − 2)²] = 2√13", desc: "Exemple euclidien du cours" },
                { cmd: "d(A,B) = |xB − xA| + |yB − yA|", desc: "Distance de Manhattan (somme des différences absolues)" },
                { cmd: "A(2, 3), B(5, 7) → |5 − 2| + |7 − 3| = 7", desc: "Exemple Manhattan du cours" },
              ],
            },
            {
              type: "p",
              text: "D'autres méthodes de calcul de distance existent pour le KNN au-delà de celles citées ici : distance de Minkowski, distance de Hamming… Le choix de la méthode de calcul de distance dans l'algorithme k-NN dépend du type de données (numériques, catégorielles, avec ou sans échelle).",
            },
          ],
        },
        {
          heading: "Choix du paramètre K",
          blocks: [
            {
              type: "p",
              text: "Choisir K n'est pas aléatoire. Le choix du paramètre k peut conduire à deux situations problématiques :",
            },
            {
              type: "table",
              headers: ["Situation", "Cause", "Effet"],
              rows: [
                ["Sur-apprentissage (overfitting)", "K très petite (exemple : k = 1)", "Le modèle se concentre trop sur les détails et perd les généralités — il mémorise le bruit et les particularités au lieu d'apprendre les tendances générales"],
                ["Sous-apprentissage (underfitting)", "K très grande", "Le modèle perd les détails et les motifs importants — il est trop simpliste pour capturer la structure complexe des données"],
              ],
            },
            {
              type: "list",
              items: [
                "Validation croisée : trouver le K optimal en testant chaque valeur sur différentes partitions des données et retenir celle avec la meilleure performance moyenne.",
                "Courbe d'erreur : la meilleure valeur de K est celle où l'erreur est la plus petite.",
                "Autres méthodes pour déterminer K : le coude, les règles empiriques…",
              ],
            },
          ],
        },
        {
          heading: "Avantages et inconvénients",
          blocks: [
            {
              type: "table",
              headers: ["Avantages", "Inconvénients"],
              rows: [
                ["Simplicité et facilité de compréhension — le concept est intuitif : « les objets similaires sont proches »", "Coût calculatoire élevé lors de la prédiction — l'algorithme doit calculer la distance entre le nouvel exemple et tous les points de l'ensemble d'entraînement"],
                ["Aucune phase d'entraînement explicite — il n'y a pas de processus d'entraînement coûteux pour construire un modèle", "Sensibilité au bruit et aux données non pertinentes — si l'ensemble de données contient des caractéristiques non pertinentes ou du bruit, les calculs de distance seront faussés"],
                ["Adaptabilité aux données — il suffit d'ajouter les nouveaux exemples à l'ensemble d'entraînement pour que l'algorithme les prenne immédiatement en compte", "Sensibilité à la dimensionnalité — il devient difficile de trouver de « vrais » voisins proches, ce qui dégrade la performance"],
              ],
            },
            {
              type: "callout",
              variant: "info",
              title: "Conclusion",
              text: "En raison de sa simplicité et de sa précision, le k-NN est l'un des premiers classificateurs appris par les débutants en science des données. Son principe repose sur la similarité entre les données : un nouvel élément est classé en fonction des catégories majoritaires de ses voisins les plus proches. Cet algorithme ne calcule aucun modèle prédictif et il rentre dans le cadre de l'apprentissage paresseux.",
            },
          ],
        },
        {
          heading: "Exercices d'application",
          blocks: [
            {
              type: "p",
              text: "Exercice 1 — Énoncé : on dispose d'un jeu de données concernant des étudiants. Pour chaque étudiant, on connaît le nombre d'heures passées à étudier, la note obtenue à un test pratique (en pourcentage) et le résultat final à l'examen (Réussite ou Échec). À l'aide de l'algorithme KNN, prédisez le résultat (« Réussite » ou « Échec ») d'un nouvel étudiant ayant : temps d'étude = 2 heures, score au test = 75 %. NB : supposons que K = 3.",
            },
            {
              type: "table",
              headers: ["Temps de révision (heures)", "Résultat du test (%)", "Résultat"],
              rows: [
                ["2", "85", "Réussi"],
                ["3", "70", "Échoué"],
                ["5", "90", "Réussi"],
                ["1", "60", "Échoué"],
                ["4", "80", "Réussi"],
              ],
            },
            {
              type: "p",
              text: "Correction : 1. Identifier les variables — X₁ (heures d'étude) = 2, X₂ (note au test) = 75 ; le nouvel étudiant a pour coordonnées (2, 75). 2. Calculer la distance euclidienne Distance = √[(X₂ − X₁)² + (Y₂ − Y₁)²] entre (2, 75) et tous les points du jeu d'entraînement.",
            },
            {
              type: "table",
              headers: ["Point", "Distance avec (2, 75)", "Classe"],
              rows: [
                ["(2, 85)", "10", "Réussi"],
                ["(3, 70)", "5.1", "Échoué"],
                ["(1, 60)", "15.1", "Échoué"],
                ["(4, 80)", "5.4", "Réussi"],
                ["(5, 90)", "15.8", "Réussi"],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Exercice 1 — Résultat",
              text: "Les 3 plus proches voisins (k = 3) sont : (3, 70), (4, 80) et (2, 85). Sur les 3 plus proches voisins : 2 ont réussi l'examen et 1 a échoué. Conclusion : le modèle prédit une RÉUSSITE pour le nouvel étudiant.",
            },
            {
              type: "p",
              text: "Exercice 2 — Énoncé : une compagnie d'assurance (CNAM) veut savoir si une personne va souscrire à une assurance santé ou non. On dispose d'un petit jeu de données de clients (âge en années, salaire mensuel en dinars, achat assurance : Oui = 1, Non = 0). Prédisez, en utilisant l'algorithme KNN, si une nouvelle personne X achètera une assurance santé ou non, sachant qu'elle a 40 ans et un salaire de 3200 dinars. NB : supposons que K = 3.",
            },
            {
              type: "table",
              headers: ["Âge (années)", "Salaire (dinars)", "Achat assurance", "Distance avec X (40, 3200 dt)"],
              rows: [
                ["25", "2000", "1", "1200.09"],
                ["30", "2500", "1", "700.07"],
                ["35", "1800", "0", "1400.01"],
                ["50", "4000", "1", "800.06"],
                ["45", "3000", "0", "200.06"],
                ["60", "3500", "1", "300.67"],
              ],
            },
            {
              type: "p",
              text: "Correction : on calcule la distance euclidienne entre le point (40, 3200) et tous les autres points — exemple : √[(3200 − 2000)² + (40 − 25)²] = 1200.09.",
            },
            {
              type: "callout",
              variant: "tip",
              title: "Exercice 2 — Résultat",
              text: "Les plus proches voisins (k = 3) sont les personnes éloignées de la nouvelle par les distances : (200.06), (300.67) et (700.07). Leurs décisions d'achat : 0, 1, 1. Majorité → 1 (Oui). Conclusion : cette personne achètera une assurance santé selon le modèle k-NN (k = 3).",
            },
          ],
        },
      ],
    },
    // ───────────────────────── CHAPITRE 3 : SVM ─────────────────────────
    {
      id: "svm",
      title: "SVM — Support Vector Machines",
      summary:
        "Algorithme supervisé de classification (Vapnik, 1990) : fonction de décision f(x) = w·x + b, hyperplan optimal et marge, cas linéaire séparable (problème primal/dual, multiplicateurs de Lagrange), marge souple (variables ressorts ξi, paramètre C), astuce du noyau (linéaire, polynomial, RBF), les 6 étapes du SVM et exercice complet Setosa vs Versicolor avec matrice de confusion.",
      sections: [
        {
          heading: "Introduction",
          blocks: [
            {
              type: "p",
              text: "SVM (Support Vector Machines) est un algorithme d'apprentissage supervisé utilisé surtout pour la classification, développé en 1990 par Vladimir Vapnik. Il cherche à trouver la frontière optimale qui sépare le mieux les classes en maximisant la distance entre elles. La distance entre les classes est appelée : la marge.",
            },
          ],
        },
        {
          heading: "Le problème d'apprentissage",
          blocks: [
            {
              type: "p",
              text: "Apprentissage supervisé = prédire une sortie à partir d'entrées avec des exemples. Il utilise un ensemble d'exemples S = {(x1, y1), …, (xn, yn)} et prédit une sortie y (ex. spam ou non) à partir de x (ex. mots dans un email).",
            },
            {
              type: "list",
              items: [
                "Catégorisation de textes → spam",
                "Reconnaissance de formes → chiffres manuscrits, visages",
                "Diagnostic médical (cancer) — illustrer avec des cas concrets des documents",
              ],
            },
            {
              type: "table",
              headers: ["Défi", "Description"],
              rows: [
                ["Sur-apprentissage", "Collé aux données, échoue ailleurs — le modèle mémorise au lieu de généraliser"],
                ["Sous-apprentissage", "Ignore les détails, fait des erreurs — modèle trop simple"],
                ["Objectif", "Minimiser les erreurs sur de nouvelles données → modèle plus précis"],
              ],
            },
          ],
        },
        {
          heading: "Principes de base des SVM",
          blocks: [
            {
              type: "p",
              text: "Chaque prédiction d'un SVM repose sur une fonction de décision f(x) et la valeur y·f(x) permet de mesurer la confiance du modèle dans sa classification. D'où : les SVM cherchent à déterminer l'hyperplan optimal. Si la contrainte y·f(x) ≥ 1 alors « Bonne classification » ; sinon : « Mauvaise classification ». Remarque : la résolution avec SVM se divise en plusieurs cas.",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "f(x) = w · x + b", desc: "fonction de décision : w = vecteur, x = donnée, b = biais" },
                { cmd: "y · f(x) ≥ 1", desc: "contrainte de confiance → bonne classification ; sinon mauvaise classification" },
              ],
            },
          ],
        },
        {
          heading: "Cas linéaire séparable",
          blocks: [
            {
              type: "p",
              text: "Quand les données peuvent être séparées parfaitement, le SVM cherche l'hyperplan optimal : celui qui maximise la distance (la marge) entre les points des deux classes. La fonction de décision est définie par f(x) = w·x + b, où w représente le vecteur normal à l'hyperplan (de coordonnées [m, −1]) et b le biais. X est le vecteur [x, y]. L'équation de l'hyperplan est y = m·x + b, et f(x) = m·x + b − y (avec f(x) = 0 sur l'hyperplan lui-même).",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "w = [m, −1]", desc: "vecteur normal à l'hyperplan (m = pente)" },
                { cmd: "y = m·x + b", desc: "équation de l'hyperplan" },
                { cmd: "f(x) = m·x + b − y", desc: "fonction de décision (f(x) = 0 sur l'hyperplan)" },
                { cmd: "marge = 2 / ‖w‖", desc: "la marge à maximiser (distance entre les 2 classes)" },
              ],
            },
            {
              type: "p",
              text: "Problème dual : au lieu de chercher directement w et b, on introduit de nouvelles variables appelées multiplicateurs de Lagrange (αi). Ces variables représentent l'importance de chaque point d'entraînement dans la construction de la frontière. Dans le problème dual, on cherche à maximiser une fonction qui dépend de ces αi. Seuls les points qui se trouvent sur la marge (appelés vecteurs de support) auront un αi > 0 — les autres points n'influencent pas la solution.",
            },
            { type: "diagram", id: "svm-margin", caption: "Hyperplan optimal : marge maximale, vecteurs de support sur les frontières" },
          ],
        },
        {
          heading: "Cas linéaire non séparable — la marge souple",
          blocks: [
            {
              type: "p",
              text: "Pour des données non parfaitement séparables, on autorise certaines erreurs : on ajoute ξi ≥ 0 — les ξi sont appelées les variables ressorts (slack variables). La contrainte de mesure de confiance devient y·f(x) ≥ 1 − ξi.",
            },
            {
              type: "table",
              headers: ["Valeur de ξi", "Signification"],
              rows: [
                ["ξi = 0", "bien classé"],
                ["ξi ∈ ]0, 1]", "bien classé, mais dans la région définie par la marge"],
                ["ξi > 1", "mal classé"],
              ],
            },
            {
              type: "p",
              text: "On minimise (½‖w‖² + C·Σξi) sous la contrainte y·f(x) ≥ 1 − ξi et ξi ≥ 0. ξi mesure l'erreur (combien un point est du mauvais côté) et C décide du coût de ces erreurs — un grand C = peu d'erreurs tolérées.",
            },
            {
              type: "callout",
              variant: "tip",
              title: "Analogie",
              text: "Vous permettez à quelques points de passer la clôture (avec une amende ξi), et C fixe le prix de cette amende.",
            },
          ],
        },
        {
          heading: "Cas non linéairement séparable — l'astuce du noyau (Kernel Trick)",
          blocks: [
            {
              type: "p",
              text: "Dans ce cas, le SVM applique une transformation pour projeter les données dans un espace de dimension supérieure, où une séparation linéaire devient possible. L'astuce du noyau transforme les données pour les rendre séparables, comme plier une feuille, sans faire de calculs lourds.",
            },
            {
              type: "list",
              items: [
                "Flexibilité : les noyaux permettent aux SVM de gérer des formes complexes (spirales, cercles, vagues) sans changer l'algorithme de base.",
                "Efficacité : pas besoin de stocker les données transformées, juste leurs similarités via le noyau.",
                "Lien avec le problème dual : dans le dual (maximisation avec αi), on remplace ⟨xi, xj⟩ par k(xi, xj). Cela signifie que l'optimisation se fait dans cet espace transformé sans jamais le calculer explicitement.",
              ],
            },
            { type: "diagram", id: "svm-kernel", caption: "Kernel trick : projeter les données vers une dimension supérieure où elles deviennent séparables" },
            {
              type: "table",
              headers: ["Noyau", "Formule", "Quand l'utiliser / Avantage", "Limitation"],
              rows: [
                ["Linéaire", "k(xi, xj) = xi · xj", "Si les données sont presque linéairement séparables dans l'espace original — rapide à calculer", "Ne fonctionne pas pour des données fortement non linéaires"],
                ["Polynomial", "k(xi, xj) = (γ · ⟨xi, xj⟩ + r)^d", "Quand la séparation suit une courbure polynomiale — peut modéliser des relations non linéaires simples", "Peut devenir coûteux pour de grands degrés d"],
                ["RBF (gaussien)", "k(xi, xj) = exp(−γ ‖xi − xj‖²)", "Pour la plupart des problèmes non linéaires classiques — très flexible, fonctionne bien quand on ne connaît pas la forme de la séparation", "Peut séparer presque tous les types de données non linéaires — besoin de régler le paramètre γ correctement pour éviter l'overfitting"],
              ],
            },
            {
              type: "p",
              text: "Paramètres des noyaux : d = complexité de la courbe de séparation ; γ = force de l'influence de chaque point ; r = translation de la frontière.",
            },
          ],
        },
        {
          heading: "Étapes du fonctionnement du SVM",
          blocks: [
            {
              type: "table",
              headers: ["Étape", "Action", "Description courte"],
              rows: [
                ["1", "Représenter les données", "Préparer les points avec leurs classes"],
                ["2", "Choisir un type de SVM", "Linéaire ou non linéaire"],
                ["3", "Trouver l'hyperplan optimal", "Séparer les classes avec une marge maximale"],
                ["4", "Identifier les vecteurs de support", "Points proches de l'hyperplan"],
                ["5", "Calculer la fonction de décision", "f(x) = w·x + b (ou sous une autre forme si on utilise un noyau)"],
                ["6", "Prédire de nouvelles données", "Classer un nouveau point"],
              ],
            },
          ],
        },
        {
          heading: "Avantages, inconvénients & conclusion",
          blocks: [
            {
              type: "table",
              headers: ["Avantage", "Inconvénient"],
              rows: [
                ["Les SVM combinent flexibilité et simplicité", "Moins utilisés face au deep learning"],
                ["Soutenus par une base théorique solide", ""],
                ["Toujours pertinents pour des données limitées", ""],
              ],
            },
            {
              type: "callout",
              variant: "info",
              title: "Conclusion et perspectives",
              text: "Le SVM est un modèle simple mais puissant, utile pour comprendre les bases de l'apprentissage automatique avant de passer à des modèles plus avancés. Le SVM continue d'évoluer et peut être amélioré pour traiter plus de données ou travailler avec d'autres modèles d'IA modernes.",
            },
          ],
        },
        {
          heading: "Exercice d'application — fleurs Setosa vs Versicolor",
          blocks: [
            {
              type: "p",
              text: "Énoncé : vous êtes un data scientist et devez développer un modèle pour classer deux types de fleurs (Setosa vs Versicolor) en fonction de deux caractéristiques : la longueur des pétales (cm) et la largeur des pétales (cm).",
            },
            {
              type: "table",
              headers: ["Fleur", "Longueur", "Largeur", "Espèce (Classe)"],
              rows: [
                ["1", "1.5", "0.2", "Setosa (0)"],
                ["2", "1.8", "0.4", "Setosa (0)"],
                ["3", "4.5", "1.5", "Versicolor (1)"],
                ["4", "5", "1.8", "Versicolor (1)"],
                ["5", "1.2", "0.1", "Setosa (0)"],
                ["6", "4.8", "1.6", "Versicolor (1)"],
              ],
            },
            {
              type: "list",
              ordered: true,
              items: [
                "Partie 1 — tracez ces points sur un graphique 2D (longueur en x, largeur en y) ; coloriez les Setosa en bleu et les Versicolor en rouge ; pouvez-vous tracer une ligne droite qui sépare parfaitement les deux classes ? → OUI, les Setosa (petites valeurs) et les Versicolor (grandes valeurs) sont parfaitement séparables.",
                "Partie 1 (suite) — proposez une équation possible pour cet hyperplan f(x) = w·x + b : on calcule la pente w = (y2 − y1)/(x2 − x1) avec les deux points les plus proches → m ≈ (1.5 − 0.4)/(4.5 − 1.8) ≈ 0.41, d'où une frontière possible : largeur = 0.41 × longueur − 0.34.",
                "Partie 1 (fin) — identifiez quels points seraient les vecteurs de support : les points les plus proches de la frontière, soit (1.8, 0.4) et (1.5, 0.2) côté Setosa et (4.5, 1.5) côté Versicolor — ce sont eux qui « portent » la marge.",
                "Partie 2 — on ajoute la fleur 7 : (1.5, 0.1) étiquetée Versicolor (1). La séparation linéaire est-elle toujours possible ? → NON : ce point atterrit au milieu de la région Setosa, les classes se chevauchent. Quel noyau proposeriez-vous ? → une marge souple + un noyau non linéaire (polynomial ou RBF).",
                "Partie 3 — nouvelle fleur : longueur 4.2 cm, largeur 1.3 cm → à quelle classe appartiendrait-elle ? → Versicolor (1) : elle se situe au-dessus de la frontière, proche des Versicolor (4.5, 1.5) et (4.8, 1.6).",
              ],
            },
            {
              type: "p",
              text: "Partie 4 — test du module : recherche des fleurs Setosa (True) avec les résultats réels vs prédits suivants. Calculez la Précision et l'Exactitude en utilisant le tableau de confusion.",
            },
            {
              type: "table",
              headers: ["Fleur", "Longueur", "Largeur", "Résultat réel", "Résultat prédit"],
              rows: [
                ["1", "0.8", "0.4", "Setosa (0)", "Setosa (0)"],
                ["2", "1.7", "0.6", "Setosa (0)", "Versicolor (1)"],
                ["3", "4.3", "1.7", "Versicolor (1)", "Setosa (0)"],
                ["4", "5.2", "1.9", "Versicolor (1)", "Versicolor (1)"],
                ["5", "1.2", "0.3", "Setosa (0)", "Setosa (0)"],
                ["6", "4.8", "1.4", "Versicolor (1)", "Versicolor (1)"],
              ],
            },
            {
              type: "table",
              headers: ["Matrice de confusion (Setosa = positif)", "Prédit : Setosa", "Prédit : Versicolor"],
              rows: [
                ["Réel : Setosa", "TP = 2 (fleurs 1, 5)", "FN = 1 (fleur 2)"],
                ["Réel : Versicolor", "FP = 1 (fleur 3)", "TN = 2 (fleurs 4, 6)"],
              ],
            },
            {
              type: "cmd",
              commands: [
                { cmd: "Précision = TP / (TP + FP) = 2 / 3 ≈ 0.67 (67 %)", desc: "parmi les fleurs prédites Setosa, la proportion réellement Setosa" },
                { cmd: "Exactitude = (TP + TN) / total = (2 + 2) / 6 ≈ 0.67 (67 %)", desc: "proportion globale de bonnes prédictions" },
                { cmd: "Rappel = TP / (TP + FN) = 2 / 3 ≈ 0.67 (67 %)", desc: "parmi les vraies Setosa, la proportion retrouvée (info complémentaire)" },
              ],
            },
          ],
        },
      ],
    },
  ],
  quiz: [
    // ─── K-MEANS (QCM du support + couverture complète) ───
    {
      id: "km-1",
      chapter: "kmeans",
      question: "K-MEANS — What does the centroid of a cluster represent?",
      options: [
        "The oldest data point in the cluster",
        "The mean position of all points in the cluster",
        "The data point farthest from the center",
        "The most frequent value in the cluster",
      ],
      correct: 1,
      explanation: "« Means » = la moyenne des points du cluster : le centroïde est la position moyenne (le centre) de tous les points qui lui sont assignés.",
    },
    {
      id: "km-2",
      chapter: "kmeans",
      question: "K-MEANS — When does the algorithm stop updating centroids?",
      options: [
        "When the centroids no longer change much",
        "After the first iteration",
        "When there are no data points left",
        "When new data arrives",
      ],
      correct: 0,
      explanation: "On répète assignation + mise à jour jusqu'à ce que les centroïdes ne changent plus significativement (convergence) ou qu'un nombre maximum d'itérations soit atteint.",
    },
    {
      id: "km-3",
      chapter: "kmeans",
      question: "K-MEANS — Which technique is often used to find a good value of K?",
      options: ["Gradient descent", "Elbow method", "Random forest", "Cross-validation"],
      correct: 1,
      explanation: "La méthode du coude (Elbow Method) : on exécute K-Means pour plusieurs valeurs de K, on calcule J pour chacune, puis on trace K contre le coût — le « coude » indique un bon K (ex. K = 3, bien que K = 4 soit aussi acceptable).",
    },
    {
      id: "km-4",
      chapter: "kmeans",
      question: "K-MEANS — What does \"K\" represent?",
      options: [
        "The number of iterations",
        "The number of clusters",
        "The number of features in the dataset",
        "The total number of data points",
      ],
      correct: 1,
      explanation: "K = le nombre de clusters choisi par l'utilisateur. « Means » = la moyenne des points d'un cluster (son centre).",
    },
    {
      id: "km-5",
      chapter: "kmeans",
      question: "K-MEANS — What can still occur even after many iterations?",
      options: [
        "A data point changes its assigned cluster in every iteration indefinitely",
        "Two centroids can end up at the same location, effectively merging clusters",
        "The total cost function J may temporarily increase between iterations",
        "A centroid may move outside the convex hull of the points in its cluster",
      ],
      correct: 1,
      explanation: "Le QCM du support indique que deux centroïdes peuvent finir au même endroit, fusionnant effectivement deux clusters — c'est possible même après de nombreuses itérations.",
    },
    {
      id: "km-6",
      chapter: "kmeans",
      question: "K-Means est un algorithme d'apprentissage…",
      options: ["supervisé (données étiquetées)", "non supervisé (sans données étiquetées)", "par renforcement", "semi-supervisé"],
      correct: 1,
      explanation: "Le clustering est une technique d'apprentissage NON supervisé : contrairement à l'apprentissage supervisé, il n'exige pas de données étiquetées.",
    },
    {
      id: "km-7",
      chapter: "kmeans",
      question: "Pourquoi utilise-t-on la distance AU CARRÉ dans la fonction de coût de K-Means ?",
      options: [
        "Pour changer le centroïde le plus proche",
        "Pour éliminer les racines carrées et simplifier le calcul et l'optimisation",
        "Pour éviter les valeurs négatives uniquement",
        "Pour rendre l'algorithme non supervisé",
      ],
      correct: 1,
      explanation: "Élever la distance au carré ne change PAS quel centroïde est le plus proche, mais simplifie les calculs en supprimant les racines carrées — commodité mathématique pour l'optimisation.",
    },
    {
      id: "km-8",
      chapter: "kmeans",
      question: "Comment s'appelle la fonction de coût J de K-Means ?",
      options: [
        "Within-Cluster Sum of Squares (WCSS)",
        "Between-Cluster Sum of Squares",
        "Mean Squared Error (MSE)",
        "Gradient cost",
      ],
      correct: 0,
      explanation: "J = Within-Cluster Sum of Squares : double somme — la somme interne mesure les distances des points DANS un cluster, la somme externe répète pour les K clusters.",
    },
    {
      id: "km-9",
      chapter: "kmeans",
      question: "Comment calcule-t-on le nouveau centroïde d'un cluster ?",
      options: [
        "En prenant le point le plus ancien du cluster",
        "En prenant la moyenne des coordonnées de tous les points du cluster",
        "En prenant le point le plus éloigné du centre",
        "En choisissant un point au hasard dans le cluster",
      ],
      correct: 1,
      explanation: "new centroid x = (x1 + x2 + … + xn) / n et idem pour y : chaque coordonnée du centroïde est la moyenne des coordonnées des points du cluster.",
    },
    {
      id: "km-10",
      chapter: "kmeans",
      question: "En pratique, comment initialise-t-on les centroïdes de K-Means ?",
      options: [
        "On les place n'importe où sur l'écran",
        "On sélectionne K points réels du dataset comme centroïdes initiaux",
        "On les met tous à l'origine (0, 0)",
        "On les choisit très loin des données",
      ],
      correct: 1,
      explanation: "En pratique on sélectionne aléatoirement K points DU dataset : les centroïdes démarrent dans la distribution des données → convergence plus rapide et clusters plus pertinents qu'un placement totalement aléatoire.",
    },
    {
      id: "km-11",
      chapter: "kmeans",
      question: "EXERCICE — Quels étaient les centroïdes initiaux (K = 2) de l'exercice du cours ?",
      options: ["C₁ = (3.5, 4.5) et C₂ = (3.5, 5)", "C₁ = (0, 0) et C₂ = (1, 1)", "C₁ = (1.6, 2.3) et C₂ = (4.12, 5.37)", "C₁ = (2.12, 2.87) et C₂ = (4.3, 5.6)"],
      correct: 0,
      explanation: "L'exercice impose C₁ = (3.5, 4.5) et C₂ = (3.5, 5). Les paires (2.12, 2.87)/(4.3, 5.6) et (1.6, 2.3)/(4.12, 5.37) sont les centroïdes des itérations 2 et 3.",
    },
    {
      id: "km-12",
      chapter: "kmeans",
      question: "EXERCICE — Après l'itération 1, quels points appartiennent au Cluster 1 ?",
      options: ["A, B, C, G", "A, B, C", "D, E, F", "D, E, F, G"],
      correct: 0,
      explanation: "Itération 1 : A, B, C et G sont plus proches de C₁ → Cluster 1 = {A, B, C, G} et Cluster 2 = {D, E, F}. G basculera dans le Cluster 2 à l'itération 2.",
    },
    {
      id: "km-13",
      chapter: "kmeans",
      question: "EXERCICE — Quel est le centroïde final C₁ après convergence (itération 3) ?",
      options: ["(3.5, 4.5)", "(2.12, 2.87)", "(1.6, 2.3)", "(4.12, 5.37)"],
      correct: 2,
      explanation: "Mouvement des centroïdes : it.1 (3.5, 4.5) → it.2 (2.12, 2.87) → it.3 (1.6, 2.3) = valeur finale de C₁ ; C₂ final = (4.12, 5.37). Les mouvements deviennent faibles → convergence, itération 3 = dernière.",
    },
    {
      id: "km-14",
      chapter: "kmeans",
      question: "EXERCICE — Quel point a changé de cluster entre l'itération 1 et l'itération 2 ?",
      options: ["A", "G", "E", "Aucun point n'a changé"],
      correct: 1,
      explanation: "G(3.5, 4.5) était dans le Cluster 1 (itération 1, d(C₁) = 0) puis passe au Cluster 2 à l'itération 2 (d(C₂) = 1.36 < d(C₁) = 2.13) — le centroïde C₁ s'éloignant vers (2.12, 2.87).",
    },
    {
      id: "km-15",
      chapter: "kmeans",
      question: "Dans l'exemple salaires, une personne gagnant 1 000 000 $ déforme le cluster. Quelle limite de K-Means cela illustre-t-il ?",
      options: ["Sensible à l'initialisation", "Sensible aux outliers (valeurs aberrantes)", "Exige de prédéfinir K", "Ne fonctionne qu'avec des données numériques"],
      correct: 1,
      explanation: "Un seul point extrême peut tirer le centroïde loin du vrai centre du cluster → K-Means est sensible aux outliers. L'exemple « red/blue/green » illustre la limite données numériques.",
    },
    {
      id: "km-16",
      chapter: "kmeans",
      question: "Pourquoi K-Means ne peut-il pas regrouper les étiquettes textuelles « red », « blue », « green » telles quelles ?",
      options: [
        "Parce que K est trop grand",
        "Parce qu'il exige un calcul de distance numérique (euclidienne) — il faut convertir en nombres",
        "Parce que les couleurs sont des outliers",
        "Parce que l'algorithme ne converge jamais",
      ],
      correct: 1,
      explanation: "Limite 4 : K-Means ne fonctionne qu'avec des données numériques (distance euclidienne). Les labels textuels doivent être convertis en nombres avant clustering.",
    },
    {
      id: "km-17",
      chapter: "kmeans",
      question: "« Guaranteed convergence » signifie que…",
      options: [
        "K-Means trouve toujours la solution optimale mondiale",
        "K-Means atteint toujours un résultat après plusieurs itérations, mais pas forcément le meilleur global",
        "K-Means converge en une seule itération",
        "K-Means ne s'arrête jamais",
      ],
      correct: 1,
      explanation: "Avantage 4 : convergence garantie — l'algorithme atteint toujours un résultat après quelques itérations (les centroïdes se stabilisent), mais ce résultat peut ne pas être le meilleur global (dépend de l'initialisation).",
    },
    {
      id: "km-18",
      chapter: "kmeans",
      question: "Dans l'exemple de recommandation musicale, quelles caractéristiques numériques sont utilisées ?",
      options: [
        "Genre, humeur, artiste, année",
        "Tempo, énergie, danceability, instrumentation, loudness",
        "Titre, paroles, clip, cover",
        "Nombre d'écoutes uniquement",
      ],
      correct: 1,
      explanation: "Chaque chanson devient un point de données avec tempo, energy level, danceability, instrumentation (acoustique vs électronique) et loudness. L'algorithme ne connaît ni « genre » ni « humeur » — il groupe par distance entre caractéristiques.",
    },
    {
      id: "km-19",
      chapter: "kmeans",
      question: "Exemple GDP/population : avec K = 5, quelles sont les 5 classes obtenues ?",
      options: [
        "Petit, moyen, grand, très grand, énorme",
        "Rural, Small, Medium, Large, Mega",
        "Pauvre, riche, très riche…",
        "On ne peut pas choisir K = 5",
      ],
      correct: 1,
      explanation: "K = 3 → Large / Medium / Small ; K = 5 → Rural / Small / Medium / Large / Mega. Les deux interprétations sont valides selon l'objectif de l'analyse.",
    },
    {
      id: "km-20",
      chapter: "kmeans",
      question: "Que faut-il COMBINER à la méthode du coude pour choisir K ?",
      options: [
        "Rien — le coude suffit toujours",
        "Le bon sens et la connaissance du domaine (l'objectif pratique de l'analyse)",
        "Un tirage au sort",
        "Le nombre de points du dataset",
      ],
      correct: 1,
      explanation: "Remark du support : ne pas se fier uniquement aux méthodes mathématiques — le nombre de clusters dépend aussi de l'objectif pratique ; combiner le coude avec bon sens et expertise du domaine.",
    },
    // ─── KNN (QCM du support + couverture complète) ───
    {
      id: "knn-1",
      chapter: "knn",
      question: "Le KNN est un algorithme d'apprentissage…",
      options: ["Semi-supervisé", "Supervisé", "Non supervisé", "Par renforcement"],
      correct: 1,
      explanation: "KNN = algorithme SUPERVISÉ : il classe un nouvel élément en regardant les k voisins les plus proches dans les données déjà connues (étiquetées).",
    },
    {
      id: "knn-2",
      chapter: "knn",
      question: "Quelle phrase résume le mieux le principe du KNN ?",
      options: [
        "Plus c'est complexe, mieux c'est",
        "L'algorithme apprend par essais et erreurs successifs",
        "La prédiction dépend uniquement de la donnée la plus proche",
        "Dis-moi qui sont tes voisins, je te dirai qui tu es",
      ],
      correct: 3,
      explanation: "C'est LE principe de KNN : la classe d'un nouvel élément dépend de la majorité de ses k voisins les plus proches (pas seulement du plus proche).",
    },
    {
      id: "knn-3",
      chapter: "knn",
      question: "Avec KNN, un K trop petit (ex. k = 1) risque de causer…",
      options: ["De l'underfitting", "De l'overfitting", "Un déséquilibre des classes", "Une normalisation des données"],
      correct: 1,
      explanation: "K trop petit → sur-apprentissage (overfitting) : le modèle se concentre trop sur les détails, il mémorise le bruit au lieu des tendances générales.",
    },
    {
      id: "knn-4",
      chapter: "knn",
      question: "Comment choisit-on la classe d'un nouvel élément avec KNN ?",
      options: [
        "Par un vote majoritaire parmi les k voisins les plus proches",
        "En calculant une fonction de prédiction",
        "En utilisant toujours k = 1",
        "Par apprentissage profond",
      ],
      correct: 0,
      explanation: "Le résultat final est la classe qui apparaît le plus fréquemment parmi les K voisins sélectionnés (ex. 2 phoques + 1 ours → phoque).",
    },
    {
      id: "knn-5",
      chapter: "knn",
      question: "KNN est souvent appelé « algorithme paresseux ». Pourquoi ?",
      options: [
        "Il donne toujours des résultats approximatifs",
        "Il ne construit pas de modèle pendant l'apprentissage",
        "Il utilise très peu de mémoire",
        "Il est très lent à l'entraînement",
      ],
      correct: 1,
      explanation: "« Lazy algorithm » : il ne construit pas de modèle — il mémorise les données et fait les calculs au moment de la prédiction (d'où le coût calculatoire élevé à la prédiction).",
    },
    {
      id: "knn-6",
      chapter: "knn",
      question: "Dans un dataset avec 1000 points, quel impact aura un K trop grand ?",
      options: [
        "Le modèle deviendra trop spécifique",
        "La décision se base sur trop de voisins éloignés",
        "Le temps de calcul devient négligeable",
        "Les distances deviennent nulles",
      ],
      correct: 1,
      explanation: "K trop grand → sous-apprentissage (underfitting) : le modèle perd les détails et la décision se base sur trop de voisins éloignés — trop simpliste pour capturer la structure des données.",
    },
    {
      id: "knn-7",
      chapter: "knn",
      question: "Qu'est-ce que le machine learning (définition du rappel) ?",
      options: [
        "Une base de données avancée",
        "Une technologie qui permet aux ordinateurs d'apprendre à partir d'exemples, sans être explicitement programmés pour chaque tâche",
        "Un langage de programmation",
        "Un algorithme de tri",
      ],
      correct: 1,
      explanation: "Définition du rappel : le ML (« apprentissage automatique ») permet aux ordinateurs d'apprendre par eux-mêmes à partir d'exemples, sans programmation explicite pour chaque tâche.",
    },
    {
      id: "knn-8",
      chapter: "knn",
      question: "Quels sont les 5 types d'apprentissage automatique cités dans le rappel ?",
      options: [
        "Supervisé, non supervisé, par renforcement, semi-supervisé, par transfert",
        "Linéaire, non linéaire, polynomial, RBF, noyau",
        "Clustering, régression, classification, tri, recherche",
        "KNN, SVM, K-Means, arbres, réseaux",
      ],
      correct: 0,
      explanation: "Les 5 types : supervisé, non supervisé, par renforcement, semi-supervisé et par transfert. (Les autres propositions mélangent algorithmes et noyaux.)",
    },
    {
      id: "knn-9",
      chapter: "knn",
      question: "Classification vs régression — quelle différence ?",
      options: [
        "Classification : y discrète (classes, ex. chien/chat) ; régression : y continue (nombres réels, ex. degrés)",
        "Classification : y continue ; régression : y discrète",
        "Les deux sont identiques",
        "Classification = non supervisée, régression = supervisée",
      ],
      correct: 0,
      explanation: "En apprentissage supervisé : classification → y prend des valeurs discrètes (classes) ; régression → y prend des valeurs continues (réels). KNN et les arbres font de la classification ; régression linéaire/logistique de la régression ; KNN peut faire les deux (polyvalent).",
    },
    {
      id: "knn-10",
      chapter: "knn",
      question: "Exemple du cours : AB = √[(7 − 3)² + (8 − 2)²] = ?",
      options: ["2√13", "10", "7", "√52 ≈ 7.21 → formule de Manhattan"],
      correct: 0,
      explanation: "Distance euclidienne : √[16 + 36] = √52 = 2√13 (≈ 7.21). Le résultat exact du support est 2√13.",
    },
    {
      id: "knn-11",
      chapter: "knn",
      question: "Distance de Manhattan entre A(2, 3) et B(5, 7) ?",
      options: ["7", "5", "2√13", "25"],
      correct: 0,
      explanation: "Manhattan = somme des différences absolues : |5 − 2| + |7 − 3| = 3 + 4 = 7.",
    },
    {
      id: "knn-12",
      chapter: "knn",
      question: "Quelles autres distances existent pour KNN (au-delà d'euclidienne/Manhattan) ?",
      options: ["Minkowski et Hamming", "Gradient et coude", "Primal et dual", "TP et FP"],
      correct: 0,
      explanation: "Le support cite Minkowski et Hamming. Le choix de la distance dépend du type de données : numériques, catégorielles, avec ou sans échelle.",
    },
    {
      id: "knn-13",
      chapter: "knn",
      question: "Un K très grand conduit à…",
      options: ["L'overfitting", "L'underfitting", "La normalisation", "Le suréchantillonnage"],
      correct: 1,
      explanation: "K très grande → sous-apprentissage (underfitting) : le modèle perd les détails et les motifs importants, trop simpliste pour capturer la structure complexe des données.",
    },
    {
      id: "knn-14",
      chapter: "knn",
      question: "Comment fonctionne la validation croisée pour choisir K ?",
      options: [
        "On teste chaque valeur de K sur différentes partitions des données et on retient celle avec la meilleure performance moyenne",
        "On prend K = √n systématiquement",
        "On choisit le K le plus grand possible",
        "On trie les données et on prend le milieu",
      ],
      correct: 0,
      explanation: "Principe de la validation croisée : tester chaque valeur de K sur différentes partitions des données, retenir celle avec la meilleure performance moyenne. La courbe d'erreur donne aussi le K où l'erreur est minimale.",
    },
    {
      id: "knn-15",
      chapter: "knn",
      question: "EXERCICE 1 — Que prédit KNN (K = 3) pour le nouvel étudiant (2 h, 75 %) ?",
      options: ["Échec", "Réussite", "Impossible à déterminer", "50/50"],
      correct: 1,
      explanation: "Distances depuis (2, 75) : (3, 70) → 5.1 [Échoué], (4, 80) → 5.4 [Réussi], (2, 85) → 10 [Réussi] sont les 3 plus proches. 2 Réussite contre 1 Échec → majorité → RÉUSSITE.",
    },
    {
      id: "knn-16",
      chapter: "knn",
      question: "EXERCICE 1 — Quelle est la distance entre (2, 75) et (2, 85) ?",
      options: ["10", "5.1", "15.8", "5.4"],
      correct: 0,
      explanation: "√[(85 − 75)² + (2 − 2)²] = √100 = 10. (Pour comparaison : (3, 70) → 5.1, (4, 80) → 5.4, (1, 60) → 15.1, (5, 90) → 15.8.)",
    },
    {
      id: "knn-17",
      chapter: "knn",
      question: "EXERCICE 2 (CNAM) — Que prédit KNN (K = 3) pour la personne (40 ans, 3200 dt) ?",
      options: ["N'achètera pas (0)", "Achètera (1)", "Égalité parfaite", "Dépend du salaire seul"],
      correct: 1,
      explanation: "Les 3 plus proches voisins : (45, 3000) d = 200.06 [0], (60, 3500) d = 300.67 [1], (30, 2500) d = 700.07 [1]. Décisions : 0, 1, 1 → majorité → 1 (Oui) : la personne achètera une assurance santé.",
    },
    {
      id: "knn-18",
      chapter: "knn",
      question: "EXERCICE 2 — Quelle est la distance euclidienne entre (40, 3200) et (25, 2000) ?",
      options: ["1200.09", "700.07", "200.06", "1400.01"],
      correct: 0,
      explanation: "√[(3200 − 2000)² + (40 − 25)²] = √[1440000 + 225] ≈ 1200.09 — c'est l'exemple de calcul donné dans la correction.",
    },
    {
      id: "knn-19",
      chapter: "knn",
      question: "Pourquoi le coût calculatoire de KNN est-il élevé lors de la PRÉDICTION ?",
      options: [
        "Parce qu'il faut entraîner un modèle lourd",
        "Parce qu'il faut calculer la distance entre le nouvel exemple et TOUS les points de l'ensemble d'entraînement",
        "Parce que K est toujours grand",
        "Parce que l'algorithme trie toutes les classes",
      ],
      correct: 1,
      explanation: "Pas d'entraînement coûteux (lazy), mais à chaque prédiction : calcul des distances vers tous les points d'entraînement pour trouver les k plus proches. S'y ajoutent la sensibilité au bruit et à la dimensionnalité.",
    },
    // ─── SVM (QCM du support + couverture complète) ───
    {
      id: "svm-1",
      chapter: "svm",
      question: "Quel est l'objectif principal des SVM ?",
      options: [
        "Minimiser le nombre de points utilisés",
        "Ignorer les données aberrantes",
        "Maximiser la marge entre les classes",
        "Calculer la moyenne des données",
      ],
      correct: 2,
      explanation: "QCM du support (réponse C) : le SVM cherche la frontière optimale qui sépare le mieux les classes en MAXIMISANT la distance entre elles — cette distance s'appelle la marge.",
    },
    {
      id: "svm-2",
      chapter: "svm",
      question: "Que sont les vecteurs supports ?",
      options: [
        "Les points les plus proches de l'hyperplan",
        "Les points les plus éloignés de l'hyperplan",
        "Tous les points de la dataset",
        "Les points mal classés",
      ],
      correct: 0,
      explanation: "QCM du support (réponse A) : les vecteurs de support sont les points situés sur la marge, les plus proches de l'hyperplan — seuls eux ont αi > 0 et influencent la solution.",
    },
    {
      id: "svm-3",
      chapter: "svm",
      question: "Quel est le rôle de l'astuce du noyau ?",
      options: [
        "Simplifier les calculs dans l'espace original",
        "Transformer les données pour les rendre séparables",
        "Réduire le nombre de classes",
        "Supprimer les vecteurs supports",
      ],
      correct: 1,
      explanation: "QCM du support (réponse B) : le kernel trick transforme les données (projection en dimension supérieure) pour les rendre linéairement séparables — comme plier une feuille, sans calculs lourds.",
    },
    {
      id: "svm-4",
      chapter: "svm",
      question: "Que fait le problème primal ?",
      options: [
        "Dessine directement l'hyperplan avec une marge",
        "Ajuste les poids des points pour l'hyperplan",
        "Calcule les similarités entre points",
        "Ignore la marge",
      ],
      correct: 0,
      explanation: "QCM du support (réponse A) : le primal cherche directement w et b (l'hyperplan + marge), tandis que le dual passe par les multiplicateurs de Lagrange αi.",
    },
    {
      id: "svm-5",
      chapter: "svm",
      question: "Pourquoi les SVM sont-ils efficaces en classification ?",
      options: [
        "Parce qu'ils utilisent tous les points",
        "Grâce à des calculs très rapides",
        "Parce qu'ils ignorent les erreurs",
        "Grâce à une marge large et une faible complexité",
      ],
      correct: 3,
      explanation: "QCM du support (réponse D) : l'efficacité vient d'une marge large (bonne généralisation) et d'une faible complexité (seuls les vecteurs de support comptent).",
    },
    {
      id: "svm-6",
      chapter: "svm",
      question: "Quel est le rôle du problème dual dans les SVM ?",
      options: [
        "Utiliser les vecteurs supports pour ajuster la marge",
        "Calculer directement la position de l'hyperplan",
        "Supprimer les données non linéaires",
        "Ignorer les contraintes de séparation",
      ],
      correct: 0,
      explanation: "QCM du support (réponse A) : le dual maximise une fonction des multiplicateurs de Lagrange αi — seuls les vecteurs de support (αi > 0) déterminent la frontière.",
    },
    {
      id: "svm-7",
      chapter: "svm",
      question: "Que permet la marge souple dans les SVM ?",
      options: [
        "Séparer parfaitement toutes les données",
        "Réduire la taille de l'hyperplan",
        "Tolérer quelques erreurs ou chevauchements",
        "Éliminer les vecteurs supports",
      ],
      correct: 2,
      explanation: "QCM du support (réponse C) : la marge souple (variables ressorts ξi ≥ 0) autorise certaines erreurs pour des données non parfaitement séparables — contrainte relaxée : y·f(x) ≥ 1 − ξi.",
    },
    {
      id: "svm-8",
      chapter: "svm",
      question: "Qui a développé les SVM et quand ?",
      options: ["Vladimir Vapnik, 1990", "Geoffrey Hinton, 1986", "Yann LeCun, 1998", "Andrew Ng, 2011"],
      correct: 0,
      explanation: "SVM = algorithme d'apprentissage supervisé développé en 1990 par Vladimir Vapnik, utilisé surtout pour la classification.",
    },
    {
      id: "svm-9",
      chapter: "svm",
      question: "Que signifie la contrainte y·f(x) ≥ 1 ?",
      options: [
        "Le point est mal classé",
        "Bonne classification (confiance suffisante du modèle)",
        "Le point est sur l'hyperplan",
        "Le noyau est activé",
      ],
      correct: 1,
      explanation: "y·f(x) mesure la confiance du modèle. Si y·f(x) ≥ 1 → « bonne classification » ; sinon → « mauvaise classification ». Avec marge souple : y·f(x) ≥ 1 − ξi.",
    },
    {
      id: "svm-10",
      chapter: "svm",
      question: "Que signifie ξi = 0 ? Et ξi > 1 ?",
      options: [
        "ξi = 0 : bien classé ; ξi > 1 : mal classé",
        "ξi = 0 : mal classé ; ξi > 1 : bien classé",
        "Les deux : bien classés",
        "Les deux : mal classés",
      ],
      correct: 0,
      explanation: "ξi = 0 → bien classé ; ξi ∈ ]0, 1] → bien classé mais dans la région de la marge ; ξi > 1 → mal classé. ξi est la « variable ressort » qui mesure l'erreur.",
    },
    {
      id: "svm-11",
      chapter: "svm",
      question: "Quel est le rôle du paramètre C dans la marge souple ?",
      options: [
        "Il choisit le noyau automatiquement",
        "Il décide du coût des erreurs — grand C = peu d'erreurs tolérées",
        "Il compte le nombre de vecteurs supports",
        "Il définit la dimension de projection",
      ],
      correct: 1,
      explanation: "ξi mesure l'erreur ; C fixe le prix de « l'amende » : un grand C tolère peu d'erreurs (pénalise fortement ξi), un petit C tolère plus de chevauchements.",
    },
    {
      id: "svm-12",
      chapter: "svm",
      question: "Dans le problème dual, comment applique-t-on le kernel trick ?",
      options: [
        "On remplace ⟨xi, xj⟩ par k(xi, xj)",
        "On remplace k(xi, xj) par ⟨xi, xj⟩",
        "On supprime les αi",
        "On ajoute des dimensions manuellement",
      ],
      correct: 0,
      explanation: "Dans le dual, on remplace le produit scalaire ⟨xi, xj⟩ par le noyau k(xi, xj) : l'optimisation se fait dans l'espace transformé sans jamais le calculer explicitement — pas besoin de stocker les données transformées, juste leurs similarités.",
    },
    {
      id: "svm-13",
      chapter: "svm",
      question: "Quand utiliser le noyau linéaire ?",
      options: [
        "Quand les données sont presque linéairement séparables dans l'espace original — il est rapide à calculer",
        "Quand les données forment des spirales",
        "Quand on veut éviter l'overfitting à tout prix",
        "Jamais — il est obsolète",
      ],
      correct: 0,
      explanation: "Noyau linéaire : pour des données presque linéairement séparables ; rapide à calculer. Limitation : ne fonctionne pas pour des données fortement non linéaires (spirales, cercles, vagues → RBF ou polynomial).",
    },
    {
      id: "svm-14",
      chapter: "svm",
      question: "Dans le noyau polynomial k(xi, xj) = (γ·⟨xi, xj⟩ + r)^d, que représentent d, γ et r ?",
      options: [
        "d = complexité de la courbe, γ = force d'influence de chaque point, r = translation de la frontière",
        "d = données, γ = gradient, r = racine",
        "d = dimension, γ = noyau, r = erreur",
        "Ce sont des constantes universelles",
      ],
      correct: 0,
      explanation: "d = complexité de la courbe de séparation (degrés), γ = force de l'influence de chaque point, r = translation de la frontière. Limitation : coûteux pour de grands d.",
    },
    {
      id: "svm-15",
      chapter: "svm",
      question: "Quel noyau choisir pour la plupart des problèmes non linéaires classiques ?",
      options: [
        "Le noyau RBF (gaussien) — très flexible quand on ne connaît pas la forme de la séparation",
        "Le noyau linéaire",
        "Aucun — SVM ne gère pas le non linéaire",
        "Le noyau de Hamming",
      ],
      correct: 0,
      explanation: "RBF : k(xi, xj) = exp(−γ‖xi − xj‖²) — très flexible, fonctionne bien sans connaître la forme de la séparation ; il faut régler γ correctement pour éviter l'overfitting.",
    },
    {
      id: "svm-16",
      chapter: "svm",
      question: "Quelle est la 3e étape du fonctionnement d'un SVM (parmi les 6) ?",
      options: [
        "Trouver l'hyperplan optimal — séparer les classes avec une marge maximale",
        "Supprimer les données aberrantes",
        "Choisir un réseau de neurones",
        "Normaliser les classes",
      ],
      correct: 0,
      explanation: "Les 6 étapes : 1. Représenter les données → 2. Choisir un type de SVM (linéaire/non linéaire) → 3. Trouver l'hyperplan optimal (marge maximale) → 4. Identifier les vecteurs de support → 5. Calculer f(x) = w·x + b → 6. Prédire de nouvelles données.",
    },
    {
      id: "svm-17",
      chapter: "svm",
      question: "Quelle est la force des SVM face au deep learning ?",
      options: [
        "Ils sont toujours plus rapides à l'entraînement sur des millions d'images",
        "Ils restent pertinents pour des données limitées et ont une base théorique solide",
        "Ils n'ont aucun avantage",
        "Ils éliminent le besoin de vecteurs de support",
      ],
      correct: 1,
      explanation: "Avantages : flexibilité + simplicité, base théorique solide, pertinents pour des données limitées. Inconvénient : moins utilisés face au deep learning. Le SVM continue d'évoluer (plus de données, intégration avec d'autres modèles d'IA).",
    },
    {
      id: "svm-18",
      chapter: "svm",
      question: "EXERCICE — Pour Setosa = classe positive : TP = 2, FN = 1, FP = 1, TN = 2. Quelle est la Précision ?",
      options: ["2/3 ≈ 67 %", "4/6 ≈ 67 %", "1/2 = 50 %", "5/6 ≈ 83 %"],
      correct: 0,
      explanation: "Précision = TP / (TP + FP) = 2 / 3 ≈ 0.67 (67 %) : parmi les fleurs PRÉDITES Setosa, quelle proportion est réellement Setosa. Attention à ne pas confondre avec l'exactitude.",
    },
    {
      id: "svm-19",
      chapter: "svm",
      question: "EXERCICE — Pour Setosa = classe positive : TP = 2, FN = 1, FP = 1, TN = 2. Quelle est l'Exactitude ?",
      options: ["2/3 ≈ 67 %", "4/6 ≈ 67 %", "3/6 = 50 %", "1/6 ≈ 17 %"],
      correct: 1,
      explanation: "Exactitude = (TP + TN) / total = (2 + 2) / 6 ≈ 0.67 (67 %) : proportion globale de bonnes prédictions (fleurs 1, 5 correctement Setosa + fleurs 4, 6 correctement Versicolor).",
    },
    {
      id: "svm-20",
      chapter: "svm",
      question: "EXERCICE — Une nouvelle fleur (longueur 4.2 cm, largeur 1.3 cm) serait classée…",
      options: ["Setosa (0)", "Versicolor (1)", "Impossible à dire", "Les deux classes"],
      correct: 1,
      explanation: "Elle se situe au-dessus de la frontière, proche des Versicolor (4.5, 1.5), (4.8, 1.6) et (5, 1.8) → classe Versicolor (1).",
    },
  ],
};
