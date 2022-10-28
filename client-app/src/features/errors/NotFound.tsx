import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops - we've looked everywhere and couldn't find this!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/dashboard' primary>Return to dashboard</Button>
            </Segment.Inline>
        </Segment>
    )
}