import Pusher from "pusher-js";

let pusher = new Pusher("cf6d3f62c67be65430ce", {
  cluster: "sa1",
});

var channel = pusher.subscribe("chat");
channel.bind("hello", function (data) {
  const parseComment = JSON.parse(data.message);

  setMessages((state) => [parseComment, ...state]);
});
