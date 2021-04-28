<template>
  <div>
    <input type="text" v-model="message" />
    <button @click="postMessage">Send message</button>
  </div>
</template>

<script>
import exampleWorker from "../workers/example-worker";

export default {
  name: "WorkerExample",

  data() {
    return {
      message: "",
    };
  },

  methods: {
    postMessage() {
      exampleWorker.send({ anything: "you need" }).then((reply) => {
        console.log("The reply: " + reply);
      });
    },
  },
};
</script>

<style scoped></style>
