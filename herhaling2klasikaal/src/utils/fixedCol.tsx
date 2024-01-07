import styled from 'styled-components'
import {Col} from 'react-bootstrap'

const FixedCol = styled(Col)`
  position: sticky;
  right: 0;
  top: 0;
  height: 100vh;
`

export default FixedCol