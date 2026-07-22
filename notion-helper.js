/**
 * Notion API 轻量级封装工具 (免安装 SDK，直接使用原生 fetch)
 * 适用于 Node.js (18+) / Next.js
 */

const NOTION_TOKEN = process.env.NOTION_TOKEN || "ntn_K1819743081bl6paoC9lJRqIJpxTi7caxLjLgy2jmLu50m";

// Notion API 请求头
const headers = {
  "Authorization": `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json"
};

/**
 * 1. 查询数据库 (读取数据列表)
 * @param {string} databaseId - 数据库的 ID
 * @param {object} filter - (可选) 过滤条件，参考 Notion API 文档
 */
async function queryDatabase(databaseId, filter = null) {
  const url = `https://api.notion.com/v1/databases/${databaseId}/query`;
  const body = filter ? JSON.stringify({ filter }) : JSON.stringify({});
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to query database");
    return data.results; // 返回页面对象列表
  } catch (error) {
    console.error("Query Database Error:", error);
    throw error;
  }
}

/**
 * 2. 获取页面详细信息 (只含属性，不含正文 block)
 * @param {string} pageId - 页面 ID
 */
async function getPage(pageId) {
  const url = `https://api.notion.com/v1/pages/${pageId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to get page");
    return data;
  } catch (error) {
    console.error("Get Page Error:", error);
    throw error;
  }
}

/**
 * 3. 获取页面正文内容 (获取 Page 的子块 Blocks)
 * @param {string} pageOrBlockId - 页面 ID 或 块 ID
 */
async function getPageContent(pageOrBlockId) {
  const url = `https://api.notion.com/v1/blocks/${pageOrBlockId}/children?page_size=100`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to get page content");
    return data.results; // 返回 Block 列表
  } catch (error) {
    console.error("Get Page Content Error:", error);
    throw error;
  }
}

/**
 * 4. 在数据库中创建页面 (插入一条数据)
 * @param {string} databaseId - 数据库 ID
 * @param {string} title - 页面标题
 * @param {object} properties - (可选) 其他属性，如 {"Tag": { "select": { "name": "Active" } }}
 * @param {string} titleKey - (可选) 标题属性名称，默认为 "Name"
 */
async function createPageInDatabase(databaseId, title, properties = {}, titleKey = "Name") {
  const url = "https://api.notion.com/v1/pages";
  
  // 合并标题属性 (Notion 数据库的标题属性一般名为 "Name" 或 "title")
  const requestBody = {
    parent: { database_id: databaseId },
    properties: {
      [titleKey]: {
        title: [
          {
            text: {
              content: title
            }
          }
        ]
      },
      ...properties
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create page");
    return data;
  } catch (error) {
    console.error("Create Page Error:", error);
    throw error;
  }
}

/**
 * 5. 更新页面属性
 * @param {string} pageId - 页面 ID
 * @param {object} properties - 需要更新的属性，例如 {"Status": { "status": { "name": "Done" } }}
 */
async function updatePageProperties(pageId, properties) {
  const url = `https://api.notion.com/v1/pages/${pageId}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ properties })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update page");
    return data;
  } catch (error) {
    console.error("Update Page Error:", error);
    throw error;
  }
}

/**
 * 6. 向页面追加内容 (向页面追加正文 Block)
 * @param {string} pageOrBlockId - 页面 ID 或 块 ID
 * @param {Array} blocks - 要追加的块数组
 */
async function appendPageContent(pageOrBlockId, blocks) {
  const url = `https://api.notion.com/v1/blocks/${pageOrBlockId}/children`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ children: blocks })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to append page content");
    return data;
  } catch (error) {
    console.error("Append Content Error:", error);
    throw error;
  }
}

// 导出方法
module.exports = {
  queryDatabase,
  getPage,
  getPageContent,
  createPageInDatabase,
  updatePageProperties,
  appendPageContent
};
