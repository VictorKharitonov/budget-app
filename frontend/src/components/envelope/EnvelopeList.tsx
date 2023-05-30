import React, {FC} from 'react';
import Icons from '../ui/Icons';
import {Badge, List, Typography, ListItemText, IconButton, ListItem} from '@mui/material';
import cl from './scss/Envelope.module.scss';
import {EnvelopeItem} from '../../types';
import {fcLatter} from '../../utils/stringHelper';

interface EnvelopesListProps {
  envelopes: EnvelopeItem[],
  selectedEnvelopeId: string,
  setCurrentEnvelope: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, envelopeId: string) => void
}
type Color = "success" | "warning" | "primary" | "default" | "secondary" | "error" | "info";
type ColorStatus = Record<EnvelopeItem['status'], Color>

const EnvelopeList: FC<EnvelopesListProps> = ({envelopes, selectedEnvelopeId, setCurrentEnvelope}) => {
  const colorStatus: ColorStatus = {
    open: 'success',
    closed: 'error',
    frozen: 'info'
  }

  return (
    <List>
      {envelopes.length > 0
        ? envelopes.map(envelope =>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="envelope-modal" color="primary">
                <Icons.FolderIcon/>
              </IconButton>
            }
            className={envelope.id === selectedEnvelopeId ? `${cl.listItem} ${cl.active}` : cl.listItem}
            key={envelope.id}
            onClick={(e) => setCurrentEnvelope(e, envelope.id)}
          >
            <Badge badgeContent={fcLatter(envelope.status)} color={colorStatus[envelope.status]} className={cl.listItemStatus}/>
            <ListItemText
              primary={
                <Typography variant="body1" className={cl.listItemText}>{envelope.name}</Typography>
              }
            />
          </ListItem>
          )
        : <Typography variant="body1" sx={{mt: 1}}>Envelopes is empty</Typography>
      }
    </List>
  );
};

export default EnvelopeList;
