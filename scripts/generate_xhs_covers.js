const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "assets", "xhs-covers");

const covers = [
  {
    file: "knowledge-card.png",
    label: "AI 干货",
    title: "6步做出\n高质感封面",
    subtitle: "适合教程 / 方法论 / 知识卡片",
    points: ["选题清楚", "标题够大", "结构像卡片"],
    theme: "mint",
  },
  {
    file: "course-poster.png",
    label: "个人 IP",
    title: "AI课\n从0到1",
    subtitle: "3天搭好你的图文生产流",
    points: ["工具路径", "案例练习", "模板沉淀"],
    theme: "blue",
  },
  {
    file: "product-seeding.png",
    label: "产品种草",
    title: "这个工具\n太省时间了",
    subtitle: "适合课程 / 工具 / 数码 / 美妆",
    points: ["真实场景", "卖点标签", "产品居中"],
    theme: "peach",
  },
  {
    file: "comparison-cover.png",
    label: "避坑对比",
    title: "普通封面\nVS 爆款封面",
    subtitle: "一眼看懂差在哪",
    points: ["左弱右强", "冲突明确", "结论明显"],
    theme: "lime",
  },
  {
    file: "lifestyle-cover.png",
    label: "Plog 日常",
    title: "松弛感\n生活记录",
    subtitle: "旅行 / 咖啡 / 读书 / 穿搭",
    points: ["自然留白", "轻胶片", "手写标注"],
    theme: "rose",
  },
  {
    file: "list-cover.png",
    label: "收藏清单",
    title: "新手必存\n10个模板",
    subtitle: "打开就能照着改",
    points: ["编号清单", "重点放大", "适合收藏"],
    theme: "gold",
  },
];

const themeMap = {
  mint: ["#dff3df", "#fff8e8", "#1f6b55", "#f2c54f"],
  blue: ["#dfeeff", "#f7fbff", "#275b8f", "#f0b44c"],
  peach: ["#ffe6d8", "#fffaf3", "#be5b42", "#6a8d57"],
  lime: ["#edf7c8", "#fffdf2", "#2f7259", "#e16a4f"],
  rose: ["#ffe4ea", "#fff7f9", "#8f3e62", "#d79a42"],
  gold: ["#fff0bf", "#fffaf0", "#8a611f", "#23624d"],
};

function coverHtml(cover) {
  const [bg, paper, primary, accent] = themeMap[cover.theme];
  return `
    <article class="cover" style="--bg:${bg};--paper:${paper};--primary:${primary};--accent:${accent}">
      <div class="sticker">${cover.label}</div>
      <div class="spark one"></div>
      <div class="spark two"></div>
      <div class="title">${cover.title.replace(/\n/g, "<br>")}</div>
      <div class="subtitle">${cover.subtitle}</div>
      <div class="point-grid">
        ${cover.points.map((point, index) => `<span><b>${index + 1}</b>${point}</span>`).join("")}
      </div>
      <div class="footer">小红书封面模板</div>
    </article>
  `;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  function htmlFor(cover) {
    return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body {
            margin: 0;
            background: #f4f4ee;
            font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
          }
          .stage {
            width: 360px;
            height: 480px;
          }
          .cover {
            position: relative;
            width: 360px;
            height: 480px;
            overflow: hidden;
            padding: 24px 24px 20px;
            color: #172019;
            background:
              linear-gradient(135deg, color-mix(in srgb, var(--bg), #fff 15%), var(--paper)),
              var(--paper);
            border: 1px solid rgba(28, 43, 30, 0.12);
            border-radius: 24px;
          }
          .cover::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
              linear-gradient(90deg, rgba(255,255,255,0.42) 1px, transparent 1px),
              linear-gradient(180deg, rgba(255,255,255,0.42) 1px, transparent 1px);
            background-size: 28px 28px;
            opacity: 0.7;
          }
          .cover::after {
            content: "";
            position: absolute;
            right: -86px;
            bottom: -86px;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            background: var(--accent);
            opacity: 0.22;
          }
          .sticker,
          .title,
          .subtitle,
          .point-grid,
          .footer,
          .spark {
            position: relative;
            z-index: 1;
          }
          .sticker {
            display: inline-block;
            padding: 8px 12px;
            color: white;
            background: var(--primary);
            border-radius: 999px;
            font-size: 17px;
            font-weight: 900;
          }
          .title {
            margin-top: 36px;
            color: #111611;
            font-size: 49px;
            font-weight: 1000;
            line-height: 1.02;
            letter-spacing: 0;
          }
          .title::after {
            content: "";
            display: block;
            width: 156px;
            height: 16px;
            margin-top: -8px;
            background: var(--accent);
            opacity: 0.62;
            border-radius: 999px;
          }
          .subtitle {
            max-width: 280px;
            margin-top: 18px;
            color: color-mix(in srgb, var(--primary), #222 22%);
            font-size: 19px;
            font-weight: 800;
            line-height: 1.35;
          }
          .point-grid {
            display: grid;
            gap: 8px;
            margin-top: 20px;
          }
          .point-grid span {
            display: flex;
            align-items: center;
            gap: 10px;
            min-height: 38px;
            padding: 7px 11px;
            background: rgba(255, 255, 255, 0.7);
            border: 1px solid rgba(28, 43, 30, 0.1);
            border-radius: 12px;
            font-size: 17px;
            font-weight: 900;
          }
          .point-grid b {
            display: grid;
            place-items: center;
            flex: 0 0 28px;
            width: 28px;
            height: 28px;
            color: white;
            background: var(--primary);
            border-radius: 50%;
            font-size: 16px;
          }
          .footer {
            position: absolute;
            left: 24px;
            bottom: 14px;
            color: rgba(28, 43, 30, 0.5);
            font-size: 14px;
            font-weight: 900;
          }
          .spark {
            position: absolute;
            border-radius: 20px;
            background: var(--accent);
            transform: rotate(-8deg);
            opacity: 0.88;
          }
          .spark.one {
            top: 82px;
            right: 34px;
            width: 72px;
            height: 24px;
          }
          .spark.two {
            top: 118px;
            right: 86px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            opacity: 0.55;
          }
        </style>
      </head>
      <body>
        <main class="stage">
          ${coverHtml(cover)}
        </main>
      </body>
    </html>
  `;
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 360, height: 480 }, deviceScaleFactor: 2 });

  for (const cover of covers) {
    await page.setContent(htmlFor(cover), { waitUntil: "domcontentloaded" });
    await page.evaluateHandle("document.fonts.ready");
    await page.screenshot({ path: path.join(OUT_DIR, cover.file), clip: { x: 0, y: 0, width: 360, height: 480 } });
  }

  await browser.close();
  console.log(`Wrote ${covers.length} cover images to ${OUT_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
