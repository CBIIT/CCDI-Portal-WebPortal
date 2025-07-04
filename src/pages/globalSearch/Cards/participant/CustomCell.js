import React, { useCallback } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import MuiTooltip from '@material-ui/core/Tooltip';

const DELETE = 'DELETE';
const CUSTOM_ELEM = 'CUSTOM_ELEM';
const DEFAULT = 'DEFAULT';
/**
*
* @returns default/Link/Custom view
*/
const CustomHeaderCell = ({
  sortOrder,
  sortBy,
  column,
  components = {},
  toggleSort,
  style,
}) => {
  const {
    dataField,
    tooltipText,
    header,
    headerType,
    customColHeaderRender,
    sortable,
  } = column;

   const headerTypes = {
    CUSTOM_ELEM,
    DELETE,
    DEFAULT,
  };

  const Tooltip = useCallback(({ children }) => {
    // return custom tooltips
    if (components.Tooltip) {
      const CustomToolTip = components.Tooltip;
      return (
        <CustomToolTip>
          {children}
        </CustomToolTip>
      );
    }
    // return default tooltip
    if (tooltipText) {
      return (
        <MuiTooltip id="header-tooltip" title={tooltipText}>
          {children}
        </MuiTooltip>
      );
    }
    // return default view
    return <>{children}</>;
  }, []);

  if (sortable !== undefined && !sortable) {
    return (
      <TableCell
        scope="col"
      >
        {header}
      </TableCell>
    );
  }

  return (
    <TableCell
      scope="col"
      active={sortBy === dataField}
      direction={sortOrder}
      style={style}
    >
      <Tooltip>
        <TableSortLabel
          active={sortBy === dataField}
          hideSortIcon={sortBy !== dataField}
          direction={sortBy === dataField ? sortOrder : 'asc'}
          onClick={toggleSort}
        >
          {(headerType === headerTypes.CUSTOM_ELEM && customColHeaderRender)
            ? customColHeaderRender(column) : header}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  );
};

export default CustomHeaderCell;
