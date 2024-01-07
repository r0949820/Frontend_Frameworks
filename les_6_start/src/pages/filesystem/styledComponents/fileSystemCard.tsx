import styled from 'styled-components'
import {Card} from 'react-bootstrap'

const FileSystemCard: typeof Card = styled(Card)`
  width: 12em;
  height: 12em;
  text-align: center;
  margin: 1em;
  display: flex;
  justify-content: center;
  align-content: center;

  &:hover {
    background-color: #f6f6f6;
    cursor: pointer;
  }
`

export default FileSystemCard
