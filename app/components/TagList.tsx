import { Input, InputRef, Space, Tag } from "antd";
import React, { useRef, useState } from "react";

type TagListProps = {
  value: string[];
  onChange: (value: string[]) => void;
}

const TagList = ({ value, onChange }: TagListProps) => {
  const ref = useRef<InputRef | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempTags = [...value];
    if (inputValue && !tempTags.includes(inputValue)) {
      tempTags.push(inputValue);
    }
    onChange?.(tempTags);
    setInputValue('');
  };

  return (
    <Space>
      {value.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
      <Input
        ref={ref}
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    </Space>
  );
}

export default TagList;