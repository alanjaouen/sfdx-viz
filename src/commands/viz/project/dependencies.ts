import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fs from 'node:fs';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages, SfProject, PackageDirDependency } from '@salesforce/core';
import Graph, { DirectedGraph } from 'graphology';
import { MermaidPrinter } from '../../../impl/MermaidPrinter.js';
import { VisJsPrinter } from '../../../impl/VisJsPrinter.js';

Messages.importMessagesDirectory(dirname(fileURLToPath(import.meta.url)));
const messages = Messages.loadMessages('sfdx-viz', 'vis.project.dependencies');

export default class Dependencies extends SfCommand<object> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    format: Flags.string({
      summary: messages.getMessage('flags.format.summary'),
      description: messages.getMessage('flags.format.description'),
      options: ['mermaid', 'visJs'],
      default: 'mermaid',
    }),
    output: Flags.string({
      summary: 'Path to the output file',
      default: 'graph.html',
    }),
  };

  public static readonly requiresProject = true;

  public async run(): Promise<object> {
    const { flags } = await this.parse(Dependencies);

    const graph = await this.getProjectAsGaph();

    // printing shit
    let printer = null;
    switch (flags.format) {
      case 'mermaid':
        printer = new MermaidPrinter(graph);
        break;
      case 'visJs':
        printer = new VisJsPrinter(graph);
        break;
      default:
        this.error('Invalid output type specified. Please use A or B.');
    }

    const fileDescriptor = fs.openSync(flags.output, 'w');
    printer?.print(fileDescriptor);

    fs.closeSync(fileDescriptor);

    return {};
  }

  // eslint-disable-next-line
  private async getProjectAsGaph(): Promise<DirectedGraph> {
    const project = await SfProject.resolve();
    const projectJson = await project.retrieveSfProjectJson();
    const packageDirectories = await projectJson.getPackageDirectories();

    const graph = new Graph.DirectedGraph();

    packageDirectories.forEach((element) => {
      // add or update package node
      graph.updateNode(element.package, () => element);

      // add dependencies node if not found
      const dependencies: PackageDirDependency[] = element.dependencies ?? [];
      dependencies.forEach((dependency) => {
        if (!graph.hasNode(dependency.package)) {
          graph.addNode(dependency.package);
        }
        graph.addEdge(element.package, dependency.package);
      });
    });

    return graph;
  }
}
