// Visual BI Junior Dev Assessment - Data Restructuring

const inputData = {
  dimensions: [
    {
      id: "dimension_re",
      values: ["East", "East", "West", "West", "South", "Test"],
    },
    {
      id: "dimension_cnt",
      values: ["London", "Italy", "Germany", "Germany", "Russia"],
    },
    {
      id: "measure_sales",
      values: [100, 156, 432, 462, 25, 25, 26],
    },
    {
      id: "measure_qty",
      values: [85, 34, 153, 434, 52],
    },
    {
      id: "measure_profit",
      values: [123, 45, 421, 465, 451],
    },
  ],
  metadata: [
    {
      id: "dimension_re",
      label: "Region",
    },
    {
      id: "dimension_cnt",
      label: "County",
    },
    {
      id: "measure_sales",
      label: "Sales",
    },
    {
      id: "measure_qty",
      label: "Quantity",
    },
    {
      id: "measure_profit",
      label: "Profit",
    },
  ],
};

const getStructuredOutput = (data = {}) => {
  const { dimensions = [], metadata = [] } = data;
  const result = [];
  const count = [];

  const dimObj = dimensions.reduce((acc, currVal) => {
    acc[currVal.id] = currVal.values;
    count.push(currVal.values.length);

    return acc;
  }, {});

  const metaObj = metadata.reduce((acc, currVal) => {
    acc[currVal.id] = currVal.label;

    return acc;
  }, {});

  for (let i = 0; i < Math.max(...count); i++) {
    const obj = {};
    for (const key in dimObj) {
      obj[metaObj[key]] = dimObj[key][i] || "";
    }
    result.push(obj);
  }

  return result;
};

console.log(getStructuredOutput(inputData));
