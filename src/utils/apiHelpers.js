import axios from 'axios';

export const generateStoryWithAPI = async (apiKey, prompt, model = "gpt-4o-mini") => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages: [
          {
            role: "system",
            content: "あなたは創造的な物語作家です。与えられた条件に基づいて物語を生成してください。"
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.8,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('APIからの応答が不正です');
    }

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    if (error.response?.data?.error?.message) {
      throw new Error(`API Error: ${error.response.data.error.message}`);
    }
    throw new Error('物語の生成中にエラーが発生しました');
  }
};

export const generateContinuationWithAPI = async (apiKey, story, continuationPrompt, model = "gpt-4o-mini") => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages: [
          {
            role: "system",
            content: "あなたは物語作家です。既存の物語の続きを生成してください。"
          },
          {
            role: "user",
            content: `既存の物語:\n${story}\n\n続きの条件:\n${continuationPrompt}`
          }
        ],
        max_tokens: 1500,
        temperature: 0.8,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('APIからの応答が不正です');
    }

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    if (error.response?.data?.error?.message) {
      throw new Error(`API Error: ${error.response.data.error.message}`);
    }
    throw new Error('物語の続きの生成中にエラーが発生しました');
  }
};

export const checkStoryConsistency = async (apiKey, story, characters) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `あなたは物語の一貫性をチェックする専門家です。
以下のJSON形式で結果を出力してください：

{
  "consistencyReport": {
    "issues": [
      {
        "type": "character|plot|setting",
        "severity": "low|medium|high",
        "description": "問題の説明",
        "suggestion": "修正案",
        "location": "問題のある箇所の説明"
      }
    ],
    "summary": "全体的な一貫性の評価"
  }
}`
          },
          {
            role: "user",
            content: `
物語:
${story}

登場キャラクター:
${characters.map(char => `
名前: ${char.name}
性格: ${char.personality}
背景: ${char.background}
詳細: ${char.details}
`).join('\n')}

この物語の一貫性をチェックし、問題点があれば指摘してください。
キャラクターの性格や行動の一貫性、プロットの論理性、設定の整合性などを確認してください。`
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('APIからの応答が不正です');
    }

    try {
      const content = response.data.choices[0].message.content;
      const parsedContent = JSON.parse(content);
      
      if (!parsedContent.consistencyReport) {
        throw new Error('レポートの形式が不正です');
      }
      
      return parsedContent.consistencyReport;
    } catch (parseError) {
      console.error('JSON解析エラー:', parseError);
      throw new Error('一貫性チェックの結果の解析に失敗しました');
    }
  } catch (error) {
    if (error.response?.data?.error?.message) {
      throw new Error(`API Error: ${error.response.data.error.message}`);
    }
    throw error;
  }
};

export const applyConsistencyFix = async (apiKey, story, issue) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "あなたは物語の編集者です。指摘された一貫性の問題を修正してください。"
          },
          {
            role: "user",
            content: `
物語:
${story}

修正が必要な問題:
${issue.description}

修正案:
${issue.suggestion}

問題のある箇所:
${issue.location}

上記の問題を修正した新しいバージョンの物語を生成してください。
物語全体の流れを保ちながら、自然な形で修正を行ってください。`
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('APIからの応答が不正です');
    }

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    if (error.response?.data?.error?.message) {
      throw new Error(`API Error: ${error.response.data.error.message}`);
    }
    throw new Error('物語の修正中にエラーが発生しました');
  }
};

export const modifyStoryPart = async ({ story, selectedText, editType, customInstruction, apiKey }) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "あなたは物語の編集者です。選択された部分を指定された方法で修正してください。"
          },
          {
            role: "user",
            content: `
元の物語:
${story}

選択された部分:
${selectedText}

修正タイプ: ${editType}
${customInstruction ? `カスタム指示: ${customInstruction}` : ''}

選択された部分を修正し、物語全体の流れを保ちながら自然な形で修正を行ってください。
修正後の物語全体を返してください。`
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('APIからの応答が不正です');
    }

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    if (error.response?.data?.error?.message) {
      throw new Error(`API Error: ${error.response.data.error.message}`);
    }
    throw new Error('物語の部分修正中にエラーが発生しました');
  }
};