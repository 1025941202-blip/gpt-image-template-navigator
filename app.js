const CATEGORY_LABELS = {
  ecommerce: "电商案例",
  "ad-creative": "广告创意",
  portrait: "人像摄影",
  poster: "海报插画",
  character: "角色设计",
  ui: "UI / 社媒样机",
  comparison: "对比案例",
};

const TEMPLATES = [
  {
    id: "avatar",
    title: "头像模板",
    route: "人像摄影",
    purpose: "适合职业头像、账号门面、个人 IP 首图。优先看脸部质感、身份一致性和背景干净度。",
    categories: ["portrait"],
    keywords: ["portrait", "headshot", "identity", "beauty", "editorial", "profile", "close-up", "人像", "头像", "写真", "面部", "肖像"],
    allowCrossCategory: false,
    framework: ["人物身份", "脸部气质", "服装", "背景", "光线", "比例"],
  },
  {
    id: "lifestyle",
    title: "朋友圈生活照模板",
    route: "人像摄影 / 海报插画",
    purpose: "适合生活方式照片、旅行照、咖啡馆、街拍、校园、户外场景。重点是自然感和可信氛围。",
    categories: ["portrait", "poster"],
    keywords: ["lifestyle", "street", "cafe", "travel", "outdoor", "candid", "film", "selfie", "campus", "生活", "旅行", "咖啡", "街拍", "户外", "校园"],
    requireKeyword: true,
    framework: ["人物", "地点", "动作", "天气/时间", "拍摄设备感", "不要过度修图"],
  },
  {
    id: "xiaohongshu-cover",
    title: "小红书封面模板",
    route: "专用模板 / 海报插画 / UI",
    purpose: "GitHub 原仓库没有“小红书封面”分类；这里先给专用封面 prompt，再附少量接近的排版、卡片、标题图参考。",
    categories: ["poster", "ui", "portrait"],
    keywords: ["cover", "thumbnail", "collage", "magazine", "typography", "headline", "infographic", "card", "social", "封面", "标题", "杂志", "拼贴", "卡片", "信息图"],
    requireKeyword: true,
    featuredCaseIds: [
      "poster-193",
      "poster-22",
      "poster-36",
      "poster-38",
      "poster-37",
      "ui-5",
      "ui-27",
      "ui-82",
      "ui-57",
      "ui-79",
      "ui-101",
      "portrait-20",
      "portrait-98",
      "poster-173",
      "poster-200",
      "poster-63",
      "poster-179",
      "ui-87",
      "ui-95",
    ],
    framework: ["主题", "标题", "主视觉", "配色", "版式", "留白位置"],
  },
  {
    id: "course-poster",
    title: "课程海报模板",
    route: "海报插画 / 广告创意",
    purpose: "适合训练营、课程售卖、直播预告、公开课海报。重点是信息层级和可信专业感。",
    categories: ["poster", "ad-creative", "ui"],
    keywords: ["infographic", "education", "presentation", "course", "lesson", "guide", "board", "scientific", "课程", "教育", "公开课", "知识", "讲座"],
    requireKeyword: true,
    framework: ["课程名", "目标人群", "核心卖点", "讲师形象", "时间", "行动提示"],
  },
  {
    id: "product-main",
    title: "产品主图模板",
    route: "电商案例",
    purpose: "适合商品主图、详情页首图、产品棚拍。重点是产品清晰、材质明确、背景不抢戏。",
    categories: ["ecommerce", "ad-creative"],
    keywords: ["product", "e-commerce", "perfume", "skincare", "soda", "packaging", "main image", "studio shot", "产品", "商品", "电商", "主图", "包装"],
    allowCrossCategory: false,
    framework: ["产品名", "产品外观", "材质", "摆放位置", "背景", "促销文字"],
  },
  {
    id: "knowledge-card",
    title: "知识卡片模板",
    route: "海报插画 / UI / 对比案例",
    purpose: "适合知识图卡、科普卡片、方法论拆解、清单图。重点是结构清楚、文字区域稳定。",
    categories: ["poster", "ui", "comparison"],
    keywords: ["infographic", "card", "guide", "diagram", "knowledge", "scientific", "physics", "sheet", "信息图", "卡片", "科普", "图解", "清单"],
    requireKeyword: true,
    framework: ["主题", "3-5 个要点", "图标/图解", "标题区", "正文区", "配色"],
  },
  {
    id: "character-ip",
    title: "人物 IP 模板",
    route: "角色设计 / 人像摄影",
    purpose: "适合数字人、IP 形象、吉祥物、人设三视图。重点是角色一致性和可复用外观。",
    categories: ["character", "portrait", "poster"],
    keywords: ["character", "mascot", "toy", "pixar", "chibi", "anime", "avatar", "design sheet", "角色", "人设", "三视图", "吉祥物", "卡通"],
    requireKeyword: true,
    framework: ["角色身份", "年龄/气质", "服装", "标志物", "三视图", "表情"],
  },
  {
    id: "story-scene",
    title: "故事场景模板",
    route: "海报插画 / 对比案例 / 人像摄影",
    purpose: "适合故事分镜、短视频画面、品牌世界观、场景概念图。重点是画面顺序和情绪推进。",
    categories: ["poster", "comparison", "portrait", "ecommerce"],
    keywords: ["storyboard", "cinematic", "trailer", "scene", "9-frame", "sequence", "story", "diorama", "narrative", "分镜", "场景", "电影", "故事"],
    requireKeyword: true,
    framework: ["主角", "地点", "冲突/动作", "镜头数量", "情绪", "结尾画面"],
  },
  {
    id: "premium-ad",
    title: "高级广告图模板",
    route: "广告创意 / 电商案例 / 海报插画",
    purpose: "适合品牌广告、产品 Campaign、招商视觉、课程高级感海报。重点是商业摄影语言。",
    categories: ["ad-creative", "ecommerce", "poster"],
    keywords: ["luxury", "ad", "campaign", "commercial", "brand", "hero", "premium", "advertisement", "高级", "广告", "品牌", "奢华", "商业"],
    requireKeyword: true,
    framework: ["品牌/产品", "广告主张", "高级材质", "光线", "场景", "文案"],
  },
  {
    id: "comparison",
    title: "对比图模板",
    route: "对比案例",
    purpose: "适合前后对比、多方案比较、风格对照、教学拆解。重点是左右结构和比较维度清楚。",
    categories: ["comparison"],
    keywords: ["comparison", "before", "after", "vs", "grid", "style", "对比", "前后", "比较", "网格"],
    allowCrossCategory: false,
    framework: ["对比对象 A", "对比对象 B", "比较维度", "布局", "标签", "结论"],
  },
];

