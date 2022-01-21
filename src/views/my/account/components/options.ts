
import moment from "moment";

export const reverseForm = (row: any) => {
  const starTime = row.rangeTime[0];
  let endTime = row.rangeTime[1];
  // console.log(endTime);
  if (moment().format("yyyy-MM") === endTime) {
    endTime = "至今";
  }
  row.starTime = starTime ?? moment().format("YYYY-MM-DD HH:mm:ss");
  row.endTime = endTime ?? moment().format("YYYY-MM-DD HH:mm:ss");
  // console.log(row.starTime, row.endTime);
  delete row.rangeTime;
  return { ...row };
};

export const traslateForm = (row: any) => {
  if (row.endTime === "至今") {
    row.endTime = moment().format("yyyy.MM");
  }
  row.rangeTime = [row.starTime, row.endTime];
  // console.log(row.rangeTime);
  return { ...row };
};

export class AddressDTO {
  id = 0;
  consignee = "";
  phone = "";
  mail = "";
  zipCode = "";
  cityArea = "";
  address = "";
}
