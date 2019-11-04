import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";
import * as Animatable from "react-native-animatable";

class Contact extends Component {
  static navigationOptions = {
    title: "Contact"
  };

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Card title="Contact Information">
            <Text>
              {`
121, Clear Water Bay 

Road Clear Water Bay, 

Kowloon HONG KONG 

Tel: +852 1234 5678 

Fax: +852 8765 4321 

Email:confusion@food.net            
            `}
            </Text>
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Contact;