const SPECIAL_PROMPTS = {
  "xiaohongshu-cover": [
    {
      title: "干货知识卡片封面",
      source: "专用自建模板：知识卡片封面",
      imageUrl: "./assets/xhs-covers/knowledge-card.png",
      prompt: `生成一张小红书笔记封面，竖版 3:4，主题是「{主题}」。画面要像真实小红书爆款干货封面：大标题清晰醒目，副标题简短，主体信息一眼能懂。\n\n版式要求：上方 18% 放账号/栏目小字，中间 45% 放超大中文标题「{主标题}」，下方放 3 个信息点卡片。背景使用柔和浅色，加入少量贴纸、箭头、荧光笔划线和圆角卡片，但不要杂乱。\n\n文字要求：中文准确，标题不超过 12 个字，副标题不超过 18 个字。整体风格干净、可信、有收藏感，适合知识分享、AI 教程、职场干货。\n\n不要水印，不要真实平台 UI，不要二维码，不要过度复杂。`,
    },
    {
      title: "个人 IP 课程封面",
      source: "专用自建模板：课程/直播封面",
      imageUrl: "./assets/xhs-covers/course-poster.png",
      prompt: `为小红书生成一张个人 IP 课程封面，竖版 3:4。主题是「{课程主题}」，目标人群是「{目标人群}」。\n\n画面结构：左侧或下方保留讲师半身形象/虚拟讲师形象，右侧或上方放大标题「{课程标题}」。加入 3 个卖点标签：{卖点1}、{卖点2}、{卖点3}。视觉要像高质量知识博主封面，不要像传统招生广告。\n\n设计风格：清爽专业、轻商业感、强标题层级、适合手机信息流快速识别。配色使用白色底 + 一个主色 + 一个强调色。\n\n中文文字必须清晰准确，避免密集小字，不要二维码，不要联系方式。`,
    },
    {
      title: "产品种草封面",
      source: "专用自建模板：产品种草封面",
      imageUrl: "./assets/xhs-covers/product-seeding.png",
      prompt: `生成一张小红书产品种草封面，竖版 3:4。产品是「{产品名称}」，核心卖点是「{核心卖点}」。\n\n画面要求：产品放在画面中央偏下，占画面 35%-45%；顶部放大标题「{吸引点击的标题}」；旁边用 3 个小标签突出卖点。背景要有生活方式场景，但不能抢产品主体。\n\n风格：真实、明亮、干净、有轻微杂志感和小红书种草感。适合美妆、课程、工具、数码、家居产品。\n\n不要出现虚假品牌 logo，不要真实平台界面，不要水印。`,
    },
    {
      title: "对比冲突封面",
      source: "专用自建模板：前后对比封面",
      imageUrl: "./assets/xhs-covers/comparison-cover.png",
      prompt: `生成一张小红书对比型封面，竖版 3:4。主题是「{主题}」。画面分成左右两栏，左边是「{错误做法/过去状态}」，右边是「{正确做法/理想状态}」。\n\n中间用醒目的 VS 或箭头连接，顶部放标题「{主标题}」。左右两边都要有清楚的视觉差异，可以用颜色、表情、场景、图标或简短标签表达对比。\n\n风格：信息清楚、冲突强、适合教程、避坑、前后变化、案例拆解。中文文字准确，不要超过 5 处文字元素。`,
    },
    {
      title: "情绪生活方式封面",
      source: "专用自建模板：生活方式/Plog 封面",
      imageUrl: "./assets/xhs-covers/lifestyle-cover.png",
      prompt: `生成一张小红书生活方式封面，竖版 3:4。主题是「{生活主题}」，情绪关键词是「{情绪关键词}」。\n\n画面像一张精心设计的生活方式笔记首图：真实照片感或轻胶片感，主体人物/物品清晰，画面有自然留白。标题「{标题}」放在不遮挡主体的位置，用简洁中文字体。\n\n加入少量手写标注、日期、小贴纸或胶带元素，让画面有个人记录感，但不要变成复杂拼贴。适合旅行、穿搭、咖啡、读书、日常成长类内容。`,
    },
    {
      title: "爆款清单封面",
      source: "专用自建模板：清单型封面",
      imageUrl: "./assets/xhs-covers/list-cover.png",
      prompt: `生成一张小红书清单型封面，竖版 3:4。主题是「{清单主题}」。\n\n版式：大标题「{主标题}」占画面上半部分，下面用 5 个编号小卡片列出关键词：{关键词1}、{关键词2}、{关键词3}、{关键词4}、{关键词5}。整体像高收藏率的知识清单封面。\n\n视觉风格：圆角卡片、轻柔配色、清楚网格、重点数字放大、适量图标点缀。中文文字准确，适合 AI 教程、职场、学习方法、工具推荐。`,
    },
  ],
};

