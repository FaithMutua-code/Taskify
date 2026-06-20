// components/MiniCalendar.tsx
import React from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import { colors } from '../constants/theme';

interface MiniCalendarProps {
  onDayPress?: (day: DateData) => void;
}

export default function MiniCalendar({ onDayPress }: MiniCalendarProps) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <Calendar
      current={today}
      onDayPress={onDayPress}
      markedDates={{
        [today]: { selected: true, selectedColor: colors.primary },
      }}
      theme={{
        backgroundColor: colors.white,
        calendarBackground: colors.white,
        textSectionTitleColor: colors.textMuted,
        selectedDayBackgroundColor: colors.primary,
        selectedDayTextColor: colors.white,
        todayTextColor: colors.primary,
        dayTextColor: colors.text,
        textDisabledColor: colors.textLight,
        arrowColor: colors.primary,
        monthTextColor: colors.text,
        textDayFontSize: 13,
        textMonthFontSize: 14,
        textDayHeaderFontSize: 11,
        'stylesheet.calendar.header': {
          header: {
            display: 'none', // we render our own month header above
          },
        },
      }}
      hideExtraDays
      style={{ borderRadius: 12 }}
    />
  );
}
