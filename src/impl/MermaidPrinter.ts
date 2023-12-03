import * as fs from 'node:fs';
import { DirectedGraph } from 'graphology';
import { Attributes } from 'graphology-types';
import { Printer } from './Printer.js';

export class MermaidPrinter implements Printer {

  public graph: DirectedGraph;

  public constructor(graph: DirectedGraph) {
    this.graph = graph;
  }

  public print(fileDescriptor: number): void {
    fs.writeSync(fileDescriptor, 'flowchart TD\n');

    this.graph.forEachNode((node: string) => {
      fs.writeSync(fileDescriptor, node.replaceAll('@', '_').replaceAll(' ', '_'));
      fs.writeSync(fileDescriptor, '\n');
    });

    this.graph.forEachEdge((edge: string, attributes: Attributes, source: string, target: string, sourceAttributes: Attributes, targetAttributes: Attributes, undirected: boolean) => { // eslint-disable-line @typescript-eslint/no-unused-vars
      fs.writeSync(fileDescriptor, source.replaceAll('@', '_').replaceAll(' ', '_') + ' --> ' + target.replaceAll('@', '_').replaceAll(' ', '_'));
      fs.writeSync(fileDescriptor, '\n');
    })
  }
}