const state = {
  activeTemplateId: TEMPLATES[0].id,
  query: "",
  visible: 18,
};

const cases = Array.isArray(window.PROMPT_CASES) ? window.PROMPT_CASES : [];
const sourceMeta = window.PROMPT_SOURCE_META || {};

const els = {
  templateList: document.querySelector("#templateList"),
  templateRoute: document.querySelector("#templateRoute"),
  templateTitle: document.querySelector("#templateTitle"),
  templatePurpose: document.querySelector("#templatePurpose"),
  searchInput: document.querySelector("#searchInput"),
  copyFrameworkButton: document.querySelector("#copyFrameworkButton"),
  resultCount: document.querySelector("#resultCount"),
  dataCount: document.querySelector("#dataCount"),
  caseGrid: document.querySelector("#caseGrid"),
  loadMoreButton: document.querySelector("#loadMoreButton"),
  toast: document.querySelector("#toast"),
};

function normalize(value) {
  return String(value || "").toLowerCase();
}

function caseHaystack(item) {
  return normalize(`${item.title} ${item.categoryLabel} ${item.author} ${item.prompt}`);
}

function keywordHaystack(item) {
  return normalize(`${item.title} ${item.author} ${item.prompt}`);
}

function scoreCase(item, template) {
  let score = 0;
  const haystack = keywordHaystack(item);
  const categoryHit = template.categories.includes(item.category);
  let keywordHits = 0;

  if (categoryHit) {
    score += 20;
  }

  template.keywords.forEach((keyword) => {
    if (haystack.includes(normalize(keyword))) {
      keywordHits += 1;
      score += 5;
    }
  });

  if (!categoryHit && template.allowCrossCategory === false) {
    return 0;
  }

  if (template.requireKeyword && keywordHits === 0) {
    return 0;
  }

  if (!categoryHit && keywordHits < 2) {
    return 0;
  }

  if (item.prompt.includes("{argument")) {
    score += 2;
  }

  return score;
}

