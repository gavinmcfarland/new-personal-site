import Link from "next/link";
import Box from './Box'

export default function Tabs(props) {
  return (
    <Box gapColumn="20px">
      {props.children}
    </Box>
  );
}
