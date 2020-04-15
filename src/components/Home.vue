<template>
  <div class="Home">
    <h1>Somm Wine Game</h1>
    <div class="intro">
      <p>
        Describe your wine like a sommelier! This site uses machine learning to
        predict the price, points, and variety based on a description. The better your description is the more accurate the predictions!
      </p>
    </div>
    <textarea
      v-model="review"
      placeholder="Pale pink in color.  Fresh watermelon, green apple, juicy peach and jasmine jump out of the glass.  A refreshing mouthfeel accentuates the fruit on the palate – raspberry, ripe pear, and sour candy watermelon. This wine has a long, tangy finish."
    ></textarea>
    <br />
    <br />
    <button v-on:click="sendData()" :disabled="isLoading == 1">Submit</button>
    <div :class="{ loading: isLoading }">
      <img src="../assets/loading.gif" v-if="isLoading" height="200px" width="200px" />
    </div>
    <br />
    <br />
    <div>
      <div class="results">
        <h3>Variety Scores</h3>
        <div class="list">
          <ul v-for="(index, item) in response.variety" v-bind:key="index">
            <li>{{ item }}:</li>
            <span v-for="index in toWineBottles(index)" :key="index">
              <i class="fas fa-wine-bottle"></i>
            </span>
          </ul>
        </div>
      </div>

      <div class="results">
        <h3>Points Scores</h3>
        <div class="list">
          <ul v-for="(index, item) in response.points" v-bind:key="index">
            <li>
              Points {{ item }}:
              <span v-for="index in toWineBottles(index)" :key="index">
                <i class="fas fa-wine-bottle"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="results">
        <h3>Price Scores</h3>
        <div class="list">
          <ul v-for="(index, item) in response.price" v-bind:key="index">
            <li>
              Price {{ item }}:
              <span v-for="index in toWineBottles(index)" :key="index">
                <i class="fas fa-wine-bottle"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ineedspace"></div>
    <div class="footer">
      <p>
        Need help writing a wine description? Check out some examples at
        <a
          href="https://www.winemag.com/"
          target="_blank"
        >winemag.com</a>
      </p>
      <p>
        Read about how the ml models were created
        <a
          href="https://dev.to/azure/grab-your-wine-it-s-time-to-demystify-ml-and-nlp-47f7"
          target="_blank"
        >Dev.To Blog</a>
      </p>
      <p>Read about how the ml models were deployed with onnx on April 17th!</p>
      <p>
        <a href="https://twitter.com/Cassieview" target="_blank">Follow me on twitter!</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var defaultReview =
  "Pale pink in color.  Fresh watermelon, green apple, juicy peach and jasmine jump out of the glass.  A refreshing mouthfeel accentuates the fruit on the palate – raspberry, ripe pear, and sour candy watermelon. This wine has a long, tangy finish.";
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
      this.input.review = this.getReview();
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
    },
    getReview() {
      if (this.review) {
        return this.review;
      }
      return defaultReview;
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
  height: 70px;
  border-radius: 12px;
  padding: 10px;
  font-family: Calibri;
}

div.intro {
  width: 50%;
  margin: auto;
  padding: 10px;
}

button {
  width: 30%;
  padding: 10px;
  font-family: Calibri;
}

div.Home {
  align-content: center;
  margin: auto;
}

div.results {
  display: inline-block;
  width: 200px;
  height: 250px;
  margin: 5px;
  border: 2px solid white;
  background-color: #722f37;
  padding: 10px;
  border-radius: 25px;
  font-family: Calibri;
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
button {
  border-radius: 25px;
  color: white;
  background-color: #722f37;
  font-family: Calibri;
}

.footer {
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: black;
  color: white;
  text-align: center;
  box-sizing: border-box;
  font-family: Calibri;
}
.list {
  text-align: left;
  padding: 5px;
}
.ineedspace {
  padding: 50px;
}
</style>
