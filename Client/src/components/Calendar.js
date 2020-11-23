import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Header, Calendar, Text, Button  } from '@ui-kitten/components';
import HomeBar from './HomeBar';
import {useSelector, connect} from 'react-redux';

const MapDay = (date, expirationData) => {
  let dateStr = date.toISOString().split('T')[0];
  if (expirationData[dateStr]){
    return expirationData[dateStr].map((item) => {
      return(<Text style={styles.dayContainer}>{item}</Text>)
    })
  }
  else{
    return;
  }

}

const DayCell = ({ date }, style, expirationData) => (

  <View
    style={[styles.dayContainer, style.container]}>
    <Text style={style.text}>{`${date.getDate()}`}</Text>
    <Text style={style.text}></Text>
    {
      MapDay(date, expirationData)
    }

  </View>
);

export const CalendarView = ({navigation}) => {

  const [date, setDate] = React.useState(null);

  const expirationData = useSelector(state => state.CalendarData.expiration);

  return (
    <Layout>
      <HomeBar name="Calendar" navigation={navigation} />
      <Calendar
        style={styles.calendar}
        date={date}
        onSelect={nextDate => setDate(nextDate)}
        renderDay={({ date }, style) => DayCell({ date }, style, expirationData)}
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
