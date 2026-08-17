import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", ["粤语鲜活学堂", "一步一步说到自然", "即时粤语", "YOUR ROUTE / 学习顺序", "复习中心"]],
  ["/course", ["情景课程", "茶餐厅生存课", "16", "听懂弦外之音"]],
  ["/course/cha-chaan-teng", ["茶餐厅生存课", "唔該，我要個菠蘿包。", "查看全部音色", "完整对话", "先听整体", "对方", "进入到下一场景", "交通与方向"]],
  ["/course/workplace-subtext", ["职场弦外之音", "完整对话", "词汇与发音", "进阶挑战", "进入到下一场景", "选择下一场景"]],
  ["/audio", ["听力实验室", "六声调", "声音地图", "先听 → 选择 → 看粤拼 → 重听"]],
  ["/bridge", ["普通话转换桥", "自然粤语", "邊度", "读法顺序"]],
  ["/practice", ["立即反应", "自然粤语怎么说", "普通话迁移", "主动回忆"]],
  ["/review", ["复习中心", "现在该复习什么", "三种复习动作", "主动回忆", "听力辨认", "场景回放", "待复习", "显示粤语答案"]],
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

test("retired /today route is removed", async () => {
  const response = await render("/today");
  assert.equal(response.status, 404);
});
