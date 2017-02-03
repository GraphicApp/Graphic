export const selectGraph = (graph) => {
  console.log('You clicked on graph: ', graph.first);
  return {
    type: "GRAPH_SELECTED",
    payload: graph
  }
};
