import os
import time
import google.generativeai as genai

# 1. 配置 API Key
# 注意：API Key 必须用引号包起来
API_KEY = "AIzaSyBU85MHPpTOvOasKh861OqWgEuO9Hk9SCs"
genai.configure(api_key=API_KEY)

# 2. 设置保存路径
CONTENT_DIR = "/Users/peifengni/legaldecoder-seo-site/src/content/dictionary"
os.makedirs(CONTENT_DIR, exist_ok=True)

# 3. 词条清单 (你可以随时在这里添加更多词条)
terms_to_generate = [
    "Liability", 
    "Arbitration", 
    "Damages", 
    "Breach of Contract", 
    "Non-disclosure Agreement",
    "Intellectual Property",
    "Jurisdiction",
    "Indemnity",
    "Termination Clause",
    "Assignment"
]

# 使用当前最稳定的模型名称
MODEL_NAME = 'gemini-flash-latest'

def generate_term_article(term):
    # 初始化模型
    model = genai.GenerativeModel(MODEL_NAME)
    
    prompt = f"""
    作为一名资深法律博主和律师，请为法律术语 '{term}' 生成一篇深度 SEO 文章。
    
    内容要求：
    1. 用极其通俗易懂的“人话”解释，不要使用法律术语堆砌。
    2. 包含以下部分：
       - 什么是 {term}（一句话总结）
       - 大白话深度解释
       - 现实生活中的生动例子
       - 合同中关于此条文的隐藏坑/风险
       - 给读者的避坑建议
    
    格式要求：
    1. 必须包含 Frontmatter（顶部的 --- 部分）。
    2. 使用 Markdown 格式。
    
    输出示例：
    ---
    title: {term}
    description: 程序员也能听懂的 {term} 法律解释与风险预警。
    ---
    
    ## 什么是 {term}？
    ...内容...
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"❌ 处理词条 '{term}' 时发生错误: {e}")
        return None

# 4. 执行生成任务
print(f"🚀 开始批量生成引流文章，目标文件夹: {CONTENT_DIR}\n")

for term in terms_to_generate:
    # 转换文件名为小写并处理空格，例如 "Breach of Contract" -> "breach-of-contract.md"
    file_name = f"{term.lower().replace(' ', '-')}.md"
    file_path = os.path.join(CONTENT_DIR, file_name)
    
    # 检查是否已经生成过，避免重复消耗额度
    if os.path.exists(file_path):
        print(f"⏭️ 跳过: {term} (文件已存在)")
        continue
        
    print(f"✍️ 正在生成: {term}...")
    content = generate_term_article(term)
    
    if content:
        # 写入文件
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✅ 成功保存: {file_name}")
        
        # 频率控制：免费版 API 建议每分钟不超过 15 个请求，这里休息 4 秒比较安全
        time.sleep(4) 
    else:
        print(f"⚠️ 词条 '{term}' 生成失败，跳过。")

print("\n🎉 所有任务已完成！快去执行 git push 看看你的新网页吧。")
