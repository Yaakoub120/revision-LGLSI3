import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Modules 9 & 10 — RPC + Transition RPC → CORBA → RMI
// ═══════════════════════════════════════════════════════════════

export const dmod9: Module = {
  id: 'd9',
  num: 9,
  title: 'RPC — Remote Procedure Call',
  subtitle: 'Principe, composants (IDL, stubs, marshalling), fonctionnement détaillé et pseudocode',
  icon: '📞',
  color: 'sky',
  source: 'Chapitre 2 Partie 2 — slides 80-95',
  sections: [
    {
      id: 'd9s1',
      title: 'Pourquoi RPC ?',
      blocks: [
        { type: 'definition', term: 'RPC', def: 'Une abstraction qui permet au développeur d\u2019appeler une procédure (ou méthode) située sur une autre machine comme s\u2019il l\u2019appelait localement. L\u2019objectif est de masquer la complexité du réseau et de rendre la programmation distribuée plus proche de la programmation locale.' },
        { type: 'kv', items: [
          { k: 'Abstraction', v: 'Le développeur ne voit pas le réseau.' },
          { k: 'Productivité', v: 'Développement plus rapide.' },
          { k: 'Lisibilité et maintenance', v: 'Code plus clair.' },
          { k: 'Interopérabilité', v: 'Entre systèmes et langages.' },
        ] },
      ],
    },
    {
      id: 'd9s2',
      title: 'Principe de base du RPC (5 étapes)',
      blocks: [
        { type: 'steps', items: [
          { title: '1. Appel local', text: 'Le client appelle une fonction « comme d\u2019habitude ».' },
          { title: '2. Préparation', text: 'Le système RPC prépare l\u2019appel et l\u2019envoie au serveur.' },
          { title: '3. Exécution', text: 'Le serveur reçoit la demande, exécute la fonction demandée.' },
          { title: '4. Retour', text: 'Le résultat est renvoyé automatiquement au client.' },
          { title: '5. Résultat', text: 'Le client récupère le résultat comme s\u2019il venait d\u2019une fonction locale.' },
        ] },
        { type: 'diagram', diagram: 'RpcFlow' },
      ],
    },
    {
      id: 'd9s3',
      title: 'Composants clés et vocabulaire',
      blocks: [
        { type: 'definition', term: 'IDL (Interface Definition Language)', def: 'Langage de description de l\u2019interface. C\u2019est un fichier qui décrit les fonctions accessibles à distance (leurs noms, leurs paramètres, leurs types de retour, etc.). → C\u2019est le développeur du service (serveur) qui écrit le fichier IDL.' },
        { type: 'definition', term: 'Stub client / Stub serveur (skeleton)', def: 'Les intermédiaires qui transmettent l\u2019appel.\n✓ Stub client (proxy) : code généré côté client qui remplace l\u2019appel réel et s\u2019occupe du marshalling + envoi.\n✓ Skeleton (stub serveur) : code côté serveur qui reçoit les messages, fait l\u2019unmarshalling et appelle la procédure réelle.' },
        { type: 'definition', term: 'Marshalling / Unmarshalling', def: '→ Conversion des données à envoyer et à recevoir.\n✓ Marshalling / Serialization : conversion des paramètres en une représentation binaire (Protobuf, Thrift) ou textuelle (JSON, XML) pour transport.\n✓ Unmarshalling / Deserialization : reconstitution des paramètres à l\u2019autre bout.' },
        { type: 'definition', term: 'RPC runtime', def: 'Le mécanisme sous-jacent de communication. → Une couche logicielle interne fournie par la bibliothèque RPC. Il envoie les messages via le réseau (souvent avec des sockets TCP/UDP). Il gère la transmission, l\u2019attente de réponse et la réception.' },
      ],
    },
    {
      id: 'd9s4',
      title: 'Fonctionnement détaillé du RPC (6 phases)',
      blocks: [
        { type: 'steps', items: [
          { title: '1. Définition de l\u2019interface', text: 'La signature de la fonction distante (types d\u2019arguments, types de retour) est écrite dans l\u2019IDL.' },
          { title: '2. Génération du code', text: 'Des outils spéciaux (qui dépendent de la technologie RPC) lisent le fichier d\u2019interface et génèrent automatiquement au moment de la compilation ou du déploiement : un stub côté client (qui remplace la fonction distante), un squelette côté serveur (qui reçoit la requête et appelle la vraie fonction).' },
          { title: '3. Exécution côté serveur', text: 'Le serveur implémente la logique (fonctions réelles). Il enregistre son service dans un annuaire (optionnel) ou écoute sur un port connu.' },
          { title: '4. Appel côté client', text: 'Le programme client appelle la fonction sur le stub. Le stub exécute le marshalling : transforme les arguments en message. Le message est envoyé via le transport (socket TCP). Le stub attend une réponse (s\u2019il s\u2019agit d\u2019un RPC synchrone).' },
          { title: '5. Traitement côté serveur', text: 'Le skeleton reçoit le message, effectue l\u2019unmarshalling. Il appelle la fonction réelle. Il récupère le résultat (ou gère l\u2019exception). Il envoie la réponse marshallée.' },
          { title: '6. Retour côté client', text: 'Le stub client reçoit la réponse, effectue l\u2019unmarshalling et retourne la valeur au programme appelant.' },
        ] },
        { type: 'table', headers: ['Technologie RPC', 'Outil de génération'], rows: [
          ['ONC RPC (Sun RPC)', 'rpcgen'],
          ['DCE RPC (Distributed Computing Environment)', 'idl (compilateur IDL DCE)'],
          ['CORBA (Common Object Request Broker Architecture)', 'idl compiler (souvent idltojava, omniidl, etc.)'],
          ['Microsoft RPC (Windows)', 'MIDL (Microsoft IDL Compiler)'],
        ] },
      ],
    },
    {
      id: 'd9s5',
      title: 'Comment le client « sait » que la fonction existe ?',
      blocks: [
        { type: 'paragraph', text: 'Question de réflexion du cours — il y a plusieurs cas possibles selon la technologie utilisée.' },
        { type: 'table', headers: ['Contexte', 'Comment le client découvre le service ?'], rows: [
          ['Même entreprise / même projet', 'Le développeur reçoit le fichier IDL ou l\u2019interface Java. C\u2019est souvent documenté en interne.'],
          ['Environnement distribué (ex : CORBA, RMI Registry, gRPC)', 'Le client interroge un annuaire de services (naming service). Cet annuaire dit sur quelle machine/port se trouve le service.'],
          ['Web moderne (SOAP, REST, gRPC)', 'Il existe une description publique (ex : fichier WSDL ou .proto) que le client télécharge pour générer son stub automatiquement.'],
        ] },
      ],
    },
    {
      id: 'd9s6',
      title: 'Pseudocode RPC synchrone — vue logique (1/2)',
      blocks: [
        { type: 'code', lang: 'IDL', caption: 'IDL (Interface Definition Language)', code: `service Calculator {
  int add(int a, int b);
  int sub(int a, int b);
}` },
        { type: 'code', lang: 'Java', caption: 'Implémentation réelle du service côté serveur', code: `public class CalculatorImpl implements Calculator {
  @Override
  public int add(int a, int b) {
    System.out.println("Reçu une requête RPC: add(" + a + ", " + b + ")");
    return a + b; // traitement réel
  }
  // méthode sub
}` },
        { type: 'code', lang: 'Java', caption: 'Enregistrement du service par le serveur auprès du système RPC', code: `public static void main(String[] args) {
  Calculator service = new CalculatorImpl();
  registerService("Calculator", service); // rendu disponible via RPC
  System.out.println("Service Calculator prêt.");
}` },
      ],
    },
    {
      id: 'd9s7',
      title: 'Pseudocode RPC synchrone — vue logique (2/2)',
      blocks: [
        { type: 'code', lang: 'Java', caption: 'Skeleton côté serveur', code: `public class CalculatorServerStub {
  private Calculator impl; // référence vers l'implémentation réelle

  public CalculatorServerStub(Calculator impl) { this.impl = impl; }

  // appelé quand une requête RPC arrive
  public String handleRequest(String requestJson) {
    // Exemple : requestJson = {"method":"add","args":[3,4]}
    JSONObject req = new JSONObject(requestJson);
    String method = req.getString("method");
    JSONArray args = req.getJSONArray("args");
    int result = 0;
    switch (method) {
      case "add":
        result = impl.add(args.getInt(0), args.getInt(1));
        break;
      case "sub":
        result = impl.sub(args.getInt(0), args.getInt(1));
        break;
      default:
        throw new RuntimeException("Méthode inconnue: " + method);
    }
    // renvoyer la réponse JSON
    return "{\\"result\\": " + result + "}";
  }
}` },
        { type: 'code', lang: 'Java', caption: 'Stub côté client (proxy)', code: `public class CalculatorClientStub implements Calculator {
  private NetworkChannel channel; // abstraction de la connexion réseau

  public CalculatorClientStub(NetworkChannel channel) { this.channel = channel; }

  public int add(int a, int b) {
    String req = "{\\"method\\":\\"add\\",\\"args\\":[" + a + "," + b + "]}";
    String resp = channel.sendRequest(req); // envoie au serveur
    JSONObject json = new JSONObject(resp);
    return json.getInt("result");
  }

  public int sub(int a, int b) {
    String req = "{\\"method\\":\\"sub\\",\\"args\\":[" + a + "," + b + "]}";
    String resp = channel.sendRequest(req);
    JSONObject json = new JSONObject(resp);
    return json.getInt("result");
  }
}` },
        { type: 'code', lang: 'Java', caption: 'RPC runtime + appel côté client', code: `public class RpcRuntime {
  public static Object getRemoteService(String name) {
    if (name.equals("Calculator")) {
      return new CalculatorClientStub(new NetworkChannel("localhost", 5000));
    }
    throw new RuntimeException("Service inconnu : " + name);
  }
}

// Appel côté client :
calculator remoteService = getRemoteService("Calculator");
result = remoteService.add(3, 4)  // semble local
print(result)                     // 7` },
        { type: 'note', title: 'Ce qui se produit en coulisse', text: '1. stub.client.marshall(3,4) → message\n2. transport.send(message)\n3. server.receive → skeleton.unmarshall → server.add(3,4) → 7\n4. server.marshall(7) → transport.send\n5. client.receive → stub.unmarshall → retourne 7' },
      ],
    },
    {
      id: 'd9s8',
      title: 'Avantages et inconvénients du RPC',
      blocks: [
        { type: 'kv', items: [
          { k: '✔ Facilite le développement', v: 'Code plus proche du modèle local.' },
          { k: '✔ Encapsulation de la communication', v: 'Développeur focalisé sur l\u2019API métier.' },
          { k: '✔ IDL + génération de code', v: 'Cohérence des interfaces, moins d\u2019erreurs manuelles.' },
          { k: '✔ Support de différents paradigmes', v: 'Synchrone/asynchrone, streaming.' },
          { k: '✔ Interopérabilité', v: 'Avec SOAP/gRPC, on peut connecter des services écrits dans différents langages.' },
        ] },
        { type: 'steps', items: [
          { title: '✗ 01 — Fausse impression de transparence', text: 'Un appel distant n\u2019est pas un appel local — latence, pannes, variabilité.' },
          { title: '✗ 02 — Sérialisation coûteuse', text: 'Conversion/validation des objets peut être lourde.' },
          { title: '✗ 03 — Couplage sémantique', text: 'Changements d\u2019interface peuvent casser les clients si versioning absent.' },
          { title: '✗ 04 — Scalabilité', text: 'Un nombre élevé d\u2019appels RPC synchrones peut créer des goulots d\u2019étranglement.' },
          { title: '✗ 05 — Sécurité', text: 'Exposition de services via le réseau nécessite authentification, chiffrement, contrôle d\u2019accès.' },
          { title: '✗ 06 — Debug et traçabilité', text: 'Plus difficile que pour des appels locaux — nécessité d\u2019outils de tracing distribué.' },
        ] },
      ],
    },
  ],
}

