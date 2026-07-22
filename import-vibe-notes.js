/**
 * 自动向 Notion 导入 Vibe Coding 中文指南学习重点
 * 运行方式: node import-vibe-notes.js
 */

const { createPageInDatabase, appendPageContent } = require("./notion-helper");

// 配置您已授权的数据库 ID
const DATABASE_ID = "3d606c771369833db2ee013000f12fe2"; 

// 标题属性名称
const TITLE_KEY = "名称";

const pageTitle = "Vibe Coding 中文指南 - 学习重点";

// 构建符合 Notion Block API 格式的总结内容
const summaryBlocks = [
  {
    object: "block",
    type: "heading_1",
    heading_1: {
      rich_text: [{ text: { content: "☯️ Vibe Coding 核心方法论总结" } }]
    }
  },
  {
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          text: {
            content: "本篇笔记汇总自 tradecatlabs/vibe-coding-cn (develop 分支)，是面向从想法到产品的 AI 结对编程工作流标准。"
          }
        }
      ]
    }
  },
  {
    object: "block",
    type: "heading_2",
    heading_2: {
      rich_text: [{ text: { content: "🧠 一、五条核心命题 (底层认知)" } }]
    }
  },
  {
    object: "block",
    type: "quote",
    quote: {
      rich_text: [{ text: { content: "1. 终极目标：首先解决人工智能问题，然后再用人工智能解决其他所有问题。 —— Demis Hassabis" } }]
    }
  },
  {
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        { text: { content: "生成物可达，能力可达：", annotations: { bold: true } } },
        { text: { content: "凡是能被文本稳定表达（自然语言、代码、配置、schema、测试），并能被程序或工具解释、执行和验证的，都属于大模型的直接能力边界。" } }
      ]
    }
  },
  {
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        { text: { content: "模型吞噬规律：", annotations: { bold: true } } },
        { text: { content: "今天看似重要的 Prompt 技巧、外挂记忆、工具封装，本质上只是模型能力不足时的中间层工程补丁。未来更强的模型会原生吞噬这些层。" } }
      ]
    }
  },
  {
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        { text: { content: "隔离审查原则：", annotations: { bold: true } } },
        { text: { content: "AI 结果只是候选解。必须把“生成”、“审查”和“验证”拆开。重要产出须在新开的隔离会话中审查，不允许 AI 盲目沿用旧上下文的结论。" } }
      ]
    }
  },
  {
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        { text: { content: "能力编排 (拼好码)：", annotations: { bold: true } } },
        { text: { content: "AI 编程的高阶形态是反向搜索已有成熟工具链，做契约式组装，而非从零手写所有代码。即“能复用时不重造，能编排时不发明”。" } }
      ]
    }
  },
  {
    object: "block",
    type: "heading_2",
    heading_2: {
      rich_text: [{ text: { content: "⚡ 二、Vibe Coding 五层工作流体系" } }]
    }
  },
  {
    object: "block",
    type: "numbered_list_item",
    numbered_list_item: {
      rich_text: [
        { text: { content: "Prompt (指令层)：", annotations: { bold: true } } },
        { text: { content: "一次性指令，用来解决单词对话层面的具体表达和交互。" } }
      ]
    }
  },
  {
    object: "block",
    type: "numbered_list_item",
    numbered_list_item: {
      rich_text: [
        { text: { content: "Skill (可复用能力)：", annotations: { bold: true } } },
        { text: { content: "把高频的、需要稳定重复执行的 AI 交互序列、脚本和工具，固化沉淀为 Skill 资产文件（如 SKILL.md）。" } }
      ]
    }
  },
  {
    object: "block",
    type: "numbered_list_item",
    numbered_list_item: {
      rich_text: [
        { text: { content: "Context (可持续上下文)：", annotations: { bold: true } } },
        { text: { content: "在长效协作中，维护关键的状态记录和背景信息，防范由于对话长度爆栈而产生的信息丢失。" } }
      ]
    }
  },
  {
    object: "block",
    type: "numbered_list_item",
    numbered_list_item: {
      rich_text: [
        { text: { content: "Quality Gate (质量门禁)：", annotations: { bold: true } } },
        { text: { content: "用测试、CI、类型检查 (Typescript/Go Type)、Linter 和 Schema 校验等构建拦截错误的物理门禁，杜绝 AI 出现幻觉或产生不可控的代码崩塌。" } }
      ]
    }
  },
  {
    object: "block",
    type: "numbered_list_item",
    numbered_list_item: {
      rich_text: [
        { text: { content: "工程闭环：", annotations: { bold: true } } },
        { text: { content: "从明确需求、任务拆解，到小步快跑提交测试、独立验证，最后到沉淀复盘，形成完整的工程全生命周期闭环。" } }
      ]
    }
  },
  {
    object: "block",
    type: "heading_2",
    heading_2: {
      rich_text: [{ text: { content: "☯️ 三、道法术器实践框架" } }]
    }
  },
  {
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        { text: { content: "道：", annotations: { bold: true } } },
        { text: { content: "人机协作关系认知。明确“人是 Master，AI 是 Padawan”。掌控主导权，注重决策和验证而非打字。" } }
      ]
    }
  },
  {
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        { text: { content: "法：", annotations: { bold: true } } },
        { text: { content: "工作方法。Perceive (感知) -> Reason (计划) -> Act (执行) -> Refine (重构) 的微迭代环。" } }
      ]
    }
  },
  {
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        { text: { content: "术：", annotations: { bold: true } } },
        { text: { content: "实操技巧。如微测试驱动、渐进式代码审查、以及上下文压缩与垃圾回收。" } }
      ]
    }
  },
  {
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        { text: { content: "器：", annotations: { bold: true } } },
        { text: { content: "工具落地方案。如 CLI 助手、Mcp Server 扩展、脚本与代码脚手架。" } }
      ]
    }
  },
  {
    object: "block",
    type: "callout",
    callout: {
      rich_text: [
        {
          text: {
            content: "核心格言：能复用时不重造，能编排时不发明；把 AI 产出视为候选解，用测试和强类型门禁为质量保驾护航。"
          }
        }
      ],
      icon: {
        type: "emoji",
        emoji: "💡"
      }
    }
  }
];

async function main() {
  console.log("正在为您将 Vibe Coding 的学习重点总结同步到 Notion 数据库...");
  try {
    // 动态修正 blocks 中 rich_text 对象的 annotations 嵌套位置
    const cleanedBlocks = summaryBlocks.map(block => {
      const blockType = block.type;
      if (block[blockType] && block[blockType].rich_text) {
        block[blockType].rich_text = block[blockType].rich_text.map(rt => {
          if (rt.text && rt.text.annotations) {
            const { annotations, ...restText } = rt.text;
            return {
              ...rt,
              text: restText,
              annotations
            };
          }
          return rt;
        });
      }
      return block;
    });

    // 1. 创建页面
    const newPage = await createPageInDatabase(DATABASE_ID, pageTitle, {}, TITLE_KEY);
    console.log(`✅ Notion 页面创建成功！ID: ${newPage.id}`);

    // 2. 写入大纲和正文
    console.log("正在追加正文内容中...");
    await appendPageContent(newPage.id, cleanedBlocks);
    console.log("🎉 成功将总结导入到您的 Notion 笔记！");
    console.log(`🔗 页面链接: ${newPage.url}`);
  } catch (error) {
    console.error("❌ 同步到 Notion 失败:", error);
  }
}

main();
