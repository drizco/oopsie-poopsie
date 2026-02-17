import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'
import type { ChangeEvent } from 'react'

interface JoinGameFormProps {
  playerName: string
  onPlayerNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  onJoin: () => void
}

/**
 * JoinGameForm - Player name input and join button
 */
const JoinGameForm = ({ playerName, onPlayerNameChange, onJoin }: JoinGameFormProps) => {
  return (
    <Col xs="4" className="mb-5">
      <Row>
        <Form>
          <FormGroup>
            <Label for="name">User Name</Label>
            <Input
              data-lpignore="true"
              type="text"
              name="playerName"
              id="name"
              value={playerName || ''}
              onChange={onPlayerNameChange}
            />
          </FormGroup>
          <Button disabled={!playerName} color="success" onClick={onJoin}>
            JOIN
          </Button>
        </Form>
      </Row>
    </Col>
  )
}

export default JoinGameForm
