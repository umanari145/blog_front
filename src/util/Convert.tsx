type RenderHtmlWithBrProps = {
  text: string;
};

export const RenderHtmlWithBr: React.FC<RenderHtmlWithBrProps> = ({ text }) => {
  const formatText = (input: string): string => {
    if (typeof input !== 'string') {
      console.error('Input text must be a string');
      return '';
    }

    const lines = input?.split('\n');
    const result: string[] = [];
    let insideHtmlTag = false;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // HTMLタグの判定: 開始または終了タグが含まれる行
      if (trimmedLine.startsWith('<') && trimmedLine.endsWith('>')) {
        result.push(line); // HTMLタグ行はそのまま保持
        insideHtmlTag =
          !trimmedLine.startsWith('</') && !trimmedLine.includes('/>');
      } else if (insideHtmlTag) {
        // HTMLタグ内のテキストはそのまま追加
        result.push(line);
      } else {
        // HTMLタグ外の通常行: <br> を追加
        result.push(`${line}<br>`);
      }
    }
    return result.join('\n');
  };
  const formattedText = formatText(text);
  return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
};
