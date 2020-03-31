<template>
  <div class="Home">
    <span class="container"></span>
    <h1>Somm Wine Game</h1>
    <div class="intro">
      <h2>
        Describe your wine like a sommelier! This site uses machine learning to
        predict the Price, Points, and Variety based on the description
        provided.
      </h2>
    </div>
    <textarea
      v-model="review"
      placeholder="This fragrant, savory red carries aromas of underbrush, plum, blue flower, cocoa and camphor on the nose. The polished palate boasts juicy Marasca cherry, ripe blackberry, licorice, tobacco and an appealing hint of game. Silky tannins and bright acidity keep it balanced and elegant."
    ></textarea>
    <br />
    <button v-on:click="sendData()">Submit</button>
    <br />
    <br />
    <div>
      <span class="results">
        <h3>Variety</h3>
        <ul
          id="example-2"
          v-for="(index, item) in response.variety"
          v-bind:key="index"
        >
          <li>{{ item }}: {{ index }}</li>
        </ul>
      </span>

      <span class="results">
        <h3>Points</h3>
        <ul
          id="example-2"
          v-for="(index, item) in response.points"
          v-bind:key="index"
        >
          <li>Points {{ item }}: {{ index }}</li>
        </ul>
      </span>

      <span class="results">
        <h3>Price</h3>
        <ul
          id="example-2"
          v-for="(index, item) in response.price"
          v-bind:key="index"
        >
          <li>Price {{ item }}: {{ index }}</li>
        </ul>
      </span>
    </div>
  </div>
  <!-- <input type="text" v-model="input.lastname" placeholder="Last Name" /> -->
</template>

<script>
import axios from "axios";
const url =
  "https://ai-sommelier.azurewebsites.net/api/wine?code=OMwzdCHjCVPZlHG0oLlUZzZXap4n31YljUFvQtU3w1TvLpLTVQ6nCA==";
export default {
  name: "Home",
  props: {
    review: String
  },
  data() {
    return {
      input: {
        review: this.review
      },
      response: ""
    };
  },
  methods: {
    sendData() {
      this.input.review = this.review;
      this.response = "";
      axios
        .post(url, this.input, {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(
          result => {
            this.response = result.data;
          },
          error => {
            console.error(error);
          }
        );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
textarea {
  width: 50%;
  height: 50px;
}

div.intro {
  width: 50%;
  margin: auto;
  padding: 10px;
}

button {
  width: 30%;
  padding: 10px;
}

div.Home {
  align-content: center;
  margin: auto;
}

.results {
  display: inline-block;
  width: 300px;
  height: 250px;
  margin: 10px;
  border: 1px solid white;
  background-color: #722f37;
}
</style>
