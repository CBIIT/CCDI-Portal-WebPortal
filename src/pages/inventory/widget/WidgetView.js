import React, { useCallback } from 'react';
import {
  Button,
  Collapse,
  FormControlLabel,
  Grid,
  // Switch,
  withStyles,
} from '@material-ui/core';
import html2pdf from "html2pdf.js";
// import { useTheme } from '../../../components/ThemeContext';
import styles from './WidgetStyle';
import { WidgetGenerator } from '@bento-core/widgets';
import { widgetConfig } from '../../../bento/dashTemplate';
import colors from '../../../utils/colors';
import { Typography } from '../../../components/Wrappers/Wrappers';
import { formatWidgetData } from './WidgetUtils';
import NCILogoExport from '../../../assets/about/NCI_Logo.png';

const WidgetView = ({
  classes,
  data,
  theme,
}) => {
  const displayWidgets = formatWidgetData(data, widgetConfig);
  const [collapse, setCollapse] = React.useState(true);
  // const themeChanger = useTheme();
  const handleChange = () => setCollapse((prev) => !prev);

  const downloadSVGAsJPG = (svgElement, filename = 'image.jpg') => {
    // Create an HTML canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Get the SVG's XML string
    const svgData = new XMLSerializer().serializeToString(svgElement);
  
    // Create an image element
    const img = new Image();
  
    // Set the image source to the SVG data
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
  
    img.onload = () => {
      // Set canvas dimensions to match SVG
      canvas.width = img.width;
      canvas.height = img.height;
  
      // Draw the SVG image onto the canvas
      ctx.drawImage(img, 0, 0);
  
      // Convert canvas to JPG and download it
      const jpgDataUrl = canvas.toDataURL('image/jpeg');
  
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = jpgDataUrl;
      link.download = filename;
      link.click();
  
      // Revoke the object URL after download
      URL.revokeObjectURL(svgUrl);
    };
  
    // Set the image source to trigger loading
    img.src = svgUrl;
  }

  const handleDownloadPNG = (e, id) => {
    // const svgElement = document.getElementById(id).querySelectorAll('svg')[0];
    // downloadSVGAsJPG(svgElement);
    const chartSVG = document.getElementById(id).querySelectorAll('svg')[0];
    const svgData = new XMLSerializer().serializeToString(chartSVG);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function () {
      const displayWidth = 304;
      const displayHeight = 210;
      const scale = 1.5;
      canvas.style.width = displayWidth + 'px';
      canvas.style.height = displayHeight + 'px';
      canvas.width = displayWidth * scale;
      canvas.height = displayHeight * scale;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 48, 45);

      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/jpeg');
      a.download = 'chart.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleDownloadPDF = (e, id) => {
        const img = document.createElement("img");
        img.src = NCILogoExport;
        img.width = '1';
        const element = document.getElementById(id).querySelectorAll('svg')[0];
        const elementClone = element.cloneNode(true);
        const newDiv = document.createElement("div");
        newDiv.appendChild(elementClone);
        const opt = {
          margin: [35, 15, 20, 15],
          filename: "ccdi_hub_chart.pdf",
          image: {type: 'jpeg', quality: 1},
          html2canvas: {dpi: 72, scale: 4, letterRendering: true},
          jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
        };
  
        html2pdf().from(newDiv).set(opt).toContainer()
        .toCanvas()
        .toPdf()
        .get('pdf')
        .then((pdf) => {
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i += 1) {
              pdf.setPage(i);
              pdf.addImage(img, 'PNG', 13, 7, 120, 15);
              pdf.setDrawColor("#606061");
              pdf.setLineWidth(1.0);
              pdf.line(15, 27, 195, 27);
              pdf.setDrawColor("#3b6697");
              pdf.setLineWidth(0.2);
              pdf.line(15, 280, 195, 280);
              pdf.setFontSize(8);
              pdf.setFont(pdf.getFont().fontName, "normal");
              pdf.setTextColor("#000000");
              pdf.text('U.S. Department of Health and Human Services | National Institutes of Health | National Cancer Institute', 35,
                  pdf.internal.pageSize.getHeight() / 1.04);
              pdf.setFont(pdf.getFont().fontName, "bold");
              pdf.text(`Page ${i} of ${totalPages}`, 180, pdf.internal.pageSize.getHeight() / 1.04);
          }
          })
          .save();
    };

  const widgetGeneratorConfig = {
    theme,
    DonutConfig: {
      colors,
      styles: {
        cellPadding: 2,
        textOverflowLength: 20,
        textColor: theme.palette.widgetBackground.contrastText,
      },
    },
    SunburstConfig: {
      styles: {
        textColor: theme.palette.widgetBackground.contrastText,
      },
    },
  };
  const { Widget } = useCallback(WidgetGenerator(widgetGeneratorConfig), []);

  return (
    <>
      <div className={classes.widgetsCollapse}>
        <div className={classes.floatLeft} />
        <div className={classes.floatRight}>
          <FormControlLabel
            control={(
              <Button className={classes.customButton} onClick={handleChange}>
                {collapse ? 'COLLAPSE VIEW' : 'OPEN VIEW'}
              </Button>
            )}
          />
          {/* <Switch
            classes={{
              root: classes.switchRoot,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            className={classes.customSwitch}
            disableRipple
            checked={themeChanger.dark}
            onChange={themeChanger.toggleTheme}
          /> */}
        </div>
      </div>
      <Collapse in={collapse} className={classes.backgroundWidgets}>
        <Grid container>
          {widgetConfig.slice(0, 6).map((widget, index) => {
            const dataset = displayWidgets[widget.dataName];
            if (!dataset || dataset.length === 0) {
              return <></>;
            }
            if (widget.type === 'sunburst' && (!dataset.children || !dataset.children.length)) {
              return <></>;
            }
            return (
              <Grid key={index} item lg={4} md={6} sm={12} xs={12} id={widget.dataName}>
                <Widget
                  header={(
                    <Typography size="md" weight="normal" family="Nunito" style={{color: '#4A5C5E'}}>
                      {widget.title}
                    </Typography>
                  )}
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  bottomDivider
                  customBackGround
                  data={dataset}
                  chartType={widget.type}
                  sliceTitle={widget.sliceTitle}
                  chartTitleLocation="bottom"
                  chartTitleAlignment="center"
                  width={widget.width}
                  height={widget.height}
                />
                <div><Button onClick={(e) => handleDownloadPNG(e, widget.dataName)}>Click me</Button></div>
                <div><Button onClick={(e) => handleDownloadPDF(e, widget.dataName)}>Click me</Button></div>
              </Grid>
            );
          })}
        </Grid>
      </Collapse>
      {collapse && <div className={classes.dashboardDividerTop} />}
      {collapse && <div className={classes.dashboardDivider} />}
    </>
  );
};

export default withStyles(styles, { withTheme: true })(WidgetView);
