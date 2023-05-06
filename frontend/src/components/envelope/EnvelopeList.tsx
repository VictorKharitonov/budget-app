import React, {FC} from 'react';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Icons from '../ui/Icons';
import cl from './scss/Envelope.module.scss';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import {IEnvelopeItem} from '../../types';

interface IEnvelopesListProps {
  envelopes: IEnvelopeItem[],
  selectedEnvelopeId: string,
  setCurrentEnvelope: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, envelopeId: string) => void
}

const EnvelopeList: FC<IEnvelopesListProps> = ({envelopes, selectedEnvelopeId, setCurrentEnvelope}) => {
  return (
    <List>
      {envelopes.length > 0
        ? envelopes.map(envelope =>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="envelope" color="primary">
                <Icons.FolderIcon/>
              </IconButton>
            }
            className={envelope.id === selectedEnvelopeId ? `${cl.listItem} ${cl.active}` : cl.listItem}
            key={envelope.id}
            onClick={(e) => setCurrentEnvelope(e, envelope.id)}
          >
            <ListItemText
              primary={
                <Typography variant="body1" className={cl.listItemText}>{envelope.name}</Typography>
              }
            />
          </ListItem>
        )
        : <Typography variant="h3">Envelopes is empty</Typography>
      }
    </List>
  );
};

export default EnvelopeList;