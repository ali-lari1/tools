// "before" is the Wayback copy closest to the date given (YYYYMMDD); "after" is the
// live page fetched now. Keeps the visible text, one line per block.
// Weekly, "before" is last week's saved after-file instead.
// Usage: node fetch.mjs 20261010
import { readFileSync, writeFileSync } from "node:fs";
const [before] = process.argv.slice(2);
const pages = readFileSync("pages.txt", "utf8").split("\n").filter(Boolean);
const text = (html) => html
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>|<svg[\s\S]*?<\/svg>/gi, "")
  .replace(/<\/(p|div|li|h\d|tr|td|th|section|button|a|span)>/gi, "$&\n")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter((l) => l.length > 1)
  .filter((l, i, a) => l !== a[i - 1]).join("\n");
const log = [];
for (const page of pages) {
  const slug = page.split("/")[0].replace(/\W+/g, "-");
  const live = await fetch(`https://${page}`, { headers: { "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36" } });
  writeFileSync(`snapshots/${slug}-after.txt`, `# ${page} live ${new Date().toISOString()} HTTP ${live.status}\n` + text(await live.text()) + "\n");
  log.push(`${page} after: live HTTP ${live.status}`);
  for (const [tag, ts] of [["before", before]]) {
    const avail = await (await fetch(`https://archive.org/wayback/available?url=${page}&timestamp=${ts}`)).json();
    const snap = avail?.archived_snapshots?.closest;
    if (!snap?.available) { log.push(`${page} ${tag}: no snapshot`); continue; }
    const raw = snap.url.replace(/\/web\/(\d+)\//, "/web/$1id_/");
    const html = await (await fetch(raw)).text();
    writeFileSync(`snapshots/${slug}-${tag}.txt`, `# ${page} archived ${snap.timestamp}\n# ${snap.url}\n` + text(html) + "\n");
    log.push(`${page} ${tag}: ${snap.timestamp} ${snap.url}`);
  }
}
writeFileSync("snapshots/INDEX.txt", log.join("\n") + "\n");
console.log(log.join("\n"));
