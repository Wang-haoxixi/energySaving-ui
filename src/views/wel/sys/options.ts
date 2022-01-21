export const _color = (percent: string) => {
  return +percent >= 0 ? "red" : "blue";
};

export const _icon = (percent: string) => {
  return +percent >= 0 ? "el-icon-caret-top" : "el-icon-caret-bottom";
};

export const genOptions = (x: any[], y: any[], name: string) => {
  return {
    grid: {
      x: 10,
      y: 30,
      x2: 10,
      y2: 0,
      containLabel: true,
    },
    color: ["#ff6c40"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    xAxis: [
      {
        type: "category",
        data: x,
        axisTick: {
          alignWithLabel: true,
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          //y轴
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        min: 0,
        axisLine: {
          //y轴
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#f0f0f0"],
            width: 1,
            type: "solid",
          },
        },
      },
    ],
    series: [
      {
        name,
        type: "bar",
        barWidth: "15%",
        data: y,
        itemStyle: {
          //柱形图圆角，鼠标移上去效果
          emphasis: {
            barBorderRadius: [10, 10, 10, 10],
          },
          normal: {
            //柱形图圆角，初始化效果
            barBorderRadius: [10, 10, 10, 10],
          },
        },
      },
    ],
  };
};

export const genBoxList = (chart: any, name: string) => {
  return [
    {
      num: chart.dayNew,
      name: `今日新增${name}数`,
      grade: chart.dayPercent,
      color: _color(chart.dayPercent),
      icon: _icon(chart.dayPercent),
    },
    {
      num: chart.weekNew,
      name: `本周新增${name}数`,
      grade: chart.weekPercent,
      color: _color(chart.weekPercent),
      icon: _icon(chart.weekPercent),
    },
  ];
};
