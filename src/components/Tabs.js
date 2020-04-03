import Link from "next/link";
import Box from './Box'

export default function Tabs(props) {
  return (
    <Box gapColumn="var(--rem-1)">
      {props.children}
    </Box>
  );
}
