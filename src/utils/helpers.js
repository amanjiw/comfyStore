export const formatPrice = (number) => {
  const newPrice = new Intl.NumberFormat("en-UE", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newPrice;
};

export const getUniqueValues = (allData, type) => {
  let uniqueData = allData.map((data) => data[type]);
  if (type === "colors") uniqueData = uniqueData.flat();
  uniqueData = ["all", ...new Set(uniqueData)];

  return uniqueData;
};