function getTemplate() {
  return TEMPLATES.find((item) => item.id === state.activeTemplateId) || TEMPLATES[0];
}

function getMatches(template) {
  const query = normalize(state.query.trim());

  if (template.featuredCaseIds?.length) {
    const rank = new Map(template.featuredCaseIds.map((id, index) => [id, index]));
    return cases
      .filter((item) => rank.has(item.id))
      .filter((item) => !query || caseHaystack(item).includes(query))
      .sort((a, b) => rank.get(a.id) - rank.get(b.id));
  }

  return cases
    .map((item) => ({ item, score: scoreCase(item, template) }))
    .filter(({ item, score }) => {
      if (score <= 0) return false;
      if (!query) return true;
      return caseHaystack(item).includes(query);
    })
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "zh-CN"))
    .map(({ item }) => item);
}

function extractVariables(prompt) {
  const variables = [];
  const seen = new Set();
  const pattern = /\{argument\s+name="([^"]+)"(?:\s+default="([^"]*)")?[^}]*\}/g;
  let match;

  while ((match = pattern.exec(prompt)) && variables.length < 4) {
    const label = match[2] || match[1];
    if (!seen.has(label)) {
      seen.add(label);
      variables.push(label);
    }
  }

  return variables;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderTemplateTabs() {
  els.templateList.innerHTML = TEMPLATES.map((template, index) => {
    const count = getMatches(template).length;
    const active = template.id === state.activeTemplateId ? " is-active" : "";
    return `
      <button class="template-tab${active}" type="button" data-template-id="${template.id}">
        <span class="tab-index">${index + 1}</span>
        <span>
          <span class="tab-title">${escapeHtml(template.title)}</span>
          <span class="tab-route">${escapeHtml(template.route)}</span>
        </span>
        <span class="tab-count">${count}</span>
      </button>
    `;
  }).join("");
}

function renderHeader(template, matches) {
  els.templateRoute.textContent = `去看：${template.route}`;
  els.templateTitle.textContent = template.title;
  els.templatePurpose.textContent = template.purpose;
  els.resultCount.textContent = `当前匹配 ${matches.length} 个 GitHub 案例，已显示 ${Math.min(state.visible, matches.length)} 个`;
  els.dataCount.textContent = `本地数据：${sourceMeta.total || cases.length} 个提示词案例`;
}

