/**
 * Notion 接口操作测试/示例脚本
 * 运行方式: node notion-test.js
 */

const {
  queryDatabase,
  getPage,
  getPageContent,
  createPageInDatabase,
  updatePageProperties,
  appendPageContent
} = require("./notion-helper");

// ==========================================
// 💡 在运行前，请先替换以下 ID
// ==========================================
const DATABASE_ID = "3d606c771369833db2ee013000f12fe2"; 
const PAGE_ID = "3a506c771369807681c8d2a4e296dfa7";      

async function runTests() {
  console.log("🚀 开始 Notion API 测试...\n");

  // 1. 读取数据库内容 (Query Database)
  try {
    console.log("--- 1. 读取数据库 ---");
    if (DATABASE_ID === "YOUR_DATABASE_ID") {
      console.log("⚠️ 跳过数据库读取测试（请先配置 DATABASE_ID）\n");
    } else {
      const items = await queryDatabase(DATABASE_ID);
      console.log(`成功读取到 ${items.length} 条数据:`);
      items.forEach((item, index) => {
        // 兼容 Name 或 中文 "名称"
        const title = (item.properties.Name || item.properties.名称)?.title?.[0]?.plain_text || "无标题";
        console.log(`  [${index + 1}] ID: ${item.id} | 标题: ${title}`);
      });
      console.log("✅ 数据库读取测试完成\n");
    }
  } catch (err) {
    console.error("❌ 数据库读取测试失败:", err.message);
  }

  // 2. 在数据库中创建新页面 (Create Page)
  try {
    console.log("--- 2. 在数据库中创建新页面 ---");
    if (DATABASE_ID === "YOUR_DATABASE_ID") {
      console.log("⚠️ 跳过创建页面测试（请先配置 DATABASE_ID）\n");
    } else {
      const newPageTitle = "测试自动创建的页面 " + new Date().toLocaleString();
      
      // 可以配置额外的属性，必须与您的数据库字段匹配。这里我们演示只传标题和正文。
      // 因为您的数据库标题属性叫 "名称"，这里传入第 4 个参数 "名称"。
      const newPage = await createPageInDatabase(DATABASE_ID, newPageTitle, {}, "名称");
      console.log(`✅ 页面创建成功! 新页面 ID: ${newPage.id}`);

      // 向新创建的页面中写入一些正文内容 (追加 Block)
      console.log("正在写入页面正文...");
      const blocks = [
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [{ text: { content: "这是二级标题" } }]
          }
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              { text: { content: "这是通过 API 自动写入的第一段正文内容。" } }
            ]
          }
        }
      ];
      await appendPageContent(newPage.id, blocks);
      console.log("✅ 页面正文写入成功\n");
    }
  } catch (err) {
    console.error("❌ 页面创建测试失败:", err.message);
  }

  // 3. 读取单个页面属性和内容 (Read Page)
  try {
    console.log("--- 3. 读取单个页面 ---");
    const targetPageId = PAGE_ID === "YOUR_PAGE_ID" ? null : PAGE_ID;
    if (!targetPageId) {
      console.log("⚠️ 跳过单个页面读取测试（请先配置 PAGE_ID）\n");
    } else {
      // 获取属性
      const pageInfo = await getPage(targetPageId);
      console.log("页面基本属性:", JSON.stringify(pageInfo.properties, null, 2));

      // 获取正文 Block
      const content = await getPageContent(targetPageId);
      console.log(`成功获取页面正文，共 ${content.length} 个内容块(Blocks)。`);
      console.log("✅ 页面读取测试完成\n");
    }
  } catch (err) {
    console.error("❌ 页面读取测试失败:", err.message);
  }

  // 4. 更新页面属性 (Update Page)
  try {
    console.log("--- 4. 更新页面属性 ---");
    const targetPageId = PAGE_ID === "YOUR_PAGE_ID" ? null : PAGE_ID;
    if (!targetPageId) {
      console.log("⚠️ 跳过更新页面属性测试（请先配置 PAGE_ID）\n");
    } else {
      // 准备更新的属性（您的数据库属性标题名是 "名称"）
      const updatedProperties = {
        "名称": {
          title: [
            {
              text: {
                content: "已通过 API 更新的标题 - " + new Date().toLocaleTimeString()
              }
            }
          ]
        }
      };
      const updatedPage = await updatePageProperties(targetPageId, updatedProperties);
      console.log(`✅ 页面属性更新成功! 更新时间: ${updatedPage.last_edited_time}\n`);
    }
  } catch (err) {
    console.error("❌ 页面更新测试失败:", err.message);
  }
}

// 执行测试
runTests();
