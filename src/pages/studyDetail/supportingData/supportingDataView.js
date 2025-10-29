import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { styles } from './supportingDataStyle';

// Configuration mapping for supporting data repositories
const supportingDataConfig = {
    'IDC': {
        data_name: 'Imaging Data Commons (IDC)',
        data_url: 'https://portal.imaging.datacommons.cancer.gov/explore/',
    },
    'TCIA': {
        data_name: 'The Cancer Imaging Archive (TCIA)',
        data_url: 'https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70227341',
    }
};


//Merge repository entries with a configuration mapping by category.
const mergeSupportingData = (data, config) => {
    return Object.keys(config).map(category => {
        const repo = data.find(r => r.data_category === category);
        const hasDataObject = repo && repo.data_object !== undefined && repo.data_object !== null;
        return {
            data_name: config[category].data_name,
            data_url: hasDataObject ? config[category].data_url : '',
            data_category: category,
            data_object: hasDataObject ? JSON.parse(repo.data_object) : {},
        };
    });
};

const SupportingDataView = ({ data, classes }) => {

    // Extract supporting data from the main data object
    const supportingData = data.supporting_data || [];
    // Merge supporting data with configuration
    const mergedSupportingData = mergeSupportingData(supportingData, supportingDataConfig);

    return (
        <div className={classes.container}>
            <div className={classes.dataContainer}>
                {/* Render each supporting data */}
                {mergedSupportingData.map((repository, index) => (
                    <Accordion 
                        key={index}
                        defaultExpanded={true}
                        className={classes.repositoryAccordion}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            className={classes.accordionSummary}
                        >
                            <div className={classes.repositoryTitle}>
                                <span className={classes.repositoryLabel}>REPOSITORY:</span>
                                <span>{repository.data_name}</span>
                                {repository.data_url && (
                                    <a 
                                        href={repository.data_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <OpenInNewIcon className={classes.externalLinkIcon} />
                                    </a>
                                )}
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            {/* Render the data object as a table */}
                            {repository.data_object && Object.keys(repository.data_object).length > 0 ? (
                                <TableContainer>
                                    <Table className={classes.dataTable}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Property</TableCell>
                                                <TableCell>Value</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* Render each property-value pair */}
                                            {Object.entries(repository.data_object).map(([key, value], rowIndex) => (
                                                <TableRow key={rowIndex}>
                                                    <TableCell>{key.replace(/_/g, ' ')}</TableCell>
                                                    <TableCell dangerouslySetInnerHTML={{ __html: value }}></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <div className={classes.emptyState}>
                                    Data unavailable at this time
                                </div>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

export default withStyles(styles)(SupportingDataView);
