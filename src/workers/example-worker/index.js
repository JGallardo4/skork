import PromiseWorker from "promise-worker";
import Worker from "worker-loader!./worker";

const exampleWorker = new PromiseWorker(new Worker());

const send = (message) =>
  exampleWorker.postMessage({
    type: "message",
    message,
  });

export default {
  send,
};
