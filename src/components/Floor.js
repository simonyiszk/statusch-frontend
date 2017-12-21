import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
import { Machine } from '../components'

const Floor = ({ floor, machines, queryTime }) => (
  <Card>
    <Card.Content>
      <Card.Header>
        {floor}. szint
      </Card.Header>
      <Card.Meta>
        Last data: {queryTime}
      </Card.Meta>
    </Card.Content>
    <Card.Content>
      <Feed>
        {
          machines.map(machine => (
            <Machine
              key={machine.id}
              kind={machine.kind_of}
              status={machine.status}
              message={machine.message}
            />
          ))
        }
      </Feed>
    </Card.Content>
  </Card>
)

export { Floor }
