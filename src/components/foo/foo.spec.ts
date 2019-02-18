import { newE2EPage } from '@stencil/core/testing';

describe('my-foo', () => {
  it('exploration 1', async () => {
    const page = await newE2EPage();
    console.log = jest.fn();

    await page.setContent('<my-foo toggle="true"></my-foo>');
    await page.waitForChanges();
    const component = await page.find('my-foo');


    let bar = await page.find('my-foo >>> my-bar');
    bar.click();
    await page.waitForChanges();
    // Succeeds
    expect(console.log).nthCalledWith(1, "my-bar: 1");


    component.setProperty("toggle", false);
    await page.waitForChanges();
    bar = await page.find('my-foo >>> my-bar');
    bar.click();
    await page.waitForChanges();
    // Fails, but expected to succeed
    expect(console.log).nthCalledWith(2, "my-bar: 2");
  });

  it('exploration 2', async () => {
    const page = await newE2EPage();
    console.log = jest.fn();
    await page.setContent('<my-foo toggle="false"></my-foo>');
    await page.waitForChanges();
    const component = await page.find('my-foo');


    let bar = await page.find('my-foo >>> my-bar');
    bar.click();
    await page.waitForChanges();
    // Succeeds
    expect(console.log).nthCalledWith(1, "my-bar: 2");


    component.setProperty("toggle", true);
    await page.waitForChanges();
    bar = await page.find('my-foo >>> my-bar');
    bar.click();
    await page.waitForChanges();
    // Succeeds
    expect(console.log).nthCalledWith(2, "my-bar: 1");

    component.setProperty("toggle", false);
    await page.waitForChanges();
    bar = await page.find('my-foo >>> my-bar');
    bar.click();
    await page.waitForChanges();
    // Fails, but expected to succeed
    expect(console.log).nthCalledWith(3, "my-bar: 2");
  });

  it('exploration 3', async () => {
    const page = await newE2EPage();
    console.log = jest.fn();
    await page.setContent('<my-foo toggle="true"></my-foo>');
    await page.waitForChanges();
    const component = await page.find('my-foo');


    let bar = await page.find('my-foo >>> my-bar');
    bar.click();
    await page.waitForChanges();
    // Succeeds
    expect(console.log).nthCalledWith(1, "my-bar: 1");


    component.setProperty("toggle", false);
    await page.waitForChanges();
    component.setProperty("dummy", "42");
    await page.waitForChanges();
    bar = await page.find('my-foo >>> my-bar');
    bar.click();
    await page.waitForChanges();
    // Succeeds, but shouldn't be necessary to trigger a re-render which (in theory) should end up generating the same DOM
    expect(console.log).nthCalledWith(2, "my-bar: 2");
  });
});
