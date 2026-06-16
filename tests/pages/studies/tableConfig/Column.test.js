import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { cellTypes, headerTypes } from '@bento-core/table';
import {
  CustomCellView,
  CustomHeaderCellView,
  configColumn,
} from '../../../../src/pages/studies/tableConfig/Column';
import { openDoubleLink } from '../../../../src/bento/studiesData';

jest.mock('../../../../src/bento/studiesData', () => ({
  ...jest.requireActual('../../../../src/bento/studiesData'),
  studyDownloadLinks: { phs001: 'https://example.test/manifest.xlsx' },
  openDoubleLink: jest.fn(),
}));

describe('studies table Column config', () => {
  it('should render transformed content for TRANSFORM style', () => {
    render(
      <CustomCellView
        dataField="value"
        value="abc"
        cellStyle="TRANSFORM"
        dataFormatter={(v) => `<b>${v}</b>`}
      />,
    );
    expect(screen.getByText('abc')).toBeInTheDocument();
  });

  it('should expand and collapse long arrays for EXPAND style', () => {
    render(
      <CustomCellView
        dataField="items"
        items={['A', 'B', 'C', 'D', 'E', 'F']}
        cellStyle="EXPAND"
      />,
    );
    expect(screen.getByText('Read More')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Read More'));
    expect(screen.getByText('Read Less')).toBeInTheDocument();
  });

  it('should render dbGap link for DBGAP style', () => {
    render(
      <CustomCellView
        dataField="study_id"
        study_id="phs123"
        cellStyle="DBGAP"
      />,
    );
    expect(
      screen.getByRole('link', { name: 'phs123' }),
    ).toHaveAttribute(
      'href',
      'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs123',
    );
  });

  it('should trigger manifest download callback for STUDY_DOWNLOAD style', () => {
    render(
      <CustomCellView
        dataField="study_id"
        study_id="phs001"
        cellStyle="STUDY_DOWNLOAD"
      />,
    );
    fireEvent.click(screen.getByTitle('Download study manifest'));
    expect(openDoubleLink).toHaveBeenCalledWith(
      'https://example.test/manifest.xlsx',
      'phs001_CCDI_Study_Manifest.xlsx',
    );
  });

  it('should provide custom cell/header renderers in configColumn', () => {
    const columns = [
      { dataField: 'study_id', cellType: cellTypes.CUSTOM_ELEM },
      { dataField: 'h', headerType: headerTypes.CUSTOM_ELEM },
    ];
    const configured = configColumn(columns);

    expect(typeof configured[0].customCellRender).toBe('function');
    expect(typeof configured[1].customColHeaderRender).toBe('function');
    const { container } = render(<CustomHeaderCellView />);
    expect(container.firstChild).toBeNull();
  });
});
