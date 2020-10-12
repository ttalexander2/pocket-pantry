import * as React from 'react';
import { ThemeProvider, Input, Button } from 'react-native-elements';

class NewPantryForm extends React.Component {  
  //TODO: Add form input
  render() {
    return (
      <ThemeProvider>
        <Input placeholder="Food Name" />
        
        
      </ThemeProvider>

    );

  }
}

export default NewPantryForm;
