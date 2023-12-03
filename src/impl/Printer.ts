import { DirectedGraph } from 'graphology';
export interface Printer {
  // Declare properties
  graph: DirectedGraph;

  // Declare methods
  print(fileDescriptor: number): void;
}
