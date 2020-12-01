/*
This file creates the calendar component that we use to display ingredient
data in a calendar layout. The items are placed based on when they are
set to expire
*/

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Header, Calendar, Text, Button  } from '@ui-kitten/components';
import HomeBar from './HomeBar';
import {useSelector, connect} from 'react-redux';


const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

const MapDay = (date, ingredientData) => {
  return ingredientData.map((item) => {
    if (datesAreOnSameDay(date, item.expirationDate)) {
      return(<Text style={styles.dayContainer}>{item.name}</Text>)
    }
      else return;
  })

}

const DayCell = ({ date }, style, ingredientData) => (

  <View
    style={[styles.dayContainer, style.container]}>
    <Text style={style.text}>{`${date.getDate()}`}</Text>
    <Text style={style.text}></Text>
    {
      MapDay(date, ingredientData)
    }

  </View>
);

export const CalendarView = ({navigation}) => {

  const [date, setDate] = React.useState(null);

  const ingredientData = useSelector(state => state.PantryData.ingredients);


  const now = new Date();
  const next = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  const prev = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

  return (
    <Layout>
      <HomeBar name="Calendar" navigation={navigation} />
      <Calendar
        style={styles.calendar}
        date={date}
        onSelect={nextDate => setDate(nextDate)}
        renderDay={({ date }, style) => DayCell({ date }, style, ingredientData)}
        min={prev}
        max={next}
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

export default connect()(CalendarView);
