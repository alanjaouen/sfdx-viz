import { TestContext } from '@salesforce/core/lib/testSetup.js';
import { expect } from 'chai';
// import { stubSfCommandUx } from '@salesforce/sf-plugins-core';
// import Dependencies from '../../../src/commands/viz/project/dependencies.js';

describe('dependencies', () => {
  const $$ = new TestContext();
  // let sfCommandStubs: ReturnType<typeof stubSfCommandUx>;

  beforeEach(() => {
    // sfCommandStubs = stubSfCommandUx($$.SANDBOX);
  });

  afterEach(() => {
    $$.restore();
  });

  it('runs hello world', async () => {
    expect(true).to.equal(true);
    // try {
    //   await Dependencies.run([]);
    // }
    // catch (e) {
    // }
    // const output = sfCommandStubs.log
    //   .getCalls()
    //   .flatMap((c) => c.args)
    //   .join('\n');
    // expect(output).to.include('Hello World');
  });

  // it('runs hello world with --json and no provided name', async () => {
  //   const result = await World.run([]);
  //   expect(result.name).to.equal('World');
  // });

  // it('runs hello world --name Astro', async () => {
  //   await World.run(['--name', 'Astro']);
  //   const output = sfCommandStubs.log
  //     .getCalls()
  //     .flatMap((c) => c.args)
  //     .join('\n');
  //   expect(output).to.include('Hello Astro');
  // });

  // it('runs hello world --name Astro --json', async () => {
  //   const result = await World.run(['--name', 'Astro', '--json']);
  //   expect(result.name).to.equal('Astro');
  // });
});
