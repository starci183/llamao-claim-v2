type ProgressBarProps = {
  value?: number;
  max?: number;
  min?: number;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: number) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function ProgressBar() {
  return <div>ProgressBar</div>;
}
