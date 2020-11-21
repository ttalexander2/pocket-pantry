import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Header, Calendar, Text, Button  } from '@ui-kitten/components';
import HomeBar from './HomeBar';

const DayCell = ({ date }, style) => (
  <View
    style={[styles.dayContainer, style.container]}>
    <Text style={style.text}>{`${date.getDate()}`}</Text>
    <Text style={styles.dayContainer}>Pasta Sauce Expires</Text>
    <Text style={styles.dayContainer}>Cilantro Expires</Text>
    <Text style={styles.dayContainer}>Onion Expires</Text>

  </View>
);

export const CalendarView = ({navigation}) => {

  const [date, setDate] = React.useState(null);

  return (
    <Layout>
      <HomeBar name="Calendar" navigation={navigation} />
      <Calendar
        style={styles.calendar}
        date={date}
        onSelect={nextDate => setDate(nextDate)}
        renderDay={DayCell}
      />
    </Layout>

  );
};

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  calendar: {
    width: '100%',
    height: '100%',
  },
  value: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export default CalendarView;
