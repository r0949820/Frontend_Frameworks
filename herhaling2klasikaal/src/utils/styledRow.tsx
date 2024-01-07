import styled from 'styled-components'
import {Row} from 'react-bootstrap'

const StyledRow: typeof Row = styled(Row)`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100vh;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #447152;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #549159;
  }
`

export default StyledRow
