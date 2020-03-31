<template>
  <div class="Home">
    <h1>Somm Wine Game</h1>
    <div class="intro">
      <h2>
        Describe your wine like a sommelier! This site uses machine learning to
        predict the price, points, and variety based on a description.
      </h2>
    </div>
    <textarea
      v-model="review"
      placeholder="This fragrant, savory red carries aromas of underbrush, plum, blue flower, cocoa and camphor on the nose. The polished palate boasts juicy Marasca cherry, ripe blackberry, licorice, tobacco and an appealing hint of game. Silky tannins and bright acidity keep it balanced and elegant."
    ></textarea>
    <br />
    <br />
    <button v-on:click="sendData()" :disabled="isLoading == 1">Submit</button>
    <div :class="{ loading: isLoading }">
      <img
        src="../assets/loading.gif"
        v-if="isLoading"
        height="200px"
        width="200px"
      />
    </div>
    <br />
    <br />
    <div>
      <div class="results">
        <h3>Variety Scores</h3>
        <ul v-for="(index, item) in response.variety" v-bind:key="index">
          <li>{{ item }}:</li>
          <span v-for="index in toWineBottles(index)" :key="index"
            ><i class="fas fa-wine-bottle"></i>
          </span>
        </ul>
      </div>

      <div class="results">
        <h3>Points Scores</h3>
        <ul v-for="(index, item) in response.points" v-bind:key="index">
          <li>
            Points {{ item }}:
            <span v-for="index in toWineBottles(index)" :key="index"
              ><i class="fas fa-wine-bottle"></i>
            </span>
          </li>
        </ul>
      </div>

      <div class="results">
        <h3>Price Scores</h3>
        <ul v-for="(index, item) in response.price" v-bind:key="index">
          <li>
            Price {{ item }}:
            <span v-for="index in toWineBottles(index)" :key="index"
              ><i class="fas fa-wine-bottle"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <h3>
      Need help writing a wine description? Check out some examples at
      <a href="https://www.winemag.com/">winemag.com</a>
    </h3>
  </div>
</template>

<script>
import axios from "axios";
const url =
  "https://ai-sommelier.azurewebsites.net/api/wine?code=OMwzdCHjCVPZlHG0oLlUZzZXap4n31YljUFvQtU3w1TvLpLTVQ6nCA==";
export default {
  name: "Home",
  props: {},
  data() {
    return {
      input: {
        review: this.review
      },
      response: "",
      review: "",
      isLoading: false
    };
  },
  methods: {
    sendData() {
      this.input.review = this.review;
      this.response = "";
      this.isLoading = true;
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
            this.isLoading = false;
          },
          error => {
            console.error(error);
            this.isLoading = false;
          }
        );
    },
    toWineBottles(value) {
      value = Math.ceil(parseFloat(value) / 0.2);
      return value;
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

div.results {
  display: inline-block;
  width: 300px;
  height: 250px;
  margin: 10px;
  border: 1px solid white;
  background-color: #722f37;
}
.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

div.loading {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 25%; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.rotateimg90 {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
