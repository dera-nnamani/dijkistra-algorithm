function dijkstra(graph, start) {
  // Create an object to store the shortest distances
  const distances = {};

  // Set all distances to Infinity initially, except for the start node, which is 0
  for (const vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;

  // Priority queue for selecting the vertex with the shortest known distance
  const pq = new Set();
  pq.add(start);

  while (pq.size > 0) {
    // Find the vertex in the priority queue with the shortest known distance
    let minVertex = null;
    for (const vertex of pq) {
      if (minVertex === null || distances[vertex] < distances[minVertex]) {
        minVertex = vertex;
      }
    }

    // Remove the selected vertex from the priority queue
    pq.delete(minVertex);

    // Process each neighbor of the selected vertex
    const neighbors = graph[minVertex];
    for (const neighbor in neighbors) {
      const weight = neighbors[neighbor];
      const tentativeDistance = distances[minVertex] + weight;

      // Update the distance if the new tentative distance is shorter
      if (tentativeDistance < distances[neighbor]) {
        distances[neighbor] = tentativeDistance;
        pq.add(neighbor); // Add the neighbor back to the priority queue
      }
    }
  }

  return distances;
}

// Example graph and test
const graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 5, D: 10 },
  C: { A: 2, B: 5, D: 3 },
  D: { B: 10, C: 3 },
};

const startVertex = "A";
const shortestDistances = dijkstra(graph, startVertex);
console.log(shortestDistances);
