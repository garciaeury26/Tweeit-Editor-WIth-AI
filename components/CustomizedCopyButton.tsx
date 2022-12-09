import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons";

const CustomizedCopyButton = ({ value }: { value: string }) => {
  return (
    <CopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

export default CustomizedCopyButton;
