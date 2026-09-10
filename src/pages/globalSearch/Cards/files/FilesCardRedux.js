import React from 'react';
import FilesCard from './FilesCard';

/**
 * Thin wrapper kept for existing search card wiring.
 * Cart behavior was removed when file actions moved to C3DC Explore Files.
 */
const FilesCardRedux = (props) => <FilesCard {...props} />;

export default FilesCardRedux;
