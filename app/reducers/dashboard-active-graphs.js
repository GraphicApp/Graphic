



export default function (state=null, action) {
  switch (action.type) {
    case "GRAPH_SELECTED":
        return action.payload
      break;

  }
  return state;
}
