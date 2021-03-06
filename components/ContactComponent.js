import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";
import * as ImagePicker from "expo-image-picker";

class Contact extends Component {
  static navigationOptions = {
    title: "Contact"
  };

  sendMail() {
    MailComposer.composeAsync({
      recipients: ["confusion@food.net"],
      subject: "I need food help",
      body: "Dear Confusion owners: "
    });
  }

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
            <Button
              title=" Send Email"
              buttonStyle={{ backgroundColor: "#512DA8" }}
              icon={
                <Icon name="envelope-o" type="font-awesome" color="white" />
              }
              onPress={this.sendMail}
            />
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Contact;
