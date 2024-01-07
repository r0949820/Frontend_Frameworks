import styled from 'styled-components'
import {Container} from 'react-bootstrap'

const StyledContainer: typeof Container = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  min-width: 100vw;
`
export default StyledContainer
