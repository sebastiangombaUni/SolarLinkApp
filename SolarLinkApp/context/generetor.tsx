type HourlyConsumption = {
  hour: string; // Ej: "8 AM", "9 PM"
  energyUsage: number; // Consumo en watts
};

type DailyConsumption = {
  date: string; // Fecha del día
  totalEnergyUsage: number; // Consumo total en el día en watts
};

type MonthlyConsumption = {
  month: string; // Mes y año, Ej: "Nov 2024"
  totalEnergyUsage: number; // Consumo total en el mes en watts
};

// Función para generar datos por hora (24 horas en un día)
export function generateHourlyData(): HourlyConsumption[] {
  const hourlyData: HourlyConsumption[] = [];
  for (let i = 0; i < 24; i++) {
    const hourLabel = i < 12 ? `${i === 0 ? 12 : i} AM` : `${i === 12 ? 12 : i - 12} PM`;
    hourlyData.push({
      hour: hourLabel,
      energyUsage: Math.floor(Math.random() * 500), // Consumo aleatorio entre 0 y 500 watts
    });
  }
  return hourlyData;
}

// Función para generar datos por día (7 días)
export function generateWeeklyData(): DailyConsumption[] {
  const weeklyData: DailyConsumption[] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    weeklyData.push({
      date: date.toISOString().split('T')[0], // Solo la fecha (YYYY-MM-DD)
      totalEnergyUsage: Math.floor(Math.random() * 7000), // Consumo total aleatorio del día entre 0 y 7000 watts
    });
  }
  return weeklyData.reverse(); // Para que los días aparezcan en orden cronológico
}

// Función para generar datos por mes (3 meses)
export function generateMonthlyData(): MonthlyConsumption[] {
  const monthlyData: MonthlyConsumption[] = [];
  const now = new Date();
  for (let i = 0; i < 3; i++) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i);
    const monthLabel = monthDate.toLocaleString('default', { month: 'short', year: 'numeric' });
    monthlyData.push({
      month: monthLabel,
      totalEnergyUsage: Math.floor(Math.random() * 30000), // Consumo total aleatorio del mes entre 0 y 30000 watts
    });
  }
  return monthlyData.reverse(); // Para que los meses aparezcan en orden cronológico
}
