import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export default function AccessibleBadges(props) {
  return (
    <IconButton aria-label={notificationsLabel(props.count)} onClick={props.handleClick}>
      <Badge badgeContent={props.count} color="primary">
        <NotificationsActiveIcon className="colorWhite" />
      </Badge>
    </IconButton>
  );
}