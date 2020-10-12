import * as React from 'react';
import { ThemeProvider, Input, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

class NewPantryForm extends React.Component {

  state = {
    show: false,
    date: new Date(),
  }

  onChange(event, seletedDate) {
    const currentDate = selectedDate || this.state.date;
    this.setState({show: Platform.OS === 'ios'});
    this.setState({date: currentDate});
  }

  getMode() {
    if (Platform.OS === 'ios'){
      return 'datetime'
    }
    else
    {
      return 'date'
    }
  }
  

  render() {
    return (
      <ThemeProvider>
        <Input placeholder="Food Name" />
        <Button title="Select Date" onPress={() => {
          this.setState({show: true})
        }} />
        {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode={this.getMode()}
          is24Hour={true}
          display="default"
          onChange={this.onChange}
        />
      )}
      </ThemeProvider>

    );

  }
}

export default NewPantryForm;
