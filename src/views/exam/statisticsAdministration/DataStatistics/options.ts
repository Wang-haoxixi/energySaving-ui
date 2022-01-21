
export const genOptions = (x: any[], y: any[]) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 10,
      itemWidth: 5,
      itemHeight: 5,
      data: y,
      formatter: function (name: any) {
        let target;
        for (let i = 0, l = x.length; i < l; i++) {
          if (x[i].name == name) {
            target = x[i].value;
          }
        }
        return name + ' ' + target;
      },
      icon: "circle",
      textStyle: {
        fontSize: 14,
        lineHeight: 30,
      },
    },
    series: [
      {
        name: '统计',
        type: 'pie',
        center: ["50%", "30%"],
        radius: ['40%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: x,
      },
    ],
  };
};

export const bOption = (x: any[], y: any[], z: any[]) => {
  return {
    legend: {
      data: ['考试人数', '考试次数'],
      left: '50%',
    },
    color: ['rgb(47, 128, 255)', 'rgb(54, 199, 235)', '#d0e17d'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: x,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      { // For shadow
        type: 'bar',
        name: '考试人数',
        itemStyle: {
          color: 'rgb(47, 128, 255)',
          barBorderRadius: [8, 8, 8, 8],
        },
        barWidth: 10,
        barCateGoryGap: 20,
        data: y,
        animation: false,
      },
      {
        itemStyle: {
          color: 'rgb(54, 199, 235)',
          barBorderRadius: [8, 8, 8, 8],
        },
        barWidth: 10,
        name: '考试次数',
        type: 'bar',
        barCateGoryGap: 20,
        data: z,
      },
    ],
  };
};