function renderCards(matches) {
  const visibleItems = matches.slice(0, state.visible);
  const specialCards = SPECIAL_PROMPTS[state.activeTemplateId] || [];

  if (!visibleItems.length && !specialCards.length) {
    els.caseGrid.innerHTML = `<div class="empty-state">没有匹配案例。换个关键词，或者切到相邻模板看看。</div>`;
    els.loadMoreButton.classList.add("is-hidden");
    return;
  }

  const specialHtml = specialCards.map((item, index) => `
    <article class="case-card special-card" data-special-index="${index}">
      <div class="image-wrap special-image">
        <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}" loading="lazy" />
        <span class="case-tag">专用模板</span>
      </div>
      <div class="case-body">
        <h3 class="case-title">${escapeHtml(item.title)}</h3>
        <div class="case-meta">
          <span>${escapeHtml(item.source)}</span>
        </div>
        <pre class="prompt-box">${escapeHtml(item.prompt)}</pre>
        <div class="card-actions">
          <button class="copy-button" type="button" data-copy-special="${index}">复制提示词</button>
          <button class="expand-button" type="button" data-expand-special="${index}">展开</button>
        </div>
      </div>
    </article>
  `).join("");

  const caseHtml = visibleItems.map((item) => {
    const variables = extractVariables(item.prompt);
    const variableHtml = variables.length
      ? `<div class="variable-row">${variables.map((v) => `<span class="variable-chip">${escapeHtml(v)}</span>`).join("")}</div>`
      : "";
    const author = item.author ? `<span>${escapeHtml(item.author)}</span>` : "";
    const sourceLink = item.sourceUrl
      ? `<a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer">原始来源</a>`
      : `<a href="${escapeHtml(item.githubFile)}" target="_blank" rel="noreferrer">GitHub 文件</a>`;

    return `
      <article class="case-card" data-case-id="${escapeHtml(item.id)}">
        <div class="image-wrap">
          <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}" loading="lazy" />
          <span class="case-tag">${escapeHtml(item.categoryLabel)}</span>
        </div>
        <div class="case-body">
          <h3 class="case-title">${escapeHtml(item.title)}</h3>
          <div class="case-meta">
            <span>Case ${escapeHtml(item.caseNo || "-")}</span>
            ${author}
            ${sourceLink}
          </div>
          ${variableHtml}
          <pre class="prompt-box">${escapeHtml(item.prompt)}</pre>
          <div class="card-actions">
            <button class="copy-button" type="button" data-copy-id="${escapeHtml(item.id)}">复制提示词</button>
            <button class="expand-button" type="button" data-expand-id="${escapeHtml(item.id)}">展开</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  els.caseGrid.innerHTML = specialHtml + caseHtml;

  els.loadMoreButton.classList.toggle("is-hidden", matches.length <= state.visible);
}

function render() {
  const template = getTemplate();
  const matches = getMatches(template);
  renderTemplateTabs();
  renderHeader(template, matches);
  renderCards(matches);
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  showToast(successMessage);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    els.toast.classList.remove("is-visible");
  }, 1700);
}

function frameworkText(template) {
  return [
    `${template.title}改写框架`,
    "",
    ...template.framework.map((item) => `${item}：`),
    "",
    "改写要求：",
    "1. 先保留原 prompt 的构图和风格。",
    "2. 第一版只替换上面的变量。",
    "3. 第二版加入自己的产品、账号或课程信息。",
    "4. 第三版删掉不需要的复杂细节，做成稳定模板。",
  ].join("\n");
}

els.templateList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-template-id]");
  if (!button) return;

  state.activeTemplateId = button.dataset.templateId;
  state.visible = 18;
  render();
});

els.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  state.visible = 18;
  render();
});

els.copyFrameworkButton.addEventListener("click", () => {
  copyText(frameworkText(getTemplate()), "已复制改写框架");
});

els.caseGrid.addEventListener("click", (event) => {
  const copyButton = event.target.closest("[data-copy-id]");
  if (copyButton) {
    const item = cases.find((entry) => entry.id === copyButton.dataset.copyId);
    if (item) copyText(item.prompt, "已复制提示词");
    return;
  }

  const specialCopyButton = event.target.closest("[data-copy-special]");
  if (specialCopyButton) {
    const item = (SPECIAL_PROMPTS[state.activeTemplateId] || [])[Number(specialCopyButton.dataset.copySpecial)];
    if (item) copyText(item.prompt, "已复制专用模板");
    return;
  }

  const expandButton = event.target.closest("[data-expand-id]");
  if (expandButton) {
    const card = expandButton.closest(".case-card");
    card.classList.toggle("is-expanded");
    expandButton.textContent = card.classList.contains("is-expanded") ? "收起" : "展开";
  }

  const specialExpandButton = event.target.closest("[data-expand-special]");
  if (specialExpandButton) {
    const card = specialExpandButton.closest(".case-card");
    card.classList.toggle("is-expanded");
    specialExpandButton.textContent = card.classList.contains("is-expanded") ? "收起" : "展开";
  }
});

els.loadMoreButton.addEventListener("click", () => {
  state.visible += 18;
  render();
});

render();
