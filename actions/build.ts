import { minify } from "npm:html-minifier";
import { copy } from "jsr:@std/fs/copy";

const ouputDir = Deno.args[0] ?? "dist";

await Deno.mkdir(ouputDir).catch(async () => {
  await Deno.remove(ouputDir, { recursive: true });
  await Deno.mkdir(ouputDir);
});

const p = copy("src", ouputDir, { overwrite: true });
const raw = await Deno.readTextFile("src/index.html");
const output = minify(raw, {
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true,
  useShortDoctype: true,
});
await p;
Deno.writeTextFile(ouputDir + "/index.html", output);
