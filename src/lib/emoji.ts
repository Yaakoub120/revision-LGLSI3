// Emoji par icône de module (partagé entre les matières)
const ICON_EMOJI: Record<string, string> = {
  UserCog: '🧑‍💼',
  FolderTree: '📁',
  HardDrive: '💾',
  Wrench: '🔧',
  DatabaseBackup: '🗄️',
  Users: '👥',
  Package: '📦',
  Settings2: '⚙️',
  Network: '🌐',
  Globe: '🌍',
  Gauge: '📊',
  Database: '🍃',
};

export function moduleEmoji(icon: string): string {
  return ICON_EMOJI[icon] ?? '📘';
}
