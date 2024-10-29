const achievementsList = [
  {
    id: "diamond",
    name: "Diamanete Elite",
    icon: "💎",
    description: "Obtuvo una calificación de rendimiento superior al 95 %",
    unlockedAt: 95,
  },
  {
    id: "crown",
    name: "Regalía de ventas",
    icon: "👑",
    description: "Top 3 en el ranking mensual",
    unlockedAt: 90,
  },
  {
    id: "star",
    name: "Estrella en ascenso",
    icon: "⭐",
    description: "Metas mensuales superadas",
    unlockedAt: 85,
  },
  {
    id: "rocket",
    name: "Cierre Veloz",
    icon: "🚀",
    description: "Negocios cerrados en tiempo récord",
    unlockedAt: 80,
  },
];

export const getAchievements = (performance) => {
  return achievementsList.filter(
    (achievement) => performance >= achievement.unlockedAt
  );
};
