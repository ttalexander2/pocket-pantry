import * as React from 'react';
import { ThemeProvider, Input, Button } from 'react-native-elements';

class NewPantryForm extends React.Component {  
  //TODO: Add form shit
  render() {
    return (
      <ThemeProvider>
        <Input placeholder="Food Name" />
        <Button title="Select Date" onPress={() => {
          this.setState({show: true})
        }} />
        
      </ThemeProvider>

    );

  }
}

export default NewPantryForm;
