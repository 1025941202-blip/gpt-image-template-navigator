#!/usr/bin/env python3
"""Build static prompt-case data from the EvoLinkAI GitHub repository."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "cases.js"
RAW_BASE = "https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-API-and-Prompts/main"

CATEGORIES = {
    "ecommerce": "电商案例",
    "ad-creative": "广告创意",
    "portrait": "人像摄影",
    "poster": "海报插画",
    "character": "角色设计",
    "ui": "UI / 社媒样机",
    "comparison": "对比案例",
}

PROMPT_RE = re.compile(
    r"\*\*(?:提示词[:：]?|Prompt[:：]?)\*\*\s*```\s*([\s\S]*?)```",
    re.IGNORECASE,
)


def fetch_text(url: str) -> str:
    req = Request(url, headers={"User-Agent": "codex-prompt-navigator"})
    with urlopen(req, timeout=30) as response:
        return response.read().decode("utf-8")


def strip_markdown(value: str) -> str:
    value = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", value)
    value = re.sub(r"<[^>]+>", "", value)
    return re.sub(r"\s+", " ", value).strip()


def parse_heading(heading: str) -> tuple[str, str, str, str]:
    case_match = re.search(r"^###\s+Case\s+([^:]+):\s+(.+)$", heading)
    case_no = case_match.group(1).strip() if case_match else ""
    rest = case_match.group(2).strip() if case_match else heading.replace("###", "").strip()

    title_match = re.search(r"\[([^\]]+)\]\(([^)]+)\)", rest)
    title = title_match.group(1).strip() if title_match else strip_markdown(rest)
    source_url = title_match.group(2).strip() if title_match else ""

    author_match = re.search(r"\(by\s+(.+?)\)\s*$", rest)
    author = strip_markdown(author_match.group(1)) if author_match else ""
    return case_no, title, source_url, author


def fallback_prompt(block: str) -> str:
    fence = re.search(r"```\s*([\s\S]*?)```", block)
    if fence:
        return fence.group(1).strip()
    return ""


def parse_category(slug: str, markdown: str) -> list[dict]:
    blocks = re.split(r"(?=^###\s+Case\s+)", markdown, flags=re.MULTILINE)[1:]
    cases: list[dict] = []

    for index, block in enumerate(blocks, start=1):
        lines = block.splitlines()
        heading = lines[0].strip() if lines else ""
        case_no, title, source_url, author = parse_heading(heading)

        image_match = re.search(r'<img[^>]+src="([^"]+)"', block)
        image_url = image_match.group(1).strip() if image_match else ""
        if image_url.startswith("../"):
            image_url = f"{RAW_BASE}/{image_url[3:]}"
        elif image_url.startswith("./"):
            image_url = f"{RAW_BASE}/cases/{image_url[2:]}"
        elif image_url and not image_url.startswith(("http://", "https://")):
            image_url = f"{RAW_BASE}/{image_url}"

        prompt_match = PROMPT_RE.search(block)
        prompt = prompt_match.group(1).strip() if prompt_match else fallback_prompt(block)

        if not title or not image_url or not prompt:
            continue

        cases.append(
            {
                "id": f"{slug}-{index}",
                "caseNo": case_no,
                "title": title,
                "category": slug,
                "categoryLabel": CATEGORIES[slug],
                "sourceUrl": source_url,
                "author": author,
                "imageUrl": image_url,
                "prompt": prompt,
                "githubFile": f"{RAW_BASE}/cases/{slug}_zh-CN.md",
            }
        )

    return cases


def main() -> int:
    all_cases: list[dict] = []
    counts: dict[str, int] = {}

    for slug in CATEGORIES:
        url = f"{RAW_BASE}/cases/{slug}_zh-CN.md"
        markdown = fetch_text(url)
        parsed = parse_category(slug, markdown)
        all_cases.extend(parsed)
        counts[slug] = len(parsed)

    payload = {
        "repo": "EvoLinkAI/awesome-gpt-image-2-API-and-Prompts",
        "repoUrl": "https://github.com/EvoLinkAI/awesome-gpt-image-2-API-and-Prompts",
        "rawBase": RAW_BASE,
        "counts": counts,
        "total": len(all_cases),
    }

    js = (
        "window.PROMPT_SOURCE_META = "
        + json.dumps(payload, ensure_ascii=False, indent=2)
        + ";\n"
        + "window.PROMPT_CASES = "
        + json.dumps(all_cases, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUT.write_text(js, encoding="utf-8")
    print(f"Wrote {OUT} with {len(all_cases)} cases")
    print(json.dumps(counts, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
