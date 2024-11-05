import axios from 'axios';

export const generatePlotlinesWithAPI = async (apiKey, story, characters) => {
  if (!apiKey || !story) {
    throw new Error('APIキーまたは物語が設定されていません');
  }

  if (!characters || characters.length === 0) {
    throw new Error('キャラクター情報が設定されていません');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `あなたは物語の伏線を提案する専門家です。
提案は必ず以下のJSON形式で出力してください：

{
  "plotlines": [
    {
      "title": "伏線のタイトル",
      "description": "詳細な説明",
      "type": "event|object|character|mystery",
      "importance": "low|medium|high",
      "targetChapter": "目標となるチャプター",
      "hints": "伏線の仕込み方のヒント"
    }
  ]
}`
          },
          {
            role: "user",
            content: `
現在の物語:
${story}

登場キャラクター:
${characters.map(c => `${c.name}: ${c.details}`).join('\n')}

この物語とキャラクターに適した伏線を3つ提案してください。必ず指定されたJSON形式で出力してください。`
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

    const content = response.data.choices[0].message.content;
    
    try {
      const parsedContent = JSON.parse(content);
      if (!parsedContent.plotlines || !Array.isArray(parsedContent.plotlines)) {
        throw new Error('伏線データの形式が不正です');
      }
      return parsedContent.plotlines;
    } catch (parseError) {
      console.error('JSON解析エラー:', parseError);
      throw new Error('伏線データの解析に失敗しました');
    }
  } catch (error) {
    if (error.response?.data?.error?.message) {
      throw new Error(`API Error: ${error.response.data.error.message}`);
    }
    throw error;
  }
};

export const analyzePlotlineOpportunities = async (apiKey, story, plotlines) => {
  if (!apiKey || !story) {
    throw new Error('APIキーまたは物語が設定されていません');
  }

  if (!plotlines || plotlines.length === 0) {
    throw new Error('分析する伏線が設定されていません');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `あなたは物語の伏線分析の専門家です。
分析結果は必ず以下のJSON形式で出力してください：

{
  "analysis": {
    "currentUsage": {
      "title": "既存の伏線の活用状況",
      "content": "分析内容"
    },
    "opportunities": {
      "title": "未回収の伏線の機会",
      "content": "分析内容"
    },
    "suggestions": {
      "title": "新しい伏線の提案",
      "content": "分析内容"
    }
  }
}`
          },
          {
            role: "user",
            content: `
現在の物語:
${story}

既存の伏線:
${plotlines.map(p => `- ${p.title}: ${p.description}`).join('\n')}

上記の内容を分析し、必ず指定されたJSON形式で出力してください。`
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

    const content = response.data.choices[0].message.content;
    
    try {
      const parsedContent = JSON.parse(content);
      if (!parsedContent.analysis) {
        throw new Error('分析データの形式が不正です');
      }
      return parsedContent;
    } catch (parseError) {
      console.error('JSON解析エラー:', parseError);
      throw new Error('分析データの解析に失敗しました');
    }
  } catch (error) {
    if (error.response?.data?.error?.message) {
      throw new Error(`API Error: ${error.response.data.error.message}`);
    }
    throw error;
  }
};

export const validatePlotline = (plotline) => {
  const errors = [];
  
  if (!plotline.title?.trim()) {
    errors.push('タイトルを入力してください');
  } else if (plotline.title.length > 50) {
    errors.push('タイトルは50文字以内で入力してください');
  }
  
  if (!plotline.description?.trim()) {
    errors.push('説明を入力してください');
  } else if (plotline.description.length > 200) {
    errors.push('説明は200文字以内で入力してください');
  }
  
  if (!plotline.type || !['event', 'object', 'character', 'mystery'].includes(plotline.type)) {
    errors.push('有効な種類を選択してください');
  }
  
  if (!plotline.importance || !['low', 'medium', 'high'].includes(plotline.importance)) {
    errors.push('重要度を選択してください');
  }
  
  if (!plotline.targetChapter?.trim()) {
    errors.push('目標回収チャプターを入力してください');
  }
  
  if (!plotline.hints?.trim()) {
    errors.push('ヒントを入力してください');
  } else if (plotline.hints.length > 100) {
    errors.push('ヒントは100文字以内で入力してください');
  }
  
  return errors;
};