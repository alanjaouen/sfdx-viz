import * as fs from 'node:fs';
import { DirectedGraph } from 'graphology';
import { Attributes } from 'graphology-types';
import { Printer } from './Printer.js';

export class VisJsPrinter implements Printer {

  public graph: DirectedGraph;

  public constructor(graph: DirectedGraph) {
    this.graph = graph;
  }

  public print(fileDescriptor: number): void {
    const template = `<html>
    <body>
    <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
    <script type="text/javascript">
    `;
    fs.writeSync(fileDescriptor, template);


    fs.writeSync(fileDescriptor, 'var nodes = new vis.DataSet([\n');
    this.graph.forEachNode((node: string) => {

      const visNode = {
        id: node.replaceAll('@', '_').replaceAll(' ', '_'),
        label: node,
        color: node.includes('@') ? 'LightCoral': 'DeepSkyBlue',
      }

      fs.writeSync(fileDescriptor, JSON.stringify(visNode)+',\n');
    });
    fs.writeSync(fileDescriptor, ']);\n');

    fs.writeSync(fileDescriptor, 'var edges = new vis.DataSet([\n');

    this.graph.forEachEdge((edge: string, attributes: Attributes, source: string, target: string, sourceAttributes: Attributes, targetAttributes: Attributes, undirected: boolean) => { // eslint-disable-line @typescript-eslint/no-unused-vars
      const visEdge = {
        from: source.replaceAll('@', '_').replaceAll(' ', '_'),
        to: target.replaceAll('@', '_').replaceAll(' ', '_'),
        arrows: 'to'
      }
      fs.writeSync(fileDescriptor, JSON.stringify(visEdge)+',\n');
    })
    fs.writeSync(fileDescriptor, ']);\n');
    fs.writeSync(fileDescriptor, `// create a network
    var container = document.body;
    var data = {
      nodes: nodes,
      edges: edges,
    };
    var options = {};
    var network = new vis.Network(container, data, options);
    </script>
    </body>
    </html>`);
  }
}
