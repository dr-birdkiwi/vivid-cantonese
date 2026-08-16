import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", ["粤语鲜活学堂", "我而家冇時間。", "普通话词库"]],
  ["/course", ["情景课程", "茶餐厅生存课", "16", "听懂弦外之音"]],
  ["/course/cha-chaan-teng", ["茶餐厅生存课", "唔該，我要個菠蘿包。", "试听粤语"]],
  ["/course/workplace-subtext", ["职场弦外之音", "词汇与发音", "进阶挑战"]],
  ["/bridge", ["普通话转换桥", "自然粤语", "邊度", "读法顺序"]],
  ["/practice", ["立即反应", "自然粤语怎么说", "你想飲咩"]],
  ["/review", ["复习中心", "今日词条", "今日完成度"]],
];

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

for (const [path, markers] of routes) {
  test(`server-renders ${path}`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.doesNotMatch(html, /Your site is taking shape|Building your site|codex-preview/i);
    for (const marker of markers) assert.match(html, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  });
}
