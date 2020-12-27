class Queue{
  storage: { node: string , weight: number }[];

  constructor(){
    this.storage = [];
  }

  public push(node: string , weight: number): void{
    this.storage = this.storage.filter(item => item.node !== node);
    this.storage.push({ node , weight });
    this.sort();
  }

  public shift():{ node: string , weight: number }{
    return this.storage.shift();
  }

  public sort(): void{
    this.storage.sort((a,b) => a.weight - b.weight );
  }

}

class Graph{
  adjList: object;

  constructor(){
    this.adjList = {};
  }

  public addVertex(vertex: string): void{
    this.adjList[vertex] = [];
  }

  public addEdge(vertex1: string, vertex2: string, weight: number): void{
    this.adjList[vertex1].push({ node: vertex2 , weight });
    this.adjList[vertex2].push({ node: vertex1 , weight });
  }

  public dijkstra(start: string , end: string): string{
    const queue = new Queue();
    const distances = {};
    const previous = {};
    const shortesPath = [];

    for(let node in this.adjList){
      if(node === start){
        distances[node] = 0
        queue.push(node,0);
      }else{
        distances[node] = Infinity;
        queue.push(node,Infinity);
      }
      previous[node] = null;
    }

    while(queue.storage.length){
      const shiftedNode = queue.shift();
      if(shiftedNode.node === end){
        let current = shiftedNode.node;
        while(previous[current]){
          shortesPath.push(current);
          current = previous[current];
        }
        shortesPath.push(start);
      }else{
        for(let neighbor of this.adjList[shiftedNode.node]){
          const candidate = shiftedNode.weight + neighbor.weight
          if(candidate < distances[neighbor.node]){
            distances[neighbor.node] = candidate;
            previous[neighbor.node] = shiftedNode.node;
            queue.push(neighbor.node, candidate);
          }
        }   
      }
    }

    return shortesPath.reverse().join(' -> ');
  }
}

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);

console.log(graph.dijkstra('A', 'E'));