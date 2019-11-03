import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Picker,
  Switch,
  Button,
  Modal,
  FlatList
} from "react-native";
import { Card, Icon } from "react-native-elements";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseURL";

import { postFavorite, postComment } from "../redux/ActionCreators";

import { Rating, Input } from "react-native-elements";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}> {dish.description}</Text>
        <View style={styles.cardRow}>
          <Icon
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorite ? console.log("Already favorite") : props.onPress()
            }
          />
          <Icon
            style={styles.cardItem}
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            onPress={() => props.onShowModal()}
          />
        </View>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={item.rating}
          style={styles.rating}
        />
        {/* <Rating type="star" startingValue={item.rating} ratingCount={5} /> */}
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}
        </Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 5,
      author: "",
      comment: "",
      commentId: 0
    };
  }

  componentDidMount() {
    // console.log("get object length!");
    // console.log(Object.keys(this.props.comments.comments).length);
    this.setState({
      commentId: Object.keys(this.props.comments.comments).length
    });
  }

  toggleModal() {
    // this.setState = { showModal: !this.state.showModal };
    this.setState({ showModal: !this.state.showModal });
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  static navigationOptions = {
    title: "Dish Details"
  };

  handleComment(dishId) {
    let newId = this.state.commentId;
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
    // this.props.postComment(0, 4, "rk", "comment");
    console.log("reached stringify state");
    console.log(JSON.stringify(this.state));
    console.log(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment,
      this.state.commentId
    );
  }

  resetForm() {
    this.setState = {
      showModal: false,
      rating: 5,
      author: "",
      comment: ""
    };
  }

  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          onShowModal={() => this.toggleModal()}
        />

        <RenderComments
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === dishId
          )}
        />

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              type="star"
              startingValue={this.state.rating}
              ratingCount={5}
              imageSize={60}
              showRating
              onFinishRating={rating => this.setState({ rating: rating })}
            />

            <Input
              placeholder="Author"
              leftIcon={{
                name: "user",
                type: "font-awesome",
                size: 24
              }}
              onChangeText={text => this.setState({ author: text })}
            />

            <Input
              placeholder="Comment"
              leftIcon={{
                name: "comment",
                type: "font-awesome",
                size: 24
              }}
              onChangeText={text => this.setState({ comment: text })}
            />

            <Button
              onPress={() => {
                this.toggleModal();
                this.handleComment(dishId);
                this.resetForm();
              }}
              style={styles.cardItem}
              color="#512DA8"
              title="Submit"
            />
            <Button
              onPress={() => {
                this.toggleModal();
                this.resetForm();
              }}
              color="grey"
              title="Cancel"
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  cardItem: {
    flex: 1,
    margin: 10
  },
  modal: {
    justifyContent: "center",
    margin: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  },
  rating: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishDetail);
