import React, { useCallback } from 'react';
import {
  Button,
  Collapse,
  FormControlLabel,
  Grid,
  // Switch,
  withStyles,
  Tooltip
} from '@material-ui/core';
// import { useTheme } from '../../../components/ThemeContext';
import styles from './WidgetStyle';
import { WidgetGenerator } from '@bento-core/widgets';
import { widgetConfig } from '../../../bento/dashTemplate';
import colors from '../../../utils/colors';
import { Typography } from '../../../components/Wrappers/Wrappers';
import { formatWidgetData } from './WidgetUtils';
import questionIcon from '../../../assets/icons/Question_Icon.svg';

const WidgetView = ({
  classes,
  data,
  theme,
  activeFilters,
}) => {

  let config = widgetConfig;
  let displayWidgets = formatWidgetData(data, widgetConfig);
  const totalDiagnosis = displayWidgets.participantCountByDiagnosis.length;
  let diagnosisTooltip = '';
  if (Object.keys(activeFilters).length === 1 && activeFilters.participant_ids.length === 0) {
    displayWidgets = {
      ...displayWidgets,
      participantCountByDiagnosis: displayWidgets.participantCountByDiagnosis.slice(0, 20),
    }

    diagnosisTooltip = `Showing top 20 out of ${totalDiagnosis} total diagnoses`
  }
  else {
    diagnosisTooltip = 'Showing all matching diagnoses'
  }

  const [collapse, setCollapse] = React.useState(true);
  // const themeChanger = useTheme();
  const handleChange = () => setCollapse((prev) => !prev);

  const LightTooltip = withStyles(() => ({
    arrow: {
      color: 'white',
      "&:before": {
        border: "1px solid #676767"
      },
    },
    tooltip: {
      backgroundColor: 'white',
      border: '1px solid black',
      color: 'black',
      font: 'Poppins',
      fontWeight: 400,
      fontSize: '13px',
      lineHeight: '17.5px',
      width: '220px',
      paddingTop: '5px',
      paddingBottom: '5px',
    },
  }))(Tooltip);

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
          {config.slice(0, 6).map((widget, index) => {
            const dataset = displayWidgets[widget.dataName];
            if (!dataset || dataset.length === 0) {
              return <></>;
            }
            if (widget.type === 'sunburst' && (!dataset.children || !dataset.children.length)) {
              return <></>;
            }
            return (
              <Grid key={index} item lg={4} md={6} sm={12} xs={12}
                style={{
                  paddingLeft: '30px',
                  paddingTop: '40px',
                  borderRadius: '30px',
                }}
              >
                <div
                  className={classes.widgetBox}
                >
                  <Widget
                    header={(
                      <>
                        <Typography size="md" weight="normal" family="Nunito" style={{ color: '#4A5C5E' }}>
                          {widget.title}
                        </Typography>
                        {widget.title === 'Diagnosis' &&
                          <LightTooltip
                            title={diagnosisTooltip}
                            placement='top-end'
                            arrow
                          >
                            <img src={questionIcon} alt='diagnosis tooltip' style={{ marginLeft: '0.5px', marginBottom: '10px', scale: '0.8' }} />
                          </LightTooltip>}
                      </>
                    )}
                    title={widget.title}
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
                    noJustifyTitle
                  />
                </div>
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