export const dmod10: Module = {
  id: 'd10',
  num: 10,
  title: 'RPC → CORBA → RMI',
  subtitle: 'L\u2019évolution vers les objets distants : CORBA, composants RMI et code Java complet',
  icon: '☕',
  color: 'sky',
  source: 'Chapitre 2 Partie 2 — slides 96-107',
  sections: [
    {
      id: 'd10s1',
      title: 'Transition historique : pourquoi CORBA ?',
      blocks: [
        { type: 'paragraph', text: 'Lorsque le RPC (Remote Procedure Call) a été inventé dans les années 1980, la majorité des langages utilisés (comme C, Pascal, Ada) étaient procéduraux. On appelait donc à distance des fonctions ou procédures, pas des objets. Mais à la fin des années 1980 et au début des années 1990, la programmation orientée objet (POO) s\u2019est imposée (C++, Smalltalk, puis Java). Les systèmes distribués devaient eux aussi évoluer pour permettre l\u2019appel de méthodes sur des objets distants, pas seulement de fonctions.' },
        { type: 'definition', term: 'CORBA — Common Object Request Broker Architecture', def: 'Standard conçu par l\u2019OMG (Object Management Group), avant que Java n\u2019existe (1995), au début des années 1990.\n\nObjectif de CORBA : permettre à des programmes écrits dans différents langages (C++, etc.) de communiquer entre eux, en appelant des méthodes d\u2019objets distants de manière transparente.' },
      ],
    },
    {
      id: 'd10s2',
      title: 'Fonctionnement et limites de CORBA',
      blocks: [
        { type: 'steps', items: [
          { title: '1. Définition des interfaces', text: 'Définition des interfaces dans un langage neutre appelé IDL (Interface Definition Language).' },
          { title: '2. Compilation de l\u2019IDL', text: 'Compilation de l\u2019IDL pour générer automatiquement les stubs (côté client) et les squelettes (côté serveur).' },
          { title: '3. Appel via le stub', text: 'Le client appelle une méthode sur l\u2019objet distant via le stub, comme s\u2019il s\u2019agissait d\u2019un objet local.' },
          { title: '4. Transport par l\u2019ORB', text: 'L\u2019ORB (Object Request Broker) se charge de transporter la requête au serveur et de gérer la communication réseau.' },
          { title: '5. Réponse via l\u2019ORB', text: 'Le serveur reçoit l\u2019appel via le squelette, exécute la méthode et renvoie le résultat au client à travers l\u2019ORB.' },
        ] },
        { type: 'note', title: '💡 Rôle de l\u2019ORB', text: 'L\u2019ORB joue exactement le même rôle que le RPC Runtime dans un système RPC classique : il est l\u2019intermédiaire qui s\u2019occupe de toute la mécanique réseau entre le client et le serveur.' },
        { type: 'paragraph', text: 'CORBA a eu un grand succès dans les années 1990, étant donné qu\u2019il visait une interopérabilité multi-langages, mais : il était complexe à configurer ; il nécessitait beaucoup de fichiers et de couches pour faire de simples appels.' },
      ],
    },
    {
      id: 'd10s3',
      title: 'La naissance de RMI',
      blocks: [
        { type: 'paragraph', text: 'Quand Java est apparu (vers 1995), il a apporté un modèle objet simple et uniforme, et une machine virtuelle (JVM) garantissant la portabilité. Les ingénieurs de Sun Microsystems se sont inspirés du modèle CORBA, mais ont voulu un système : plus léger, spécifique à Java, utilisant la sérialisation native des objets Java. C\u2019est ainsi qu\u2019est né RMI (Remote Method Invocation).' },
        { type: 'definition', term: 'RMI (Remote Method Invocation)', def: 'Un mécanisme purement Java, inspiré de CORBA, qui permet d\u2019invoquer une méthode sur un objet situé sur une autre machine Java, comme si l\u2019objet était local.' },
        { type: 'list', items: [
          'Le but du RMI est de permettre la communication entre objets Java distribués sur un réseau,',
          'tout en conservant les principes de la programmation orientée objet (encapsulation, héritage, polymorphisme…),',
          'et en cachant complètement la complexité du réseau au développeur.',
        ] },
      ],
    },
    {
      id: 'd10s4',
      title: 'Les composants RMI',
      blocks: [
        { type: 'kv', items: [
          { k: 'Client', v: 'Programme qui invoque les méthodes distantes à travers une référence obtenue via le registre RMI.' },
          { k: 'Serveur', v: 'Héberge les objets distants et les enregistre dans le registre RMI.' },
          { k: 'Registre RMI', v: 'Service de nommage qui associe un nom logique à un objet distant pour permettre au client de le localiser.' },
          { k: 'Interface distante', v: 'Définit les méthodes accessibles à distance. Elle hérite de java.rmi.Remote. → Un marqueur : pour indiquer que les méthodes qu\u2019elle définit peuvent être appelées à distance.' },
          { k: 'Classe d\u2019implémentation', v: 'Contient le code de ces méthodes. Elle étend UnicastRemoteObject. → Rend un objet disponible et accessible à distance.' },
          { k: 'Stub client', v: 'Intermédiaire côté client qui transmet les appels.' },
        ] },
        { type: 'note', title: 'Skeleton serveur', text: 'Initialement, le compilateur RMI (RMIC) générait stubs et skeletons via compilation, mais le skeleton, depuis Java 5, est créé dynamiquement sans nécessiter de compilation manuelle.' },
        { type: 'diagram', diagram: 'RmiArch' },
      ],
    },
    {
      id: 'd10s5',
      title: 'Étape 1 — Définir l\u2019interface distante',
      blocks: [
        { type: 'paragraph', text: 'L\u2019interface distante définit les méthodes qui peuvent être appelées depuis une autre JVM. Elle doit : étendre java.rmi.Remote et déclarer toutes ses méthodes avec throws RemoteException.' },
        { type: 'code', lang: 'Java', caption: 'Code interface distante : Hello.java', code: `import java.rmi.Remote;
import java.rmi.RemoteException;

// Interface distante
public interface Hello extends Remote {
  String direBonjour(String nom) throws RemoteException;
}` },
      ],
    },
    {
      id: 'd10s6',
      title: 'Étape 2 — Créer la classe d\u2019implémentation distante',
      blocks: [
        { type: 'paragraph', text: 'Cette classe : implémente l\u2019interface distante, hérite de UnicastRemoteObject, fournit le code concret de chaque méthode distante.' },
        { type: 'code', lang: 'Java', caption: 'Code implémentation : HelloImpl.java', code: `import java.rmi.server.UnicastRemoteObject;
import java.rmi.RemoteException;

public class HelloImpl extends UnicastRemoteObject implements Hello {
  public HelloImpl() throws RemoteException {
    super(); // constructeur qui peut lever une RemoteException
  }

  @Override
  public String direBonjour(String nom) throws RemoteException {
    return "Bonjour, " + nom + " !"; // définition de la méthode distante
  }
}` },
      ],
    },
    {
      id: 'd10s7',
      title: 'Étape 3 — Mettre en place le serveur RMI',
      blocks: [
        { type: 'paragraph', text: 'Le serveur : crée et exporte l\u2019objet distant, démarre le registre RMI (service de nommage), enregistre l\u2019objet dans le registre sous un nom logique (via Naming.rebind).' },
        { type: 'code', lang: 'Java', caption: 'Code serveur : ServeurRMI.java', code: `import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;

public class ServeurRMI {
  public static void main(String[] args) {
    try {
      LocateRegistry.createRegistry(1099);   // démarrage du registre RMI (port 1099)
      HelloImpl obj = new HelloImpl();       // création de l'objet distant
      Naming.rebind("rmi://localhost/HelloService", obj); // enregistrement
      System.out.println("Serveur RMI prêt et en attente des requêtes...");
    } catch (Exception e) { e.printStackTrace(); }
  }
}` },
      ],
    },
    {
      id: 'd10s8',
      title: 'Étape 4 — Écrire le client RMI',
      blocks: [
        { type: 'paragraph', text: 'Le client : 1. localise l\u2019objet distant via le registre RMI (Naming.lookup()), 2. obtient une référence distante (le stub), 3. appelle les méthodes distantes comme si elles étaient locales.' },
        { type: 'code', lang: 'Java', caption: 'Code client : ClientRMI.java', code: `import java.rmi.Naming;

public class ClientRMI {
  public static void main(String[] args) {
    try {
      Hello obj = (Hello) Naming.lookup("rmi://localhost/HelloService"); // localisation
      String reponse = obj.direBonjour("Mouna");                          // invocation distante
      System.out.println("Réponse du serveur : " + reponse);              // affichage du résultat
    } catch (Exception e) { e.printStackTrace(); }
  }
}` },
      ],
    },
    {
      id: 'd10s9',
      title: 'Étape 5 — Compilation et exécution',
      blocks: [
        { type: 'code', lang: 'Terminal', caption: 'Les 4 commandes du cours', code: `# 1. Compiler tous les fichiers Java :
javac *.java

# 2. Démarrer le registre RMI (dans un terminal séparé) :
rmiregistry
# ➔ Ce service écoute par défaut sur le port 1099.
# ➔ Il faut le lancer dans le même répertoire que les classes compilées.

# 3. Démarrer le serveur :
java ServeurRMI
# → Message attendu : Serveur RMI prêt et en attente des requêtes...

# 4. Lancer le client :
java ClientRMI
# → Réponse du serveur : Bonjour, Mouna !` },
      ],
    },
    {
      id: 'd10s10',
      title: 'Architecture générale RMI',
      blocks: [
        { type: 'paragraph', text: 'L\u2019architecture RMI met en jeu : le Client Host (Remote interface + Client Program + Client Stub), le Server Host (Remote interface + Server Skeleton + Server Object) et le RMI Registry Host (registre des objets distants : stocke les références d\u2019objets distants exportés).' },
        { type: 'steps', items: [
          { title: '(1) Register server object', text: 'Le serveur enregistre l\u2019objet distant dans le RMI Registry.' },
          { title: '(2) Look for server object', text: 'Le client cherche l\u2019objet distant dans le registre.' },
          { title: '(3) Return Client Stub', text: 'Le registre renvoie le stub client au programme client.' },
          { title: '(4) Data Communication', text: 'Le Client Stub communique avec le Server Skeleton (via l\u2019ORB/transport) pour l\u2019appel réel.' },
        ] },
        { type: 'note', title: '💡 Remote interface', text: 'Définit le contrat entre client et serveur (la méthode que le client peut appeler). Elle est présente des deux côtés.' },
      ],
    },
    {
      id: 'd10s11',
      title: 'Avantages / inconvénients du RMI + RPC vs RMI',
      blocks: [
        { type: 'kv', items: [
          { k: '✔ Simple à utiliser', v: 'Dans des environnements purement Java.' },
          { k: '✔ Objets complets', v: 'Permet de passer des objets complets.' },
          { k: '✔ Masque totalement', v: 'La communication réseau.' },
          { k: '✔ Intégration native', v: 'À Java.' },
          { k: '✗ Spécifique à Java', v: 'Pas interopérable.' },
          { k: '✗ Dépendance forte à la JVM', v: 'Pas utilisable avec d\u2019autres langages.' },
          { k: '✗ Peu adapté', v: 'Pour les systèmes distribués hétérogènes.' },
        ] },
        { type: 'table', headers: ['Aspect', 'RPC', 'RMI'], rows: [
          ['Paradigme', 'Procédural', 'Orienté Objet'],
          ['Langage', 'Multi-langages (C, C++, etc.)', 'Spécifique à Java'],
          ['Ce qu\u2019on appelle', 'Des fonctions (procédures)', 'Des méthodes d\u2019objets distants'],
          ['Type de données transmis', 'Types simples (int, string, etc.)', 'Objets Java (via sérialisation)'],
          ['Interface', 'Définie via un fichier IDL', 'Interface Java qui étend Remote'],
          ['Interopérabilité', 'Forte (langages différents possibles)', 'Limitée à Java'],
          ['Outil de génération', 'idlj, protoc, etc.', 'rmic'],
          ['Squelette', 'Toujours présent', 'Automatique depuis Java 5'],
        ] },
      ],
    },
  ],
}
