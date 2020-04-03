import Link from "next/link";

import styled from 'styled-components'
import { color, layout, space, system, flexbox } from 'styled-system'


class WithGap extends React.Component {

  render() {
    return <div className={this.props.className} data-gap-row data-gap-column>{this.props.children}</div>
  }
}

const Box = styled(WithGap)`
  ${system({
  gapRow: {
    property: '--gapRow'
  },
  gapColumn: {
    property: '--gapColumn'
  }
})}
  ${color}
  ${space}
  ${layout}
  ${flexbox}
`

export default Box