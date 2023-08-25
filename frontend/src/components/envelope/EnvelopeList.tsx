import React, {FC} from 'react';
import Icons from '../ui/Icons';
import {Badge, List, Typography, ListItemText, IconButton, ListItem, Box} from '@mui/material';
import cl from './scss/Envelope.module.scss';
import {EnvelopeItem} from '../../types/envelopes';
import {fcLatter} from '../../utils/stringHelper';
import {Link} from "react-router-dom";

interface EnvelopesListProps {
  envelopes: EnvelopeItem[],
  selectedEnvelopeName: string,
  setCurrentEnvelope: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, envelopeId: string) => void,
  isTransactionsLoading: boolean
}
type Color = "success" | "warning" | "primary" | "default" | "secondary" | "error" | "info";
type ColorStatus = Record<EnvelopeItem['status'], Color>

const EnvelopeList: FC<EnvelopesListProps> = ({envelopes, selectedEnvelopeName, setCurrentEnvelope, isTransactionsLoading}) => {
  const colorStatus: ColorStatus = {
    open: 'success',
    closed: 'error',
    frozen: 'info'
  }

  return (
    <List className={cl.envelopeList}>
      {envelopes.length > 0
        ? envelopes.map(envelope =>
          <ListItem
            disabled={isTransactionsLoading}
            secondaryAction={
              <IconButton
                onClick={(e) => e.stopPropagation()}
                disabled={isTransactionsLoading}
                edge="end" aria-label="envelope-modal"
                color="primary"
                component={Link}
                to={`/envelope/${envelope.name}/detail`}
              >
                <Icons.FolderIcon/>
              </IconButton>
            }
            className={envelope.name === selectedEnvelopeName ? `${cl.listItem} ${cl.active}` : cl.listItem}
            key={envelope.name}
            onClick={(e) => setCurrentEnvelope(e, envelope.name)}
          >
            <ListItemText
              primary={
                <Box className={cl.listItemTextContainer}>
                  <Typography variant="body1" noWrap={true} className={cl.listItemText}>{envelope.name}</Typography>
                  <Badge badgeContent={fcLatter(envelope.status)} color={colorStatus[envelope.status]} className={cl.listItemStatus}/>
                </Box>
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
