// components/WeeklyBarChart.tsx
import React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { colors } from '../constants/theme';
import { ChartDataPoint } from '../constants/types';

interface WeeklyBarChartProps {
  data: ChartDataPoint[];
  height?: number;
  width?: number;
}

export default function WeeklyBarChart({ data, height = 220, width }: WeeklyBarChartProps) {
  const chartWidth = width || Dimensions.get('window').width - 64;

  const chartData = {
    labels: data.map((d) => d.day),
    datasets: [{ data: data.map((d) => d.timeSpent) }],
  };

  return (
    <View>
      <BarChart
        data={chartData}
        width={chartWidth}
        height={height}
        fromZero
        showValuesOnTopOfBars
        withInnerLines={false}
        chartConfig={{
          backgroundColor: colors.white,
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          decimalPlaces: 0,
          color: () => colors.primary,
          labelColor: () => colors.textMuted,
          barPercentage: 0.6,
          propsForBackgroundLines: { stroke: 'transparent' },
        }}
        style={{ borderRadius: 12 }}
      />
    </View>
  );
}
